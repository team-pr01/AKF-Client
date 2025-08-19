/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import PageHeader from "../../components/Reusable/PageHeader/PageHeader";
import { SearchLucideIcon } from "../../constants";
import { useTheme } from "../../contexts/ThemeContext";
import { useGetAllCategoriesQuery } from "../../redux/Features/Categories/ReelCategory/categoriesApi";
import Experts from "../../components/Reusable/Experts/Experts";
import Loader from "../../components/Shared/Loader/Loader";
import { useGetAllConsultancyServicesQuery } from "../../redux/Features/ConsultancyService/consultancyServiceApi";

const Consultancy = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data, isFetching, isLoading } = useGetAllConsultancyServicesQuery({
    category: selectedCategory,
    keyword: searchQuery,
  });
  const { data: categoryData } = useGetAllCategoriesQuery({});

  const filteredCategory = categoryData?.data?.filter(
    (category: any) => category.areaName === "consultancyService"
  );

  const allCategories = filteredCategory?.map(
    (category: any) => category.category
  );

  return (
    <div className="min-h-screen bg-light-primary dark:bg-primary text-light-text-primary dark:text-dark-text-primary font-sans pb-20">
      <PageHeader title={"Consultancy Services"} />

      <div
        className={`p-4 space-y-4 sticky top-[60px] z-30 ${
          theme === "light"
            ? "bg-light-primary dark:bg-dark-primary"
            : "bg-primary dark:bg-black"
        }`}
      >
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <SearchLucideIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-orange" />
            <input
              type="text"
              placeholder={"Search doctors, specialties..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-brand-orange ${
                theme === "light"
                  ? "bg-light-surface text-light-text-primary placeholder-light-text-tertiary"
                  : "bg-dark-surface-alt text-dark-text-primary placeholder-dark-text-tertiary"
              }`}
            />
          </div>
        </div>

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
      </div>

      <main className="">
        {isLoading ? (
          <Loader />
        ) : (
          <Experts
            data={data?.data}
            title={"Yoga"}
            isLoading={isLoading || isFetching}
          />
        )}
      </main>

      {/* {showPaymentModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={() => {if(!isProcessing) setShowPaymentModal(false);}}>
          <div className={`rounded-xl p-5 sm:p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto ${theme === 'light' ? 'bg-light-surface text-light-text-primary' : 'bg-dark-card text-dark-text-primary'}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold text-brand-orange">{translate('confirmBookingTitle', 'Confirm Booking')}</h2>
              <button
                onClick={() => {if(!isProcessing) setShowPaymentModal(false);}}
                disabled={isProcessing}
                className={`p-1.5 rounded-full transition-colors disabled:opacity-50 ${theme === 'light' ? 'hover:bg-gray-200 text-light-text-secondary' : 'hover:bg-gray-700 text-dark-text-secondary'}`}
                aria-label={translate('closePaymentModalAria', "Close payment modal")}
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {!paymentSuccess ? (
              <>
                <div className={`mb-5 rounded-lg p-4 ${theme === 'light' ? 'bg-light-surface-alt' : 'bg-dark-surface-alt'}`}>
                  <h3 className={`font-medium mb-1.5 ${theme === 'light' ? 'text-light-text-primary' : 'text-dark-text-primary'}`}>{translate('consultationWithLabel', 'Consultation With:')}</h3>
                  <p className={`text-sm ${theme === 'light' ? 'text-light-text-secondary' : 'text-dark-text-secondary'}`}>Dr. {selectedDoctor.name} ({selectedDoctor.speciality})</p>
                  <p className={`text-sm ${theme === 'light' ? 'text-light-text-secondary' : 'text-dark-text-secondary'}`}>{translate('timeLabel', 'Time')}: {selectedDoctor.nextAvailable}</p>
                  <p className="text-md font-semibold text-brand-orange mt-2">{translate('totalAmountLabel', 'Total Amount')}: ৳{selectedDoctor.price}</p>
                </div>

                <div className="space-y-3">
                  <h3 className={`font-medium mb-1 ${theme === 'light' ? 'text-light-text-primary' : 'text-dark-text-primary'}`}>{translate('selectPaymentMethodLabel', 'Select Payment Method:')}</h3>
                  
                  {(['card', 'bkash', 'nagad'] as const).map((method) => (
                    <button
                      key={method}
                      onClick={() => setSelectedPaymentMethod(method)}
                      disabled={isProcessing}
                      className={`w-full p-3.5 rounded-lg flex items-center gap-3 transition-all duration-200 ease-in-out border-2
                        ${ selectedPaymentMethod === method
                            ? 'bg-brand-orange/20 border-brand-orange text-brand-orange font-medium'
                            : `${theme === 'light' ? 'bg-light-surface-alt border-gray-300 hover:border-brand-orange text-light-text-secondary' : 'bg-dark-surface-alt border-gray-600 hover:border-brand-orange text-dark-text-secondary'} disabled:opacity-70`
                        }`}
                    >
                      {method === 'card' && <CreditCardIcon className="w-5 h-5" />}
                      {method === 'bkash' && <BikashIconSVG className="w-5 h-5" />}
                      {method === 'nagad' && <NagadIconSVG className="w-5 h-5" />}
                      <span className="capitalize text-sm">{method}</span>
                      {selectedPaymentMethod === method && (
                        <CheckCircleIcon className="w-5 h-5 ml-auto text-green-400" />
                      )}
                    </button>
                  ))}
                </div>

                {paymentError && (
                  <div className={`mt-4 rounded-lg p-3 text-sm flex items-center gap-2 ${theme === 'light' ? 'bg-red-100 border border-red-300 text-red-700' : 'bg-red-900/30 border border-red-700 text-red-300'}`}>
                    <AlertTriangleIcon className="w-5 h-5 flex-shrink-0" />
                    <span>{paymentError}</span>
                  </div>
                )}

                <button
                  onClick={handlePayment}
                  disabled={!selectedPaymentMethod || isProcessing}
                  className="w-full mt-6 bg-brand-orange hover:bg-opacity-90 transition-colors rounded-lg py-3 flex items-center justify-center gap-2 font-medium text-white disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <LoaderIcon className="w-5 h-5 animate-spin" />
                      <span>{translate('processingPayment', 'Processing Payment...')}</span>
                    </>
                  ) : (
                    <>
                      <CreditCardIcon className="w-5 h-5" />
                      <span>{translate('payAmountButton', `Pay ৳${selectedDoctor.price}`, { amount: selectedDoctor.price })}</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <CheckCircleIcon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-green-400 mb-2">{translate('paymentSuccessfulTitle', 'Payment Successful!')}</h3>
                <p className={`mb-6 text-sm ${theme === 'light' ? 'text-light-text-secondary' : 'text-dark-text-secondary'}`}>
                  {translate('bookingConfirmationMessage', `Your consultation with Dr. ${selectedDoctor.name} has been booked. You will receive a confirmation shortly.`, { name: selectedDoctor.name })}
                </p>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="bg-brand-orange hover:bg-opacity-90 transition-colors rounded-lg px-6 py-2.5 text-white font-medium"
                >
                  {translate('doneButton', 'Done')}
                </button>
              </div>
            )}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Consultancy;
