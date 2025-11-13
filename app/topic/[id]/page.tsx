import Link from "next/link"
import { BookOpen, ChevronRight, Home, ExternalLink, Edit } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { mathTopics, levelInfo } from "@/lib/math-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { notFound } from "next/navigation"
import { BookmarkButton } from "@/components/bookmark-button"

export function generateStaticParams() {
  return mathTopics.map((topic) => ({
    id: topic.id,
  }))
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const topic = mathTopics.find((t) => t.id === id)

  if (!topic) {
    notFound()
  }

  const levelData = levelInfo[topic.level]

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
        <div className="max-w-5xl mx-auto">
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
            <Link href={`/browse/${topic.level}`} className="hover:text-foreground transition-colors">
              {levelData.title}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{topic.branch}</span>
          </nav>

          {/* Topic Header */}
          <div className="space-y-6 mb-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{topic.title}</h1>
                <p className="text-xl text-muted-foreground text-pretty">{topic.description}</p>
              </div>
              <BookmarkButton topicId={topic.id} />
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-sm">
                {levelData.title}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {topic.branch}
              </Badge>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Overview</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                  <p className="text-foreground leading-relaxed">
                    {topic.content ||
                      "Content for this topic is being developed. Check back soon for detailed explanations, examples, and insights."}
                  </p>
                </CardContent>
              </Card>

              {/* Related Topics */}
              {topic.relatedTopics && topic.relatedTopics.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Related Topics</CardTitle>
                    <CardDescription>Explore connected concepts and extensions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {topic.relatedTopics.map((relatedId) => {
                        const relatedTopic = mathTopics.find((t) => t.id === relatedId)
                        return relatedTopic ? (
                          <Link key={relatedId} href={`/topic/${relatedId}`}>
                            <Badge
                              variant="secondary"
                              className="text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                              {relatedTopic.title}
                              <ChevronRight className="ml-1 h-3 w-3" />
                            </Badge>
                          </Link>
                        ) : (
                          <Badge key={relatedId} variant="secondary" className="text-sm">
                            {relatedId}
                          </Badge>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* References */}
              {topic.references && topic.references.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">References</CardTitle>
                    <CardDescription>Recommended reading and sources</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {topic.references.map((reference, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <ExternalLink className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
                          <span className="text-foreground text-sm">{reference}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Edit Button */}
              <div className="flex justify-center pt-4">
                <Button variant="outline" size="lg" asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit this page on GitHub
                  </a>
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Prerequisites */}
              {topic.prerequisites && topic.prerequisites.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Prerequisites</CardTitle>
                    <CardDescription className="text-sm">Concepts to understand first</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {topic.prerequisites.map((prereqId) => {
                        const prereqTopic = mathTopics.find((t) => t.id === prereqId)
                        return prereqTopic ? (
                          <Link key={prereqId} href={`/topic/${prereqId}`}>
                            <div className="p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-secondary-foreground">
                                  {prereqTopic.title}
                                </span>
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>
                          </Link>
                        ) : (
                          <div key={prereqId} className="p-3 rounded-lg bg-secondary">
                            <span className="text-sm font-medium text-secondary-foreground">{prereqId}</span>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Topic Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Topic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Academic Level</div>
                    <Badge variant="outline">{levelData.title}</Badge>
                  </div>
                  <Separator />
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Branch</div>
                    <div className="text-sm font-medium text-foreground">{topic.branch}</div>
                  </div>
                  <Separator />
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Topic ID</div>
                    <code className="text-xs bg-muted px-2 py-1 rounded text-foreground">{topic.id}</code>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
