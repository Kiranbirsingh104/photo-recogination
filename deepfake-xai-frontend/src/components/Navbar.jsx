import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();


  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-gray-700/50 dark:border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-foreground dark:text-foreground">Deepfake Detector</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 transition-colors duration-200"
            >
              {isDark ? <Sun className="w-5 h-5 text-foreground dark:text-foreground" /> : <Moon className="w-5 h-5 text-foreground dark:text-foreground" />}
            </button>
          </div>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;
