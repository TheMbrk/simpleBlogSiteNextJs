'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import pb from '../lib/pocketbase';
import PostList from '../components/PostList';

export default function Home() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const records = await pb.collection('posts').getFullList();
    setPosts(records);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Blog</h1>
      <Link href="/create" className="bg-green-500 text-white px-4 py-2 rounded inline-block mb-4">
        Create New Post
      </Link>
      <PostList posts={posts} onDelete={fetchPosts} />
    </main>
  );
}