import React from "react";

interface Props {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
}

const screenHeight = window.screen.height;

const Container: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <div className={`w-full flex flex-col justify-center items-center ${
    screenHeight >= 800 ? 'lg:min-h-[32rem] min-h-[19rem]' : ''
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
  <p className="mb-2 md:mb-3 lg:mb-5 font-medium text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem] text-center text-[#707070]">
    {description}
  </p>
);

const SearchBar: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-full lg:w-[35rem] h-12 lg:h-14 rounded-t-xl flex flex-row items-center justify-center bg-[#fde2e2]" >
    {children}
    <button className="px-4 py-1 text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem] ml-3 lg:ml-5 font-bold text-center text-white bg-[#FFC1B7]/80 rounded-md hover:scale-105 hover:bg-[#FFC1B7] transition-all duration-300">검색</button>
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
  <div className="mb-2 md:mb-4 lg:mb-6 w-full lg:w-[35rem] h-[5rem] md:h-[13rem] lg:h-[15rem] rounded-b-xl bg-[#fff6f2] flex flex-col items-center overflow-auto">
    {children}
  </div>
);


const User: React.FC<{ nickname: string; profileImagePath: string }> = ({ nickname, profileImagePath }) => (
    <div className='lg:h-[2.875rem] rounded-[5px] bg-white m-2 p-2 flex justify-between items-center'>
      <div className="flex items-center">
        <img
          src={profileImagePath} alt={nickname}
          className="w-[1.5rem] md:w-[1.7rem] lg:w-[2.25rem] md:h-[1.7rem] lg:h-[2.25rem] rounded-full object-contain mr-4"/>
        <p className="w-[9.125rem] text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem] font-extrabold text-left text-black items-center">
          {nickname}
        </p>
      </div>
      <button className="px-4 py-1 font-medium text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem] rounded-[5px] bg-[#ffc1b7]/80 font-bold text-center text-white hover:scale-105 hover:bg-[#ffc1b7] transition-all duration-300">
        방문
      </button>
  </div>
);
const UserList: React.FC<{ users: { nickname: string; profileImagePath: string }[] }> = ({ users }) => (
  <div className='lg:w-[26.125rem] '>
    {users.map((user, index) => (
      <User key={index} nickname={user.nickname} profileImagePath={user.profileImagePath} />
    ))}
  </div>
);

const VisitModal = ({ onClose }: Props) => {
  const title = "방문하기";
  const description = "랜덤 또는 검색을 통해 다른 사람의 꾸며진 집을 방문해 볼 수 있어요.";

  const sampleImagePath = "https://raw.githubusercontent.com/hyeonaseome/trycatchAnswer/main/pinkProfile.png";

  const users = [
    { nickname: "PINK1", profileImagePath: sampleImagePath },
    { nickname: "PINK2", profileImagePath: sampleImagePath },
    { nickname: "PINK3", profileImagePath: sampleImagePath },
    { nickname: "PINK4", profileImagePath: sampleImagePath },
    { nickname: "PINK5", profileImagePath: sampleImagePath },
    { nickname: "PINK6", profileImagePath: sampleImagePath },
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
        <div className='flex mt-1 lg:mt-3'>
          <button className="w-[5rem] md:w-[6.2rem] lg:w-[7.5rem] py-1 rounded-3xl bg-[#969696]/80 font-bold text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] text-center text-white hover:scale-105 hover:bg-[#969696] transition-all duration-300 mr-7" onClick={onClose}>닫기</button>
          <button className="w-[5rem] md:w-[6.2rem] lg:w-[7.5rem] py-1 rounded-3xl bg-[#ff7b7b]/80 font-bold text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] text-center text-white hover:scale-105 hover:bg-[#ff7b7b] transition-all duration-300 " onClick={handleRandomVisit}>랜덤 방문</button>
        </div>
      </Container>
    </div>
  );
};

export default VisitModal;