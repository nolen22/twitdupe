export const mockPosts = [
  {
    id: '1',
    content: 'Just launched my new project! 🚀 Check it out at github.com/example',
    authorName: 'Alex Chen',
    authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    likes: 42,
    repostCount: 12,
    replies: [
      {
        id: '1-1',
        content: 'This looks amazing! Can\'t wait to try it out.',
        authorName: 'Sarah Wilson',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        createdAt: new Date(Date.now() - 1000 * 60 * 3),
        likes: 8,
        repostCount: 2,
      }
    ]
  },
  {
    id: '2',
    content: 'What\'s your favorite programming language? Mine\'s TypeScript! 💙',
    authorName: 'Emma Davis',
    authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    likes: 89,
    repostCount: 23,
    replies: [
      {
        id: '2-1',
        content: 'Python all the way! 🐍',
        authorName: 'Mike Johnson',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
        createdAt: new Date(Date.now() - 1000 * 60 * 10),
        likes: 15,
        repostCount: 4,
      },
      {
        id: '2-2',
        content: 'Rust is the future! 🦀',
        authorName: 'David Lee',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
        createdAt: new Date(Date.now() - 1000 * 60 * 8),
        likes: 12,
        repostCount: 3,
      }
    ]
  },
  {
    id: '3',
    content: 'Just finished reading "Clean Code" by Robert Martin. Highly recommend! 📚',
    authorName: 'Lisa Chen',
    authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    likes: 156,
    repostCount: 45,
    replies: []
  }
]; 