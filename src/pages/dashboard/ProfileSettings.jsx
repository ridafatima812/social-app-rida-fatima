import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Camera, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { fileToBase64 } from '../../utils/helpers';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import { cn } from '../../components/ui/Button';

const ProfileSettings = () => {
  const { currentUser, updateCurrentUser } = useAuth();
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(currentUser.avatar);
  const [coverPreview, setCoverPreview] = useState(currentUser.coverImage);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: currentUser.name,
      bio: currentUser.bio || '',
      location: currentUser.location || '',
    }
  });

  const bio = watch('bio') || '';
  const charCount = bio.length;
  const MAX_BIO = 150;

  useEffect(() => {
    let timer;
    if (successMsg) {
      timer = setTimeout(() => setSuccessMsg(''), 3000);
    }
    return () => clearTimeout(timer);
  }, [successMsg]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setAvatarPreview(base64);
    }
  };

  const handleCoverChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setCoverPreview(base64);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      updateCurrentUser({
        name: data.name,
        bio: data.bio,
        location: data.location,
        avatar: avatarPreview,
        coverImage: coverPreview,
      });
      setSuccessMsg('Profile updated successfully!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-slide-up">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-brown-900 dark:text-dbrown-50">Profile Settings</h1>
        <p className="text-brown-500 dark:text-dbrown-400 mt-2">Personalize your public presence.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-dbrown-700 border border-brown-100 dark:border-dbrown-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-10 relative overflow-hidden">
        
        {/* Decorative blur */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brown-400/10 dark:bg-dbrown-300/10 rounded-full blur-3xl pointer-events-none" />

        {successMsg && (
          <div className="p-4 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 rounded-xl text-sm font-medium text-center flex items-center justify-center gap-2 animate-fade-in relative z-10">
            <Save className="w-4 h-4" /> {successMsg}
          </div>
        )}

        <div className="space-y-8 relative z-10">
          <div>
            <label className="block text-sm font-semibold text-brown-800 dark:text-dbrown-300 mb-3">Cover Image</label>
            <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-brown-50 dark:bg-dbrown-800 border-2 border-dashed border-brown-200 dark:border-dbrown-600 group flex items-center justify-center cursor-pointer hover:border-brown-400 transition-colors">
              {coverPreview ? (
                <img src={coverPreview} alt="Cover Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-sm font-medium text-brown-500 dark:text-dbrown-400 flex items-center gap-2 group-hover:text-brown-700 transition-colors">
                  <Camera className="w-5 h-5" /> Add stunning cover
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <span className="text-white text-sm font-bold tracking-wide">Change Cover</span>
              </div>
              <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" onChange={handleCoverChange} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-brown-800 dark:text-dbrown-300 mb-3">Profile Picture</label>
            <div className="flex items-center gap-6">
              <div className="relative group cursor-pointer">
                <Avatar src={avatarPreview} name={currentUser.name} size="lg" className="border-4 border-white dark:border-dbrown-700 shadow-lg w-28 h-28" />
                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" onChange={handleAvatarChange} />
              </div>
              <div className="text-sm font-medium text-brown-500 dark:text-dbrown-400 leading-relaxed">
                <p>Square image recommended.</p>
                <p>At least 400x400px.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-brown-100 dark:bg-dbrown-800 relative z-10" />

        <div className="space-y-6 relative z-10">
          <Input
            label="Full Name"
            error={errors.name}
            {...register('name', { required: 'Name is required' })}
          />

          <div>
            <label className="block text-sm font-semibold text-brown-800 dark:text-dbrown-300 mb-2">
              Bio
            </label>
            <textarea
              className={cn(
                "w-full rounded-2xl border border-brown-100 dark:border-dbrown-800 bg-white dark:bg-dbrown-800/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-brown-400 dark:focus:ring-dbrown-400/50 dark:focus:border-dbrown-400 text-brown-900 dark:text-dbrown-50 transition-all duration-300 min-h-[120px] resize-y shadow-sm",
                errors.bio && "border-red-500 focus:ring-red-500/50 focus:border-red-500"
              )}
              {...register('bio', {
                maxLength: { value: MAX_BIO, message: `Maximum ${MAX_BIO} characters` }
              })}
            />
            <div className="flex justify-between items-center mt-2 px-1">
              {errors.bio ? (
                <p className="text-xs font-medium text-red-500">{errors.bio.message}</p>
              ) : <div/>}
              <p className={cn("text-xs font-medium transition-colors", charCount > MAX_BIO ? "text-red-500" : "text-brown-400 dark:text-dbrown-400")}>
                {charCount} / {MAX_BIO}
              </p>
            </div>
          </div>

          <Input
            label="Location"
            placeholder="e.g. London, UK"
            {...register('location')}
          />
        </div>

        <div className="pt-8 flex justify-end relative z-10 border-t border-brown-100 dark:border-dbrown-800">
          <Button type="submit" isLoading={isLoading} disabled={charCount > MAX_BIO} className="px-8 shadow-lg shadow-brown-900/10">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
