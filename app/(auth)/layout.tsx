import Image from "next/image"
import { ReactNode } from "react"
import BackgroundImage from "/public/netflix-bg.jpg"
import Logo from "/public/netflix_logo.svg"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex flex-col h-screen w-screen bg-black md:items-center md:justify-center md:bg-transparent">
      <Image
        priority
        fill
        src={BackgroundImage}
        alt="netflix background image"
        aria-hidden
        className="hidden sm:flex sm:object-cover -z-10 brightness-50"
      />
      <Image
        src={Logo}
        alt="Netflix logo"
        width={120}
        priority
        className="absolute left-4 top-4 md:left-10 md:top-6 object-contain"
      />
      {children}
    </div>
  )
}
