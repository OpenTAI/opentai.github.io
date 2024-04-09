import learnMore from "@/assets/img/learnMore.png";
import closeIcon from "@/assets/img/closeIcon.png";
import dots from "@/assets/img/dots.png";
import { Popover } from "antd";
import dataEn from "./index-en.json";
import dataZh from "./index-zh.json";
import { Modal, Carousel } from "antd";
import styles from "./index.less";
import React, { useState, useEffect } from "react";
import { useIntl, connect } from "umi";
import LessonResources from "@/components/lessonResources";
import TeacherTeam from "@/components/teacherTeam";
import ClassDetail from "@/components/classDetail";
import ProjectDetail from "@/components/projectDetail";
import PcFooter from "@/components/footer/pcFooter";
import PcHeader from "@/components/header/pcHeader";

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
  };

  const turnToRegistrationPage = () => {
    window.open("https://mp.weixin.qq.com/s/NWPxQwqgE0xBGBg7lr1yzQ");
  };

  const openProjectDetail = (url) => {
    setIsProjectDetailMarkdown(true);
    setProjectDetailOpen(true);
    setProjectUrl(url);
  };

  const openProjectLink = (url) => {
    setIsProjectDetailMarkdown(false);
    setProjectDetailOpen(true);
    setProjectUrl(url);
  };

  const openLessonLink = (url) => {
    if (url !== "") {
      window.open(url);
    }
  };

  const {
    header,
    updates,
    mission,
    projects,
    datasets,
    contributors,
    committees,
  } = data;
  return (
    <div className={styles.container}>
      <div className="w-full h-175 lg:h-225 bg-header">
        <PcHeader />
        <div className="pt-44">
          <div className="mx-20">
            <div className="text-xl text-white font-semibold">
              {header.title}
            </div>
            <div className="text-6xl text-white w-168 font-extralight leading-18 pt-3">
              {header.detail}
            </div>
            <div className="mt-8 w-60 h-16 bg-deep-sky text-white flex items-center justify-center font-semibold text-xl">
              {header.viewMore}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 px-6 xl:px-20 xl:w-320 mx-auto">
        <div className="flex justify-between">
          <div className="text-2xl font-bold">
            {intl.formatMessage({ id: "latestUpdates" })}
          </div>
          <div className="text-xl text-deep-sky underline cursor-pointer">
            {intl.formatMessage({ id: "viewMore" })}
          </div>
        </div>
        <div className="columns-1 mt-9 sm:columns-2 md:columns-3">
          {updates.map((item) => {
            return (
              <>
                <div className="text-deep-grey break-inside-avoid-column">
                  <img
                    className="mb-4 w-full"
                    src={require(`@/assets/img/updates/${item.img}`)}
                  />
                  <div className="text-xs font-semibold my-3">
                    {item.subtitle}
                  </div>
                  <a className="text-deep-sky text-base hover:underline">
                    {item.title}
                  </a>
                  <div className="text-base my-3">{item.content}</div>
                  <div className="text-sm font-semibold pb-3">{item.time}</div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className="mt-20 bg-deep-sky text-white py-14">
        <div className="text-2xl sm:text-3xl lg:text-4xl mb-9 text-center">
          {mission.title}
        </div>
        <div className="text-xl sm:text-2xl lg:text-3xl max-w-210 text-center mx-auto px-6">
          {mission.content}
        </div>
      </div>
      <div className="bg-light-grey w-full">
        <div className="py-16 px-6 xl:px-20 xl:w-320 mx-auto" id="researches">
          <div className="text-3xl font-bold text-center mb-8">
            {intl.formatMessage({ id: "researchTitle" })}
          </div>
          <div className="columns-1 sm:columns-2 md:columns-3">
            {projects.map((item, index) => {
              return (
                <>
                  <div className="bg-white hover:bg-deep-sky h-72 mb-8 break-inside-avoid-column">
                    <div className="hover:invert px-12 pt-8 pb-12">
                      <img
                        className="w-12"
                        src={require(`@/assets/img/project/${item.projectIcon}`)}
                      />
                      <div className="mt-6 text-deep-black text-lg font-semibold">
                        {item.projectName}
                      </div>
                      <div className="h-19 text-deep-black text-base line-clamp-3">
                        {item.projectDescription}
                      </div>
                      <div className="mt-1 text-deep-black font-semibold text-base">
                        <div className={styles.readMore} onClick={() => null}>
                          {item.projectReadMore}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full bg-bg-greyB">
        <div className="pt-20 pb-24 px-6 xl:px-20 xl:w-320 mx-auto" id="datasets">
          <div className="text-3xl font-bold text-center mb-8">
            {intl.formatMessage({ id: "datasetsTitle" })}
          </div>
          <div className="columns-1 sm:columns-2 md:columns-4">
            {datasets.map((item) => {
              return (
                <>
                  <div className={styles.dataset}>
                    <div className={styles.datasetHeader}>
                      <div className={styles.datasetTitle}>
                        {item.datasetsName}
                      </div>
                      <img className={styles.datasetDots} src={dots} />
                    </div>
                    <div
                      className={styles.datasetsImg}
                      style={{
                        background: `url(${require("@/assets/img/datasets/" +
                          item.datasetsBackground)}) center no-repeat`,
                      }}
                    ></div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.bodyContributors}>
        <div className={styles.subHeaders}>
          {intl.formatMessage({ id: "meetTheContributors" })}
        </div>
        <div className={styles.Des}>
          {intl.formatMessage({ id: "contributorsDes" })}
        </div>
        <div className={styles.contributors}>
          {contributors.map((item) => {
            return (
              <>
                <div className={styles.contributor}>
                  <Popover
                    overlayInnerStyle={{ paddingTop: "1px" }}
                    content={
                      <div
                        style={{
                          minWidth: "130px",
                          minHeight: "54px",
                          textAlign: "center",
                        }}
                      >
                        <p
                          style={{
                            color: "#12022F",
                            fontSize: "18px",
                            fontFamily: "MiSans-Regular",
                            lineHeight: "18px",
                          }}
                        >
                          {item.contributorsName}
                        </p>
                        <p
                          style={{
                            color: "#A1A1AA",
                            fontSize: "16px",
                            fontFamily: "MiSans-Regular",
                            lineHeight: "7px",
                          }}
                        >
                          {item.contributorsTitle}
                        </p>
                      </div>
                    }
                  >
                    <img
                      className={styles.contributorsImg}
                      src={`${require("@/assets/img/contributors/" +
                        item.contributorsImg)}`}
                    />
                  </Popover>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className={styles.bodyCommittee}>
        <div className={styles.subHeaders}>
          {intl.formatMessage({ id: "steeringCommittee" })}
        </div>
        <div className={styles.Des}>
          {intl.formatMessage({ id: "committeeDes" })}
        </div>
        <div className={styles.committees}>
          {committees.map((item) => {
            return (
              <>
                <div className={styles.committee}>
                  <img
                    className={styles.committeeImg}
                    src={`${require("@/assets/img/contributors/" +
                      item.contributorsImg)}`}
                  />
                  <div className={styles.committeeName}>
                    {item.contributorsName}
                  </div>
                  <div className={styles.committeeTitle}>
                    {item.contributorsTitle}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className={styles.regist}>
        <div className={styles.text}>
          {intl.formatMessage({ id: "welcome" })}
        </div>
        <div className={styles.button} onClick={() => turnToRegistrationPage()}>
          {intl.formatMessage({ id: "join" })}
        </div>
      </div>
      <PcFooter />
      <div>
        <div>
          <Modal
            open={classDetailOpen}
            onCancel={() => {
              setClassDetailOpen(false);
            }}
            closeIcon={<img src={closeIcon} className={styles.closeIcon} />}
            footer={null}
          >
            <ClassDetail />
          </Modal>
        </div>
        <div>
          <Modal
            open={lessonModalOpen}
            onCancel={() => {
              setLessonModalOpen(false);
            }}
            closeIcon={<img src={closeIcon} className={styles.closeIcon} />}
            footer={null}
          >
            <LessonResources />
          </Modal>
        </div>
        <div>
          <Modal
            open={teacherTeamOpen}
            onCancel={() => {
              setTeacherTeamOpen(false);
            }}
            closeIcon={<img src={closeIcon} className={styles.closeIcon} />}
            footer={null}
          >
            <TeacherTeam />
          </Modal>
        </div>
        <div>
          <Modal
            open={projectDetailOpen}
            onCancel={() => {
              setProjectDetailOpen(false);
            }}
            closeIcon={<img src={closeIcon} className={styles.closeIcon} />}
            footer={null}
          >
            <ProjectDetail
              url={projectUrl}
              isMarkdown={isProjectDetailMarkdown}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default connect(({ global }) => ({
  global,
}))(DesktopComponent);
