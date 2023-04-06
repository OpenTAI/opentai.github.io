import React, { useState, useEffect, createContext, useContext } from 'react';
import PcHeader from "@/components/header/pcHeader";
import PcFooter from "@/components/footer/pcFooter";
import MobileHeader from "@/components/header/mobileHeader";
import MobileFooter from "@/components/footer/mobileFooter";
import { connect } from 'umi';

const viewportContext = createContext({});

const ViewportProvider = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
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
        <ViewportProvider>
            <HeaderComponent setRiskRoute={setRoute} />
            <iframe style={{ border: "none" }} height={iframeHeight} width={"100%"} src={`https://tech.openeglab.org.cn${route}&lang=${lang}`} />
            <FooterComponent />
        </ViewportProvider>
    )
}

export default connect(({ global }) => ({
    global
}))(RiskDemo);