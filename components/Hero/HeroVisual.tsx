import { Mic } from "lucide-react";

const HeroVisual = () => (
  <div className="relative">
    <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
      <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl p-6 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
            <Mic className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="font-medium text-gray-900">AI Assistant</div>
            <div className="text-sm text-gray-600">Online</div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <p className="text-sm text-gray-700">"Show me wireless headphones under $200"</p>
          </div>
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-3">
            <p className="text-sm">I found 15 great options! Here are the top 3 based on reviews...</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="w-full h-24 bg-gradient-to-br from-purple-200 to-blue-200 rounded-lg mb-2"></div>
          <div className="text-sm font-medium">Wireless Headphones</div>
          <div className="text-xs text-gray-600">$179.99</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="w-full h-24 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-lg mb-2"></div>
          <div className="text-sm font-medium">Smart Watch</div>
          <div className="text-xs text-gray-600">$299.99</div>
        </div>
      </div>
    </div>

    {/* Floating Elements */}
    <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-20 animate-pulse"></div>
    <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-20 animate-pulse delay-75"></div>
  </div>
);

export default HeroVisual;
