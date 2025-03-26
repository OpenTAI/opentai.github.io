// import { iconSchema } from "../util/icon";
import {
  PageBlocksDatasets,
  PageBlocksDatasetsItems,
} from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import { basePath } from "../util/url-helper";
import { Carousel } from "antd";
import { useRef } from "react";
import { useRouter } from "next/router";

export const DatasetsItem = ({
  data,
  index,
}: // language,
{
  data: PageBlocksDatasetsItems;
  index: number;
  language: string;
}) => {
  const router = useRouter();

  return (
    <>
      <div
        className="min-h-80 pb-9 mb-8 bg-white flex flex-col break-inside-avoid-column hover:cursor-pointer"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay={index * 100}
        key={index}
        onClick={() => (data.link ? window.open(data.link) : null)}
      >
        {/* <img
        className="w-full"
        src={require(`@/assets/img/datasets/${data.datasetsBackground}`)}
      /> */}
        <Image
          className="w-full"
          // src={require(`/assets/img/project/${data.projectIcon}`)}
          src={data.datasetsBackground}
          width={96}
          height={93}
          alt=""
          data-tina-field={tinaField(data, "datasetsBackground")}
        />
        <div
          className="mx-auto mt-5 bg-[#EBEBEB] py-1 px-3 rounded inline-block text-center text-deep-grey text-xs font-medium"
          data-tina-field={tinaField(data, "subTitle")}
        >
          {data.subTitle}
        </div>
        <div
          className="text-center text-deep-black text-xl font-semibold mt-2 mb-3"
          data-tina-field={tinaField(data, "datasetsName")}
        >
          {data.datasetsName}
        </div>
        <div
          className="text-center text-deep-grey text-sm px-6 line-clamp-2"
          data-tina-field={tinaField(data, "desc")}
        >
          {data.desc}
        </div>
      </div>
    </>
  );
};

export const Datasets = ({
  data,
  language,
}: {
  data: PageBlocksDatasets;
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
  for (let i = 0; i < data.items?.length; i += 4) {
    itemsCardArr.push(data.items.slice(i, i + 4));
  }

  return (
    <div className="w-full bg-light-grey">
      <div className="pt-20 pb-24 px-6 xl:max-w-360 mx-auto" id="datasets">
        <div
          className="text-3xl font-bold text-center mb-8"
          data-tina-field={tinaField(data, "titleen")}
        >
          {data[`title${language}`]}
        </div>
        <Carousel dots={false} ref={carouselRef}>
          {itemsCardArr.map((cardArr, index) => {
            return (
              <div
                className="columns-1 sm:columns-2 lg:columns-4 gap-8"
                key={index}
              >
                {cardArr?.length &&
                  cardArr.map((item, index) => {
                    return (
                      <DatasetsItem
                        data={item}
                        index={index}
                        key={index}
                        language={language}
                      />
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
  );
};

const defaultDatasets = {
  datasetsName: "系外行星检测",
  datasetsBackground: "/datasets2.png",
  desc: "But actual has painful explain born and pain no dislikes of praising.But actual has painful explain born and pain no dislikes of praising.",
  subTitle: "DEEPFAKE",
};

export const datasetBlockSchema = {
  name: "datasets",
  label: "Datasets",
  ui: {
    previewSrc: `${basePath}/blocks/updates.png`,
    defaultItem: {
      projects: [defaultDatasets],
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
      label: "Dataset Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.datasetsName,
          };
        },
        defaultItem: {
          ...defaultDatasets,
        },
      },
      fields: [
        {
          type: "string",
          label: "Datasets Name",
          name: "datasetsName",
        },
        {
          type: "string",
          label: "Description",
          name: "desc",
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
          label: "Link",
          name: "link",
        },
        {
          type: "image",
          label: "Datasets Background",
          name: "datasetsBackground",
          ui: {
            component: "image",
          },
        },
      ],
    },
  ],
};
