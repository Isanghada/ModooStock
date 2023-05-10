import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import DeleteGuestBookModal from './DeleteGuestBookModal';

interface Props {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
}

interface GuestBookItemProps {
  authorResDto: {
    nickname: string;
    profileImagePath: string;
  };
  commentResDto: {
    commentId: number;
    content: string;
    isEditable: boolean;
  };
}

function GuestBookItem({ authorResDto: author, commentResDto: comment }: GuestBookItemProps): JSX.Element {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsShowDeleteModal(true);
  };

  return (
    <>
      {isShowDeleteModal && (
        <DeleteGuestBookModal isShowDeleteModal={isShowDeleteModal} setIsShowDeleteModal={setIsShowDeleteModal} />
      )}
      <div className="w-[208px] h-[204px] rounded-xl bg-white border border-[#fde2e2] p-4">
        <div className="flex flex-row mb-2">
          <div className="flex justify-center w-6 h-6 lg:w-6 lg:h-6 rounded-full  bg-[#FCCACA] mr-2">
            <img className="m-1 rounded-full object-contain" src={`${author.profileImagePath}`} alt="프로필 이미지" />
          </div>
          <p className="w-[95px] h-[26px] text-base font-semibold text-left text-[#454545]">{author.nickname}</p>
        </div>
        <p className="w-[174px] h-[120px] text-base text-left text-[#747474] overflow-hidden">{comment.content}</p>
        {/* 오른쪽 아래 수정 및 삭제 버튼 */}
        {comment.isEditable && (
          <div className="bottom-0 flex justify-start gap-2">
            <button className="" onClick={handleOpenModal}>
              <img alt="" src="/images/icons/delete.png" className="w-[18px] h-[18px] object-cover" />
            </button>
            <button className="">
              <img alt="" src="/images/icons/edit.png" className="w-[18px] h-[18px] object-cover" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

const guestBookList: GuestBookItemProps[] = [
  {
    authorResDto: {
      nickname: '오리',
      profileImagePath: 'https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m9.png'
    },
    commentResDto: {
      commentId: 1,
      content: '안녕하세요. 왔다감 안녕하세요. 왔다감 안녕하세요. 왔다감 안녕하세요. 왔다감 안녕하세요. ',
      isEditable: false
    }
  },
  {
    authorResDto: {
      nickname: '고양이',
      profileImagePath: 'https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m3.png'
    },
    commentResDto: {
      commentId: 2,
      content: '냐옹',
      isEditable: true
    }
  },
  {
    authorResDto: {
      nickname: '강아지',
      profileImagePath: 'https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m4.png'
    },
    commentResDto: {
      commentId: 3,
      content: '일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십',
      isEditable: false
    }
  },
  {
    authorResDto: {
      nickname: '강아지',
      profileImagePath: 'https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m4.png'
    },
    commentResDto: {
      commentId: 4,
      content: '멍멍',
      isEditable: false
    }
  },
  {
    authorResDto: {
      nickname: '강아지',
      profileImagePath: 'https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m4.png'
    },
    commentResDto: {
      commentId: 5,
      content: '멍멍',
      isEditable: false
    }
  },
  {
    authorResDto: {
      nickname: '강아지',
      profileImagePath: 'https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m4.png'
    },
    commentResDto: {
      commentId: 6,
      content: '멍멍',
      isEditable: false
    }
  },
  {
    authorResDto: {
      nickname: '강아지',
      profileImagePath: 'https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m4.png'
    },
    commentResDto: {
      commentId: 7,
      content: '멍멍',
      isEditable: false
    }
  },
  {
    authorResDto: {
      nickname: '강아지',
      profileImagePath: 'https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m4.png'
    },
    commentResDto: {
      commentId: 8,
      content: '멍멍',
      isEditable: true
    }
  },
  {
    authorResDto: {
      nickname: '강아지',
      profileImagePath: 'https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m4.png'
    },
    commentResDto: {
      commentId: 3,
      content: '멍멍',
      isEditable: false
    }
  },
  {
    authorResDto: {
      nickname: '강아지',
      profileImagePath: 'https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m4.png'
    },
    commentResDto: {
      commentId: 3,
      content: '멍멍',
      isEditable: false
    }
  },

  {
    authorResDto: {
      nickname: '병아리',
      profileImagePath: 'https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m4.png'
    },
    commentResDto: {
      commentId: 3,
      content: '삐약삐약',
      isEditable: false
    }
  }
];

function GuestBookList({ onClose }: Props): JSX.Element {
  return (
    <>
      <div className="flex flex-col w-fit h-[544px]">
        <div className="flex w-full h-[82px] rounded-tl-lg rounded-tr-lg bg-[#fde2e2] items-center pl-8 pr-4 justify-between">
          <div className="flex items-center">
            <img alt="" src="/images/icons/mailBox.png" className="w-[60px] h-[60px] object-cover" />
            <p className="text-4xl font-semibold text-center text-[#ff6060] pl-4">방명록</p>
          </div>
          <button className="w-[48px] h-[48px] object-cover round-full" onClick={onClose}>
            <img alt="" src="/images/icons/multiply.png" className="w-[48px] h-[48px] object-cover round-full" />
          </button>
        </div>
        <div className="w-fit h-[462px] rounded-bl-lg rounded-br-lg bg-[#fff6f2] border border-[#fde2e2] overflow-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-4">
            {/* map */}
            {guestBookList.map((item, index) => (
              <GuestBookItem authorResDto={item.authorResDto} commentResDto={item.commentResDto}></GuestBookItem>
            ))}
          </div>
          <button className="absolute bottom-4 right-4 flex justify-center items-center w-[60px] h-[60px] rounded-full bg-white border-2 border-[#fde2e2] shadow-lg pt-1">
            <img alt="" src="/images/icons/pencil.png" className="w-[40px] h-[40px] object-cover" />
          </button>
        </div>
      </div>
    </>
  );
}

export default GuestBookList;
