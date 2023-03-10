import React, { useState, useEffect } from 'react';
import styles from './index.less';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css/github-markdown.css';

const ProjectDetail = ({ url, isMarkdown }) => {
    const [markdownString, setMarkdownString] = useState("");

    useEffect(() => {
        if(isMarkdown) {
            convertMdToString(url);
        }
    }, [isMarkdown])

    const convertMdToString = (file) => {
        fetch(file).then((response) => response.text()).then((text) => {
            setMarkdownString(text);
        });
    }

    return (
        <div className={styles.lessonResources}>
            <div className={styles.content}>
                {isMarkdown === true ?
                    <ReactMarkdown className="markdown-body" children={markdownString} skipHtml={false} /> :
                    <iframe src={url} width="99%" height="98%" />
                }
            </div>
        </div>
    )
}

export default ProjectDetail;