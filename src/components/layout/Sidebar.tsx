import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  LogOut,
  PlusCircle,
  X,
  UserCircle
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Projects', path: '/projects', icon: <Briefcase size={20} /> },
    { name: 'Team', path: '/team', icon: <Users size={20} /> },
    { name: 'Schedule', path: '/schedule', icon: <Calendar size={20} /> },
    { name: 'Reports', path: '/reports', icon: <BarChart3 size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    // TODO: Implement actual logout logic
    navigate('/login');
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      <aside 
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 w-64 shadow-sm transform transition-transform duration-300 ease-in-out lg:relative lg:transform-none ${
          isOpen ? 'translate-x-0 z-50' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-600">ProjectFlow</h1>
          <button 
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-900 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <NavLink 
            to="/projects/new" 
            className="flex items-center justify-center w-full gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            <PlusCircle size={18} />
            <span>New Project</span>
          </NavLink>
        </div>
        
        <nav className="mt-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
                }`
              }
              onClick={() => onClose()}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="absolute bottom-0 w-full border-t border-gray-200">
          <NavLink 
            to="/profile"
            className={({ isActive }) =>
              `flex items-center p-4 hover:bg-gray-100 transition-colors ${
                isActive ? 'bg-blue-50' : ''
              }`
            }
          >
            <img
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150"
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Emma Rodriguez</p>
              <p className="text-xs text-gray-500">Project Manager</p>
            </div>
          </NavLink>
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;