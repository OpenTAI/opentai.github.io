import English from '@/assets/img/English.png';
import Chinese from '@/assets/img/Chinese.png';
import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { setLocale, useIntl, connect, history } from 'umi';
import logo from '@/assets/img/logo.png';

const PcHeader = ({ global: { language }, dispatch }) => {
    const [languageLogo, setLanguageLogo] = useState(Chinese);
    const [actived, setActived] = useState([1, 0, 0, 0, 0]);
    const intl = useIntl();

    const headData = [
        {
            name: "home",
            onClick: () => history.push("/homepage"),
        },
        {
            name: "projects",
            onClick: null,
        },
        {
            name: "demos",
            onClick: null,
        },
        {
            name: "leaderboards",
            onClick: () => history.push("/riskDemo"),
        },
        {
            name: "seminars",
            onClick: () => history.push("/evaluation"),
        },
    ];

    useEffect(() => {
        let newActived = [0, 0, 0, 0, 0];
        const location = window.location.pathname.toLowerCase();
        if (location === "/" || location === "/homepage") {
            newActived[0] = 1;
        } else if (location === "/riskdemo") {
            newActived[3] = 1;
        } else if (location === "/evaluation") {
            newActived[4] = 1;
        }
        setActived(newActived);
    }, []);

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

    return (
        <div className={styles.container}>
            <img className={styles.languageLogo} src={languageLogo} onClick={changeLan} />
            <div className={styles.head}>
                <div className={styles.title}>
                    <img src={logo} className={styles.logo} />
                </div>
                <div className={styles.guide}>
                    {headData.map((item, index) => {
                        return (
                            <div
                                className={actived[index] === 1 ? styles.guideNameActived : styles.guideName}
                                onClick={item.onClick}
                            >
                                {intl.formatMessage({ id: item.name })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default connect(({ global }) => ({
    global
}))(PcHeader);