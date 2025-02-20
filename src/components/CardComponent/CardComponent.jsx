import React from "react";
import { StyleNameProduct, WrapperPriceText, WrapperReportText, WrapperDiscountText, WrapperCardStyle, WrapperImagestyle } from "./style";
import { StarFilled } from '@ant-design/icons';
import topdeal from '../../assets/img/topdeal.png';
import { WrapperStyleTextSell } from "../ProductDetailsComponent/style";

const CardComponent = (props) => {
    const {countInStock, description, image, name, price, rating, type, discount, sold} = props
    return (
        <WrapperCardStyle
            hoverable
            headStyles = {{width: '250px', height:'250px'}}
            style={{ width:'250px'}}
            
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            }
        >
            <WrapperImagestyle src = {topdeal} alt="topdeal" />

            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReportText> 
                <span style={{ fontSize:'14px' ,marginRight: '4px'}}>
                    <span> {rating} </span> <StarFilled  style={{fontSize: '15px', color:'rgb(253, 216, 54)'}} />
                </span>
                <WrapperStyleTextSell> | Đã bán {sold || 10} </WrapperStyleTextSell>
            </WrapperReportText>
            <WrapperPriceText> 
                <span style={{ marginRight:'8px' }}> {price} $ </span>
                <WrapperDiscountText>
                    -{discount || 5}%
                </WrapperDiscountText> 
            </WrapperPriceText>
        </WrapperCardStyle>
    )
}

export default CardComponent
    