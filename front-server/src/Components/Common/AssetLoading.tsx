import Lottie from 'lottie-react';
import LoadingLottie from './Lottie/133381-house-pop-up.json';
function AssetLoading(): JSX.Element {
  return (
    <>
      <div className="w-full h-screen bg-[#FEF9F9] flex flex-col justify-center text-center">
        <div>
          <Lottie animationData={LoadingLottie} style={{ width: '30%', marginBottom: '1rem' }} className="mx-auto" />
          {/* <div className="text-[1.5rem]">집을 불러오는 중입니다.</div> */}
        </div>
      </div>
    </>
  );
}

export default AssetLoading;
