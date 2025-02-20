import { Spin } from "antd";
import React from "react";

const Loading = ({ children, isPending, delay = 200 }) => {
    return (
        <div style={{ position: "relative", width: "100%" }}>
            <Spin spinning={isPending} delay={delay} >
                <div style={{ opacity: isPending ? 0.7 : 1 }}>
                    {children}
                </div>
            </Spin>
        </div>
    );
};

export default Loading;
