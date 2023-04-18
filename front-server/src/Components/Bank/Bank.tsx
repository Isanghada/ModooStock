function Bank(): JSX.Element {
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col bg-[#FFF2CC] border-[#F0A633] border-2 mx-4">
          <div>
            <span>예금</span>
          </div>
          <div>
            <span>
              6시간 마다 1%의 <br />
              이자를 받을 수 있어요.
            </span>
          </div>
          <div>
            <img src="/money.png" alt="ㅇㅇ" />
          </div>
          <div>예금하기</div>
        </div>
        <div className="py-[10rem] bg-slate-400 mx-4">2</div>
        <div className="py-[10rem] bg-slate-400 mx-4">3</div>
      </div>
      <div className="absolute bottom-0 right-0 pb-5 pr-20">
        <span> 총 예금 금액 </span>
        <span> 999,999,999,999</span>
        <span> 원</span>
      </div>
    </>
  );
}
export default Bank;
