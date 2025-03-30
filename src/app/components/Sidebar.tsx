'use client';

import { useUser } from '../context/UserContext';
import { getDeviceEmojis } from '../utils/deviceEmojis';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { buttonHover, buttonTap } from '../utils/animations';

interface SidebarProps {
  onClose: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const { user, logout } = useUser();
  const [emojis, setEmojis] = useState(getDeviceEmojis());

  useEffect(() => {
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
    <div className="h-full bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        <div className="flex items-center space-x-2 p-4 border-b border-gray-200">
          <span className="text-2xl" role="img" aria-label="Home">{emojis.home}</span>
          <h1 className="text-xl font-bold text-gray-900">TwitDupe</h1>
        </div>

        <nav className="flex-1 p-4" role="navigation" aria-label="Main navigation">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  onClick={onClose}
                >
                  <span role="img" aria-label={item.label} className="text-xl">{item.emoji}</span>
                  <span className="font-medium text-gray-900">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {user && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={user.image || ''}
                alt={`${user.name || 'User'}'s avatar`}
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-gray-900 truncate">{user.name || 'Anonymous'}</p>
                <p className="text-xs text-gray-500">@{user.name?.toLowerCase().replace(/\s+/g, '') || 'anonymous'}</p>
              </div>
            </div>
            <motion.button
              whileHover={buttonHover}
              whileTap={buttonTap}
              onClick={logout}
              className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg w-full transition-colors duration-200"
              aria-label="Logout"
            >
              <span role="img" aria-label="Logout" className="text-xl">{emojis.logout}</span>
              <span className="font-medium text-gray-900">Logout</span>
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
} 