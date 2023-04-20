import React, { useState, useEffect, createContext, useContext } from 'react';
import PcHeader from "@/components/header/pcHeader";
import PcFooter from "@/components/footer/pcFooter";
import MobileHeader from "@/components/header/mobileHeader";
import MobileFooter from "@/components/footer/mobileFooter";
import { connect } from 'umi';
import styles from './index.less';

const viewportContext = createContext({});

const ViewportProvider = ({ children, setScale }) => {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        setScale((window.innerWidth-10)/1600);
    }

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return (
        <viewportContext.Provider value={{ width, height }}>
            {children}
        </viewportContext.Provider>
    );
};

const useViewport = () => {
    const { width, height } = useContext(viewportContext);
    return { width, height };
}

const HeaderComponent = () => {
    const { width } = useViewport();
    const breakpoint = 415;

    return width < breakpoint ? <MobileHeader /> : <PcHeader />;
}

const FooterComponent = () => {
    const { width } = useViewport();
    const breakpoint = 415;

    return width < breakpoint ? <MobileFooter /> : <PcFooter />;
}

const RiskDemo = ({ global: { language } }) => {
    const [route, setRoute] = useState(localStorage.getItem("riskRoute") || "/main/dss?");
    const [lang, setLang] = useState("");
    const [iframeHeight, setIframeHeight] = useState(1200);
    const [scale, setScale] = useState(window.innerWidth > 1600 ? 1 : (window.innerWidth-10)/1600);

    useEffect(() => {
        const defaultLang = (language || localStorage.getItem("umi_locale") || navigator.language).toLowerCase();
        if (defaultLang === "zh" || defaultLang === "zh-cn") {
            setLang("zh");
        } else {
            setLang("en");
        }
    }, [language]);

    window.addEventListener('message', (e) => {
        if (e.data.type === "sizeChange") {
            setIframeHeight(e.data.height + 10);
        } else if (e.data.type === "urlChange") {
            let url = e.data.url;
            let redirectUrl = url.match(/(?<=).+(?=lang)/);
            if (url.indexOf("dss") >= 0) {
                if (redirectUrl === null) {
                    if (url !== route) {
                        if (url.match(/[^?]+(?=\?)/)?.length > 0) {
                            setRoute(url);
                            localStorage.setItem("riskRoute", url);
                        } else {
                            setRoute(`${url}?`);
                            localStorage.setItem("riskRoute", `${url}?`);
                        }
                    }
                } else if (redirectUrl !== null && redirectUrl?.length > 0) {
                    if (redirectUrl[0] !== route) {
                        setRoute(redirectUrl[0]);
                        localStorage.setItem("riskRoute", redirectUrl[0]);
                    }
                }
            }
        }
    }, false);

    return (
        <ViewportProvider setScale={setScale}>
            <HeaderComponent setRiskRoute={setRoute} />
            <div style={{height: iframeHeight*scale}} className={styles.webBody}>
                <iframe className={styles.webIframe} style={{transform: `scale(${scale})`}} height={iframeHeight} width={1600} src={`https://tech.openeglab.org.cn${route}&lang=${lang}`} />
            </div>
            <FooterComponent />
        </ViewportProvider>
    )
}

export default connect(({ global }) => ({
    global
}))(RiskDemo);