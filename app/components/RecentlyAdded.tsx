import Image from "next/image"
import prisma from "../utils/db"
import MovieCard from "./MovieCard"
import { getServerSession } from "next-auth"
import { authOptions } from "../utils/auth"

async function getData(userId: string) {
  const data = await prisma.movie.findMany({
    select: {
      id: true,
      overview: true,
      title: true,
      WatchLists: {
        where: {
          userId: userId,
        },
      },
      imageString: true,
      youtubeString: true,
      age: true,
      release: true,
      duration: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return data
}

export default async function RecentlyAdded() {
  const session = await getServerSession(authOptions)
  const data = await getData(session?.user?.email as string)

  return (
    <section>
      <h1 className="text-3xl font-bold mb-8">Recently Added</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-3">
        {data.map((movie) => (
          <div key={movie.id} className="relative h-48">
            <Image
              src={movie.imageString}
              alt="Movie"
              width={500}
              height={400}
              className="rounded-sm absolute w-full h-full object-cover"
            />
            <div className="h-60 relative z-10 w-full transform transition duration-500 hover:scale-105 sm:hover:scale-110 lg:hover:scale-125 opacity-0 hover:opacity-100">
              <div className="bg-gradient-to-b from-transparent via-black/70 to-black z-10 w-full h-full rounded-lg flex items-center justify-center border">
                <Image
                  src={movie.imageString}
                  alt="Movie"
                  width={500}
                  height={400}
                  className="absolute w-full h-full -z-10 rounded-lg object-cover"
                />
                <MovieCard
                  movieId={movie.id}
                  overview={movie.overview}
                  title={movie.title}
                  watchLists={movie.WatchLists.length > 0 ? true : false}
                  watchListsId={movie.WatchLists[0]?.id}
                  imageString={movie.imageString}
                  youtubeUrl={movie.youtubeString}
                  key={movie.id}
                  age={movie.age}
                  year={movie.release}
                  time={movie.duration}
                />
              </div>
            </div>
          </div>
        ))}
      </div>{" "}
    </section>
  )
}
