export const generateId = (prefix) => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const getFromStorage = (key, defaultValue = []) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage`, error);
    return defaultValue;
  }
};

const setToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage`, error);
  }
};

const storage = {
  getUsers: () => getFromStorage('users'),
  setUsers: (users) => setToStorage('users', users),
  
  getPosts: () => getFromStorage('posts'),
  setPosts: (posts) => setToStorage('posts', posts),
  
  getComments: () => getFromStorage('comments'),
  setComments: (comments) => setToStorage('comments', comments),
  
  getLikes: () => getFromStorage('likes'),
  setLikes: (likes) => setToStorage('likes', likes),
  
  getCurrentUser: () => getFromStorage('currentUser', null),
  setCurrentUser: (user) => setToStorage('currentUser', user),
  clearCurrentUser: () => {
    try {
      localStorage.removeItem('currentUser');
    } catch (error) {
      console.error('Error removing currentUser from localStorage', error);
    }
  }
};

export default storage;
