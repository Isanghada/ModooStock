import { useRef, useState } from 'react';
import { useAppDispatch } from 'Store/hooks';
import { changeMenuStatus } from 'Store/store';
import { motion } from 'framer-motion';
import UpdateInfo from './UpdateInfo';

const screenHeight = window.screen.height;

function Menu(): JSX.Element {
  const dispatch = useAppDispatch();
  const menuRef = useRef<HTMLDivElement>(null);

  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  // 배경 클릭시 메뉴 닫기
  const closeMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === menuRef.current) {
      dispatch(changeMenuStatus(false));
    }
  };
  // 클릭 이벤트 처리
  const onClick = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    switch (target.ariaLabel) {
      case '정보수정':
        setIsUpdate(true);
        break;
      case '로그아웃':
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
      ref={menuRef}
      onClick={closeMenu}
      className="fixed flex items-center justify-center right-0 left-0 top-0 bottom-0 bg-[#707070]/50 z-50">
      {isUpdate ? (
        <UpdateInfo />
      ) : (
        <div
          className={`flex flex-col items-center justify-center w-[30vw] h-[60vh] bg-white rounded-md ${
            screenHeight >= 800 ? 'lg:min-h-[24rem] min-h-[10rem]' : ''
          }`}>
          <div className="w-1/2">
            <img className="w-full" src="/images/logos/LogoEarth.png" alt="logo" />
          </div>
          <div className="text-base font-extrabold text-gray-600 lg:text-2xl h-1/6">설정</div>
          <div className="text-[0.5rem] lg:text-base font-bold text-gray-600 h-[10%]">
            <a
              target="_blank"
              href="https://www.youtube.com/@hminor3510"
              className="decoration-transparent hover:text-red-300">
              문의 : 천재 기타리스트 HMinor
            </a>
          </div>
          <div
            aria-label="정보수정"
            onClick={onClick}
            className="bg-[#FFD4CD] rounded-xl text-sm lg:text-2xl font-extrabold w-3/4 text-center text-white py-1 lg:py-2 my-1 lg:my-2 cursor-pointer hover:bg-[#ffc1b8]">
            정보수정
          </div>
          <div
            aria-label="로그아웃"
            onClick={onClick}
            className="bg-[#CACACA] rounded-xl text-sm lg:text-2xl font-extrabold w-3/4 text-center text-white py-1 lg:py-2 my-1 lg:my-2 cursor-pointer hover:bg-[#b1b1b1]">
            로그아웃
          </div>
        </div>
      )}
    </motion.div>
  );
}
export default Menu;
