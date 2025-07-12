import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingAssistant } from '@/types/shopping-assitants';
import { Brain } from 'lucide-react';

interface AssistantCardProps {
  assistant: ShoppingAssistant;
  onStartShopping: (assistantId: string) => void;
}

export const AssistantCard: React.FC<AssistantCardProps> = ({  assistant, onStartShopping }) => {

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Shopping':
        return 'bg-green-100 text-green-800';
      case 'Support':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="flex justify-center items-center mb-4">
        <div className="relative">
          <div className="w-40 h-40 rounded-full overflow-hidden relative border-4 border-purple-200">
            <Image
              src={assistant.avatar}
              alt={`${assistant.name} avatar`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Name and Title */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{assistant.name}</h3>
        <p className="text-purple-600 font-medium mb-3">{assistant.title}</p>

        {/* Category Badge */}
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(assistant.category)}`}>
          {assistant.category}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-center text-sm mb-6 leading-relaxed">
        {assistant.description}
      </p>

      {/* Expertise */}
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Brain className="w-4 h-4 text-purple-600 mr-2" />
          <span className="text-sm font-medium text-gray-700">Expertise:</span>
        </div>
        <p className="text-sm text-gray-600 ml-6">
          {assistant.expertise.join(', ')}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => onStartShopping(assistant.id)}
          className="w-full cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
        >
          Start Shopping with {assistant.name}
        </button>
      </div>
    </div>
  );
};