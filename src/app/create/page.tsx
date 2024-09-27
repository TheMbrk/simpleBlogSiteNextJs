'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import PostForm from '../../components/PostForm';

export default function CreatePost() {
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create New Post</h1>
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
}