import { Button } from "@/components/ui/button"
import prisma from "../utils/db"
import { InfoIcon, PlayCircle } from "lucide-react"

async function getData() {
  const data = await prisma.movie.findFirst({
    select: {
      id: true,
      title: true,
      overview: true,
      videoSource: true,
      imageString: true,
      release: true,
      duration: true,
      age: true,
      youtubeString: true,
    },
  })
  return data
}

export default async function MovieHero() {
  const data = await getData()

  return (
    <section className="h-[55vh] lg:h-[62vh] w-full flex justify-start items-center">
      <video
        poster={data?.imageString}
        autoPlay
        muted
        loop
        src={data?.videoSource}
        className="w-full absolute top-0 left-0 h-[63vh] md:h-[65vh] object-cover -z-10 brightness-[60%]"
      />
      <div className="absolute w-[90%] lg:w-[40%] mx-auto">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">
          {data?.title}
        </h1>
        <div className="text-white text-lg mt-5 line-clamp-3">
          {data?.overview}
        </div>
        <div className="flex gap-x-3 mt-4">
          <Button>
            <PlayCircle className="w-5 h-5 mr-2" /> Play
          </Button>
          <Button>
            <InfoIcon className="w-5 h-5 mr-2" />
            More info
          </Button>
        </div>
      </div>
    </section>
  )
}
