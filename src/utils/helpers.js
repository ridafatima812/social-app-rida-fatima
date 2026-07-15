import { formatDistanceToNow, format } from 'date-fns';

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  // If older than 7 days, show full date, else show relative time
  const now = new Date();
  const diffInDays = (now - date) / (1000 * 60 * 60 * 24);
  
  if (diffInDays > 7) {
    return format(date, 'MMM d, yyyy');
  }
  return formatDistanceToNow(date, { addSuffix: true });
};

export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
