import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'Store/hooks';
import { changeMenuStatus, changeUpdateStatus } from 'Store/store';
import { motion } from 'framer-motion';
import UpdateInfo from './UpdateInfo';
import { useLazyGetUsersLogoutQuery } from 'Store/api';
import { useNavigate } from 'react-router-dom';
import Modal from 'Components/Common/ConfirmModal';
import { toast } from 'react-toastify';

const screenHeight = window.screen.height;

function Menu(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // 모달 관련
  const [modalOpen, setModalOpen] = useState(false);
  // 모달 창 닫기
  function closeModal() {
    setModalOpen(false);
  }
  // 백 그라운드
  const menuRef = useRef<HTMLDivElement>(null);
  // 로그아웃 API
  const [getUsersLogout] = useLazyGetUsersLogoutQuery();

  // 정보수정 창 상태
  const updateStatus = useAppSelector((state) => {
    return state.updateStatus;
  });

  // 배경 클릭시 메뉴 닫기
  const closeMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === menuRef.current) {
      dispatch(changeMenuStatus(false));
    }
  };
  // 로그아웃
  const logout = async () => {
    await getUsersLogout('');
    // 메뉴 닫기
    dispatch(changeMenuStatus(false));
    localStorage.clear();
    toast.info('로그아웃 하셨습니다');
    navigate('/');
  };
  // 클릭 이벤트 처리
  const onClick = async (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    switch (target.ariaLabel) {
      case '나가기':
        dispatch(changeMenuStatus(false));
        break;
      case '정보수정':
        dispatch(changeUpdateStatus(true));
        break;
      case '로그아웃':
        setModalOpen(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Modal
        isOpen={modalOpen}
        msg={'정말 나가실건가요? o(TヘTo)'}
        propsFunction={logout}
        closeModal={closeModal}
        accept={'나가기'}
        cancel={'남아있기'}
      />
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
        {updateStatus ? (
          <UpdateInfo />
        ) : (
          <div
            className={`relative flex flex-col items-center justify-center w-[30vw] h-[60vh] bg-white rounded-md ${
              screenHeight >= 800 ? 'lg:min-h-[24rem] min-h-[10rem]' : ''
            }`}>
            <img
              aria-label='나가기'
              onClick={onClick}
              src="/chatting/cancelBlack.png"
              className="absolute cursor-pointer opacity-60 lg:w-8 lg:h-8 top-2 right-2 hover:opacity-80"
              alt="cancelBlack"
            />
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
    </>
  );
}
export default Menu;
