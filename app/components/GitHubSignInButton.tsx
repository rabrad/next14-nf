"use client"

import { Button } from "@/components/ui/button"
import { GithubIcon } from "lucide-react"
import { signIn } from "next-auth/react"

export default function GithubSignInButton() {
  return (
    <Button variant="outline" size="icon" onClick={() => signIn("github")}>
      <GithubIcon className="w-4 h-4" />
    </Button>
  )
}
