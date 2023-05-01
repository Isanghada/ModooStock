import { useEffect, useState } from 'react';
import { useGetNewsInfoQuery } from 'Store/api';
import InfoModal from './InfoModal';

const infoList = [
  { name: '전자', color: 'text-blue-600' },
  { name: '화학', color: 'text-red-600' },
  { name: '생명', color: 'text-green-600' },
  { name: 'IT', color: 'text-orange-600' }
];

interface infoDataInterFace {
  name: string;
  color: string;
  price: string;
}


function InfoShop(): JSX.Element {
  // 모달 전달 데이터
  const [modalData, setModalData] = useState<infoDataInterFace>({ name: '', color: '', price: '' });
  // 모달 관련
  const [modalOpen, setModalOpen] = useState(false);
  // 모달 창 닫기
  function closeModal() {
    setModalOpen(false);
  }
  // 뉴스 데이터 API
  const { data: dataNewsInfo } = useGetNewsInfoQuery('');

  // 클릭 이벤트 처리
  const onClick = async (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    const name = target.ariaLabel;
    const color = target.dataset.color;
    if (name && color) {
      switch (name) {
        case '전자':
          setModalData({ name, color, price: '17500' });
          setModalOpen(true);
          break;
        case '화학':
          setModalData({ name, color, price: '17500' });
          setModalOpen(true);
          break;
        case '생명':
          setModalData({ name, color, price: '17500' });
          setModalOpen(true);
          break;
        case 'IT':
          setModalData({ name, color, price: '17500' });
          setModalOpen(true);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (dataNewsInfo) {
      const { data } = dataNewsInfo;
      console.log(data, "데이터!!!")
    }
    const date = new Date();
    console.log(date, "시간");
  }, [dataNewsInfo]);

  return (
    <>
      <InfoModal
        isOpen={modalOpen}
        msg={'정보를 구매하시겠습니까?'}
        // propsFunction={logout}
        propsData={modalData}
        closeModal={closeModal}
        accept={'구매하기'}
        cancel={'취소'}
      />
      <div className="flex items-center w-full h-[90vh] mt-[10vh]">
        <div className="w-[30%] h-[90%] border-r-4 border-white flex flex-col items-center justify-between">
          <div className="flex flex-col items-start justify-end w-[70%] h-1/6">
            <div className="text-xs lg:text-base">게임 속 시간</div>
            <div className="text-sm font-bold lg:text-xl">2023.05.01</div>
          </div>
          <div className="flex justify-center w-[70%] h-[10%] bg-white shadow-md shadow-gray-400 cursor-pointer hover:bg-slate-100">
            <img className="w-auto h-full" src="/images/icons/news.png" alt="news" />
            <div className="flex items-center justify-center w-2/3 h-full text-sm font-bold lg:w-1/2 lg:text-xl">
              뉴스 스크랩
            </div>
          </div>
          <div className="my-2 text-[0.5rem] lg:text-sm font-semibold text-gray-600 break-words w-2/3 lg:w-full text-center">
            구매한 뉴스는 뉴스 스크랩에서 확인 가능합니다
          </div>
          <div className="flex flex-col items-center justify-end h-[60%]">
            <div className="text-2xl font-bold lg:text-3xl">3월</div>
            <div className="text-xs font-semibold lg:text-base">뉴스를 구매하실 수 있습니다</div>
            <div className="text-xs font-semibold text-red-500 lg:text-base">"날짜를 주의깊게 확인해주세요"</div>
          </div>
        </div>
        <div className="w-[70%]  h-[90%]">
          <div className="flex items-end justify-start h-1/6">
            <div className="px-2 text-xl font-bold lg:px-4 lg:text-5xl ">뉴스</div>
            <div className="text-sm font-bold text-red-500 lg:text-lg">중복된 뉴스가 나올 수 있습니다</div>
          </div>
          <div className="flex flex-col items-center justify-evenly h-5/6">
            {infoList &&
              infoList.map((info) => {
                return (
                  <div
                    onClick={onClick}
                    aria-label={info.name}
                    data-color={info.color}
                    key={info.color}
                    className="h-1/6 w-[90%]">
                    <div className="flex items-center justify-center w-1/4 text-xs text-white bg-red-700 lg:text-lg lg:font-semibold h-fit lg:h-1/4">
                      속보
                    </div>
                    <div
                      className={`w-full ${info.color} bg-[#F2EDED] h-3/4 flex items-center justify-center text-lg lg:text-3xl font-bold shadow-md shadow-gray-400 cursor-pointer hover:bg-[#fbe2e2]`}>
                      {info.name}&nbsp;<span className="text-black">소식입니다</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
export default InfoShop;
