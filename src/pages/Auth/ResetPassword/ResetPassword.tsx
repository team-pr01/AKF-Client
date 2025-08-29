/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import PasswordInput from "../../../components/Reusable/PasswordInput/PasswordInput";
import { CheckCircleIcon, LoaderIcon, AlertCircleIcon } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../../components/Reusable/TextInput/TextInput";
import { toast } from "sonner";
import { useResetPasswordMutation } from "../../../redux/Features/Auth/authApi";
import { useTheme } from "../../../contexts/ThemeContext";

type TFormData = {
  password: string;
  otp: string;
};

const ResetPassword = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [error, setError] = useState("");

  const handleResetpassword = async (data: TFormData) => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (!storedEmail) {
      toast.error("Something went wrong. Please try again.");
      return;
    }

    const payload = {
      email: storedEmail,
      otp: data.otp,
      newPassword: data.password,
    };

    try {
      setError("");
      const res = await resetPassword(payload).unwrap();
      if (res.success) {
        toast.success("Password reset successfully 🎉");
        localStorage.removeItem("resetEmail");
        navigate("/auth/login");
      }
    } catch (err: any) {
      const msg = err?.data?.message || "Failed to reset password.";
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
        Reset Your Password
      </h2>
      <p className="text-center text-sm text-gray-400 mb-5">
        Enter a new password to secure your account.
      </p>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-600 px-3 py-2.5 rounded-lg text-xs flex items-center gap-2 mb-4 w-full">
          <AlertCircleIcon className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit(handleResetpassword)}
        className="space-y-3 w-full mt-6"
      >
        <TextInput
          label="OTP"
          placeholder="Enter OTP"
          error={errors.otp}
          {...register("otp", { required: "OTP is required" })}
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

export default ResetPassword;
