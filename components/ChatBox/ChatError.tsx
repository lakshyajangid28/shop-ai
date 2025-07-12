import { AlertCircle } from 'lucide-react';

const ChatError = ({ message }: { message?: string }) => (
  <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-8 shadow-lg animate-in fade-in duration-500">
    <div className="flex items-center gap-3">
      <AlertCircle className="w-6 h-6 text-red-500" />
      <div>
        <h3 className="font-semibold text-red-800">Error</h3>
        <p className="text-red-600">
          {message || "Your browser doesn't support speech recognition. Use Chrome, Edge, or Safari."}
        </p>
      </div>
    </div>
  </div>
);

export default ChatError;
