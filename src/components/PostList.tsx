import React from 'react';
import Link from 'next/link';
import pb from '../lib/pocketbase';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
}

interface PostListProps {
  posts: Post[];
  onDelete: () => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onDelete }) => {
  const handleDelete = async (id: string) => {
    await pb.collection('posts').delete(id);
    onDelete();
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="border p-4 rounded">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="text-gray-600">By {post.author}</p>
          <p className="mt-2">{post.content}</p>
          <div className="mt-4 space-x-2">
            <Link href={`/edit/${post.id}`} className="text-blue-500">
              Edit
            </Link>
            <button
              onClick={() => handleDelete(post.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;