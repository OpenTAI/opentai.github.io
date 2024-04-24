import React from 'react';
import styles from './index.less';
import { useIntl } from 'umi';
import logo from '@/assets/img/logo.png';
import Facebook from '@/assets/img/Facebook.png';
import Twitter from '@/assets/img/Twitter.png';
import LinkedIn from '@/assets/img/LinkedIn.png';

const PcFooter = ({ }) => {
    const intl = useIntl();

    const headData = [
        {
            name: "home",
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
            name: "research",
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
            name: "datasets",
            onClick: null,
        },
        {
            name: "evaluations",
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
            name: "community",
            onClick: () => window.open("http://highschool.opentai.org/"),
        },
    ];

    return (
        <div className={styles.container}>
            <div className="w-full py-6 bg-deep-sky flex flex-col items-center">
                <img className="max-w-48 mb-11 sm:mb-6 sm:max-w-28" src={logo} />
                <div className="flex flex-col items-center sm:flex-row sm:w-108 sm:justify-between">
                    {headData.map((item, index) => {
                        return (
                            <>
                                <div
                                    className="text-xl sm:text-base text-white cursor-pointer flex items-center font-semibold mb-5"
                                    onClick={item.onClick}
                                >
                                    {intl.formatMessage({ id: item.name })}
                                </div>
                            </>
                        )
                    })}
                </div>
                <div className='w-22 flex justify-between mb-6'>
                    <img className="h-4" src={Facebook} />
                    <img className="h-4" src={Twitter} />
                    <img className="h-4" src={LinkedIn} />
                </div>
                <div className='flex flex-col items-center text-white text-sm font-medium sm:flex-row sm:w-96 sm:justify-between'>
                    <div className={styles.copyright}>{intl.formatMessage({ id: "copyright" })}</div>
                    <div className={styles.policy}>
                        <div>{intl.formatMessage({ id: "terms" })}</div>
                    </div>
                </div>
                <div className={styles.line} />
            </div>
        </div>
    )
}

export default PcFooter;