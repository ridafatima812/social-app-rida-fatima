import React from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import PostForm from '../../components/post/PostForm';
import { useAuth } from '../../context/AuthContext';
import { usePosts } from '../../hooks/usePosts';

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { getPostById, updatePost } = usePosts();

  const post = getPostById(postId);

  if (!post || post.authorId !== currentUser.id) {
    return <Navigate to="/dashboard/posts" replace />;
  }

  const handleSubmit = async (postData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    updatePost(post.id, {
      ...postData,
      isPublic: postData.isPublic === 'true' || postData.isPublic === true,
    });

    if (!postData.isDraft) {
      navigate('/');
    } else {
      navigate('/dashboard/posts');
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-brown-900 dark:text-dbrown-50">Edit Post</h1>
        <p className="text-brown-500 dark:text-dbrown-400 mt-2">Make changes to your existing post.</p>
      </div>

      <PostForm 
        isEditing={true}
        defaultValues={{
          description: post.description,
          image: post.image,
          isPublic: post.isPublic,
        }}
        onSubmitHandler={handleSubmit} 
      />
    </div>
  );
};

export default EditPost;
