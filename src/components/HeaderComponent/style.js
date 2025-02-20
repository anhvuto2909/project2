import { Row } from "antd";
import styled from "styled-components";


export const WrapperHeader = styled(Row)`
    padding: 10px 0;
    background-color: rgb(26, 148, 255);
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap; /* Ngăn không cho nội dung bị wrap */
    width: 1270px;
`;

export const WrapperTextHeader = styled.span`
    font-size : 25px;
    color: #fff;
    font-weight: bold;
    text-align: left;
` 

export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items : center;  
    color : #fff;
    gap : 10px;
    font-size : 14px; 
    font-weight : 600;
` 

export const WrapperTextHeaderSmall = styled.span`
    font-size: 14px;
    color: #fff;
    white-space: nowrap; 
`

export const WrapperContentPopUp = styled.p`
    cursor: pointer;
    &: hover {
        color : rgb(26, 148, 255);
    }
`



