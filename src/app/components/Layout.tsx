'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '../context/UserContext';
import { AnimatePresence, motion } from 'framer-motion';
import { getDeviceEmoji } from '../utils/deviceEmoji';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [deviceEmoji, setDeviceEmoji] = useState('💻');
  const pathname = usePathname();
  const { user } = useUser();

  useEffect(() => {
    setDeviceEmoji(getDeviceEmoji());
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navigation = [
    { name: 'Home', href: '/', emoji: '🏠' },
    { name: 'Search', href: '/search', emoji: '🔍' },
    { name: 'Messages', href: '/messages', emoji: '💬' },
    { name: 'Notifications', href: '/notifications', emoji: '🔔' },
    { name: 'Profile', href: '/profile', emoji: '👤' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md lg:hidden"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isSidebarOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            />
            {/* Sidebar */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 lg:translate-x-0 lg:static"
            >
              <div className="flex flex-col h-full">
                <div className="p-4 border-b">
                  <h1 className="text-xl font-bold">TwitDupe</h1>
                </div>
                <nav className="flex-1 p-4">
                  <ul className="space-y-2">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                            pathname === item.href
                              ? 'bg-blue-50 text-blue-600'
                              : 'hover:bg-gray-100'
                          }`}
                          onClick={() => setIsSidebarOpen(false)}
                        >
                          <span>{item.emoji}</span>
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="p-4 border-t">
                  {user ? (
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">@{user.name.toLowerCase().replace(/\s+/g, '')}</p>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        const event = new CustomEvent('showProfileModal');
                        window.dispatchEvent(event);
                      }}
                      className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Sign In
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="lg:ml-64 p-4">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
} 