export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastSeen?: number;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  imageUrl?: string;
  timestamp: number;
  isRead: boolean;
  isDelivered: boolean;
  isEdited: boolean;
  editedAt?: number;
}

export interface Chat {
  id: string;
  type: 'direct' | 'group';
  participants: string[];
  name?: string;
  createdAt: number;
  lastMessageAt: number;
  lastMessage?: string;
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastSeen?: number;
}

export interface Notification {
  id: string;
  chatId: string;
  unreadCount: number;
}
