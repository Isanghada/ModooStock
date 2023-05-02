import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { usePostNewsBuyMutation } from 'Store/api';
import { useAppSelector } from 'Store/hooks';

interface ModalInterFace {
  propsData: { name: string; color: string; price: number; id: number };
  closeModal: () => void;
  msg: string;
  accept: string;
  cancel: string;
  isOpen: boolean;
}

export default function InfoModal({ closeModal, propsData, isOpen, msg, accept, cancel }: ModalInterFace) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [src, setSrc] = useState('');

  // 현재 잔액 상태
  const currentMoneyStatus = useAppSelector((state) => {
    return state.currentMoneyStatus;
  });
  // 뉴스 구입 API
  const [buyNews] = usePostNewsBuyMutation();
  // 뉴스 구입 요청
  const buyNewsPaper = async (price: number) => {
    const currentMoney = Number(currentMoneyStatus);
    if (currentMoney < price) {
      toast.error('소지하신 잔액이 부족합니다!');
      return;
    }
    await buyNews(propsData.id);
    toast.success('정보 구입완료');
    closeModal();
  };
  // 이미지 로딩상태 체크
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setSrc('/images/icons/info.png');
      setIsLoaded(true);
    };
    img.src = '/images/icons/info.png';
  }, []);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        {isLoaded && <Dialog as="div" className="relative z-[60]" onClose={closeModal}>
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
                      가격은 <span className={`text-red-600`}>{propsData.price}원</span> 입니다
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
                        buyNewsPaper(propsData.price);
                      }}>
                      {accept}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>}
      </Transition>
    </>
  );
}
