"use client"

import { Button } from "@/components/ui/button"
import { Heart, PlayCircleIcon } from "lucide-react"
import PlayMovieModal from "./PlayMovieModal"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { addToWatchList, deleteFromWatchList } from "../utils/serverActions"

interface MovieCardProps {
  title: string
  overview: string
  movieId: number
  watchLists: boolean
  watchListsId: string
  imageString: string
  youtubeUrl: string
  age: number
  year: number
  time: number
}

export default function MovieCard({
  watchLists,
  movieId,
  watchListsId,
  overview,
  title,
  youtubeUrl,
  year,
  age,
  time,
}: MovieCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <button className="" onClick={() => setIsModalOpen(true)}>
        <PlayCircleIcon className="h-16 w-16" />
      </button>

      <div className="absolute top-5 right-5 z-10">
        {watchLists ? (
          <form action={deleteFromWatchList}>
            <input type="hidden" name="watchListsId" value={watchListsId} />
            <input type="hidden" name="pathname" value={pathname} />
            <Button variant="outline" size="icon">
              <Heart className="w-4 h-4 text-red-500" />
            </Button>
          </form>
        ) : (
          <form action={addToWatchList}>
            <input type="hidden" name="movieId" value={movieId} />
            <input type="hidden" name="pathname" value={pathname} />
            <Button variant="outline" size="icon">
              <Heart className="w-4 h-4 " />
            </Button>
          </form>
        )}
      </div>
      <div className="p-5 absolute bottom-0 left-0">
        <h2 className="line-clamp-1 font-bold">{title}</h2>
        <div className="flex gap-x-2 items-center">
          <p className="font-normal text-sm">{year}</p>
          <p className="font-normal border py-0.2 px-1 border-gray-400 rounded text-sm">
            {age}+
          </p>
          <p className="font-normal text-xs">{time}h</p>
        </div>
        <p className="line-clamp-1 text-xs text-gray-300 font-light">
          {overview}
        </p>
      </div>
      <PlayMovieModal
        duration={time}
        release={year}
        age={age}
        youtubeUrl={youtubeUrl}
        key={movieId}
        overview={overview}
        title={title}
        state={isModalOpen}
        changeState={setIsModalOpen}
      />
    </>
  )
}
