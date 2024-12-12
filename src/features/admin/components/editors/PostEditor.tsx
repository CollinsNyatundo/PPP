import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { z } from 'zod';
import { ImageUpload } from '../forms/ImageUpload';
import { RichTextEditor } from '../forms/RichTextEditor';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().min(1, 'Content is required'),
  image: z.string().url('Valid image URL is required'),
  category: z.string().min(1, 'Category is required'),
  read_time: z.string().min(1, 'Reading time is required'),
  published: z.boolean().default(false),
});

type PostFormData = z.infer<typeof postSchema>;

interface PostEditorProps {
  post?: PostFormData | null;
  onSave: (data: PostFormData) => Promise<void>;
  onClose: () => void;
}

export const PostEditor: React.FC<PostEditorProps> = ({ post, onSave, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: post || {
      title: '',
      excerpt: '',
      content: '',
      image: '',
      category: '',
      read_time: '5 min read',
      published: false,
    },
  });

  const onSubmit = async (data: PostFormData) => {
    try {
      await onSave(data);
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {post ? 'Edit Post' : 'New Post'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Title
            </label>
            <input
              {...register('title')}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Category
            </label>
            <select
              {...register('category')}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
            >
              <option value="">Select a category</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Data Science">Data Science</option>
              <option value="Data Visualization">Data Visualization</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Reading Time
            </label>
            <input
              {...register('read_time')}
              placeholder="5 min read"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
            />
            {errors.read_time && (
              <p className="mt-1 text-sm text-red-500">{errors.read_time.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Excerpt
            </label>
            <textarea
              {...register('excerpt')}
              rows={3}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
            />
            {errors.excerpt && (
              <p className="mt-1 text-sm text-red-500">{errors.excerpt.message}</p>
            )}
          </div>

          <ImageUpload
            value={watch('image')}
            onChange={(url) => setValue('image', url)}
            label="Cover Image"
          />

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Content
            </label>
            <RichTextEditor
              value={watch('content')}
              onChange={(content) => setValue('content', content)}
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('published')}
              className="w-4 h-4 bg-gray-700 border-gray-600 rounded"
            />
            <label className="text-sm font-medium text-gray-300">
              Publish immediately
            </label>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : post ? 'Save Changes' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};