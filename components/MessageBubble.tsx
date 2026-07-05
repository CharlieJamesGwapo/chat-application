'use client';

import { Message } from '@/types';
import { formatFullDate } from '@/utils/helpers';
import { useState } from 'react';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  senderName: string;
  onDelete: (messageId: string) => void;
  onEdit: (messageId: string, text: string) => void;
}

export const MessageBubble = ({
  message,
  isOwn,
  senderName,
  onDelete,
  onEdit,
}: MessageBubbleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(message.text);
  const [showMenu, setShowMenu] = useState(false);

  const handleSaveEdit = () => {
    if (editText.trim()) {
      onEdit(message.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} gap-2 mb-3`}>
      <div className={`max-w-xs ${isOwn ? 'order-last' : ''}`}>
        {!isOwn && <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{senderName}</p>}

        <div
          className={`relative group rounded-lg p-3 ${
            isOwn
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
          }`}
        >
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleSaveEdit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveEdit();
                if (e.key === 'Escape') setIsEditing(false);
              }}
              autoFocus
              className="w-full bg-transparent text-inherit outline-none"
            />
          ) : (
            <>
              {message.imageUrl && (
                <img
                  src={message.imageUrl}
                  alt="Message image"
                  className="max-w-xs rounded mb-2"
                />
              )}
              <p className="break-words">{message.text}</p>
              {message.isEdited && (
                <p className="text-xs opacity-75 mt-1">(edited)</p>
              )}
            </>
          )}

          {/* Message actions menu */}
          <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity -mt-8">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 text-xs"
            >
              ⋮
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-1 bg-white dark:bg-gray-800 rounded shadow-lg z-10">
                {isOwn && (
                  <>
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setShowMenu(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        onDelete(message.id);
                        setShowMenu(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className={`flex items-center gap-1 mt-1 text-xs ${isOwn ? 'justify-end' : ''} text-gray-500 dark:text-gray-400`}>
          <span>{formatFullDate(message.timestamp)}</span>
          {isOwn && (
            <>
              {message.isRead ? (
                <span title="Read">✓✓</span>
              ) : message.isDelivered ? (
                <span title="Delivered">✓</span>
              ) : (
                <span title="Sent">✓</span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
