import styles from './index.less';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { setLocale, getLocale } from 'umi';
import { connect } from 'dva';
import DesktopComponent from './desktopComponent';


const Homepage = ({ dispatch }) => {
  useEffect(() => {

    const language = (localStorage.getItem("umi_locale") || navigator.language || navigator.browserLanguage).toLowerCase();
    if (language === "zh" || language === "zh-cn") {
      setLocale('zh-CN');
    } else {
      setLocale('en-US');
    }
    dispatch({ type: "global/changeLan", payload: { language: getLocale() } });
  }, [])

  return (
    <DesktopComponent />
  );
}

export default connect(({ global }) => ({
  global
}))(Homepage);