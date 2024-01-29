// Import necessary dependencies
import { cn } from '../../lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

// Define button variants using class-variance-authority
const buttonVariants = cva(
  'active:scale-95 inline-flex items-center justify-center rounded-xl text-[1.5rem] font-bold px-[2.4rem] py-[1rem] transition-colors focus:outline-none  disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap',
  {
    variants: {
      variant: {
        default:
          'bg-cmhq-primary-400 body1-bold focus:ring-4 focus:ring-cmhq-primary-400/30',
        outline:
          'bg-cmhq-white dark:bg-cmhq-natural/07 text-cmhq-natural/07 dark:text-cmhq-white border dark:border-gray-600 body1-bold focus:ring-4 focus:ring-cmhq-natural/07/10',
        primary:
          'bg-cmhq-primary-900  body1-bold focus:ring-4 focus:ring-cmhq-primary-900/30 text-cmhq-white',
        gradiant_primary:
          'border-2 border-cmhq-primary-300 bg-gradient-to-b from-cmhq-primary-400 to-cmhq-primary-200',
      },
      size: {
        default: 'h-[4.5rem] py-2 px-4',
        sm: 'h-9 px-2',
        md: 'h-14 px-4 ',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Define ButtonProps interface
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

// Define Button component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children, variant, isLoading, size, ...props },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-8 w-8 animate-spin" />
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

// Export Button component and buttonVariants
export { Button, buttonVariants };
