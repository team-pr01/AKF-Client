/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useGenerateKundliMutation } from "../../../redux/Features/Jyotish/jyotishApi";
import { toast } from "sonner";
import TextInput from "../../../components/Reusable/TextInput/TextInput";
import { Star } from "lucide-react";
import { useState } from "react";
import { MarkdownRenderer } from "../../../components/FoodPage/GenerateRecipeModal/MarkdownRenderer";

type TFormData = {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
};
const GenerateKundaliForm = () => {
  const [generateKundli, { isLoading }] = useGenerateKundliMutation();
  const [kundaliResponse, setKundaliResponse] = useState<any>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormData>();

  const handleGenerateJundali = async (data: TFormData) => {
    try {
      const payload = {
        ...data,
      };
      const response = await generateKundli(payload).unwrap();
      if (response?.success) {
        setKundaliResponse(response?.data);
        toast.success(response?.message);
        reset();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };
  return kundaliResponse ? (
    <div className="flex flex-col gap-4">
      <MarkdownRenderer content={kundaliResponse} />
      <button
        onClick={() => setKundaliResponse(null)}
        className="w-full flex justify-center items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg py-3 font-semibold transition-all"
      >
        Generate New
      </button>
    </div>
  ) : (
    <form
      onSubmit={handleSubmit(handleGenerateJundali)}
      className="flex flex-col gap-3"
    >
      <TextInput
        label="Full Name"
        placeholder="Enter your full name"
        {...register("name", { required: "Temple name is required" })}
        error={errors.name}
      />
      <TextInput
        label="Birth Date"
        type="date"
        placeholder="Enter your full name"
        {...register("birthDate", {
          required: "Temple name is required",
        })}
        error={errors.birthDate}
      />
      <TextInput
        label="Birth Time"
        type="time"
        placeholder="Enter your full name"
        {...register("birthTime", {
          required: "Temple name is required",
        })}
        error={errors.birthTime}
      />
      <TextInput
        label="Birth Place"
        placeholder="Enter your birth place"
        {...register("birthPlace", {
          required: "Birth place is required",
        })}
        error={errors.birthPlace}
      />

      {/* Book Button */}
      <button className="w-full flex justify-center items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg py-3 font-semibold transition-all">
        {isLoading ? "Please wait..." : "Generate Kundali"}
        <Star size={18} />
      </button>
    </form>
  );
};

export default GenerateKundaliForm;
