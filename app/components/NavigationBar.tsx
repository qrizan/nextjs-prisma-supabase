"use client"

import React from 'react'
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { DarkThemeToggle } from "flowbite-react";
import NavigationLinks from './NavigationLinks';
import { object } from 'zod';
import Link from 'next/link';
import { GoTasklist } from "react-icons/go";

const NavigationBar = ({ session }: any) => {
  return (
    <Navbar fluid>
      <Navbar.Brand>
        <GoTasklist className='mr-2 text-3xl text-gray-600 dark:text-white' />
        <span
          className="self-center whitespace-nowrap text-xl font-semibold text-gray-600 dark:text-white"
        >
          Project Management
        </span>
      </Navbar.Brand>
      <div className="flex space-x-3 md:order-2">
        <DarkThemeToggle />
        {session ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img="https://i.pravatar.cc/100?img=17" rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{session.user.name}</span>
              <span className="block truncate text-sm font-medium">{session.user.email}</span>
            </Dropdown.Header>
            <Dropdown.Item>
              <Link href="/api/auth/signout?callbackUrl=/">Sign out</Link>
            </Dropdown.Item>
          </Dropdown>

        ) : (
          <Button as={Link} href="/api/auth/signin">Sign In</Button>
        )}
        < Navbar.Toggle />
      </div>
      {session ? (
        <Navbar.Collapse>
          <NavigationLinks role={session?.user.role} />
        </Navbar.Collapse>
      ) : null}
    </Navbar>
  )
}

export default NavigationBar