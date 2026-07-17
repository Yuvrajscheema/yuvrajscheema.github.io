import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { FunctionComponent, ReactNode } from 'react';

interface ButtonProps {
  text: string;
  link: string;
  'aria-label'?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  showExternalIcon?: boolean;
}

const Button: FunctionComponent<ButtonProps> = ({
  text,
  link,
  className = '',
  variant = 'primary',
  size = 'md',
  icon,
  showExternalIcon = false,
  ...props
}) => {
  const isExternal = link.startsWith('http');

  return (
    <Link
      href={link}
      className={`btn btn--${variant} btn--${size} ${className}`}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {icon && <span className="btn__icon btn__icon--left">{icon}</span>}
      <span className="btn__text">{text}</span>
      {showExternalIcon && isExternal && (
        <span className="btn__icon btn__icon--right">
          <ArrowUpRight size={16} />
        </span>
      )}
    </Link>
  );
};

export default Button;
