import React from 'react';

const Logo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42C33.9411 42 42 33.9411 42 24"
      stroke="hsl(var(--primary))"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M24 6C33.9411 6 42 14.0589 42 24"
      stroke="hsl(var(--chart-2))"
      strokeOpacity="0.7"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M14 24H19L22 18L26 30L29 18L32 24H37"
      stroke="hsl(var(--primary))"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Logo;
