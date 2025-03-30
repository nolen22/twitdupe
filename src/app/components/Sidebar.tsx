'use client';

import { useUser } from '../context/UserContext';
import Link from 'next/link';

export default function Sidebar() {
  const { user } = useUser();

  const navItems = [
    { icon: '🏠', label: 'Home', href: '/' },
    { icon: '🔍', label: 'Search', href: '/search' },
    { icon: '🔔', label: 'Notifications', href: '/notifications' },
    { icon: '💬', label: 'Messages', href: '/messages' },
    { icon: '👤', label: 'Profile', href: '/profile' },
  ];

  return (
    <div className="w-64 min-h-screen bg-gray-50 border-r border-gray-200 p-4 flex flex-col">
      <div className="flex-1">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">TwitDupe</h1>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center space-x-4 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <button className="w-full mt-4 bg-blue-500 text-white px-4 py-3 rounded-full font-bold hover:bg-blue-600 transition-colors">
          New Thread
        </button>
      </div>

      {user && (
        <div className="mt-auto p-4 bg-white rounded-full flex items-center space-x-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-10 w-10 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500">@{user.name.toLowerCase().replace(/\s+/g, '')}</p>
          </div>
        </div>
      )}
    </div>
  );
} 