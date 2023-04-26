function Exchange(): JSX.Element {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex justify-between w-[90%] border-b-4">
          <div className="flex justify-start items-end w-3/5 text-[1.7rem] py-2 space-x-3 font-black">
            <div className="px-3">A 전자</div>
            <div className="px-3">B 화학</div>
            <div className="px-3">C 생명</div>
            <div className="px-3">G IT</div>
          </div>
          <div className="flex items-end justify-end w-2/5">
            <div className="flex flex-col items-end pr-2">
              <span>신문 스크랩</span>
              <img className="w-[3rem]" src="/images/icons/news.png" alt="" />
            </div>
            <div className="flex flex-col items-end ">
              <span>게임 속 시간</span>
              <span className="text-[1.5rem]">20XX.03.17</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between w-[90%]">
          <div className="flex flex-col items-start justify-center w-[70%]">
            <div className="flex flex-col w-full bg-white">
              <div className="flex items-end justify-between w-full">
                <div>
                  <span>내 투자 현황</span>
                </div>
                <div>
                  <span>기업활동</span>
                  <span>🍳</span>
                </div>
              </div>
              {/* 데이트 */}
              <div className="flex items-end justify-between w-full">
                <div>
                  <span>- 48,424</span>
                  <span>(6.74 %)</span>
                </div>
                <div className="flex space-x-3">
                  <div className="flex space-x-1">
                    <span>보유수량</span>
                    <span>10</span>
                  </div>
                  <div className="flex space-x-1">
                    <span>평균단가</span>
                    <span>70,250</span>
                  </div>
                  <div className="flex space-x-1">
                    <span>현재가</span>
                    <span>65,800</span>
                  </div>
                </div>
              </div>
              {/* 차트 */}
              <div className="w-full"></div>
            </div>
            <div></div>
          </div>
          <div className="w-[30%]"></div>
        </div>
      </div>
    </>
  );
}
export default Exchange;
