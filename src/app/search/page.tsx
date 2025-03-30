'use client';

import { useState } from 'react';
import Layout from '../components/Layout';
import { useUser } from '../context/UserContext';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useUser();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Search Users</h1>
          <p className="text-gray-600 dark:text-gray-400">Find and connect with other users</p>
        </div>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by username or name..."
              className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </form>

        <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Suggested Users</h2>
          <div className="space-y-4">
            {[
              { name: 'John Doe', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
              { name: 'Jane Smith', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
              { name: 'Mike Johnson', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
            ].map((user) => (
              <div key={user.name} className="flex items-center space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors">
                <img
                  src={user.image}
                  alt={`${user.name}'s avatar`}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                  <p className="text-sm text-gray-500">@{user.name.toLowerCase().replace(/\s+/g, '')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
} 