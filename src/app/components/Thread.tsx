interface Thread {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  createdAt: string;
  likes: number;
  replies: Thread[];
}

export default function Thread({ thread }: { thread: Thread }) {
  return (
    <div className="border-b border-gray-200 p-4">
      <div className="flex items-start space-x-3">
        <img
          src={thread.authorImage}
          alt={thread.authorName}
          className="h-10 w-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h4 className="font-bold">{thread.authorName}</h4>
            <span className="text-gray-500 text-sm">
              {new Date(thread.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="mt-1">{thread.content}</p>
          <div className="mt-2 flex items-center space-x-4">
            <button className="text-gray-500 hover:text-red-500">
              ❤️ {thread.likes}
            </button>
            <button className="text-gray-500 hover:text-blue-500">
              💬 {thread.replies.length}
            </button>
            <button className="text-gray-500 hover:text-green-500">
              🔄 Repost
            </button>
            <button className="text-gray-500 hover:text-blue-500">
              📤 Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 