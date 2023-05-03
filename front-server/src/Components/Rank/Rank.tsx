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

    return(
        <> 
            <div className={`${styles.font} max-w-screen-xl w-11/12 mx-auto my-auto rounded-lg h-fit`}>
                <div className = "flex bg-[#FCCACA] rounded-t-lg">
                    <div className="w-fit bg-[#F99F9F] rounded-t-lg md:py-2 py-1 md:px-16 px-10 md:text-[1.6rem] text-[1.2rem] font-bold text-[#ffffff]">
                        랭킹
                    </div>
                    <div className="flex justify-center px-4 text-[0.8rem] my-auto text-[#7a7a7a]">
                        4분마다 랭킹이 갱신됩니다.
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 27 27" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 cursor-pointer mx-1" onClick={() => window.location.reload()}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </div>
                </div>
                <div className ="bg-[#FFF9F9] flex lg:flex-row flex-col overflow-auto p-2 lg:h-fit h-[55vh] w-full">
                    
                    <div className='lg:w-1/2 w-full'>
                    {getStock?.data?.slice(0,5).map( (item,idx:number) => (
                        <div className="bg-[#ffffff] rounded-lg flex justify-between lg:w-11/12 w-full py-2 px-4 mx-auto my-2">
                            <div className="flex">
                                { idx <= 2  ?
                                <div style={{backgroundImage: "url('/images/icons/RankBadge.png')"}} className="font-bold text-[1.6rem] bg-contain w-16 h-16 text-[#ffffff] bg-no-repeat flex justify-center pt-2">{idx+1}</div>
                                :
                                <div className="font-bold text-[1.8rem] w-16 h-16 text-[#F99F9F] bg-no-repeat flex justify-center pt-2">{idx+1}</div>

                                }
                                <div className="flex justify-center w-16 h-16 lg:w-16 lg:h-16 rounded-full  bg-[#FCCACA] mx-2">
                                    <img className="m-2 rounded-full object-contain" src={`${item.profileImagePath}`} alt="프로필 이미지" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="text-[1.1rem] font-bold">{item.nickname}<span className = "px-2 bg-[#F99F9F] mx-2 text-[#ffffff] rounded-full text-[0.95rem] py-[0.1rem] cursor-pointer" onClick={() => navigate(`/travel/${item.nickname}`)}>방문하기</span></div>
                                    <div className="text-[1.3rem] font-bold">{(item?.totalMoney)?.toLocaleString()}원</div>
                                </div>
                            </div>
                            <div style={{backgroundImage: `url('${idx == 0 ? "/images/icons/Crown.png" : idx == 1 ? "/images/icons/Crown2.png" : idx == 2 ? "/images/icons/Crown3.png"  : "/images/icons/Crown4.png" }')`}} className="bg-contain bg-center bg-no-repeat w-16 h-16">
                            </div>
                        </div>
                    ))}
                    </div>

                    <div className='lg:w-1/2 w-full'>
                    {getStock?.data?.slice(5).map( (item,idx:number) => (
                        <div className="bg-[#ffffff] rounded-lg flex justify-between lg:w-11/12 w-full py-2 px-4 mx-auto lg:my-2 mb-2">
                            <div className="flex">
                                <div className="font-bold text-[1.8rem] w-16 h-16 text-[#F99F9F] bg-no-repeat flex justify-center pt-2">{idx+6}</div>
                                <div className="flex justify-center w-16 h-16 lg:w-16 lg:h-16 rounded-full  bg-[#FCCACA] mx-2">
                                    <img className="m-2 rounded-full object-contain" src={`${item.profileImagePath}`} alt="프로필 이미지" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="text-[1.1rem] font-bold">{item.nickname}<span className = "px-2 bg-[#F99F9F] mx-2 text-[#ffffff] rounded-full text-[0.95rem] py-[0.1rem] cursor-pointer" onClick={() => navigate(`/travel/${item.nickname}`)}>방문하기</span></div>
                                    <div className="text-[1.3rem] font-bold">{(item?.totalMoney)?.toLocaleString()}원</div>
                                </div>
                            </div>
                            <div style={{backgroundImage: "url('/images/icons/Crown4.png')"}} className="bg-contain bg-center bg-no-repeat w-16 h-16">
                            </div>
                        </div>
                    ))}
                    </div>

                </div>


                
            </div>
        </>
    )
}

export default Rank;