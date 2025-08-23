/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { SendIcon } from "../../constants";
import { useTheme } from "../../contexts/ThemeContext";
import { useAiChatMutation } from "../../redux/Features/Auth/authApi";
import { MarkdownRenderer } from "../../components/FoodPage/GenerateRecipeModal/MarkdownRenderer";

const AiChatPage = () => {
  const { theme } = useTheme();
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<any>([]);
  const [aiChat, { isLoading }] = useAiChatMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      // Add user message to conversation immediately
      const userMessage = {
        content: message,
        role: "user",
        id: Date.now() + "-user",
      };

      setConversation((prev: any) => [...prev, userMessage]);
      setMessage("");

      // Get AI response
      const response = await aiChat({ message }).unwrap();

      // Add AI response to conversation
      const aiMessage = {
        content: response?.data || "Sorry, I couldn't process that request.",
        role: "assistant",
        id: Date.now() + "-ai",
      };

      setConversation((prev: any) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);

      // Add error message to conversation
      const errorMessage = {
        content: "Sorry, there was an error processing your request.",
        role: "assistant",
        id: Date.now() + "-error",
      };

      setConversation((prev: any) => [...prev, errorMessage]);
    }
  };

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [conversation]);

  return (
    <div className={`flex flex-col h-screen ${
          theme === "light"
            ? "bg-white"
            : "bg-gray-800 animate-soft-breathing-shadow"
        }`}>
      <div
        id="chat-container"
        className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 max-h-[90%]"
      >
        {conversation.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div
              className={`text-center p-6 rounded-lg max-w-md ${
                theme === "light"
                  ? "bg-light-surface-alt text-light-text-secondary"
                  : "bg-dark-surface-alt text-dark-text-secondary"
              }`}
            >
              <h3 className="text-lg font-medium mb-2">AI Assistant</h3>
              <p className="text-sm">
                Ask me anything about our services, products, or how to use our
                platform.
              </p>
              <p className="text-sm text-red-500 mt-3 italic">
                NOTE: We don't save your chat history.
              </p>
            </div>
          </div>
        ) : (
          conversation?.map((msg: any) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-orange flex items-center justify-center flex-shrink-0 text-white font-medium text-sm">
                  AI
                </div>
              )}
              <div
                className={`
                  ${
                    msg.role === "user"
                      ? "bg-brand-blue text-white rounded-2xl rounded-tr-none"
                      : `${
                          theme === "light"
                            ? "bg-light-surface-alt text-light-text-primary"
                            : "bg-dark-card text-dark-text-primary"
                        } rounded-2xl rounded-tl-none`
                  }
                  px-3 shadow-md max-w-[80%] break-words
                `}
              >
                <MarkdownRenderer content={msg.content} />
              </div>
              {msg.role === "user" && (
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 font-medium text-sm ${
                    theme === "light"
                      ? "bg-light-surface-alt text-light-text-secondary"
                      : "bg-dark-surface-alt text-dark-text-secondary"
                  }`}
                >
                  Me
                </div>
              )}
            </div>
          ))
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex gap-2.5 justify-start">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-orange flex items-center justify-center flex-shrink-0 text-white font-medium text-sm">
              AI
            </div>
            <div className={`
              px-3 shadow-md max-w-[80%] break-words rounded-2xl rounded-tl-none
              ${theme === "light"
                ? "bg-light-surface-alt text-light-text-primary"
                : "bg-dark-card text-dark-text-primary"
              }
            `}>
              <div className="animate-pulse flex space-x-2 py-3">
                <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        className={`fixed bottom-[63px] left-0 right-0 px-3 py-2 sm:px-4 sm:py-2.5 border-t shadow-top-md h-20 
                    ${
                      theme === "light"
                        ? "bg-light-surface border-light-surface-alt"
                        : "bg-primary border-gray-700/50"
                    }`}
      >
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 sm:gap-3"
        >
          <div
            className={`flex-1 flex items-center rounded-full px-3.5 py-0.5 sm:py-1 shadow-sm border
                        ${
                          theme === "light"
                            ? "bg-light-surface-alt border-gray-300 focus-within:ring-2 focus-within:ring-brand-orange focus-within:border-brand-orange"
                            : "bg-dark-surface-alt border-gray-600 focus-within:ring-2 focus-within:ring-brand-orange focus-within:border-brand-orange"
                        }`}
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your question..."
              className={`flex-1 bg-transparent outline-none py-2.5 text-sm sm:text-base 
                          ${
                            theme === "light"
                              ? "text-light-text-primary placeholder-light-text-tertiary"
                              : "text-dark-text-primary placeholder-dark-text-tertiary"
                          }`}
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="p-2.5 sm:p-3 bg-brand-orange rounded-full hover:bg-opacity-90 transition-colors disabled:opacity-50 shadow-md hover:shadow-lg"
            disabled={isLoading || !message.trim()}
          >
            <SendIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiChatPage;
