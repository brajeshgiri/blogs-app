"use client";
import { FC, useEffect, useState } from "react";
import { BlogDataType } from "./types/blogType";
import Blog from "./blog";
import { getAllBlogsData } from "@/actions";
import Pagination from "./pagination";
import Loading from "./loading";
const BlogList: FC<{}> = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [blogDataList, setBlogDataList] = useState<BlogDataType[]>([]);

  const pageSize = 3; // Number of items per page

  const [pageNumber, setPageNumber] = useState(1);
  const [currentPageData, setCurrentPageData] = useState<BlogDataType[]>([]);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setShowLoading(true);
        const postMetadata = await getAllBlogsData();
        setBlogDataList(postMetadata);
      } catch (error) {
      } finally {
        setShowLoading(false);
      }
    };
    loadBlogs();
  }, []);

  const totalPages = Math.ceil(blogDataList.length / pageSize);
  const paginate = (
    array: BlogDataType[],
    pageSize: number,
    pageNumber: number
  ) => {
    --pageNumber; // Adjust page number to zero-based index
    return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
  };

  useEffect(() => {
    const currentPage = paginate(blogDataList, pageSize, pageNumber);
    setCurrentPageData(currentPage);
  }, [pageNumber, blogDataList]);

  const onPageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  const blogList = currentPageData.map((post) => (
    <Blog key={post.slug} {...post} />
  ));

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
      {showLoading && <Loading />}
      {blogList}

      <Pagination
        pageNumber={pageNumber}
        onPageChange={onPageChange}
        totalPages={totalPages}
      />
    </div>
  );
};

export default BlogList;
