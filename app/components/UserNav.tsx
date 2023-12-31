"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatString } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { signOut } from "next-auth/react"

export interface UserNavProps {
  userImage: string
  userName: string
}

function UserNav({ userImage, userName }: UserNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-sm">
          <Avatar className="min-h-10 min-w-10 rounded-sm overflow-hidden ">
            <AvatarImage src={userImage} />
            <AvatarFallback className="rounded-sm ">
              {formatString(userName)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          Hello <span className="text-gray-400">{userName}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => signOut()}>
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav
