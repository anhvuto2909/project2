import React from "react";
import { Button } from "antd";
import CardComponent from "../CardComponent/CardComponent";

const ButtonComponent = ({size, styleButton, styleTextButton, textButton, disabled, ...rest}) => {
    return (
        <Button
            style={{
                ...styleButton,
                background: disabled ? '#ccc' :  styleButton.background
            }} 
            size = {size} 
            {...rest}
            //icon = {<SearchOutlined style={{color : colorButton}} />} 
        >
            <span style={styleTextButton}>{textButton}</span>
        </Button>
    )
}
<CardComponent/>
export default ButtonComponent