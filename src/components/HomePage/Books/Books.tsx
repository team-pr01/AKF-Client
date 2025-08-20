/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from "../../../contexts/ThemeContext";
import { useGetAllBooksQuery } from "../../../redux/Features/Book/bookApi";
import Loader from "../../Shared/Loader/Loader";

const Books = () => {
  const { theme } = useTheme();
  const { data: bookData, isLoading: isBooksLoading } = useGetAllBooksQuery({});

  return (
    <section className="px-4 py-2 bg-light-primary dark:bg-primary">
      <h2 className="text-xl font-semibold dark:text-dark-text-primary mb-3 text-gradient bg-gradient-to-r from-brand-orange to-brand-yellow bg-clip-text text-transparent">
        Sacred Texts
      </h2>
      <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-3">
        {bookData?.data?.length < 1 ? (
          <p
            className={`text-center py-6 text-sm ${
              theme === "light"
                ? "text-light-text-tertiary"
                : "text-dark-text-tertiary"
            }`}
          >
            No books found
          </p>
        ) : isBooksLoading ? (
          <Loader />
        ) : (
          bookData?.data?.map((book: any, index: number) => (
            <div
              key={book._id}
              className="flex-shrink-0 w-32 sm:w-36 group cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out"
              role="button"
              tabIndex={0}
              aria-label={book.title}
            >
              <div
                className="relative h-44 sm:h-48 rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl group-hover:shadow-brand-orange/40 dark:group-hover:shadow-brand-yellow/40 animate-soft-breathing-shadow border-2 border-transparent group-hover:border-brand-orange/50 transition-all duration-300"
                style={
                  {
                    animationDelay: `${index * 0.15}s`,
                    "--tw-shadow-color": "rgba(255,111,0,0.15)",
                  } as React.CSSProperties
                }
              >
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5">
                  <h3 className="text-sm font-medium text-white group-hover:text-brand-yellow transition-colors duration-300 truncate">
                    {book.title}
                  </h3>
                  {book.description && (
                    <p className="text-xs text-gray-300 group-hover:text-gray-100 transition-colors duration-300 truncate">
                      {book.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Books;
