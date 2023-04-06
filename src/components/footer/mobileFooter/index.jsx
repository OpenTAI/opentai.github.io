import React from 'react';
import styles from './index.less';
import { useIntl } from 'umi';
import logo from '@/assets/img/logo.png';

const MobileFooter = ({ }) => {
    const intl = useIntl();

    return (
        <div className={styles.container}>
            <div className={styles.footer}>
                <div className={styles.topFooter}>
                    <img className={styles.footerLogo} src={logo} />
                </div>
                <div className={styles.copyrightAndPolicy}>
                    <div>{intl.formatMessage({ id: "copyright" })}</div>
                    <div className={styles.policy}>
                        <div>{intl.formatMessage({ id: "privacyPolicy" })}</div>
                        <div>{intl.formatMessage({ id: "terms" })}</div>
                    </div>
                </div>
                <div className={styles.line} />
            </div>
        </div>
    )
}

export default MobileFooter;