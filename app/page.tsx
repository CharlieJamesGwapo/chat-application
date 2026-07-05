'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChatList } from '@/components/ChatList';
import { NewChatModal } from '@/components/NewChatModal';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { useChatContext } from '@/context/ChatContext';

export default function Home() {
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const { user } = useChatContext();

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-1/4 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <ChatList />

        {/* Bottom Navigation */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-2">
          <button
            onClick={() => setIsNewChatModalOpen(true)}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            New Chat
          </button>

          <Link
            href="/profile"
            className="block w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-center"
          >
            Profile
          </Link>

          <Link
            href="/contacts"
            className="block w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-center"
          >
            Contacts
          </Link>

          <Link
            href="/groups"
            className="block w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-center"
          >
            Groups
          </Link>

          <Link
            href="/settings"
            className="block w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-center"
          >
            Settings
          </Link>

          <div className="flex justify-center">
            <DarkModeToggle />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-gray-500 dark:text-gray-400">
          {user ? (
            <>
              <h1 className="text-2xl font-bold mb-2">Welcome, {user.name}!</h1>
              <p>Select a chat to start messaging</p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-2">Setting up your profile...</h1>
              <p>Please wait a moment</p>
            </>
          )}
        </div>
      </div>

      <NewChatModal
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
        onCreateChat={(chatId) => {
          // Redirect to chat page
          window.location.href = `/chat/${chatId}`;
        }}
      />
    </div>
  );
}
