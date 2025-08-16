import { useState } from "react";
import { useForm } from "react-hook-form";
import PasswordInput from "../../../components/Reusable/PasswordInput/PasswordInput";
import { CheckCircleIcon, LoaderIcon } from "../../../constants";
import { Link } from "react-router-dom";

type TFormData = {
  password: string;
  confirmPassword: string;
};
const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TFormData>();
  const passwordValue = watch("password");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const isLoading = false;

  const handleResetpassword = async (data: TFormData) => {
    console.log(data);
  };
  return (
    <div className="w-full max-w-md min-h-screen flex flex-col justify-center items-center px-4 py-3">
      <h2 className="text-2xl font-bold text-center text-brand-orange mb-1">
        Reset Your Password
      </h2>
      <p className="text-center text-sm text-gray-400 mb-5">
        Enter a new password to secure your account.
      </p>

      <form
        onSubmit={handleSubmit(handleResetpassword)}
        className="space-y-3 w-full mt-6"
      >
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
        <PasswordInput
          label="Confirm Password"
          placeholder="Re-type your password"
          error={errors.confirmPassword}
          {...register("confirmPassword", {
            required: "Confirm password is required",
            validate: (value) =>
              value === passwordValue || "Passwords do not match",
          })}
          isPasswordVisible={isConfirmPasswordVisible}
          setIsPasswordVisible={setIsConfirmPasswordVisible}
        />
        <button
          type="submit"
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
        Back to?{" "}
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
