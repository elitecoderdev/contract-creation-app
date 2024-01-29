import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * Input component with optional icon and title label.
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode; // Icon element
  titleLabel?: string; // Title label text
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, titleLabel, ...props }, ref) => {
    return (
      <div>
        {titleLabel && (
          <label className="dark:text-cmhq-white text-cmhq-gray px-1">
            {titleLabel}
          </label>
        )}
        <div className="relative">
          {icon && (
            <button className="absolute inset-y-0 start-0 flex items-center ps-6 pointer-events-none hover:bg-gray-300">
              {icon}
            </button>
          )}
          <input
            className={cn(
              'bg-cmhq-white/03 dark:bg-cmhq-dark-fill dark:text-cmhq-white outline-none border-white placeholder:text-cmhq-gray base1-bold rounded-2xl focus:ring-4 focus:ring-cmhq-gray/20 focus:border-gray-500 dark:ring-0 block w-full h-20 ps-20',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
