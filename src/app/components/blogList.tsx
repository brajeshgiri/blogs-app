"use client";
import { FC, useEffect, useState } from "react";
import { BlogDataType } from "./types/blogType";
import Blog from "./blog";
type BlogListPropType = {
  blogDataList: BlogDataType[];
};
const BlogList: FC<BlogListPropType> = ({ blogDataList }) => {
  const pageSize = 3; // Number of items per page

  const [pageNumber, setPageNumber] = useState(1);
  const [currentPageData, setCurrentPageData] = useState<BlogDataType[]>([]);
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
  }, [pageNumber]);

  const onPageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };
  const blogList = currentPageData.map((post) => (
    <Blog key={post.slug} {...post} />
  ));

  const renderPagination = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return pages.map((value, index) => (
      <li key={value}>
        <a
          aria-current="page"
          onClick={() => onPageChange(value)}
          className={
            value !== pageNumber
              ? "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              : "flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          }
        >
          {value}
        </a>
      </li>
    ));
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
      {blogList}

      <nav aria-label="Page navigation">
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <a
              onClick={() => onPageChange(pageNumber > 1 ? pageNumber - 1 : 1)}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </a>
          </li>
          {renderPagination()}
          <li>
            <a
              onClick={() =>
                onPageChange(
                  totalPages > pageNumber ? pageNumber + 1 : totalPages
                )
              }
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BlogList;
