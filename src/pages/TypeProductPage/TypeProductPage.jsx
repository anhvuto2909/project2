import React from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Pagination, Row, Col } from "antd";   
import { WrapperProducts, WrapperNavbar } from "./style";

const TypeProductPage = () => {
    const onChange = () => {}
    return (
        <div style={{ width: '100%', background: "#efefef" }}>
            <div style={{ width: '1270px', margin :'0 auto'}}>
                <Row style={{ flexWrap: 'nowrap', paddingTop: '10px'}}>
                    <WrapperNavbar span={4}>   
                        <NavbarComponent />
                    </WrapperNavbar>
                    <Col span={20}>
                        <WrapperProducts span={20}>
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                        </WrapperProducts>
                <Pagination defaultCurrent={1} total={50} onChange={onChange} style= {{display:'flex', justifyContent:'center', mmarginTop:'10px'}} />
                    </Col> 
                </Row>
            </div>
        </div>
    )
}

export default TypeProductPage