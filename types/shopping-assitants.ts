export interface ShoppingAssistant {
  id: string;
  name: string;
  title: string;
  category: string;
  rating: number;
  reviewCount: number;
  description: string;
  expertise: string[];
  voiceStyle: string;
  avatar: string;
}

export interface FilterOptions {
  search: string;
  specialty: string;
}

export type Specialty = 'All Specialties' | 'Weddings' | 'Birthdays' | 'Corporate';