import React, { useState, useRef } from 'react';
import styles from './index.less';
import { Table } from 'antd';
import data from './index.json';

const LessonResources = () => {

    const columns = [
        {
            title: '',
            dataIndex: 'number',
            key: 'number',
            className: styles.tableText
        },
        {
            title: '课程名称',
            dataIndex: 'name',
            key: 'name',
            className: styles.tableText
        },
        {
            title: '资源总数',
            dataIndex: 'resoucesSum',
            key: 'resoucesSum',
            className: styles.tableText
        },
        {
            title: '资源下载',
            key: 'download',
            render: (_, { download }) => (
                <>
                {download.map((item) => {
                    return(
                        <div onClick={() => {window.open(item.address)}} key={item.name} className={styles.link}>
                        {item.name}
                        </div>
                    )
                })}
                </>
            ),
        },
    ];

    const { lessonResources } = data;
    return (
        <div className={styles.lessonResources}>
            <div className={styles.title}>课程资源</div>
            <div className={styles.table}>
                <Table rowKey={(row) => row.number} columns={columns} dataSource={lessonResources} pagination={false} />
            </div>
        </div>
    )
}

export default LessonResources;