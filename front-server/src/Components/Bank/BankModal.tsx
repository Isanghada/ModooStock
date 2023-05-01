import { useRef } from 'react';
import BankSection1 from './BankSection1';
import BankSection2 from './BankSection2';
import BankSection3 from './BankSection3';

interface ModalType {
  clickNum: number;
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
  currentMoney: string;
}

function BankModal({ clickNum, setIsClick, currentMoney }: ModalType): JSX.Element {
  const ref = useRef(null);
  let money = '';
  currentMoney.split(',').map((liMoney: string) => (money += liMoney));
  return (
    <>
      <div
        ref={ref}
        className="fixed flex items-center justify-center right-0 left-0 top-0 bottom-0 bg-[#707070]/50 pt-5 lg:pt-0 z-50"
        onClick={(e) => {
          if (e.target === ref.current) {
            setIsClick((pre) => !pre);
          }
        }}>
        {clickNum === 1 && (
          <BankSection1 setIsClick={setIsClick} currentMoney={currentMoney} IntAfterCurrentMoney={parseInt(money)} />
        )}
        {clickNum === 2 && (
          <BankSection2 setIsClick={setIsClick} currentMoney={currentMoney} IntAfterCurrentMoney={parseInt(money)} />
        )}
        {clickNum === 3 && (
          <BankSection3 setIsClick={setIsClick} currentMoney={currentMoney} IntAfterCurrentMoney={parseInt(money)} />
        )}
      </div>
    </>
  );
}

export default BankModal;
