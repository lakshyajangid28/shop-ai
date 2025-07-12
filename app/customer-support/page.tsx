"use client";
import React from "react";
import useSupportChat from "@/components/SupportChat/useSupportChat";
import SupportChatHeader from "@/components/SupportChat/SupportChatHeader";
import SupportChatMessages from "@/components/SupportChat/SupportChatMessages";
import SupportChatInput from "@/components/SupportChat/SupportChatInput";

const CustomerSupport = () => {
  const chat = useSupportChat();
  return (
    <div className="flex flex-col items-center pt-8">
      {/* Header Section */}
      <div className="w-full max-w-5xl mx-auto mb-8">
        <SupportChatHeader />
      </div>
      {/* Chat Card */}
      <div className="w-full max-w-5xl mx-auto">
        <div className="rounded-3xl shadow-2xl bg-white border border-gray-200 p-0 flex flex-col">
          <SupportChatMessages messages={chat.messages} />
          <div className="border-t border-gray-100" />
          <SupportChatInput {...chat} />
        </div>
      </div>
      <br /><br />
    </div>
  );
};

export default CustomerSupport;
