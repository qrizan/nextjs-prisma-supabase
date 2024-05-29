"use client"
import { useState, useEffect } from 'react';
import { getCsrfToken } from 'next-auth/react';
import { Card, Button, Checkbox, Label, TextInput } from 'flowbite-react';

export default function SignIn() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken();
      if (token) {
        setCsrfToken(token);
      }
    };
    fetchCsrfToken();
  }, []);

  return (
    <Card className="mx-auto max-w-sm">
      <h5 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Sign In
      </h5>
      <form className="flex max-w-md flex-col gap-4" method="post" action="/api/auth/callback/password">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken ?? ''} />
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput name="email" type="email" value="johndoe@mail.com" placeholder="user@mail.com" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput name="password" type="password" value="password" required />
        </div>
        <Button type="submit">Submit</Button>
      </form>
      <p className='text-center text-xs text-gray-500'>* hard coding credentials for demo purposes</p>
    </Card>
  );
}


