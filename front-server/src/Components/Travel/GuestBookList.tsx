import { useEffect, useState } from 'react';
import DeleteGuestBookModal from './DeleteGuestBookModal';
import WriteGuestBookModal from './WirteGuestBookModal';
import Modal from 'Components/Main/Modal';
import { useParams } from 'react-router-dom';
import { useGetCommentListQuery } from 'Store/api';
import Lottie from 'lottie-react';
import mailbox from 'Components/Common/Lottie/mailbox.json';
import Loading from 'Components/Common/Loading';

interface Props {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
}

interface CommentResDtoProps {
  commentId: number;
  content: string;
}

interface ReturnGuestBookItem {
  authorResDto: {
    nickname: string;
    profileImagePath: string;
  };
  commentResDto: {
    commentId: number;
    content: string;
  };
  isAuthor: 'Y' | 'N';
}

interface GuestBookItemProps extends ReturnGuestBookItem {
  handleOpenDeleteModal: (commentId: number) => void;
  handleOpenModifyModal: (comment: CommentResDtoProps) => void;
}

function GuestBookItem({
  authorResDto: author,
  commentResDto: comment,
  isAuthor,
  handleOpenDeleteModal,
  handleOpenModifyModal
}: GuestBookItemProps): JSX.Element {
  return (
    <>
      <div className="w-[13rem] h-[12.75rem] rounded-xl bg-white border border-[#fde2e2] p-4">
        <div className="flex flex-row mb-2">
          <div className="flex justify-center w-6 h-6 lg:w-6 lg:h-6 rounded-full  bg-[#FCCACA] mr-2">
            <img className="m-1 rounded-full object-contain" src={`${author.profileImagePath}`} alt="프로필 이미지" />
          </div>
          <p className="w-[6rem] h-[1.625rem] text-base font-semibold text-left text-[#454545]">{author.nickname}</p>
        </div>
        <p className="w-[10.875rem] h-[7.5rem] text-base text-left text-[#747474] overflow-hidden">{comment.content}</p>
        {/* 오른쪽 아래 수정 및 삭제 버튼 */}
        {isAuthor === 'Y' && (
          <div className="bottom-0 flex justify-start gap-2">
            <button className="" onClick={() => handleOpenDeleteModal(comment.commentId)}>
              <img
                alt=""
                src={process.env.REACT_APP_S3_URL + '/images/visits/delete.png'}
                className="w-[1.125rem] h-[1.125rem] object-cover"
              />
            </button>
            <button className="" onClick={() => handleOpenModifyModal(comment)}>
              <img
                alt=""
                src={process.env.REACT_APP_S3_URL + '/images/visits/edit.png'}
                className="w-[1.125rem] h-[1.125rem] object-cover"
              />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function GuestBookList({ onClose }: Props): JSX.Element {
  // 방명록 리스트 가져오기
  const { nickname } = useParams() as { nickname: string };
  const { data, isLoading: isLoading1, isError: isError1 } = useGetCommentListQuery(nickname);
  // const [getCommentList, { isLoading: isLoading1, isError: isError1 }] = useLazyGetCommentListQuery();

  // useEffect(() => {
  //   const getComment = async () => {
  //     const { data, result } = await getCommentList(nickname).unwrap();
  //     if (data) {
  //       setCommentList(commentList);
  //     }
  //   };
  //   getComment();
  // }, [nickname, commentList, getCommentList]);

  const [commentId, setCommentId] = useState<number>(0);
  const [comment, setComment] = useState<CommentResDtoProps | undefined>();

  // 삭제 모달 관련
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);

  const handleOpenDeleteModal = (commentId: number) => {
    setCommentId(commentId);
    setIsShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setCommentId(0);
    setIsShowDeleteModal(false);
  };

  // 작성 & 수정 모달 관련
  const [isShowWriteModal, setIsShowWriteModal] = useState<boolean>(false);
  const [type, setType] = useState<'WRITE' | 'MODIFY'>('WRITE');

  const handleOpenWriteModal = () => {
    setType('WRITE');
    setIsShowWriteModal(true);
  };
  const handleOpenModifyModal = (comment: CommentResDtoProps) => {
    setType('MODIFY');
    setComment(comment);
    setIsShowWriteModal(true);
  };
  const handleCloseWriteModal = () => {
    setCommentId(0);
    setComment(undefined);
    setIsShowWriteModal(false);
  };

  // 전체 스크린 높이
  const [screenHeight, setScreenHeight] = useState<number>(0);

  useEffect(() => {
    // 창 높이 변할떄마다 실행
    const height = window.screen.height;
    setScreenHeight(height);
  }, [window.screen.height]);

  return (
    <>
      <div className={`flex flex-col w-fit `} id="guest-book-modal">
        <div className="flex w-full rounded-tl-lg rounded-tr-lg bg-[#fde2e2] items-center pl-4 pr-2 lg:pl-8 lg:pr-4 py-2 justify-between">
          <div className="flex items-center">
            <img
              alt=""
              src={process.env.REACT_APP_S3_URL + '/images/visits/mailBox.png'}
              className="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] object-cover"
            />
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center text-[#ff6060] pl-4">방명록</p>
          </div>
          <button className="object-cover round-full" onClick={onClose}>
            <img
              alt=""
              src={process.env.REACT_APP_S3_URL + '/images/visits/multiply.png'}
              className="w-[2rem] h-[2rem] lg:w-[3rem] lg:h-[3rem] object-cover round-full"
            />
          </button>
        </div>
        <div
          className="w-fit lg:h-[28.875rem] rounded-bl-lg rounded-br-lg bg-[#fff6f2] border border-[#fde2e2] overflow-auto"
          style={screenHeight > 800 ? { height: '28.875rem' } : { height: '50vh' }}>
          <>
            {/* map */}
            {data?.data.length !== 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-4">
                {data?.data.map((item: ReturnGuestBookItem, index) => (
                  <GuestBookItem
                    key={index}
                    authorResDto={item.authorResDto}
                    commentResDto={item.commentResDto}
                    isAuthor={item.isAuthor}
                    handleOpenDeleteModal={handleOpenDeleteModal}
                    handleOpenModifyModal={handleOpenModifyModal}></GuestBookItem>
                ))}
              </div>
            )}
            {data?.data.length === 0 && (
              <div className="w-[456px] md:w-[688px] lg:w-[912px] h-full flex items-center py-2">
                <div className="w-full flex flex-col justify-center items-center lg: gap-4">
                  <span className=" font-semibold text-xl text-[#707070]">아직 방명록이 없어요!</span>
                  <Lottie animationData={mailbox} className="w-[10rem] h-[10rem] lg:w-[12rem] lg:h-[12rem]" />
                </div>
              </div>
            )}
            {isLoading1 && (
              <div className="w-[456px] md:w-[688px] lg:w-[912px] h-full flex items-center py-2">
                <Loading />
              </div>
            )}
          </>

          <button
            className="absolute bottom-4 right-4 flex justify-center items-center w-[2.8rem] h-[2.8rem] lg:w-[3.75rem] lg:h-[3.75rem] rounded-full bg-white border-2 border-[#fde2e2] shadow-lg pt-1"
            onClick={handleOpenWriteModal}>
            <img
              alt=""
              src={process.env.REACT_APP_S3_URL + '/images/visits/pencil.png'}
              className="w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] object-cover"
            />
          </button>
        </div>
      </div>
      <Modal
        isOpen={isShowDeleteModal}
        onClose={handleCloseDeleteModal}
        padding={
          'w-full max-w-xs p-4 overflow-hidden align-middle transition-all transform bg-white shadow-xl lg:p-6 lg:max-w-lg rounded-2xl text-center text-sm font-semibold leading-6 lg:text-xl lg:font-bold'
        }
        elementId={'guest-book-modal'}>
        <DeleteGuestBookModal onClose={handleCloseDeleteModal} commentId={commentId} />
      </Modal>
      <Modal
        isOpen={isShowWriteModal}
        onClose={handleCloseWriteModal}
        padding={'align-middle transition-all transform'}
        elementId={'guest-book-modal'}
        styleType={2}>
        <WriteGuestBookModal onClose={handleCloseWriteModal} type={type} comment={comment} />
      </Modal>
    </>
  );
}

export default GuestBookList;
