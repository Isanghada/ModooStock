import { Dispatch, SetStateAction, useRef } from 'react';

interface InfoModalType {
  isShowDeleteModal: boolean;
  setIsShowDeleteModal: Dispatch<SetStateAction<boolean>>;
}

function DeleteGuestBookModal({ isShowDeleteModal, setIsShowDeleteModal }: InfoModalType): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  const click = (e: React.MouseEvent) => {
    setIsShowDeleteModal(false);
  };

  return (
    <>
      {isShowDeleteModal && (
        <div
          ref={ref}
          className="relative z-[60]"
          onClick={(e) => {
            if (ref.current !== e.target) {
              setIsShowDeleteModal(false);
            }
          }}>
          <div className="fixed inset-0 bg-black bg-opacity-25 rounded-lg" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center ">
              <div className="w-full max-w-xs p-4 overflow-hidden align-middle transition-all transform bg-white shadow-xl lg:p-6 lg:max-w-lg rounded-2xl text-center text-sm font-semibold leading-6 lg:text-xl lg:font-bold">
                <div className="flex justify-center w-full my-2 lg:my-4">
                  <img className="w-[12%] h-auto" src="/images/icons/warning.png" alt="info" />
                </div>
                <div className={`w-full mb-2 lg:mb-6 lg:pt-2 text-red-500`}>
                  <span className="text-gray-600">방명록을&nbsp;</span>
                  <span>삭제</span>
                  <span className="text-gray-600">하시겠습니까?</span>
                </div>
                <div className="flex justify-evenly ">
                  <button
                    type="button"
                    className="inline-flex justify-center px-2 lg:px-4 py-[2px] lg:py-1 min-w-[4.5rem] w-[40%] text-xs font-medium lg:text-base lg:font-semibold text-white bg-[#ED0000]/80 border border-transparent rounded-md hover:bg-[#ED0000] focus:outline-none "
                    onClick={click}>
                    취소
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-2 lg:px-4 py-[2px] lg:py-1 min-w-[4.5rem] w-[40%] text-xs font-medium lg:text-base lg:font-semibold text-white bg-[#1971C2]/80 border border-transparent rounded-md hover:bg-[#1971C2] focus:outline-none "
                    onClick={click}>
                    확인
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteGuestBookModal;
