import { Navbar } from 'flowbite-react/components/Navbar'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavigationLinks = ({ role }: { role?: string }) => {
  const currentPath = usePathname()

  const links = [
    {
      label: "Dashboard",
      href: "/",
      adminOnly: false
    },
    {
      label: "Projects",
      href: "/projects",
      adminOnly: false
    },
    {
      label: "Users",
      href: "/users",
      adminOnly: true
    },
  ]

  return (
    <>
      {
        links.filter((link) => !link.adminOnly || role === "ADMINISTRATOR").map((link) => {
          const isActive = currentPath === link.href;

          return (
            <Navbar.Link
              key={link.label}
              href={link.href}
              active={isActive}
            >
              {link.label}
            </Navbar.Link>
          )

        })
      }
    </>
  )
}

export default NavigationLinks