import English from '@/assets/img/English.png';
import Chinese from '@/assets/img/Chinese.png';
import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { setLocale, useIntl, connect, history } from 'umi';
import logo from '@/assets/img/logo.png';

const PcFooter = ({ global: { language }, dispatch }) => {
    const [languageLogo, setLanguageLogo] = useState(Chinese);
    const intl = useIntl();

    useEffect(() => {
        if (language === "zh-CN") {
            setLanguageLogo(Chinese);
          } else {
            setLanguageLogo(English);
          }
    }, [language])

    const changeLan = () => {
        if (language === "zh-CN") {
            dispatch({type: "global/changeLan", payload: {language: "en-US"}});
            setLocale("en-US", false);
        } else {
            dispatch({type: "global/changeLan", payload: {language: "zh-CN"}});
            setLocale("zh-CN", false);
        }
    }

    const turnToHomepage = () => {
        history.push("/homepage");
    }

    const turnToRiskDemo = () => {
        history.push("/riskDemo");
    }

    const turnToEvaluation = () => {
        history.push("/evaluation");
    }

    return (
        <div className={styles.container}>
            <div className={styles.footer}>
                <div className={styles.topFooter}>
                    <img className={styles.footerLogo} src={logo} />
                    <div className={styles.catalogs}>
                        <div
                            className={styles.catalog}
                            onClick={turnToHomepage}
                        >
                            {intl.formatMessage({ id: "home" })}
                        </div>
                        <div
                            className={styles.catalog}
                            onClick={() => scrollToProjects()}
                        >
                            {intl.formatMessage({ id: "projects" })}
                        </div>
                        <div
                            className={styles.catalog}
                            onClick={turnToHomepage}
                        >
                            {intl.formatMessage({ id: "demos" })}
                        </div>
                        <div
                            className={styles.catalog}
                            onClick={turnToRiskDemo}
                        >
                            {intl.formatMessage({ id: "leaderboards" })}
                        </div>
                        <div
                            className={styles.catalog}
                            onClick={turnToEvaluation}
                        >
                            {intl.formatMessage({ id: "seminars" })}
                        </div>
                    </div>
                    <img className={styles.footerLanguageLogo} src={languageLogo} onClick={changeLan} />
                </div>
                <div className={styles.line} />
                <div className={styles.copyrightAndPolicy}>
                    <div>© Copyright 2023, All Rights Reserved</div>
                    <div className={styles.policy}>
                        <div>Privacy Policy</div>
                        <div>Terms & Conditions</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(({ global }) => ({
    global
}))(PcFooter);