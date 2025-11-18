import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useGetAllProductBannersQuery } from "../../redux/Features/ProductBanner/productBannerApi";

// Define the type for product banner
interface ProductBanner {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Gradient color options using your brand colors
const gradientOptions = [
  "bg-gradient-to-r from-[#ff6f00] to-[#ffc107]", // Orange to Yellow
  "bg-gradient-to-r from-[#ffc107] to-[#00c4cc]", // Yellow to Blue
  "bg-gradient-to-r from-[#00c4cc] to-[#ff6f00]", // Blue to Orange
  "bg-gradient-to-r from-[#ff6f00] to-[#00c4cc]", // Orange to Blue
];

const ProductBanner = () => {
  const {
    data: productBanners,
    isLoading,
    error,
  } = useGetAllProductBannersQuery({});

  if (isLoading) {
    return (
      <div className="lg:hidden bg-gray-100 py-4 px-4 animate-pulse">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-full mb-3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    );
  }

  if (error || !productBanners?.data || productBanners.data.length === 0) {
    return null;
  }

  const banners: ProductBanner[] = productBanners.data;

  return (
    <div className="pt-4 px-4">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-gray-300 !opacity-100",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-[#ff6f00]",
        }}
        loop={banners.length > 1}
        className="!pb-8"
      >
        {banners.map((banner, index) => {
          const gradientIndex = index % gradientOptions.length;
          const gradient = gradientOptions[gradientIndex];

          return (
            <SwiperSlide key={banner._id}>
              <div
                className={`max-w-md mx-auto rounded-2xl overflow-hidden ${gradient} p-0.5 shadow-lg`}
              >
                <div className="rounded-2xl p-5">
                  <div className="flex items-start space-x-4">
                    {/* Text Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white mb-2">
                        {banner.title}
                      </h3>
                      <p className="text-sm text-white mb-4 leading-relaxed">
                        {banner.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white text-gray-800 shadow-sm">
                            20% OFF
                          </span>
                          <a
                            href={banner.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 rounded-lg bg-white text-gray-800 text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                          >
                            Shop Now
                          </a>
                        </div>

                        {/* Image on mobile */}
                        {banner.imageUrl && (
                          <div className="flex-shrink-0 md:hidden">
                            <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-lg">
                              <img
                                src={banner.imageUrl}
                                alt={banner.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = "none";
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Image - Hidden on mobile, shown on tablet+ */}
                    {banner.imageUrl && (
                      <div className="flex-shrink-0 hidden md:block">
                        <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-white shadow-lg">
                          <img
                            src={banner.imageUrl}
                            alt={banner.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom styles for Swiper pagination */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .swiper-pagination {
          position: relative !important;
          bottom: 0 !important;
          margin-top: 1rem;
        }
        .swiper-pagination-bullet {
          width: 8px !important;
          height: 8px !important;
          margin: 0 4px !important;
        }
        .swiper-pagination-bullet-active {
          background-color: #ff6f00 !important;
        }
      `,
        }}
      />
    </div>
  );
};

export default ProductBanner;
