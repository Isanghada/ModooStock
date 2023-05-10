import { useState } from 'react';

interface Props {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
}

function test(): JSX.Element {
  return (
    <div className="w-[1042px] h-[545px]">
      <div className="w-[1042px] h-[462px] absolute left-[219.5px] top-[321.5px] rounded-bl-[20px] rounded-br-[20px] bg-[#fff6f2] border border-[#fde2e2]" />
      <div className="w-[1042px] h-[83px] absolute left-[220.5px] top-[238.5px] rounded-tl-[20px] rounded-tr-[20px] bg-[#fde2e2]" />
      <div className="w-[207px] h-[204px] absolute left-[269.5px] top-[352.5px] rounded-[15px] bg-white border border-[#fde2e2]" />
      <div className="w-[207px] h-[184px] absolute left-[273.5px] top-[587.5px] rounded-[15px] bg-white" />
      <div className="w-[207px] h-[204px] absolute left-[974.5px] top-[352.5px] rounded-[15px] bg-white" />
      <div className="w-[207px] h-[204px] absolute left-[739.5px] top-[352.5px] rounded-[15px] bg-white" />
      <div className="w-[207px] h-[204px] absolute left-[504.5px] top-[352.5px] rounded-[15px] bg-white border border-[#fde2e2]" />
      <p className="w-[257px] h-[55px] absolute left-[261px] top-[253px] text-[52px] font-semibold text-center text-[#ff6060]">
        방명록
      </p>
      <p className="w-[174px] h-[52px] absolute left-[301px] top-[416px] text-base text-left text-[#747474]">
        안녕하세요. 왔다감
      </p>
      <img
        alt=""
        src="image-206.png"
        className="w-[26px] h-[27px] absolute left-[291.5px] top-[367.5px] rounded-[73.5px] object-none"
      />
      <p className="w-[95px] h-[27px] absolute left-[334px] top-[378px] text-base font-semibold text-left text-[#454545]">
        오리
      </p>
      <img
        alt=""
        src="multiply-1.png"
        className="w-[53px] h-[53px] absolute left-[1192.5px] top-[306.5px] object-cover"
      />
      <div className="w-[75px] h-[76px] absolute left-[1155px] top-[678px] rounded-[50px] bg-white border-2 border-[#fde2e2]" />
      <img
        alt=""
        src="pencil-1.png"
        className="w-[50px] h-[50px] absolute left-[1167.5px] top-[691.5px] object-cover"
      />
      <img alt="" src="delete-1.png" className="w-[18px] h-[18px] absolute left-[438.5px] top-[523.5px] object-cover" />
      <img alt="" src="edit-1.png" className="w-[18px] h-[18px] absolute left-[412.5px] top-[523.5px] object-cover" />
      <img
        alt=""
        src="mail-box-1.png"
        className="w-[67px] h-[67px] absolute left-[239.5px] top-[246.5px] object-cover"
      />
    </div>
  );
}

interface GuestBookItemProps {
  name: string;
  message: string;
  profileImg: string;
}

function GuestBookItem({ item }: GuestBookItemProps): JSX.Element {
  return (
    <div className="w-[208px] h-[204px] rounded-xl bg-white border border-[#fde2e2] p-4">
      <div className="flex flex-row mb-2">
        <div className="flex justify-center w-6 h-6 lg:w-6 lg:h-6 rounded-full  bg-[#FCCACA] mr-2">
          <img className="m-1 rounded-full object-contain" src={`${profileImg}`} alt="프로필 이미지" />
        </div>
        <p className="w-[95px] h-[26px] text-base font-semibold text-left text-[#454545]">오리</p>
      </div>
      <p className="w-[174px] h-[120px] text-base text-left text-[#747474] overflow-hidden">
        안녕하세요. 왔다감 안녕하세요. 왔다감 안녕하세요. 왔다감 안녕하세요. 왔다감 안녕하세요. 왔다감 안녕하세요.
        왔다감 안녕하세요. 왔다감
      </p>
      {/* 오른쪽 아래 수정 및 삭제 버튼 */}
      <div className="bottom-0 flex justify-end gap-2">
        <button className="">
          <img alt="" src="/images/icons/delete.png" className="w-[18px] h-[18px] object-cover" />
        </button>
        <button className="">
          <img alt="" src="/images/icons/edit.png" className="w-[18px] h-[18px] object-cover" />
        </button>
      </div>
    </div>
  );
}

<div className="w-[208px] h-[204px] rounded-xl bg-white border border-[#fde2e2] p-4">
  <div className="flex flex-row mb-2">
    <div className="flex justify-center w-6 h-6 lg:w-6 lg:h-6 rounded-full  bg-[#FCCACA] mr-2">
      <img className="m-1 rounded-full object-contain" src={`${profileImg}`} alt="프로필 이미지" />
    </div>
    <p className="w-[95px] h-[26px] text-base font-semibold text-left text-[#454545]">오리</p>
  </div>
  <p className="w-[174px] h-[120px] text-base text-left text-[#747474] overflow-hidden">
    안녕하세요. 왔다감 안녕하세요. 왔다감 안녕하세요. 왔다감 안녕하세요. 왔다감 안녕하세요. 왔다감 안녕하세요. 왔다감
    안녕하세요. 왔다감
  </p>
  {/* 오른쪽 아래 수정 및 삭제 버튼 */}
  <div className="bottom-0 flex justify-end gap-2">
    <button className="">
      <img alt="" src="/images/icons/delete.png" className="w-[18px] h-[18px] object-cover" />
    </button>
    <button className="">
      <img alt="" src="/images/icons/edit.png" className="w-[18px] h-[18px] object-cover" />
    </button>
  </div>
</div>;

const guestBookList: GuestBookItemProps[] = [
  {
    name: '오리',
    message:
      '안녕하세요. 왔다감 안녕하세요. 왔다감 안녕하세요. 왔다감 안녕하세요. 왔다감 안녕하세요. 왔다감 안녕하세요. 왔다감 안녕하세요. 왔다감',
    profileImg: 'https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m9.png'
  },
  {
    name: '고양이',
    message: '냐옹',
    profileImg: 'https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m1.png'
  },
  {
    name: '강아지',
    message: '멍멍',
    profileImg: 'https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m4.png'
  }
];

function GuestBookList({ onClose }: Props): JSX.Element {
  const profileImg = 'https://modoostock.s3.ap-northeast-2.amazonaws.com/images/navImg/m9.png';

  return (
    <>
      <div className="flex flex-col w-fit h-[544px]">
        <div className="flex w-full h-[82px] rounded-tl-lg rounded-tr-lg bg-[#fde2e2] items-center px-8 justify-between">
          <div className="flex items-center">
            <img alt="" src="/images/icons/mailBox.png" className="w-[64px] h-[64px] object-cover" />
            <p className="text-5xl font-semibold text-center text-[#ff6060] pl-4">방명록</p>
          </div>
          <button className="w-[52px] h-[52px] object-cover round-full" onClick={onClose}>
            <img alt="" src="/images/icons/multiply.png" className="w-[52px] h-[52px] object-cover round-full" />
          </button>
        </div>
        <div className="w-fit h-[462px] rounded-bl-lg rounded-br-lg bg-[#fff6f2] border border-[#fde2e2] overflow-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-4">
            {/* amp */}
            {guestBookList.map((item, index) => (
              <GuestBookItem item={item}></GuestBookItem>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default GuestBookList;
