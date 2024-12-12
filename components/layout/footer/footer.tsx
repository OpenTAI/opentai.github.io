import React from "react";
import Link from "next/link";
import logoWhite from "../../../assets/img/logoWhite.png";
import Facebook from "../../../assets/img/Facebook.png";
import Twitter from "../../../assets/img/Twitter.png";
import LinkedIn from "../../../assets/img/LinkedIn.png";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import { ImageLink } from "../../util/image-link";

export const Footer = ({ data }) => {
  return (
    <footer>
      <div className="w-full h-128 sm:h-52 bg-base-blue">
        <div className="w-full py-6 bg-deep-sky flex flex-col items-center">
          <ImageLink
            src={logoWhite}
            href={data.homeurl}
            className="max-w-48 mb-11 sm:mb-6 sm:max-w-28"
            width={112}
            height={30}
            target="_self"
          />
          <div className="flex flex-col items-center sm:flex-row sm:w-144 sm:justify-between">
            {data.nav &&
              data.nav.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="text-xl sm:text-base text-white cursor-pointer flex items-center font-semibold mb-5"
                    onClick={item.onClick}
                  >
                    <Link
                      data-tina-field={tinaField(item, "label")}
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </div>
                );
              })}
          </div>
          <div className="w-22 flex justify-between mb-6 items-center">
            <a
              data-tina-field={tinaField(data.social, "facebook")}
              href={`${data.social.facebook}`}
              target="_blank"
            >
              <Image className="h-4 w-2" src={Facebook} alt="" />
            </a>
            <a
              data-tina-field={tinaField(data.social, "twitter")}
              href={`${data.social.twitter}`}
              target="_blank"
            >
              <Image className="h-[13px] w-4" src={Twitter} alt="" />
            </a>
            <a
              data-tina-field={tinaField(data.social, "linkedin")}
              href={`${data.social.linkedin}`}
              target="_blank"
            >
              <Image className="h-4 w-4" src={LinkedIn} alt="" />
            </a>
          </div>
          <div className="flex flex-col items-center text-white text-sm font-medium sm:flex-row sm:w-96 sm:justify-between">
            {data.copyright && (
              <div data-tina-field={tinaField(data, "copyright")}>
                {data.copyright}
              </div>
            )}
            <div>
              {data.terms && (
                <div data-tina-field={tinaField(data, "terms")}>
                  {data.terms}
                </div>
              )}
            </div>
          </div>
          <div />
        </div>
      </div>
      {/* <Container className="relative" size="small">
        <div className="flex justify-between items-center gap-6 flex-wrap">
          <Link
            href="/"
            className="group mx-2 flex items-center font-bold tracking-tight text-gray-400 dark:text-gray-300 opacity-50 hover:opacity-100 transition duration-150 ease-out whitespace-nowrap"
          >
            <Icon
              parentColor={data.color}
              data={{
                name: icon.name,
                color: data.color === "primary" ? "primary" : icon.color,
                style: icon.style,
              }}
              className="inline-block h-10 w-auto group-hover:text-orange-500"
            />
          </Link>
          <div className="flex gap-4">
            {data.social && data.social.facebook && (
              <a
                className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                href={data.social.facebook}
                target="_blank"
              >
                <FaFacebookF className={`${socialIconClasses}`} />
              </a>
            )}
            {data.social && data.social.twitter && (
              <a
                className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                href={data.social.twitter}
                target="_blank"
              >
                <FaTwitter
                  className={`${socialIconClasses} ${
                    socialIconColorClasses[
                      data.color === "primary" ? "primary" : theme.color
                    ]
                  }`}
                />
              </a>
            )}
            {data.social && data.social.instagram && (
              <a
                className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                href={data.social.instagram}
                target="_blank"
              >
                <AiFillInstagram
                  className={`${socialIconClasses} ${
                    socialIconColorClasses[
                      data.color === "primary" ? "primary" : theme.color
                    ]
                  }`}
                />
              </a>
            )}
            {data.social && data.social.github && (
              <a
                className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                href={data.social.github}
                target="_blank"
              >
                <FaGithub
                  className={`${socialIconClasses} ${
                    socialIconColorClasses[
                      data.color === "primary" ? "primary" : theme.color
                    ]
                  }`}
                />
              </a>
            )}
          </div>
          <RawRenderer parentColor={data.color} rawData={rawData} />
        </div>
        <div
          className={`absolute h-1 bg-gradient-to-r from-transparent ${
            data.color === "primary" ? `via-white` : `via-black dark:via-white`
          } to-transparent top-0 left-4 right-4 opacity-5`}
        ></div>
      </Container> */}
    </footer>
  );
};
