import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {useRef, useEffect} from 'react';
interface Props {
    onClose: () => void;
    openGuide:boolean;
}

function Guide({onClose,openGuide}:Props):JSX.Element {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event:MouseEvent) => {
            if(modalRef.current && !modalRef.current.contains(event.target as Node)){
                onClose()
            }
        }
        if (openGuide) {
            document.addEventListener('mousedown', handleClickOutside);
          }
        return () => {
          document.removeEventListener('mousedown', handleClickOutside)
        }

    },  [openGuide, onClose])

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 700,
      };
    

      return(
        <div className="fixed flex items-center justify-center right-0 left-0 top-0 bottom-0 bg-[#707070]/50 z-50">
                <div className = "container lg:w-[50vw] w-[80vw]" ref={modalRef}>
                    <Slider {...settings} className='p-0 rounded-md'>
                        <img aria-label="시작" className="block object-fill object-center" src={process.env.REACT_APP_S3_URL + '/images/guide/guide2.png'} alt="시작" />
                        <img aria-label="은행" className="block object-fill object-center" src={process.env.REACT_APP_S3_URL + '/images/guide/guide1.png'} alt="은행" />
                        <img aria-label="주식" className="block object-fill object-center" src={process.env.REACT_APP_S3_URL + '/images/guide/guide3.png'} alt="주식" />
                        <img aria-label="정보" className="block object-fill object-center" src={process.env.REACT_APP_S3_URL + '/images/guide/guide4.png'} alt="정보" />
                        <img aria-label="경매장" className="block object-fill object-center" src={process.env.REACT_APP_S3_URL + '/images/guide/guide5.png'} alt="경매장" />
                        <img aria-label="랭킹" className="block object-fill object-center" src={process.env.REACT_APP_S3_URL + '/images/guide/guide6.png'} alt="랭킹" />
                    </Slider>
                </div>
        </div>
      );
}

export default Guide;