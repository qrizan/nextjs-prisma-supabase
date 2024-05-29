"use client"
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { Spinner } from "flowbite-react";

export default function SignOut() {
  useEffect(() => {
    signOut({ callbackUrl: '/' });
  }, []);

  return (
    <div className="text-center">
      <Spinner aria-label="Center-aligned spinner example" />
    </div>
  );
}
