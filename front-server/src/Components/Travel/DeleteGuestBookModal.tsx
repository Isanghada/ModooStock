import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface props {
  onClose: () => void;
  children: React.ReactNode;
}

function DeleteGuestBookModal({ onClose, children }: props) {
  const [showNestedModal, setShowNestedModal] = useState(false);

  const handleOpenNestedModal = () => {
    setShowNestedModal(true);
  };

  const handleCloseNestedModal = () => {
    setShowNestedModal(false);
  };

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        {children}
        <button onClick={handleOpenNestedModal}>Open nested modal</button>
        {showNestedModal && (
          <DeleteGuestBookModal onClose={handleCloseNestedModal} key="nestedModal">
            <h2>Nested modal</h2>
            <p>This is the content of the nested modal.</p>
          </DeleteGuestBookModal>
        )}
      </div>
    </div>,
    document.body
  );
}

// function DeleteGuestBookModal(): JSX.Element {
//   const [showModal, setShowModal] = useState(false);

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleOpenModal = () => {
//     setShowModal(true);
//   };

//   return (
//     <div className="deleteGuestBookModal">
//       <button onClick={handleOpenModal}>Open modal</button>
//       {showModal && (
//         <Modal onClose={handleCloseModal} key="modal">
//           <h2>Main modal</h2>
//           <p>This is the content of the main modal.</p>
//         </Modal>
//       )}
//     </div>
//   );
// }

export default DeleteGuestBookModal;
