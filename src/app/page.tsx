import ThreadForm from './components/ThreadForm';
import ThreadList from './components/ThreadList';

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto pt-4">
      <h1 className="text-2xl font-bold mb-4 px-4">Welcome to TwitDupe</h1>
      <ThreadForm />
      <ThreadList />
    </main>
  );
}
