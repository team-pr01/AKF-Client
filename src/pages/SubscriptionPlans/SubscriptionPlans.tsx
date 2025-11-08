import React, { useState } from "react";
import MakePaymentModal from "../../components/Shared/MakePaymentModal/MakePaymentModal";

interface PlanFeature {
  name: string;
  available: boolean;
  limit?: string;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
}

const SubscriptionPlans: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPlanPrice, setSelectedPlanPrice] = useState<number>(0);
  const [selectedPlanName, setSelectedPlanName] = useState<string | null>(null);
  const plans: Plan[] = [
    {
      id: "free",
      name: "Free Plan",
      price: 0,
      period: "forever",
      description: "Perfect for getting started",
      features: [
        { name: "News in 100 languages", available: true },
        { name: "Vedic Book – 100 languages", available: true },
        { name: "Cooking Videos", available: true },
        { name: "Ayurveda Videos", available: true },
        { name: "Yoga Videos", available: true },
        { name: "Vastu Videos", available: true, limit: "(❌ No AI support)" },
        { name: "Unlimited quizzes per month", available: true },
        {
          name: "AI Chat / Generated Feature",
          available: true,
          limit: "5 times per day",
        },
        { name: "AI Recipes", available: true, limit: "5 per month" },
        { name: "AI Kundli", available: false },
        { name: "AI Muhurta", available: false },
        { name: "Ads", available: true, limit: "With ads" },
      ],
    },
    {
      id: "basic",
      name: "Basic Plan",
      price: 5,
      period: "month",
      description: "Great for regular users",
      features: [
        { name: "News in 100 languages", available: true },
        { name: "Vedic Book – 100 languages", available: true },
        { name: "Cooking Videos", available: true },
        { name: "Ayurveda Videos", available: true },
        { name: "Yoga Videos", available: true },
        { name: "Vastu Videos", available: true },
        { name: "Vastu AI Support", available: true, limit: "5 per month" },
        { name: "Unlimited quizzes per month", available: true },
        {
          name: "AI Chat / Generated Feature",
          available: true,
          limit: "20 times per day",
        },
        { name: "AI Recipes", available: true, limit: "20 per month" },
        { name: "AI Kundli", available: true, limit: "5 per month" },
        { name: "AI Muhurta", available: true, limit: "5 per month" },
        { name: "Ads", available: false, limit: "No ads" },
      ],
    },
    {
      id: "pro",
      name: "Pro Plan",
      price: 15,
      period: "month",
      description: "For dedicated practitioners",
      popular: true,
      features: [
        { name: "News in 100 languages", available: true },
        { name: "Vedic Book – 100 languages", available: true },
        { name: "Cooking Videos", available: true },
        { name: "Ayurveda Videos", available: true },
        { name: "Yoga Videos", available: true },
        { name: "Vastu Videos", available: true },
        { name: "Vastu AI Support", available: true, limit: "20 per month" },
        { name: "Unlimited quizzes per month", available: true },
        {
          name: "AI Chat / Generated Feature",
          available: true,
          limit: "50 times per day",
        },
        { name: "AI Recipes", available: true, limit: "50 per month" },
        { name: "AI Kundli", available: true, limit: "20 per month" },
        { name: "AI Muhurta", available: true, limit: "20 per month" },
        { name: "Voice Health Tips", available: true },
        { name: "Ads", available: false, limit: "No ads" },
      ],
    },
    {
      id: "premium",
      name: "Premium Plan",
      price: 30,
      period: "month",
      description: "Ultimate experience",
      features: [
        { name: "News in 100 languages", available: true },
        { name: "Vedic Book – 100 languages", available: true },
        { name: "Cooking Videos", available: true },
        { name: "Ayurveda Videos", available: true },
        { name: "Yoga Videos", available: true },
        { name: "Vastu Videos", available: true },
        { name: "Vastu AI Support", available: true, limit: "Unlimited" },
        { name: "Unlimited quizzes per month", available: true },
        {
          name: "AI Chat / Generated Feature",
          available: true,
          limit: "Unlimited",
        },
        { name: "AI Recipes", available: true, limit: "Unlimited" },
        { name: "AI Kundli", available: true, limit: "Unlimited" },
        { name: "AI Muhurta", available: true, limit: "Unlimited" },
        { name: "Ads", available: false, limit: "No ads" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-7">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
            Choose Your Plan
          </h1>
          <p className="text-sm xl:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the perfect plan for your spiritual journey and wellness
            transformation. Start free or unlock premium features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 md:grid-cols-2 max-w-7xl mx-auto mb-10">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl bg-white p-8 shadow-2xl transition-all duration-500 hover:shadow-2xl ${
                plan.popular
                  ? "ring-4 ring-brand-orange ring-opacity-50 transform scale-105 border-2 border-brand-orange my-5"
                  : "border border-gray-200 hover:border-gray-300"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span className="bg-gradient-to-r from-brand-orange to-brand-yellow text-white px-4 py-1 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                    ⭐ MOST POPULAR
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8 pt-4">
                <h3
                  className={`text-2xl font-bold mb-3 ${
                    plan.popular ? "text-brand-orange" : "text-gray-900"
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center mb-3">
                  <span className="text-5xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600 ml-2 text-lg">
                    {plan.price === 0 ? "/forever" : "/month"}
                  </span>
                </div>
                <p className="text-gray-500 text-sm font-medium">
                  {plan.description}
                </p>
              </div>

              {/* Features List */}
              <div className="mb-8">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6"></div>
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start group">
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                          feature.available
                            ? "bg-brand-green bg-opacity-10 text-brand-green"
                            : "bg-red-50 text-red-400"
                        }`}
                      >
                        {feature.available ? (
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <span
                          className={`text-sm font-medium ${
                            feature.available
                              ? "text-gray-700"
                              : "text-gray-400"
                          }`}
                        >
                          {feature.name}
                        </span>
                        {feature.limit && (
                          <span
                            className={`block text-xs mt-1 ${
                              feature.name.includes("Ads")
                                ? "text-brand-orange font-semibold"
                                : feature.name.includes("No AI")
                                ? "text-red-500"
                                : "text-brand-blue"
                            }`}
                          >
                            {feature.limit}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-6"></div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => {
                  setSelectedPlanPrice(plan?.price);
                  setSelectedPlanName(plan?.name);
                    setIsModalOpen(true);
                }}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg disable:cursor-not-allowed ${
                  plan.popular
                    ? "bg-gradient-to-r from-brand-orange to-brand-yellow hover:from-orange-600 hover:to-yellow-500"
                    : plan.id === "free"
                    ? "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800"
                    : "bg-gradient-to-r from-brand-blue to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                }`}
                disabled={plan.id === "free"}
              >
                {plan.id === "free"
                  ? "Already Subscribed"
                  : `Choose ${plan.name}`}
              </button>

              {/* Unlimited Badge for Premium */}
              {plan.id === "premium" && (
                <div className="text-center mt-4">
                  <span className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    🚀 ALL FEATURES UNLOCKED
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <MakePaymentModal
          amount={selectedPlanPrice}
          isInputFieldDisable={false}
          setIsModalOpen={setIsModalOpen}
          programData={{ title: selectedPlanName, amount: selectedPlanPrice }}
          paymentReason="subscription"
        />
      )}
    </div>
  );
};

export default SubscriptionPlans;
