import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 200px;
    & img {
        width: 100%;
    },
    position: relative;    
`

export const WrapperImagestyle = styled.img`
    top: 63px;
    left: -1px;
    border-top-left-radius: 6px;
    position: absolute;
    height: 250px;
    width: 68px;
`

export const StyleNameProduct = styled.div`
    font-weight : 450;
    font-size: 16px;
    line-height: 16px;
    color: rgb(56, 56, 61);
    font-size : 400;
`

export const WrapperReportText = styled.div`
    font-size : 11px;
    color : rgb(128, 128, 137);
    display : flex;
    align-item: center;
    margin: 6px 0 0px;    
`

export const WrapperPriceText = styled.div`
    color : rgb(255, 66, 78);
    font-size: 16px;
    font-weight: 500;
`

export const WrapperDiscountText = styled.span`
    color : rgb(255, 66, 78);
    font-size: 13px;
    font-weight: 500;  
`