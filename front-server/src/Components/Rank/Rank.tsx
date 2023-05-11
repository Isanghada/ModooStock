import { useNavigate } from 'react-router';
import styles from './Rank.module.css';
import { useGetRankQuery } from 'Store/api';
import Loading from 'Components/Common/Loading';

function Rank(): JSX.Element {
  const { data: getStock, isLoading, isError } = useGetRankQuery('');
  const navigate = useNavigate();

  if (isError) navigate('/error');

  if (isLoading) return <Loading />;

  return (
    <>
      <div className={`${styles.font} max-w-screen-xl w-11/12 mx-auto my-auto rounded-lg h-fit`}>
        <div className="flex bg-[#FCCACA] rounded-t-lg">
          <div className="w-fit bg-[#F99F9F] rounded-t-lg md:py-2 py-1 md:px-16 px-10 md:text-[1.6rem] text-[1rem] font-bold text-[#ffffff]">
            랭킹
          </div>
          <div className="flex justify-center px-4 md:text-[0.8rem] text-[0.7rem] my-auto text-[#7a7a7a]">
            4분마다 랭킹이 갱신됩니다.
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 27 27"
              strokeWidth={1.5}
              stroke="currentColor"
              className="md:w-5 md:h-5 w-4 h-4 cursor-pointer mx-1"
              onClick={() => window.location.reload()}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </div>
        </div>
        <div className="bg-[#FEF3F3] flex lg:flex-row flex-col overflow-auto p-2 lg:h-fit h-[55vh] w-full rounded-b-lg">
          <div className="lg:w-1/2 w-full">
            {getStock?.data?.slice(0, 5).map((item, idx: number) => (
              <div className="bg-[#ffffff] rounded-lg flex justify-between lg:w-11/12 w-full py-2 px-4 mx-auto my-2">
                <div className="flex">
                  {idx <= 2 ? (
                    <div
                      style={{ backgroundImage: `url(${process.env.REACT_APP_S3_URL}/images/icons/RankBadge.png)` }}
                      className="font-bold md:text-[1.6rem] text-[1.3rem] bg-contain md:w-16 md:h-16 w-12 h-12 text-[#ffffff] bg-no-repeat flex justify-center md:pt-2 pt-1">
                      {idx + 1}
                    </div>
                  ) : (
                    <div className="font-bold md:text-[1.8rem] text-[1.4rem] md:w-16 md:h-16 w-12 h-12 text-[#F99F9F] bg-no-repeat flex justify-center pt-2">
                      {idx + 1}
                    </div>
                  )}
                  <div className="flex justify-center w-12 h-12 md:w-16 md:h-16 rounded-full  bg-[#FCCACA] mx-2">
                    <img
                      className="md:m-2 m-1 rounded-full object-contain"
                      src={`${item.profileImagePath}`}
                      alt="프로필 이미지"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="md:text-[1.1rem] text-[0.9rem] font-bold">
                      {item.nickname}
                      <span
                        className="px-2 bg-[#F99F9F] mx-2 text-[#ffffff] rounded-full md:text-[0.95rem] text-[0.7rem] py-[0.1rem] cursor-pointer"
                        onClick={() => navigate(`/travel/${item.nickname}`)}>
                        방문하기
                      </span>
                    </div>
                    <div className="md:text-[1.3rem] text-[1rem] font-bold">{item?.totalMoney?.toLocaleString()}원</div>
                  </div>
                </div>
                <div
                  style={{
                    backgroundImage: `url('${
                      idx == 0
                        ? process.env.REACT_APP_S3_URL + '/images/icons/Crown.png'
                        : idx == 1
                        ? process.env.REACT_APP_S3_URL + '/images/icons/Crown2.png'
                        : idx == 2
                        ? process.env.REACT_APP_S3_URL + '/images/icons/Crown3.png'
                        : process.env.REACT_APP_S3_URL + '/images/icons/Crown4.png'
                    }')`
                  }}
                  className="bg-contain bg-center bg-no-repeat md:w-16 md:h-16 w-10 h-10"></div>
              </div>
            ))}
          </div>

          <div className="lg:w-1/2 w-full">
            {getStock?.data?.slice(5).map((item, idx: number) => (
              <div className="bg-[#ffffff] rounded-lg flex justify-between lg:w-11/12 w-full py-2 px-4 mx-auto lg:my-2 mb-2">
                <div className="flex">
                  <div className="font-bold md:text-[1.8rem] text-[1.4rem] md:w-16 md:h-16 w-12 h-12 text-[#F99F9F] bg-no-repeat flex justify-center pt-2">
                    {idx + 6}
                  </div>
                  <div className="flex justify-center  w-12 h-12 md:w-16 md:h-16  rounded-full  bg-[#FCCACA] mx-2">
                    <img
                      className="md:m-2 m-1 rounded-full object-contain"
                      src={`${item.profileImagePath}`}
                      alt="프로필 이미지"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="md:text-[1.1rem] text-[0.9rem] font-bold">
                      {item.nickname}
                      <span
                        className="px-2 bg-[#F99F9F] mx-2 text-[#ffffff] rounded-full md:text-[0.95rem] text-[0.7rem] py-[0.1rem] cursor-pointer"
                        onClick={() => navigate(`/travel/${item.nickname}`)}>
                        방문하기
                      </span>
                    </div>
                    <div className="md:text-[1.3rem] text-[1rem] font-bold">{item?.totalMoney?.toLocaleString()}원</div>
                  </div>
                </div>
                <div
                  style={{ backgroundImage: `url('${process.env.REACT_APP_S3_URL}/images/icons/Crown4.png')` }}
                  className="bg-contain bg-center bg-no-repeat md:w-16 md:h-16 w-12 h-12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Rank;
