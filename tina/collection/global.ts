import type { Collection } from "tinacms";

const Global: Collection = {
  label: "Global",
  name: "global",
  path: "content/global",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "object",
      label: "Header",
      name: "header",
      fields: [
        {
          type: "string",
          label: "Name-En",
          name: "nameen",
        },
        {
          type: "string",
          label: "Name-Zh",
          name: "namezh",
        },
        {
          type: "string",
          label: "Home URL",
          name: "homeurl",
        },
        {
          type: "string",
          label: "DetailTitle-En",
          name: "detailTitleen",
        },
        {
          type: "string",
          label: "DetailTitle-Zh",
          name: "detailTitlezh",
        },
        {
          type: "string",
          label: "DetailContent-En",
          name: "detailContenten",
        },
        {
          type: "string",
          label: "DetailContent-Zh",
          name: "detailContentzh",
        },
        {
          type: "string",
          label: "ViewMore-En",
          name: "viewMoreen",
        },
        {
          type: "string",
          label: "ViewMore-zh",
          name: "viewMorezh",
        },
        // {
        //   type: "object",
        //   label: "Display Data",
        //   name: "displayData",
        //   list: true,
        //   ui: {
        //     itemProps: (item) => {
        //       return { label: item?.labelen };
        //     },
        //     defaultItem: {
        //       label: "Projects",
        //     },
        //   },
        //   fields: [
        //     {
        //       type: "string",
        //       label: "Label-En",
        //       name: "labelen" ,
        //     },
        //     {
        //       type: "string",
        //       label: "Label-Zh",
        //       name: "labelzh",
        //     },
        //     {
        //       type: "string",
        //       label: "Value",
        //       name: "value",
        //     }
        //   ],
        // },
        {
          type: "object",
          label: "Nav Links",
          name: "nav",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.labelen };
            },
            defaultItem: {
              href: "home",
              label: "Home",
            },
          },
          fields: [
            {
              type: "string",
              label: "Link",
              name: "href",
            },
            {
              type: "string",
              label: "Label-En",
              name: "labelen" ,
            },
            {
              type: "string",
              label: "Label-Zh",
              name: "labelzh",
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Footer",
      name: "footer",
      fields: [
        {
          type: "string",
          label: "Home Url",
          name: "homeurl",
        },
        {
          type: "object",
          label: "Nav Links",
          name: "nav",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            },
            defaultItem: {
              href: "home",
              label: "Home",
            },
          },
          fields: [
            {
              type: "string",
              label: "Link",
              name: "href",
            },
            {
              type: "string",
              label: "Label",
              name: "label",
            },
          ],
        },
        {
          type: "object",
          label: "Social Links",
          name: "social",
          fields: [
            {
              type: "string",
              label: "Facebook",
              name: "facebook",
            },
            {
              type: "string",
              label: "Twitter",
              name: "twitter",
            },
            {
              type: "string",
              label: "LinkedIn",
              name: "linkedin",
            },
          ],
        },
        {
          type: "string",
          label: "Copyright",
          name: "copyright",
        },
        {
          type: "string",
          label: "Terms",
          name: "terms",
        },
      ],
    },
    {
      type: "object",
      label: "Theme",
      name: "theme",
      // eslint-disable-next-line
      // @ts-ignore
      fields: [
        {
          type: "string",
          name: "font",
          label: "Font Family",
          options: [
            {
              label: "System Sans",
              value: "sans",
            },
            {
              label: "Nunito",
              value: "nunito",
            },
            {
              label: "Lato",
              value: "lato",
            },
          ],
        },
        {
          type: "string",
          name: "darkMode",
          label: "Dark Mode",
          options: [
            {
              label: "System",
              value: "system",
            },
            {
              label: "Light",
              value: "light",
            },
            {
              label: "Dark",
              value: "dark",
            },
          ],
        },
      ],
    },
  ],
};

export default Global;
