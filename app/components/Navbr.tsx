"use client"

import Image from "next/image"
import Link from "next/link"
import Logo from "/public/netflix_logo.svg"
import { usePathname } from "next/navigation"
import { Bell, Search } from "lucide-react"
import UserNav, { UserNavProps } from "./UserNav"

interface LinksProps {
  name: string
  href: string
}
const links: LinksProps[] = [
  { name: "Home", href: "/home" },
  { name: "Tv Shows", href: "/home/shows" },
  { name: "Movies", href: "/home/movies" },
  { name: "Recently Added", href: "/home/recently" },
  { name: "My List", href: "/home/user/watch-list" },
]

export default function Navbar({ userImage, userName }: UserNavProps) {
  const pathName = usePathname()

  return (
    <div className="flex w-full max-w-7xl mx-auto items-center justify-between px-5 sm:px-6 py-5 lg:px-8">
      <div className="flex items-center">
        <Link href="/home" className="w-32">
          <Image src={Logo} alt="Netflix logo" priority />
        </Link>
        <ul className="lg:flex gap-x-4 ml-14 hidden">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={
                  pathName === link.href
                    ? "text-white font-semibold underline text-sm"
                    : "text-gray-300 font-normal text-sm"
                }
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-x-8">
        <Search className="w-5 h-5 text-gray-300 cursor-pointer" />
        <Bell className="h-5 w-5 text-gray-300 cursor-pointer" />
        <UserNav userImage={userImage} userName={userName} />
      </div>
    </div>
  )
}
