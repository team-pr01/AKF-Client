import { Link } from "react-router-dom";
import TextInput from "../../../components/Reusable/TextInput/TextInput";
import { CheckCircleIcon, LoaderIcon } from "../../../constants";
import { useForm } from "react-hook-form";

type TFormData = {
  email: string;
};

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();
  const isLoading = false;

  const handleForgotPassword = async (data: TFormData) => {
    console.log(data);
  };
  return (
    <div className="w-full max-w-md min-h-screen flex flex-col justify-center items-center px-4 py-3">
      <h2 className="text-2xl font-bold text-center text-brand-orange mb-1">
        Forgot Your Password?
      </h2>
      <p className="text-center text-sm text-gray-400 mb-5">
        Enter your registered email and we will send password reset instruction to your email.
      </p>
      <form onSubmit={handleSubmit(handleForgotPassword)} className="space-y-3 w-full mt-6">
        <TextInput
          label="Email"
          type="email"
          placeholder="Enter your registered email address"
          {...register("email", { required: "Email is required" })}
          error={errors.email}
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

export default ForgotPassword;
