/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    category: string;
    description: string;
    basePrice: string;
    discountedPrice: string;
    currency: string;
    imageUrl: string;
    videoUrl: string;
    productLink: string;
    label?: string;
    tags: string;
    clicks: number;
    createdAt: string;
    updatedAt: string;
  };
  onCardClick: (product: any) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onCardClick }) => {
  const { theme } = useTheme();

  const handleClick = () => {
    onCardClick(product);
  };

  const hasDiscount = product.discountedPrice && product.discountedPrice !== product.basePrice;
  const discountPercentage = hasDiscount 
    ? Math.round(((parseFloat(product.basePrice) - parseFloat(product.discountedPrice)) / parseFloat(product.basePrice)) * 100)
    : 0;

  return (
    <div
      onClick={handleClick}
      className={`
        rounded-xl overflow-hidden shadow-lg transition-all duration-300 
        hover:shadow-xl hover:transform hover:-translate-y-1.5 cursor-pointer
        ${theme === 'light'
          ? 'bg-white hover:shadow-orange-200'
          : 'bg-gray-800 hover:shadow-yellow-800/30'
        }
      `}
    >
      {/* Image Section */}
      <div className="relative w-full h-72 bg-white dark:bg-gray-700">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-auto mx-auto h-full"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${
            theme === 'light' ? 'bg-gray-100' : 'bg-gray-600'
          }`}>
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        
        {/* Label Badge */}
        {product.label && (
          <div className={`
            absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium
            ${theme === 'light' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-green-900/30 text-green-300'
            }
          `}>
            {product.label}
          </div>
        )}
        
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
            {discountPercentage}% OFF
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Category */}
        <div className={`
          inline-block px-2 py-1 rounded-full text-xs font-medium mb-2
          ${theme === 'light' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-blue-900/30 text-blue-300'
          }
        `}>
          {product.category}
        </div>

        {/* Product Name */}
        <h3 className={`
          font-semibold text-lg mb-2 line-clamp-1
          ${theme === 'light' ? 'text-gray-800' : 'text-white'}
        `}>
          {product.name}
        </h3>

        {/* Description */}
        <p className={`
          text-sm mb-3 line-clamp-2
          ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}
        `}>
          {product.description}
        </p>

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-3">
          {hasDiscount ? (
            <>
              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                {product.currency} {product.discountedPrice}
              </span>
              <span className={`
                text-sm line-through
                ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}
              `}>
                {product.currency} {product.basePrice}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-green-600 dark:text-green-400">
              {product.currency} {product.basePrice}
            </span>
          )}
        </div>

        {/* Tags */}
        {product.tags && (
          <div className="flex flex-wrap gap-1">
            {product.tags.split(' ').slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className={`
                  px-2 py-1 rounded text-xs
                  ${theme === 'light' 
                    ? 'bg-gray-100 text-gray-600' 
                    : 'bg-gray-700 text-gray-300'
                  }
                `}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;