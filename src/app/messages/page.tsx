'use client';

import Sidebar from '../components/Sidebar';

export default function MessagesPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Messages</h2>
            </div>
            <div className="p-4">
              <p className="text-gray-500">Direct messaging coming soon...</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 