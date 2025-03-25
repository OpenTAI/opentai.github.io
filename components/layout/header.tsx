import React, { useState, useEffect } from "react";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { GlobalHeader } from "../../tina/__generated__/types";
// import menu from "../../assets/img/menu.png";
import menuWhite from "../../assets/img/menuWhite.png";
// import logo from "../../assets/img/logo.png";
import logo from "../../assets/img/logoWhite.png";
import closeIcon from "../../assets/img/closeIcon.png";
// import English from "../../assets/img/English.png";
// import Chinese from "../../assets/img/Chinese.png";
import Image from "next/image";
import { Drawer, Collapse } from "antd";
import { ImageLink } from "../util/image-link";
import { useRouter } from "next/router";

export const Header = ({
  data,
  language,
}: {
  data: GlobalHeader;
  language: string;
  changeLan: Function;
}) => {
  // const [languageLogo, setLanguageLogo] = useState(Chinese);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [background, setBackground] = useState("bg-deep-sky");
  // const [textColor, setTextColor] = useState("base-blue");
  // const [icon, setIcon] = useState(logo);
  // const [menuIcon, setMenuIcon] = useState(menu);
  const [showBG, setShowBG] = useState(true);

  const { Panel } = Collapse;
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      setShowBG(false);
      setBackground("bg-deep-sky");
    } else {
      setShowBG(true);
      setBackground("bg-light-black");
    }
  }, []);

  // useEffect(() => {
  //   if (language === "zh-CN") {
  //     setLanguageLogo(Chinese);
  //   } else {
  //     setLanguageLogo(English);
  //   }
  // }, [language]);

  const onOpen = () => {
    setDrawerOpen(true);
  };

  const onClose = () => {
    setDrawerOpen(false);
  };

  const collapseIcon = (panel) => {
    const arr = ["0", "5"];
    if (arr.indexOf(panel?.panelKey) == -1) {
      if (panel?.isActive) {
        return <div className="w-4 h-4 bg-squareMinus bg-contain" />;
      } else {
        return <div className="w-4 h-4 bg-squarePlus bg-contain" />;
      }
    } else {
      return <div className="w-4 h-4 bg-squareArrow bg-contain" />;
    }
  };

  const handleScroll = () => {
    let scrollTop = document.documentElement.scrollTop;
    if (scrollTop > 64) {
      setBackground("bg-deep-sky");
      // setTextColor("white");
      // setIcon(logoWhite);
      // setMenuIcon(menuWhite);
    } else {
      if (showBG) {
        setBackground("bg-light-black");
      } else {
        setBackground("bg-deep-sky");
      }
      // setTextColor("base-blue");
      // setIcon(logo);
      // setMenuIcon(menu);
    }
  };

  // const changeLan = () => {
  //   if (language === "zh-CN") {
  //     // dispatch({ type: "global/changeLan", payload: { language: "en-US" } });
  //     // setLocale("en-US", false);
  //   } else {
  //     // dispatch({ type: "global/changeLan", payload: { language: "zh-CN" } });
  //     // setLocale("zh-CN", false);
  //   }
  // };

  return (
    <div className={`${showBG ? "bg-header h-175 lg:h-225" : ""}`}>
      <div className="fixed w-full z-20">
        <div
          className={`flex py-6 px-4 sm:px-20 justify-between items-center ${background} `}
        >
          <ImageLink
            className="w-28 object-contain"
            src={logo}
            target="_self"
            width={112}
            height={30}
            href={data.homeurl}
          />
          <div className="hidden sm:flex w-128 justify-between">
            {data.nav.map((item, index) => {
              return (
                <div
                  key={index}
                  className="text-base text-white cursor-pointer flex items-center font-semibold"
                >
                  <Link
                    data-tina-field={tinaField(item, "labelen")}
                    href={`${item.href}`}
                  >
                    {item[`label${language}`]}
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="placeholder"></div>
          {/* <img
            className="hidden sm:block w-7 h-7 mr-20 hover:cursor-pointer"
            src={languageLogo}
            onClick={changeLan}
          /> */}
          <Image
            className="block sm:hidden h-5 w-6"
            src={menuWhite}
            alt="Menu Icon"
            onClick={onOpen}
          />
        </div>
      </div>
      {showBG ? (
        <div className="pt-32 sm:pt-56">
          <div className="mx-2 sm:mx-20 flex items-center justify-center">
            <div
              className="text-center sm:text-center text-[40px] sm:text-6xl text-white sm:w-144 font-extralight leading-[46px] sm:leading-18 pt-5 sm:pt-3"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="500"
              data-tina-field={tinaField(data, "detailTitleen")}
            >
              {data[`detailTitle${language}`]}
            </div>
          </div>
          <div className="mx-2 sm:mx-20 flex items-center justify-center">
            <div
              className="text-center sm:text-center text-[40px] sm:text-6xl text-white sm:w-168 font-extralight leading-[46px] sm:leading-18 pt-5 sm:pt-3"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="500"
              data-tina-field={tinaField(data, "detailContenten")}
            >
              {data[`detailContent${language}`]}
            </div>
          </div>
          <div className="mx-2 sm:mx-20 flex items-center justify-center">
            <div
              className="mx-auto sm:mx-0 mt-10 sm:mt-12 w-60 h-16 bg-deep-sky text-white flex items-center justify-center font-semibold text-xl hover:bg-black hover:cursor-pointer"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="1000"
              data-tina-field={tinaField(data, "viewMoreen")}
              onClick={() => (data.viewMoreLink ? router.push(data.viewMoreLink) : null)}
            >
              {data[`viewMore${language}`]}
            </div>
          </div>
        </div>
      ) : null}

      {/* <Container size="custom" className="py-0 relative z-10 max-w-8xl">
        <div className="flex items-center justify-between gap-6">
          <h4 className="select-none text-lg font-bold tracking-tight my-4 transition duration-150 ease-out transform">
            <Link
              href="/"
              className="flex gap-1 items-center whitespace-nowrap tracking-[.002em]"
            >
              <Icon
                tinaField={tinaField(data, "icon")}
                parentColor={data.color}
                data={{
                  name: data.icon.name,
                  color: data.icon.color,
                  style: data.icon.style,
                }}
              />
              <span data-tina-field={tinaField(data, "name")}>{data.name}</span>
            </Link>
          </h4>
          <ul className="flex gap-6 sm:gap-8 lg:gap-10 tracking-[.002em] -mx-4">
            {data.nav &&
              data.nav.map((item, i) => {
                const activeItem =
                  (item.href === ""
                    ? router.asPath === "/"
                    : router.asPath.includes(item.href)) && isClient;
                return (
                  <li
                    key={`${item.label}-${i}`}
                    className={`${
                      activeItem ? activeItemClasses[theme.color] : ""
                    }`}
                  >
                    <Link
                      data-tina-field={tinaField(item, "label")}
                      href={`/${item.href}`}
                      className={`relative select-none	text-base inline-block tracking-wide transition duration-150 ease-out hover:opacity-100 py-8 px-4 ${
                        activeItem ? `` : `opacity-70`
                      }`}
                    >
                      {item.label}
                      {activeItem && (
                        <svg
                          className={`absolute bottom-0 left-1/2 w-[180%] h-full -translate-x-1/2 -z-1 opacity-10 dark:opacity-15 ${
                            activeBackgroundClasses[theme.color]
                          }`}
                          preserveAspectRatio="none"
                          viewBox="0 0 230 230"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="230"
                            y="230"
                            width="230"
                            height="230"
                            transform="rotate(-180 230 230)"
                            fill="url(#paint0_radial_1_33)"
                          />
                          <defs>
                            <radialGradient
                              id="paint0_radial_1_33"
                              cx="0"
                              cy="0"
                              r="1"
                              gradientUnits="userSpaceOnUse"
                              gradientTransform="translate(345 230) rotate(90) scale(230 115)"
                            >
                              <stop stopColor="currentColor" />
                              <stop
                                offset="1"
                                stopColor="currentColor"
                                stopOpacity="0"
                              />
                            </radialGradient>
                          </defs>
                        </svg>
                      )}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
        <div
          className={`absolute h-1 bg-gradient-to-r from-transparent ${
            data.color === "primary" ? `via-white` : `via-black dark:via-white`
          } to-transparent bottom-0 left-4 right-4 -z-1 opacity-5`}
        />
      </Container> */}
      <Drawer
        title={null}
        onClose={onClose}
        open={drawerOpen}
        width={414}
        maskClosable={false}
        style={{ background: "#000" }}
        closeIcon={null}
      >
        <div className="flex items-center justify-between mb-7">
          <Image src={logo} className="w-28" alt="" />
          <Image src={closeIcon} className="w-5 h-5" onClick={onClose} alt="" />
        </div>
        <div>
          <Collapse
            bordered={false}
            accordion
            expandIconPosition="end"
            ghost
            expandIcon={(item) => collapseIcon(item)}
          >
            {data.nav.map((item, index) => {
              return (
                <div key={index}>
                  <div className="w-full h-[2px] bg-white"></div>
                  <Panel
                    header={
                      <div>
                        <div className="py-4 text-white font-semibold text-xl">
                          <Link
                            // data-tina-field={tinaField(item, "label")}
                            href={`/${item.href}`}
                          >
                            {item[`label${language}`]}
                          </Link>
                        </div>
                      </div>
                    }
                    key={index}
                    // collapsible={"disabled"}
                  ></Panel>
                </div>
              );
            })}
          </Collapse>
          <div className="w-full h-[2px] bg-white"></div>
        </div>
      </Drawer>
    </div>
  );
};
