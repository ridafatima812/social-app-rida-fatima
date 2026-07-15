import storage, { generateId } from '../utils/storage';

export const usePosts = () => {
  const getPosts = () => {
    return storage.getPosts().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const getPublicPosts = () => {
    return getPosts().filter(post => post.isPublic && !post.isDraft);
  };

  const getUserPosts = (userId) => {
    return getPosts().filter(post => post.authorId === userId);
  };

  const getPostById = (postId) => {
    return getPosts().find(post => post.id === postId);
  };

  const createPost = (authorId, postData) => {
    const posts = storage.getPosts();
    const newPost = {
      id: generateId('post'),
      authorId,
      description: postData.description,
      image: postData.image || null,
      isPublic: postData.isPublic,
      isDraft: postData.isDraft,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    storage.setPosts([...posts, newPost]);
    return newPost;
  };

  const updatePost = (postId, updateData) => {
    const posts = storage.getPosts();
    const updatedPosts = posts.map(post => 
      post.id === postId 
        ? { ...post, ...updateData, updatedAt: new Date().toISOString() } 
        : post
    );
    storage.setPosts(updatedPosts);
  };

  const deletePost = (postId) => {
    const posts = storage.getPosts();
    storage.setPosts(posts.filter(p => p.id !== postId));
    // Cascade delete likes and comments
    const likes = storage.getLikes();
    storage.setLikes(likes.filter(l => l.postId !== postId));
    const comments = storage.getComments();
    storage.setComments(comments.filter(c => c.postId !== postId));
  };

  // Comments
  const getPostComments = (postId) => {
    return storage.getComments().filter(c => c.postId === postId).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  };

  const addComment = (postId, authorId, text) => {
    const comments = storage.getComments();
    const newComment = {
      id: generateId('cmt'),
      postId,
      authorId,
      text,
      createdAt: new Date().toISOString(),
    };
    storage.setComments([...comments, newComment]);
    return newComment;
  };

  const deleteComment = (commentId) => {
    const comments = storage.getComments();
    storage.setComments(comments.filter(c => c.id !== commentId));
  };

  // Likes
  const getPostLikes = (postId) => {
    return storage.getLikes().filter(l => l.postId === postId);
  };

  const toggleLike = (postId, userId) => {
    const likes = storage.getLikes();
    const existingLike = likes.find(l => l.postId === postId && l.userId === userId);
    
    if (existingLike) {
      storage.setLikes(likes.filter(l => l.id !== existingLike.id));
      return false; // unliked
    } else {
      const newLike = {
        id: generateId('like'),
        postId,
        userId,
        createdAt: new Date().toISOString(),
      };
      storage.setLikes([...likes, newLike]);
      return true; // liked
    }
  };

  return {
    getPosts,
    getPublicPosts,
    getUserPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    getPostComments,
    addComment,
    deleteComment,
    getPostLikes,
    toggleLike,
  };
};
