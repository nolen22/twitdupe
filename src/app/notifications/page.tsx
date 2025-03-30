'use client';

import Layout from '../components/Layout';

export default function NotificationsPage() {
  return (
    <Layout>
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
        </div>
        <div className="p-4">
          <p className="text-gray-500">No new notifications</p>
        </div>
      </div>
    </Layout>
  );
} 