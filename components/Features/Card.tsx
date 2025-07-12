// components/ui/Card.tsx
import React from 'react';

export const Card = ({ className = '', children }: { className?: string; children: React.ReactNode }) => {
  return (
    <div className={`rounded-2xl bg-white ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ className = '', children }: { className?: string; children: React.ReactNode }) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};
