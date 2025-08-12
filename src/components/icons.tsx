import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 12c-2.28 0-4.42.86-6 2.34" />
      <path d="M12 12c2.28 0 4.42.86 6 2.34" />
      <path d="M12 12v-2a4 4 0 0 0-4-4H6" />
      <path d="M12 12v-2a4 4 0 0 1 4-4h2" />
      <path d="M12 12c-4.42 0-8 1.79-8 4s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4Z" />
      <path d="M18.82 13.5C19.55 14.03 20 14.73 20 16" />
      <path d="M5.18 13.5C4.45 14.03 4 14.73 4 16" />
    </svg>
  );
}
