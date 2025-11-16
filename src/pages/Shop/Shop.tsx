/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import PageHeader from "../../components/Reusable/PageHeader/PageHeader";
import { SearchLucideIcon } from "../../constants";
import { useGetAllCategoriesQuery } from "../../redux/Features/Categories/ReelCategory/categoriesApi";
import { useGetAllProductsQuery } from "../../redux/Features/Product/productApi";
import Loader from "../../components/Shared/Loader/Loader";
import ProductCard from "../../components/ShopPage/ProductCard/ProductCard";
import ProductDetailsModal from "../../components/ShopPage/ProductDetailsModal/ProductDetailsModal";
import { useGetAllProductBannersQuery } from "../../redux/Features/ProductBanner/productBannerApi";
import ProductBanner from "./ProductBanner ";

const Shop = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Get all products with pagination
  const { data, isLoading, isFetching } = useGetAllProductsQuery({
    keyword: searchQuery,
    category: selectedCategory,
    page: currentPage,
    limit: 10
  });


  // Get all product banner
  const {data:productBanners} = useGetAllProductBannersQuery({});
  console.log(productBanners);

  const { data: categoryData } = useGetAllCategoriesQuery({});
  const filteredCategory = categoryData?.data?.filter(
    (category: any) => category.areaName === "product"
  );

  const allCategories = filteredCategory?.map(
    (category: any) => category.category
  );

  // Handle product card click
  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Handle continue to product link
  const handleContinue = (productLink: string) => {
    // Ensure the link has http:// or https://
    const formattedLink = productLink.startsWith('http') 
      ? productLink 
      : `https://${productLink}`;
    
    window.open(formattedLink, '_blank', 'noopener,noreferrer');
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to page 1 when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const products = data?.data?.products || [];
  const pagination = data?.data?.pagination || {};

  return (
    <div
      className={`min-h-screen font-sans ${
        theme === "light"
          ? "bg-light-primary text-light-text-primary"
          : "bg-primary text-dark-text-primary"
      }`}
    >
      <PageHeader title={"Spritual Shop"} />

      <ProductBanner/>

      <div className="px-4 pb-[90px] flex flex-col gap-5">
        {/* Search Bar */}
        <div
          className={`p-4 flex flex-col sm:flex-row gap-2 sticky top-[60px] z-30 ${
            theme === "light"
              ? "bg-light-primary dark:bg-dark-primary shadow-sm"
              : "bg-primary dark:bg-black shadow-md"
          }`}
        >
          <div className="flex-1 relative">
            <SearchLucideIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-orange" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-12 py-3 rounded-lg outline-none focus:ring-2 focus:ring-brand-orange transition-shadow focus:shadow-lg ${
                theme === "light"
                  ? "bg-light-surface text-light-text-primary placeholder-light-text-tertiary"
                  : "bg-dark-surface-alt text-dark-text-primary placeholder-dark-text-tertiary"
              }`}
              aria-label="Search products"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full whitespace-nowrap text-xs sm:text-sm transition-all duration-200 ease-in-out shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-opacity-50 ${
              selectedCategory === ""
                ? "bg-brand-orange text-white font-semibold"
                : `${
                    theme === "light"
                      ? "bg-light-surface-alt text-light-text-secondary hover:bg-gray-200"
                      : "bg-dark-surface-alt text-dark-text-secondary hover:bg-gray-700 hover:text-dark-text-primary"
                  }`
            }`}
          >
            All
          </button>
          {allCategories?.map((category: any) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full whitespace-nowrap text-xs sm:text-sm transition-all duration-200 ease-in-out shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-opacity-50 ${
                selectedCategory === category
                  ? "bg-brand-orange text-white font-semibold"
                  : `${
                      theme === "light"
                        ? "bg-light-surface-alt text-light-text-secondary hover:bg-gray-200"
                        : "bg-dark-surface-alt text-dark-text-secondary hover:bg-gray-700 hover:text-dark-text-primary"
                    }`
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p
                className={`text-lg ${
                  theme === "light"
                    ? "text-light-text-tertiary"
                    : "text-dark-text-tertiary"
                }`}
              >
                No products found
              </p>
            </div>
          ) : isLoading || isFetching ? (
            <div className="col-span-full">
              <Loader />
            </div>
          ) : (
            products.map((product: any) => (
              <ProductCard
                key={product._id}
                product={product}
                onCardClick={handleProductClick}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                currentPage === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-opacity-80'
              } ${
                theme === "light"
                  ? "bg-brand-orange text-white"
                  : "bg-brand-yellow text-gray-900"
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === page
                    ? theme === "light"
                      ? "bg-brand-orange text-white"
                      : "bg-brand-yellow text-gray-900"
                    : theme === "light"
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pagination.totalPages}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                currentPage === pagination.totalPages
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-opacity-80'
              } ${
                theme === "light"
                  ? "bg-brand-orange text-white"
                  : "bg-brand-yellow text-gray-900"
              }`}
            >
              Next
            </button>
          </div>
        )}

        {/* Product Details Modal */}
        <ProductDetailsModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onContinue={handleContinue}
        />
      </div>
    </div>
  );
};

export default Shop;