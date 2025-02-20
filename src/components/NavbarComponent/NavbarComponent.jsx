import React from "react";
import { WrapperTextValue, WrapperContent, WrapperTextPrice } from "./style";
import { Checkbox } from "antd";

const NavbarComponent = () => {
    const onChange = () => {}
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => {
                    return ( 
                        <WrapperTextValue>{option}</WrapperTextValue>
                    )
                })
            case 'checkbox':
                return ( 
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection:'column', gap:'12px' }} onChange={onChange}>
                        {options.map((option) => {
                            return (
                                <Checkbox style={{marginLeft: 0}} value={option.value}>{option.lable}</Checkbox>
                            )
                            })}
                    </Checkbox.Group>
                )
            case 'price' :
                return options.map((options) => {
                    return (
                        <WrapperTextPrice>{options}</WrapperTextPrice>
                    )
                })

            default:
                return {}
        }
    }
    return (
        <div>
            <WrapperContent>
                {renderContent('text', ['Nike', 'Adidas', 'Puma'])}
            </WrapperContent>
            
        </div>
    )
}

export default NavbarComponent