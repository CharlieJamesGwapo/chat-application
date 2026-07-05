'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, Chat, Message, Contact } from '@/types';
import {
  getUserFromStorage,
  setUserInStorage,
  getChatsFromStorage,
  setChatsInStorage,
  getMessagesFromStorage,
  setMessagesInStorage,
  getContactsFromStorage,
  setContactsInStorage,
  addChatToStorage,
  updateChatInStorage,
  addMessageToStorage,
  updateMessageInStorage,
  deleteMessageFromStorage,
  getChatMessages,
  addContactToStorage,
  removeContactFromStorage,
} from '@/utils/localStorage';
import { generateId } from '@/utils/helpers';

interface ChatContextType {
  user: User | null;
  setUserProfile: (user: User) => void;
  chats: Chat[];
  messages: Message[];
  contacts: Contact[];
  createChat: (type: 'direct' | 'group', participants: string[], name?: string) => Chat;
  sendMessage: (chatId: string, text: string, imageUrl?: string) => Message;
  editMessage: (messageId: string, text: string) => void;
  deleteMessage: (messageId: string) => void;
  markAsRead: (messageId: string) => void;
  getUnreadCount: (chatId: string) => number;
  addContact: (contact: Contact) => void;
  removeContact: (contactId: string) => void;
  getChatName: (chat: Chat) => string;
  getTypingIndicator: (chatId: string) => boolean;
  setTypingIndicator: (chatId: string, isTyping: boolean) => void;
  getParticipantName: (userId: string) => string;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [typingIndicators, setTypingIndicators] = useState<Record<string, boolean>>({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from storage
  useEffect(() => {
    const storedUser = getUserFromStorage();
    const storedChats = getChatsFromStorage();
    const storedMessages = getMessagesFromStorage();
    const storedContacts = getContactsFromStorage();

    setUser(storedUser);
    setChats(storedChats);
    setMessages(storedMessages);
    setContacts(storedContacts);
    setIsInitialized(true);
  }, []);

  // Save chats to storage when they change
  useEffect(() => {
    if (isInitialized) {
      setChatsInStorage(chats);
    }
  }, [chats, isInitialized]);

  // Save messages to storage when they change
  useEffect(() => {
    if (isInitialized) {
      setMessagesInStorage(messages);
    }
  }, [messages, isInitialized]);

  // Save contacts to storage when they change
  useEffect(() => {
    if (isInitialized) {
      setContactsInStorage(contacts);
    }
  }, [contacts, isInitialized]);

  const setUserProfile = useCallback((newUser: User) => {
    setUser(newUser);
    setUserInStorage(newUser);
  }, []);

  const createChat = useCallback(
    (type: 'direct' | 'group', participants: string[], name?: string): Chat => {
      const newChat: Chat = {
        id: generateId(),
        type,
        participants,
        name: type === 'group' ? name : undefined,
        createdAt: Date.now(),
        lastMessageAt: Date.now(),
      };
      setChats((prev) => [...prev, newChat]);
      return newChat;
    },
    []
  );

  const sendMessage = useCallback(
    (chatId: string, text: string, imageUrl?: string): Message => {
      if (!user) throw new Error('User not initialized');

      const newMessage: Message = {
        id: generateId(),
        chatId,
        senderId: user.id,
        text,
        imageUrl,
        timestamp: Date.now(),
        isRead: false,
        isDelivered: false,
        isEdited: false,
      };

      setMessages((prev) => [...prev, newMessage]);

      // Simulate message delivery
      setTimeout(() => {
        updateMessageInStorage(newMessage.id, { isDelivered: true });
        setMessages((prev) =>
          prev.map((m) => (m.id === newMessage.id ? { ...m, isDelivered: true } : m))
        );
      }, 300);

      // Simulate read receipt
      setTimeout(() => {
        updateMessageInStorage(newMessage.id, { isRead: true });
        setMessages((prev) =>
          prev.map((m) => (m.id === newMessage.id ? { ...m, isRead: true } : m))
        );
      }, 1000);

      // Update chat's last message
      updateChatInStorage(chatId, {
        lastMessageAt: Date.now(),
        lastMessage: text.length > 50 ? text.substring(0, 50) + '...' : text,
      });
      setChats((prev) =>
        prev.map((c) =>
          c.id === chatId
            ? { ...c, lastMessageAt: Date.now(), lastMessage: text.substring(0, 50) }
            : c
        )
      );

      return newMessage;
    },
    [user]
  );

  const editMessage = useCallback((messageId: string, text: string) => {
    updateMessageInStorage(messageId, {
      text,
      isEdited: true,
      editedAt: Date.now(),
    });
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId ? { ...m, text, isEdited: true, editedAt: Date.now() } : m
      )
    );
  }, []);

  const deleteMessage = useCallback((messageId: string) => {
    deleteMessageFromStorage(messageId);
    setMessages((prev) => prev.filter((m) => m.id !== messageId));
  }, []);

  const markAsRead = useCallback((messageId: string) => {
    updateMessageInStorage(messageId, { isRead: true });
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, isRead: true } : m))
    );
  }, []);

  const getUnreadCount = useCallback(
    (chatId: string): number => {
      if (!user) return 0;
      return messages.filter((m) => m.chatId === chatId && !m.isRead && m.senderId !== user.id)
        .length;
    },
    [messages, user]
  );

  const addContact = useCallback((contact: Contact) => {
    addContactToStorage(contact);
    setContacts((prev) => [...prev, contact]);
  }, []);

  const removeContact = useCallback((contactId: string) => {
    removeContactFromStorage(contactId);
    setContacts((prev) => prev.filter((c) => c.id !== contactId));
  }, []);

  const getChatName = useCallback(
    (chat: Chat): string => {
      if (chat.type === 'group' && chat.name) {
        return chat.name;
      }
      const otherParticipant = chat.participants.find((p) => p !== user?.id);
      if (otherParticipant) {
        const contact = contacts.find((c) => c.id === otherParticipant);
        return contact?.name || 'Unknown User';
      }
      return 'Unknown Chat';
    },
    [contacts, user]
  );

  const getTypingIndicator = useCallback((chatId: string): boolean => {
    return typingIndicators[chatId] || false;
  }, [typingIndicators]);

  const setTypingIndicator = useCallback((chatId: string, isTyping: boolean) => {
    setTypingIndicators((prev) => ({ ...prev, [chatId]: isTyping }));
  }, []);

  const getParticipantName = useCallback(
    (userId: string): string => {
      if (user?.id === userId) return user.name;
      const contact = contacts.find((c) => c.id === userId);
      return contact?.name || 'Unknown User';
    },
    [contacts, user]
  );

  return (
    <ChatContext.Provider
      value={{
        user,
        setUserProfile,
        chats,
        messages,
        contacts,
        createChat,
        sendMessage,
        editMessage,
        deleteMessage,
        markAsRead,
        getUnreadCount,
        addContact,
        removeContact,
        getChatName,
        getTypingIndicator,
        setTypingIndicator,
        getParticipantName,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
