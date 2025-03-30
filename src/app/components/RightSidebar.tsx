'use client';

export default function RightSidebar() {
  const trendingTopics = [
    { tag: '#NextJS', tweets: '12.5K' },
    { tag: '#WebDev', tweets: '8.2K' },
    { tag: '#React', tweets: '6.7K' },
    { tag: '#TypeScript', tweets: '5.3K' },
    { tag: '#TailwindCSS', tweets: '4.1K' },
  ];

  const suggestedUsers = [
    { name: 'John Doe', handle: '@johndoe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
    { name: 'Jane Smith', handle: '@janesmith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
    { name: 'Mike Johnson', handle: '@mikej', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
  ];

  return (
    <div className="w-80 min-h-screen bg-gray-50 border-l border-gray-200 p-4">
      <div className="sticky top-4">
        <div className="bg-white rounded-xl p-4 mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Trending Topics</h2>
          <div className="space-y-4">
            {trendingTopics.map((topic) => (
              <div key={topic.tag} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{topic.tag}</p>
                  <p className="text-sm text-gray-500">{topic.tweets} tweets</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Who to Follow</h2>
          <div className="space-y-4">
            {suggestedUsers.map((user) => (
              <div key={user.handle} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.handle}</p>
                  </div>
                </div>
                <button className="px-4 py-1 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 