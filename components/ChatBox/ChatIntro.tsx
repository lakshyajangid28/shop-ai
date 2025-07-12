import { MessageCircle } from 'lucide-react';

const ChatIntro = () => (
  <div className="text-center py-16">
    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
      <MessageCircle className="w-10 h-10 text-white" />
    </div>
    <h3 className="text-2xl font-bold text-gray-800 mb-4">Start Your Conversation</h3>
    <p className="text-gray-600 mb-2">Click "Start Listening" and speak naturally</p>
    <div className="flex flex-wrap justify-center gap-2 mt-4 text-sm text-gray-500">
      <span className="bg-gray-100 px-3 py-1 rounded-full">"Find me wireless headphones"</span>
      <span className="bg-gray-100 px-3 py-1 rounded-full">"What's a good gift for mom?"</span>
      <span className="bg-gray-100 px-3 py-1 rounded-full">"I need a laptop for work"</span>
    </div>
  </div>
);

export default ChatIntro;
