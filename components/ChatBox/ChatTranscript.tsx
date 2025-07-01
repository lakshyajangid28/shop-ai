import React from 'react';
import { Mic } from 'lucide-react';

interface ChatTranscriptProps {
  transcript: string;
}

const ChatTranscript: React.FC<ChatTranscriptProps> = ({ transcript }) => {
  if (!transcript) return null;

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6 mb-8 shadow-lg animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl">
          <Mic className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-yellow-800">Live Transcription</h3>
          <p className="text-xs text-yellow-600">Currently listening...</p>
        </div>
        <div className="ml-auto">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse delay-75" />
            <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse delay-150" />
          </div>
        </div>
      </div>
      <div className="bg-white/70 rounded-xl p-4 text-gray-800 leading-relaxed">
        {transcript}
      </div>
    </div>
  );
};

export default ChatTranscript;