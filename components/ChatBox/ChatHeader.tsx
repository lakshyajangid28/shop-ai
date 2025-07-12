import { ShoppingBag } from 'lucide-react';

const ChatHeader = () => (
  <div className="container mx-auto px-6 py-8 text-center">
    <div className="flex items-center justify-center gap-3 mb-2">
      <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
        <ShoppingBag className="w-7 h-7 text-white" />
      </div>
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        AI Shopping Assistant
      </h1>
    </div>
    <p className="text-lg text-gray-700 max-w-2xl mx-auto">
      Speak naturally to get personalized product recommendations and shopping advice
    </p>
  </div>
);

export default ChatHeader;