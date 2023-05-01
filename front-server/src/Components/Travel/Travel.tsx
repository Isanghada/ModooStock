import { Canvas } from '@react-three/fiber';
import Bathroom from 'Components/Main/Bathroom';
import Error from 'Components/Common/Error';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUsersTravelInfoQuery, useLazyGetUsersRandomQuery } from 'Store/api';
import Loading from 'Components/Common/Loading';

function TravelRoom(): JSX.Element {
  return (
    <div className="flex justify-center items-center w-[65%] h-full relative">
      <div className="absolute flex items-end justify-center lg:w-[95%] xl:w-[85%] top-[56%]">
        <img aria-label="마카롱" className={`object-contain w-full`} src="/images/toys/floor.png" alt="" />
      </div>
      <div className="w-[80%] flex justify-center h-[87%] items-center">
        <Canvas
          style={{ width: '100%', height: '100%', paddingTop: '6%' }}
          orthographic
          camera={{
            left: -1,
            right: 1,
            top: 1,
            bottom: -1,
            near: 0.1,
            far: 1000,
            zoom: 100
          }}>
          <ambientLight intensity={0.5} />
          <pointLight distance={2000} position={10} power={8} />
          <Bathroom len={0.0055} pos={[0, -1, -8]} rot={[1.75, 0, 0.2]} />
        </Canvas>
      </div>
    </div>);
};

function MobileTravelRoom(): JSX.Element { 
  return (
    <div className="flex justify-evenly items-center w-[65%] md:w-[58%] h-full relative">
      <div className="absolute flex items-end justify-center lg:w-[95%] xl:w-[85%] top-[56%]">
        <img aria-label="마카롱" className={`object-contain w-full`} src="/images/toys/floor.png" alt="" />
      </div>
      <div className="w-[80%] flex justify-center h-[87%] items-center">
        <Canvas
          style={{ width: '100%', height: '100%', paddingBottom: '20%' }}
          orthographic
          camera={{
            left: -1,
            right: 1,
            top: 1,
            bottom: -1,
            near: 0.1,
            far: 1000,
            zoom: 100
          }}>
          <ambientLight intensity={0.5} />
          <pointLight distance={2000} position={10} power={8} />
          <Bathroom len={0.0055} pos={[0, -1, -8]} rot={[1.75, 0, 0.2]} />
        </Canvas>
      </div>
    </div>
  );
};

function BottomButtons(): JSX.Element { 
  const [getUsersRandom] = useLazyGetUsersRandomQuery();
  const navigate = useNavigate();

  // 랜덤 방문 API 호출
  const handleRandomVisit = async() => { 
    // 랜덤 유저 API
    const { data } = await getUsersRandom('');

    if (data) {
      navigate(`/travel/${data.data.nickname}`);
    }
  };

  return (
    <div className="absolute flex items-center justify-between w-full mx-auto h-[3rem] md:h-[5rem] lg:h-[rem] bottom-0 lg:bottom-2 z-10 text-white py-2 mx-2 text-[0.9rem] lg:text-[1.1rem] text-center font-bold md:px-2 lg:px-6">
    <button className="w-[6rem] lg:w-[9.375rem] py-1 rounded-xl bg-[#707070]  drop-shadow-lg hover:scale-105 transition-all duration-300" onClick={() => navigate(-1)}>돌아가기</button>
    <button className="w-[6rem] lg:w-[9.375rem] py-1 rounded-xl bg-[#ff7b7b]  drop-shadow-lg hover:scale-105 transition-all duration-300"  onClick={handleRandomVisit}>랜덤 방문</button>
  </div>
  );
};

function Travel(): JSX.Element {

  const { nickname } = useParams() as { nickname: string };
  const { data: user, isLoading, isError } = useGetUsersTravelInfoQuery(nickname);

  const navigate = useNavigate();

  if (isError)
    navigate("/error");
  
  if (isLoading)
    return <Loading />;

  return (
    <>
      {/* 데스크탑 */}
        <>
          <div className="hidden items-center w-full h-full justify-evenly max-w-[80rem] min-h-[43rem] max-h-[46.5rem] my-auto mx-auto lg:flex">
            <div className="flex justify-center items-center lg:w-[33%] lg:pl-[2%] xl:pl-0 xl:w-[27%]">
              <div className="flex flex-col w-full font-extrabold justify-center items-center rounded-3xl bg-white p-2 drop-shadow-lg">
                {/* 프로필 이미지 */}
                <div className="flex justify-center mt-5 p-2 w-[5rem] h-[5rem] lg:w-[8rem] lg:h-[8rem] max-w-[10rem] max-h-[10rem] rounded-full  bg-[#fb7c7c]">
                  <img className="m-2 rounded-full object-contain" src={user?.data.profileImagePath} alt="프로필 이미지" />
                </div>
                {/* 닉네임 */}
                <div className="flex items-center justify-center w-full px-2 py-2">
                  <p className="text-[2.25rem] font-bold text-center text-[#0e0e0e]">
                    {user?.data.nickname}
                  </p>
                </div>
                {/* 한줄 소개 */}
                <div className="w-5/6 h-[12.5rem] rounded-[0.625rem] bg-[#fff6f2] p-2" >
                  <p className="w-full 3rem text-[1.5rem] font-bold text-center">
                    <span className="w-full h-[3rem] text-[#707070]">“</span>
                    <span className="w-full h-[3rem] text-[#ff7b7b]">
                    {" "}{user?.data.introduction}{" "}
                    </span>
                    <span className="w-full h-[3rem] text-[#707070]">”</span>
                  </p>
                </div>
                {/* 라인 */}
                <div className='w-5/6 text-center mt-4 border-b border-solid border-[#E0E0E0] leading-[0.1em]' />
                <div className="flex items-center justify-between w-5/6 px-2 py-2">
                  <img className="w-[2rem] h-[1.5rem] object-contain" src="/images/icons/coin.png" alt="돈" />
                  <p className="w-[17.5rem] text-xl font-bold text-right text-black">
                    {(user?.data.totalCash)?.toLocaleString()}원
                  </p>
                </div>
            </div>
          </div>
          {/* 오른쪽 홈피 */}
          <TravelRoom />
        </div>
        {/* 모바일 */}
        <div className="relative flex items-center justify-between w-full h-full overflow-y-hidden max-w-[41.6rem] md:max-w-[50rem] max-h-[23.4rem] lg:hidden mx-auto my-auto">
          <div className="flex w-full h-full">
            {/* 왼쪽부분 */}
            <div className="flex flex-col justify-center w-[35%] md:w-[30%] font-extrabold">
              {/* 여기에 넣음 */}
              <div className="flex flex-col w-full font-extrabold">
                <div className="flex flex-col justify-center items-center rounded-2xl bg-white py-2 px-6 drop-shadow-lg" >
                  {/* 프로필 이미지 */}
                  <div className="flex justify-center mt-3 p-2 w-[5.5rem] h-[5.5rem] lg:w-[8rem] lg:h-[8rem] max-w-[8rem] max-h-[8rem] rounded-full  bg-[#fb7c7c]">
                      <img className="m-2 rounded-full object-contain" src={user?.data.profileImagePath} alt="프로필 이미지" />
                  </div>
                  {/* 닉네임 */}
                  <div className="flex items-center justify-center w-full px-2 py-2">
                    <p className="text-lg font-bold text-center text-[#0e0e0e]">
                      {user?.data.nickname}
                    </p>
                  </div>
                  {/* 한줄 소개 */}
                  <div className="w-full h-3/4 rounded-[0.625rem] bg-[#fff6f2] p-2" >
                    <p className="w-full h-[3rem] text-md font-bold text-center">
                      <span className="w-full text-[#707070]">“</span>
                      <span className="w-full text-[#ff7b7b]">
                        {" "}{user?.data.introduction}{" "}
                      </span>
                      <span className="w-full text-[#707070]">”</span>
                    </p>
                  </div>
                  {/* 라인 */}
                  <div  className='w-full text-center mt-2 border-b border-solid border-[#E0E0E0] leading-[0.1em]' />
                  <div className="flex items-center justify-between w-full py-2">
                    <img className="w-[1.5rem] h-[1.5rem] object-contain" src="/images/icons/coin.png" alt="돈" />
                    <p className="text-[1rem] font-bold text-right text-black">
                      {(user?.data.totalCash)?.toLocaleString()}원
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-[12%]"></div>
            <MobileTravelRoom />
          </div>
        </div>
        </>
      
      {/* 돌아가기 & 랜덤 방문 버튼 */}
      <BottomButtons />
    </>
  );
}

export default Travel;
