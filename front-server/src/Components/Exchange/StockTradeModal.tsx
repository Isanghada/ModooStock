import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface TradeStockModalType {
  amount: number;
  dealType: string;
  kind: string;
  price: number;
}

interface InfoModalType {
  tradeStockModalData: TradeStockModalType | undefined;
  isPostStock: boolean;
  setIsPostStock: Dispatch<SetStateAction<boolean>>;
}

function StockTradeModal({ tradeStockModalData, isPostStock, setIsPostStock }: InfoModalType): JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);
  const [src, setSrc] = useState('');
  useEffect(() => {
    console.log('tradeStockModalData: ', tradeStockModalData);

    const img = new Image();
    img.onload = () => {
      setSrc('/images/icons/info.png');
      setIsLoaded(true);
    };
    img.src = '/images/icons/info.png';
  }, []);

  const click = (e: React.MouseEvent) => {
    setIsPostStock(false);
  };
  return (
    <>
      {isPostStock && (
        <div className="relative z-[60]">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <div className="w-full max-w-xs p-4 overflow-hidden align-middle transition-all transform bg-white shadow-xl lg:p-6 lg:max-w-lg rounded-2xl">
                <div className="flex justify-center w-full my-2 lg:my-4">
                  <img className="w-[12%] h-auto" src={src} alt="info" />
                </div>
                <div className="w-full text-center">
                  <span>
                    {tradeStockModalData?.kind} {tradeStockModalData?.amount}를 {tradeStockModalData?.dealType}
                    하셨습니다.
                  </span>
                </div>
                <div className={`text-base font-semibold leading-6 text-center lg:text-xl lg:font-bold`}>
                  {/* {propsData.name}&nbsp; */}
                  <span className="text-gray-600 "></span>
                  <div className="text-sm text-gray-600 lg:text-lg">
                    가격은 <span className={`text-red-500`}>{tradeStockModalData?.price.toLocaleString()}</span> 입니다
                  </div>
                </div>

                <div className="flex justify-center mt-4 lg:mt-8">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-1 min-w-[4.5rem] w-[47%] text-xs font-medium lg:text-base lg:font-semibold text-white bg-[#b1b1b1] border border-transparent rounded-md hover:bg-[#8f8f8f] focus:outline-none "
                    onClick={click}>
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default StockTradeModal;
