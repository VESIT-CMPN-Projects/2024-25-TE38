
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Building, Mail, MessageSquare, Settings, LogOut, FileText, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const SidebarLink = ({ 
  to, 
  icon: Icon, 
  children, 
  isActive 
}: { 
  to: string; 
  icon: React.ElementType; 
  children: React.ReactNode;
  isActive: boolean;
}) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive 
          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{children}</span>
    </Link>
  );
};

export function Sidebar() {
  const { pathname } = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };
  
  return (
    <div className="h-screen bg-sidebar sticky top-0 w-64 border-r flex flex-col">
      <div className="p-4 flex items-center gap-2 border-b">
        <div className="bg-white p-1 rounded">
          <img 
            src="/lovable-uploads/4dfc8aad-3b4d-43b9-b234-d769143e643c.png" 
            alt="PlaceNext Logo" 
            className="h-8 w-8"
          />
        </div>
        <span className="text-sidebar-foreground font-bold text-xl">PlaceNext</span>
      </div>

      <div className="flex-1 overflow-auto py-4 px-3 space-y-2">
        <SidebarLink to="/" icon={BarChart3} isActive={isActive('/')}>
          Dashboard
        </SidebarLink>
        <SidebarLink to="/job-postings" icon={FileText} isActive={isActive('/job-postings')}>
          Job Postings
        </SidebarLink>
        <SidebarLink to="/hiring-rounds" icon={Users} isActive={isActive('/hiring-rounds')}>
          Hiring Rounds
        </SidebarLink>
        <SidebarLink to="/selected-students" icon={FileText} isActive={isActive('/selected-students')}>
          Selected Students
        </SidebarLink>
        <SidebarLink to="/emails" icon={Mail} isActive={isActive('/emails')}>
          Email Templates
        </SidebarLink>
        <SidebarLink to="/profile" icon={Building} isActive={isActive('/profile')}>
          Company Profile
        </SidebarLink>
        <SidebarLink to="/messages" icon={MessageSquare} isActive={isActive('/messages')}>
          Messages
        </SidebarLink>
        <SidebarLink to="/settings" icon={Settings} isActive={isActive('/settings')}>
          Settings
        </SidebarLink>
      </div>

      <div className="p-4 border-t">
        <button 
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
