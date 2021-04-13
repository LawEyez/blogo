import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/swiper.scss';

const Slider = ({ content, gap, perView }) => {

    const slides = content.map((slide, i) => (
        <SwiperSlide key={i}>
            {slide}
        </SwiperSlide>
    ))

    return (
        <div className="mt-2">
            <Swiper
                className='slider'
                spaceBetween={gap}
                slidesPerView={perView}
                breakpoints={{

                    // when window width is >= 100px
                    100: {
                    //   width: 640,
                      slidesPerView: 1.2,
                      spaceBetween: 30
                    },
                    
                    // when window width is >= 375px
                    375: {
                    //   width: 640,
                      slidesPerView: 1.4,
                      spaceBetween: 30
                    },

                    // when window width is >= 1024px
                    1024: {
                    //   width: 768,
                      slidesPerView: 2,
                      spaceBetween: 30
                    },
                    
                    // when window width is >= 1280px
                    1280: {
                    //   width: 768,
                      slidesPerView: 3,
                      spaceBetween: 50
                    },
                  }}
            >
                {slides}
            </Swiper>
        </div>
    )
}

export default Slider