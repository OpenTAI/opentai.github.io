import { iconSchema } from "../util/icon";
import {
  PageBlocksFeatures,
  PageBlocksFeaturesItems1,
  PageBlocksFeaturesItems2,
} from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import { basePath } from "../util/url-helper";

export const Feature1 = ({
  data,
  index,
  language,
}: {
  data: PageBlocksFeaturesItems1;
  index: number;
  language: string;
}) => {
  return (
    <div
      data-tina-field={tinaField(data)}
      className="bg-light-grey hover:cursor-pointer hover:shadow-[0px_3px_8px_0px_#A7AEB733] h-[270px] break-inside-avoid-column grow-[3]"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay={index * 100}
    >
      <div className="p-6">
        {data.image && (
          <Image
            className="w-8"
            src={data.image.src}
            alt=""
            width={32}
            height={32}
            data-tina-field={tinaField(data, "image")}
          />
        )}
        {data[`title${language}`] && (
          <div
            className="mt-2 text-base-blue text-lg font-semibold line-clamp-3"
            data-tina-field={tinaField(data, "titleen")}
          >
            {data[`title${language}`]}
          </div>
        )}
        {data[`text${language}`] && (
          <div
            className="mt-2 h-28 text-des-blue text-xs line-clamp-5"
            data-tina-field={tinaField(data, "texten")}
          >
            {data[`text${language}`]}
          </div>
        )}
      </div>
    </div>
  );
};

export const Feature2 = ({
  data,
  index,
  language,
}: {
  data: PageBlocksFeaturesItems2;
  index: number;
  language: string;
}) => {
  return (
    <div
      data-tina-field={tinaField(data)}
      className="bg-light-green hover:cursor-pointer hover:shadow-[0px_3px_8px_0px_#A7AEB733] h-64 break-inside-avoid-column grow-[3]"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay={index * 100}
    >
      <div className="p-6">
        {data.image && (
          <Image
            className="w-8"
            src={data.image.src}
            alt=""
            width={32}
            height={32}
            data-tina-field={tinaField(data, "image")}
          />
        )}
        {data[`title${language}`] && (
          <div
            className="mt-2 text-base-blue text-lg font-semibold line-clamp-3"
            data-tina-field={tinaField(data, "titleen")}
          >
            {data[`title${language}`]}
          </div>
        )}
        {data[`text${language}`] && (
          <div
            className="mt-2 h-28 text-des-blue text-xs line-clamp-5"
            data-tina-field={tinaField(data, "texten")}
          >
            {data[`text${language}`]}
          </div>
        )}
      </div>
    </div>
  );
};

export const Features = ({
  data,
  language,
}: {
  data: PageBlocksFeatures;
  language: string;
}) => {
  return (
    <div className="max-w-320 mx-auto px-3">
      <div className="h-px" id="models" />
      <div className="mt-14">
        {data[`title1${language}`] && (
          <div
            className="text-base-black text-center font-semibold text-5sm"
            data-tina-field={tinaField(data, "title1en")}
          >
            {data[`title1${language}`]}
          </div>
        )}
        <div className="mt-6">
          <div className="!grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {data.items1 &&
              data.items1.map((item, index) => {
                return (
                  <Feature1
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
      <div className="mt-6">
        {data[`title2${language}`] && (
          <div
            className="text-base-black text-center font-semibold text-5sm"
            data-tina-field={tinaField(data, "title2en")}
          >
            {data[`title2${language}`]}
          </div>
        )}
        <div className="mt-6">
          <div className="!grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {data.items2 &&
              data.items2.map((item, index) => {
                return (
                  <Feature2
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
    </div>
  );
};

const defaultFeature = {
  title: "Here's Another Feature",
  text: "This is where you might talk about the feature, if this wasn't just filler text.",
};

export const featureBlockSchema = {
  name: "features",
  label: "Features",
  ui: {
    previewSrc: `${basePath}/blocks/features.png`,
    defaultItem: {
      items: [defaultFeature, defaultFeature, defaultFeature],
    },
  },
  fields: [
    {
      type: "string",
      label: "Title-1-En",
      name: "title1en",
    },
    {
      type: "string",
      label: "Title-1-Zh",
      name: "title1zh",
    },
    {
      type: "object",
      label: "Feature Items-1",
      name: "items1",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.titleen,
          };
        },
        defaultItem: {
          ...defaultFeature,
        },
      },
      fields: [
        iconSchema,
        {
          type: "object",
          label: "Image",
          name: "image",
          fields: [
            {
              name: "src",
              label: "Image Source",
              type: "image",
            },
            {
              name: "alt",
              label: "Alt Text",
              type: "string",
            },
          ],
        },
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
          type: "string",
          label: "Text-En",
          name: "texten",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "string",
          label: "Text-Zh",
          name: "textzh",
          ui: {
            component: "textarea",
          },
        },
      ],
    },
    {
      type: "string",
      label: "Title-2-En",
      name: "title2en",
    },
    {
      type: "string",
      label: "Title-2-Zh",
      name: "title2zh",
    },
    {
      type: "object",
      label: "Feature Items-2",
      name: "items2",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.titleen,
          };
        },
        defaultItem: {
          ...defaultFeature,
        },
      },
      fields: [
        iconSchema,
        {
          type: "object",
          label: "Image",
          name: "image",
          fields: [
            {
              name: "src",
              label: "Image Source",
              type: "image",
            },
            {
              name: "alt",
              label: "Alt Text",
              type: "string",
            },
          ],
        },
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
          type: "string",
          label: "Text-En",
          name: "texten",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "string",
          label: "Text-Zh",
          name: "textzh",
          ui: {
            component: "textarea",
          },
        },
      ],
    },
  ],
};
