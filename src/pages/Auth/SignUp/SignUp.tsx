/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  LoaderIcon,
  AlertCircleIcon,
  CheckCircleIcon,
} from "../../../constants";
import TextInput from "../../../components/Reusable/TextInput/TextInput";
import { useForm } from "react-hook-form";
import PasswordInput from "../../../components/Reusable/PasswordInput/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../../redux/Features/Auth/authApi";
import { toast } from "sonner";

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
  file?: any;
};

type SignupStep = 1 | 2;

const SignUp = () => {
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<TFormData>({ mode: "onChange" });

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState<SignupStep>(1);

  const progressPercentage = ((currentStep - 1) / 1) * 100; // 2 steps only

  const handleSignup = async (data: TFormData) => {
    try {
      setError("");

      // Create FormData object
      const formData = new FormData();

      // Append all form fields
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
      formData.append("country", data.country);
      formData.append("state", data.state);
      formData.append("city", data.city);
      if (data.area) formData.append("area", data.area);

      // Append profile picture if exists
      if (data.file && data.file.length > 0) {
        formData.append("file", data.file[0]);
      }

      // Call the signup mutation
      const response = await signup(formData).unwrap();
      if (response?.success) {
        toast.success("Signup success. Please login.");
        navigate("/auth/login");
      }

      // Handle successful signup
      console.log("Signup successful:", response);
      reset();
    } catch (err: any) {
      // Handle error
      setError(err.data?.message || "Signup failed. Please try again.");
      console.error("Signup error:", err);
    }
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
      <div className="my-6 w-full">
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
        <div className="bg-red-500/10 border border-red-500/50 text-red-600 px-3 py-2.5 rounded-lg text-xs flex items-center gap-2 mb-4">
          <AlertCircleIcon className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(handleSignup)} className="space-y-3 w-full">
        {currentStep === 1 && (
          <>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-300">
                Profile Picture (Optional)
              </label>

              {/* Hidden file input */}
              <input
                type="file"
                id="file" // Added ID
                accept="image/*"
                className="hidden"
                {...register("file")}
              />

              {/* Custom button that triggers the file input */}
              <label
                htmlFor="file" // Matches the input's ID
                className="block w-full p-2 border border-dashed border-gray-400 rounded-lg text-gray-400 hover:border-brand-orange hover:text-brand-orange transition-colors cursor-pointer"
              >
                {watch("file")?.length > 0
                  ? watch("file")[0].name
                  : "Click to upload image"}
              </label>

              {/* Preview (optional) */}
              {watch("file")?.length > 0 && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(watch("file")[0])}
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded-full"
                  />
                </div>
              )}

              <p className="text-xs text-gray-500">JPG, PNG (Max 2MB)</p>
            </div>
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
