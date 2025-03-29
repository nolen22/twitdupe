import ThreadForm from './components/ThreadForm';
import ThreadList from './components/ThreadList';

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto pt-4">
      <div className="sticky top-0 bg-white z-10">
        <h1 className="text-2xl font-bold mb-4 px-4">Home</h1>
        <div className="border-b border-gray-200">
          <div className="flex justify-around">
            <button className="px-4 py-2 font-semibold text-blue-500 border-b-2 border-blue-500">
              For you
            </button>
            <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
              Following
            </button>
          </div>
        </div>
      </div>
      <ThreadForm />
      <ThreadList />
    </main>
  );
}
