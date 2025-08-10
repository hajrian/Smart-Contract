import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  Shield, 
  Search, 
  AlertTriangle, 
  BarChart3, 
  Settings, 
  FileText,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from '../lib/supabase';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Layout: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Smart Contract Audit', href: '/audit', icon: Shield },
    { name: 'On-Chain Analysis', href: '/analysis', icon: Search },
    { name: 'Risk Alerts', href: '/alerts', icon: AlertTriangle },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Error signing out');
    } else {
      toast.success('Signed out successfully');
    }
  };

  return (
    <div className="h-screen bg-gray-900 flex overflow-hidden">
      {/* Mobile sidebar */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 lg:hidden"
      >
        <div className="flex items-center justify-between h-16 px-6 bg-gray-900">
          <div className="flex items-center">
            <img src="/logo.svg" alt="HajrShield" className="mr-2 h-6 w-6" />
            <h1 className="text-xl font-bold text-white">HajrShield</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="mt-8">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white border-r-2 border-blue-400'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </motion.div>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-gray-800">
        <div className="flex items-center h-16 px-6 bg-gray-900">
          <img src="/logo.svg" alt="HajrShield" className="mr-2 h-8 w-8" />
          <h1 className="text-xl font-bold text-white">HajrShield</h1>
        </div>
        <nav className="mt-8 flex-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white border-r-2 border-blue-400'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{user?.email}</p>
              <p className="text-xs text-gray-400">Security Analyst</p>
            </div>
            <button
              onClick={handleSignOut}
              className="text-gray-400 hover:text-white"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1 overflow-hidden">
        <header className="bg-gray-800 border-b border-gray-700">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-400 hover:text-white lg:hidden"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search contracts, addresses..."
                  className="w-80 pl-10 pr-4 py-2 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hidden md:block"
                />
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;