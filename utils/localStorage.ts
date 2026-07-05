import { User, Chat, Message, Contact } from '@/types';

const STORAGE_KEYS = {
  USER: 'chat_user',
  CHATS: 'chat_chats',
  MESSAGES: 'chat_messages',
  CONTACTS: 'chat_contacts',
  NOTIFICATIONS: 'chat_notifications',
  THEME: 'chat_theme',
};

// User storage
export const getUserFromStorage = (): User | null => {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(STORAGE_KEYS.USER);
  return data ? JSON.parse(data) : null;
};

export const setUserInStorage = (user: User): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

// Chat storage
export const getChatsFromStorage = (): Chat[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.CHATS);
  return data ? JSON.parse(data) : [];
};

export const setChatsInStorage = (chats: Chat[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chats));
};

export const addChatToStorage = (chat: Chat): void => {
  const chats = getChatsFromStorage();
  chats.push(chat);
  setChatsInStorage(chats);
};

export const updateChatInStorage = (chatId: string, updates: Partial<Chat>): void => {
  const chats = getChatsFromStorage();
  const index = chats.findIndex((c) => c.id === chatId);
  if (index !== -1) {
    chats[index] = { ...chats[index], ...updates };
    setChatsInStorage(chats);
  }
};

export const deleteChatFromStorage = (chatId: string): void => {
  const chats = getChatsFromStorage();
  setChatsInStorage(chats.filter((c) => c.id !== chatId));
  const messages = getMessagesFromStorage();
  setMessagesInStorage(messages.filter((m) => m.chatId !== chatId));
};

// Message storage
export const getMessagesFromStorage = (): Message[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.MESSAGES);
  return data ? JSON.parse(data) : [];
};

export const setMessagesInStorage = (messages: Message[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
};

export const addMessageToStorage = (message: Message): void => {
  const messages = getMessagesFromStorage();
  messages.push(message);
  setMessagesInStorage(messages);
};

export const updateMessageInStorage = (messageId: string, updates: Partial<Message>): void => {
  const messages = getMessagesFromStorage();
  const index = messages.findIndex((m) => m.id === messageId);
  if (index !== -1) {
    messages[index] = { ...messages[index], ...updates };
    setMessagesInStorage(messages);
  }
};

export const deleteMessageFromStorage = (messageId: string): void => {
  const messages = getMessagesFromStorage();
  setMessagesInStorage(messages.filter((m) => m.id !== messageId));
};

export const getChatMessages = (chatId: string): Message[] => {
  const messages = getMessagesFromStorage();
  return messages.filter((m) => m.chatId === chatId).sort((a, b) => a.timestamp - b.timestamp);
};

// Contact storage
export const getContactsFromStorage = (): Contact[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.CONTACTS);
  return data ? JSON.parse(data) : [];
};

export const setContactsInStorage = (contacts: Contact[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
};

export const addContactToStorage = (contact: Contact): void => {
  const contacts = getContactsFromStorage();
  if (!contacts.find((c) => c.id === contact.id)) {
    contacts.push(contact);
    setContactsInStorage(contacts);
  }
};

export const removeContactFromStorage = (contactId: string): void => {
  const contacts = getContactsFromStorage();
  setContactsInStorage(contacts.filter((c) => c.id !== contactId));
};

// Theme storage
export const getThemeFromStorage = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  const theme = localStorage.getItem(STORAGE_KEYS.THEME);
  return (theme as 'light' | 'dark') || 'light';
};

export const setThemeInStorage = (theme: 'light' | 'dark'): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
};
