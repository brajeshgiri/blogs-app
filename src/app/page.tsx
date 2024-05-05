import { Suspense } from "react";
import BlogList from "@/components/blogList";
import Loading from "@/components/loading";

const HomePage = async () => {
  return (
    <Suspense fallback={<Loading />}>
      <BlogList />
    </Suspense>
  );
};

export default HomePage;
