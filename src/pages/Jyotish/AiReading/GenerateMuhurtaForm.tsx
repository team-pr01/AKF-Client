/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useGenerateMuhurtaMutation } from "../../../redux/Features/Jyotish/jyotishApi";
import { toast } from "sonner";
import { Calendar } from "lucide-react";
import Textarea from "../../../components/Reusable/TextArea/TextArea";
import { MarkdownRenderer } from "../../../components/FoodPage/GenerateRecipeModal/MarkdownRenderer";
import { useState } from "react";

type TFormData = {
  query: string;
};
const GenerateMuhurtaForm = () => {
  const [generateMuhurta, { isLoading }] = useGenerateMuhurtaMutation();
  const [muhurtaResponse, setMuhurtaResponse] = useState<any>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormData>();

  const handleGenerateMuhurta = async (data: TFormData) => {
    try {
      const payload = {
        ...data,
      };
      const response = await generateMuhurta(payload).unwrap();
      if (response?.success) {
        setMuhurtaResponse(response?.data);
        toast.success(response?.message);
        reset();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return muhurtaResponse ? (
    <div className="flex flex-col gap-4">
      <MarkdownRenderer content={muhurtaResponse} />
      <button
        onClick={() => setMuhurtaResponse(null)}
        className="w-full flex justify-center items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg py-3 font-semibold transition-all"
      >
        Generate New
      </button>
    </div>
  ) : (
    <form
      onSubmit={handleSubmit(handleGenerateMuhurta)}
      className="flex flex-col gap-3"
    >
      <Textarea
        label="Enter your question or requirement"
        placeholder="Enter your question or requirement"
        {...register("query", { required: "Requirement is required" })}
        error={errors.query}
      />
      {/* Book Button */}
      <button className="w-full flex justify-center items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg py-3 font-semibold transition-all">
        {isLoading ? "Please wait..." : "Generate Muhurta"}
        <Calendar size={18} />
      </button>
    </form>
  );
};

export default GenerateMuhurtaForm;
