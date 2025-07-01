import React from 'react';
import { User, Clock } from 'lucide-react';

interface UserMessageProps {
  message: {
    content: string;
    timestamp: string;
  };
}

const UserMessage: React.FC<UserMessageProps> = ({ message }) => (
  <div className="flex items-start gap-4 mb-8 justify-end animate-in slide-in-from-right duration-500">
    <div className="flex-1 max-w-2xl">
      <div className="flex items-center gap-2 mb-2 justify-end">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <span className="font-semibold text-gray-800">You</span>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-4 shadow-lg">
        <p className="leading-relaxed">{message.content}</p>
      </div>
    </div>

    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-r from-gray-600 to-gray-800 flex items-center justify-center shadow-lg">
      <User className="w-6 h-6 text-white" />
    </div>
  </div>
);

export default UserMessage;