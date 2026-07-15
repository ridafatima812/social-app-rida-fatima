import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PostCard from '../components/post/PostCard';
import CommentSection from '../components/post/CommentSection';
import { usePosts } from '../hooks/usePosts';

const PostDetailPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { getPostById } = usePosts();
  
  const post = getPostById(postId);

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center min-h-[80vh] animate-fade-in">
        <h2 className="text-3xl font-bold text-brown-900 dark:text-dbrown-50 mb-4">Post not found</h2>
        <p className="text-brown-500 dark:text-dbrown-400 mb-8">This post might have been removed or the link is broken.</p>
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 h-11 px-6 bg-white text-brown-800 border border-brown-100 hover:bg-brown-50 dark:bg-dbrown-700 dark:text-dbrown-50 dark:border-dbrown-800 dark:hover:bg-dbrown-800"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8 min-h-[80vh] animate-slide-up">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-semibold text-brown-500 hover:text-brown-800 dark:text-dbrown-400 dark:hover:text-dbrown-50 mb-8 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" /> 
        Back to feed
      </button>

      <div className="mb-8">
        <PostCard post={post} />
      </div>

      <div className="bg-white dark:bg-dbrown-700 border border-brown-100 dark:border-dbrown-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <CommentSection postId={post.id} />
      </div>
    </div>
  );
};

export default PostDetailPage;
