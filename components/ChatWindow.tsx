'use client';

import { useEffect, useRef, useState } from 'react';
import { Chat, Message } from '@/types';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { TypingIndicator } from './TypingIndicator';
import { useChatContext } from '@/context/ChatContext';

interface ChatWindowProps {
  chat: Chat;
}

export const ChatWindow = ({ chat }: ChatWindowProps) => {
  const {
    user,
    messages,
    getChatName,
    sendMessage,
    editMessage,
    deleteMessage,
    markAsRead,
    setTypingIndicator,
    getTypingIndicator,
    getParticipantName,
  } = useChatContext();

  const [isTypingLocally, setIsTypingLocally] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMessages = messages.filter((m) => m.chatId === chat.id);
  const isTyping = getTypingIndicator(chat.id);

  // Auto-mark messages as read
  useEffect(() => {
    chatMessages.forEach((msg) => {
      if (!msg.isRead && msg.senderId !== user?.id) {
        markAsRead(msg.id);
      }
    });
  }, [chatMessages, user, markAsRead]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const handleSendMessage = (text: string, imageUrl?: string) => {
    sendMessage(chat.id, text, imageUrl);
    setTypingIndicator(chat.id, false);
  };

  const handleInputChange = () => {
    if (!isTypingLocally) {
      setIsTypingLocally(true);
      setTypingIndicator(chat.id, true);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTypingLocally(false);
      setTypingIndicator(chat.id, false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Chat header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{getChatName(chat)}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {chat.participants.length} participant{chat.participants.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4">
        {chatMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            No messages yet. Start the conversation!
          </div>
        ) : (
          chatMessages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isOwn={msg.senderId === user?.id}
              senderName={getParticipantName(msg.senderId)}
              onDelete={deleteMessage}
              onEdit={editMessage}
            />
          ))
        )}

        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Message input with typing indicator handler */}
      <div onInput={handleInputChange}>
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};
