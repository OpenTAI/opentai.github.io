import { Hero } from "../components/blocks/hero";
import Layout from "../components/layout/layout";
import { useEffect, useState } from "react";

export default function FourOhFour() {
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
      <Hero
        data={{
          headline1en: "404 – Page Not Found",
          headline2en: "Oops! It seems there's nothing here, how embarrassing.",
        }}
        language="en"
      />
    </Layout>
  );
}
