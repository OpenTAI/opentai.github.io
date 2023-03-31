import English from '@/assets/img/English.png';
import Chinese from '@/assets/img/Chinese.png';
import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { setLocale, useIntl, connect, history } from 'umi';
import logo from '@/assets/img/logo.png';
import downArrow from '@/assets/img/downArrow.png';
import { Dropdown } from 'antd';

const PcHeader = ({ global: { language }, dispatch, setEvalRoute, setRiskRoute }) => {
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
            onClick: () => {
                if (document.getElementById("projects") !== null) {
                    document.querySelector('#projects').scrollIntoView({
                        behavior: "smooth"
                    })
                } else {
                    history.push("/homepage");
                    setTimeout(() => {
                        document.querySelector('#projects').scrollIntoView({
                            behavior: "smooth"
                        })
                    }, 500);
                }
            },
        },
        {
            name: "tools",
            onClick: null,
            menuItem: [
                {
                    key: '1',
                    label: (
                        <a
                            target="_blank"
                            onClick={
                                () => {
                                    if(setRiskRoute){ 
                                        setRiskRoute("/main/dss?");
                                    }
                                    localStorage.setItem("riskRoute", "/main/dss?");
                                    history.push("/riskDemo");
                                }
                            }
                        >
                            {intl.formatMessage({ id: "riskDemo" })}
                        </a>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <a
                            target="_blank"
                            onClick={
                                () => {
                                    if(setEvalRoute) {
                                        setEvalRoute("/main/eval?");
                                    }
                                    localStorage.setItem("evalRoute", "/main/eval?");
                                    history.push("/evaluation");
                                }
                            }
                        >
                            {intl.formatMessage({ id: "evaluation" })}
                        </a>
                    ),
                }
            ]
        },
        {
            name: "leaderboards",
            onClick: null,
        },
        {
            name: "datasets",
            onClick: () => {
                if (document.getElementById("datasets") !== null) {
                    document.querySelector('#datasets').scrollIntoView({
                        behavior: "smooth"
                    })
                } else {
                    history.push("/homepage");
                    setTimeout(() => {
                        document.querySelector('#datasets').scrollIntoView({
                            behavior: "smooth"
                        })
                    }, 500);
                }
            },
        },
        {
            name: "seminars",
            onClick: () => window.open("https://fudanhighai.github.io/"),
        },
    ];

    useEffect(() => {
        let newActived = [0, 0, 0, 0, 0];
        const location = window.location.pathname.toLowerCase();
        if (location === "/" || location === "/homepage") {
            newActived[0] = 1;
        } else if (location === "/riskdemo" || location === "/evaluation") {
            newActived[2] = 1;
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
                            item.menuItem?.length > 0 ?
                                <div>
                                    <Dropdown overlayClassName={styles.dropdownMenu} menu={{ items: item.menuItem }}>
                                        <div
                                            className={actived[index] === 1 ? styles.guideNameActived : styles.guideName}
                                            onClick={item.onClick}
                                        >
                                            {intl.formatMessage({ id: item.name })}
                                            <img className={styles.downArrow} src={downArrow} />
                                        </div>
                                    </Dropdown>
                                </div> :
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