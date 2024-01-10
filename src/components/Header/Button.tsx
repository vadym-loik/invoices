'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Button = ({ href, text }: { href: string; text: string }) => {
  const pathname = usePathname();
  return (
    <Link
      className={`link ${pathname === href ? 'active' : ''}`}
      href={href}
    >
      {text}
    </Link>
  );
};

export default Button;
