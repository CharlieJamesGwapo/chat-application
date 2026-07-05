'use client';

export interface OnlineStatusProps {
  status: 'online' | 'offline';
  size?: 'sm' | 'md' | 'lg';
}

export const OnlineStatus = ({ status, size = 'md' }: OnlineStatusProps) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  const statusClasses = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
  };

  return (
    <div
      className={`${sizeClasses[size]} ${statusClasses[status]} rounded-full`}
      title={status}
    />
  );
};
