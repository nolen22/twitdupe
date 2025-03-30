import ThreadForm from './components/ThreadForm';
import Thread from './components/Thread';
import { mockPosts } from '@/lib/mockData';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div className="w-full max-w-2xl space-y-4">
        <ThreadForm />
        <div className="space-y-4">
          {mockPosts.map((post) => (
            <Thread
              key={post.id}
              {...post}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
