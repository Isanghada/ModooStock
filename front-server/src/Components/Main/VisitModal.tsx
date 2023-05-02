import React, { useState } from 'react';
import { useLazyGetUsersSearchQuery, useLazyGetUsersRandomQuery } from 'Store/api';
import { useNavigate } from 'react-router-dom';

interface Props {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
}

const screenHeight = window.screen.height;

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className={`w-full flex flex-col justify-center items-center ${
      screenHeight >= 800 ? 'lg:min-h-[28rem] min-h-[14rem]' : ''
    }`}>
    {children}
  </div>
);

const Title: React.FC<{ title: string }> = ({ title }) => (
  <p className="pb-2 md:pb-3 lg:pb-5 text-[1.2rem] md:text-[1.5rem] lg:text-[2rem] font-extrabold text-center text-[#ecb7bb]">
    {title}
  </p>
);

const Description: React.FC<{ description: string }> = ({ description }) => (
  <p className="mb-1 md:mb-3 lg:mb-5 font-medium text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem] text-center text-[#707070]">
    {description}
  </p>
);

const SearchBar: React.FC<{
  children: React.ReactNode;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}> = ({ children, handleSubmit }) => (
  <form
    className="w-full lg:w-[35rem] h-12 lg:h-14 rounded-t-xl flex flex-row items-center justify-center bg-[#fde2e2]"
    onSubmit={handleSubmit}>
    {children}
    <button
      type="submit"
      className="px-4 py-1 text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem] ml-3 lg:ml-5 font-bold text-center text-white bg-[#F99F9F] rounded-md hover:scale-105 drop-shadow-lg transition-all duration-300">
      검색
    </button>
  </form>
);

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    className="w-[70%] lg:w-[25.25rem] h-[2rem] lg:h-[2.125rem] font-medium text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem] outline-none px-2 rounded-md"
    placeholder="사용자의 계정 및 닉네임을 검색해보세요"
  />
);

const Box: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className={`w-full lg:w-[35rem]  lg:h-[15rem] max-h-[15rem] rounded-b-xl bg-[#fff6f2] flex flex-col items-center overflow-auto
  ${screenHeight >= 900 ? 'h-[5rem] md:h-[12rem]' : 'h-[5rem]'}`}>
    {children}
  </div>
);

interface UserInfo {
  account: string;
  nickname: string;
  profileImagePath: string;
}

const User: React.FC<UserInfo> = ({ nickname, profileImagePath, account }) => {
  const navigate = useNavigate();

  return (
    <div className="lg:h-[2.875rem] rounded-[5px] bg-white m-2 p-2 flex justify-between items-center">
      <div className="flex items-center">
        <img
          src={profileImagePath}
          alt={nickname}
          className="w-[1.5rem] md:w-[1.7rem] lg:w-[2.25rem] md:h-[1.7rem] lg:h-[2.25rem] rounded-full object-contain mr-4 p-1 bg-[#ffc1b7]"
        />
        <div className="flex flex-col w-[12rem] lg:w-full">
          <p className="text-[0.3rem] md:text-[0.4rem] lg:text-[0.6rem] font-medium text-left text-black items-center">
            {account}
          </p>
          <p className="text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem] font-extrabold text-left text-black items-center">
            {nickname}
          </p>
        </div>
      </div>
      <button
        className="px-4 py-1 font-medium text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem] rounded-[5px] bg-[#ffc1b7] font-bold text-center text-white hover:scale-105 transition-all duration-300 drop-shadow-md"
        onClick={() => navigate(`/travel/${nickname}`)}>
        방문
      </button>
    </div>
  );
};

const UserList: React.FC<{ users: Array<UserInfo> }> = ({ users }) => (
  <>
    <div className="lg:w-[26.125rem] ">
      {users &&
        users.map((user, index) => (
          <User key={index} nickname={user.nickname} profileImagePath={user.profileImagePath} account={user.account} />
        ))}
    </div>
    {users && users.length === 0 && (
      <div className="p-2 font-medium text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem] text-center text-[#707070]">
        검색 결과가 없습니다.
      </div>
    )}
  </>
);

const VisitModal = ({ onClose }: Props) => {
  const title = '방문하기';
  const description = '랜덤 또는 검색을 통해 다른 사람의 꾸며진 집을 방문해 볼 수 있어요.';

  const [users, setsUsers] = useState<Array<UserInfo>>([]);
  const [getUsersSearch] = useLazyGetUsersSearchQuery();

  const getUsers = async () => {
    // 유저 검색 API
    const { data } = await getUsersSearch(encodeURIComponent(searchQuery));
    console.log(data);

    if (data) {
      setsUsers(data.data);
    }
  };

  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    getUsers();
    setSearchQuery('');
  };

  const [getUsersRandom] = useLazyGetUsersRandomQuery();
  const navigate = useNavigate();

  // 랜덤 방문 API 호출
  const handleRandomVisit = async () => {
    // 랜덤 유저 API
    const { data } = await getUsersRandom('');

    if (data) {
      navigate(`/travel/${data.data.nickname}`);
    }
  };

  return (
    <div className="max-h-screen min-h-full">
      <Container>
        <Title title={title} />
        <Description description={description} />
        <SearchBar handleSubmit={handleSubmit}>
          <SearchInput value={searchQuery} onChange={handleInputChange} />
        </SearchBar>
        <Box>
          <UserList users={users} />
        </Box>
        <div className="flex mt-4 lg:mt-6 text-center text-white space-x-3font-bold text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] space-x-7">
          <button
            className="w-[5rem] md:w-[6.2rem] lg:w-[7.5rem] py-1 rounded-full bg-[#969696] drop-shadow-lg hover:scale-105 hover:bg-[#969696] transition-all duration-300"
            onClick={onClose}>
            닫기
          </button>
          <button
            className="w-[5rem] md:w-[6.2rem] lg:w-[7.5rem] py-1 rounded-full bg-[#ff7b7b]  drop-shadow-lg hover:scale-105 transition-all duration-300 "
            onClick={handleRandomVisit}>
            랜덤 방문
          </button>
        </div>
      </Container>
    </div>
  );
};

export default VisitModal;
