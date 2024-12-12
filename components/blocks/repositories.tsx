import { PageBlocksRepositories } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import type { TinaTemplate } from "tinacms";
import { ImageLink } from "../util/image-link";
import { basePath } from "../util/url-helper";

export const Repositories = ({
  data,
  language,
}: {
  data: PageBlocksRepositories;
  language: string;
}) => {
  return (
    <div className="max-w-320 mx-auto px-3">
      <div className="h-px" id="datasets"></div>
      <div className="mt-22">
        {data[`title${language}`] && (
          <div
            className="text-base-black text-5sm font-semibold max-w-191 mx-auto text-center"
            data-tina-field={tinaField(data, "titleen")}
          >
            {data[`title${language}`]}
          </div>
        )}
        <div className="mt-10">
          <div className="!grid gap-6 grid-cols-1 lg:grid-cols-3">
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-tina-field={tinaField(data, "bgImage1")}
              className="h-[21rem] bg-cover bg-no-repeat bg-center border-[#EBF1F5] border py-11 px-12 relative"
              style={{
                backgroundImage: `url(${
                  data.bgImage1?.src || "default-image-url"
                })`,
              }}
            >
              {data[`subtitle1${language}`] && (
                <div
                  className="text-base-black font-bold text-3xl leading-10"
                  data-tina-field={tinaField(data, "subtitle1en")}
                >
                  {data[`subtitle1${language}`]}
                </div>
              )}
              {data[`text1${language}`] && (
                <div
                  className="text-des-blue text-base mt-3 max-w-108 line-clamp-5 h-32"
                  data-tina-field={tinaField(data, "text1en")}
                >
                  {data[`text1${language}`]}
                </div>
              )}
              {data.image1 && (
                <ImageLink
                  src={data.image1.src}
                  width={192}
                  height={148}
                  href={data.image1.href}
                  className="absolute bottom-11 left-12 w-48 h-12 hover:cursor-pointer"
                  tinaField={tinaField(data, "image1")}
                />
              )}
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={100}
              data-tina-field={tinaField(data, "bgImage2")}
              className="h-[21rem] bg-cover bg-no-repeat bg-center border-[#EBF1F5] border py-11 px-12 relative"
              style={{
                backgroundImage: `url(${data.bgImage2?.src})`,
              }}
            >
              {data[`subtitle2${language}`] && (
                <div
                  className="text-base-black font-bold text-3xl leading-10"
                  data-tina-field={tinaField(data, "subtitle2en")}
                >
                  {data[`subtitle2${language}`]}
                </div>
              )}
              {data[`text2${language}`] && (
                <div
                  className="text-des-blue text-base mt-3 max-w-108 line-clamp-5 h-32"
                  data-tina-field={tinaField(data, "text2en")}
                >
                  {data[`text2${language}`]}
                </div>
              )}
              {data.image2 && (
                <ImageLink
                  src={data.image2.src}
                  width={192}
                  height={148}
                  href={data.image2.href}
                  className="absolute bottom-11 left-12 w-48 h-12 hover:cursor-pointer"
                  tinaField={tinaField(data, "image2")}
                />
              )}
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={100}
              data-tina-field={tinaField(data, "bgImage3")}
              className="h-[21rem] bg-cover bg-no-repeat bg-center border-[#EBF1F5] border py-11 px-12 relative"
              style={{
                backgroundImage: `url(${data.bgImage3?.src})`,
              }}
            >
              {data[`subtitle2${language}`] && (
                <div
                  className="text-base-black font-bold text-3xl leading-10"
                  data-tina-field={tinaField(data, "subtitle3en")}
                >
                  {data[`subtitle3${language}`]}
                </div>
              )}
              {data[`text3${language}`] && (
                <div
                  className="text-des-blue text-base mt-3 max-w-108 line-clamp-5 h-32"
                  data-tina-field={tinaField(data, "text3en")}
                >
                  {data[`text3${language}`]}
                </div>
              )}
              {data.image3 && (
                <ImageLink
                  src={data.image3.src}
                  width={192}
                  height={148}
                  href={data.image3.href}
                  className="absolute bottom-11 left-12 w-48 h-12 hover:cursor-pointer"
                  tinaField={tinaField(data, "image3")}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const repositoriesBlockSchema: TinaTemplate = {
  name: "repositories",
  label: "Repositories",
  ui: {
    previewSrc: `${basePath}/blocks/repositories.png`,
    defaultItem: {
      title: "Here's repository title",
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
      type: "string",
      label: "Subtitle1-En",
      name: "subtitle1en",
    },
    {
      type: "string",
      label: "Subtitle1-Zh",
      name: "subtitle1zh",
    },
    {
      type: "string",
      label: "text1-En",
      name: "text1en",
    },

    {
      type: "string",
      label: "text1-Zh",
      name: "text1zh",
    },
    {
      type: "object",
      label: "Image1",
      name: "image1",
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
        {
          name: "href",
          label: "Image Link",
          type: "string",
        },
      ],
    },
    {
      type: "object",
      label: "BgImage1",
      name: "bgImage1",
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
        {
          name: "href",
          label: "Image Link",
          type: "string",
        },
      ],
    },
    {
      type: "string",
      label: "Subtitle2-En",
      name: "subtitle2en",
    },
    {
      type: "string",
      label: "Subtitle2-Zh",
      name: "subtitle2zh",
    },
    {
      type: "string",
      label: "text2-En",
      name: "text2en",
    },
    {
      type: "string",
      label: "text2-Zh",
      name: "text2zh",
    },
    {
      type: "object",
      label: "Image2",
      name: "image2",
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
        {
          name: "href",
          label: "Image Link",
          type: "string",
        },
      ],
    },
    {
      type: "object",
      label: "BgImage2",
      name: "bgImage2",
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
        {
          name: "href",
          label: "Image Link",
          type: "string",
        },
      ],
    },
    {
      type: "string",
      label: "Subtitle3-En",
      name: "subtitle3en",
    },
    {
      type: "string",
      label: "Subtitle3-Zh",
      name: "subtitle3zh",
    },
    {
      type: "string",
      label: "text3-En",
      name: "text3en",
    },
    {
      type: "string",
      label: "text3-Zh",
      name: "text3zh",
    },
    {
      type: "object",
      label: "Image3",
      name: "image3",
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
        {
          name: "href",
          label: "Image Link",
          type: "string",
        },
      ],
    },
    {
      type: "object",
      label: "BgImage3",
      name: "bgImage3",
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
        {
          name: "href",
          label: "Image Link",
          type: "string",
        },
      ],
    },
  ],
};
