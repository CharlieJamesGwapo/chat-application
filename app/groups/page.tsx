'use client';

import Link from 'next/link';
import { useChatContext } from '@/context/ChatContext';
import { Avatar } from '@/components/Avatar';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { useState } from 'react';

export default function GroupsPage() {
  const { chats, getChatName, contacts } = useChatContext();
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [editingGroupName, setEditingGroupName] = useState('');

  const groupChats = chats.filter((c) => c.type === 'group');

  const handleRenameGroup = (groupId: string, newName: string) => {
    // This would require an update method in the context
    // For now, just close the edit mode
    setEditingGroupId(null);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-1/4 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <Link
          href="/"
          className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          ← Back
        </Link>

        <div className="flex-1 overflow-y-auto" />

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

      {/* Main Content */}
      <div className="flex-1 bg-white dark:bg-gray-900 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Group Chats</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          {groupChats.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No group chats yet. Create one from the chat list!
            </div>
          ) : (
            groupChats.map((group) => (
              <Link key={group.id} href={`/chat/${group.id}`}>
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                  <div className="flex items-start gap-3">
                    <Avatar name={getChatName(group)} size="md" />

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        {editingGroupId === group.id ? (
                          <input
                            type="text"
                            value={editingGroupName}
                            onChange={(e) => setEditingGroupName(e.target.value)}
                            onBlur={() => handleRenameGroup(group.id, editingGroupName)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleRenameGroup(group.id, editingGroupName);
                              }
                            }}
                            autoFocus
                            className="flex-1 px-2 py-1 border border-blue-500 rounded dark:bg-gray-700 dark:text-white"
                          />
                        ) : (
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {getChatName(group)}
                          </h3>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {group.participants.length} members
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {group.participants.map((participantId) => {
                          const contact = contacts.find((c) => c.id === participantId);
                          return (
                            <span
                              key={participantId}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-700 dark:text-gray-300"
                            >
                              {contact?.name || 'Unknown'}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
