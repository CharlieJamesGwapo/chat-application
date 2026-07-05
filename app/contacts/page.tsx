'use client';

import Link from 'next/link';
import { ContactManager } from '@/components/ContactManager';
import { DarkModeToggle } from '@/components/DarkModeToggle';

export default function ContactsPage() {
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
            href="/groups"
            className="block w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-center text-sm"
          >
            Groups
          </Link>

          <Link
            href="/settings"
            className="block w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-center text-sm"
          >
            Settings
          </Link>

          <div className="flex justify-center">
            <DarkModeToggle />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <ContactManager />
      </div>
    </div>
  );
}
