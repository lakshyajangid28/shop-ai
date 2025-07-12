export interface ShoppingAssistant {
  id: string;
  name: string;
  title: string;
  category: string;
  description: string;
  expertise: string[];
  avatar: string;
}

export interface FilterOptions {
  search: string;
  specialty: string;
}

export type Specialty = 'All Specialties' | 'Weddings' | 'Birthdays' | 'Corporate';