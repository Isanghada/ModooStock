import { motion } from 'framer-motion';
import { useAppDispatch } from 'Store/hooks';
import { changeUpdateStatus } from 'Store/store';

const screenHeight = window.screen.height;

function UpdateInfo(): JSX.Element {
  const dispatch = useAppDispatch();
  // 클릭 이벤트 처리
  const onClick = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    switch (target.ariaLabel) {
      case '취소':
        dispatch(changeUpdateStatus(false));
        break;
      case '확인':
        // showMenu();
        break;
      default:
        break;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut'
      }}
      className={`flex flex-col items-center justify-center w-[40vw] h-[70vh] bg-white rounded-md ${
        screenHeight >= 800 ? 'lg:min-h-[28rem] min-h-[12rem]' : ''
      }`}>
      <div className="w-full font-extrabold text-center text-red-300 lg:text-5xl ">정보수정</div>
      <div className="flex flex-col w-3/4 text-base justify-evenly h-[70%]">
        <div className="flex w-full justify-evenly">
          <div className="grow">닉네임</div>
          <input className="w-3/4 border-2 border-red-300 rounded-lg" />
        </div>
        <div className="flex w-full justify-evenly">
          <div className="grow">비밀번호</div>
          <input className="w-3/4 border-2 border-red-300 rounded-lg" />
        </div>
        <div className="flex w-full justify-evenly">
          <div className="grow">비밀번호 확인</div>
          <input className="w-3/4 border-2 border-red-300 rounded-lg" />
        </div>
        <div className="flex w-full justify-evenly">
          <div className="grow">자기소개</div>
          <input className="w-3/4 border-2 border-red-300 rounded-lg" />
        </div>
        <div className="flex justify-between w-full">
          <div
            aria-label="취소"
            onClick={onClick}
            className="bg-[#CACACA] rounded-xl text-sm lg:text-2xl font-extrabold w-[48%] text-center text-white py-1 lg:py-2 my-1 lg:my-2 cursor-pointer hover:bg-[#b1b1b1]">
            취소
          </div>
          <div
            aria-label="확인"
            onClick={onClick}
            className="bg-[#FFD4CD] rounded-xl text-sm lg:text-2xl font-extrabold w-[48%] text-center text-white py-1 lg:py-2 my-1 lg:my-2 cursor-pointer hover:bg-[#ffc1b8]">
            정보수정완료
          </div>
        </div>
      </div>
    </motion.div>
  );
}
export default UpdateInfo;
