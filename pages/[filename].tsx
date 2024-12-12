import React, { useEffect, useState } from "react";
import { InferGetStaticPropsType } from "next";
import { Blocks } from "../components/blocks-renderer";
import { useTina } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";
import Layout from "../components/layout/layout";

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina(props);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    // const lan = navigator.language;
    // if (lan.indexOf('en') > -1) {
    //   localStorage.setItem("language", 'en');
    //   setLanguage('en');
    // } else {
    //   localStorage.setItem("language", 'zh');
    //   setLanguage('zh');
    // }

    // 20241104需求：暂时固定为英文，若后续需要恢复双语，则取消注释以上代码
    localStorage.setItem("language", 'en');
    setLanguage('en');

  }, []);

  const changeLan = (lan: string) => {
    setLanguage(lan);
    localStorage.setItem("language", lan);
  };

  return (
    <Layout data={data.global as any} language={language} changeLan={changeLan}>
      <Blocks {...data.page} language={language} />
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.contentQuery({
    relativePath: `${params.filename}.md`,
  });
  const props = {
    ...tinaProps,
    enableVisualEditing: process.env.VERCEL_ENV === "preview",
  };
  return {
    props: JSON.parse(JSON.stringify(props)) as typeof props,
  };
};

export const getStaticPaths = async () => {
  const pagesListData = await client.queries.pageConnection();
  return {
    paths: pagesListData.data.pageConnection?.edges?.map((page) => ({
      params: { filename: page?.node?._sys.filename },
    })),
    fallback: false,
  };
};
