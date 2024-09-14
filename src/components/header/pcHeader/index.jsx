import English from '@/assets/img/English.png';
import Chinese from '@/assets/img/Chinese.png';
import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { setLocale, useIntl, connect, history } from 'umi';
import logo from '@/assets/img/logo.png';
import menu from '@/assets/img/menu.png';
import closeIcon from '@/assets/img/closeIcon.png';
import downArrow from '@/assets/img/downArrow.png';
import { Drawer, Collapse } from 'antd';

const PcHeader = ({ global: { language }, dispatch, setEvalRoute, setRiskRoute }) => {
    const [languageLogo, setLanguageLogo] = useState(Chinese);
    const intl = useIntl();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [background, setBackground] = useState('bg-light-black');
    const [opacity, setOpacity] = useState(30);

    const { Panel } = Collapse;

    const text = (
        <p className='text-white'
        >
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
            as a welcome guest in many households across the world.
        </p>
    );

    const headData = [
        {
            name: "home",
            children: null,
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
            name: "projects",
            children:
                <div className='text-white text-base pb-3'>
                    <div className='py-1'>Project Name #1</div>
                    <div className='py-1'>Project Name #2</div>
                    <div className='py-1'>Project Name #3</div>
                    <div className='py-1'>Project Name #4</div>
                </div>,
            onClick: null,
            // menuItem: [
            //     {
            //         key: '1',
            //         label: (
            //             <a
            //                 target="_blank"
            //                 onClick={
            //                     () => {
            //                         if (setRiskRoute) {
            //                             setRiskRoute("/main/dss?");
            //                         }
            //                         localStorage.setItem("riskRoute", "/main/dss?");
            //                         history.push("/riskDemo");
            //                     }
            //                 }
            //             >
            //                 {intl.formatMessage({ id: "riskDemo" })}
            //             </a>
            //         ),
            //     },
            //     {
            //         key: '2',
            //         label: (
            //             <a
            //                 target="_blank"
            //                 onClick={
            //                     () => {
            //                         if (setEvalRoute) {
            //                             setEvalRoute("/main/eval?");
            //                         }
            //                         localStorage.setItem("evalRoute", "/main/eval?");
            //                         history.push("/evaluation");
            //                     }
            //                 }
            //             >
            //                 {intl.formatMessage({ id: "evaluation" })}
            //             </a>
            //         ),
            //     }
            // ]
        },
        {
            name: "demos",
            children:
                <div className='text-white text-base pb-3'>
                    <div className='py-1'>Demos #1</div>
                    <div className='py-1'>Demos #2</div>
                    <div className='py-1'>Demos #3</div>
                    <div className='py-1'>Demos #4</div>
                </div>,
            onClick: null,
        },
        {
            name: "leaderboards",
            children:
                <div className='text-white text-base pb-3'>
                    <div className='py-1'>Demos #1</div>
                    <div className='py-1'>Demos #2</div>
                    <div className='py-1'>Demos #3</div>
                    <div className='py-1'>Demos #4</div>
                </div>,
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
            name: "datasets",
            children:
                <div className='text-white text-base pb-3'>
                    <div className='py-1'>Demos #1</div>
                    <div className='py-1'>Demos #2</div>
                    <div className='py-1'>Demos #3</div>
                    <div className='py-1'>Demos #4</div>
                </div>,
            onClick: () => window.open("http://highschool.opentai.org/"),
        },
        {
            name: "seminars",
            children: null,
            onClick: null,
        },
    ];

    useEffect(() => {
        if (language === "zh-CN") {
            setLanguageLogo(Chinese);
        } else {
            setLanguageLogo(English);
        }
    }, [language]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const changeLan = () => {
        if (language === "zh-CN") {
            dispatch({ type: "global/changeLan", payload: { language: "en-US" } });
            setLocale("en-US", false);
        } else {
            dispatch({ type: "global/changeLan", payload: { language: "zh-CN" } });
            setLocale("zh-CN", false);
        }
    };

    const onOpen = () => {
        setDrawerOpen(true);
    }

    const onClose = () => {
        setDrawerOpen(false);
    }

    const collapseIcon = (panel) => {
        const arr = ["0", "5"]
        if (arr.indexOf(panel?.panelKey) == -1) {
            if (panel?.isActive) {
                return (<div className='w-4 h-4 bg-squareMinus bg-contain' />)
            } else {
                return (<div className='w-4 h-4 bg-squarePlus bg-contain' />)
            }
        } else {
            return (<div className='w-4 h-4 bg-squareArrow bg-contain' />)
        }
    }

    const handleScroll = () => {
        let scrollTop = document.documentElement.scrollTop;
        if (scrollTop > 64) {
            setBackground('bg-deep-sky');
        } else {
            setBackground('bg-light-black');
        }
    };

    return (
        <>
            <div className="fixed w-full z-20">
                <div className={`flex py-6 px-4 sm:px-20 justify-between items-center ${background} `}>
                    <img src={logo} className="w-28 object-contain" />
                    <div className="hidden sm:flex w-128 justify-between">
                        {headData.map((item, index) => {
                            return (
                                <>
                                    <div
                                        className="text-base text-white cursor-pointer flex items-center font-semibold"
                                        onClick={item.onClick}
                                    >
                                        {intl.formatMessage({ id: item.name })}
                                    </div>
                                </>
                            )
                        })}
                    </div>
                    <img className="hidden sm:block w-7 h-7 mr-20 hover:cursor-pointer" src={languageLogo} onClick={changeLan} />
                    <img className="block sm:hidden h-5 w-6" src={menu} onClick={onOpen} />
                </div>
            </div>
            <Drawer
                title={null}
                onClose={onClose}
                open={drawerOpen}
                width={"100%"}
                maskClosable={false}
                style={{ background: "#000" }}
                bodyStyle={{ padding: "15px", position: "relative" }}
                closeIcon={null}
                headerStyle={{ display: "none" }}
            >
                <div className="flex items-center justify-between mb-7">
                    <img src={logo} className="w-28" />
                    <img src={closeIcon} className="w-5 h-5" onClick={onClose} />
                </div>
                <div className={styles.collapse}>
                    <Collapse bordered={false} accordion expandIconPosition="end" ghost expandIcon={(item) => collapseIcon(item)}>
                        {headData.map((item, index) => {
                            return (
                                <>
                                    <div className='w-full h-[2px] bg-white'></div>
                                    <Panel
                                        header={
                                            <div>
                                                <div className='py-4 text-white font-semibold text-xl'>
                                                    {intl.formatMessage({ id: item.name })}
                                                </div>
                                            </div>
                                        }
                                        key={index}
                                        collapsible={item.children === null ? "disabled" : null}
                                    >
                                        {item.children}
                                    </Panel>
                                </>
                            )
                        })}
                    </Collapse>
                    <div className='w-full h-[2px] bg-white'></div>
                </div>
                <img className="w-7 h-7 absolute bottom-6 right-4" src={languageLogo} onClick={changeLan} />
            </Drawer>
        </>
    )
}

export default connect(({ global }) => ({
    global
}))(PcHeader);