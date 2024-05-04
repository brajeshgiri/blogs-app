import { getBlogsData } from "./actions";
import BlogList from "./components/blogList";

const HomePage = async () => {
  const postMetadata = await getBlogsData();
  return <BlogList blogDataList={postMetadata} />;
};

export default HomePage;
