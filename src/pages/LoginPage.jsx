import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Code, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard/posts');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    try {
      setErrorMsg('');
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      login(data.email, data.password);
      navigate('/dashboard/posts');
    } catch (err) {
      setErrorMsg(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brown-400/20 dark:bg-dbrown-300/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-brown-600/20 dark:bg-dbrown-400/10 rounded-full blur-3xl" />
      
      <div className="w-full max-w-md z-10 animate-scale-in">
        <div className="bg-white/80 dark:bg-dbrown-800/90 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-brown-100/50 dark:border-dbrown-700/50">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-brown-900 dark:text-dbrown-50 mb-2">
              Welcome back
            </h2>
            <p className="text-sm text-brown-600 dark:text-dbrown-400">
              Enter your credentials to access your account
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              <Input
                label="Email address"
                type="email"
                placeholder="you@example.com"
                icon={<Mail className="w-5 h-5" />}
                error={errors.email}
                {...register('email', { 
                  required: 'Email is required',
                  pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email format' }
                })}
              />
              
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  icon={<Lock className="w-5 h-5" />}
                  error={errors.password}
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Must be at least 6 characters' }
                  })}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[34px] text-brown-400 hover:text-brown-600 dark:text-dbrown-400 dark:hover:text-dbrown-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-brown-300 text-brown-600 focus:ring-brown-500 dark:border-dbrown-600 dark:bg-dbrown-700 dark:checked:bg-dbrown-300 transition-all" />
                <span className="text-sm text-brown-700 dark:text-dbrown-300 group-hover:text-brown-900 dark:group-hover:text-dbrown-50">Remember me</span>
              </label>
              <a href="#" className="text-sm font-medium text-brown-600 hover:text-brown-800 dark:text-dbrown-400 dark:hover:text-dbrown-300 transition-colors">
                Forgot password?
              </a>
            </div>

            {errorMsg && (
              <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 p-3 rounded-xl text-center animate-fade-in border border-red-100 dark:border-red-900/30">
                {errorMsg}
              </div>
            )}

            <Button type="submit" className="w-full h-12 text-base" isLoading={isLoading}>
              Sign in
            </Button>
            
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-brown-100 dark:border-dbrown-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-brown-500 dark:bg-dbrown-800 dark:text-dbrown-400">Or continue with</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="button" variant="secondary" className="flex-1 border-brown-100 dark:border-dbrown-700">
                <Code className="w-5 h-5 mr-2" /> GitHub
              </Button>
              <Button type="button" variant="secondary" className="flex-1 border-brown-100 dark:border-dbrown-700">
                <Globe className="w-5 h-5 mr-2 text-[#1DA1F2]" /> Twitter
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-brown-600 dark:text-dbrown-400">Don't have an account? </span>
            <Link to="/signup" className="font-semibold text-brown-800 hover:text-brown-600 dark:text-dbrown-300 dark:hover:text-dbrown-50 transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
