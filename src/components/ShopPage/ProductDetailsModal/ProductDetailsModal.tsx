/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

interface ProductDetailsModalProps {
  product: any | null;
  isOpen: boolean;
  onClose: () => void;
  onContinue: (productLink: string) => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  isOpen,
  onClose,
  onContinue
}) => {
  const { theme } = useTheme();

  if (!isOpen || !product) return null;

  const handleContinue = () => {
    onContinue(product.productLink);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleOverlayClick}
    >
      <div className={`
        rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto
        ${theme === 'light' 
          ? 'bg-white text-gray-800' 
          : 'bg-gray-800 text-white'
        }
      `}>
        {/* Product Image */}
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
        </div>

        {/* Product Details */}
        <div className="p-6">
          <h2 className={`
            text-xl font-bold mb-2
            ${theme === 'light' ? 'text-gray-800' : 'text-white'}
          `}>
            {product.name}
          </h2>
          
          <div className={`
            inline-block px-3 py-1 rounded-full text-sm font-medium mb-4
            ${theme === 'light' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-blue-900/30 text-blue-300'
            }
          `}>
            {product.category}
          </div>

          {/* Confirmation Message */}
          <div className={`
            p-4 rounded-lg mb-6
            ${theme === 'light' 
              ? 'bg-orange-50 text-orange-800 border border-orange-200' 
              : 'bg-yellow-900/20 text-yellow-300 border border-yellow-800'
            }
          `}>
            <p className="text-center font-medium text-sm">
              You will be redirected to the main website to purchase this product.
              Are you sure you want to continue?
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className={`
                flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200
                ${theme === 'light'
                  ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
                }
              `}
            >
              Cancel
            </button>
            <button
              onClick={handleContinue}
              className={`
                flex-1 py-3 px-4 rounded-lg font-medium text-white transition-all duration-200
                bg-green-600 hover:bg-green-700
              `}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;