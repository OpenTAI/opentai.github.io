import React from 'react';
import styles from './index.less';
import { useIntl, connect } from 'umi';
import logo from '@/assets/img/logo.png';

const PcFooter = ({ }) => {
    const intl = useIntl();

    return (
        <div className={styles.container}>
            <div className={styles.footer}>
                <div className={styles.topFooter}>
                    <div className={styles.copyright}>{intl.formatMessage({ id: "copyright" })}</div>
                    <img className={styles.footerLogo} src={logo} />
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

export default connect(({ global }) => ({
    global
}))(PcFooter);