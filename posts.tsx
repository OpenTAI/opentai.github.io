import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import { Posts } from "../components/posts";
import { client } from "../tina/__generated__/client";
import { InferGetStaticPropsType } from "next";
import Layout from "../components/layout/layout";
import { useEffect, useState } from "react";

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const posts = props.data.postConnection.edges;

  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const lan = navigator.language;
    localStorage.setItem("language", lan);
    setLanguage(lan);
  }, []);

  const changeLan = (lan: string) => {
    setLanguage(lan);
    localStorage.setItem("language", lan);
  };

  return (
    <Layout language={language} changeLan={changeLan}>
      <Section className="flex-1">
        <Container size="large" width="small">
          <Posts data={posts} />
        </Container>
      </Section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.postConnection();
  return {
    props: {
      ...tinaProps,
    },
  };
};

export type PostsType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["postConnection"]["edges"][number];
