import React, {
  ComponentPropsWithRef,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
// import { Container } from "../util/container";
// import { Section } from "../util/section";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaTemplate } from "tinacms";
import {
  PageBlocksCarousel,
  PageBlocksCarouselItems,
} from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { basePath } from "../util/url-helper";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./carousel.module.css";
import Link from "next/link";
import Image from "next/image";
import Autoplay from 'embla-carousel-autoplay'

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

const useDotButton = (
  emblaApi: EmblaCarouselType | undefined
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

type PropType = ComponentPropsWithRef<"button">;

export const DotButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};

const CarouselItems = ({ data }: { data: PageBlocksCarouselItems }) => {
  return (
    <div className={styles.embla__slide}>
      <div className="relative w-full snap-center">
        {/* <div className="aspect-3/4 m:aspect-16/9 l:aspect-2/1 m:min-h-[600px] duration-250 relative max-h-[75vh] w-full transform-gpu snap-center overflow-hidden rounded-s transition-transform hover:scale-[1.005] bg-surface-primary"> */}
        <div className="aspect-3/4 sm:aspect-16/9 sm:min-h-[600px] duration-250 relative max-h-[90vh] w-full transform-gpu snap-center overflow-hidden rounded-s transition-transform hover:scale-[1.005] bg-surface-primary">
          <div className="absolute left-0 top-0 h-full w-full transform-gpu will-change-transform">
            {
              data.bgImg ?
                <Image
                  className="absolute left-0 top-0 h-full w-full object-cover"
                  src={data.bgImg}
                  alt=""
                  // layout="fill"
                  width={1920}
                  height={1080}
                  objectFit="cover"
                  objectPosition="center"
                  data-tina-field={tinaField(data, "bgImg")}
                />
                : null
            }
          </div>
          <div className="absolute left-0 top-0 flex h-full w-full transform-gpu flex-col items-center justify-center will-change-transform text-gray-0">
            <div className="relative w-[min(calc(100%-40px),1000px)]">
              <h2 className="text-4xl sm:text-6xl text-white text-balance text-center">
                {data.title}
              </h2>
            </div>
            <div className="relative mt-4 w-[min(calc(100%-40px),1000px)]">
              <p className="max-m:text-balance text-subhead mx-auto max-w-[620px] text-balance text-center text-m sm:text-xl text-white font-light">
                {data.subtitle}
              </p>
            </div>
            <div className="mt-xs relative flex gap-4">
              <Link
                className="transition duration-200 ease-curve-a rounded-full px-6 text-nowrap flex items-center justify-center gap-[0.3em] text-cta hover:bg-gray-100 bg-white min-h-10 mt-8"
                href={data.link}
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Carousel = ({
  data,
  language,
}: {
  data: PageBlocksCarousel;
  language: string;
}) => {
  const options: EmblaOptionsType = { loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3000 })
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  // const {
  //   prevBtnDisabled,
  //   nextBtnDisabled,
  //   onPrevButtonClick,
  //   onNextButtonClick
  // } = usePrevNextButtons(emblaApi)

  return (
    <section className={`mt-28 w-full ${styles.embla}`}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={`${styles.embla__container}`}>
          {data.items?.length
            ? data.items.map((item, index) => (
                <CarouselItems key={index} data={item} />
              ))
            : null}
        </div>
      </div>

      <div className={styles.embla__controls}>
        <div className={styles.embla__dots}>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`${styles.embla__dot} ${
                index === selectedIndex ? styles["embla__dot--selected"] : ""
              }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const defaultCarousel = {
  type: "dark",
  title: "Open Trustworthy AI :",
  subtitle: "Trust is the ultimate form of intelligence.",
  link: "",
  img: "/uploads/bg1.png",
};

export const carouselBlockSchema = {
  name: "carousel",
  label: "Carousel",
  ui: {
    previewSrc: `${basePath}/blocks/content.png`,
    defaultItem: {},
  },
  fields: [
    {
      type: "object",
      label: "Carousel Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title,
          };
        },
        defaultItem: {
          ...defaultCarousel,
        },
      },
      fields: [
        {
          type: "string",
          label: "Type",
          name: "type",
          list: true,
          options: [
            {
              value: "dark",
              label: "Dark",
            },
            {
              value: "light",
              label: "Light",
            },
          ],
        },
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "SubTitle",
          name: "subtitle",
        },
        {
          type: "string",
          label: "Link",
          name: "link",
        },
        {
          type: "image",
          label: "Background Image",
          name: "bgImg",
          ui: {
            component: "image",
          },
        },
      ],
    },
  ],
};
