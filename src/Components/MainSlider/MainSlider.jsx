import React from 'react'
import styles from './MainSlider.module.css'
import Slider from "react-slick";
import slider1 from '../../assests/images/slider-image-1.jpeg'
import slider2 from '../../assests/images/slider-image-2.jpeg'
import slider3 from '../../assests/images/slider-image-3.jpeg'
import slide1 from '../../assests/images/grocery-banner-2.jpeg'
import slide2 from '../../assests/images/slider-2.jpeg'
export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return <>
    <div className="row  gx-0 py-5">
      <div className="col-md-9">
      <Slider {...settings}>
            <div>
              <img  className='w-100' height={400} src={slider1} alt="" />
            </div>
            <div>
              <img className='w-100'  height={400} src={slider2} alt="" />
            </div>
            <div>
              <img className='w-100'  height={400} src={slider3} alt="" />
            </div>
    </Slider>
      </div>
      <div className="col-md-3">
          <img src={slide1} className='w-100' height={200} alt="" />
          <img src={slide2}  className='w-100' height={200} alt="" />
      </div>
    </div>
  </>
}
