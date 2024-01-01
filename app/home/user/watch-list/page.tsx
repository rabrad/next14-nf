import Image from "next/image"
import { getServerSession } from "next-auth"
import prisma from "../../../utils/db"
import { authOptions } from "@/app/utils/auth"
import MovieCard from "@/app/components/MovieCard"

async function getData(userId: string) {
  const data = await prisma.watchList.findMany({
    where: {
      userId: userId,
    },
    select: {
      Movie: {
        select: {
          title: true,
          age: true,
          duration: true,
          imageString: true,
          overview: true,
          release: true,
          id: true,
          WatchLists: true,
          youtubeString: true,
        },
      },
    },
    orderBy: {
      Movie: {
        createdAt: "desc",
      },
    },
  })
  return data
}

export async function page() {
  const session = await getServerSession(authOptions)
  const data = await getData(session?.user?.email!)

  return (
    <>
      <h1 className=" text-lg font-bold  mt-10 px-5 sm:px-0">
        Your watch list
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-10 gap-6">
        {data.map((list) => (
          <div key={list.Movie?.id} className="relative h-60">
            <Image
              src={list.Movie?.imageString as string}
              alt={list.Movie?.title as string}
              width={500}
              height={400}
              className="rounded-sm absolute w-full object-cover"
            />

            <div className="h-60 relative z-10 w-full transform transition duration-500 hover:scale-105 sm:hover:scale-110 lg:hover:scale-125 opacity-0 hover:opacity-100">
              <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center">
                <Image
                  src={list.Movie?.imageString as string}
                  alt="Movie"
                  width={500}
                  height={400}
                  className="absolute w-full h-full -z-10 rounded-lg object-cover"
                />

                <MovieCard
                  movieId={list.Movie?.id as number}
                  overview={list.Movie?.overview as string}
                  title={list.Movie?.title as string}
                  watchLists={
                    (list.Movie?.WatchLists.length as number) > 0 ? true : false
                  }
                  watchListsId={list.Movie?.WatchLists[0]?.id as string}
                  imageString={list.Movie?.imageString!}
                  youtubeUrl={list.Movie?.youtubeString!}
                  key={list.Movie?.id!}
                  age={list.Movie?.age!}
                  year={list.Movie?.release!}
                  time={list.Movie?.duration!}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default page
