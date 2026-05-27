import React from "react"
import Link from "next/link"
import {
  BookOpen,
  ChevronRight,
  Home,
  ExternalLink,
  Edit,
  Lightbulb,
  Sparkles,
  BookMarked,
  FlaskConical,
  Eye,
  Square,
  FileText,
  PenLine,
  Dumbbell,
  Rocket,
  AlertTriangle,
  Code2,
  Link2,
  Lock,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { mathTopics, levelInfo, type ChunkType, type ContentChunk } from "@/lib/math-data"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { notFound } from "next/navigation"
import { BookmarkButton } from "@/components/bookmark-button"

// ─── Chunk rendering helpers ──────────────────────────────────────────────────

const CHUNK_META: Record<
  ChunkType,
  {
    label: string
    icon: React.ReactNode
    cardClass: string
    badgeVariant: "default" | "secondary" | "outline" | "destructive"
  }
> = {
  intuition: {
    label: "Intuition",
    icon: <Lightbulb className="h-4 w-4" />,
    cardClass: "border-l-4 border-l-yellow-400 bg-yellow-50/50 dark:bg-yellow-950/20",
    badgeVariant: "secondary",
  },
  motivation: {
    label: "Motivation",
    icon: <Sparkles className="h-4 w-4" />,
    cardClass: "border-l-4 border-l-purple-400 bg-purple-50/50 dark:bg-purple-950/20",
    badgeVariant: "secondary",
  },
  historical_note: {
    label: "Historical Note",
    icon: <BookMarked className="h-4 w-4" />,
    cardClass: "border-l-4 border-l-amber-500 bg-amber-50/50 dark:bg-amber-950/20",
    badgeVariant: "secondary",
  },
  concrete_example: {
    label: "Example",
    icon: <FlaskConical className="h-4 w-4" />,
    cardClass: "border-l-4 border-l-green-500 bg-green-50/50 dark:bg-green-950/20",
    badgeVariant: "secondary",
  },
  visual_intuition: {
    label: "Visual Intuition",
    icon: <Eye className="h-4 w-4" />,
    cardClass: "border-l-4 border-l-sky-400 bg-sky-50/50 dark:bg-sky-950/20",
    badgeVariant: "secondary",
  },
  formal_definition: {
    label: "Definition",
    icon: <Square className="h-4 w-4" />,
    cardClass: "border-l-4 border-l-blue-600 bg-blue-50/50 dark:bg-blue-950/20",
    badgeVariant: "default",
  },
  theorem: {
    label: "Theorem",
    icon: <FileText className="h-4 w-4" />,
    cardClass: "border-l-4 border-l-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20",
    badgeVariant: "default",
  },
  proof_sketch: {
    label: "Proof Sketch",
    icon: <PenLine className="h-4 w-4" />,
    cardClass: "border-l-4 border-l-violet-500 bg-violet-50/50 dark:bg-violet-950/20",
    badgeVariant: "secondary",
  },
  exercise: {
    label: "Exercise",
    icon: <Dumbbell className="h-4 w-4" />,
    cardClass: "border-l-4 border-l-orange-500 bg-orange-50/50 dark:bg-orange-950/20",
    badgeVariant: "secondary",
  },
  application: {
    label: "Application",
    icon: <Rocket className="h-4 w-4" />,
    cardClass: "border-l-4 border-l-teal-500 bg-teal-50/50 dark:bg-teal-950/20",
    badgeVariant: "secondary",
  },
  prerequisite: {
    label: "Prerequisite",
    icon: <AlertTriangle className="h-4 w-4" />,
    cardClass: "border-l-4 border-l-rose-400 bg-rose-50/50 dark:bg-rose-950/20",
    badgeVariant: "destructive",
  },
  advanced_note: {
    label: "Advanced Note",
    icon: <Lock className="h-4 w-4" />,
    cardClass: "border-l-4 border-l-slate-400 bg-slate-50/50 dark:bg-slate-900/40 opacity-80",
    badgeVariant: "outline",
  },
  warning: {
    label: "Warning",
    icon: <AlertTriangle className="h-4 w-4" />,
    cardClass: "border-l-4 border-l-red-500 bg-red-50/50 dark:bg-red-950/20",
    badgeVariant: "destructive",
  },
  notation: {
    label: "Notation",
    icon: <Code2 className="h-4 w-4" />,
    cardClass: "border-l-4 border-l-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/20 font-mono text-sm",
    badgeVariant: "outline",
  },
  connection: {
    label: "Connection",
    icon: <Link2 className="h-4 w-4" />,
    cardClass: "border-l-4 border-l-pink-400 bg-pink-50/50 dark:bg-pink-950/20",
    badgeVariant: "secondary",
  },
}

const DIFFICULTY_LABELS: Record<number, string> = {
  0: "High School",
  1: "Early Undergraduate",
  2: "Advanced Undergraduate",
  3: "Graduate",
  4: "Advanced Graduate",
  5: "Research",
}

function ChunkCard({ chunk }: { chunk: ContentChunk }) {
  const meta = CHUNK_META[chunk.type]
  return (
    <div className={cn("rounded-lg p-4", meta.cardClass)}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
          {meta.icon}
          <span>{meta.label}</span>
        </div>
        <Badge variant={meta.badgeVariant} className="text-xs">
          {DIFFICULTY_LABELS[chunk.difficulty]}
        </Badge>
      </div>
      <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{chunk.content}</p>
    </div>
  )
}

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
  const hasChunks = topic.chunks && topic.chunks.length > 0

  // Separate advanced notes from main chunks in a single pass
  const { mainChunks, advancedChunks } = (topic.chunks ?? []).reduce<{
    mainChunks: ContentChunk[]
    advancedChunks: ContentChunk[]
  }>(
    (acc, chunk) => {
      if (chunk.type === "advanced_note") {
        acc.advancedChunks.push(chunk)
      } else {
        acc.mainChunks.push(chunk)
      }
      return acc
    },
    { mainChunks: [], advancedChunks: [] },
  )

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
              {topic.difficulty !== undefined && (
                <Badge variant="secondary" className="text-sm">
                  Difficulty: {DIFFICULTY_LABELS[topic.difficulty]}
                </Badge>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-4">
              {hasChunks ? (
                <>
                  {mainChunks.map((chunk, i) => (
                    <ChunkCard key={i} chunk={chunk} />
                  ))}

                  {/* Advanced Notes Section */}
                  {advancedChunks.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                        <Lock className="h-3.5 w-3.5" />
                        Advanced Notes
                      </h3>
                      {advancedChunks.map((chunk, i) => (
                        <ChunkCard key={i} chunk={chunk} />
                      ))}
                    </div>
                  )}

                  {/* Filtered Content */}
                  {topic.filtered_content && topic.filtered_content.length > 0 && (
                    <Card className="border-dashed border-muted-foreground/40">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2 text-muted-foreground">
                          <AlertTriangle className="h-4 w-4" />
                          Topics Excluded from This Page
                        </CardTitle>
                        <CardDescription className="text-xs">
                          The following content was filtered out for the current audience level.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {topic.filtered_content.map((fc, i) => (
                          <div key={i} className="flex items-start gap-3 text-sm">
                            <Badge variant="outline" className="text-xs shrink-0 mt-0.5">
                              {DIFFICULTY_LABELS[fc.difficulty]}
                            </Badge>
                            <div>
                              <span className="font-medium text-foreground">{fc.removed_topic}</span>
                              <span className="text-muted-foreground"> — {fc.reason}</span>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </>
              ) : (
                /* Legacy plain-text content fallback */
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
              )}

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

              {/* Learning Path Next */}
              {topic.learning_path_next && topic.learning_path_next.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      What to Learn Next
                    </CardTitle>
                    <CardDescription className="text-sm">Recommended follow-up topics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {topic.learning_path_next.map((nextId) => {
                        const nextTopic = mathTopics.find((t) => t.id === nextId)
                        return nextTopic ? (
                          <Link key={nextId} href={`/topic/${nextId}`}>
                            <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-foreground">{nextTopic.title}</span>
                                <ArrowRight className="h-4 w-4 text-primary" />
                              </div>
                            </div>
                          </Link>
                        ) : (
                          <div key={nextId} className="p-3 rounded-lg border border-border bg-muted/30">
                            <span className="text-sm font-medium text-muted-foreground">{nextId}</span>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Connections */}
              {topic.connections && topic.connections.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Link2 className="h-4 w-4 text-muted-foreground" />
                      Connections
                    </CardTitle>
                    <CardDescription className="text-sm">Related concepts and adjacent topics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {topic.connections.map((connId) => {
                        const connTopic = mathTopics.find((t) => t.id === connId)
                        return connTopic ? (
                          <Link key={connId} href={`/topic/${connId}`}>
                            <Badge
                              variant="outline"
                              className="text-xs cursor-pointer hover:bg-secondary transition-colors"
                            >
                              {connTopic.title}
                            </Badge>
                          </Link>
                        ) : (
                          <Badge key={connId} variant="outline" className="text-xs text-muted-foreground">
                            {connId}
                          </Badge>
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
                  {topic.difficulty !== undefined && (
                    <>
                      <Separator />
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Difficulty</div>
                        <div className="text-sm font-medium text-foreground">
                          {DIFFICULTY_LABELS[topic.difficulty]} ({topic.difficulty}/5)
                        </div>
                      </div>
                    </>
                  )}
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
                  {hasChunks && (
                    <>
                      <Separator />
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Content Chunks</div>
                        <div className="text-sm font-medium text-foreground">{topic.chunks!.length} sections</div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

