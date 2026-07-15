import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Image as ImageIcon, X, Sparkles } from 'lucide-react';
import { fileToBase64 } from '../../utils/helpers';
import Button from '../ui/Button';
import { cn } from '../ui/Button';

const PostForm = ({ defaultValues, onSubmitHandler, isEditing = false }) => {
  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
    defaultValues: defaultValues || {
      description: '',
      isPublic: true,
      image: null,
    }
  });

  const [imagePreview, setImagePreview] = useState(defaultValues?.image || null);
  const [isLoading, setIsLoading] = useState(false);
  const [actionType, setActionType] = useState('publish');
  const [successMsg, setSuccessMsg] = useState('');

  const description = watch('description') || '';
  const charCount = description.length;
  const MAX_CHARS = 500;

  useEffect(() => {
    let timer;
    if (successMsg) {
      timer = setTimeout(() => setSuccessMsg(''), 3000);
    }
    return () => clearTimeout(timer);
  }, [successMsg]);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setImagePreview(base64);
        setValue('image', base64);
      } catch (err) {
        console.error("Error reading file", err);
      }
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue('image', null);
  };

  const submitForm = async (data) => {
    setIsLoading(true);
    try {
      const isDraft = actionType === 'draft';
      await onSubmitHandler({
        description: data.description,
        image: imagePreview,
        isPublic: data.isPublic,
        isDraft
      });
      
      if (isDraft && !isEditing) {
        setSuccessMsg('Post saved as draft');
        reset({ description: '', isPublic: true, image: null });
        setImagePreview(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const charCounterColor = 
    charCount >= MAX_CHARS ? 'text-red-500 font-bold' :
    charCount >= 480 ? 'text-red-500 font-medium' : 
    charCount >= 400 ? 'text-orange-500 font-medium' : 'text-brown-400 dark:text-dbrown-400';

  return (
    <form onSubmit={handleSubmit(submitForm)} className="bg-white dark:bg-dbrown-700 border border-brown-100 dark:border-dbrown-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-brown-900/5 dark:shadow-none space-y-6 relative overflow-hidden">
      
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brown-400/10 dark:bg-dbrown-300/10 rounded-full blur-3xl pointer-events-none" />

      {successMsg && (
        <div className="p-4 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 rounded-xl text-sm font-medium text-center flex items-center justify-center gap-2 animate-slide-up">
          <Sparkles className="w-4 h-4" /> {successMsg}
        </div>
      )}

      <div className="relative z-10">
        <textarea
          className={cn(
            "w-full rounded-2xl border-none bg-brown-50/50 dark:bg-dbrown-800/50 px-6 py-5 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-brown-400/50 dark:focus:ring-dbrown-400/30 text-brown-900 dark:text-dbrown-50 placeholder:text-brown-400/60 dark:placeholder:text-dbrown-400/50 transition-all duration-300 min-h-[160px] resize-y shadow-inner",
            errors.description && "ring-2 ring-red-500/50 focus:ring-red-500"
          )}
          placeholder="What's on your mind? Share your thoughts..."
          {...register('description', { 
            required: 'Description is required',
            minLength: { value: 10, message: 'Minimum 10 characters required' },
            maxLength: { value: MAX_CHARS, message: `Maximum ${MAX_CHARS} characters allowed` }
          })}
        />
        <div className="flex justify-between items-center mt-3 px-2">
          {errors.description ? (
            <p className="text-sm font-medium text-red-500 animate-fade-in">{errors.description.message}</p>
          ) : <div/>}
          <p className={cn("text-xs transition-colors", charCounterColor)}>
            {charCount} / {MAX_CHARS}
          </p>
        </div>
      </div>

      <div className="relative z-10">
        {imagePreview ? (
          <div className="relative rounded-2xl overflow-hidden border border-brown-100 dark:border-dbrown-800 bg-brown-50 dark:bg-dbrown-800 inline-block shadow-md group">
            <img src={imagePreview} alt="Preview" className="max-h-80 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-3 right-3 bg-white/90 dark:bg-dbrown-900/90 hover:bg-red-50 dark:hover:bg-red-900/90 text-brown-900 dark:text-dbrown-50 hover:text-red-600 dark:hover:text-red-400 rounded-full p-2 transition-all shadow-sm backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-brown-200 dark:border-dbrown-600 rounded-2xl cursor-pointer bg-brown-50/50 hover:bg-brown-50 dark:bg-dbrown-800/50 dark:hover:bg-dbrown-800 transition-all group">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-brown-400 dark:text-dbrown-400 group-hover:text-brown-600 dark:group-hover:text-dbrown-300 transition-colors">
              <ImageIcon className="w-10 h-10 mb-4 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
              <p className="mb-2 text-sm"><span className="font-semibold text-brown-800 dark:text-dbrown-50">Click to upload</span> or drag and drop</p>
              <p className="text-xs opacity-70">PNG, JPG, GIF up to 5MB</p>
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
          </label>
        )}
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-brown-100 dark:border-dbrown-800">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-brown-800 dark:text-dbrown-300">
            Who can see this?
          </label>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <input 
                type="radio" 
                value="true" 
                className="w-4 h-4 text-brown-600 focus:ring-brown-500 dark:bg-dbrown-800 dark:border-dbrown-600 dark:checked:bg-dbrown-300 transition-all"
                {...register('isPublic')} 
                defaultChecked={defaultValues?.isPublic !== false}
              />
              <span className="text-sm font-medium text-brown-700 dark:text-dbrown-400 group-hover:text-brown-900 dark:group-hover:text-dbrown-50 transition-colors">Public</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <input 
                type="radio" 
                value="false" 
                className="w-4 h-4 text-brown-600 focus:ring-brown-500 dark:bg-dbrown-800 dark:border-dbrown-600 dark:checked:bg-dbrown-300 transition-all"
                {...register('isPublic')} 
              />
              <span className="text-sm font-medium text-brown-700 dark:text-dbrown-400 group-hover:text-brown-900 dark:group-hover:text-dbrown-50 transition-colors">Private</span>
            </label>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button 
            type="submit" 
            variant="secondary"
            className="flex-1 sm:flex-none"
            onClick={() => setActionType('draft')}
            disabled={isLoading || charCount > MAX_CHARS}
          >
            Save Draft
          </Button>
          <Button 
            type="submit" 
            variant="primary"
            className="flex-1 sm:flex-none"
            onClick={() => setActionType('publish')}
            disabled={isLoading || charCount > MAX_CHARS}
            isLoading={isLoading && actionType === 'publish'}
          >
            {isEditing ? 'Update Post' : 'Publish Post'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
