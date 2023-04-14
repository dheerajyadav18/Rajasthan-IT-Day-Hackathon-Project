import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

import labour1 from "../../images/labour1.webp"
import labour2 from "../../images/labour2.jpg"
import labour3 from "../../images/labour3.webp"



const SliderComponent = () => {
  return (
    <div className='relative h-[320px] shadow-md'>
       <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
            <img src={labour1}/>
        </SwiperSlide>
        <SwiperSlide>
        <img src={labour2}/>
        </SwiperSlide>
        <SwiperSlide>
        <img src={labour3}/>
        </SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </div>
  )
}

export default SliderComponent