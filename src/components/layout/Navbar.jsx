import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import { Moon, Sun, LayoutDashboard, LogOut, Bell, Coffee } from 'lucide-react';

const Navbar = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-coffee-border bg-coffee-nav/80 backdrop-blur-lg transition-colors duration-300">
      <div className="container mx-auto flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-brown-800 dark:text-dbrown-300 hover:opacity-80 transition-opacity">
            <Coffee className="w-8 h-8" />
            <span className="hidden sm:inline-block">SocialApp</span>
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 rounded-full px-4 py-2 border border-coffee-border bg-coffee-sec hover:bg-coffee-border/50 text-coffee-text transition-all duration-300 hover:scale-105 shadow-sm"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'light' ? (
              <>
                <Moon className="h-5 w-5 transition-transform duration-300" />
                <span className="text-sm font-semibold transition-colors duration-300">Light</span>
              </>
            ) : (
              <>
                <Sun className="h-5 w-5 transition-transform duration-300" />
                <span className="text-sm font-semibold transition-colors duration-300">Dark</span>
              </>
            )}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3 sm:gap-5">
              <button className="relative rounded-full p-2.5 text-brown-600 hover:bg-white dark:text-dbrown-400 dark:hover:bg-dbrown-800 transition-all hover:scale-105 shadow-sm border border-transparent hover:border-brown-100 dark:hover:border-dbrown-700 hidden sm:block">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-dbrown-900"></span>
              </button>

              <Link to="/dashboard/posts" className="hidden sm:block">
                <Button variant="secondary" size="sm" className="shadow-sm">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              
              <div className="relative group">
                <Link to={`/profile/${currentUser.id}`}>
                  <Avatar src={currentUser.avatar} name={currentUser.name} size="md" className="cursor-pointer" />
                </Link>
                <div className="absolute right-0 mt-3 w-56 origin-top-right rounded-xl bg-white shadow-xl border border-brown-100 dark:border-dbrown-800 dark:bg-dbrown-700 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  <div className="p-2 space-y-1">
                    <div className="px-3 py-2 border-b border-brown-100 dark:border-dbrown-800 mb-1">
                      <p className="text-sm font-semibold text-brown-900 dark:text-dbrown-50 truncate">{currentUser.name}</p>
                      <p className="text-xs text-brown-600 dark:text-dbrown-400 truncate">{currentUser.email}</p>
                    </div>
                    <Link to="/dashboard/posts" className="block px-3 py-2 text-sm rounded-lg text-brown-800 hover:bg-brown-50 dark:text-dbrown-50 dark:hover:bg-dbrown-800 sm:hidden">
                      Dashboard
                    </Link>
                    <Link to={`/profile/${currentUser.id}`} className="block px-3 py-2 text-sm rounded-lg text-brown-800 hover:bg-brown-50 dark:text-dbrown-50 dark:hover:bg-dbrown-800">
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-3 py-2 text-sm rounded-lg text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Sign out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm" className="shadow-md shadow-brown-800/20">Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
