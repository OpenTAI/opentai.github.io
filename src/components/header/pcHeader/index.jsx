import English from '@/assets/img/English.png';
import Chinese from '@/assets/img/Chinese.png';
import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { setLocale, useIntl, connect, history } from 'umi';
import logo from '@/assets/img/logo.png';

const PcHeader = ({ global: { language }, dispatch }) => {
    const [languageLogo, setLanguageLogo] = useState(Chinese);
    const intl = useIntl();

    useEffect(() => {
        if (language === "zh-CN") {
            setLanguageLogo(Chinese);
        } else {
            setLanguageLogo(English);
        }
    }, [language]);

    const changeLan = () => {
        if (language === "zh-CN") {
            dispatch({ type: "global/changeLan", payload: { language: "en-US" } });
            setLocale("en-US", false);
        } else {
            dispatch({ type: "global/changeLan", payload: { language: "zh-CN" } });
            setLocale("zh-CN", false);
        }
    };

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
            <img className={styles.languageLogo} src={languageLogo} onClick={changeLan} />
            <div className={styles.head}>
                <div className={styles.title}>
                    <img src={logo} className={styles.logo} />
                </div>
                <div className={styles.guide}>
                    <div
                        className={styles.guideName}
                        onClick={turnToHomepage}
                    >
                        {intl.formatMessage({ id: "home" })}
                    </div>
                    <div
                        className={styles.guideName}
                        onClick={() => scrollToProjects()}
                    >
                        {intl.formatMessage({ id: "projects" })}
                    </div>
                    <div
                        className={styles.guideName}
                        onClick={() => setLessonModalOpen(!lessonModalOpen)}
                    >
                        {intl.formatMessage({ id: "demos" })}
                    </div>
                    <div
                        className={styles.guideName}
                        onClick={turnToRiskDemo}
                    >
                        {intl.formatMessage({ id: "leaderboards" })}
                    </div>
                    <div
                        className={styles.guideName}
                        onClick={turnToEvaluation}
                    >
                        {intl.formatMessage({ id: "seminars" })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(({ global }) => ({
    global
}))(PcHeader);