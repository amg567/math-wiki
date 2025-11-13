"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { BookOpen, Bookmark, ChevronRight, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { mathTopics, levelInfo } from "@/lib/math-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function BookmarksPage() {
  const [bookmarkedTopics, setBookmarkedTopics] = useState<typeof mathTopics>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadBookmarks()
  }, [])

  const loadBookmarks = () => {
    try {
      const stored = localStorage.getItem("mathwiki-bookmarks")
      const bookmarkIds: string[] = stored ? JSON.parse(stored) : []

      const topics = mathTopics.filter((topic) => bookmarkIds.includes(topic.id))
      setBookmarkedTopics(topics)
    } catch {
      setBookmarkedTopics([])
    } finally {
      setIsLoading(false)
    }
  }

  const removeBookmark = (topicId: string) => {
    try {
      const stored = localStorage.getItem("mathwiki-bookmarks")
      const bookmarkIds: string[] = stored ? JSON.parse(stored) : []
      const updated = bookmarkIds.filter((id) => id !== topicId)
      localStorage.setItem("mathwiki-bookmarks", JSON.stringify(updated))
      loadBookmarks()
    } catch {
      // Handle error silently
    }
  }

  const clearAllBookmarks = () => {
    if (confirm("Are you sure you want to clear all bookmarks?")) {
      localStorage.setItem("mathwiki-bookmarks", JSON.stringify([]))
      loadBookmarks()
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading bookmarks...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">MathWiki</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/browse"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Browse Topics
            </Link>
            <Link href="/bookmarks" className="text-sm font-medium text-foreground">
              Bookmarks
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">My Bookmarks</h1>
                <p className="text-lg text-muted-foreground">Your saved topics and reading list</p>
              </div>
              {bookmarkedTopics.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllBookmarks}
                  className="text-destructive hover:text-destructive bg-transparent"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>

            {bookmarkedTopics.length === 0 ? (
              <Card className="glass">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Bookmark className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <CardTitle>No bookmarks yet</CardTitle>
                      <CardDescription>
                        Start exploring topics and bookmark the ones you want to revisit
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href="/browse">
                    <Button>
                      Browse Topics
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-sm">
                    {bookmarkedTopics.length} {bookmarkedTopics.length === 1 ? "topic" : "topics"}
                  </Badge>
                </div>

                <div className="space-y-3">
                  {bookmarkedTopics.map((topic) => {
                    const levelData = levelInfo[topic.level]
                    return (
                      <Card key={topic.id} className="hover:shadow-lg transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <Link href={`/topic/${topic.id}`} className="flex-1">
                              <div className="space-y-2">
                                <CardTitle className="text-xl hover:text-primary transition-colors">
                                  {topic.title}
                                </CardTitle>
                                <CardDescription>{topic.description}</CardDescription>
                                <div className="flex flex-wrap gap-2 pt-2">
                                  <Badge variant="outline" className="text-xs">
                                    {levelData.title}
                                  </Badge>
                                  <Badge variant="secondary" className="text-xs">
                                    {topic.branch}
                                  </Badge>
                                </div>
                              </div>
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeBookmark(topic.id)}
                              className="shrink-0"
                            >
                              <Bookmark className="h-5 w-5 fill-current" />
                              <span className="sr-only">Remove bookmark</span>
                            </Button>
                          </div>
                        </CardHeader>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
