import type { Collection } from "tinacms";
import { heroBlockSchema } from "../../components/blocks/hero";
import { contentBlockSchema } from "../../components/blocks/content";
import { testimonialBlockSchema } from "../../components/blocks/testimonial";
import { featureBlockSchema } from "../../components/blocks/features";
import { repositoriesBlockSchema } from "../../components/blocks/repositories";
import { tablesBlockSchema } from "../../components/blocks/tables";
import { updatesBlockSchema } from "../../components/blocks/updates";
import { projectBlockSchema } from "../../components/blocks/project";
import { datasetBlockSchema } from "../../components/blocks/datasets";
import { benchMarksBlockSchema } from "../../components/blocks/benchmarks";
import { toolsBlockSchema } from "../../components/blocks/tools";
import { contributorsBlockSchema } from "../../components/blocks/contributors";
import { partnersBlockSchema } from "../../components/blocks/partners";
import { newsListBlockSchema } from "../../components/blocks/newsList";

const Page: Collection = {
  label: "Pages",
  name: "page",
  path: "content/pages",
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "home") {
        return ``;
      }
      if (document._sys.filename === "leaderboards") {
        return `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/leaderboards`;
      }
      if (document._sys.filename === "newslist") {
        return `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/newslist`;
      }
      return undefined;
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      description:
        "The title of the page. This is used to display the title in the CMS",
      isTitle: true,
      required: true,
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      ui: {
        visualSelector: true,
      },
      templates: [
        heroBlockSchema,
        /* eslint-disable */
        // @ts-ignore
        featureBlockSchema,
        // @ts-ignore
        updatesBlockSchema,
        // @ts-ignore
        projectBlockSchema,
        // @ts-ignore
        datasetBlockSchema,
        // @ts-ignore
        benchMarksBlockSchema,
        // @ts-ignore
        toolsBlockSchema,
        // @ts-ignore
        contributorsBlockSchema,
        // @ts-ignore
        partnersBlockSchema,
        // @ts-ignore
        newsListBlockSchema,
        /* eslint-enable */
        repositoriesBlockSchema,
        contentBlockSchema,
        testimonialBlockSchema,
        tablesBlockSchema,
      ],
    },
  ],
};

export default Page;
