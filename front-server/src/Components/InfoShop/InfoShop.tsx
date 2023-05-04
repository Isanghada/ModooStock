import Loading from 'Components/Common/Loading';
import NewsModal from 'Components/Exchange/NewsModal';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useGetNewsInfoQuery } from 'Store/api';
import { useAppSelector } from 'Store/hooks';
import InfoModal from './InfoModal';

interface infoDataInterFace {
  name: string;
  color: string;
  price: number;
  id: number;
}
interface newsInterFace {
  dateList: [
    {
      date: string;
    }
  ];
  stockList: [
    {
      kind: string;
      price: number;
      stockId: number;
    }
  ];
}


function InfoShop(): JSX.Element {
  // 모달 전달 데이터
  const [modalData, setModalData] = useState<infoDataInterFace>({ name: '', color: '', price: 0, id: 0 });
  // 모달 관련
  const [modalOpen, setModalOpen] = useState(false);
  // 모달 창 닫기
  function closeModal() {
    setModalOpen(false);
  }

  // 뉴스 창 모달
  const [isNewsClick, setIsNewsClick] = useState<boolean>(false);

  // 뉴스 데이터 API
  const { data: dataNewsInfo } = useGetNewsInfoQuery('');

  // 뉴스 데이터
  const [newsData, setNewsData] = useState<newsInterFace | undefined>();

  // 현재 데이터 인덱스
  const currentDataIndex = useAppSelector((state) => {
    return state.getCurrentDataIndex;
  });
  // 클릭 이벤트 처리
  const onClick = async (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    const name = target.ariaLabel;
    const color = target.dataset.color;
    const price = Number(target.dataset.price);
    const id = Number(target.dataset.key);
    if (name === "뉴스스크랩") {
      setIsNewsClick(true);
    }
    if (name && color) {
      switch (color) {
        case 'text-red-600':
          setModalData({ name, color, price, id });
          setModalOpen(true);
          break;
        case 'text-blue-600':
          setModalData({ name, color, price, id });
          setModalOpen(true);
          break;
        case 'text-green-600':
          setModalData({ name, color, price, id });
          setModalOpen(true);
          break;
        case 'text-orange-600':
          setModalData({ name, color, price, id });
          setModalOpen(true);
          break;
        default:
          break;
      }
    }
  };


  useEffect(() => {
    // 뉴스 날짜들과 리스트 가져오기
    if (dataNewsInfo) {
      const { data } = dataNewsInfo;
      console.log(data,currentDataIndex,"데이터")
      setNewsData(data);
    }
  }, [dataNewsInfo, currentDataIndex]);

  return (
    <>
      <InfoModal
        isOpen={modalOpen}
        msg={'정보를 구매하시겠습니까?'}
        propsData={modalData}
        closeModal={closeModal}
        accept={'구매하기'}
        cancel={'취소'}
      />
      <NewsModal isNewsClick={isNewsClick} setIsNewsClick={setIsNewsClick} />
      {newsData ?       <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 1,
          ease: 'easeInOut'
        }} className="flex items-center w-full h-full">
        <div className="w-[30%] h-[80%] border-r-4 border-white flex flex-col items-center justify-between">
          <div className="flex flex-col items-start justify-end w-[70%] h-1/6">
            <div className="text-xs lg:text-base">게임 속 시간</div>
            <div className="text-sm font-bold lg:text-xl">{newsData.dateList[currentDataIndex] ? newsData.dateList[currentDataIndex].date : "오늘 장 종료하였습니다."}</div>
          </div>
          <div onClick={onClick} aria-label="뉴스스크랩" className="flex justify-center w-[70%] h-[10%] bg-white shadow-md shadow-gray-400 cursor-pointer hover:bg-slate-100">
            <img className="w-auto h-full" src="/images/icons/news.png" alt="news" />
            <div className="flex items-center justify-center w-2/3 h-full text-sm font-bold lg:w-1/2 lg:text-xl">
              뉴스 스크랩
            </div>
          </div>
          <div className="my-2 text-[0.5rem] lg:text-sm font-semibold text-gray-600 break-keep w-2/3 lg:w-full text-center">
            구매한 뉴스는 뉴스 스크랩에서 확인 가능합니다
          </div>
          <div className="flex flex-col items-center justify-end h-[60%]">
            <div className="text-2xl font-bold lg:text-3xl">{newsData?.dateList[currentDataIndex].date.slice(5, 7)}월</div>
            <div className="text-xs font-semibold lg:text-base">뉴스를 구매하실 수 있습니다</div>
            <div className="text-xs font-semibold text-red-500 lg:text-base">"날짜를 주의깊게 확인해주세요"</div>
          </div>
        </div>
        <div className="w-[70%]  h-[80%]">
          <div className="flex items-end justify-start h-1/6">
            <div className="px-2 text-xl font-bold lg:px-4 lg:text-5xl ">뉴스</div>
            <div className="text-sm font-bold text-red-500 lg:text-lg">중복되거나 관련 없는 뉴스가 나올 수 있습니다</div>
          </div>
          <div className="flex flex-col items-center justify-evenly h-5/6">
            {newsData.stockList &&
              newsData.stockList.map((stock, index) => {
                let color;
                switch (index) {
                  case 0:
                    color = 'text-red-600';
                    break
                  case 1:
                    color = 'text-blue-600';
                    break
                  case 2:
                    color = 'text-green-600';
                    break
                  case 3:
                    color = 'text-orange-600';
                    break
                }
                return (
                  <div
                    onClick={onClick}
                    aria-label={stock.kind}
                    data-color={color}
                    data-price={stock.price}
                    data-key={stock.stockId}
                    key={stock.stockId}
                    className="h-1/6 w-[80%]">
                    <div className="flex items-center justify-center w-1/4 text-xs text-white bg-red-700 lg:text-lg lg:font-semibold h-fit lg:h-1/4">
                      속보
                    </div>
                    <div
                      className={`w-full ${color} bg-[#F2EDED] h-3/4 flex items-center justify-center text-lg lg:text-3xl font-bold shadow-md shadow-gray-400 cursor-pointer hover:bg-[#fbe2e2]`}>
                      {stock.kind}&nbsp;<span className="text-black">소식입니다</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </motion.div> : <Loading />}
    </>
  );
}
export default InfoShop;
