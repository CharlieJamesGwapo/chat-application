'use client';

import { getInitials, getRandomColor } from '@/utils/helpers';

interface AvatarProps {
  name: string;
  avatar?: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar = ({ name, avatar, size = 'md', className = '' }: AvatarProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  return avatar && avatar.startsWith('data:') ? (
    <img
      src={avatar}
      alt={name}
      className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
    />
  ) : (
    <div
      className={`${sizeClasses[size]} ${getRandomColor(name)} rounded-full flex items-center justify-center text-white font-semibold ${className}`}
    >
      {getInitials(name)}
    </div>
  );
};
