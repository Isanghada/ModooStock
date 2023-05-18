import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface PrivacyInterFace {
  closeModal: () => void;
  cancel: string;
  isOpen: boolean;
}
function PrivacyPolicy({ closeModal, isOpen, cancel }: PrivacyInterFace): JSX.Element {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[70]" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-1000"
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
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-xs p-4 overflow-hidden align-middle transition-all transform bg-white shadow-xl lg:p-6 lg:max-w-lg rounded-2xl">
                {/* <Dialog.Title
                  as="h3"
                  className="text-base font-semibold leading-6 text-center text-gray-600 lg:text-lg lg:font-bold">
                  
                </Dialog.Title> */}
                <div className="overflow-y-auto max-h-[70vh]">
                  <img
                    className="h-full"
                    src={process.env.REACT_APP_S3_URL + '/images/privacyPolicy/PrivacyPolicy.png'}
                    alt="privacy"
                  />
                </div>

                <div className="flex justify-between mt-4 lg:mt-8 ">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-1 min-w-[4.5rem] w-[100%] text-xs font-medium lg:text-base lg:font-semibold text-white bg-[#b1b1b1] border border-transparent rounded-md hover:bg-[#8f8f8f] focus:outline-none "
                    onClick={closeModal}>
                    {cancel}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default PrivacyPolicy;
