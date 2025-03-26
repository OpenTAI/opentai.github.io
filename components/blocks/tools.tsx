import { iconSchema } from "../util/icon";
import {
  PageBlocksTools,
  PageBlocksToolsItems,
} from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import { basePath } from "../util/url-helper";
import { Carousel } from "antd";
import { useRef } from "react";
import { useRouter } from "next/router";
// import { read } from "fs";

export const ToolsItem = ({
  data,
  index,
}: // language,
{
  data: PageBlocksToolsItems;
  index: number;
  language: string;
}) => {
  const router = useRouter();

  return (
    <>
      <div
        className="w-[39rem] min-h-60 px-8 pt-8 pb-8 ml-8 bg-white flex flex-row break-inside-avoid-column hover:cursor-pointer"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay={index * 100}
        key={index}
        onClick={() => (data.link ? window.open(data.link) : null)}
      >
        <div className="w-56">
          <Image
            className="w-56"
            src={data.img}
            width={350}
            height={350}
            alt=""
            data-tina-field={tinaField(data, "img")}
          />
        </div>

        <div className="pl-8 grow">
          <h1
            className="text-lg font-semibold"
            data-tina-field={tinaField(data, "name")}
          >
            {data.name}
          </h1>

          <p
            className="mt-2 text-sm text-gray-500 font-light"
            data-tina-field={tinaField(data, "description")}
          >
            {data.description}
          </p>

          <div className="mt-4 flex pb-4 max-h-16 h-16 flex-wrap">
            {data.tagsImage?.length
              ? data.tagsImage.map((tag, index) => {
                  return (
                    <Image
                      className="mr-1 mb-1 max-h-6 w-auto"
                      src={tag.img}
                      alt=""
                      key={index}
                      width={300}
                      height={300}
                      data-tina-field={tinaField(tag, "img")}
                    />
                  );
                })
              : null}
          </div>
          <div className="mt-1 text-deep-black font-semibold text-base">
            <div
              data-tina-field={tinaField(data, "learnMore")}
              onClick={() => null}
            >
              {data.learnMore}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Tools = ({
  data,
  language,
}: {
  data: PageBlocksTools;
  language: string;
}) => {
  const carouselRef = useRef(null);
  const carouselNext = () => {
    carouselRef.current?.next();
  };
  const carouselPrev = () => {
    carouselRef.current?.prev();
  };

  let itemsCardArr = [];
  for (let i = 0; i < data.items?.length; i += 3) {
    itemsCardArr.push(data.items?.slice(i, i + 3));
  }

  return (
    <div className="w-full bg-bg-greyB">
      <div className="pt-20 pb-16 px-6 xl:max-w-360 mx-auto" id="Tools">
        <div
          className="text-3xl font-bold text-center mb-8"
          data-tina-field={tinaField(data, "titleen")}
        >
          {data[`title${language}`]}
        </div>
        <Carousel dots={false} ref={carouselRef}>
          {itemsCardArr.map((cardArr, index) => {
            return (
              <div key={index}>
                <div
                  // className="columns-1 sm:columns-2 lg:columns-3 gap-8"
                  className="w-full flex justify-center"
                  key={index}
                >
                  {cardArr?.length &&
                    cardArr.map((item, index) => {
                      return (
                        <ToolsItem
                          data={item}
                          index={index}
                          key={index}
                          language={language}
                        />
                      );
                    })}
                </div>
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
  );
};

const defaultTools = {
  name: "BlackdoorLLM",
  description:
    "A Comprehensive Benchmark for Backdoor Attacks on Large Language Models",
  img: "/Tools2.png",
  tagsImage: [],
  learnMore: "Learn More >",
};

export const toolsBlockSchema = {
  name: "tools",
  label: "Tools",
  ui: {
    previewSrc: `${basePath}/blocks/updates.png`,
    defaultItem: {
      projects: [defaultTools],
    },
  },
  fields: [
    {
      type: "string",
      label: "Title-En",
      name: "titleen",
    },
    {
      type: "string",
      label: "Title-Zh",
      name: "titlezh",
    },
    {
      type: "object",
      label: "Tools Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.name,
          };
        },
        defaultItem: {
          ...defaultTools,
        },
      },
      fields: [
        {
          type: "string",
          label: "Tool Name",
          name: "name",
        },
        {
          type: "string",
          label: "Description",
          name: "description",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "string",
          label: "Learn More",
          name: "learnMore",
        },
        {
          type: "string",
          label: "Link",
          name: "link",
        },
        {
          type: "image",
          label: "Tool Cover Image",
          name: "img",
          ui: {
            component: "image",
          },
        },
        {
          type: "object",
          label: "Tool Tag Image",
          name: "tagsImage",
          list: true,
          ui: {
            itemProps: (item) => {
              return {
                label: item?.tagName,
              };
            },
            defaultItem: { ...iconSchema },
          },
          fields: [
            {
              type: "image",
              label: "Tool Tag Image",
              name: "img",
              ui: {
                component: "image",
              },
            },
          ],
        },
      ],
    },
  ],
};
