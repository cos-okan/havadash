'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminHeader() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm h-16 fixed w-full top-0 z-50 lg:left-64 lg:w-[calc(100%-16rem)]">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center space-x-4"></div>

        {/* Right side - Search and user menu */}
        <div className="flex items-center space-x-4">
          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 py-2 px-4 rounded-lg text-black border border-gray-200 hover:bg-[var(--havadash-blue-light)] hover:text-white">
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">{user?.email}</p>
              </div>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Profile dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg py-1 z-50 ">
                <Link href="/dashboard/profile" className="block px-4 py-2 text-sm text-black hover:bg-[var(--havadash-blue-light)] hover:text-white">
                  Profil
                </Link>
                <Link href="/dashboard/settings" className="block px-4 py-2 text-sm text-black hover:bg-[var(--havadash-blue-light)] hover:text-white">
                  Ayarlar
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setShowProfileMenu(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-[var(--havadash-blue-light)] hover:text-white">
                  Çıkış Yap
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
