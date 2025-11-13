import Link from "next/link"
import { BookOpen, ChevronRight, Home, BookMarked } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { mathBranches, levelInfo, mathTopics } from "@/lib/math-data"
import { Badge } from "@/components/ui/badge"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  const params: { level: string; branch: string }[] = []

  mathBranches.forEach((branch) => {
    params.push({
      level: branch.level,
      branch: branch.id,
    })
  })

  return params
}

export default async function BranchPage({
  params,
}: {
  params: Promise<{ level: string; branch: string }>
}) {
  const { level, branch: branchId } = await params

  const branch = mathBranches.find((b) => b.id === branchId && b.level === level)

  if (!branch) {
    notFound()
  }

  const info = levelInfo[level as keyof typeof levelInfo]
  const topics = mathTopics.filter((t) => branch.topics.includes(t.id))

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
            <Link href="/browse" className="text-sm font-medium text-foreground">
              Browse Topics
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
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
            <Link href="/" className="hover:text-foreground transition-colors">
              <Home className="h-4 w-4" />
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/browse" className="hover:text-foreground transition-colors">
              Browse
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/browse/${level}`} className="hover:text-foreground transition-colors">
              {info.title}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{branch.title}</span>
          </nav>

          <div className="space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">{branch.title}</h1>
            <p className="text-lg text-muted-foreground text-pretty">{branch.description}</p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                {info.title}
              </Badge>
            </div>
          </div>

          {topics.length > 0 ? (
            <div className="space-y-4">
              {topics.map((topic) => (
                <Link key={topic.id} href={`/topic/${topic.id}`}>
                  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2">{topic.title}</CardTitle>
                          <CardDescription className="text-base">{topic.description}</CardDescription>
                        </div>
                        <ChevronRight className="h-6 w-6 text-muted-foreground shrink-0" />
                      </div>
                    </CardHeader>
                    {(topic.prerequisites || topic.relatedTopics) && (
                      <CardContent>
                        <div className="flex flex-wrap gap-4">
                          {topic.prerequisites && topic.prerequisites.length > 0 && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Prerequisites:</span>
                              <div className="flex flex-wrap gap-1">
                                {topic.prerequisites.slice(0, 3).map((prereq) => (
                                  <Badge key={prereq} variant="secondary" className="text-xs">
                                    {prereq}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BookMarked className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <CardTitle>Topics Coming Soon</CardTitle>
                    <CardDescription>We're working on adding content for this branch. Check back soon!</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
