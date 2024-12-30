import { Content } from "./blocks/content";
import { Features } from "./blocks/features";
import { Hero } from "./blocks/hero";
import { Testimonial } from "./blocks/testimonial";
import { Repositories } from "./blocks/repositories";
import { Tables } from "./blocks/tables";
import { tinaField } from "tinacms/dist/react";
import { Updates } from "./blocks/updates";
import { Project } from "./blocks/project";
import { Datasets } from "./blocks/datasets";
import { BenchMarks } from "./blocks/benchmarks";
import { Tools } from "./blocks/tools";
import { Contributors } from "./blocks/contributors";
import { Partners } from "./blocks/partners";
import { NewsList } from "./blocks/newsList";
import { Carousel } from "./blocks/carousel";

export const Blocks = (props) => {
  return (
    <>
      {props.blocks
        ? props.blocks.map(function (block, i) {
            return (
              <div key={i} data-tina-field={tinaField(block)}>
                <Block {...block} language={props.language} />
              </div>
            );
          })
        : null}
    </>
  );
};

const Block = (block) => {
  switch (block.__typename) {
    case "PageBlocksContent":
      return <Content data={block} />;
    case "PageBlocksHero":
      return <Hero data={block} language={block.language} />;
    case "PageBlocksFeatures":
      return <Features data={block} language={block.language} />;
    case "PageBlocksTestimonial":
      return <Testimonial data={block} language={block.language} />;
    case "PageBlocksRepositories":
      return <Repositories data={block} language={block.language} />;
    case "PageBlocksTable":
      return <Tables data={block} language={block.language} />;
    case "PageBlocksUpdates":
      return <Updates data={block} language={block.language} />;
    case "PageBlocksProject":
      return <Project data={block} language={block.language} />;
    case "PageBlocksDatasets":
      return <Datasets data={block} language={block.language} />;
    case "PageBlocksBenchMarks":
      return <BenchMarks data={block} language={block.language} />;
    case "PageBlocksTools":
      return <Tools data={block} language={block.language} />;
    case "PageBlocksContributors":
      return <Contributors data={block} language={block.language} />;
    case "PageBlocksPartners":
      return <Partners data={block} language={block.language} />;
    case "PageBlocksNewsList":
      return <NewsList data={block} language={block.language} />;
    case "PageBlocksCarousel":
      return <Carousel data={block} language={block.language} />;
    default:
      return null;
  }
};
