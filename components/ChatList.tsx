'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Chat } from '@/types';
import { Avatar } from './Avatar';
import { OnlineStatus } from './OnlineStatus';
import { truncateText } from '@/utils/helpers';
import { useChatContext } from '@/context/ChatContext';

interface ChatListProps {
  selectedChatId?: string;
}

export const ChatList = ({ selectedChatId }: ChatListProps) => {
  const { chats, contacts, getChatName, getUnreadCount, user } = useChatContext();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = useMemo(() => {
    if (!searchQuery) return chats;
    return chats.filter((chat) =>
      getChatName(chat).toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [chats, searchQuery, getChatName]);

  const sortedChats = useMemo(() => {
    return [...filteredChats].sort((a, b) => b.lastMessageAt - a.lastMessageAt);
  }, [filteredChats]);

  const getContactForChat = (chat: Chat) => {
    const otherParticipant = chat.participants.find((p) => p !== user?.id);
    return contacts.find((c) => c.id === otherParticipant);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Messages</h1>
        <input
          type="text"
          placeholder="Search chats..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {sortedChats.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            {searchQuery ? 'No chats found' : 'No chats yet. Start a conversation!'}
          </div>
        ) : (
          sortedChats.map((chat) => {
            const contact = getContactForChat(chat);
            const chatName = getChatName(chat);
            const unreadCount = getUnreadCount(chat.id);

            return (
              <Link key={chat.id} href={`/chat/${chat.id}`}>
                <div
                  className={`p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors ${
                    selectedChatId === chat.id ? 'bg-blue-50 dark:bg-gray-800' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar name={chatName} avatar={contact?.avatar} size="md" />
                      {contact && (
                        <div className="absolute bottom-0 right-0">
                          <OnlineStatus status={contact.status} size="sm" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                          {chatName}
                        </h3>
                        {unreadCount > 0 && (
                          <span className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {chat.lastMessage || 'No messages yet'}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};
