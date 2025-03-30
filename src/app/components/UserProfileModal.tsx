'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';

export default function UserProfileModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const handleShowModal = () => setIsOpen(true);
    window.addEventListener('showProfileModal', handleShowModal);
    return () => window.removeEventListener('showProfileModal', handleShowModal);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const result = await signIn('credentials', {
        name: name.trim(),
        redirect: false,
      });

      if (result?.error) {
        console.error('Sign in error:', result.error);
        return;
      }

      setIsOpen(false);
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl p-6 w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Welcome to Threads</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Set up your profile to start posting and interacting with threads.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Display Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 