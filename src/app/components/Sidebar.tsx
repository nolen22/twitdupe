'use client';

import { useUser } from '../context/UserContext';
import { getDeviceEmojis } from '../utils/deviceEmojis';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { buttonHover, buttonTap } from '../utils/animations';

export default function Sidebar() {
  const { user, logout } = useUser();
  const [emojis, setEmojis] = useState(getDeviceEmojis());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Update emojis when the component mounts
    setEmojis(getDeviceEmojis());
  }, []);

  const navItems = [
    { href: '/', label: 'Home', emoji: emojis.home },
    { href: '/search', label: 'Search', emoji: emojis.search },
    { href: '/notifications', label: 'Notifications', emoji: emojis.notifications },
    { href: '/messages', label: 'Messages', emoji: emojis.messages },
    { href: '/profile', label: 'Profile', emoji: emojis.profile },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
        aria-label="Toggle menu"
      >
        <span className="text-2xl">{emojis.menu}</span>
      </button>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isMobileMenuOpen ? 0 : -300 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 p-4 transform transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center space-x-2 mb-8">
            <span className="text-2xl" role="img" aria-label="Home">{emojis.home}</span>
            <h1 className="text-xl font-bold text-gray-900">TwitDupe</h1>
          </div>

          <nav className="flex-1" role="navigation" aria-label="Main navigation">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span role="img" aria-label={item.label}>{item.emoji}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto">
            <motion.button
              whileHover={buttonHover}
              whileTap={buttonTap}
              onClick={logout}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg w-full transition-colors duration-200"
              aria-label="Logout"
            >
              <span role="img" aria-label="Logout">{emojis.logout}</span>
              <span>Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
} 