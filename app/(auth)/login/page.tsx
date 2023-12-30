import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GithubIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import GooglIcon from "/public/google.svg"

function page() {
  return (
    <div className="mt-24 rounded bg-black/80 py-10 px-6 md:mt-0 md:max-w-sm md:px-14">
      <form>
        <h1 className="text-3xl font-semibold text-white">Log in</h1>
        <div className="space-y-4 mt-4">
          <Input />
          <Button
            type="submit"
            className="w-full bg-[#e50914] hover:bg-[#7f1d1de6] text-white"
          >
            Log in
          </Button>
        </div>
      </form>

      <div className="text-gray-500 text-sm mt-2">
        New to Netflix?{" "}
        <Link className="text-white hover:underline" href="/sign-up">
          Sign up
        </Link>
      </div>

      <div className="flex w-full justify-center items-center gap-x-3 mt-6">
        <Button variant="outline" size="icon">
          <GithubIcon className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Image src={GooglIcon} alt="Google logo" className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}

export default page
