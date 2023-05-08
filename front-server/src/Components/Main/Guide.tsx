import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
    onClose: () => void;
}

function Guide({onClose}:Props):JSX.Element {

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 700,
      };
    
      return(
        <div className="fixed flex items-center justify-center right-0 left-0 top-0 bottom-0 bg-[#707070]/50 z-50">
                <div className = "container lg:w-[50vw] w-[95vw]">
                    <Slider {...settings} className='p-0 rounded-md'>
                        <img aria-label="은행" className="block object-fill object-center" src="/images/carousel/bank.png" alt="" />
                        <img aria-label="은행" className="block object-fill object-center" src="/images/carousel/bank.png" alt="" />
                        <img aria-label="은행" className="block object-fill object-center" src="/images/carousel/bank.png" alt="" />

                    </Slider>
                </div>
        </div>
      );
}

export default Guide;