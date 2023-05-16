import Error from "Components/Common/Error";
import Loading from "Components/Common/Loading";
import { useEffect, useRef } from "react";
import { toast } from 'react-toastify';
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

    const modalRef = useRef<HTMLDivElement>(null);
    const [buyItem, { data:result1, isLoading: isLoading1, isError: isError1, error: error1 }] = usePostAuctionAuctionIdMutation();
    const [cancleSell, { data:result2 , isLoading: isLoading2, isError: isError2 , error : error2}] = useDeleteAuctionAuctionIdMutation();

    useEffect(() => {
        const handleClickOutside = (event:MouseEvent) => {
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
            })
            .catch(error => {
                toast.error(error.data.message);
            })
        }
        else if(what === "판매취소"){
            cancleSell(auctionId).unwrap().then(result => {
                toast.info("판매를 취소하였습니다.")
            })
            .catch(error => {
                toast.error(error.data.message);
            })
        }
        else {
            toast.error("잘못된 접근입니다!");
        }

        setIsOpen(false);
    }
    
    
    return(
        <div className="fixed flex items-center justify-center right-0 left-0 top-0 bottom-0 bg-[#707070]/50 z-50">
            <div className="max-w-sm w-[80%] bg-[#ffffff] p-3 rounded-lg text-center"  ref={modalRef}>
                <img
                    className="object-contain md:w-[5rem] md:h-[5rem] w-[3rem] h-[3rem] mx-auto my-2"
                    src={process.env.REACT_APP_S3_URL + '/images/icons/info.png'}
                    alt=""
                />
                <div className="text-[1.2rem]">{item?.assetResDto.assetNameKor}를 <span className="text-red-700 font-bold">{what}</span>하시겠습니까?</div>
                <div className="py-3 font-bold">가격 : {item?.price && item?.price /10000}만원</div>
                <div className="flex text-[#ffffff] font-bold justify-around">
                    <div className="w-[48%] rounded-md bg-[#b81212] p-1 cursor-pointer" onClick={()=>setIsOpen(false)}>취소</div>
                    <div className="w-[48%] rounded-md bg-[#001dbe] p-1 cursor-pointer" onClick={()=>{
                        item?.auctionId && handleWhat(item?.auctionId)
                        }
                        }>확인</div>
                </div>
            </div>
        </div>
    )
}

export default AuctionModal;