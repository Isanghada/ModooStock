import { useNavigate } from 'react-router';
import styles from './Rank.module.css';
import {useGetRankQuery} from 'Store/api';
import Loading from 'Components/Common/Loading';


function Rank(): JSX.Element {
    const { data: getStock, isLoading, isError } = useGetRankQuery('');
    const navigate = useNavigate();

    if (isError)
    navigate("/error");
  
    if (isLoading)
    return <Loading />;

    console.log(getStock);

    return(
        <>
            <div className={`${styles.font} max-w-screen-xl w-11/12 mx-auto md:mt-[7rem] mt-[5rem] bg-[#FCCACA] rounded-lg h-fit border-4`}>
                <div className = "flex">
                    <div className="w-fit bg-[#F99F9F] rounded-t-lg md:py-2 py-1 md:px-16 px-10 md:text-[1.5rem] text-[1.1rem] font-bold text-[#ffffff]">
                        랭킹
                    </div>
                    <div className="flex flex-col justify-center px-4 text-[0.8rem] text-[#707070]">
                        정각마다 랭킹이 갱신됩니다.
                    </div>
                </div>
                <div className ="bg-[#FFF9F9] p-2 flex flex-col md:flex-wrap border-6 h-screen">
                    {getStock?.data?.map( item => (
                        <div className="bg-[#ffffff] rounded-lg flex justify-between lg:w-[47%] py-2 px-4 m-1">
                        <div className="flex">
                            <div style={{backgroundImage: "url('/images/icons/RankBadge.png')"}} className="font-bold text-[1.8rem] bg-contain w-16 h-16 text-[#ffffff] bg-no-repeat flex justify-center pt-1">1</div>
                            <div className="rounded-full bg-[#FA67A0] w-16 h-16 mx-2 overflow-hidden">
                                <img className="w-5/6 m-auto" src={`${item.profileImagePath}`} alt="money" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="text-[1.1rem] font-bold">{item.nickname}<span className = "px-2 bg-[#F99F9F] mx-2 text-[#ffffff] rounded-full text-[0.95rem] py-[0.1rem]">방문하기</span></div>
                                <div className="text-[1.3rem] font-bold">{item.totalMoney}원</div>
                            </div>
                        </div>
                        <div style={{backgroundImage: "url('/images/icons/Crown.png')"}} className="bg-contain bg-center bg-no-repeat w-16 h-16">
                        </div>
                </div>
                    ))}
                </div>


                
            </div>
        </>
    )
}

export default Rank;