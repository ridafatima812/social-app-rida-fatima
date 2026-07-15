import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const SignupPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard/posts');
    }
  }, [isAuthenticated, navigate]);

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      setErrorMsg('');
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      signup({
        name: data.fullName,
        email: data.email,
        password: data.password
      });
      navigate('/login');
    } catch (err) {
      setErrorMsg(err.message || 'Error creating account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-brown-400/20 dark:bg-dbrown-300/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-brown-600/20 dark:bg-dbrown-400/10 rounded-full blur-3xl" />
      
      <div className="w-full max-w-md z-10 animate-scale-in">
        <div className="bg-white/80 dark:bg-dbrown-800/90 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-brown-100/50 dark:border-dbrown-700/50">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-brown-900 dark:text-dbrown-50 mb-2">
              Create an account
            </h2>
            <p className="text-sm text-brown-600 dark:text-dbrown-400">
              Join us and start sharing your moments
            </p>
          </div>
          
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              icon={<User className="w-5 h-5" />}
              error={errors.fullName}
              {...register('fullName', { 
                required: 'Full name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
            />

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
                  minLength: { value: 8, message: 'Must be at least 8 characters' },
                  validate: {
                    hasUpperCase: value => /[A-Z]/.test(value) || 'Must contain one uppercase letter',
                    hasNumber: value => /[0-9]/.test(value) || 'Must contain one number'
                  }
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

            <Input
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              icon={<Lock className="w-5 h-5" />}
              error={errors.confirmPassword}
              {...register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
            />

            {errorMsg && (
              <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 p-3 rounded-xl text-center animate-fade-in border border-red-100 dark:border-red-900/30">
                {errorMsg}
              </div>
            )}

            <Button type="submit" className="w-full h-12 text-base mt-2" isLoading={isLoading}>
              Sign up
            </Button>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-brown-600 dark:text-dbrown-400">Already have an account? </span>
            <Link to="/login" className="font-semibold text-brown-800 hover:text-brown-600 dark:text-dbrown-300 dark:hover:text-dbrown-50 transition-colors">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
