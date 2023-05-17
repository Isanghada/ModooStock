import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'Store/hooks';
import { changeMenuStatus, changePrivacyStatus, changeUpdateStatus } from 'Store/store';
import { motion } from 'framer-motion';
import UpdateInfo from './UpdateInfo';
import { useLazyGetUsersLogoutQuery, useDeleteUsersMutation } from 'Store/api';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from 'Components/Common/ConfirmModal';
import { toast } from 'react-toastify';
import PrivacyPolicy from 'Components/Common/PrivacyPolicy';

const screenHeight = window.screen.height;

function Menu(): JSX.Element {
  const dispatch = useAppDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPrivacyLoaded, setIsPrivacyLoaded] = useState(false);
  const [src, setSrc] = useState('');
  const navigate = useNavigate();
  // 모달 관련
  const [modalOpen, setModalOpen] = useState(false);
  // 회원탈퇴 모달 관련
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  // 모달 창 닫기
  function closeModal() {
    setModalOpen(false);
  }
  // 회원탈퇴 창 닫기
  function closeDeleteModal() {
    setDeleteModalOpen(false);
  }
  function closePrivacyModal() {
    setPrivacyModalOpen(false);
  }
  // 백 그라운드
  const menuRef = useRef<HTMLDivElement>(null);
  // 로그아웃 API
  const [getUsersLogout] = useLazyGetUsersLogoutQuery();
  // 회원탈퇴 API
  const [postDeleteUsers] = useDeleteUsersMutation();

  // 정보수정 창 상태
  const updateStatus = useAppSelector((state) => {
    return state.updateStatus;
  });

  // 배경 클릭시 메뉴 닫기
  const closeMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === menuRef.current) {
      dispatch(changeUpdateStatus(false));
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
  // 회원탈퇴
  const deleteUser = async () => {
    try {
      await postDeleteUsers("").unwrap();
      // 메뉴 닫기
      dispatch(changeMenuStatus(false));
      localStorage.clear();
      toast.info('회원탈퇴 하셨습니다');
      navigate('/');
    } catch (error) {
      console.log(error, '회원탈퇴 에러');
    }
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
      case '회원탈퇴':
        setDeleteModalOpen(true);
        break;
      case '개인정보처리방침':
        setPrivacyModalOpen(true);
        break;
      case '로그아웃':
        setModalOpen(true);
        break;
      default:
        break;
    }
  };

  // 이미지 로딩상태 체크
  useEffect(() => {
    const img = new Image();
    const imgPrivacy = new Image();
    img.onload = () => {
      setIsLoaded(true);
      setSrc(process.env.REACT_APP_S3_URL + '/images/logos/LogoEarth.png');
    };
    img.src = process.env.REACT_APP_S3_URL + '/images/logos/LogoEarth.png';
    imgPrivacy.onload = () => {
      setIsPrivacyLoaded(true);
    };
    imgPrivacy.src = '/images/PrivacyPolicy.png';
  }, []);
  return (
    <>
      <ConfirmModal
        isOpen={modalOpen}
        msg={'정말 나가실건가요? o(TヘTo)'}
        propsFunction={logout}
        closeModal={closeModal}
        accept={'나가기'}
        cancel={'남아있기'}
      />
      <ConfirmModal
        isOpen={deleteModalOpen}
        msg={'정말 탈퇴하실건가요? o(TヘTo)'}
        propsFunction={deleteUser}
        closeModal={closeDeleteModal}
        accept={'탈퇴하기'}
        cancel={'남아있기'}
      />
      {isPrivacyLoaded && <PrivacyPolicy isOpen={privacyModalOpen} closeModal={closePrivacyModal} cancel={'확인'} />}
      {isLoaded && (
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
                aria-label="나가기"
                onClick={onClick}
                src={process.env.REACT_APP_S3_URL + '/chatting/cancelBlack.png'}
                className="absolute w-2 h-2 cursor-pointer opacity-60 lg:w-6 lg:h-6 top-2 right-2 hover:opacity-80"
                alt="cancelBlack"
              />
              <div className="w-1/2 mb-2 lg:mb-4">
                <img className="w-full" src={src} alt="logo" />
              </div>
              <div className="text-[0.5rem] lg:text-base font-bold text-gray-600 h-[10%]">
                <a
                  target="_blank"
                  href="https://general-library-f31.notion.site/2febe6c2eb7f4be68f4d6d2391504d29"
                  className="decoration-transparent hover:text-red-300">
                  확률정보
                </a>
              </div>
              <div className="flex justify-between w-3/4">
                <div
                  aria-label="정보수정"
                  onClick={onClick}
                  className="bg-[#ffc1b8] rounded-xl text-sm lg:text-2xl font-extrabold w-[48%]  text-center text-white py-1 lg:py-2 my-1 lg:my-2 cursor-pointer hover:bg-[#ffb3a8]">
                  정보수정
                </div>
                <div
                  aria-label="회원탈퇴"
                  onClick={onClick}
                  className="bg-[#b7c4cb] rounded-xl text-sm lg:text-2xl font-extrabold w-[48%]  text-center text-white py-1 lg:py-2 my-1 lg:my-2 cursor-pointer hover:bg-[#98aab4]">
                  회원탈퇴
                </div>
              </div>
              <div
                aria-label="개인정보처리방침"
                onClick={onClick}
                className="bg-[#d5cdff] rounded-xl text-sm lg:text-2xl font-extrabold w-3/4 text-center text-white py-1 lg:py-2 my-1 lg:my-2 cursor-pointer hover:bg-[#c2b6fa]">
                개인정보처리방침
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
      )}
    </>
  );
}
export default Menu;
