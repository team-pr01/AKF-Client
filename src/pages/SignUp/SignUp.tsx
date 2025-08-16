import { useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  LoaderIcon,
  AlertCircleIcon,
  CheckCircleIcon,
} from "../../constants";
import TextInput from "../../components/Reusable/TextInput/TextInput";
import { useForm } from "react-hook-form";
import PasswordInput from "../../components/Reusable/PasswordInput/PasswordInput";
import { Link } from "react-router-dom";

type TFormData = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  country: string;
  state: string;
  city: string;
  area?: string;
};

type SignupStep = 1 | 2;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<TFormData>({ mode: "onChange" });

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const isLoading = false;
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState<SignupStep>(1);

  const progressPercentage = ((currentStep - 1) / 1) * 100; // 2 steps only

  const handleSignup = async (data: TFormData) => {
    console.log(data);
    reset();
    setError("Hi");
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep((prev) => (prev + 1) as SignupStep);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as SignupStep);
    }
  };

  // ✅ Watch required fields in Step 1
  const name = watch("name");
  const email = watch("email");
  const phoneNumber = watch("phoneNumber");
  const password = watch("password");

  const isStep1Valid =
    name &&
    email &&
    phoneNumber &&
    password &&
    !errors.name &&
    !errors.email &&
    !errors.phoneNumber &&
    !errors.password;

  return (
    <div className="w-full max-w-md min-h-screen flex flex-col justify-center items-center px-4 py-3">
      <h2 className="text-2xl font-bold text-center text-brand-orange mb-1">
        Create Your Account
      </h2>
      <p className="text-center text-sm text-gray-400 mb-5">
        Join our community to explore Vedic wisdom.
      </p>

      {/* Progress Bar */}
      <div className="mb-5 w-full">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Step {currentStep} of 2</span>
        </div>
        <div className="w-full bg-neutral-400 rounded-full h-1.5">
          <div
            className="bg-brand-orange h-1.5 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-300 px-3 py-2.5 rounded-lg text-xs flex items-center gap-2 mb-4">
          <AlertCircleIcon className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(handleSignup)} className="space-y-3 w-full">
        {currentStep === 1 && (
          <>
            <TextInput
              label="Name"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              error={errors.name}
            />
            <TextInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              error={errors.email}
            />
            <TextInput
              type="tel"
              label="Phone Number (with country code)"
              placeholder="e.g., +8801712345678"
              {...register("phoneNumber", {
                required: "Phone number is required",
              })}
              error={errors.phoneNumber}
            />
            <PasswordInput
              label="Password"
              placeholder="Must be at least 8 Characters"
              error={errors.password}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              isPasswordVisible={isPasswordVisible}
              setIsPasswordVisible={setIsPasswordVisible}
            />
          </>
        )}
        {currentStep === 2 && (
          <>
            <TextInput
              label="Country"
              placeholder="e.g., India, Bangladesh"
              {...register("country", { required: "Country is required" })}
              error={errors.country}
            />
            <TextInput
              label="State/Province"
              placeholder="e.g., West Bengal, Dhaka Division"
              {...register("state", { required: "State/Province is required" })}
              error={errors.state}
            />
            <TextInput
              label="City/Town"
              placeholder="e.g., Kolkata, Dhaka"
              {...register("city", { required: "City/Town is required" })}
              error={errors.city}
            />
            <TextInput
              label="Village/Area (Optional)"
              placeholder="e.g., Shantiniketan, Mirpur"
              {...register("area")}
              error={errors.area}
              isRequired={false}
            />
          </>
        )}

        <div className="pt-2 flex items-center gap-3">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-300 text-gray-700 hover:bg-opacity-90 p-3 rounded-lg shadow-md transition-colors duration-150 ease-in-out disabled:opacity-70"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Previous
            </button>
          )}

          {currentStep < 2 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!isStep1Valid} // ✅ disabled if step 1 is invalid
              className="flex-1 flex items-center justify-center gap-2 bg-brand-orange text-white hover:bg-opacity-90 p-3 rounded-lg shadow-md transition-colors duration-150 ease-in-out disabled:opacity-70"
            >
              Next <ArrowRightIcon className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-brand-orange text-white hover:bg-opacity-90 p-3 rounded-lg shadow-md transition-colors duration-150 ease-in-out disabled:opacity-70"
            >
              {isLoading ? (
                <LoaderIcon className="w-5 h-5 animate-spin" />
              ) : (
                <CheckCircleIcon className="w-5 h-5" />
              )}
              Submit
            </button>
          )}
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link
          to={"/auth/login"}
          className="font-medium text-brand-orange hover:text-brand-yellow"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
