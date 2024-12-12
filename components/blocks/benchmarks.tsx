// import { iconSchema } from "../util/icon";
import {
  PageBlocksBenchMarks,
  PageBlocksBenchMarksItems,
} from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import { basePath } from "../util/url-helper";
import { Carousel } from "antd";
import { useRef } from "react";
// import { read } from "fs";

export const BenchMarksItem = ({
  data,
  index,
  // language,
}: {
  data: PageBlocksBenchMarksItems;
  index: number;
  language: string;
}) => {
  return (
    <>
      <div
        className="w-[26rem] min-h-80 px-8 pt-8 pb-8 ml-8 bg-white flex flex-col break-inside-avoid-column hover:cursor-pointer"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay={index * 100}
        key={index}
      >
        <div className="flex items-center space-x-4 bg-bg-greyB p-4 rounded">
          <Image
            className="w-16"
            src={data.benchMarksImg}
            width={96}
            height={93}
            alt=""
            data-tina-field={tinaField(data, "benchMarksImg")}
          />
          <div>
            <h1 className="text-lg font-semibold text-gray-900"  data-tina-field={tinaField(data, "benchMarkName")}>
              {data.benchMarkName}
            </h1>
            <p className="text-sm text-gray-500"  data-tina-field={tinaField(data, "subTitle")}>{data.subTitle}</p>
          </div>
        </div>

        <div className="px-4 pt-4">
          <p className="mt-4 text-sm text-gray-500 font-light"  data-tina-field={tinaField(data, "description")}>
            {data.description}
          </p>

          <div className="mt-4 flex space-x-2 pb-4">
            {data.tags?.length &&
              data.tags.map((tag, index) => {
                return (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue text-sm font-light text-white rounded"
                    data-tina-field={tinaField(tag, "tagName")}
                  >
                    {tag.tagName}
                  </span>
                );
              })}
          </div>
          <div className="mt-1 text-deep-black font-semibold text-base"  data-tina-field={tinaField(data, "learnMore")}>
            <div onClick={() => null}>{data.learnMore}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export const BenchMarks = ({
  data,
  language,
}: {
  data: PageBlocksBenchMarks;
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
      <div className="pt-20 pb-16 px-6 xl:max-w-360 mx-auto" id="BenchMarks">
        <div className="text-3xl font-bold text-center mb-8"  data-tina-field={tinaField(data, "titleen")}>
          {data[`title${language}`]}
        </div>
        <Carousel dots={false} ref={carouselRef}>
          {itemsCardArr.map((cardArr, index) => {
            return (
              <div key={index}>
                <div
                  // className="columns-1 sm:columns-2 lg:columns-3 gap-8"
                  className="w-full flex justify-center"
                >
                  {cardArr?.length &&
                    cardArr.map((item, index) => {
                      return (
                        <BenchMarksItem
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

const defaultBenchMarks = {
  benchMarkName: "Vision Safety",
  subTitle: "world's #1 benchmark",
  benchMarksImg: "/BenchMarks2.png",
  description:
    "Adversarial attacks and defenses.Adversarial attacks and defenses.Adversarial attacks and defenses.Adversarial attacks and defenses.",
  tags: [],
  learnMore: "Learn More >",
};

export const benchMarksBlockSchema = {
  name: "benchMarks",
  label: "BenchMarks",
  ui: {
    previewSrc: `${basePath}/blocks/updates.png`,
    defaultItem: {
      projects: [defaultBenchMarks],
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
      label: "BenchMark Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.benchMarkName,
          };
        },
        defaultItem: {
          ...defaultBenchMarks,
        },
      },
      fields: [
        {
          type: "string",
          label: "BenchMark Name",
          name: "benchMarkName",
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
          label: "SubTitle",
          name: "subTitle",
        },
        {
          type: "string",
          label: "Learn More",
          name: "learnMore",
        },
        {
          type: "image",
          label: "BenchMark Image",
          name: "benchMarksImg",
          ui: {
            component: "image",
          },
        },
        {
          type: "object",
          label: "Tags",
          name: "tags",
          list: true,
          ui: {
            itemProps: (item) => {
              return {
                label: item?.tagName,
              };
            },
            defaultItem: { tagName: "LLM" },
          },
          fields: [
            {
              type: "string",
              label: "Tag Name",
              name: "tagName",
            },
          ],
        },
      ],
    },
  ],
};
