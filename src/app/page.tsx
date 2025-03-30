import Layout from './components/Layout';
import ThreadForm from './components/ThreadForm';
import ThreadList from './components/ThreadList';

export default function Home() {
  return (
    <Layout>
      <div className="space-y-4">
        <ThreadForm />
        <ThreadList />
      </div>
    </Layout>
  );
}
