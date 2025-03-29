export interface Thread {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  createdAt: Date;
  likes: number;
  replies: Thread[];
}

export interface User {
  id: string;
  name: string;
  username: string;
  bio: string;
  image: string;
  followers: number;
  following: number;
  threads: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
} 