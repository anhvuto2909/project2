import React from "react";
import { WrapperSliderStyle } from './style'
import {Image} from 'antd'; 

const SliderComponent = ({arrImages}) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay : true,
        autoplaySpeed: 2500
    }
    return (
        <WrapperSliderStyle {...settings}>
            {arrImages.map((img) => {
                return(
                    <Image key={img} src = {img} alt = "slider" preview={false} width="100%"  />
                )
            })}

        </WrapperSliderStyle>
    )
}

export default SliderComponent