// import { iconSchema } from "../util/icon";
import {
  PageBlocksContributors,
  PageBlocksContributorsItems,
} from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
// import Image from "next/image";
import { basePath } from "../util/url-helper";
// import { Carousel } from "antd";
// import { useRef } from "react";
// import { read } from "fs";

export const ContributorsItem = ({
  data,
  index,
  // language,
}: {
  data: PageBlocksContributorsItems;
  index: number;
  language: string;
}) => {
  return (
    <>
      <div
        key={index}
        className="h-10 bg-[#E5E5E5] flex justify-center items-center px-8 py-2 rounded-sm mr-1 mb-1 text-deep-black text-base font-medium hover:cursor-pointer hover:bg-[#CFCFCF]"
        data-tina-field={tinaField(data, "name")}
      >
        {data.name}
      </div>
    </>
  );
};

export const Contributors = ({
  data,
  language,
}: {
  data: PageBlocksContributors;
  language: string;
}) => {
  return (
    <div className="w-full bg-bg-greyB">
      <div className="pt-20 pb-16 px-6 xl:max-w-360 mx-auto" id="Contributors">
        <div className="text-3xl font-bold text-center mb-8" data-tina-field={tinaField(data, "titleen")}>
          {data[`title${language}`]}
        </div>
        <div className="flex flex-wrap">
          {data.items?.length &&
            data.items.map((item, index) => {
              return (
                <ContributorsItem
                  data={item}
                  index={index}
                  key={index}
                  language={language}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

const defaultContributors = {
  name: "Joseph Moore",
};

export const contributorsBlockSchema = {
  name: "contributors",
  label: "Contributors",
  ui: {
    previewSrc: `${basePath}/blocks/updates.png`,
    defaultItem: {
      projects: [defaultContributors],
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
      label: "Contributors",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.name,
          };
        },
        defaultItem: {
          ...defaultContributors,
        },
      },
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
        },
      ],
    },
  ],
};
