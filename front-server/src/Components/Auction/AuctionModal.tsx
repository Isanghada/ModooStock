import Error from "Components/Common/Error";
import Loading from "Components/Common/Loading";
import { useEffect, useRef } from "react";
import { toast } from 'react-toastify';
import { useAppSelector } from 'Store/hooks';
import { usePostAuctionAuctionIdMutation,useDeleteAuctionAuctionIdMutation } from 'Store/api';

interface ReturnActionListInterFace {
        assetResDto: {
          assetId: number
          assetName: string;
          assetLevel: string;
          assetCategory: string;
          assetNameKor: string;
        },
        auctionId :string;
        nickname : string;
        price: number;
  }

interface Props {
    isOpen:boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    item:ReturnActionListInterFace | undefined;
    what : string;
}

function AuctionModal({isOpen, setIsOpen,item ,what}:Props): JSX.Element {

    const cancelClickSound = useAppSelector((state) => {
        return state.cancelClick;
      });
      const successFx = useAppSelector((state) => {
        return state.successFx;
      });
      const errorFx = useAppSelector((state) => {
        return state.errorFx;
      });


    const cancelClickBtn = new Audio(cancelClickSound);
    const successFxSound = new Audio(successFx);
    const errorFxSound = new Audio(errorFx);



    const modalRef = useRef<HTMLDivElement>(null);
    const [buyItem, { data:result1, isLoading: isLoading1, isError: isError1, error: error1 }] = usePostAuctionAuctionIdMutation();
    const [cancleSell, { data:result2 , isLoading: isLoading2, isError: isError2 , error : error2}] = useDeleteAuctionAuctionIdMutation();

    useEffect(() => {
        const handleClickOutside = (event:MouseEvent) => {
            cancelClickBtn.play();
            if(modalRef.current && !modalRef.current.contains(event.target as Node)){
                setIsOpen(false)
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
          document.removeEventListener('mousedown', handleClickOutside)
        }

    },  [isOpen])

    const handleWhat =  (auctionId:string) => {
        if(what === "구매"){
            buyItem(auctionId).unwrap().then(result => {
                toast.info("구매완료!")
                successFxSound.play();
            })
            .catch(error => {
                toast.error(error.data.message);
                errorFxSound.play();
            })
        }
        else if(what === "판매취소"){
            cancleSell(auctionId).unwrap().then(result => {
                toast.info("판매를 취소하였습니다.")
                successFxSound.play();
            })
            .catch(error => {
                toast.error(error.data.message);
                errorFxSound.play();
            })
        }
        else {
            toast.error("잘못된 접근입니다!");
            errorFxSound.play();
            
        }

        setIsOpen(false);
    }
    
    
    return(
        <div className="fixed flex items-center justify-center right-0 left-0 top-0 bottom-0 bg-[#707070]/50 z-50">
            <div className="max-w-sm w-[80%] bg-[#ffffff] p-2 px-4 rounded-lg text-center"  ref={modalRef}>
                <div className="text-[1.5rem] font-bold p-2 border-b-2">{what}</div>
                <div className="text-[1.2rem] p-2"><span className="text-blue-700 font-bold">{item?.assetResDto.assetNameKor}</span>(을)를 <span className="text-red-700 font-bold">{what}</span>하시겠습니까?</div>
                <div className="w-[80%] mx-auto">
                    <div
                        className={`lg:px-3 lg:text-[1rem] px-2 text-[0.9rem] rounded-full w-fit text-[#ffffff] font-bold ${
                            item?.assetResDto.assetLevel === 'RARE'
                            ? 'bg-[#0082ED]'
                            : item?.assetResDto.assetLevel === 'EPIC'
                            ? 'bg-[#BD00EC]'
                            : item?.assetResDto.assetLevel === 'LEGENDARY'
                            ? 'bg-[#26c744]'
                            : 'bg-[#FFC34F]'
                        } `}>
                            {item?.assetResDto.assetLevel === 'RARE'
                            ? '레어'
                            : item?.assetResDto.assetLevel === 'EPIC'
                            ? '에픽'
                            : item?.assetResDto.assetLevel === 'LEGENDARY'
                            ? '레전더리'
                            : '유니크'}
                    </div>
                    <img
                        className="mx-auto block lg:w-[100%] w-[90%] lg:h-[40%] h-[30%] object-cover scale-125"
                        src={process.env.REACT_APP_S3_URL + `/assets/img/${item?.assetResDto.assetName}.png`}
                    />
                  </div>

                <div className="py-3 font-bold">가격 : {item?.price && item?.price /10000}만원</div>
                <div className="flex text-[#ffffff] font-bold justify-around">
                    <div className="w-[48%] rounded-md bg-red-500 p-1 cursor-pointer" onClick={()=> {setIsOpen(false); cancelClickBtn.play();}}>취소</div>
                    <div className="w-[48%] rounded-md bg-blue-500 p-1 cursor-pointer" onClick={()=>{
                        item?.auctionId && handleWhat(item?.auctionId)
                        }
                        }>확인</div>
                </div>
            </div>
        </div>
    )
}

export default AuctionModal;