import { ShoppingAssistant } from "@/types/shopping-assitants";

export const shoppingAssistants: ShoppingAssistant[] = [
  {
    id: 'serenity',
    name: 'Serenity',
    title: 'Shopping Assistant',
    category: 'Shopping',
    description: 'I help you find the perfect products and deals for your needs with elegance and attention to every detail.',
    expertise: ['Product search', 'shopping advice', 'recommendations'],
    avatar: '/images/serenity-avatar.jpg'
  },
  {
    id: 'sparkle',
    name: 'Sparkle',
    title: 'Customer Support Assistant',
    category: 'Support',
    description: 'I help you with your orders, returns, and any customer support needs you have.',
    expertise: ['Order help', 'customer support'],
    avatar: '/images/sparkle-avatar.jpg'
  }
];

export const specialties = ['All Specialties', 'Shopping', 'Support'] as const;