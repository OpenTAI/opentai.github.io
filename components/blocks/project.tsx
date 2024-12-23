// import { iconSchema } from "../util/icon";
import {
  PageBlocksProject,
  PageBlocksProjectItems,
} from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import { basePath } from "../util/url-helper";
import { Carousel } from "antd";
import { useRef } from "react";
import { useRouter } from "next/router";

export const ProjectItem = ({
  data,
  index,
}: // language,
{
  data: PageBlocksProjectItems;
  index: number;
  language: string;
}) => {
  const router = useRouter();

  return (
    <>
      <div
        className="bg-white hover:bg-deep-sky hover:cursor-pointer h-72 break-inside-avoid-column grow-[3]"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay={index * 100}
        key={index}
        onClick={() => (data.link ? router.push(data.link) : null)}
      >
        <div className="hover:invert px-12 pt-8 pb-12">
          {/* <img
                    className="w-12"
                    src={require(`@/assets/img/project/${data.projectIcon}`)}
                  /> */}
          <Image
            className="w-12"
            // src={require(`/assets/img/project/${data.projectIcon}`)}
            src={data.projectIcon}
            width={96}
            height={93}
            alt=""
            data-tina-field={tinaField(data, "projectIcon")}
          />
          <div
            className="mt-6 text-deep-black text-lg font-semibold"
            data-tina-field={tinaField(data, "projectName")}
          >
            {data.projectName}
          </div>
          <div
            className="h-19 text-deep-black text-base line-clamp-3"
            data-tina-field={tinaField(data, "projectDescription")}
          >
            {data.projectDescription}
          </div>
          <div
            className="mt-1 text-deep-black font-semibold text-base"
            data-tina-field={tinaField(data, "projectReadMore")}
          >
            <div onClick={() => null}>{data.projectReadMore}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Project = ({
  data,
  language,
}: {
  data: PageBlocksProject;
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
  for (let i = 0; i < data.items.length; i += 6) {
    itemsCardArr.push(data.items.slice(i, i + 6));
  }

  return (
    <div className="bg-light-grey w-full">
      <div className="py-16 px-6 xl:max-w-360 mx-auto" id="researches">
        <div
          className="text-3xl font-bold text-center mb-8"
          data-tina-field={tinaField(data, "titleen")}
        >
          {data[`title${language}`]}
        </div>
        <div>
          <Carousel dots={false} ref={carouselRef}>
            {itemsCardArr.map((cardArr, index) => {
              return (
                <div
                  className="!grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  key={index}
                >
                  {cardArr?.length &&
                    cardArr.map((item, index) => {
                      return (
                        <ProjectItem
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
    </div>
  );
};

const defaultProject = {
  projectName: "系外行星检测",
  projectDescription:
    "Adversarial attacks and defenses.Adversarial attacks and defenses.Adversarial attacks and defenses.Adversarial attacks and defenses.",
  projectReadMore: "Learn More >",
  projectLeaderBoard: "Leader Board",
  projectIcon: "/projectIcon1.png",
  projectBackground: "/projectBackground.png",
  markdown: "projects/projectDetail1.md",
  link: "",
};

export const projectBlockSchema = {
  name: "project",
  label: "Project",
  ui: {
    previewSrc: `${basePath}/blocks/updates.png`,
    defaultItem: {
      projects: [defaultProject],
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
      label: "Project Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.projectName,
          };
        },
        defaultItem: {
          ...defaultProject,
        },
      },
      fields: [
        {
          type: "string",
          label: "Project Name",
          name: "projectName",
        },
        {
          type: "string",
          label: "Project Description",
          name: "projectDescription",
        },
        {
          type: "string",
          label: "Project ReadMore",
          name: "projectReadMore",
        },
        {
          type: "string",
          label: "Link",
          name: "link",
        },
        {
          type: "image",
          label: "Project Icon",
          name: "projectIcon",
          ui: {
            component: "image",
          },
        },
      ],
    },
  ],
};
