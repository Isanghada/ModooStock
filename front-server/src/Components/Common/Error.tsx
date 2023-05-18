import Lottie from "lottie-react";
import ErrorLottie from "./Lottie/94992-error-404.json";
import { useNavigate } from "react-router-dom";


function Error():JSX.Element {
    const navigate = useNavigate();

    return(
        <>
        <div className="w-full h-screen bg-[#FEF9F9] flex flex-col justify-center text-center">
            <div>
                <Lottie animationData={ErrorLottie} style={{width: '30%', marginBottom: '1rem'}} className="mx-auto"/>
                <div className="text-[1.5rem]">잘못된 접근입니다.</div>
                <div className="w-fit px-4 py-1 mx-auto m-2 rounded-md text-[1.2rem] border-2 border-[#F99F9F] bg-[#F99F9F] font-bold text-[#ffffff] cursor-pointer" onClick={()=> navigate('/main')}>메인화면으로 이동</div>
            </div>
        </div>
        </>
    )
}

export default Error;