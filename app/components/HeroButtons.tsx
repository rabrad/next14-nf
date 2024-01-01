"use client"

import { Button } from "@/components/ui/button"
import { InfoIcon, PlayCircle } from "lucide-react"
import React, { useState } from "react"
import PlayMovieModal from "./PlayMovieModal"

interface MovieButtonsProps {
  age: number
  duration: number
  overview: string
  release: number
  title: string
  youtubeUrl: string
  key: number
}

function HeroButtons({
  age,
  duration,
  overview,
  release,
  title,
  youtubeUrl,
}: MovieButtonsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        <PlayCircle className="w-5 h-5 mr-2" /> Play
      </Button>
      <Button onClick={() => setIsModalOpen(true)}>
        <InfoIcon className="w-5 h-5 mr-2" />
        More info
      </Button>
      <PlayMovieModal
        duration={duration}
        release={release}
        age={age}
        youtubeUrl={youtubeUrl}
        overview={overview}
        title={title}
        state={isModalOpen}
        changeState={setIsModalOpen}
      />
    </>
  )
}

export default HeroButtons
