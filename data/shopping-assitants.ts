import { ShoppingAssistant } from "@/types/shopping-assitants";

export const shoppingAssistants: ShoppingAssistant[] = [
  {
    id: 'serenity',
    name: 'Serenity',
    title: 'Shopping Assistant',
    category: 'Shopping',
    rating: 4.9,
    reviewCount: 234,
    description: 'I help you find the perfect products and deals for your needs with elegance and attention to every detail.',
    expertise: ['Product search', 'shopping advice', 'recommendations'],
    voiceStyle: 'Warm, calming, professional',
    avatar: '/images/serenity-avatar.jpg'
  },
  {
    id: 'executive',
    name: 'Executive',
    title: 'Customer Support Assistant',
    category: 'Support',
    rating: 4.9,
    reviewCount: 156,
    description: 'I help you with your orders, returns, and any customer support needs you have.',
    expertise: ['Order help', 'returns', 'customer support'],
    voiceStyle: 'Authoritative, clear, confident',
    avatar: '/images/executive-avatar.jpg'
  }
];

export const specialties = ['All Specialties', 'Shopping', 'Support'] as const;