'use client';

import { useState } from 'react';
import { Avatar } from './Avatar';
import { useChatContext } from '@/context/ChatContext';

interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateChat: (chatId: string) => void;
}

export const NewChatModal = ({ isOpen, onClose, onCreateChat }: NewChatModalProps) => {
  const [chatType, setChatType] = useState<'direct' | 'group'>('direct');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [groupName, setGroupName] = useState('');

  const { contacts, createChat } = useChatContext();

  const handleCreateChat = () => {
    if (chatType === 'direct' && selectedContacts.length === 1) {
      const chat = createChat('direct', selectedContacts);
      onCreateChat(chat.id);
      onClose();
    } else if (chatType === 'group' && selectedContacts.length > 0 && groupName.trim()) {
      const chat = createChat('group', selectedContacts, groupName);
      onCreateChat(chat.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Create New Chat</h2>

        {/* Chat type selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Chat Type
          </label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="direct"
                checked={chatType === 'direct'}
                onChange={(e) => {
                  setChatType(e.target.value as 'direct' | 'group');
                  setSelectedContacts([]);
                }}
                className="mr-2"
              />
              Direct Chat
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="group"
                checked={chatType === 'group'}
                onChange={(e) => {
                  setChatType(e.target.value as 'direct' | 'group');
                  setSelectedContacts([]);
                }}
                className="mr-2"
              />
              Group Chat
            </label>
          </div>
        </div>

        {/* Group name input */}
        {chatType === 'group' && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Group Name
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        )}

        {/* Contact selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Select{' '}
            {chatType === 'direct'
              ? 'a Contact'
              : 'Contacts (minimum 1)'}
          </label>
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg max-h-64 overflow-y-auto">
            {contacts.map((contact) => (
              <label
                key={contact.id}
                className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0"
              >
                <input
                  type={chatType === 'direct' ? 'radio' : 'checkbox'}
                  name="contact"
                  value={contact.id}
                  checked={selectedContacts.includes(contact.id)}
                  onChange={(e) => {
                    if (chatType === 'direct') {
                      setSelectedContacts([contact.id]);
                    } else {
                      if (e.target.checked) {
                        setSelectedContacts([...selectedContacts, contact.id]);
                      } else {
                        setSelectedContacts(
                          selectedContacts.filter((id) => id !== contact.id)
                        );
                      }
                    }
                  }}
                  className="mr-3"
                />
                <Avatar name={contact.name} avatar={contact.avatar} size="sm" />
                <span className="ml-3 text-gray-900 dark:text-white">{contact.name}</span>
              </label>
            ))}
            {contacts.length === 0 && (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No contacts yet. Add some first!
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateChat}
            disabled={
              chatType === 'direct'
                ? selectedContacts.length !== 1
                : selectedContacts.length === 0 || !groupName.trim()
            }
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Chat
          </button>
        </div>
      </div>
    </div>
  );
};
