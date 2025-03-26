// import { iconSchema } from "../util/icon";
import {
  PageBlocksUpdates,
  PageBlocksUpdatesUpdates,
} from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import { basePath } from "../util/url-helper";
import Link from "next/link";
import { useRouter } from "next/router";

export const Update = ({
  data,
  index,
  language,
}: {
  data: PageBlocksUpdatesUpdates;
  index: number;
  language: string;
}) => {
  const router = useRouter();

  return (
    <>
      <div
        className="text-deep-grey break-inside-avoid-column hover:cursor-pointer hover:!text-black"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay={index * 100}
        onClick={() => (data.href ? window.open(data.href) : null)}
      >
        <Image
          className="mb-4 w-full"
          src={data.img}
          width={810}
          height={480}
          alt=""
          data-tina-field={tinaField(data, "img")}
        />
        {/* <img
          className="mb-4 w-full"
          src={require(`/assets/img/updates/${data.img}`)}
        /> */}
        <div
          className="text-xs font-semibold my-3"
          data-tina-field={tinaField(data, "subtitleen")}
        >
          {data[`subtitle${language}`]}
        </div>
        <a
          className="text-deep-sky text-base hover:underline"
          data-tina-field={tinaField(data, "titleen")}
        >
          {data[`title${language}`]}
        </a>
        <div
          className="text-base my-3 text-justify"
          data-tina-field={tinaField(data, "contenten")}
        >
          {data[`content${language}`]}
        </div>
        <div
          className="text-sm font-semibold pb-3"
          data-tina-field={tinaField(data, "timeen")}
        >
          {data[`time${language}`]}
        </div>
      </div>
    </>
  );
};

export const Updates = ({
  data,
  language,
}: {
  data: PageBlocksUpdates;
  language: string;
}) => {
  return (
    <div className="mt-12 px-6 xl:max-w-360 mx-auto">
      <div className="flex justify-between">
        <div
          className="text-2xl font-bold"
          data-tina-field={tinaField(data, "titleen")}
        >
          {data[`title${language}`]}
        </div>
        <div
          className="text-xl text-deep-sky underline cursor-pointer hover:text-black"
          data-tina-field={tinaField(data, "viewMoreen")}
        >
          <Link href="/newslist">{data[`viewMore${language}`]}</Link>
        </div>
      </div>
      <div>
        <div className="columns-1 mt-9 sm:columns-2 lg:columns-3 gap-8">
          {data?.updates &&
            data.updates.map((item, index) => {
              return (
                <Update
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

const defaultUpdate = {
  title: "Frontier thoughts on AI and scientific insights",
  subtitle: "AI",
  content:
    "Laborious was can, nor some from all teachings because ever example extremely exercise rationally know, it pain explorer avoids no.",
  time: "2024 Feb 25 | by OpenTAI",
  img: "latestUpdates1.png",
};

export const updatesBlockSchema = {
  name: "updates",
  label: "Updates",
  ui: {
    previewSrc: `${basePath}/blocks/updates.png`,
    defaultItem: {
      updates: [defaultUpdate, defaultUpdate, defaultUpdate],
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
      label: "ViewMore-En",
      name: "viewMoreen",
    },
    {
      type: "string",
      label: "ViewMore-Zh",
      name: "viewMorezh",
    },
    {
      type: "object",
      label: "Update Items",
      name: "updates",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.titleen,
          };
        },
        defaultItem: {
          ...defaultUpdate,
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
          label: "Subtitle-En",
          name: "subtitleen",
        },
        {
          type: "string",
          label: "Subtitle-Zh",
          name: "subtitlezh",
        },
        {
          type: "string",
          label: "Content-En",
          name: "contenten",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "string",
          label: "Content-Zh",
          name: "contentzh",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "string",
          label: "Time-En",
          name: "timeen",
        },
        {
          type: "string",
          label: "Time-Zh",
          name: "timezh",
        },
        {
          type: "string",
          label: "Href",
          name: "href",
        },
        {
          type: "image",
          label: "Image",
          name: "img",
          ui: {
            component: "image",
          },
        },
      ],
    },
  ],
};
