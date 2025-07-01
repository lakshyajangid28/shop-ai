// data/shopping-assistants.ts

import { ShoppingAssistant } from "@/types/shopping-assitants";

export const shoppingAssistants: ShoppingAssistant[] = [
  {
    id: 'serenity',
    name: 'Serenity',
    title: 'Wedding Shopping Expert',
    category: 'Weddings',
    rating: 4.9,
    reviewCount: 234,
    description: 'I help you find the perfect wedding essentials with elegance and attention to every detail.',
    expertise: ['Wedding dresses', 'decorations', 'jewelry'],
    voiceStyle: 'Warm, calming, professional',
    avatar: '/images/serenity-avatar.jpg'
  },
  {
    id: 'sparkle',
    name: 'Sparkle',
    title: 'Party Shopping Guru',
    category: 'Birthdays',
    rating: 4.8,
    reviewCount: 189,
    description: 'I bring the fun to birthday shopping with creative gift ideas and party essentials.',
    expertise: ['Party supplies', 'gifts', 'decorations'],
    voiceStyle: 'Upbeat, enthusiastic, friendly',
    avatar: '/images/sparkle-avatar.jpg'
  },
  {
    id: 'executive',
    name: 'Executive',
    title: 'Corporate Shopping Pro',
    category: 'Corporate',
    rating: 4.9,
    reviewCount: 156,
    description: 'I help you find professional corporate gifts and event supplies that make an impression.',
    expertise: ['Corporate gifts', 'office supplies', 'event items'],
    voiceStyle: 'Authoritative, clear, confident',
    avatar: '/images/executive-avatar.jpg'
  }
];

export const specialties = ['All Specialties', 'Weddings', 'Birthdays', 'Corporate'] as const;