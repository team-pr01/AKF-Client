/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../../components/Reusable/TextInput/TextInput";
import { CheckCircleIcon, LoaderIcon, AlertCircleIcon } from "../../../constants";
import { useForm } from "react-hook-form";
import { useForgetPasswordMutation } from "../../../redux/Features/Auth/authApi";
import { toast } from "sonner";
import { useTheme } from "../../../contexts/ThemeContext";
import { useState } from "react";

type TFormData = {
  email: string;
};

const ForgotPassword = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TFormData>();

  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const [error, setError] = useState("");

  const handleSubmitForgotPassword = async (data: TFormData) => {
    try {
      setError("");
      const res = await forgetPassword({ email: data.email }).unwrap();
      localStorage.setItem("resetEmail", data.email);

      if (res.success) {
        toast.success("✅ OTP has been sent to your email.");
        reset();
        navigate("/auth/reset-password");
      }
    } catch (err: any) {
      const msg = err?.data?.message || "Failed to send OTP. Please try again.";
      setError(msg);
      toast.error(msg);
      console.error("Reset failed", err);
    }
  };

  return (
    <div
      className={`w-full min-h-screen flex flex-col justify-center items-center 
      ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}
    >
      <h2 className="text-2xl font-bold text-center text-brand-orange mb-1">
        Forgot Your Password?
      </h2>
      <p className="text-center text-sm text-gray-400 mb-5">
        Enter your registered email and we will send a password reset OTP.
      </p>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-600 px-3 py-2.5 rounded-lg text-xs flex items-center gap-2 mb-4 w-full">
          <AlertCircleIcon className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit(handleSubmitForgotPassword)}
        className="space-y-3 w-full mt-6"
      >
        <TextInput
          label="Email"
          type="email"
          placeholder="Enter your registered email address"
          {...register("email", { required: "Email is required" })}
          error={errors.email}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-brand-orange text-white hover:bg-opacity-90 p-3 rounded-lg shadow-md transition-colors duration-150 ease-in-out disabled:opacity-70"
        >
          {isLoading ? (
            <LoaderIcon className="w-5 h-5 animate-spin" />
          ) : (
            <CheckCircleIcon className="w-5 h-5" />
          )}
          Submit
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        Back to{" "}
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

export default ForgotPassword;
