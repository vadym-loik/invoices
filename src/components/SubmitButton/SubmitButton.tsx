'use client';
import { useFormStatus } from 'react-dom';

// Use only as a child of <form></form>
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#pending-states
export default function SubmitButton({
  children,
  ...rest
}: React.ComponentPropsWithoutRef<'button'>) {
  const { pending } = useFormStatus();

  return (
    <button
      aria-disabled={pending}
      disabled={pending}
      {...rest}
    >
      {pending ? 'Veuillez attendre...' : children}
    </button>
  );
}
