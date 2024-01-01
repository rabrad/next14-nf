import React from "react"
import MovieHero from "../components/MovieHero"
import RecentlyAdded from "../components/RecentlyAdded"

export default function home() {
  return (
    <div className="p-5 lg:p-0">
      <MovieHero />
      <RecentlyAdded />
    </div>
  )
}
