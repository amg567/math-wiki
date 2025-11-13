"use client"

import { useState, useEffect } from "react"
import { Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BookmarkButtonProps {
  topicId: string
}

export function BookmarkButton({ topicId }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    const bookmarks = getBookmarks()
    setIsBookmarked(bookmarks.includes(topicId))
  }, [topicId])

  const toggleBookmark = () => {
    const bookmarks = getBookmarks()

    if (bookmarks.includes(topicId)) {
      const updated = bookmarks.filter((id) => id !== topicId)
      localStorage.setItem("mathwiki-bookmarks", JSON.stringify(updated))
      setIsBookmarked(false)
    } else {
      const updated = [...bookmarks, topicId]
      localStorage.setItem("mathwiki-bookmarks", JSON.stringify(updated))
      setIsBookmarked(true)
    }
  }

  return (
    <Button variant={isBookmarked ? "default" : "outline"} size="icon" onClick={toggleBookmark} className="shrink-0">
      <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`} />
      <span className="sr-only">{isBookmarked ? "Remove bookmark" : "Add bookmark"}</span>
    </Button>
  )
}

function getBookmarks(): string[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem("mathwiki-bookmarks")
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}
