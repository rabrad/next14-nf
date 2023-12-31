import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface PlayMovieModalProps {
  title: string
  overview: string
  youtubeUrl: string
  state: boolean
  changeState: any
  release: number
  age: number
  duration: number
}

export default function PlayMovieModal({
  changeState,
  overview,
  state,
  title,
  youtubeUrl,
  age,
  duration,
  release,
}: PlayMovieModalProps) {
  return (
    <Dialog open={state} onOpenChange={() => changeState(!state)}>
      <DialogContent className="sm:max-w-[425px]">
        <iframe src={youtubeUrl} height={250} className="w-full"></iframe>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="line-clamp-4">
            {overview}
          </DialogDescription>
          <div className="flex gap-x-2 items-center">
            <p>{release}</p>
            <p className="border py-o.5 px-1 border-gray-200 rounded">{age}+</p>
            <p>{duration}h</p>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
