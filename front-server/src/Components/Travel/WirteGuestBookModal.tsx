import { usePostCommentMutation, usePutCommentMutation } from 'Store/api';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

interface WriteGuestBookModalType {
  onClose: () => void;
  type: 'WRITE' | 'MODIFY';
  comment:
    | {
        commentId: number;
        content: string;
      }
    | undefined;
  cancelClickBtn: HTMLAudioElement;
  successFxSound: HTMLAudioElement;
  errorFxSound: HTMLAudioElement;
}

function WriteGuestBookModal({
  onClose,
  type,
  comment,
  cancelClickBtn,
  successFxSound,
  errorFxSound
}: WriteGuestBookModalType): JSX.Element {
  const [postComment, { isLoading: isLoading2, isError: isError2 }] = usePostCommentMutation();
  const [putComment, { isLoading: isLoading3, isError: isError3 }] = usePutCommentMutation();

  const [content, setContent] = useState<string>(comment?.content || '');

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const { nickname } = useParams() as { nickname: string };

  const handleComment = async () => {
    if (type === 'WRITE') {
      try {
        const { data, result } = await postComment({ content: content, nickname: nickname }).unwrap();
        if (data) {
          successFxSound.play();
          toast.success('방명록 작성 완료되었습니다!');
        }
      } catch (error) {
        errorFxSound.play();
        toast.error('방명록 작성에 실패했습니다...');
      }
    } else if (type === 'MODIFY') {
      const { data, result } = await putComment({ content: content, commentId: comment?.commentId! }).unwrap();
      if (data) {
        successFxSound.play();
        toast.success('방명록 수정 완료되었습니다!');
      } else {
        errorFxSound.play();
        toast.error('방명록 작성에 실패했습니다...');
      }
    }
    onClose();
  };

  return (
    <>
      <div className="w-[28rem] h-[12rem] lg:w-[31.25rem] lg:h-[18rem] relative">
        <div className="absolute w-[40%] h-fit rounded-t-xl bg-[#ff7b7b] pb-4">
          <div className="flex items-center justify-start w-full ml-4 leading-6 text-start lg:text-xl lg:font-bold">
            <img
              className="scale-50 w-[18%]"
              src={process.env.REACT_APP_S3_URL + '/images/visits/pencil.png'}
              alt="pencil"
            />
            <span className="text-lg font-semibold text-center text-white md:text-xl lg:text-2xl">
              방명록&nbsp;{type === 'WRITE' ? '작성' : '수정'}
            </span>
          </div>
        </div>
        <div className="absolute w-full top-[2rem] lg:top-[2.4rem] p-3 overflow-hidden shadow-xl lg:p-4 lg:max-w-lg rounded-2xl text-center text-sm font-semibold leading-6 lg:text-xl lg:font-bold bg-white">
          <div className={`w-full pb-2`}>
            <textarea
              className="w-full h-[6rem] lg:h-[10.75rem] rounded-lg bg-[#fff6f2] border-2 border-[#fde2e2] focus:outline-[#FFC1B7] font-medium p-2  lg:p-4"
              style={{ resize: 'none' }}
              placeholder={'방명록을 남겨보세요!'}
              onChange={handleContentChange}
              value={content}
              maxLength={30}
            />
            <div className="flex justify-end">
              <span className={`${content.length > 30 ? 'text-red-400' : 'text-blue-400'}`}>{content.length}</span>
              <span>자/ 30자</span>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="inline-flex justify-center px-2 lg:px-4 py-[0.125rem] lg:py-1 min-w-[4.5rem] w-[30%] text-xs font-medium lg:text-base lg:font-semibold text-white bg-[#ED0000]/80 border border-transparent rounded-md hover:bg-[#ED0000] focus:outline-none "
              onClick={() => {
                cancelClickBtn.play();
                onClose();
              }}>
              취소
            </button>
            <button
              type="button"
              className="inline-flex justify-center px-2 lg:px-4 py-[0.125rem] lg:py-1 min-w-[4.5rem] w-[30%] text-xs font-medium lg:text-base lg:font-semibold text-white bg-[#1971C2]/80 border border-transparent rounded-md hover:bg-[#1971C2] focus:outline-none "
              onClick={handleComment}>
              작성 완료
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default WriteGuestBookModal;
