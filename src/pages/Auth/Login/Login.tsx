import { useForm } from "react-hook-form";
import PasswordInput from "../../../components/Reusable/PasswordInput/PasswordInput";
import TextInput from "../../../components/Reusable/TextInput/TextInput";
import { useState } from "react";
import { AlertCircleIcon, CheckCircleIcon, LoaderIcon } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../redux/Features/Auth/authApi";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setUser } from "../../../redux/Features/Auth/authSlice";
import { toast } from "sonner";

type TFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [error, setError] = useState(""); // Added error state

  const handleLogin = async (data: TFormData) => {
    try {
      setError(""); // Clear previous errors
      const payload = {
        email: data.email,
        password: data.password,
      };
      const response = await login(payload).unwrap();
      const user = response?.data?.user;
      const accessToken = response?.data.token;
      const userRole = response?.data?.user?.role;
      console.log(response?.data);
      
      if (accessToken) {
        Cookies.set("accessToken", accessToken, {
          expires: 7,
          secure: window.location.protocol === "https:",
          sameSite: "strict",
        });
        Cookies.set("role", userRole, {
          expires: 7,
          secure: window.location.protocol === "https:",
          sameSite: "strict",
        });
      }

      if (response?.data?.user) {
        dispatch(setUser({ user, token: accessToken }));
        navigate("/");
      }
    } catch (error) {
      const err = error as { data?: { error?: string } };
      const errorMessage = err?.data?.error || "Something went wrong";
      setError(errorMessage); // Set error state
      toast.error(errorMessage);
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-md min-h-screen flex flex-col justify-center items-center px-4 py-3">
      <h2 className="text-2xl font-bold text-center text-brand-orange mb-1">
        Login to Your Account
      </h2>
      <p className="text-center text-sm text-gray-400 mb-5">
        Join our community to explore Vedic wisdom.
      </p>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-600 px-3 py-2.5 rounded-lg text-xs flex items-center gap-2 mb-4 w-full">
          <AlertCircleIcon className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-3 w-full mt-6">
        <TextInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register("email", { 
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
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
          disabled={isLoading}
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