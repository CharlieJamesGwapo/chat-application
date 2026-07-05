'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChatWindow } from '@/components/ChatWindow';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { useChatContext } from '@/context/ChatContext';
import { Chat } from '@/types';

export default function ChatPage({ params }: { params: { id: string } }) {
  const { chats } = useChatContext();
  const [chat, setChat] = useState<Chat | null>(null);

  useEffect(() => {
    const foundChat = chats.find((c) => c.id === params.id);
    setChat(foundChat || null);
  }, [params.id, chats]);

  if (!chat) {
    return (
      <div className="flex h-screen bg-white dark:bg-gray-900">
        <div className="w-1/4 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          <Link href="/" className="p-4">
            ← Back to Chats
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
          Loading chat...
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      {/* Sidebar with chat list */}
      <div className="w-1/4 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <Link
          href="/"
          className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          ← Back to Chats
        </Link>

        <div className="flex-1 overflow-y-auto">
          {/* Chat list can go here */}
        </div>

        {/* Bottom Navigation */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-2">
          <Link
            href="/profile"
            className="block w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-center text-sm"
          >
            Profile
          </Link>

          <Link
            href="/contacts"
            className="block w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-center text-sm"
          >
            Contacts
          </Link>

          <div className="flex justify-center">
            <DarkModeToggle />
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1">
        <ChatWindow chat={chat} />
      </div>
    </div>
  );
}
