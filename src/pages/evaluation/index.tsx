import React, { useState } from 'react';
import PcHeader from "@/components/header/pcHeader";
import PcFooter from "@/components/footer/pcFooter";

const Evaluation = ({ }) => {
    const [url, setUrl] = useState(localStorage.getItem("evaUrl") || "https://tech.openeglab.org.cn/main/eval");
    const [iframeHeight, setIframeHeight] = useState(1200);

    window.addEventListener('message', (e) => {
        if (e.data.type === "sizeChange") {
            setIframeHeight(e.data.height + 10);
        } else if (e.data.type === "urlChange") {
            const newUrl = `https://tech.openeglab.org.cn${e.data.url}`;
            if (url !== newUrl) {
                setUrl(newUrl);
                localStorage.setItem("evaUrl",newUrl);
            }
        }
    }, false);

    return (
        <>
            <PcHeader />
            <iframe style={{ border: "none" }} height={iframeHeight} width={"100%"} src={url} />
            <PcFooter />
        </>
    )
}

export default Evaluation;