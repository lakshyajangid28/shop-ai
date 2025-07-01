import React from 'react';
import { AlertCircle, Bot, MessageCircle, ShoppingBag, Sparkles, Clock } from 'lucide-react';
import ProductCard from './ChatProductCard';

interface Product {
  image?: string;
  title?: string;
  price?: string;
  rating?: string | number;
  reason?: string;
  link?: string;
  rank?: number;
}

interface AIMessageProps {
  message: {
    intent?: string;
    error?: string;
    content: string;
    data?: Product[];
    query?: string;
    timestamp: string;
    requiresClarification?: boolean;
  };
  idx: number;
}

const AIMessage: React.FC<AIMessageProps> = ({ message, idx }) => {
  const isGreeting = message.intent === 'greeting';
  const isUnclear = message.intent === 'unclear' || message.requiresClarification;
  const isGeneralShopping = message.intent === 'general_shopping';
  const hasError = !!message.error;
  const hasProducts = message.data && message.data.length > 0;
  const hasShoppingAdvice = isGeneralShopping && message.content;

  const getMessageConfig = () => {
    if (hasError)
      return {
        icon: AlertCircle,
        label: 'Error',
        gradient: 'from-red-500 to-pink-500',
        bgGradient: 'from-red-50 to-pink-50',
      };

    if (isGreeting)
      return {
        icon: Bot,
        label: 'Welcome',
        gradient: 'from-blue-500 to-cyan-500',
        bgGradient: 'from-blue-50 to-cyan-50',
      };

    if (isUnclear)
      return {
        icon: AlertCircle,
        label: 'Clarification Needed',
        gradient: 'from-orange-500 to-yellow-500',
        bgGradient: 'from-orange-50 to-yellow-50',
      };

    if (isGeneralShopping)
      return {
        icon: ShoppingBag,
        label: 'Shopping Advice',
        gradient: 'from-yellow-500 to-orange-500',
        bgGradient: 'from-yellow-50 to-orange-50',
      };

    if (hasProducts)
      return {
        icon: Sparkles,
        label: 'Top Picks for You',
        gradient: 'from-green-500 to-emerald-500',
        bgGradient: 'from-green-50 to-emerald-50',
      };

    return {
      icon: MessageCircle,
      label: 'AI Assistant',
      gradient: 'from-purple-500 to-blue-500',
      bgGradient: 'from-purple-50 to-blue-50',
    };
  };

  const config = getMessageConfig();
  const IconComponent = config.icon;

  return (
    <div className="flex items-start gap-4 mb-8 animate-in slide-in-from-left duration-500">
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-r ${config.gradient} flex items-center justify-center shadow-lg`}
      >
        <IconComponent className="w-6 h-6 text-white" />
      </div>

      {/* Message Content */}
      <div className="flex-1 max-w-4xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-gray-800">{config.label}</span>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        {/* Error Display */}
        {hasError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="w-4 h-4" />
              <span className="font-semibold">Error:</span>
            </div>
            <p className="text-red-600 mt-1">{message.error}</p>
          </div>
        )}

        {/* Message Text */}
        <div className={`bg-gradient-to-r ${config.bgGradient} border border-gray-200 rounded-2xl p-4 mb-4 shadow-sm`}>
          <p className="text-gray-800 leading-relaxed">{message.content}</p>
        </div>

        {/* Shopping Advice Section */}
        {isGeneralShopping && hasShoppingAdvice && (
          <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 border border-yellow-200 rounded-xl p-4 mb-4 shadow-sm">
            <div className="flex items-center gap-2 text-yellow-700 font-semibold mb-2">
              <ShoppingBag className="w-4 h-4" />
              Shopping Tips
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{message.content}</p>
            {message.query && (
              <div className="mt-3 px-3 py-2 bg-yellow-100 rounded-lg text-xs">
                <strong>Related to:</strong> {message.query}
              </div>
            )}
          </div>
        )}

        {/* Product Grid */}
        {hasProducts && !isGeneralShopping && !isUnclear && !hasError && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            {message.data && Array.isArray(message.data) && message.data.map((product: Product, i: number) => (
              <ProductCard key={i} product={product} idx={i} />
            ))}
          </div>
        )}

        {/* No Products Found */}
        {!hasProducts && !isGreeting && !isUnclear && !isGeneralShopping && !hasError && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <p className="text-orange-700 text-sm">
              Sorry, I couldn't find any product recommendations for your request.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIMessage;