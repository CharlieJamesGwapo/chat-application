'use client';

export const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-1 p-3 text-sm text-gray-600 dark:text-gray-400">
      <span>Typing</span>
      <div className="flex gap-1">
        <div
          className="w-2 h-2 bg-current rounded-full animate-bounce"
          style={{ animationDelay: '0ms' }}
        />
        <div
          className="w-2 h-2 bg-current rounded-full animate-bounce"
          style={{ animationDelay: '150ms' }}
        />
        <div
          className="w-2 h-2 bg-current rounded-full animate-bounce"
          style={{ animationDelay: '300ms' }}
        />
      </div>
    </div>
  );
};
