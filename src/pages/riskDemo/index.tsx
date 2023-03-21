import React from 'react';
import PcHeader from "@/components/header/pcHeader";
import PcFooter from "@/components/footer/pcFooter";

const RiskDemo = ({ }) => {

    return (
        <>
            <PcHeader />
            <iframe style={{border: "none"}} height={1200} width={"100%"} src={"https://tech.openeglab.org.cn/main/dss"} />
            <PcFooter />
        </>
    )
}

export default RiskDemo;