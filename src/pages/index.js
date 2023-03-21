import styles from './index.less';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { setLocale, getLocale } from 'umi';
import { connect } from 'dva';
import DesktopComponent from './desktopComponent';
import MobileComponent from './mobileComponent';

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

const HomeComponent = () => {
  const { width } = useViewport();
  const breakpoint = 415;

  return width < breakpoint ? <MobileComponent /> : <DesktopComponent />;
}

const Homepage = ({ dispatch }) => {
  useEffect(() => {
    
    const language = ( localStorage.getItem("umi_locale") || navigator.language || navigator.browserLanguage).toLowerCase();
    if (language === "zh" || language === "zh-cn") {
      setLocale('zh-CN');
    } else {
      setLocale('en-US');
    }
    dispatch({type: "global/changeLan", payload: {language: getLocale()}});
  }, [])

  return (
    <ViewportProvider>
      <HomeComponent />
    </ViewportProvider>
  );
}

export default connect(({ global }) => ({
  global
}))(Homepage);