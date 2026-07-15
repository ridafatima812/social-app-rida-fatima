import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Edit, Trash2, Globe, Lock, Heart, MessageCircle, Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePosts } from '../../hooks/usePosts';
import { formatDate } from '../../utils/helpers';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { cn } from '../../components/ui/Button';

const PostsDashboard = () => {
  const { currentUser } = useAuth();
  const { getUserPosts, updatePost, deletePost, getPostLikes, getPostComments } = usePosts();
  const navigate = useNavigate();
  
  const [posts, setPosts] = useState(getUserPosts(currentUser.id));
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const refreshPosts = () => {
    setPosts(getUserPosts(currentUser.id));
  };

  const handleToggleVisibility = (post) => {
    updatePost(post.id, { isPublic: !post.isPublic });
    refreshPosts();
  };

  const handlePublishDraft = (post) => {
    updatePost(post.id, { isDraft: false, isPublic: true });
    refreshPosts();
  };

  const confirmDelete = (postId) => {
    setPostToDelete(postId);
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (postToDelete) {
      deletePost(postToDelete);
      refreshPosts();
    }
    setDeleteModalOpen(false);
    setPostToDelete(null);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brown-900 dark:text-dbrown-50">My Posts</h1>
          <p className="text-brown-500 dark:text-dbrown-400 mt-2">Manage, edit, and publish your content.</p>
        </div>
        <Link to="/dashboard/create">
          <Button className="shadow-lg shadow-brown-900/10">Create New Post</Button>
        </Link>
      </div>

      <div className="space-y-5">
        {posts.length > 0 ? (
          posts.map((post) => {
            const likesCount = getPostLikes(post.id).length;
            const commentsCount = getPostComments(post.id).length;
            
            return (
              <div key={post.id} className="bg-white dark:bg-dbrown-700 border border-brown-100 dark:border-dbrown-800 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    {post.isDraft ? (
                      <Badge variant="draft">Draft</Badge>
                    ) : post.isPublic ? (
                      <Badge variant="public" className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5"/> Public</Badge>
                    ) : (
                      <Badge variant="private" className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5"/> Private</Badge>
                    )}
                    <span className="text-xs font-medium text-brown-400 dark:text-dbrown-400">{formatDate(post.createdAt)}</span>
                  </div>
                  <p className="text-brown-800 dark:text-dbrown-50 font-medium truncate text-lg">
                    {post.description}
                  </p>
                  
                  <div className="flex items-center gap-5 mt-4 text-sm font-medium text-brown-500 dark:text-dbrown-400">
                    <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-brown-400 dark:text-dbrown-400"/> {likesCount} Likes</span>
                    <span className="flex items-center gap-1.5"><MessageCircle className="w-4 h-4 text-brown-400 dark:text-dbrown-400"/> {commentsCount} Comments</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  {post.isDraft ? (
                    <Button variant="primary" size="sm" onClick={() => handlePublishDraft(post)} className="gap-1.5">
                      <Send className="w-4 h-4"/> Publish
                    </Button>
                  ) : (
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={() => handleToggleVisibility(post)}
                      className="min-w-[110px]"
                    >
                      Make {post.isPublic ? 'Private' : 'Public'}
                    </Button>
                  )}
                  
                  <Button variant="secondary" size="sm" onClick={() => navigate(`/dashboard/edit/${post.id}`)} className="gap-1.5">
                    <Edit className="w-4 h-4"/> Edit
                  </Button>
                  
                  <Button variant="danger" size="sm" onClick={() => confirmDelete(post.id)} className="px-3.5">
                    <Trash2 className="w-4 h-4"/>
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-20 bg-white dark:bg-dbrown-700 border border-dashed border-brown-300 dark:border-dbrown-600 rounded-3xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brown-50 dark:bg-dbrown-800 mb-4">
              <Edit className="w-8 h-8 text-brown-300 dark:text-dbrown-400" />
            </div>
            <h3 className="text-lg font-semibold text-brown-900 dark:text-dbrown-50 mb-2">No posts yet</h3>
            <p className="text-brown-500 dark:text-dbrown-400 mb-6">You haven't created any posts yet. Start sharing!</p>
            <Link to="/dashboard/create">
              <Button className="shadow-md shadow-brown-900/10">Create your first post</Button>
            </Link>
          </div>
        )}
      </div>

      <Modal 
        isOpen={deleteModalOpen} 
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Post"
      >
        <div className="space-y-6">
          <p className="text-brown-600 dark:text-dbrown-300 leading-relaxed">
            Are you sure you want to delete this post? This action cannot be undone and will remove all likes and comments permanently.
          </p>
          <div className="flex justify-end gap-3 pt-6 border-t border-brown-100 dark:border-dbrown-800">
            <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>Yes, Delete</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PostsDashboard;
