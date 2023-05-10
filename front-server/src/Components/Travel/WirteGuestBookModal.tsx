import { Dispatch, SetStateAction, useRef } from 'react';

interface InfoModalType {
  isShowWriteModal: boolean;
  setIsShowWriteModal: Dispatch<SetStateAction<boolean>>;
}

function Test(): JSX.Element {
  return (
    <div className="w-[608px] h-[289px] relative">
      <div className="w-[279px] h-[58px] absolute left-[-1px] top-[-1px] rounded-tl-[15px] rounded-tr-[15px] bg-[#ff7b7b]" />
      <div className="w-[608px] h-[241px] absolute left-[-1.5px] top-[46.5px] rounded-[15px] bg-white border-2 border-white" />
      <img
        src="/images/icons/pencil.png"
        className="w-[21px] h-[21px] absolute left-6 top-3.5 object-cover"
        alt="연필"
      />
      <div className="w-[576px] h-[172px] absolute left-[15px] top-[59px] rounded-[10px] bg-[#fff6f2]" />
      <div className="w-[148px] h-[39px] absolute left-[22px] top-[242px] rounded-[10px] bg-[#ed0000]" />
      <p className="w-[85px] h-5 absolute left-[55px] top-[251px] text-xl font-bold text-center text-white">취소</p>
      <div className="w-[148px] h-[39px] absolute left-[443px] top-[242px] rounded-[10px] bg-[#1971c2]" />
      <p className="w-[85px] h-5 absolute left-[476px] top-[251px] text-xl font-bold text-center text-white">
        작성 완료
      </p>
      <p className="w-[257px] h-[55px] absolute left-[15px] top-[7px] text-[32px] font-semibold text-center text-white">
        방명록 작성
      </p>
    </div>
  );
}

function WriteGuestBookModal({ isShowWriteModal, setIsShowWriteModal }: InfoModalType): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  const click = (e: React.MouseEvent) => {
    setIsShowWriteModal(false);
  };

  return (
    <>
      {isShowWriteModal && (
        <div
          ref={ref}
          className="relative z-[60]"
          onClick={(e) => {
            if (ref.current !== e.target) {
              setIsShowWriteModal(false);
            }
          }}>
          <div className="fixed inset-0 bg-black bg-opacity-25 rounded-lg" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center ">
              <div className="w-full max-w-xs p-4 overflow-hidden align-middle transition-all transform bg-white shadow-xl lg:p-6 lg:max-w-lg rounded-2xl text-center text-sm font-semibold leading-6 lg:text-xl lg:font-bold">
                <div className="flex justify-center w-full my-2 lg:my-4">
                  <img className="w-[12%] h-auto" src="/images/icons/warning.png" alt="info" />
                  <div>임시 작성 페이지</div>
                </div>
                <div className={`w-full mb-2 lg:mb-6 lg:pt-2`}>
                  <textarea className="w-full h-[172px] rounded-lg bg-[#fff6f2]" />
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
                    작성 완료
                  </button>
                </div>
                {/* <Test></Test> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WriteGuestBookModal;
