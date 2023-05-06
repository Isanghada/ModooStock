import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from './Exchange.module.css';

interface IRModalType {
  isIRClick: boolean;
  setIsIRClick: React.Dispatch<React.SetStateAction<boolean>>;
  selectIRData: any;
  // 날짜는 parse() 해서 보냄
  date: string[];
}

function IRModal({ isIRClick, setIsIRClick, selectIRData, date }: IRModalType): JSX.Element {
  const navigate = useNavigate();
  const ref = useRef(null);
  const quarterRef = useRef<HTMLSelectElement>(null);
  const containerRef = useRef<any>(null);
  const containerRef2 = useRef<any>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [yearOption, setYearOption] = useState<any>();
  const [selectYear, setSelectYear] = useState<string>('');
  const [quarterOption, setQuarterOption] = useState<any>();
  const [showQuarterData, setShowQuarterData] = useState<any>();
  const [quarterClick, setQuarterClick] = useState<number>(0);

  useEffect(() => {
    const gameNowYear = parseInt(date[0]);
    const yearLis = new Array(gameNowYear - 2010).fill(2011);
    // 2011년부터 현재년도까지 만들어주기
    setYearOption(
      yearLis
        .map((li, idx) => {
          return (
            <option key={idx} value={`${li + idx}`}>
              {li + idx}
            </option>
          );
        })
        .reverse()
    );
  }, [selectIRData]);

  // selectYear가 변경될때마다 실행
  useEffect(() => {
    if (selectYear === '') {
      setSelectYear(date[0]);
    }

    if (selectYear !== '') {
      const gameNowYear = parseInt(selectYear);
      let addMonthOptionCnt: number = 0;
      if (gameNowYear === parseInt(date[0])) {
        switch (date[1]) {
          case '01':
          case '02':
          case '03':
            addMonthOptionCnt = 1;
            break;
          case '04':
          case '05':
          case '06':
            addMonthOptionCnt = 2;
            break;
          case '07':
          case '08':
          case '09':
            addMonthOptionCnt = 3;
            break;
          case '10':
          case '11':
          case '12':
            addMonthOptionCnt = 4;
            break;
        }
      } else {
        addMonthOptionCnt = 4;
      }
      const quarters = new Array(addMonthOptionCnt).fill('분기');
      setQuarterOption(
        quarters.map((quarter, idx) => {
          return (
            <option
              aria-label={selectIRData[gameNowYear][idx].name}
              key={idx}
              value={`${selectIRData[gameNowYear][idx].name}`}>
              {selectIRData[gameNowYear][idx].name}
            </option>
          );
        })
      );
      // 가장 처음에 보여줄 데이터
      setShowQuarterData(selectIRData[gameNowYear][0]);
    }
  }, [yearOption, selectYear]);

  const click = (e: React.MouseEvent) => {
    switch (e.currentTarget.ariaLabel) {
      case '닫기':
        setIsIRClick((pre) => !pre);
        break;
      case '정보상':
        navigate('/infoshop');
    }
  };

  const change = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.currentTarget.ariaLabel === '연도') {
      setSelectYear(e.currentTarget.value);
      setQuarterClick(0);
      if (quarterRef.current !== null) {
        quarterRef.current.value = '1분기 보고서';
      }
    } else {
      switch (e.currentTarget.value) {
        case '1분기 보고서':
          setQuarterClick(0);
          changeQuarterData();
          break;
        case '반기 보고서':
          setQuarterClick(1);
          changeQuarterData();
          break;
        case '3분기 보고서':
          setQuarterClick(2);
          changeQuarterData();
          break;
        case '사업 보고서':
          setQuarterClick(3);
          changeQuarterData();
          break;
      }
    }
  };

  const changeQuarterData = () => {
    console.log(selectIRData[parseInt(selectYear)]);

    setShowQuarterData(selectIRData[parseInt(selectYear)][quarterClick]);
  };

  // key service
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const dx = x - startX;
    containerRef.current.scrollLeft = scrollLeft - dx;
  };

  // plan
  const handleMouseDown2 = (e: React.MouseEvent) => {
    setDragging(true);
    setStartX(e.pageX - containerRef2.current.offsetLeft);
    setScrollLeft(containerRef2.current.scrollLeft);
  };

  const handleMouseUp2 = () => {
    setDragging(false);
  };

  const handleMouseMove2 = (e: React.MouseEvent) => {
    if (!dragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef2.current.offsetLeft;
    const dx = x - startX;
    containerRef2.current.scrollLeft = scrollLeft - dx;
  };

  return (
    <>
      {isIRClick ? (
        <div
          ref={ref}
          className="fixed flex items-center justify-center right-0 left-0 top-0 bottom-0 z-50 bg-[#707070]/50 pt-0"
          onClick={(e) => {
            if (e.target === ref.current) {
              setIsIRClick((pre) => !pre);
            }
          }}>
          <div className="flex flex-col justify-center bg-white border drop-shadow-2xl w-[75%] max-w-[28rem] md:w-[65%] md:max-w-[35rem] lg:w-[42%] lg:min-w-[40rem] lg:max-w-[40rem] px-7 rounded-xl space-y-2 lg:space-y-4 py-3 lg:py-6">
            <div className="w-full flex justify-center items-center text-[1.3rem] lg:text-[2rem] font-black">
              <span>기업 활동</span>
            </div>
            <div className="flex items-end justify-start w-full space-x-6 px-2 text-[0.9rem] lg:text-[1.3rem] border-b-2 py-[2px] lg:py-1 text-[#6F6F6F] font-extrabold">
              <select aria-label="연도" className="outline-none" name="연도" id="연도" onChange={change}>
                {yearOption !== undefined && yearOption}
              </select>
              <select
                ref={quarterRef}
                aria-label="보고서"
                className="outline-none"
                name="보고서"
                id="보고서"
                onChange={change}>
                {quarterOption}
              </select>
            </div>
            <div className="flex flex-col items-start justify-start w-full pb-3 font-bold border-b-2 lg:pb-5">
              <div className="flex items-end justify-between w-full px-2 pb-2">
                <span className="text-[1rem] lg:text-[1.2rem]">
                  {selectYear !== '' && selectIRData[selectYear][quarterClick].name}
                </span>
                <span className="text-[0.6rem] text-[#9B9B9B] lg:text-[0.8rem]">
                  실제 IR 공시 날짜와는 다를 수 있습니다.
                </span>
              </div>
              <div className="flex items-center w-full mb-2 justify-evenly lg:mb-4">
                <div className="w-[24%] flex flex-col justify-center items-center space-y-1 py-4 bg-[#FFF8F0] border-4 rounded-md border-[#f8e1c8]">
                  <div>
                    <img
                      className="w-[1rem] lg:w-[2rem] h-[1rem] lg:h-[2rem]"
                      src={process.env.REACT_APP_S3_URL + '/images/icons/IRImage.png'}
                      alt="IR"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-start">
                    <span className="text-[1rem] lg:text-[1.5rem] leading-5 lg:leading-8">
                      {selectYear !== '' &&
                        (selectIRData[selectYear][quarterClick]['operating revenue'] / 100000000 > 0
                          ? Math.floor(
                              selectIRData[selectYear][quarterClick]['operating revenue'] / 100000000
                            ).toLocaleString()
                          : (
                              Math.floor(selectIRData[selectYear][quarterClick]['operating revenue']) / 1000000
                            ).toLocaleString())}
                      억
                    </span>
                    <span className="text-[0.8rem] lg:text-[1rem] text-[#DB0000]">영업 수익</span>
                  </div>
                </div>
                <div className="w-[24%] flex flex-col justify-center items-center space-y-1 py-4 bg-[#FFF8F0] border-4 rounded-md border-[#f8e1c8]">
                  <div>
                    <img
                      className="w-[1rem] lg:w-[2rem] h-[1rem] lg:h-[2rem]"
                      src={process.env.REACT_APP_S3_URL + '/images/icons/IRImage.png'}
                      alt="IR"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-start">
                    <span className="text-[1rem] lg:text-[1.5rem] leading-5 lg:leading-8">
                      {selectYear !== '' &&
                        (selectIRData[selectYear][quarterClick]['operating gain'] / 100000000 > 0
                          ? Math.floor(
                              selectIRData[selectYear][quarterClick]['operating gain'] / 100000000
                            ).toLocaleString()
                          : (
                              Math.floor(selectIRData[selectYear][quarterClick]['operating gain']) / 1000000
                            ).toLocaleString())}
                      억
                    </span>
                    <span className="text-[0.8rem] lg:text-[1rem] text-[#DB0000]">영업 이익</span>
                  </div>
                </div>
                <div className="w-[24%] flex flex-col justify-center items-center space-y-1 py-4 bg-[#FFF8F0] border-4 rounded-md border-[#f8e1c8]">
                  <div>
                    <img
                      className="w-[1rem] lg:w-[2rem] h-[1rem] lg:h-[2rem]"
                      src={process.env.REACT_APP_S3_URL + '/images/icons/IRImage.png'}
                      alt="IR"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-start">
                    <span className="text-[1rem] lg:text-[1.5rem] leading-5 lg:leading-8">
                      {selectYear !== '' &&
                        (selectIRData[selectYear][quarterClick]['total equity'] / 100000000 > 0
                          ? Math.floor(
                              selectIRData[selectYear][quarterClick]['total equity'] / 100000000
                            ).toLocaleString()
                          : (
                              Math.floor(selectIRData[selectYear][quarterClick]['total equity']) / 1000000
                            ).toLocaleString())}
                      억
                    </span>
                    <span className="text-[0.8rem] lg:text-[1rem] text-[#DB0000]">총자본</span>
                  </div>
                </div>
                <div className="w-[24%] flex flex-col justify-center items-center space-y-1 py-4 bg-[#FFF8F0] border-4 rounded-md border-[#f8e1c8]">
                  <div>
                    <img
                      className="w-[1rem] lg:w-[2rem] h-[1rem] lg:h-[2rem]"
                      src={process.env.REACT_APP_S3_URL + '/images/icons/IRImage.png'}
                      alt="IR"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-start">
                    <span className="text-[1rem] lg:text-[1.5rem] leading-5 lg:leading-8">
                      {selectYear !== '' &&
                        (selectIRData[selectYear][quarterClick]['total liabilities'] / 100000000 > 0
                          ? Math.floor(
                              selectIRData[selectYear][quarterClick]['total liabilities'] / 100000000
                            ).toLocaleString()
                          : (
                              Math.floor(selectIRData[selectYear][quarterClick]['total liabilities']) / 1000000
                            ).toLocaleString())}
                      억
                    </span>
                    <span className="text-[0.8rem] lg:text-[1rem] text-[#DB0000]">총부채</span>
                  </div>
                </div>
              </div>
              <div
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className={`flex flex-col justify-start items-start w-full h-full flex-nowrap overflow-x-auto ${styled.scroll} lg:mb-2`}>
                <div className="flex flex-nowrap">
                  {selectYear !== '' &&
                    selectIRData[selectYear][quarterClick]['key services'].map((service: string, idx: number) => {
                      return (
                        <span
                          key={idx}
                          className="bg-[#FFC34F] min-w-fit text-center text-white text-[0.7rem] lg:text-[1rem] w-[10rem] lg:w-[13rem] px-5 lg:px-10 mx-2 py-1 lg:py-2 rounded-md">
                          {service}
                        </span>
                      );
                    })}
                </div>
                <div></div>
              </div>
              <div
                ref={containerRef2}
                onMouseDown={handleMouseDown2}
                onMouseUp={handleMouseUp2}
                onMouseMove={handleMouseMove2}
                className={`flex flex-col justify-start items-start w-full h-full flex-nowrap overflow-x-auto mt-2 ${styled.scroll}`}>
                <div className="flex flex-nowrap">
                  {selectYear !== '' &&
                    selectIRData[selectYear][quarterClick]['plan'].map((service: string, idx: number) => {
                      return (
                        <div
                          key={idx}
                          className="flex justify-center min-w-fit rounded-md overflow-x-hidden bg-black text-center text-white text-[0.7rem] lg:text-[1rem] px-5 lg:px-10 mx-2 py-1 lg:py-2">
                          {service}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="flex items-end justify-end w-full px-2">
              <div className="flex justify-end items-end text-white w-[40%] space-x-2 text-center font-medium text-[0.8rem] lg:text-[1.1rem] ">
                <div
                  className="bg-[#A5A5A5] w-[45%] lg:w-[48%] py-[2px] hover:scale-105 active:scale-105 transition duration-300 cursor-pointer rounded-md"
                  aria-label="닫기"
                  onClick={click}>
                  <span>닫기</span>
                </div>
                <div
                  aria-label="정보상"
                  className="bg-black w-[45%] lg:w-[48%] py-[2px] hover:scale-105 active:scale-105 transition duration-300 cursor-pointer rounded-md"
                  onClick={click}>
                  <span>정보상 가기</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default IRModal;
