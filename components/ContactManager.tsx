'use client';

import { useState, useRef } from 'react';
import { Avatar } from './Avatar';
import { OnlineStatus } from './OnlineStatus';
import { useChatContext } from '@/context/ChatContext';
import { generateId } from '@/utils/helpers';

export const ContactManager = () => {
  const { contacts, addContact, removeContact } = useChatContext();
  const [name, setName] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      const newContact = {
        id: generateId(),
        name: name.trim(),
        avatar: avatarPreview || '',
        status: Math.random() > 0.5 ? ('online' as const) : ('offline' as const),
        lastSeen: Date.now(),
      };
      addContact(newContact);
      setName('');
      setAvatarPreview(null);
      setShowForm(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Contacts</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {showForm ? 'Cancel' : 'Add Contact'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddContact} className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contact name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Avatar (optional)
            </label>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Upload Image
            </button>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleAvatarUpload}
              accept="image/*"
              className="hidden"
            />
            {avatarPreview && (
              <div className="mt-2 relative inline-block">
                <img src={avatarPreview} alt="Avatar" className="w-20 h-20 rounded-full object-cover" />
                <button
                  type="button"
                  onClick={() => setAvatarPreview(null)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
          >
            Add Contact
          </button>
        </form>
      )}

      <div className="flex-1 overflow-y-auto">
        {contacts.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No contacts yet. Add some to start chatting!
          </div>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className="p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar name={contact.name} avatar={contact.avatar} size="md" />
                    <div className="absolute bottom-0 right-0">
                      <OnlineStatus status={contact.status} size="sm" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{contact.name}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {contact.status === 'online' ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeContact(contact.id)}
                  className="text-red-500 hover:text-red-700 px-3 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
