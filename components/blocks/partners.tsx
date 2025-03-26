// import { iconSchema } from "../util/icon";
import {
  PageBlocksPartners,
  PageBlocksPartnersItems,
} from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import { basePath } from "../util/url-helper";
// import { Carousel } from "antd";
// import { useRef } from "react";
// import { read } from "fs";

export const PartnersItem = ({
  data,
  // index,
  // language,
}: {
  data: PageBlocksPartnersItems;
  index: number;
  language: string;
}) => {
  return (
    <>
      <Image
        className="w-auto h-20 mr-8 mb-8"
        src={data.img}
        width={200}
        height={200}
        alt=""
        data-tina-field={tinaField(data, "img")}
      />
    </>
  );
};

export const Partners = ({
  data,
  language,
}: {
  data: PageBlocksPartners;
  language: string;
}) => {
  return (
    <div className="w-full bg-bg-greyB">
      <div className="pt-20 pb-8 px-6 xl:max-w-360 mx-auto" id="Partners">
        <div
          className="text-3xl font-bold text-center mb-8"
          data-tina-field={tinaField(data, "titleen")}
        >
          {data[`title${language}`]}
        </div>
        <div className="w-full flex justify-center flex-wrap">
          {data.items?.length &&
            data.items.map((item, index) => {
              return (
                <PartnersItem
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

const defaultPartners = {
  name: "Fudan University",
  img: '',
};

export const partnersBlockSchema = {
  name: "partners",
  label: "Partners",
  ui: {
    previewSrc: `${basePath}/blocks/updates.png`,
    defaultItem: {
      projects: [defaultPartners],
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
      label: "Partners",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.name,
          };
        },
        defaultItem: {
          ...defaultPartners,
        },
      },
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "image",
          label: "Partner Logo",
          name: "img",
          ui: {
            component: "image",
          },
        },
      ],
    },
  ],
};
