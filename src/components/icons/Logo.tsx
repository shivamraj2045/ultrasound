import React from 'react';

const Logo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 8C4 5.79086 5.79086 4 8 4H24C26.2091 4 28 5.79086 28 8V24C28 26.2091 26.2091 28 24 28H8C5.79086 28 4 26.2091 4 24V8Z"
      fill="currentColor"
      className="text-primary"
    />
    <path
      d="M12 19L16 13L20 19"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 22C12.2533 20.44 14.7467 20.44 17 22L22 22"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Logo;
