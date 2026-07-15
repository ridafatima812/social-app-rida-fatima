import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Edit2, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../hooks/usePosts';
import storage from '../utils/storage';
import { formatDate } from '../utils/helpers';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import PostCard from '../components/post/PostCard';

const ProfilePage = () => {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const { getUserPosts } = usePosts();
  
  const profileUser = storage.getUsers().find(u => u.id === userId);
  
  if (!profileUser) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center min-h-[80vh] animate-fade-in">
        <h2 className="text-3xl font-bold text-brown-900 dark:text-dbrown-50 mb-4">User not found</h2>
        <Link to="/">
          <Button variant="secondary">Return Home</Button>
        </Link>
      </div>
    );
  }

  const isOwner = currentUser?.id === userId;
  
  const allUserPosts = getUserPosts(userId);
  const visiblePosts = isOwner 
    ? allUserPosts 
    : allUserPosts.filter(p => p.isPublic && !p.isDraft);

  return (
    <div className="max-w-4xl mx-auto pb-16 min-h-[80vh] animate-fade-in">
      {/* Profile Header */}
      <div className="bg-white dark:bg-dbrown-700 shadow-sm border border-brown-100 dark:border-dbrown-800 mb-10 rounded-3xl overflow-hidden mt-6">
        {/* Cover Image */}
        <div className="h-56 sm:h-72 w-full bg-gradient-to-br from-brown-600 to-brown-900 dark:from-dbrown-300 dark:to-dbrown-400 relative">
          {profileUser.coverImage && (
            <img src={profileUser.coverImage} alt="Cover" className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-black/10" />
        </div>
        
        <div className="px-6 sm:px-10 pb-10 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-20 sm:-mt-24 relative z-10 gap-6">
            <Avatar 
              src={profileUser.avatar} 
              name={profileUser.name} 
              className="w-36 h-36 sm:w-44 sm:h-44 border-8 border-white dark:border-dbrown-700 shadow-lg text-6xl"
            />
            
            <div className="flex gap-3">
              {isOwner ? (
                <Link to="/dashboard/settings">
                  <Button variant="secondary" className="gap-2 rounded-full px-6">
                    <Edit2 className="w-4 h-4" /> Edit Profile
                  </Button>
                </Link>
              ) : (
                <Button className="gap-2 rounded-full px-8 shadow-lg shadow-brown-900/20">
                  <UserPlus className="w-4 h-4" /> Follow
                </Button>
              )}
            </div>
          </div>
          
          <div className="mt-6 sm:mt-8">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-brown-900 dark:text-dbrown-50">
              {profileUser.name}
            </h1>
            
            <div className="flex items-center gap-6 mt-4 pb-6 border-b border-brown-100 dark:border-dbrown-800">
              <div className="flex items-center gap-1.5 cursor-pointer group">
                <span className="font-bold text-brown-900 dark:text-dbrown-50 group-hover:text-brown-600 transition-colors">1.2k</span>
                <span className="text-sm font-medium text-brown-500 dark:text-dbrown-400 group-hover:text-brown-600 transition-colors">Followers</span>
              </div>
              <div className="flex items-center gap-1.5 cursor-pointer group">
                <span className="font-bold text-brown-900 dark:text-dbrown-50 group-hover:text-brown-600 transition-colors">843</span>
                <span className="text-sm font-medium text-brown-500 dark:text-dbrown-400 group-hover:text-brown-600 transition-colors">Following</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-brown-900 dark:text-dbrown-50">{visiblePosts.length}</span>
                <span className="text-sm font-medium text-brown-500 dark:text-dbrown-400">Posts</span>
              </div>
            </div>

            {profileUser.bio && (
              <p className="mt-6 text-base leading-relaxed text-brown-800 dark:text-dbrown-50 max-w-3xl whitespace-pre-wrap">
                {profileUser.bio}
              </p>
            )}
            
            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm font-medium text-brown-500 dark:text-dbrown-400">
              {profileUser.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brown-400" /> {profileUser.location}
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brown-400" /> Joined {formatDate(profileUser.joinedAt)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Posts Section */}
      <div className="max-w-2xl mx-auto mt-12">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-brown-900 dark:text-dbrown-50">Posts</h2>
          <div className="h-px bg-brown-200 dark:bg-dbrown-700 flex-1 ml-4 rounded-full" />
        </div>
        
        <div className="space-y-6">
          {visiblePosts.length > 0 ? (
            visiblePosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-16 bg-white dark:bg-dbrown-700 rounded-3xl border border-brown-100 dark:border-dbrown-800 shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brown-50 dark:bg-dbrown-800 mb-4">
                <Edit2 className="w-8 h-8 text-brown-300 dark:text-dbrown-400" />
              </div>
              <h3 className="text-lg font-semibold text-brown-900 dark:text-dbrown-50 mb-2">No posts found</h3>
              <p className="text-brown-500 dark:text-dbrown-400">
                {isOwner ? "You haven't created any posts yet." : "This user hasn't published any public posts yet."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
