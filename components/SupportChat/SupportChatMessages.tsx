import React, { useRef, useEffect } from "react";
import { User, Clock, Loader2 } from "lucide-react";
const serenityAvatar = "/images/sparkle-avatar.jpg";

const SupportChatMessages = ({ messages }: { messages: any[] }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="p-8 space-y-6 max-h-[400px] overflow-y-auto">
      {messages.map((message: any) => (
        <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
          <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
            {message.type === "support" && (
              <div className="flex items-center space-x-2 mb-2">
                <img src={serenityAvatar} alt="Serenity AI" className="w-8 h-8 rounded-full border-2 border-purple-300 shadow" />
                <span className="text-sm font-semibold text-purple-700">Support Assistant</span>
              </div>
            )}
            {message.type === "user" && (
              <div className="flex items-center space-x-2 mb-2 justify-end">
                <span className="text-sm font-semibold text-gray-700">You</span>
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </div>
            )}
            <div className={`p-4 rounded-2xl shadow ${message.type === "user"
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
              : message.error
                ? "bg-red-50 border border-red-200 text-red-800"
                : "bg-gray-50 border border-gray-100 text-gray-900"
              }`}>
              {message.image && (
                <img src={message.image} alt="Uploaded" className="w-full max-w-xs rounded-lg mb-3" />
              )}
              {message.isLoading ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Analyzing your request...</span>
                </div>
              ) : (
                <p className="text-base leading-relaxed whitespace-pre-line">{message.content}</p>
              )}
              <div className="flex items-center justify-end mt-2">
                <p className={`text-xs ${message.type === "user" ? "text-white/70" : "text-gray-500"}`}>
                  <Clock className="h-3 w-3 inline mr-1" />
                  {message.timestamp}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default SupportChatMessages;