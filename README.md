# Chat Application

A modern, client-side only chat application built with Next.js 14, React 18, TypeScript, and Tailwind CSS. All data is persisted locally using localStorage.

## Features

### Core Features
- **User Profile Setup** - Create and customize your profile with name and avatar
- **One-to-One Chat** - Direct messaging with individual contacts
- **Group Chat Management** - Create, manage, and rename group conversations
- **Message Management** - Send, edit, and delete messages with timestamps
- **Read Receipts** - Track message delivery and read status
- **Typing Indicators** - See when someone is typing (simulated)
- **Online/Offline Status** - Visual indicators for contact availability

### Media & Rich Content
- **Emoji Picker** - Built-in emoji selection for expressive messaging
- **Image Upload** - Share images via drag-and-drop or file upload (stored as data URIs)
- **Message Editing** - Edit messages with "edited" label indicator

### Search & Organization
- **Message Search** - Find specific messages within chats
- **Chat Search** - Quickly locate conversations
- **Unread Message Count** - Track unread conversations with badge indicators
- **Last Message Preview** - See message previews in chat list

### User Experience
- **Dark Mode Support** - Complete dark theme with Tailwind CSS
- **Contact Management** - Add and remove contacts
- **Browser Notifications** - Get notified of new messages
- **Responsive Design** - Works on desktop and tablet devices
- **Local Data Persistence** - All chats and messages saved in browser localStorage

## Tech Stack

- **Framework**: Next.js 14
- **UI Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Storage**: Browser localStorage
- **Icons/UI**: Built-in components with Tailwind CSS

## Project Structure

```
chat-application/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with ChatProvider
│   ├── page.tsx                 # Chat list home page
│   ├── chat/[id]/page.tsx       # Individual chat page
│   ├── profile/page.tsx         # User profile page
│   ├── contacts/page.tsx        # Contacts management
│   ├── groups/page.tsx          # Group chat management
│   ├── settings/page.tsx        # App settings
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── ChatList.tsx             # List of conversations
│   ├── ChatWindow.tsx           # Message display area
│   ├── MessageInput.tsx         # Message input with emoji picker
│   ├── MessageBubble.tsx        # Individual message display
│   ├── Avatar.tsx               # User avatar component
│   ├── OnlineStatus.tsx         # Online/offline indicator
│   ├── TypingIndicator.tsx      # Typing animation
│   ├── EmojiPicker.tsx          # Emoji selection component
│   ├── ContactManager.tsx       # Contact list management
│   ├── UserProfile.tsx          # Profile editor
│   ├── NewChatModal.tsx         # Chat creation dialog
│   └── DarkModeToggle.tsx       # Theme switcher
├── context/                      # React Context
│   └── ChatContext.tsx          # Global chat state management
├── types/                        # TypeScript interfaces
│   └── index.ts                 # Type definitions
├── utils/                        # Utility functions
│   ├── localStorage.ts          # Storage operations
│   └── helpers.ts               # Helper functions
└── public/                       # Static assets

```

## Data Structure

All data is stored in localStorage with the following keys:

- `chat_user` - Current user profile
- `chat_chats` - List of all conversations
- `chat_messages` - All messages across chats
- `chat_contacts` - Contact list
- `chat_theme` - User's theme preference (light/dark)

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/CharlieJamesGwapo/chat-application.git
cd chat-application
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Pages & Routes

- `/` - Chat list with navigation sidebar
- `/chat/[id]` - Individual chat conversation view
- `/profile` - User profile editor
- `/contacts` - Contact management page
- `/groups` - Group chat management
- `/settings` - Application settings and preferences

## Usage

### Starting a Chat
1. Click "New Chat" button in the sidebar
2. Choose between direct or group chat
3. Select contact(s) from the list
4. Start messaging!

### Managing Contacts
1. Navigate to the "Contacts" page
2. Click "Add Contact" to add a new contact
3. Enter contact details and upload an avatar (optional)
4. Use "Remove" button to delete contacts

### Chat Features
- **Send Messages**: Type in the message input and press Enter or click send
- **Add Emojis**: Click the emoji button to select from built-in emoji set
- **Upload Images**: Drag & drop images or click the attachment button
- **Edit Messages**: Hover over a message you sent and click the menu to edit
- **Delete Messages**: Hover over a message you sent and click the menu to delete
- **Search**: Use the search bar to filter chats by name

## Local Storage Usage

All application data is stored locally in your browser and never sent to any server. The storage includes:

- User profile information
- All chat conversations and their metadata
- Message history
- Contact information
- User preferences (theme)

**Note**: Data is only persisted on the current device/browser. Clearing browser data will delete all application data.

## Features Simulation

Since this is a client-side only application:
- **Typing Indicators** are simulated with auto-trigger on input
- **Online Status** is simulated with random online/offline states
- **Read Receipts** are automatically marked as read after 1 second
- **Message Delivery** is simulated with a 300ms delay

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 15+
- Any modern browser with localStorage support

## Notes

- This is a single-device application - chats don't sync across devices
- No backend server required - completely client-side
- No real-time messaging between different users
- Perfect for prototyping, learning, or personal use

## Build & Deployment

To build for production:
```bash
npm run build
npm start
```

The application can be deployed to any static hosting service (Vercel, Netlify, etc.) as it's a client-side only application.

## Author

Created by Charlie James

## License

MIT
