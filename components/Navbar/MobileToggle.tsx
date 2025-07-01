// components/Navbar/MobileToggle.tsx
import { Menu, X } from 'lucide-react';

interface MobileToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

const MobileToggle = ({ isOpen, onClick }: MobileToggleProps) => (
  <div className="md:hidden">
    <button
      onClick={onClick}
      className="p-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300"
    >
      {isOpen ? (
        <X className="w-6 h-6 rotate-180 transition-transform duration-300" />
      ) : (
        <Menu className="w-6 h-6" />
      )}
    </button>
  </div>
);

export default MobileToggle;
