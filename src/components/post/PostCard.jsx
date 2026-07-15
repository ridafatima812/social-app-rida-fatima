import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import Avatar from '../ui/Avatar';
import PostActions from './PostActions';
import { formatDate } from '../../utils/helpers';
import storage from '../../utils/storage';
import { useAuth } from '../../context/AuthContext';
import { usePosts } from '../../hooks/usePosts';
import { cn } from '../ui/Button';

const PostCard = ({ post }) => {
  const { currentUser, isAuthenticated, updateCurrentUser } = useAuth();
  const { getPostLikes, getPostComments, toggleLike } = usePosts();
  const navigate = useNavigate();

  const author = storage.getUsers().find(u => u.id === post.authorId);
  const allLikes = getPostLikes(post.id);
  const comments = getPostComments(post.id);
  
  const [likes, setLikes] = useState(allLikes);
  
  const isLiked = isAuthenticated && likes.some(l => l.userId === currentUser.id);
  
  // Bookmarks Logic
  const savedPosts = currentUser?.savedPosts || [];
  const isSaved = savedPosts.includes(post.id);

  const handleToggleLike = () => {
    toggleLike(post.id, currentUser.id);
    setLikes(getPostLikes(post.id));
  };

  const handleToggleSave = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isAuthenticated) return navigate('/login');

    const newSaved = isSaved 
      ? savedPosts.filter(id => id !== post.id)
      : [...savedPosts, post.id];
      
    updateCurrentUser({ savedPosts: newSaved });
  };

  const handleCardClick = () => {
    navigate(`/posts/${post.id}`);
  };

  if (!author) return null;

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white dark:bg-dbrown-700 border border-brown-100 dark:border-dbrown-800 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-fade-in"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3.5">
          <Link to={`/profile/${author.id}`} onClick={e => e.stopPropagation()}>
            <Avatar src={author.avatar} name={author.name} size="md" />
          </Link>
          <div>
            <Link to={`/profile/${author.id}`} onClick={e => e.stopPropagation()} className="font-semibold text-base text-brown-900 dark:text-dbrown-50 hover:text-brown-600 transition-colors">
              {author.name}
            </Link>
            <div className="text-xs font-medium text-brown-400 dark:text-dbrown-400 mt-0.5">
              {formatDate(post.createdAt)}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={handleToggleSave}
            className="p-2 text-brown-400 hover:text-brown-800 hover:bg-brown-50 dark:text-dbrown-400 dark:hover:text-dbrown-50 dark:hover:bg-dbrown-800 rounded-full transition-all"
            title={isSaved ? "Unsave Post" : "Save Post"}
          >
            <Bookmark className={cn("w-5 h-5 transition-transform hover:scale-110", isSaved && "fill-brown-800 text-brown-800 dark:fill-dbrown-300 dark:text-dbrown-300")} />
          </button>
        </div>
      </div>

      <div className="mt-2 text-brown-800 dark:text-dbrown-50 text-base leading-relaxed whitespace-pre-wrap break-words">
        {post.description}
      </div>

      {post.image && (
        <div className="mt-5 rounded-xl overflow-hidden border border-brown-50 dark:border-dbrown-800 bg-brown-50/50 dark:bg-dbrown-800 shadow-sm">
          <img src={post.image} alt="Post attachment" className="w-full h-auto object-cover max-h-[500px]" />
        </div>
      )}

      <PostActions 
        postId={post.id}
        likesCount={likes.length}
        commentsCount={comments.length}
        isLiked={isLiked}
        onLikeToggle={handleToggleLike}
      />
    </div>
  );
};

export default PostCard;
