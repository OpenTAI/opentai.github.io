import Filename, { getStaticProps as FilenameStaticProps } from "./[filename]";

const Index = Filename;

export const getStaticProps = async () => {
    return FilenameStaticProps({ params: { filename: "home" } });
};

export default Index;