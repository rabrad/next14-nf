import { ReactNode } from "react"
import Navbar from "../components/Navbr"
import { getServerSession } from "next-auth"
import { authOptions } from "../utils/auth"
import { redirect } from "next/navigation"

export default async function homeLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect("/")
  }

  return (
    <div>
      <Navbar
        userImage={session?.user?.image!}
        userName={session?.user?.name!}
      />
      <main>{children}</main>
    </div>
  )
}
