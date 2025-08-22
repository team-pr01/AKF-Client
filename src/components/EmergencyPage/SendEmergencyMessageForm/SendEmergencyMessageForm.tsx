/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import TextInput from "../../Reusable/TextInput/TextInput";
import Textarea from "../../Reusable/TextArea/TextArea";
import { AlertTriangleIcon, LoaderIcon, SendIcon } from "../../../constants";
import { useTheme } from "../../../contexts/ThemeContext";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";
import { useSendEmergencyAlertMutation } from "../../../redux/Features/Emergencies/emergencyApi";
import { socket } from "../../../utils/socket";
import { toast } from "sonner";

type TFormData = {
  message: string;
  location: string;
};
const SendEmergencyMessageForm = () => {
  const { theme } = useTheme();
  const user = useSelector(useCurrentUser) as any;
  const [sendEmergencyAlert, { isLoading }] = useSendEmergencyAlertMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TFormData>();

  const handleEmergencySubmit = async (data: TFormData) => {
    try {
      const payload = {
        user: user._id,
        message: data.message,
        location: data.location,
      };

      // Send to backend
      const response = await sendEmergencyAlert(payload).unwrap();
      if(response?.success) {
        toast.success(response?.message || "Emergency alert sent successfully!");
        reset();
      }
      console.log(response);
      socket.emit("new-notification", {});
    } catch (error) {
      console.error("Error sending emergency notification:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleEmergencySubmit)}
      className={`rounded-xl p-5 sm:p-6 shadow-[0_0_25px_rgba(239,68,68,0.4)] flex flex-col gap-3 ${
        theme === "light"
          ? "bg-red-500 border border-red-600"
          : "bg-red-600/80 backdrop-blur-sm border border-red-500/50"
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <AlertTriangleIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Need Immediate Help?
          </h2>
          <p
            className={`text-sm ${
              theme === "light" ? "text-red-100" : "text-red-200"
            }`}
          >
            Describe your situation. We're here 24/7.
          </p>
        </div>
      </div>
      <Textarea
        placeholder="Briefly describe your issue..."
        {...register("message", { required: "This field is required" })}
        error={errors.message}
      />
      <TextInput
        type="text"
        placeholder="Enter your location"
        {...register("location", {
          required: "Location is required",
        })}
        error={errors.location}
      />

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full rounded-lg py-3 font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 
                  ${
                    theme === "light"
                      ? "bg-red-200 text-red-600 hover:bg-red-100 focus:ring-offset-red-500 focus:ring-red-700"
                      : "bg-white text-red-600 hover:bg-red-100 focus:ring-offset-red-600/80 focus:ring-white"
                  }`}
        aria-live="polite"
      >
        {isLoading ? (
          <>
            <LoaderIcon className="w-5 h-5 animate-spin" />
            <span>Sending</span>
          </>
        ) : (
          <>
            <SendIcon className="w-5 h-5" />
            <span>Send Emergency Alert</span>
          </>
        )}
      </button>
    </form>
  );
};

export default SendEmergencyMessageForm;
