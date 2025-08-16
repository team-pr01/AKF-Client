import { useForm } from "react-hook-form";
import PasswordInput from "../../../components/Reusable/PasswordInput/PasswordInput";
import TextInput from "../../../components/Reusable/TextInput/TextInput";
import { useState } from "react";
import { CheckCircleIcon, LoaderIcon } from "../../../constants";
import { Link } from "react-router-dom";

type TFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const isLoading = false;

  const handleLogin = async (data: TFormData) => {
    console.log(data);
  };
  return (
    <div className="w-full max-w-md min-h-screen flex flex-col justify-center items-center px-4 py-3">
      <h2 className="text-2xl font-bold text-center text-brand-orange mb-1">
        Login to Your Account
      </h2>
      <p className="text-center text-sm text-gray-400 mb-5">
        Join our community to explore Vedic wisdom.
      </p>
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-3 w-full mt-6">
        <TextInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: "Email is required" })}
          error={errors.email}
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
        <div className="flex justify-end">
          <Link
            to={"/auth/forgot-password"}
            className="text-sm font-medium text-brand-orange hover:text-brand-yellow"
          >
            Forgot Password?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-brand-orange text-white hover:bg-opacity-90 p-3 rounded-lg shadow-md transition-colors duration-150 ease-in-out disabled:opacity-70"
        >
          {isLoading ? (
            <LoaderIcon className="w-5 h-5 animate-spin" />
          ) : (
            <CheckCircleIcon className="w-5 h-5" />
          )}
          Login
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <Link
          to={"/auth/sign-up"}
          className="font-medium text-brand-orange hover:text-brand-yellow"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
