import styles from './index.less';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { setLocale } from 'umi';
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
    const language = (navigator.language || navigator.browserLanguage).toLowerCase();
    if (language === "zh") {
      setLocale('zh-CN');
    } else {
      setLocale('en-US');
    }

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
  const breakpoint = 620;

  return width < breakpoint ? <MobileComponent /> : <DesktopComponent />;
}

const Homepage = () => {

  return (
    <ViewportProvider>
      <HomeComponent />
    </ViewportProvider>
  );
}

export default Homepage;