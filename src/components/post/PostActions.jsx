import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePosts } from '../../hooks/usePosts';
import { cn } from '../ui/Button';

const PostActions = ({ postId, likesCount, commentsCount, isLiked, onLikeToggle }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLike = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to interact');
      navigate('/login');
      return;
    }
    onLikeToggle();
  };

  const handleCommentClick = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      alert('Please login to interact');
      navigate('/login');
      return;
    }
    navigate(`/posts/${postId}`);
  };


  return (
    <div className="flex items-center justify-between sm:justify-start sm:gap-8 mt-5 pt-4 border-t border-brown-100 dark:border-dbrown-800">
      <button
        onClick={handleLike}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all group hover:bg-brown-50 dark:hover:bg-dbrown-800",
          isLiked ? "text-red-500" : "text-brown-500 dark:text-dbrown-400"
        )}
      >
        <div className={cn("p-1.5 rounded-full group-hover:bg-red-50 dark:group-hover:bg-red-900/20 transition-colors", isLiked && "bg-red-50 dark:bg-red-900/20")}>
          <Heart className={cn("w-5 h-5 transition-transform group-hover:scale-110", isLiked && "fill-current")} />
        </div>
        <span>{likesCount} <span className="hidden sm:inline">Likes</span></span>
      </button>

      <button
        onClick={handleCommentClick}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-brown-500 dark:text-dbrown-400 transition-all group hover:bg-brown-50 dark:hover:bg-dbrown-800"
      >
        <div className="p-1.5 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
          <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:text-blue-500" />
        </div>
        <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400">{commentsCount} <span className="hidden sm:inline">Comments</span></span>
      </button>

    </div>
  );
};

export default PostActions;
