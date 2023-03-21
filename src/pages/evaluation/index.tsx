import React from 'react';
import PcHeader from "@/components/header/pcHeader";
import PcFooter from "@/components/footer/pcFooter";

const Evaluation = ({ }) => {

    return (
        <>
            <PcHeader />
            <iframe style={{border: "none"}} height={1200} width={"100%"} src={"https://tech.openeglab.org.cn/main/eval"} />
            <PcFooter />
        </>
    )
}

export default Evaluation;