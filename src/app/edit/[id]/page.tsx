'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import pb from '../../../lib/pocketbase';
import PostForm from '../../../components/PostForm';

export default function EditPost({ params }: { params: { id: string } }) {
  const [post, setPost] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      const record = await pb.collection('posts').getOne(params.id);
      setPost(record);
    };
    fetchPost();
  }, [params.id]);

  const handleSubmit = () => {
    router.push('/');
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Post</h1>
      <PostForm initialData={post} onSubmit={handleSubmit} />
    </div>
  );
}