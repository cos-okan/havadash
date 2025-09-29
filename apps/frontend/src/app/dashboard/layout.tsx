'use client';

import { useState } from 'react';
import AdminHeader from '@/components/layout/AdminHeader';
import Sidebar from '@/components/layout/Sidebar';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        {/* Admin Header */}
        <AdminHeader />

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="pt-16 lg:pl-64 transition-all duration-300 ease-in-out">
          <div className="min-h-screen">{children}</div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
