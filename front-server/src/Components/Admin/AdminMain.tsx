import { useNavigate } from 'react-router-dom';

function AdminMain(): JSX.Element {
  const navigate = useNavigate();
  const click = (e: React.MouseEvent) => {
    switch (e.currentTarget.ariaLabel) {
      case '유저':
        navigate('/admin/user');
        break;
      case '주식':
        navigate('/admin/market');
        break;
      case '에셋':
        break;
      case '거래':
        navigate('/admin/deal');
        break;
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="hidden lg:flex justify-center text-center lg:text-[1.3rem] font-semibold text-[#A87E6E] hover:font-extrabold space-x-4">
          <div
            aria-label="유저"
            className={`px-16 py-2 mr-2 rounded-lg bg-[#F0ECE9] border-[#A87E6E] border-4 transition-all duration-300 hover:scale-110 cursor-pointer hover:bg-white hover:text-[#8e5830]`}
            onClick={click}>
            유저
          </div>
          <div
            aria-label="주식"
            className={`px-16 py-2 mr-2 rounded-lg bg-[#F0ECE9] border-[#A87E6E] border-4 transition-all duration-300 hover:scale-110 cursor-pointer hover:bg-white hover:text-[#8e5830]`}
            onClick={click}>
            주식 시즌
          </div>
          <div
            aria-label="에셋"
            className={`px-16 py-2 mr-2 rounded-lg bg-[#F0ECE9] border-[#A87E6E] border-4 transition-all duration-300 hover:scale-110 cursor-pointer hover:bg-white hover:text-[#8e5830]`}
            onClick={click}>
            에셋
          </div>
          <div
            aria-label="거래"
            className={`px-16 py-2 mr-2 rounded-lg bg-[#F0ECE9] border-[#A87E6E] border-4 transition-all duration-300 hover:scale-110 cursor-pointer hover:bg-white hover:text-[#8e5830]`}
            onClick={click}>
            거래내역
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminMain;
