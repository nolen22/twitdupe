export const mockPosts = [
  {
    id: '1',
    content: 'Just watched the new Dune movie and I\'m still processing... 🤯 The sandworms were everything!',
    authorName: 'SpiceAddict',
    authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SpiceAddict',
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    likes: 42,
    repostCount: 12,
    replies: [
      {
        id: '1-1',
        content: 'The CGI was insane! But I still prefer the original. Fight me! 🥊',
        authorName: 'VintageVibes',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VintageVibes',
        createdAt: new Date(Date.now() - 1000 * 60 * 3),
        likes: 8,
        repostCount: 2,
      }
    ]
  },
  {
    id: '2',
    content: 'Taylor Swift\'s new album is a masterpiece! The way she references her past work... 🎵',
    authorName: 'Swiftie4Life',
    authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Swiftie4Life',
    createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    likes: 89,
    repostCount: 23,
    replies: [
      {
        id: '2-1',
        content: 'The Easter eggs are next level! 🐰',
        authorName: 'DetectiveSwift',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DetectiveSwift',
        createdAt: new Date(Date.now() - 1000 * 60 * 10),
        likes: 15,
        repostCount: 4,
      },
      {
        id: '2-2',
        content: 'But have you heard the vinyl version? The sound quality is insane! 🎧',
        authorName: 'VinylJunkie',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VinylJunkie',
        createdAt: new Date(Date.now() - 1000 * 60 * 8),
        likes: 12,
        repostCount: 3,
      }
    ]
  },
  {
    id: '3',
    content: 'The new season of True Detective is giving me chills! That opening scene... 🎬',
    authorName: 'TrueCrimeJunkie',
    authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TrueCrimeJunkie',
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    likes: 156,
    repostCount: 45,
    replies: []
  }
]; 