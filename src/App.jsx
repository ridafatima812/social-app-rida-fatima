import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import DashboardLayout from './components/layout/DashboardLayout';
import { Loader2 } from 'lucide-react';

// Lazy load pages
const FeedPage = React.lazy(() => import('./pages/FeedPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const SignupPage = React.lazy(() => import('./pages/SignupPage'));
const PostDetailPage = React.lazy(() => import('./pages/PostDetailPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

const PostsDashboard = React.lazy(() => import('./pages/dashboard/PostsDashboard'));
const CreatePost = React.lazy(() => import('./pages/dashboard/CreatePost'));
const EditPost = React.lazy(() => import('./pages/dashboard/EditPost'));
const ProfileSettings = React.lazy(() => import('./pages/dashboard/ProfileSettings'));

const LoadingFallback = () => (
  <div className="flex h-[50vh] items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
  </div>
);

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-coffee-bg transition-colors duration-300">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<FeedPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/posts/:postId" element={<PostDetailPage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            
            <Route path="/dashboard/*" element={<DashboardLayout />}>
              <Route path="posts" element={<PostsDashboard />} />
              <Route path="create" element={<CreatePost />} />
              <Route path="edit/:postId" element={<EditPost />} />
              <Route path="settings" element={<ProfileSettings />} />
              <Route path="" element={<PostsDashboard />} />
            </Route>
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
