
import learnMore from '@/assets/img/learnMore.png';
import closeIcon from '@/assets/img/closeIcon.png';
import dots from '@/assets/img/dots.png';
import { Carousel, Popover } from 'antd';
import dataEn from './index-en.json';
import dataZh from './index-zh.json';
import { Modal } from 'antd';
import styles from './index.less';
import React, { useState, useEffect } from 'react';
import { useIntl, connect } from 'umi';
import LessonResources from '@/components/lessonResources';
import TeacherTeam from '@/components/teacherTeam';
import ClassDetail from '@/components/classDetail';
import ProjectDetail from '@/components/projectDetail';
import PcFooter from '@/components/footer/pcFooter';
import PcHeader from '@/components/header/pcHeader';

const DesktopComponent = ({ global: { language } }) => {
  const intl = useIntl();

  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [teacherTeamOpen, setTeacherTeamOpen] = useState(false);
  const [classDetailOpen, setClassDetailOpen] = useState(false);
  const [projectDetailOpen, setProjectDetailOpen] = useState(false);
  const [projectUrl, setProjectUrl] = useState("");
  const [isProjectDetailMarkdown, setIsProjectDetailMarkdown] = useState(true);
  const [data, setData] = useState(dataZh);

  useEffect(() => {
    if (language === "zh-CN") {
      setData(dataZh);
    } else {
      setData(dataEn);
    }
  }, [language]);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView();
  }

  const turnToRegistrationPage = () => {
    window.open("https://mp.weixin.qq.com/s/NWPxQwqgE0xBGBg7lr1yzQ");
  }

  const openProjectDetail = (url) => {
    setIsProjectDetailMarkdown(true);
    setProjectDetailOpen(true);
    setProjectUrl(url);
  }

  const openProjectLink = (url) => {
    setIsProjectDetailMarkdown(false);
    setProjectDetailOpen(true);
    setProjectUrl(url);
  }

  const openLessonLink = (url) => {
    if (url !== "") {
      window.open(url);
    }
  }

  const { carousel, mission, news, projects, datasets, contributors, committees } = data;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <PcHeader />
        <div className={styles.carousel}>
          <Carousel>
            {carousel.map((item, index) => {
              return (
                <>
                  <div className={styles.childrenCarsel} key={index}>
                    <div className={styles.title}>
                      {item.title}
                    </div>
                    <div className={styles.detail}>
                      {item.detail}
                    </div>
                    <div className={styles.button}>
                      {item.viewMore}
                    </div>
                  </div>
                </>
              )
            })}
          </Carousel>
        </div>
      </div>
      <div className={styles.mission}>
        <div className={styles.missionHeader}>{intl.formatMessage({ id: "ourMission" })}</div>
        <div className={styles.missionDes}>{intl.formatMessage({ id: "missionDes" })}</div>
        <div className={styles.missions}>
          <div className={styles.missionData}>
            <div className={styles.number}>
              {mission.projects}
            </div>
            <div className={styles.unit}>
              {intl.formatMessage({ id: "projectUnit" })}
            </div>
          </div>
          <div className={styles.missionData}>
            <div className={styles.number}>
              {mission.datasets}
            </div>
            <div className={styles.unit}>
              {intl.formatMessage({ id: "datasets" })}
            </div>
          </div>
          <div className={styles.missionData}>
            <div className={styles.number}>
              {mission.algorithms}
            </div>
            <div className={styles.unit}>
              {intl.formatMessage({ id: "algorithms" })}
            </div>
          </div>
          <div className={styles.missionData}>
            <div className={styles.number}>
              {mission.contributors}
            </div>
            <div className={styles.unit}>
              {intl.formatMessage({ id: "contributors" })}
            </div>
          </div>
          <div className={styles.missionData}>
            <div className={styles.number}>
              {mission.forks}
            </div>
            <div className={styles.unit}>
              {intl.formatMessage({ id: "forks" })}
            </div>
          </div>
          <div className={styles.missionData}>
            <div className={styles.number}>
              {mission.stars}
            </div>
            <div className={styles.unit}>
              {intl.formatMessage({ id: "stars" })}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.news}>
        <div className={styles.subHeaders}>
          {intl.formatMessage({ id: "news" })}
        </div>
        <div className={styles.newsBody}>
          {news.map((item) => {
            return (
              <>
                <div className={styles.newsBlock}>
                  <div className={styles.newsTitle}>{item.title}</div>
                  <div className={styles.newsDetail}>{item.detail}</div>
                  <div className={styles.newsLearnMore}>
                    {item.learnMore}
                    <img className={styles.newsLearnMoreIcon} src={learnMore} />
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div>
      <div className={styles.bodyProject} id="projects">
        <div className={styles.subHeaders}>{intl.formatMessage({ id: "projectsTitle" })}</div>
        <div className={styles.Des}>{intl.formatMessage({ id: "projectsDes" })}</div>
        <div className={styles.projects}>
          {projects.map((item) => {
            return (
              <>
                <div className={styles.project} style={{ background: `url(${require("@/assets/img/project/" + item.projectBackground)}) center no-repeat` }}>
                  <div className={styles.projectHeader}>
                    <img className={styles.projectImg} src={require(`@/assets/img/project/${item.projectIcon}`)} />
                    <div className={styles.name}>{item.projectName}</div>
                  </div>
                  <div className={styles.description}>{item.projectDescription}</div>
                  <div className={styles.projectFooter}>
                    <div className={styles.readMore} onClick={() => { item.markdown !== "" ? openProjectDetail(item.markdown) : openProjectLink(item.link) }}>{item.projectReadMore}</div>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div>
      <div className={styles.bodyDatasets}>
        <div className={styles.subHeaders}>{intl.formatMessage({ id: "datasetsTitle" })}</div>
        <div className={styles.datasets}>
          {datasets.map((item) => {
            return (
              <>
                <div className={styles.dataset}>
                  <div className={styles.datasetHeader}>
                    <div className={styles.datasetTitle}>{item.datasetsName}</div>
                    <img className={styles.datasetDots} src={dots} />
                  </div>
                  <div className={styles.datasetsImg} style={{ background: `url(${require("@/assets/img/datasets/" + item.datasetsBackground)}) center no-repeat` }}>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div>
      <div className={styles.bodyContributors}>
        <div className={styles.subHeaders}>{intl.formatMessage({ id: "meetTheContributors" })}</div>
        <div className={styles.Des}>{intl.formatMessage({ id: "contributorsDes" })}</div>
        <div className={styles.contributors}>
          {contributors.map((item) => {
            return (
              <>
                <div className={styles.contributor}>
                  <Popover overlayInnerStyle={{paddingTop: "1px"}} content={
                    <div style={{minWidth: "130px", minHeight: "54px", textAlign: "center"}}>
                      <p style={{color: "#12022F", fontSize: "18px", fontFamily: "MiSans-Regular", lineHeight:"18px"}}>{item.contributorsName}</p>
                      <p style={{color: "#A1A1AA", fontSize: "16px", fontFamily: "MiSans-Regular", lineHeight:"7px"}}>{item.contributorsTitle}</p>
                    </div>
                  }>
                    <img className={styles.contributorsImg} src={`${require("@/assets/img/contributors/" + item.contributorsImg)}`} />
                  </Popover>
                </div>
              </>
            )
          })}
        </div>
      </div>
      <div className={styles.bodyCommittee}>
        <div className={styles.subHeaders}>{intl.formatMessage({ id: "steeringCommittee" })}</div>
        <div className={styles.Des}>{intl.formatMessage({ id: "committeeDes" })}</div>
        <div className={styles.committees}>
          {committees.map((item) => {
            return (
              <>
                <div className={styles.committee}>
                  <img className={styles.committeeImg} src={`${require("@/assets/img/contributors/" + item.contributorsImg)}`} />
                  <div className={styles.committeeName}>{item.contributorsName}</div>
                  <div className={styles.committeeTitle}>{item.contributorsTitle}</div>
                </div>
              </>
            )
          })}
        </div>
      </div>
      <div className={styles.regist}>
        <div className={styles.text}>{intl.formatMessage({ id: "welcome" })}</div>
        <div className={styles.button} onClick={() => turnToRegistrationPage()}>{intl.formatMessage({ id: "join" })}</div>
      </div>
      <PcFooter />
      <div>
        <div>
          <Modal
            open={classDetailOpen}
            onCancel={() => { setClassDetailOpen(false) }}
            closeIcon={<img src={closeIcon} className={styles.closeIcon} />}
            footer={null}
          >
            <ClassDetail />
          </Modal>
        </div>
        <div>
          <Modal
            open={lessonModalOpen}
            onCancel={() => { setLessonModalOpen(false) }}
            closeIcon={<img src={closeIcon} className={styles.closeIcon} />}
            footer={null}
          >
            <LessonResources />
          </Modal>
        </div>
        <div>
          <Modal
            open={teacherTeamOpen}
            onCancel={() => { setTeacherTeamOpen(false) }}
            closeIcon={<img src={closeIcon} className={styles.closeIcon} />}
            footer={null}
          >
            <TeacherTeam />
          </Modal>
        </div>
        <div>
          <Modal
            open={projectDetailOpen}
            onCancel={() => { setProjectDetailOpen(false) }}
            closeIcon={<img src={closeIcon} className={styles.closeIcon} />}
            footer={null}
          >
            <ProjectDetail url={projectUrl} isMarkdown={isProjectDetailMarkdown} />
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default connect(({ global }) => ({
  global
}))(DesktopComponent);