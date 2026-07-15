import React, { useState } from 'react';
import { Search, Compass } from 'lucide-react';
import PostCard from '../components/post/PostCard';
import { usePosts } from '../hooks/usePosts';
import { cn } from '../components/ui/Button';

const FeedPage = () => {
  const { getPublicPosts } = usePosts();
  const [searchQuery, setSearchQuery] = useState('');
  
  const allPosts = getPublicPosts();
  
  const filteredPosts = allPosts.filter(post => 
    post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8 min-h-[80vh] animate-fade-in">
      
      {/* Header / Search Area */}
      <div className="mb-10 relative">
        <div className="absolute -inset-4 bg-gradient-to-b from-brown-100/50 to-transparent dark:from-dbrown-800/50 rounded-3xl -z-10 blur-xl opacity-50 pointer-events-none" />
        
        <div className="flex flex-col gap-6">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-brown-900 dark:text-dbrown-50">
              Discover
            </h1>
            <p className="text-brown-500 dark:text-dbrown-400 mt-1">
              See what's happening around the world.
            </p>
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors group-focus-within:text-brown-600 text-brown-400 dark:text-dbrown-400 dark:group-focus-within:text-dbrown-300">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              className={cn(
                "block w-full rounded-2xl border border-brown-100 dark:border-dbrown-800 bg-white/80 dark:bg-dbrown-700/80 backdrop-blur-md py-4 pl-12 pr-4 text-base placeholder:text-brown-400/80 dark:placeholder:text-dbrown-400/80 transition-all duration-300 shadow-sm",
                "focus:outline-none focus:ring-2 focus:ring-brown-400/50 focus:border-brown-400 focus:bg-white dark:focus:ring-dbrown-400/50 dark:focus:border-dbrown-400 dark:focus:bg-dbrown-800",
                "hover:shadow-md hover:border-brown-200 dark:hover:border-dbrown-700"
              )}
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Feed Area */}
      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="text-center py-20 bg-white dark:bg-dbrown-700 rounded-3xl border border-brown-100 dark:border-dbrown-800 shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brown-50 dark:bg-dbrown-800 mb-4">
              <Compass className="w-8 h-8 text-brown-300 dark:text-dbrown-400" />
            </div>
            {searchQuery ? (
              <div>
                <h3 className="text-lg font-semibold text-brown-900 dark:text-dbrown-50 mb-2">No results found</h3>
                <p className="text-brown-500 dark:text-dbrown-400">
                  We couldn't find any posts matching "<span className="font-medium text-brown-700 dark:text-dbrown-300">{searchQuery}</span>"
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold text-brown-900 dark:text-dbrown-50 mb-2">It's quiet here</h3>
                <p className="text-brown-500 dark:text-dbrown-400">
                  No posts yet — be the first to share something amazing!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedPage;
