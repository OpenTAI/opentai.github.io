import React from "react";
// import { Container } from "../util/container";
// import { Section } from "../util/section";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaTemplate } from "tinacms";
import { PageBlocksContent } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { basePath } from "../util/url-helper";

export const Content = ({ data }: { data: PageBlocksContent }) => {
  return (
    <div className="mt-20 bg-deep-sky text-white py-14">
      <div className="text-2xl sm:text-3xl lg:text-4xl mb-9 text-center font-semibold" 
      data-tina-field={tinaField(data, "title")}
      >
        {data.title}
      </div>
      <div className="text-xl sm:text-2xl lg:text-3xl max-w-210 text-center mx-auto px-6" data-tina-field={tinaField(data, "body")}>
        <TinaMarkdown content={data.body} />
      </div>
    </div>
  );
};

export const contentBlockSchema: TinaTemplate = {
  name: "content",
  label: "Content",
  ui: {
    previewSrc: `${basePath}/blocks/content.png`,
    defaultItem: {
      title: "Content Block",
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body",
    },
  ],
};
