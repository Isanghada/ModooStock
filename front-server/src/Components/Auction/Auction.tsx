import Error from 'Components/Common/Error';
import Loading from 'Components/Common/Loading';
import { useGetAuctionQuery, useGetAuctionMyQuery } from 'Store/api';
import { useState } from 'react';
import AuctionModal from './AuctionModal';

function Auction(): JSX.Element {
    const { data: getAuction, isLoading: isLoading1, isError: isError1 } = useGetAuctionQuery('');
    const { data: myAuction,  isLoading: isLoading2, isError: isError2 } = useGetAuctionMyQuery('');

    let auctionIds = myAuction?.data?.map(item => item.auctionId);

    const [selectNum, setSelectNum] = useState<number>(0);
    const [selectLevel, setSelectLevel] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [what, setWhat] = useState<string>("구매");
    

    if(isLoading1 || isLoading2) {
        return(
        <>
            <Loading/>
        </>)
    }

    if(isError1 || isError2) {
        return (
            <>
                <Error />
            </>
        )
    }

    const levelStyle = `rounded-full lg:px-7 px-5 lg:py-1 mr-2 lg:text-[1.1rem] text-[0.9rem] font-bold shadow cursor-pointer`
    return(
        <>
        <div className = "w-full h-full lg:pt-[13vh] pt-[14vh] p-2">
            <div className = "lg:text-[2.2rem] text-[1.5rem] font-bold">경매장
                <span className='lg:text-[1rem] text-[0.8rem] px-2 text-[#7a7a7a] font-medium'>필요없는 아이템을 팔고, 필요한 아이템을 구매해보세요!</span>
            </div>
            <div className = "bg-[#ffffff] lg:p-2 px-2 py-1 lg:my-2 my-1 rounded-lg bg-opacity-40 shadow-md h-[85%]">
                <div className = "my-1 flex">
                    <div className={`${levelStyle} ${selectLevel === "" ? "bg-[#FF8C8C] text-[#ffffff]" : "text-[#a5a5a5] bg-[#ffffff]" } `} onClick={()=> setSelectLevel("")}>전체</div>
                    <div className={`${levelStyle} ${selectLevel === "RARE" ? "bg-[#FF8C8C] text-[#ffffff]" : "text-[#a5a5a5] bg-[#ffffff]" } `}  onClick={()=> setSelectLevel("RARE")}>레어</div>
                    <div className={`${levelStyle} ${selectLevel === "EPIC" ? "bg-[#FF8C8C] text-[#ffffff]" : "text-[#a5a5a5] bg-[#ffffff]" } `}  onClick={()=> setSelectLevel("EPIC")}>에픽</div>
                    <div className={`${levelStyle} ${selectLevel === "UNIQUE" ? "bg-[#FF8C8C] text-[#ffffff]" : "text-[#a5a5a5] bg-[#ffffff]" }`}  onClick={()=> setSelectLevel("UNIQUE")}>유니크</div>
                </div>

                <div className = "flex justify-between lg:h-[90%] h-[85%] lg:my-2 my-1">
                    <div className="lg:w-[62%] w-[55%] flex justify-start flex-wrap overflow-auto">
                        {getAuction?.data?.map((item, index:number) => (
                            <div key={index} className = {`shadow my-2 lg:mr-4 mr-2 lg:h-44 rounded-lg lg:w-44 h-32 w-24 overflow-hidden cursor-pointer ${!item?.assetResDto.assetLevel.includes(selectLevel) && 'hidden'}`} onClick={() => setSelectNum(index)}>
                                <div className={`lg:px-3 lg:text-[0.8rem] px-2 text-[0.7rem] rounded-full rounded-bl-none w-fit text-[#ffffff] font-bold ${item?.assetResDto.assetLevel === "RARE" ? 'bg-[#0082ED]': item?.assetResDto.assetLevel === "EPIC" ? 'bg-[#BD00EC]' : 'bg-[#FFC34F]'}`} >{item?.assetResDto.assetLevel}</div>
                                <img className="block w-full lg:h-[60%] h-[54%] object-cover" src={process.env.REACT_APP_S3_URL + `/assets/img/${item?.assetResDto.assetName}.png`} />
                                <div className="text-[#7c7c7c] lg:text-[1.0rem] text-[0.8rem] border-t-[0.01rem] mx-2 truncate">[{item?.assetResDto.assetCategory === 'FURNITURE' ? "가구" : item?.assetResDto.assetCategory === 'PROP' ? "소품" : "방"}] {item?.assetResDto.assetNameKor}</div>  
                                <div className="font-bold lg:text-[1.0rem] text-[0.8rem] mx-2">{item?.price / 10000} 만원</div>        
                            </div>
                        ))}
                    </div>

                    <div className="lg:w-[35%] w-[47%] bg-[#ffffff] rounded-lg shadow flex flex-col justify-between">
                    <div className={`lg:px-3 lg:text-[1rem] px-2 text-[0.9rem] rounded-full rounded-bl-none w-fit text-[#ffffff] font-bold ${getAuction?.data[selectNum]?.assetResDto.assetLevel === "RARE" ? 'bg-[#0082ED]': getAuction?.data[selectNum]?.assetResDto.assetLevel === "EPIC" ? 'bg-[#BD00EC]' : 'bg-[#FFC34F]'}`} >{getAuction?.data[selectNum]?.assetResDto.assetLevel}</div>
                        <img className="block w-full lg:h-[60%] h-[54%] object-cover" src={process.env.REACT_APP_S3_URL + `/assets/img/${getAuction?.data[selectNum]?.assetResDto.assetName}.png`} />
                        <div className="mb-2">
                            <div className="lg:block flex px-2 border-t-[0.01rem] mx-2 lg:text-[1.2rem] text-[0.8rem]">
                                <div>[{getAuction?.data[selectNum]?.assetResDto.assetCategory === "FURNITURE" ? "가구" : getAuction?.data[selectNum]?.assetResDto.assetCategory === "PROP" ? "소품" : "방"}] </div>
                                <div>{getAuction?.data[selectNum]?.assetResDto.assetNameKor}</div>
                            </div>
                            <div className="px-2 mx-2 lg:text-[1.5rem] text-[1rem] font-bold">{getAuction?.data[selectNum]?.price.toLocaleString()}원</div>
                            {auctionIds && getAuction && auctionIds?.includes(getAuction?.data[selectNum]?.auctionId) ?     
                            <div className="bg-[#000000] text-[#ffffff] font-bold mx-2 rounded-md py-[0.1rem] lg:text-[1.3rem] text-[0.8em] text-center px-3" 
                                onClick={() => {
                                    setWhat("판매취소");
                                    setIsOpen(true);
                                }}>판매 취소</div>
                            : 
                            <div className="bg-[#767C77] text-[#ffffff] font-bold mx-2 rounded-md hover:bg-[#000000] py-[0.1rem] lg:text-[1.3rem] text-[0.8em] text-center px-3"
                                onClick={() => {
                                    setWhat("구매");
                                    setIsOpen(true);
                                }}
                            >구매하기</div>
                            }
                           
                        </div>
       
                    </div>


                </div>

            </div>

        </div>
        {isOpen && <AuctionModal isOpen={isOpen} setIsOpen={setIsOpen} item={getAuction?.data[selectNum]} what={what} />}

        </>
    )
}

export default Auction;