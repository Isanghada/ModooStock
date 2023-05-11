import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

interface TradeStockModalType {
  amount: number;
  dealType: string;
  kind: string;
  price: number;
}

interface InfoModalType {
  tradeStockModalData: TradeStockModalType | undefined;
  isShowStockModal: boolean;
  setIsShowStockModal: Dispatch<SetStateAction<boolean>>;
}

function StockTradeModal({ tradeStockModalData, isShowStockModal, setIsShowStockModal }: InfoModalType): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [src, setSrc] = useState('');
  useEffect(() => {
    console.log('tradeStockModalData: ', tradeStockModalData);

    const img = new Image();
    img.onload = () => {
      setSrc(process.env.REACT_APP_S3_URL + '/images/icons/info.png');
      setIsLoaded(true);
    };
    img.src = process.env.REACT_APP_S3_URL + '/images/icons/info.png';
  }, []);

  const click = (e: React.MouseEvent) => {
    setIsShowStockModal(false);
  };
  return (
    <>
      {isLoaded && isShowStockModal && (
        <div
          ref={ref}
          className="relative z-[60]"
          onClick={(e) => {
            if (ref.current !== e.target) {
              setIsShowStockModal(false);
            }
          }}>
          <div className="fixed inset-0 bg-black bg-opacity-25" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <div className="w-full max-w-xs p-4 overflow-hidden text-sm font-semibold leading-6 text-center align-middle transition-all transform bg-white shadow-xl lg:p-6 lg:max-w-lg rounded-2xl lg:text-xl lg:font-bold">
                <div className="flex justify-center w-full my-2 lg:my-4">
                  <img className="w-[12%] h-auto" src={src} alt="info" />
                </div>
                <div
                  className={`w-full mb-2 lg:mb-6 lg:pt-2 ${
                    tradeStockModalData?.dealType === '매도' ? 'text-blue-500' : 'text-red-500'
                  }`}>
                  <div className="w-full ">
                    <span>{tradeStockModalData?.kind}</span>
                    <span className="text-gray-600">의 주식&nbsp;</span>
                    <span>{tradeStockModalData?.amount}개</span>
                    <span className="text-gray-600">를&nbsp;</span>
                    <span>{tradeStockModalData?.dealType}&nbsp;</span>
                    <span className="text-gray-600">하셨습니다.</span>
                  </div>
                  <div className="flex justify-center text-center text-gray-600">
                    <span>금액은&nbsp;</span>
                    <div>
                      <span
                        className={`${tradeStockModalData?.dealType === '매수' ? 'text-blue-500' : 'text-red-500'}`}>
                        {(
                          tradeStockModalData?.price !== undefined &&
                          tradeStockModalData?.amount !== undefined &&
                          tradeStockModalData?.price * tradeStockModalData?.amount
                        ).toLocaleString()}
                      </span>{' '}
                    </div>
                    <span>원&nbsp;입니다</span>
                  </div>
                </div>
                <div className="flex justify-center ">
                  <button
                    type="button"
                    className="inline-flex justify-center px-2 lg:px-4 py-[2px] lg:py-1 min-w-[4.5rem] w-[47%] text-xs font-medium lg:text-base lg:font-semibold text-white bg-[#b1b1b1] border border-transparent rounded-md hover:bg-[#8f8f8f] focus:outline-none "
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
