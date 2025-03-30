'use client';

import { useUser } from '../context/UserContext';
import { getDeviceEmojis } from '../utils/deviceEmojis';
import { useState, useEffect } from 'react';

export default function Sidebar() {
  const { user, logout } = useUser();
  const [emojis, setEmojis] = useState(getDeviceEmojis());

  useEffect(() => {
    // Update emojis when the component mounts
    setEmojis(getDeviceEmojis());
  }, []);

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 p-4">
      <div className="flex flex-col h-full">
        <div className="flex items-center space-x-2 mb-8">
          <span className="text-2xl">{emojis.home}</span>
          <h1 className="text-xl font-bold text-gray-900">TwitDupe</h1>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <a href="/" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                <span>{emojis.home}</span>
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="/search" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                <span>{emojis.search}</span>
                <span>Search</span>
              </a>
            </li>
            <li>
              <a href="/notifications" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                <span>{emojis.notifications}</span>
                <span>Notifications</span>
              </a>
            </li>
            <li>
              <a href="/messages" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                <span>{emojis.messages}</span>
                <span>Messages</span>
              </a>
            </li>
            <li>
              <a href="/profile" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                <span>{emojis.profile}</span>
                <span>Profile</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="mt-auto">
          <button
            onClick={logout}
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg w-full"
          >
            <span>{emojis.logout}</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
} 