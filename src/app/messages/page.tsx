'use client';

import Layout from '../components/Layout';

export default function MessagesPage() {
  return (
    <Layout>
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Messages</h2>
        </div>
        <div className="p-4">
          <p className="text-gray-500">Direct messaging coming soon...</p>
        </div>
      </div>
    </Layout>
  );
} 