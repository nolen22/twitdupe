interface UserProfile {
  id: string;
  name: string;
  username: string;
  bio: string;
  image: string;
  followers: number;
  following: number;
  threads: number;
}

export default function UserProfile({ user }: { user: UserProfile }) {
  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <img
          src={user.image}
          alt={user.name}
          className="h-20 w-20 rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-500">@{user.username}</p>
          <p className="mt-2">{user.bio}</p>
          <div className="flex space-x-4 mt-2">
            <span className="text-gray-500">
              <span className="font-bold text-black">{user.followers}</span> followers
            </span>
            <span className="text-gray-500">
              <span className="font-bold text-black">{user.following}</span> following
            </span>
            <span className="text-gray-500">
              <span className="font-bold text-black">{user.threads}</span> threads
            </span>
          </div>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
} 