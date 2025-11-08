/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowRightIcon, XIcon, QrCodeIcon} from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../Reusable/TextInput/TextInput";
import { FaPaypal } from "react-icons/fa";
import { SiStripe } from "react-icons/si";
import { ICONS } from "../../../assets";
import { useDonateMutation } from "../../../redux/Features/DonationPrograms/donationProgramApi";
import { toast } from "sonner";
import { useSubscribeMutation } from "../../../redux/Features/Subscription/subscriptionApi";
import { useNavigate } from "react-router-dom";

interface PaymentFormData {
  amount?: string;
  accountNumber?: string;
}

const MakePaymentModal = ({
  isInputFieldDisable,
  setIsModalOpen,
  programData,
  paymentReason,
}: {
  amount?: number | string;
  isInputFieldDisable: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  programData?: any;
  paymentReason: string;
}) => {
  const { theme } = useTheme();
  const [selectedMethod, setSelectedMethod] = useState<
    "paypal" | "stripe" | "bkash" | "nagad" | "bank" | null
  >(null);
  const [showQR, setShowQR] = useState<boolean>(false);
  const [donate, { isLoading }] = useDonateMutation();
  const [Subscribe, { isLoading:isSubscribing }] = useSubscribeMutation();
  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PaymentFormData>();

  const onSubmit = async (data: PaymentFormData) => {
    try {
      
      if (paymentReason === "donation") {
        const payload = {
        paymentMethod: selectedMethod,
        amount: data.amount,
        donationProgramId: programData?._id || null,
        donationProgramTitle: programData?.title || null,
        senderAccountNumber: data.accountNumber || null,
      };
        const res = await donate(payload).unwrap();
        if (res.success) {
          toast.success("Donated successfully! Thank you for your donation.");
        }
      }else if(paymentReason==="subscription"){
        const payload = {
        paymentMethod: selectedMethod,
        amount: data.amount,
        subscriptionPlanName: programData?.title || null,
        senderAccountNumber: data.accountNumber || null,
      };
         const res = await Subscribe(payload).unwrap();
        if (res.success) {
          toast.success("Payment successful! Welcome to our subscription plan.");
          navigate(`/`);
        }

      }
    } catch (err) {
      console.error("Payment submission error:", err);
    }
  };

  const handlePaymentMethodSelect = (
    method: "paypal" | "stripe" | "bkash" | "nagad" | "bank"
  ) => {
    setSelectedMethod(method);
    setShowQR(true);
    reset(); // Reset form when switching methods
  };

  const handleBackToMethods = () => {
    setSelectedMethod(null);
    setShowQR(false);
    reset();
  };

  const paymentMethods = [
    {
      id: "paypal" as const,
      name: "PayPal",
      foundation: "Arya Kallayn Foundation",
      accountId: "foundation@aryakallayn.org",
      icon: <FaPaypal className="text-[#00457C] w-7 h-7" />,
      description: "Pay securely with PayPal",
    },
    {
      id: "stripe" as const,
      name: "Stripe",
      foundation: "Arya Kallayn Foundation",
      accountId: "payments@aryakallayn.org",
      icon: <SiStripe className="text-[#635BFF] w-7 h-7" />,
      description: "Secure card payments via Stripe",
    },
    {
      id: "bkash" as const,
      name: "bKash",
      foundation: "Arya Kallayn Foundation",
      accountId: "017XXXXXXXX",
      icon: (
        <img src={ICONS.bKash} alt="bKash" className="w-7 h-7 object-contain" />
      ),
      description: "Fast mobile payment via bKash",
    },
    {
      id: "nagad" as const,
      name: "Nagad",
      foundation: "Arya Kallayn Foundation",
      accountId: "018XXXXXXXX",
      icon: (
        <img src={ICONS.nagad} alt="Nagad" className="w-7 h-7 object-contain" />
      ),
      description: "Send payment easily using Nagad",
    },
    {
      id: "bank" as const,
      name: "Bank Transfer",
      foundation: "Arya Kallayn Foundation",
      accountId: "HDFC Bank • 1234567890 • IFSC: HDFC000XXXX",
      icon: (
        <img src={ICONS.bank} alt="Nagad" className="w-7 h-7 object-contain" />
      ),
      description: "Direct transfer to our bank account",
    },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[200]"
      onClick={() => setIsModalOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-modal-title"
    >
      <div
        className={`rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-out scale-100 max-h-[90vh] overflow-y-auto
                  ${
                    theme === "light"
                      ? "bg-gradient-to-br from-white to-gray-100 text-gray-800"
                      : "bg-gradient-to-br from-dark-surface to-gray-800 text-white"
                  }
                `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10">
          <div
            className={`relative py-6 px-3 ${
              theme === "light"
                ? "border-b border-gray-200 bg-white/80 backdrop-blur-sm"
                : "border-b border-gray-700 bg-gray-800/80 backdrop-blur-sm"
            }`}
          >
            {selectedMethod ? (
              <div className="flex items-center justify-between">
                <button
                  onClick={handleBackToMethods}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === "light"
                      ? "hover:bg-gray-100 text-gray-600"
                      : "hover:bg-gray-700 text-gray-400"
                  }`}
                >
                  <ArrowRightIcon className="w-5 h-5 rotate-180" />
                </button>
                <h2
                  id="payment-modal-title"
                  className={`text-xl font-bold flex-1 text-center ${
                    theme === "light"
                      ? "text-brand-orange"
                      : "text-brand-yellow"
                  }`}
                >
                  Complete Payment
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === "light"
                      ? "hover:bg-gray-100 text-gray-600"
                      : "hover:bg-gray-700 text-gray-400"
                  }`}
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <h2
                  id="payment-modal-title"
                  className={`text-xl font-bold ${
                    theme === "light"
                      ? "text-brand-orange"
                      : "text-brand-yellow"
                  }`}
                >
                  Select Payment Method
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === "light"
                      ? "hover:bg-gray-100 text-gray-600"
                      : "hover:bg-gray-700 text-gray-400"
                  }`}
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          {!selectedMethod ? (
            // Payment Method Selection
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => handlePaymentMethodSelect(method.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                    theme === "light"
                      ? "border-gray-200 hover:border-brand-orange bg-white hover:shadow-lg"
                      : "border-gray-600 hover:border-brand-yellow bg-gray-800 hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{method.icon}</div>
                      <div>
                        <h3
                          className={`font-semibold ${
                            theme === "light" ? "text-gray-900" : "text-white"
                          }`}
                        >
                          {method.name}
                        </h3>
                        <p
                          className={`text-sm ${
                            theme === "light"
                              ? "text-gray-600"
                              : "text-gray-400"
                          }`}
                        >
                          {method.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRightIcon
                      className={`w-5 h-5 ${
                        theme === "light" ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                  </div>
                  <div
                    className={`mt-3 p-3 rounded-lg ${
                      theme === "light" ? "bg-gray-50" : "bg-gray-700"
                    }`}
                  >
                    <p className="text-sm font-medium">{method.foundation}</p>
                    <p
                      className={`text-xs ${
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      Account: {method.accountId}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Payment Details Form
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* QR Code Section */}
              {showQR && (
                <div className="text-center">
                  <div
                    className={`inline-flex items-center justify-center p-4 rounded-2xl mb-4 ${
                      theme === "light" ? "bg-gray-100" : "bg-gray-700"
                    }`}
                  >
                    <div className="text-center">
                      <QrCodeIcon className="w-24 h-24 mx-auto mb-2 opacity-50" />
                      <p
                        className={`text-sm ${
                          theme === "light" ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        QR Code would appear here
                      </p>
                    </div>
                  </div>
                  <div
                    className={`p-4 rounded-lg mb-6 ${
                      theme === "light" ? "bg-gray-50" : "bg-gray-700"
                    }`}
                  >
                    <p className="font-semibold text-lg">
                      {selectedMethod === "paypal"
                        ? "foundation@aryakallayn.org"
                        : "payments@aryakallayn.org"}
                    </p>
                    <p
                      className={`text-sm ${
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      Send payment to this {selectedMethod} address
                    </p>
                  </div>
                </div>
              )}
              <p className="text-center text-neutral-800 font-medium italic">Complete the payment and submit the form</p>

              {/* Form Fields */}

              <TextInput
                label="Amount"
                type="number"
                placeholder="Enter amount"
                {...register("amount")}
                error={errors.amount}
                isDisabled={isInputFieldDisable}
              />
              <TextInput
                label="Account Number"
                type="text"
                placeholder="Enter account number "
                {...register("accountNumber")}
                error={errors.accountNumber}
                isDisabled={isInputFieldDisable}
              />

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg text-base font-semibold transition-all duration-200 ease-in-out hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2
                          ${
                            theme === "light"
                              ? "bg-brand-orange text-white hover:bg-opacity-90 focus:ring-brand-orange focus:ring-offset-gray-50"
                              : "bg-brand-yellow text-black hover:bg-opacity-90 focus:ring-brand-yellow focus:ring-offset-gray-800"
                          }
                        `}
              >
                <span>
                  {isLoading || isSubscribing? "Completing Payment" : "Complete Payment"}
                </span>
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MakePaymentModal;
