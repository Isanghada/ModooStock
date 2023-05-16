import { useDeleteCommentMutation } from 'Store/api';
import { toast } from 'react-toastify';
interface InfoModalType {
  onClose: () => void;
  commentId: number;
  cancelClickBtn: HTMLAudioElement;
  successFxSound: HTMLAudioElement;
  errorFxSound: HTMLAudioElement;
}

function DeleteGuestBookModal({
  onClose,
  commentId,
  cancelClickBtn,
  successFxSound,
  errorFxSound
}: InfoModalType): JSX.Element {
  const [deleteComment, { isLoading, isError }] = useDeleteCommentMutation();

  const handleDeleteComment = async (commentId: number) => {
    const { data, result } = await deleteComment(commentId).unwrap();
    if (data) {
      successFxSound.play();
      toast.success('방명록 삭제가 완료되었습니다!');
    } else {
      errorFxSound.play();
      toast.error('방명록 삭제에 실패했습니다...');
    }
    onClose();
  };

  return (
    <>
      <div className="flex justify-center w-full my-2 lg:my-4">
        <img className="w-[12%] h-auto" src={process.env.REACT_APP_S3_URL + '/images/visits/warning.png'} alt="info" />
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
          onClick={() => {
            cancelClickBtn.play();
            onClose();
          }}>
          취소
        </button>
        <button
          type="button"
          className="inline-flex justify-center px-2 lg:px-4 py-[2px] lg:py-1 min-w-[4.5rem] w-[40%] text-xs font-medium lg:text-base lg:font-semibold text-white bg-[#1971C2]/80 border border-transparent rounded-md hover:bg-[#1971C2] focus:outline-none "
          onClick={() => handleDeleteComment(commentId)}>
          확인
        </button>
      </div>
    </>
  );
}

export default DeleteGuestBookModal;
