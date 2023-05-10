import Error from 'Components/Common/Error';
import Loading from 'Components/Common/Loading';
import { useGetAuctionQuery } from 'Store/api';
import { useState } from 'react';

function Auction(): JSX.Element {
    const { data: getBank, isLoading: isLoading1, isError: isError1 } = useGetAuctionQuery('');

    const [selectNum, setSelectNum] = useState<number>(0);

    if(isLoading1) {
        return(
        <>
            <Loading/>
        </>)
    }

    if(isError1) {
        return (
            <>
                <Error />
            </>
        )
    }
    return(
        <>
        <div className = "w-full h-full border-2 lg:pt-[13vh] pt-[14vh] p-2">
            <div className = "lg:text-[2.2rem] text-[1.5rem] font-bold">경매장</div>
            <div className = "bg-[#ffffff] lg:p-2 px-2 py-1 lg:my-2 my-1 rounded-lg bg-opacity-40 shadow-md h-[85%]">
                <div className = "my-1 flex">
                    <div className="rounded-full bg-[#FF8C8C] lg:px-7 px-5 lg:py-1 mr-2 lg:text-[1.1rem] text-[0.9rem] font-bold text-[#ffffff] shadow">전체</div>
                    <div className="rounded-full bg-[#ffffff] lg:px-7 px-5 lg:py-1 mr-2 lg:text-[1.1rem] text-[0.9rem] font-bold text-[#a5a5a5] shadow">레어</div>
                    <div className="rounded-full bg-[#ffffff] lg:px-7 px-5 lg:py-1 mr-2 lg:text-[1.1rem] text-[0.9rem] font-bold text-[#a5a5a5] shadow">에픽</div>
                    <div className="rounded-full bg-[#ffffff] lg:px-7 px-5 lg:py-1 mr-2 lg:text-[1.1rem] text-[0.9rem] font-bold text-[#a5a5a5] shadow">유니크</div>
                </div>

                <div className = "flex justify-between lg:h-[90%] h-[85%] lg:my-2 my-1">
                    <div className="lg:w-[62%] w-[55%] flex justify-start flex-wrap overflow-auto">
                        {getBank?.data?.map((item, index:number) => (
                            <div className = "shadow my-2 lg:mr-4 mr-2 lg:h-44 rounded-lg lg:w-44 h-32 w-24 overflow-hidden" onClick={() => setSelectNum(index)}>
                                <div className={`lg:px-3 lg:text-[0.8rem] px-2 text-[0.7rem] rounded-full rounded-bl-none w-fit text-[#ffffff] font-bold ${item?.assetResDto.assetLevel === "RARE" ? 'bg-[#0082ED]': item?.assetResDto.assetLevel === "EPIC" ? 'bg-[#BD00EC]' : 'bg-[#FFC34F]'}`} >{item?.assetResDto.assetLevel}</div>
                                {/* <div className={ `flex justify-between lg:p-2 p-1 ${item?.assetResDto.assetLevel === "RARE" ? 'bg-[#7286D3]': item?.assetResDto.assetLevel === "EPIC" ? 'bg-[#A555EC]' : 'bg-[#FFD93D]'}`}>
                                    <div className="text-[0.9rem] font-bold w-full text-center">{item?.assetResDto.assetNameKor}</div>
                                </div> */}
                                <img className="block w-full lg:h-[60%] h-[54%] object-cover" src={process.env.REACT_APP_S3_URL + `/assets/img/${item?.assetResDto.assetName}.png`} />
                                <div className="text-[#7c7c7c] lg:text-[1.0rem] text-[0.8rem] border-t-[0.01rem] mx-2 truncate">[{item?.assetResDto.assetCategory === 'FURNITURE' ? "가구" : item?.assetResDto.assetCategory === 'PROP' ? "소품" : "방"}] {item?.assetResDto.assetNameKor}</div>  
                                <div className="font-bold lg:text-[1.0rem] text-[0.8rem] mx-2">{item?.price / 10000} 만원</div>        
                            </div>
                        ))}
                    </div>

                    <div className="lg:w-[35%] w-[47%] bg-[#ffffff] rounded-lg shadow">
                    <div className={`lg:px-3 lg:text-[1rem] px-2 text-[0.9rem] rounded-full rounded-bl-none w-fit text-[#ffffff] font-bold ${getBank?.data[selectNum]?.assetResDto.assetLevel === "RARE" ? 'bg-[#0082ED]': getBank?.data[selectNum]?.assetResDto.assetLevel === "EPIC" ? 'bg-[#BD00EC]' : 'bg-[#FFC34F]'}`} >{getBank?.data[selectNum]?.assetResDto.assetLevel}</div>
                        <img className="block w-full lg:h-[60%] h-[54%] object-cover" src={process.env.REACT_APP_S3_URL + `/assets/img/${getBank?.data[selectNum]?.assetResDto.assetName}.png`} />
                        <div className="lg:block flex px-2 border-t-[0.01rem] mx-2 lg:text-[1.2rem] text-[0.9rem]">
                            <div>[{getBank?.data[selectNum]?.assetResDto.assetCategory === "FURNITURE" ? "가구" : getBank?.data[selectNum]?.assetResDto.assetCategory === "PROP" ? "소품" : "방"}] </div>
                            <div>{getBank?.data[selectNum]?.assetResDto.assetNameKor}</div>
                        </div>
                        <div className="px-2 mx-2 lg:text-[1.5rem] text-[1rem] font-bold">{getBank?.data[selectNum]?.price}원</div>
                        <div className="bg-[#000000] text-[#ffffff] font-bold mx-2 rounded-lg py-1 lg:text-[1.3rem] text-[0.8em] text-center px-3">구매하기</div>
                    </div>


                </div>

            </div>

        </div>

        </>
    )
}

export default Auction;