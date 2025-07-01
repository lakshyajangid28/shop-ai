import React from 'react';
import { Mic, Send, Square, RotateCcw, Trash2 } from 'lucide-react';

interface ChatControlsProps {
  transcript: string;
  isLoading: boolean;
  isListening: boolean;
  onSend: () => void;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onClear: () => void;
}

const ChatControls: React.FC<ChatControlsProps> = ({ transcript, isLoading, isListening, onSend, onStart, onStop, onReset, onClear }) => {
  return (
    <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl p-6 shadow-2xl mb-8">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Send Button */}
        <button
          onClick={onSend}
          disabled={!transcript.trim() || isLoading}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl disabled:cursor-not-allowed min-w-[120px] justify-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send
            </>
          )}
        </button>

        {/* Mic Button */}
        <button
          onClick={isListening ? onStop : onStart}
          className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-w-[140px] justify-center ${
            isListening
              ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white animate-pulse'
              : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
          }`}
        >
          {isListening ? (
            <>
              <Square className="w-4 h-4" />
              Stop Listening
            </>
          ) : (
            <>
              <Mic className="w-4 h-4" />
              Start Listening
            </>
          )}
        </button>

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>

        {/* Clear History Button */}
        <button
          onClick={onClear}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </button>
      </div>
    </div>
  );
};

export default ChatControls;