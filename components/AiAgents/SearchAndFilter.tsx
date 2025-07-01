import React from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { FilterOptions, Specialty } from '@/types/shopping-assitants';
import { specialties } from '@/data/shopping-assitants';

interface SearchAndFilterProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  filters,
  onFiltersChange
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      search: e.target.value
    });
  };

  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      specialty: e.target.value
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8 max-w-4xl mx-auto w-full">
      {/* Search Input */}
      <div className="relative flex-1 w-full md:max-w-2xl">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search assistants by name or specialty..."
          value={filters.search}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 bg-white py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-700 placeholder-gray-400 text-base md:text-lg"
        />
      </div>

      {/* Specialty Filter */}
      <div className="relative min-w-[220px]">
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        <select
          value={filters.specialty}
          onChange={handleSpecialtyChange}
          className="appearance-none bg-white border border-gray-200 rounded-lg pl-10 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-700 min-w-[220px] text-base md:text-lg cursor-pointer"
        >
          {specialties.map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};