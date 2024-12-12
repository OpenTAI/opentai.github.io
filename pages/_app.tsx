import "../styles.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return <Component {...pageProps} />;
};

export default App;
