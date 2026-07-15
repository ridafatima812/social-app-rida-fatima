import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../../components/post/PostForm';
import { useAuth } from '../../context/AuthContext';
import { usePosts } from '../../hooks/usePosts';

const CreatePost = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { createPost } = usePosts();

  const handleSubmit = async (postData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    createPost(currentUser.id, {
      ...postData,
      isPublic: postData.isPublic === 'true' || postData.isPublic === true,
    });

    if (!postData.isDraft) {
      navigate('/');
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-brown-900 dark:text-dbrown-50">Create New Post</h1>
        <p className="text-brown-500 dark:text-dbrown-400 mt-2">Share something with the world or save it for later.</p>
      </div>

      <PostForm onSubmitHandler={handleSubmit} />
    </div>
  );
};

export default CreatePost;
