import Error from 'Components/Common/Error';
import Loading from 'Components/Common/Loading';
import { useGetAuctionQuery, useGetAuctionMyQuery,useLazyGetAuctionQuery,useLazyGetAuctionMyQuery } from 'Store/api';
import { useEffect, useState } from 'react';
import AuctionModal from './AuctionModal';

function Auction(): JSX.Element {
    const { data: items, isLoading: isLoading1, isError: isError1 } = useGetAuctionQuery('');
    const { data: myItems, isLoading: isLoading2, isError: isError2 } = useGetAuctionMyQuery('');
    const [ getItems, { isLoading: isLoading3, isError: isError3 }] = useLazyGetAuctionQuery();
    const [ getMyItems, { isLoading: isLoading4, isError: isError4 }] = useLazyGetAuctionMyQuery();
    const [selectNum, setSelectNum] = useState<any>(undefined);
    const [selectLevel, setSelectLevel] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [what, setWhat] = useState<string>("구매");
    const [selectSort, setSelectSort] = useState<string>("최신순");
    const [getAuction, setGetAuction] = useState<any>();
    const [myAuction, setMyAuction] = useState<any>();
    const [selectItem, setSelectItem] = useState<any>();

    // getAuction.data를 정렬한 새로운 배열 생성
    useEffect(() => {
        getItems('').then((data) => {
            setGetAuction(data.data);
        })
        getMyItems('').then((data) => {
            setMyAuction(data.data);
        })
    },[items, myItems]);

    useEffect(() => {
        getItems('').then((data) => {
            setGetAuction(data.data);
        })
        getMyItems('').then((data) => {
            setMyAuction(data.data);
        })
    },[])

    useEffect(() => {
        if(!getAuction) return;
        if(!myAuction) return;
        const sortedId = Array.isArray(getAuction?.data) ? getAuction?.data.slice().sort((a:any, b:any) => parseInt(a.auctionId) - parseInt(b.auctionId)) : [];
        const sortedPriceHigh = Array.isArray(getAuction?.data) ? getAuction?.data.slice().sort((a:any, b:any) => b.price - a.price) : [];
        const sortedPriceLow =  Array.isArray(getAuction?.data) ? getAuction?.data.slice().sort((a:any, b:any) => a.price - b.price) : [];
        const sortedData = selectSort === "최신순" ? sortedId : selectSort === "높은가격순" ? sortedPriceHigh : sortedPriceLow;
        
        const sortedId2 =  Array.isArray(myAuction?.data) ? myAuction!.data.slice().sort((a:any, b:any) => parseInt(a.auctionId) - parseInt(b.auctionId)) : [];
        const sortedPriceHigh2 = Array.isArray(myAuction?.data) ? myAuction!.data.slice().sort((a:any, b:any) => b.price - a.price) : [];
        const sortedPriceLow2 = Array.isArray(myAuction?.data) ? myAuction!.data.slice().sort((a:any, b:any) => a.price - b.price) : [];
        const sortedData2 = selectSort === "최신순" ? sortedId2 : selectSort === "높은가격순" ? sortedPriceHigh2 : sortedPriceLow2;
        
        setMyAuction({...myAuction, data: sortedData2});
        setSelectNum(undefined);

        setGetAuction({...getAuction, data: sortedData});
      }, [selectSort, items, myItems]);

      let auctionIds =myAuction && myAuction.data && Array.isArray(myAuction.data) ? myAuction.data.map((item:any) => item.auctionId) : [];
      
      useEffect(() => {
        if(!getAuction) {
            return setSelectItem(undefined);
        };
        if(getAuction.data.length <= 0) {
            return setSelectItem(undefined);
        }
        setSelectItem(selectLevel === "MY" ? myAuction!.data?.length > 0 ? myAuction!.data[selectNum] : undefined : getAuction!.data!.length > 0 ? getAuction?.data[selectNum] : undefined)
      },[selectNum, getAuction, myAuction, selectLevel])

    

    if(isLoading1 || isLoading2 || isLoading3 || isLoading4) {
        return(
        <>
            <Loading/>
        </>)
    }

    if(isError1 || isError2 || isError3 || isError4) {
        return (
            <>
                <Error />
            </>
        )
    }




    
    const levelStyle = `rounded-full lg:px-7 px-5 lg:py-1 mr-2 lg:text-[1rem] text-[0.8rem] font-bold shadow cursor-pointer`

    const sortStyle = `px-2 text-[#888888] lg:text-[0.8rem] text-[0.7rem] my-auto`
    return(
        <>
        <div className = "w-full h-full lg:pt-[13vh] pt-[14vh] p-2">
            <div className = "lg:text-[2.2rem] text-[1.5rem] font-bold">경매장
                <span className='lg:text-[1rem] text-[0.8rem] px-2 text-[#7a7a7a] font-medium'>필요없는 아이템을 팔고, 필요한 아이템을 구매해보세요!</span>
            </div>
            <div className = "bg-[#ffffff] lg:p-2 px-2 py-1 lg:my-2 my-1 rounded-lg bg-opacity-40 shadow-md h-[85%]">
                <div className = "my-1 flex justify-between">
                    <div className= "flex">
                        <div className={`${levelStyle} ${selectLevel === "" ? "bg-[#FF8C8C] text-[#ffffff]" : "text-[#a5a5a5] bg-[#ffffff]" } `} onClick={()=> {setSelectLevel(""); setSelectNum(0)}}>전체</div>
                        <div className={`${levelStyle} ${selectLevel === "RARE" ? "bg-[#FF8C8C] text-[#ffffff]" : "text-[#a5a5a5] bg-[#ffffff]" } `}  onClick={()=> setSelectLevel("RARE")}>레어</div>
                        <div className={`${levelStyle} ${selectLevel === "EPIC" ? "bg-[#FF8C8C] text-[#ffffff]" : "text-[#a5a5a5] bg-[#ffffff]" } `}  onClick={()=> setSelectLevel("EPIC")}>에픽</div>
                        <div className={`${levelStyle} ${selectLevel === "UNIQUE" ? "bg-[#FF8C8C] text-[#ffffff]" : "text-[#a5a5a5] bg-[#ffffff]" }`}  onClick={()=> setSelectLevel("UNIQUE")}>유니크</div>
                    </div>
                    <div className = "flex">
                        <div className={`${sortStyle} ${selectSort === "최신순" ? "font-bold text-[#FF8C8C]" :""}`} onClick={() => {
                            setSelectSort("최신순");
                            setSelectNum(0);
                        }}>최신순</div>
                        <div className={`${sortStyle} ${selectSort === "높은가격순" ? "font-bold text-[#FF8C8C]" :""}`} onClick={() => {
                            setSelectSort("높은가격순");
                            setSelectNum(0);
                        }}>높은가격순</div>
                        <div className={`${sortStyle} ${selectSort === "낮은가격순" ? "font-bold text-[#FF8C8C]" :""}`} onClick={() => {
                            setSelectSort("낮은가격순");
                            setSelectNum(0);
                        }}>낮은가격순</div>
                        <div className={`${levelStyle} ${selectLevel === "MY" ? "bg-[#FF8C8C] text-[#ffffff]" : "text-[#a5a5a5] bg-[#ffffff]" } `}  onClick={()=> {setSelectLevel("MY"); setSelectNum(0);}}>판매중</div>
                    </div>
                 </div>

                <div className = "flex justify-between lg:h-[90%] h-[85%] lg:my-2 my-1">
                    <div className="lg:w-[62%] w-[55%] flex justify-start flex-wrap overflow-auto">

                        {selectLevel !== "MY" && getAuction && getAuction.data && getAuction?.data?.length > 0 && getAuction?.data?.map((item:any, index:number) => (
                            <div key={index} className = {`shadow my-2 lg:mr-4 mr-2 lg:h-44 rounded-lg lg:w-44 h-32 w-24 overflow-hidden cursor-pointer ${!item?.assetResDto.assetLevel.includes(selectLevel) && 'hidden'}`} onClick={() => setSelectNum(index)}>
                                <div className={`lg:px-3 lg:text-[0.8rem] px-2 text-[0.7rem] rounded-full rounded-bl-none w-fit text-[#ffffff] font-bold ${item?.assetResDto.assetLevel === "RARE" ? 'bg-[#0082ED]': item?.assetResDto.assetLevel === "EPIC" ? 'bg-[#BD00EC]' : 'bg-[#FFC34F]'}`} >{item?.assetResDto.assetLevel}</div>
                                <img className="block w-full lg:h-[60%] h-[54%] object-cover" src={process.env.REACT_APP_S3_URL + `/assets/img/${item?.assetResDto.assetName}.png`} />
                                <div className="text-[#7c7c7c] lg:text-[1.0rem] text-[0.8rem] border-t-[0.01rem] mx-2 truncate">[{item?.assetResDto.assetCategory === 'FURNITURE' ? "가구" : item?.assetResDto.assetCategory === 'PROP' ? "소품" : "집"}] {item?.assetResDto.assetNameKor}</div>  
                                <div className="font-bold lg:text-[1.0rem] text-[0.8rem] mx-2">{item?.price / 10000} 만원</div>        
                            </div>
                        ))}
                        {selectLevel === "MY" &&  myAuction && myAuction?.data && myAuction?.data?.length > 0 && myAuction?.data?.map((item:any, index:number) => (
                            <div key={index} className = {`shadow my-2 lg:mr-4 mr-2 lg:h-44 rounded-lg lg:w-44 h-32 w-24 overflow-hidden cursor-pointer`} onClick={() => setSelectNum(index)}>
                                <div className={`lg:px-3 lg:text-[0.8rem] px-2 text-[0.7rem] rounded-full rounded-bl-none w-fit text-[#ffffff] font-bold ${item?.assetResDto.assetLevel === "RARE" ? 'bg-[#0082ED]': item?.assetResDto.assetLevel === "EPIC" ? 'bg-[#BD00EC]' : 'bg-[#FFC34F]'}`} >{item?.assetResDto.assetLevel}</div>
                                <img className="block w-full lg:h-[60%] h-[54%] object-cover" src={process.env.REACT_APP_S3_URL + `/assets/img/${item?.assetResDto.assetName}.png`} />
                                <div className="text-[#7c7c7c] lg:text-[1.0rem] text-[0.8rem] border-t-[0.01rem] mx-2 truncate">[{item?.assetResDto.assetCategory === 'FURNITURE' ? "가구" : item?.assetResDto.assetCategory === 'PROP' ? "소품" : "집"}] {item?.assetResDto.assetNameKor}</div>  
                                <div className="font-bold lg:text-[1.0rem] text-[0.8rem] mx-2">{item?.price / 10000} 만원</div>        
                            </div>
                        ))}
                        {((myAuction && myAuction?.data.length <= 0  && selectLevel === "MY") || (getAuction && getAuction?.data.length <= 0  && selectLevel !== "MY")) && 
                            <div className="text-[1.1rem] text-[#7a7a7a] mx-auto my-auto">
                                등록된 아이템이 없습니다.
                            </div>
                        }
                    </div>

                    <div className="lg:w-[35%] w-[47%] bg-[#ffffff] rounded-lg shadow flex flex-col justify-between">
                        { selectItem === undefined ? 
                        <>
                            <div className={`lg:px-3 lg:text-[1rem] px-2 text-[0.9rem] rounded-full rounded-bl-none w-fit text-[#ffffff] font-bold bg-[#7c7c7c] `} >???</div>
                            <img className="block w-full lg:h-[60%] h-[54%] object-contain" src={process.env.REACT_APP_S3_URL + `/images/icons/question.png`} />
                            <div className="mb-2">
                                <div className="lg:block flex px-2 border-t-[0.01rem] mx-2 lg:text-[1.2rem] text-[0.8rem]">
                                    <div>[?]</div>
                                    <div>아이템을 선택해주세요.</div>
                                </div>
                                <div className="px-2 mx-2 lg:text-[1.5rem] text-[1rem] font-bold">???원</div>
                                <div className="bg-[#c0c0c0] text-[#ffffff] font-bold mx-2 rounded-md py-[0.1rem] lg:text-[1.3rem] text-[0.8em] text-center px-3">구매하기</div>
                            </div>
                        </>
                        :
                        <>
                            <div className={`lg:px-3 lg:text-[1rem] px-2 text-[0.9rem] rounded-full rounded-bl-none w-fit text-[#ffffff] font-bold ${selectItem?.assetResDto.assetLevel === "RARE" ? 'bg-[#0082ED]': selectItem?.assetResDto.assetLevel === "EPIC" ? 'bg-[#BD00EC]' : 'bg-[#FFC34F]'} `} >{selectItem?.assetResDto.assetLevel}</div>
                            <img className="block w-full lg:h-[60%] h-[54%] object-cover" src={process.env.REACT_APP_S3_URL + `/assets/img/${selectItem?.assetResDto.assetName}.png`} />
                            <div className="mb-2">
                                <div className="lg:block flex px-2 border-t-[0.01rem] mx-2 lg:text-[1.2rem] text-[0.8rem]">
                                    <div>[{selectItem?.assetResDto.assetCategory === "FURNITURE" ? "가구" : selectItem?.assetResDto.assetCategory === "PROP" ? "소품" : "집"}] </div>
                                    <div>{selectItem?.assetResDto.assetNameKor}</div>
                                </div>
                                <div className="px-2 mx-2 lg:text-[1.5rem] text-[1rem] font-bold">{selectItem?.price.toLocaleString()}원</div>
                                {auctionIds && getAuction && auctionIds?.includes( selectItem?.auctionId) ?     
                                    <div className="bg-[#000000] cursor-pointer text-[#ffffff] font-bold mx-2 rounded-md py-[0.1rem] lg:text-[1.3rem] text-[0.8em] text-center px-3" 
                                        onClick={() => {
                                            setWhat("판매취소");
                                            setIsOpen(true);
                                        }}>판매 취소</div>
                                : 
                                <div className="bg-[#767C77] cursor-pointer text-[#ffffff] font-bold mx-2 rounded-md hover:bg-[#000000] py-[0.1rem] lg:text-[1.3rem] text-[0.8em] text-center px-3"
                                    onClick={() => {
                                        setWhat("구매");
                                        setIsOpen(true);
                                    }}>구매하기</div>
                                }
                            </div>
                        </>
                        }
                    </div>


                </div>

            </div>

        </div>
        {isOpen && <AuctionModal isOpen={isOpen} setIsOpen={setIsOpen} item={selectItem} what={what} />}

        </>
    )
}

export default Auction;