import dataEn from "./index-en.json";
import dataZh from "./index-zh.json";
import { Carousel } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { useIntl, connect } from "umi";
import PcFooter from "@/components/footer/pcFooter";
import PcHeader from "@/components/header/pcHeader";
import AOS from "aos";
import "aos/dist/aos.css";

const DesktopComponent = ({ global: { language } }) => {
  AOS.init();

  const intl = useIntl();
  const carouselRef = useRef(null);

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

  const carouselPrev = () => {
    carouselRef.current?.prev();
  };

  const carouselNext = () => {
    carouselRef.current?.next();
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
    <div>
      <div className="w-full h-175 lg:h-225 bg-header">
        <PcHeader />
        <div className="pt-32 sm:pt-44">
          <div className="mx-2 sm:mx-20">
            <div className="text-center sm:text-left min-w-6 sm:text-xl text-xs text-white font-semibold"  data-aos="fade-up" data-aos-duration="1000">
              {header.title}
            </div>
            <div className="text-center sm:text-left text-[40px] sm:text-6xl text-white sm:w-168 font-extralight leading-[46px] sm:leading-18 pt-5 sm:pt-3" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
              {header.detail}
            </div>
            <div className="mx-auto sm:mx-0 mt-10 sm:mt-8 w-60 h-16 bg-deep-sky text-white flex items-center justify-center font-semibold text-xl hover:bg-black hover:cursor-pointer" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1000">
              {header.viewMore}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 px-6 xl:max-w-360 mx-auto">
        <div className="flex justify-between">
          <div className="text-2xl font-bold">
            {intl.formatMessage({ id: "latestUpdates" })}
          </div>
          <div className="text-xl text-deep-sky underline cursor-pointer hover:text-black">
            {intl.formatMessage({ id: "viewMore" })}
          </div>
        </div>
        <div>
          <div className="columns-1 mt-9 sm:columns-2 lg:columns-3 gap-8">
            {updates.map((item, index) => {
              return (
                <>
                  <div className="text-deep-grey break-inside-avoid-column hover:cursor-pointer hover:!text-black" data-aos="fade-up" data-aos-duration="1000"  data-aos-delay={index*100}>
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
                    <div className="text-sm font-semibold pb-3">
                      {item.time}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-20 bg-deep-sky text-white py-14">
        <div className="text-2xl sm:text-3xl lg:text-4xl mb-9 text-center font-semibold">
          {mission.title}
        </div>
        <div className="text-xl sm:text-2xl lg:text-3xl max-w-210 text-center mx-auto px-6">
          {mission.content}
        </div>
      </div>
      <div className="bg-light-grey w-full">
        <div className="py-16 px-6 xl:max-w-360 mx-auto" id="researches">
          <div className="text-3xl font-bold text-center mb-8">
            {intl.formatMessage({ id: "researchTitle" })}
          </div>
          <div>
            <Carousel dots={false} ref={carouselRef}>
              {projects.map((item, index) => {
                return (
                  <div className="!grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {item.map((item, index) => {
                      return (
                        <>
                          <div className="bg-white hover:bg-deep-sky hover:cursor-pointer h-72 break-inside-avoid-column grow-[3]"  data-aos="fade-up" data-aos-duration="1000"  data-aos-delay={index*100}>
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
                                <div
                                  onClick={() => null}
                                >
                                  {item.projectReadMore}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                );
              })}
            </Carousel>
            <div className="flex w-22 justify-between mx-auto pt-8">
              <div
                className="w-10 h-10 bg-arrowLeft bg-cover cursor-pointer hover:bg-arrowLeftHighlight"
                onClick={carouselPrev}
              ></div>
              <div
                className="w-10 h-10 bg-arrowRight bg-cover cursor-pointer hover:bg-arrowRightHighlight"
                onClick={carouselNext}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-bg-greyB">
        <div className="pt-20 pb-24 px-6 xl:max-w-360 mx-auto" id="datasets">
          <div className="text-3xl font-bold text-center mb-8">
            {intl.formatMessage({ id: "datasetsTitle" })}
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-4 gap-8">
            {datasets.map((item, index) => {
              return (
                <>
                  <div className="min-h-80 pb-9 mb-8 bg-white flex flex-col break-inside-avoid-column hover:cursor-pointer" data-aos="fade-up" data-aos-duration="1000" data-aos-delay={index*100}>
                    <img
                      className="w-full"
                      src={require(`@/assets/img/datasets/${item.datasetsBackground}`)}
                    />
                    <div className="mx-auto mt-5 bg-[#EBEBEB] py-1 px-3 rounded inline-block text-center text-deep-grey text-xs font-medium">
                      {item.subTitle}
                    </div>
                    <div className="text-center text-deep-black text-xl font-semibold mt-2 mb-3">
                      {item.datasetsName}
                    </div>
                    <div className="text-center text-deep-grey text-sm px-6 line-clamp-2">
                      {item.des}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full bg-[#F6F6F6]">
        <div className="py-16 px-6 xl:max-w-360 mx-auto">
          <div className="text-3xl font-bold text-center mb-14">
            {intl.formatMessage({ id: "contributors" })}
          </div>
          <div className="flex flex-wrap">
            {contributors.map((item) => {
              return (
                <>
                  <div className="h-10 bg-[#E5E5E5] flex justify-center items-center px-8 py-2 rounded-sm mr-1 mb-1 text-deep-black text-base font-medium hover:cursor-pointer">
                    {item.contributorsName}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <div className="py-19 mx-auto">
        <div className="max-w-128 text-deep-black text-xl font-semibold text-center mx-auto px-6">
          {intl.formatMessage({ id: "committeeDes1" })}
          <br />
          {intl.formatMessage({ id: "committeeDes2" })}
        </div>
        <div className="max-w-128 text-deep-black text-4xl font-extralight text-center mx-auto px-6 mt-2">
          {intl.formatMessage({ id: "welcome" })}
        </div>
      </div>
      <PcFooter />
      <div>
        <div>
          {/* <Modal
            open={classDetailOpen}
            onCancel={() => {
              setClassDetailOpen(false);
            }}
            closeIcon={<img src={closeIcon} className={styles.closeIcon} />}
            footer={null}
          >
            <ClassDetail />
          </Modal> */}
        </div>
        <div>
          {/* <Modal
            open={lessonModalOpen}
            onCancel={() => {
              setLessonModalOpen(false);
            }}
            closeIcon={<img src={closeIcon} className={styles.closeIcon} />}
            footer={null}
          >
            <LessonResources />
          </Modal> */}
        </div>
        <div>
          {/* <Modal
            open={teacherTeamOpen}
            onCancel={() => {
              setTeacherTeamOpen(false);
            }}
            closeIcon={<img src={closeIcon} className={styles.closeIcon} />}
            footer={null}
          >
            <TeacherTeam />
          </Modal> */}
        </div>
        <div>
          {/* <Modal
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
          </Modal> */}
        </div>
      </div>
    </div>
  );
};

export default connect(({ global }) => ({
  global,
}))(DesktopComponent);
