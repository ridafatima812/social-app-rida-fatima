import React from 'react';
import { Outlet, NavLink, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Settings, PenSquare, ChevronRight } from 'lucide-react';
import { cn } from '../ui/Button';

const DashboardLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { to: '/dashboard/posts', icon: <LayoutDashboard className="w-5 h-5" />, label: 'My Posts' },
    { to: '/dashboard/create', icon: <PenSquare className="w-5 h-5" />, label: 'Create Post' },
    { to: '/dashboard/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ];

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col md:flex-row max-w-7xl mx-auto w-full gap-8 p-4 md:p-8 animate-fade-in">
      {/* Sidebar */}
      <aside className="w-full md:w-72 shrink-0">
        <div className="bg-coffee-side rounded-2xl border border-coffee-border shadow-sm p-4 sticky top-28">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-brown-400 dark:text-dbrown-400 mb-4 px-3">
            Menu
          </h2>
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => cn(
                  "group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300",
                  isActive 
                    ? "bg-gradient-to-r from-brown-800 to-brown-600 text-white shadow-md shadow-brown-800/20 dark:from-dbrown-300 dark:to-dbrown-400 dark:text-dbrown-900" 
                    : "text-brown-700 hover:bg-brown-50 dark:text-dbrown-50 dark:hover:bg-dbrown-800"
                )}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {item.label}
                </div>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full min-w-0 pb-16">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
