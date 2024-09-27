import React, { useState } from 'react';
import pb from '../lib/pocketbase';

interface PostFormProps {
  initialData?: {
    id?: string;
    title: string;
    content: string;
    author: string;
  };
  onSubmit: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ initialData, onSubmit }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [author, setAuthor] = useState(initialData?.author || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { title, content, author };

    if (initialData?.id) {
      await pb.collection('posts').update(initialData.id, data);
    } else {
      await pb.collection('posts').create(data);
    }

    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>
      <div>
        <label htmlFor="content" className="block">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>
      <div>
        <label htmlFor="author" className="block">Author</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {initialData?.id ? 'Update' : 'Create'} Post
      </button>
    </form>
  );
};

export default PostForm;