import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "../../../constants";
import { useTheme } from "../../../contexts/ThemeContext";

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  const { theme } = useTheme();
  return (
    <header
      className={`px-4 py-2 sticky top-0 z-40 flex items-center gap-2 border-b ${
        theme === "light"
          ? "bg-white border-gray-200 text-primary"
          : "bg-gray-800 text-dark-text-primary animate-soft-breathing-shadow border-gray-700/30 "
      }`}
    >
      <Link
        to={"/"}
        className={`hover:text-brand-orange dark:hover:text-brand-yellow transition-colors`}
      >
        <ChevronLeftIcon className="size-4" />
      </Link>
      <h1 className="font-semibold truncate" title={title}>
        {title}
      </h1>
    </header>
  );
};

export default PageHeader;
