/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { CheckCircleIcon, LoaderIcon, XIcon } from "../../../constants";
import { useTheme } from "../../../contexts/ThemeContext";
import { useAddTempleMutation } from "../../../redux/Features/Temple/templeApi";
import TextInput from "../../Reusable/TextInput/TextInput";
import { toast } from "sonner";
import Textarea from "../../Reusable/TextArea/TextArea";

type TFormData = {
  name: string;
  mainDeity: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  establishedYear: number;
  visitingHours: string;
  phone: string;
  email: string;
  website?: string;
  file: string;
  videoUrl?: string;
  mediaGallery?: string[];
};
const RegisterTempleModal = ({ onClose }: any) => {
  const { theme } = useTheme();

  const [addTemple, { isLoading }] = useAddTempleMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormData>();

  const handleAddTemple = async (data: TFormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("mainDeity", data.mainDeity);
      formData.append("description", data.description);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("country", data.country);
      formData.append("establishedYear", data.establishedYear.toString());
      formData.append("visitingHours", data.visitingHours);
      formData.append("phone", data.phone);
      formData.append("email", data.email);

      // Append optional fields if they exist
      if (data.website) formData.append("website", data.website);
      if (data.videoUrl) formData.append("videoUrl", data.videoUrl);

      // Append picture file if exists
      if (data.file && data.file.length > 0) {
        formData.append("file", data.file[0]);
      }

      const response = await addTemple(formData).unwrap();

      if (response?.success) {
        toast.success(
          "Temple added successfully! Temple will be listed if Admin approves."
        );
        onClose();
      }

      console.log("Temple added successfully:", response);
      reset();
    } catch (err: any) {
      toast.error("Something went wrong!");
      console.error("Error adding temple:", err);
      if (err.data?.message) {
        toast.error(err.data.message);
      }
    }
  };
  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[100]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="registration-modal-title"
    >
      <div
        className={`rounded-xl p-5 sm:p-6 w-full max-w-lg shadow-2xl max-h-[90vh] flex flex-col
                    ${
                      theme === "light"
                        ? "bg-light-surface text-light-text-primary"
                        : "bg-dark-card text-dark-text-primary"
                    }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5">
          <h2
            id="registration-modal-title"
            className="text-lg sm:text-xl font-semibold text-brand-orange"
          >
            Register Your Temple
          </h2>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-full transition-colors 
                        ${
                          theme === "light"
                            ? "text-gray-500 hover:bg-gray-200"
                            : "text-gray-400 hover:bg-gray-700"
                        }`}
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(handleAddTemple)}
          className="flex-grow overflow-y-auto space-y-3 pr-1 -mr-1 scrollbar-hide"
        >
          {/* Temple Basic Info */}
          <TextInput
            label="Temple Name"
            placeholder="Enter temple name"
            {...register("name", { required: "Temple name is required" })}
            error={errors.name}
          />

          <TextInput
            label="Type"
            placeholder="Ex: Temple, Gurukul, Organization"
            {...register("mainDeity", { required: "Main deity is required" })}
            error={errors.mainDeity}
          />

          <Textarea
            label="Description"
            placeholder="Enter temple description"
            rows={4}
            {...register("description", {
              required: "Description is required",
            })}
            error={errors.description}
          />

          {/* Address Section */}
          <TextInput
            label="Address"
            placeholder="Enter temple address"
            {...register("address", { required: "Address is required" })}
            error={errors.address}
          />

          <div className="grid grid-cols-2 gap-3">
            <TextInput
              label="City"
              placeholder="Enter city"
              {...register("city", { required: "City is required" })}
              error={errors.city}
            />
            <TextInput
              label="State"
              placeholder="Enter state"
              {...register("state", { required: "State is required" })}
              error={errors.state}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <TextInput
              label="Country"
              placeholder="Enter country"
              {...register("country", { required: "Country is required" })}
              error={errors.country}
            />
            <TextInput
              label="Established Year"
              placeholder="Enter established year"
              type="number"
              {...register("establishedYear", {
                required: "Established year is required",
                valueAsNumber: true,
              })}
              error={errors.establishedYear}
            />
          </div>

          {/* Contact Info */}
          <TextInput
            label="Visiting Hours"
            placeholder="e.g., 6:00 AM - 8:00 PM"
            {...register("visitingHours", {
              required: "Visiting hours are required",
            })}
            error={errors.visitingHours}
          />

          <div className="grid grid-cols-2 gap-3">
            <TextInput
              label="Phone Number"
              placeholder="Enter phone number"
              {...register("phone", { required: "Phone number is required" })}
              error={errors.phone}
            />
            <TextInput
              label="Email"
              placeholder="Enter email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={errors.email}
            />
          </div>

          {/* Optional Fields */}
          <TextInput
            label="Website (Optional)"
            placeholder="Enter website URL"
            type="url"
            {...register("website")}
            error={errors.website}
          />

          <TextInput
            label="Image URL"
            placeholder="Upload temple image"
            type="file"
            {...register("file", { required: "Image is required" })}
            error={errors.file}
          />

          <TextInput
            label="Video URL (Optional)"
            placeholder="Enter video URL"
            type="url"
            {...register("videoUrl")}
            error={errors.videoUrl}
          />

          {/* Submit Button */}
          <div className="pt-3 mt-auto border-t border-gray-200 dark:border-gray-700">
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterTempleModal;
