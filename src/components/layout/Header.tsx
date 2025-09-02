import React from 'react';
import { 
  Search, 
  Bell, 
  HelpCircle,
  ChevronDown,
  Menu
} from 'lucide-react';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuClick }) => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
      <div className="flex items-center">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 mr-2 text-gray-600 hover:text-gray-900 lg:hidden"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 lg:w-64"
          />
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <button className="relative text-gray-600 hover:text-gray-900">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              3
            </span>
          </button>
          
          <button className="text-gray-600 hover:text-gray-900 hidden md:block">
            <HelpCircle size={20} />
          </button>
          
          <div className="flex items-center">
            <img
              src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150"
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
            <ChevronDown size={16} className="ml-1 text-gray-500 hidden md:block" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;