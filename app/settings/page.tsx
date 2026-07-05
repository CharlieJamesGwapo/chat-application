'use client';

import Link from 'next/link';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { useState } from 'react';

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [messagePreview, setMessagePreview] = useState(true);

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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Appearance */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Appearance
            </h2>
            <div className="space-y-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <label className="text-gray-700 dark:text-gray-300">Dark Mode</label>
                <DarkModeToggle />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Notifications
            </h2>
            <div className="space-y-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  className="mr-3"
                />
                <span className="text-gray-700 dark:text-gray-300">Enable Notifications</span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                  disabled={!notificationsEnabled}
                  className="mr-3"
                />
                <span className="text-gray-700 dark:text-gray-300">Notification Sounds</span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={messagePreview}
                  onChange={(e) => setMessagePreview(e.target.checked)}
                  disabled={!notificationsEnabled}
                  className="mr-3"
                />
                <span className="text-gray-700 dark:text-gray-300">Show Message Preview</span>
              </label>
            </div>
          </div>

          {/* Privacy */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Privacy</h2>
            <div className="space-y-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Show Online Status</span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Show Read Receipts</span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Allow Typing Indicators</span>
              </label>
            </div>
          </div>

          {/* Storage */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Storage</h2>
            <div className="space-y-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Clear All Chat Data</span>
                <button
                  onClick={() => {
                    if (confirm('Are you sure? This cannot be undone.')) {
                      localStorage.clear();
                      window.location.reload();
                    }
                  }}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Clear
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                This will permanently delete all your chats, messages, and contacts.
              </p>
            </div>
          </div>

          {/* About */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About</h2>
            <div className="space-y-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <p>Chat Application v1.0</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  A client-side chat application built with Next.js, React, TypeScript, and
                  Tailwind CSS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
