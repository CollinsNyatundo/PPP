import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save } from 'lucide-react';

const settingsSchema = z.object({
  siteTitle: z.string().min(1, 'Site title is required'),
  metaDescription: z.string().min(1, 'Meta description is required'),
  analyticsId: z.string().optional(),
  contactEmail: z.string().email('Invalid email address'),
  socialLinks: z.object({
    github: z.string().url('Invalid GitHub URL'),
    linkedin: z.string().url('Invalid LinkedIn URL'),
  }),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export const SettingsPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      siteTitle: 'Collins Nyagaka Portfolio',
      metaDescription: 'Data Scientist & ML Engineer portfolio showcasing projects and articles.',
      analyticsId: '',
      contactEmail: 'cnyagakan@gmail.com',
      socialLinks: {
        github: 'https://github.com/CollinsNyatundo',
        linkedin: 'https://linkedin.com/in/collinsnyagaka001',
      },
    },
  });

  const onSubmit = async (data: SettingsFormData) => {
    try {
      console.log('Settings saved:', data);
      // TODO: Implement settings save functionality
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Configure your portfolio settings</p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          type="submit"
          form="settings-form"
          disabled={!isDirty}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </motion.button>
      </div>

      <form id="settings-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">General Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Site Title
              </label>
              <input
                {...register('siteTitle')}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
              />
              {errors.siteTitle && (
                <p className="mt-1 text-sm text-red-500">{errors.siteTitle.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Meta Description
              </label>
              <textarea
                {...register('metaDescription')}
                rows={3}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
              />
              {errors.metaDescription && (
                <p className="mt-1 text-sm text-red-500">{errors.metaDescription.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Analytics ID
              </label>
              <input
                {...register('analyticsId')}
                placeholder="UA-XXXXXXXXX-X"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Contact Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Contact Email
              </label>
              <input
                {...register('contactEmail')}
                type="email"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
              />
              {errors.contactEmail && (
                <p className="mt-1 text-sm text-red-500">{errors.contactEmail.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                GitHub URL
              </label>
              <input
                {...register('socialLinks.github')}
                type="url"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
              />
              {errors.socialLinks?.github && (
                <p className="mt-1 text-sm text-red-500">{errors.socialLinks.github.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                LinkedIn URL
              </label>
              <input
                {...register('socialLinks.linkedin')}
                type="url"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
              />
              {errors.socialLinks?.linkedin && (
                <p className="mt-1 text-sm text-red-500">{errors.socialLinks.linkedin.message}</p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};