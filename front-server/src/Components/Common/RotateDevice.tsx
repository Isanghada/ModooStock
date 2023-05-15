import Lottie from "lottie-react";
import Device from "./Lottie/rotateDevice.json";

function RotateDevice():JSX.Element {

    return(
        <>
        <div className="w-full h-screen bg-[#FEF9F9] flex flex-col justify-center text-center">
            <div>
                <Lottie animationData={Device} style={{width: '30%', marginBottom: '1rem'}} className="mx-auto"/>
                <div className="text-base lg:text-[1.5rem] font-bold">모두의주식은 가로모드로 즐겨주세요</div>
            </div>
        </div>
        </>
    )
}

export default RotateDevice;