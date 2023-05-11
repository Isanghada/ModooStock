interface WriteGuestBookModalType {
  onClose: () => void;
  type: 'WRITE' | 'MODIFY';
}

function WriteGuestBookModal({ onClose, type }: WriteGuestBookModalType): JSX.Element {
  return (
    <>
      <div className="w-[31.25rem] h-[18rem] relative">
        <div className="absolute w-[15rem] h-fit rounded-t-xl bg-[#ff7b7b] pb-4">
          <div className="flex justify-start w-full text-start leading-6 lg:text-xl lg:font-bold items-center ml-4">
            <img
              className="scale-50 w-[18%]"
              src={process.env.REACT_APP_S3_URL + '/images/visits/pencil.png'}
              alt="pencil"
            />
            <span className="text-lg md:text-xl lg:text-2xl font-semibold text-center text-white">
              방명록&nbsp;{type === 'WRITE' ? '작성' : '수정'}
            </span>
          </div>
        </div>
        <div className="absolute w-full top-[2.75rem] p-4 overflow-hidden shadow-xl lg:p-4 lg:max-w-lg rounded-2xl text-center text-sm font-semibold leading-6 lg:text-xl lg:font-bold bg-white">
          <div className={`w-full mb-2`}>
            <textarea
              className="w-full h-[10.75rem] rounded-lg bg-[#fff6f2] border-2 border-[#fde2e2] focus:outline-[#FFC1B7] font-medium p-4"
              style={{ resize: 'none' }}
              placeholder={'방명록을 남겨보세요!'}
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="inline-flex justify-center px-2 lg:px-4 py-[0.125rem] lg:py-1 min-w-[4.5rem] w-[30%] text-xs font-medium lg:text-base lg:font-semibold text-white bg-[#ED0000]/80 border border-transparent rounded-md hover:bg-[#ED0000] focus:outline-none "
              onClick={onClose}>
              취소
            </button>
            <button
              type="button"
              className="inline-flex justify-center px-2 lg:px-4 py-[0.125rem] lg:py-1 min-w-[4.5rem] w-[30%] text-xs font-medium lg:text-base lg:font-semibold text-white bg-[#1971C2]/80 border border-transparent rounded-md hover:bg-[#1971C2] focus:outline-none "
              onClick={onClose}>
              작성 완료
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default WriteGuestBookModal;
