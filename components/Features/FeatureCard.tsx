// components/FeatureCard.tsx
import React from 'react';
import { Card, CardContent } from './Card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, color }) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden">
      <CardContent className="p-8">
        <div className={`w-16 h-16 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
