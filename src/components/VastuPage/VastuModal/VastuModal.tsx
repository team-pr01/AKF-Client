/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  AlertCircleIcon,
  BrainIcon,
  LoaderIcon,
  XIcon,
} from "../../../constants";
import { useTheme } from "../../../contexts/ThemeContext";
import Textarea from "../../Reusable/TextArea/TextArea";
import { useForm } from "react-hook-form";
import { MarkdownRenderer } from "../../FoodPage/GenerateRecipeModal/MarkdownRenderer";
import { useGenerateVastuMutation } from "../../../redux/Features/Vastu/vastuApi";

const VastuModal = ({ setShowAIModal }: any) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();
  const { theme } = useTheme();
  const [aiResponse, setAiResponse] = useState<string | any>("");
  const [error, setError] = useState<string | null>(null);
  const [generateVastu, { isLoading: isGenerating }] =
    useGenerateVastuMutation();

  const handleGenerateRecipe = async (data: any) => {
    try {
      const payload = {
        query: data.query,
      };

      const response = await generateVastu(payload).unwrap();
      setAiResponse(response?.data);
      reset();
      console.log(response);
    } catch (error:any) {
      setError(error?.data?.message);
      console.log(error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={() => setShowAIModal(false)}
    >
      <div
        className={`rounded-xl p-3 w-full max-w-lg shadow-2xl animate-soft-breathing-shadow h-fit max-h-[500px] overflow-y-auto ${
          theme === "light"
            ? "bg-light-surface text-light-text-primary"
            : "bg-dark-card text-dark-text-primary"
        }`}
        style={
          {
            "--tw-shadow-color":
              theme === "dark" ? "rgba(0,196,204,0.15)" : "rgba(0,0,0,0.1)",
          } as React.CSSProperties
        }
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-recipe-title"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <BrainIcon className="w-6 h-6 text-brand-orange animate-subtle-beat" />
            <h2
              id="ai-recipe-title"
              className="text-xl font-bold text-gradient bg-gradient-to-r from-brand-blue to-teal-400 bg-clip-text text-transparent"
            >
              AI Vastu tips Generator
            </h2>
          </div>
          <button
            onClick={() => setShowAIModal(false)}
            className={`p-1.5 rounded-full ${
              theme === "light"
                ? "text-gray-500 hover:bg-gray-200"
                : "text-gray-400 hover:bg-gray-700"
            }`}
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-600 px-3 py-2.5 rounded-lg text-xs flex items-center gap-2 mb-4">
            <AlertCircleIcon className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
        
        {
          aiResponse &&
          <div className="border border-brand-orange rounded-lg p-2 bg-amber-50/70 mb-5">
          <MarkdownRenderer content={aiResponse} />
        </div>
        }
        <form
          onSubmit={handleSubmit(handleGenerateRecipe)}
          className="space-y-4"
        >
          <Textarea
            label="Describe your space for Vastu analysis (room type,
                        direction, layout:"
            placeholder="E.g., My living room faces North-East..."
            rows={4}
            {...register("query", {
              required: "Query is required",
            })}
            error={errors.query}
          />
          <button
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-brand-blue to-teal-500 hover:from-teal-500 hover:to-brand-blue bg-200% animate-background-pan-fast transition-all duration-300 text-white rounded-lg py-3 flex items-center justify-center gap-2 font-medium disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-brand-blue/40"
          >
            {isGenerating ? (
              <>
                <LoaderIcon className="w-5 h-5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <span>Generate Vatu</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VastuModal;
