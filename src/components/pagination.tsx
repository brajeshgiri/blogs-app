import { FC } from "react";

type PaginationPropsType = {
  pageNumber: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
const Pagination: FC<PaginationPropsType> = ({
  pageNumber,
  onPageChange,
  totalPages,
}) => {
  if (totalPages === 1) {
    // If there is only 1 page than don't show pagination
    return;
  }
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
  );
};

export default Pagination;
