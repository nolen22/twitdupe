'use client';

import { useUser } from '../context/UserContext';
import Layout from '../components/Layout';

export default function ProfilePage() {
  const { user } = useUser();

  if (!user) {
    return (
      <Layout>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">Please sign in to view your profile.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <img
              src={user.image || ''}
              alt={`${user.name || 'User'}'s avatar`}
              className="h-16 w-16 rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user.name || 'Anonymous'}</h2>
              <p className="text-gray-500">@{user.name?.toLowerCase().replace(/\s+/g, '') || 'anonymous'}</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="font-bold text-gray-900">0</p>
              <p className="text-gray-500">Threads</p>
            </div>
            <div>
              <p className="font-bold text-gray-900">0</p>
              <p className="text-gray-500">Following</p>
            </div>
            <div>
              <p className="font-bold text-gray-900">0</p>
              <p className="text-gray-500">Followers</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 