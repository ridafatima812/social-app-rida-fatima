import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Trash2, Send, MessageCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePosts } from '../../hooks/usePosts';
import storage from '../../utils/storage';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { formatDate } from '../../utils/helpers';

const CommentItem = ({ comment, currentUser, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const author = storage.getUsers().find(u => u.id === comment.authorId);

  if (!author) return null;

  const isOwner = currentUser?.id === comment.authorId;

  return (
    <div className="flex gap-4 py-4 animate-fade-in group">
      <Link to={`/profile/${author.id}`}>
        <Avatar src={author.avatar} name={author.name} size="sm" className="mt-1 shadow-sm" />
      </Link>
      <div className="flex-1">
        <div className="bg-brown-50 dark:bg-dbrown-800 rounded-2xl rounded-tl-sm px-5 py-3 inline-block min-w-[200px] max-w-full shadow-sm">
          <Link to={`/profile/${author.id}`} className="font-semibold text-sm text-brown-900 dark:text-dbrown-50 hover:text-brown-600 transition-colors">
            {author.name}
          </Link>
          <p className="text-sm text-brown-800 dark:text-dbrown-50 mt-1 break-words whitespace-pre-wrap leading-relaxed">
            {comment.text}
          </p>
        </div>
        <div className="flex items-center gap-4 mt-2 ml-2 text-xs font-medium text-brown-400 dark:text-dbrown-400">
          <span>{formatDate(comment.createdAt)}</span>
          
          {isOwner && !showConfirm && (
            <button 
              onClick={() => setShowConfirm(true)}
              className="text-brown-400 hover:text-red-500 transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          )}

          {showConfirm && (
            <span className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full animate-scale-in">
              Are you sure?
              <button onClick={() => onDelete(comment.id)} className="font-bold hover:underline ml-1">Yes</button>
              <span className="text-red-300 dark:text-red-800">|</span>
              <button onClick={() => setShowConfirm(false)} className="font-medium text-brown-500 hover:underline">No</button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const CommentSection = ({ postId }) => {
  const { currentUser, isAuthenticated } = useAuth();
  const { getPostComments, addComment, deleteComment } = usePosts();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  const [comments, setComments] = useState(getPostComments(postId));

  const onSubmit = (data) => {
    addComment(postId, currentUser.id, data.text);
    setComments(getPostComments(postId));
    reset();
  };

  const handleDelete = (commentId) => {
    deleteComment(commentId);
    setComments(getPostComments(postId));
  };

  return (
    <div className="mt-8 border-t border-brown-100 dark:border-dbrown-800 pt-8">
      <h3 className="text-lg font-bold text-brown-900 dark:text-dbrown-50 mb-6 flex items-center gap-2">
        Comments <span className="bg-brown-100 dark:bg-dbrown-800 text-brown-600 dark:text-dbrown-300 text-sm px-2.5 py-0.5 rounded-full">{comments.length}</span>
      </h3>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 mb-8">
          <Avatar src={currentUser.avatar} name={currentUser.name} size="md" className="hidden sm:block shadow-sm" />
          <div className="flex-1 relative">
            <input
              placeholder="Write a comment..."
              className="w-full h-12 rounded-full border border-brown-100 dark:border-dbrown-700 bg-brown-50/50 dark:bg-dbrown-800/50 px-5 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-brown-400 focus:bg-white dark:focus:bg-dbrown-700 transition-all dark:text-dbrown-50 placeholder:text-brown-400"
              {...register('text', { required: true })}
            />
            <button 
              type="submit" 
              className="absolute right-1.5 top-1.5 bottom-1.5 bg-gradient-to-r from-brown-800 to-brown-600 dark:from-dbrown-300 dark:to-dbrown-400 text-white dark:text-dbrown-900 w-9 h-9 rounded-full flex items-center justify-center hover:shadow-md transition-all hover:scale-105"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-brown-50 dark:bg-dbrown-800 rounded-xl p-5 text-center mb-8 border border-brown-100 dark:border-dbrown-700">
          <p className="text-brown-600 dark:text-dbrown-400 text-sm">
            Please <Link to="/login" className="text-brown-800 dark:text-dbrown-300 hover:underline font-bold">login</Link> to join the conversation
          </p>
        </div>
      )}

      <div className="space-y-2">
        {comments.map(comment => (
          <CommentItem 
            key={comment.id} 
            comment={comment} 
            currentUser={currentUser} 
            onDelete={handleDelete}
          />
        ))}
        {comments.length === 0 && (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brown-50 dark:bg-dbrown-800 mb-3">
              <MessageCircle className="w-6 h-6 text-brown-300 dark:text-dbrown-600" />
            </div>
            <p className="text-brown-500 dark:text-dbrown-400 text-sm font-medium">No comments yet. Be the first!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
