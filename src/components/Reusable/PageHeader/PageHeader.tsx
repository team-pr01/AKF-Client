import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "../../../constants";

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <header className="bg-light-surface dark:bg-primary text-light-text-primary dark:text-dark-text-primary px-4 py-3 sticky top-0 z-40 flex items-center border-b border-gray-200 dark:border-gray-700/30 shadow-md">
      <Link
        to={"/"}
        className="p-2 mr-2 -ml-2 text-gray-600 dark:text-gray-300 hover:text-brand-orange dark:hover:text-brand-yellow transition-colors"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </Link>
      <h1 className="text-xl font-semibold truncate" title={title}>
        {title}
      </h1>
    </header>
  );
};

export default PageHeader;
