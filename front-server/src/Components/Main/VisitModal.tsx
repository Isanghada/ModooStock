import React from "react";
import image65 from "./image65.png";

interface Props {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
}

const screenHeight = window.screen.height;

const Container: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <div className={`w-full flex flex-col justify-center items-center md:p-5 ${
    screenHeight >= 800 ? 'lg:min-h-[38rem] min-h-[19rem]' : ''
  }`}>
    {children}
  </div>
);

const Title: React.FC<{ title: string }> = ({ title }) => (
  <p className="pb-2 md:pb-4 lg:pb-6 text-[1.2rem] md:text-[1.5rem] lg:text-[2rem] font-extrabold text-center text-[#ecb7bb]">
    {title}
  </p>
);

const Description: React.FC<{ description: string }> = ({ description }) => (
  <p className="mb-2 lg:mb-5 font-medium text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem] text-center text-[#707070]">
    {description}
  </p>
);

const SearchBar: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-full lg:w-[38rem] h-14 rounded-t-xl flex flex-row items-center justify-center bg-[#fde2e2]" >
    {children}
    <button className="w-[3.875rem] h-[2.125rem] font-medium text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem] ml-5 font-bold text-center text-white bg-[#FFC1B7] rounded-md hover:scale-105 transition-all duration-300">검색</button>
  </div>
);

const SearchInput: React.FC = () => (
    <input
      type="text"
      className="w-[70%] lg:w-[25.25rem] h-[2rem] lg:h-[2.125rem] font-medium text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem] outline-none px-2 rounded-md"
      placeholder="다른 사용자의 이름을 검색해보세요"
    />
);


const Box: React.FC<{children: React.ReactNode}>  = ({ children }) => (
  <div className="mb-2 md:mb-4 lg:mb-6 w-full lg:w-[38rem] h-[5rem] md:h-[15rem] lg:h-[16.25rem] rounded-b-xl bg-[#fff6f2] flex flex-col items-center overflow-auto">
    {children}
  </div>
);


const User: React.FC<{ nickname: string; profileImagePath: string }> = ({ nickname, profileImagePath }) => (
    <div className='lg:w-[26.125rem] lg:h-[2.875rem] rounded-[5px] bg-white m-2 p-2 flex justify-between items-center'>
      <div className="flex items-center">
        <img
          src={profileImagePath} alt={nickname}
          className="w-[2.25rem] h-[2.25rem] rounded-full object-none mr-4"/>
        <p className="w-[9.125rem] text-[1.2rem] md:text-[1.5rem] lg:text-[2rem] font-extrabold text-left text-black items-center">
          {nickname}
        </p>
      </div>
      <button className="w-[4.5rem] h-[2.125rem] font-medium text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem] rounded-[5px] bg-[#ffc1b7] text-base font-bold text-center text-white hover:scale-105 transition-all duration-300">
        방문
      </button>
  </div>
);
const UserList: React.FC<{ users: { nickname: string; profileImagePath: string }[] }> = ({ users }) => (
  <div>
    {users.map((user, index) => (
      <User key={index} nickname={user.nickname} profileImagePath={user.profileImagePath} />
    ))}
  </div>
);

const VisitModal = ({ onClose }: Props) => {
  const title = "방문하기";
  const description = "랜덤 또는 검색을 통해 다른 사람의 꾸며진 집을 방문해 볼 수 있어요.";

  const users = [
    { nickname: "PINK1", profileImagePath: image65 },
    { nickname: "PINK2", profileImagePath: image65 },
    { nickname: "PINK3", profileImagePath: image65 },
    { nickname: "PINK4", profileImagePath: image65 },
    { nickname: "PINK5", profileImagePath: image65 },
    { nickname: "PINK6", profileImagePath: image65 },
  ];

  // TODO 랜덤 방문 API 호출
  const handleRandomVisit = () => { };
  
  return (
    <div className='max-h-screen min-h-full'>
      <Container>
        <Title title={title} />
        <Description description={description} />
        <SearchBar>
            <SearchInput />
        </SearchBar>
        <Box>
          <UserList users={users} />
        </Box>
        <div className='flex mt-3'>
          <button className="w-[7.5rem] h-9 rounded-3xl bg-[#969696] text-[1rem] font-bold text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem]text-center text-white hover:scale-105 transition-all duration-300 mr-5" onClick={onClose}>닫기</button>
          <button className="w-[7.5rem] h-9 rounded-3xl bg-[#ff7b7b] text-[1rem] font-bold text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem]text-center text-white hover:scale-105 transition-all duration-300 " onClick={handleRandomVisit}>랜덤 방문</button>
        </div>
      </Container>
    </div>
  );
};

export default VisitModal;