import React, { useState, useRef } from 'react';
import styles from './index.less';
import { Table } from 'antd';
import data from './index.json';

const TeacherTeam = () => {

    const columns = [
        {
            title: '',
            dataIndex: 'img',
            key: 'img',
            width: '20%',
            className: styles.imgs,
            render: (_, { img }) => (
                <>
                    <img src={img} className={styles.teacherImg} />
                </>
            ),
        },
        {
            title: '教师简介',
            dataIndex: 'name',
            key: 'name',
            width: '65%',
            render: (_, { name, intro }) => (
                <>
                <div className={styles.name}>{name}</div>
                <div className={styles.intro} dangerouslySetInnerHTML={{__html: intro}}/>
                </>
            )
        },
        {
            title: '相关链接',
            key: 'download',
            width: '15%',
            className: styles.links,
            render: (_, { link }) => (
                <>
                    {link.map((item) => {
                        return (
                            <div onClick={() => { window.open(item.address) }} key={item.name} className={styles.link}>
                                {item.name}
                            </div>
                        )
                    })}
                </>
            ),
        },
    ];

    const { teacherTeam } = data;
    return (
        <div className={styles.lessonResources}>
            <div className={styles.title}>教师团队</div>
            <div className={styles.table}>
                <Table rowKey={(row) => row.number} columns={columns} dataSource={teacherTeam} pagination={false} />
            </div>
        </div>
    )
}

export default TeacherTeam;