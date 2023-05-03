// import Error from 'Components/Common/Error';
// import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import Loading from 'Components/Common/Loading';
import Modal from 'Components/Main/Modal';
import LotteryModal from './LotteryModal';

function Test(): JSX.Element {
  return (
    <div className="w-[500px] h-[569px]">
      <div
        className="w-[500px] h-[569px] absolute left-[159.11px] top-[264.11px] rounded-[31.53px] bg-[#fff2cc]/60 border-[3.78px] border-[#f0a633]/60"
        style={{ boxShadow: '5px 5px 10px 0 rgba(0,0,0,0.25)' }}
      />
      {/* <img
        className="w-[500px] h-[569px] absolute left-[160.5px] top-[265.5px] rounded-[31.53px]"
        src="images/logos/IntroBG.png"
        alt="인트로"
      /> */}
      <div
        className="bg-cover bg-center w-[500px] h-[569px] absolute left-[160.5px] top-[265.5px] rounded-[31.53px]"
        style={{ backgroundImage: `url(images/logos/IntroBG.png)`, opacity: 0.4 }}></div>
      <div className="w-[220px] h-14 absolute left-[301.5px] top-[724.5px] rounded-[99px] object-none bg-[#ffc34f]" />
      <div className="w-[104.15px] h-[32.58px] absolute left-[355.5px] top-[735px] bg-[#ffc34f]" />
      <p className="w-[177px] h-[58px] absolute left-[323px] top-[735px] text-3xl font-bold text-center text-white">
        구매하기
      </p>
      <p className="w-[267px] h-16 absolute left-[278px] top-[333px] text-[50px] font-bold text-center text-[#f0a633]">
        스피드 복권
      </p>
      <p className="w-[303px] h-20 absolute left-[260px] top-[457px] text-xl text-center text-black">
        <span className="w-[303px] h-20 text-xl text-center text-black">긁어봐 당첨 복권!</span>
        <br />
        <span className="w-[303px] h-20 text-xl text-center text-black">단돈 만원으로 최대 오천만원까지</span>
      </p>
    </div>
  );
}

function Lottery(): JSX.Element {
  // const navigate = useNavigate();

  // if (isError) navigate('/error');

  // if (isLoading) return <Loading />;

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* 데스크탑 */}
      <div className="hidden items-center w-full h-full justify-evenly max-w-[80rem] min-h-[43rem] max-h-[46.5rem] my-auto mx-auto lg:flex">
        {/* 1. 스피드 복권 */}
        <div className="flex flex-col w-[25%] md:w-[23%] md:min-w-[23%] lg:min-w-[20%] lg:w-1/5 mx-2 text-center border-2 rounded-[2rem] bg-[#FFF2CC]/60 border-[#F0A633]/60">
          <div className="py-2 lg:py-5">
            <span className="font-extrabold text-[1.2rem] md:text-[1.5rem] lg:text-[2rem] text-[#F0A633] ">
              스피드 복권
            </span>
          </div>
          <div className="font-medium leading-5 text-[#707070] text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem]">
            <span>긁어봐 당첨 복권!</span> <br />
            <span>단돈 만원으로 최대 오천만원까지</span>
          </div>
          <div className="py-4 mx-auto lg:py-8 h-[4rem] md:h-[5rem] lg:h-[7rem]"></div>
          <div className="pb-4 lg:pb-5">
            <div
              aria-label="스피드 복권 구매"
              className="px-4 py-1 mx-auto font-extrabold text-white cursor-pointer rounded-3xl w-[60%] bg-[#FFC24E]/80 text-[0.8rem] md:text-[0.9rem] lg:text-[1.1rem] hover:bg-[#FFC24E] hover:scale-110 transition-all duration-300"
              onClick={handleOpenModal}>
              구매 하기
            </div>
          </div>
        </div>
        {/* 2. 어둠의 복권 */}
        <div className="flex flex-col w-[25%] md:w-[23%] md:min-w-[23%] lg:min-w-[20%] lg:w-1/5 mx-2 text-center border-2 rounded-[2rem] bg-[#D7E9F7]/60 border-[#748DA6]/60">
          <div className="py-2 lg:py-5">
            <span className="font-extrabold text-[1.2rem] md:text-[1.5rem] lg:text-[2rem] text-[#748DA6] ">
              어둠의 복권
            </span>
          </div>
          <div className="font-medium leading-5 text-[#707070] text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem]">
            <span>모 아님 도</span> <br />
            <span>백만원으로 10억원 vs 꽝</span>
          </div>
          <div className="py-4 mx-auto lg:py-8 h-[4rem] md:h-[5rem] lg:h-[7rem]"></div>
          <div className="pb-4 lg:pb-5">
            <div
              aria-label="어둠의 복권"
              className="px-4 py-1 mx-auto font-extrabold text-white cursor-pointer rounded-3xl w-[60%] bg-[#2C94EA]/80 text-[0.8rem] md:text-[0.9rem] lg:text-[1.1rem] hover:bg-[#2C94EA] hover:scale-110 transition-all duration-300"
              onClick={() => {}}>
              구매 하기
            </div>
          </div>
        </div>
      </div>
      {/* 모바일 */}
      <div className="relative flex items-center justify-between w-full h-full overflow-y-hidden max-w-[41.6rem] md:max-w-[50rem] max-h-[23.4rem] lg:hidden mx-auto my-auto">
        <div className="flex w-full h-full"></div>
      </div>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <LotteryModal />
      </Modal>
    </>
  );
}

export default Lottery;
