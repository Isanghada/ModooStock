import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { usePostNewsBuyMutation } from 'Store/api';
import { useAppSelector } from 'Store/hooks';
import InfoNewsDetailModal from './InfoNewsDetailModal';

interface ModalInterFace {
  propsData: { name: string; color: string; price: number; id: number };
  closeModal: () => void;
  msg: string;
  accept: string;
  cancel: string;
  isOpen: boolean;
}
interface NewsPropsInterFace {
  color: string;
  content: string;
  date: string;
  kind: string;
}

export default function InfoModal({ closeModal, propsData, isOpen, msg, accept, cancel }: ModalInterFace) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [src, setSrc] = useState('');

  // 뉴스 디테일모달 전달 데이터
  const [newsModalData, setNewsModalData] = useState<NewsPropsInterFace>({
    color: '',
    content: '',
    date: '',
    kind: ''
  });
  // 뉴스모달 상태
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  // 뉴스 디테일 모달 창 닫기
  const closeNewsModal = () => {
    setNewsModalOpen(false);
  };
  // 현재 잔액 상태
  const currentMoneyStatus = useAppSelector((state) => {
    return state.currentMoneyStatus;
  });
  // 뉴스 구입 API
  const [buyNews] = usePostNewsBuyMutation();
  // 뉴스 구입 요청
  const buyNewsPaper = async (price: number, color: string) => {
    const currentMoney = Number(currentMoneyStatus.replaceAll(',', ''));
    const newColor = color.replace('text', 'bg');
    if (currentMoney < price) {
      toast.error('소지하신 잔액이 부족합니다!');
      return;
    }
    try {
      const data = await buyNews(propsData.id);
      const buyNewsData = (data as any).data.data;
      toast.success('정보 구입완료');
      closeModal();
      setNewsModalOpen(true);
      setNewsModalData({ ...buyNewsData, color: newColor });
    } catch (error) {
      // console.log(error, '정보 구입 실패');
    }
  };
  // 이미지 로딩상태 체크
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setSrc(process.env.REACT_APP_S3_URL + '/images/icons/info.png');
      setIsLoaded(true);
    };
    img.src = process.env.REACT_APP_S3_URL + '/images/icons/info.png';
  }, []);
  return (
    <>
      <InfoNewsDetailModal isOpen={newsModalOpen} propsData={newsModalData} closeModal={closeNewsModal} />
      {isLoaded && (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-[60]" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-full p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <Dialog.Panel className="w-full max-w-xs p-4 overflow-hidden align-middle transition-all transform bg-white shadow-xl lg:p-6 lg:max-w-lg rounded-2xl">
                    <div className="flex justify-center w-full my-2 lg:my-4">
                      <img className="w-[12%] h-auto" src={src} alt="info" />
                    </div>
                    <Dialog.Title
                      as="h3"
                      className={`text-base font-semibold leading-6 text-center lg:text-xl lg:font-bold ${propsData.color}`}>
                      {propsData.name}&nbsp;
                      <span className="text-gray-600 ">{msg}</span>
                      <div className="text-sm text-gray-600 lg:text-lg">
                        가격은 <span className={`text-red-500`}>{propsData.price.toLocaleString()}원</span> 입니다
                      </div>
                    </Dialog.Title>

                    <div className="flex justify-between mt-4 lg:mt-8 ">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-1 min-w-[4.5rem] w-[47%] text-xs font-medium lg:text-base lg:font-semibold text-white bg-[#b1b1b1] border border-transparent rounded-md hover:bg-[#8f8f8f] focus:outline-none "
                        onClick={closeModal}>
                        {cancel}
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center min-w-[4.5rem] w-[47%] px-4 py-1 mr-2 text-xs lg:text-base font-medium lg:font-semibold text-white bg-[#ffafa2]  border border-transparent rounded-md hover:bg-[#ff9584] focus:outline-none "
                        onClick={() => {
                          buyNewsPaper(propsData.price, propsData.color);
                        }}>
                        {accept}
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
}
