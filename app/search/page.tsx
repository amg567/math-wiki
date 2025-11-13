"use client"

import { useState, useMemo, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { BookOpen, Search, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { mathTopics, mathBranches, levelInfo } from "@/lib/math-data"
import { Badge } from "@/components/ui/badge"

function SearchContent() {
  const searchParams = useSearchParams()
  const queryParam = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(queryParam)

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []

    const query = searchQuery.toLowerCase()

    const topicResults = mathTopics.filter((topic) => {
      return (
        topic.title.toLowerCase().includes(query) ||
        topic.description.toLowerCase().includes(query) ||
        topic.branch.toLowerCase().includes(query) ||
        topic.id.toLowerCase().includes(query)
      )
    })

    const branchResults = mathBranches.filter((branch) => {
      return branch.title.toLowerCase().includes(query) || branch.description.toLowerCase().includes(query)
    })

    return {
      topics: topicResults,
      branches: branchResults,
      total: topicResults.length + branchResults.length,
    }
  }, [searchQuery])

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
            <Link
              href="/bookmarks"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
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
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">Search MathWiki</h1>
              <p className="text-lg text-muted-foreground">Find topics, branches, and concepts across all levels</p>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for topics... (e.g., Fourier Transform, Prime Numbers)"
                className="pl-12 pr-4 py-6 text-lg glass rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>

            {/* Results */}
            {searchQuery.trim() ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-foreground">Search Results</h2>
                  <Badge variant="secondary">
                    {searchResults.total} {searchResults.total === 1 ? "result" : "results"}
                  </Badge>
                </div>

                {searchResults.total === 0 ? (
                  <Card className="glass">
                    <CardHeader>
                      <CardTitle>No results found</CardTitle>
                      <CardDescription>Try different keywords or browse topics by level</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href="/browse">
                        <Badge className="cursor-pointer hover:bg-primary/80">
                          Browse all topics
                          <ChevronRight className="ml-1 h-3 w-3" />
                        </Badge>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {/* Topic Results */}
                    {searchResults.topics.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-foreground">
                          Topics ({searchResults.topics.length})
                        </h3>
                        <div className="space-y-3">
                          {searchResults.topics.map((topic) => {
                            const levelData = levelInfo[topic.level]
                            return (
                              <Link key={topic.id} href={`/topic/${topic.id}`}>
                                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50">
                                  <CardHeader>
                                    <div className="flex items-start justify-between gap-4">
                                      <div className="flex-1">
                                        <CardTitle className="text-xl mb-2">{topic.title}</CardTitle>
                                        <CardDescription>{topic.description}</CardDescription>
                                      </div>
                                      <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                                    </div>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                      <Badge variant="outline" className="text-xs">
                                        {levelData.title}
                                      </Badge>
                                      <Badge variant="secondary" className="text-xs">
                                        {topic.branch}
                                      </Badge>
                                    </div>
                                  </CardContent>
                                </Card>
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* Branch Results */}
                    {searchResults.branches.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-foreground">
                          Branches ({searchResults.branches.length})
                        </h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {searchResults.branches.map((branch) => {
                            const levelData = levelInfo[branch.level]
                            return (
                              <Link key={branch.id} href={`/browse/${branch.level}/${branch.id}`}>
                                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50">
                                  <CardHeader>
                                    <div className="flex items-start justify-between">
                                      <CardTitle className="text-lg">{branch.title}</CardTitle>
                                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <CardDescription className="text-sm">{branch.description}</CardDescription>
                                  </CardHeader>
                                  <CardContent>
                                    <Badge variant="outline" className="text-xs">
                                      {levelData.title}
                                    </Badge>
                                  </CardContent>
                                </Card>
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Start searching</CardTitle>
                  <CardDescription>
                    Enter a topic name, concept, or keyword to find relevant mathematical content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Popular searches:</p>
                    <div className="flex flex-wrap gap-2">
                      {["Fourier Transform", "Prime Numbers", "Calculus", "Linear Algebra", "Topology"].map((term) => (
                        <Badge
                          key={term}
                          variant="secondary"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                          onClick={() => setSearchQuery(term)}
                        >
                          {term}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
}
