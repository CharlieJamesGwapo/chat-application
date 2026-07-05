'use client';

import { useState, useRef, useEffect } from 'react';
import { Avatar } from './Avatar';
import { useChatContext } from '@/context/ChatContext';
import { generateId } from '@/utils/helpers';

export const UserProfile = () => {
  const { user, setUserProfile } = useChatContext();
  const [name, setName] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setAvatarPreview(user.avatar);
    }
  }, [user]);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && user) {
      setUserProfile({
        ...user,
        name: name.trim(),
        avatar: avatarPreview || '',
      });
      setIsEditing(false);
    }
  };

  // Initialize user if not exists
  useEffect(() => {
    if (!user) {
      const newUser = {
        id: generateId(),
        name: 'Charlie James',
        avatar: '',
        status: 'online' as const,
      };
      setUserProfile(newUser);
    }
  }, [user, setUserProfile]);

  if (!user) return null;

  return (
    <div className="h-full bg-white dark:bg-gray-900 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
      </div>

      {!isEditing ? (
        <div className="flex-1 p-6 flex flex-col items-center">
          <Avatar name={user.name} avatar={user.avatar} size="lg" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
          <p className="mt-1 text-green-600 dark:text-green-400 font-medium">Online</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSaveProfile} className="flex-1 p-6 flex flex-col">
          <div className="flex flex-col items-center mb-6">
            <Avatar name={name} avatar={avatarPreview} size="lg" />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Change Avatar
            </button>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleAvatarUpload}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="flex gap-3 mt-auto">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setName(user.name);
                setAvatarPreview(user.avatar);
              }}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
            >
              Save Profile
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
