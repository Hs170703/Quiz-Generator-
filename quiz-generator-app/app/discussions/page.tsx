"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MessageSquare, ThumbsUp, Reply, Search, Filter, Clock, User, TrendingUp, Send, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Discussion {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar: string
    id: string
  }
  quiz: string
  questionNumber: number
  replies: number
  upvotes: number
  tags: string[]
  createdAt: string
  isAnswered: boolean
  userHasUpvoted?: boolean
}

const initialDiscussions: Discussion[] = [
  {
    id: "1",
    title: "Confused about JavaScript closures",
    content: "Can someone explain how closures work in JavaScript? I keep getting confused about the scope.",
    author: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      id: "sarah123",
    },
    quiz: "JavaScript Fundamentals",
    questionNumber: 7,
    replies: 12,
    upvotes: 24,
    tags: ["JavaScript", "Closures", "Scope"],
    createdAt: "2 hours ago",
    isAnswered: true,
    userHasUpvoted: false,
  },
  {
    id: "2",
    title: "React useEffect dependency array",
    content: "Why do we need to include all dependencies in the useEffect dependency array? What happens if we don't?",
    author: {
      name: "Mike Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      id: "mike456",
    },
    quiz: "React Hooks Deep Dive",
    questionNumber: 3,
    replies: 8,
    upvotes: 18,
    tags: ["React", "Hooks", "useEffect"],
    createdAt: "4 hours ago",
    isAnswered: false,
    userHasUpvoted: false,
  },
  {
    id: "3",
    title: "Python list comprehension vs loops",
    content: "When should I use list comprehensions instead of regular for loops? Are there performance differences?",
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      id: "alex789",
    },
    quiz: "Python Data Structures",
    questionNumber: 5,
    replies: 15,
    upvotes: 31,
    tags: ["Python", "Performance", "Best Practices"],
    createdAt: "1 day ago",
    isAnswered: true,
    userHasUpvoted: true,
  },
]

const trendingTopics = [
  { name: "JavaScript", count: 45 },
  { name: "React", count: 32 },
  { name: "Python", count: 28 },
  { name: "CSS", count: 19 },
  { name: "Node.js", count: 15 },
]

export default function DiscussionsPage() {
  const [discussions, setDiscussions] = useState<Discussion[]>(initialDiscussions)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [showReplyDialog, setShowReplyDialog] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    content: "",
    quiz: "",
    questionNumber: "",
    tags: "",
  })
  const { toast } = useToast()
  const [activeSearchTerm, setActiveSearchTerm] = useState("")

  const handleUpvote = (discussionId: string) => {
    setDiscussions((prev) =>
      prev.map((discussion) => {
        if (discussion.id === discussionId) {
          const hasUpvoted = discussion.userHasUpvoted
          return {
            ...discussion,
            upvotes: hasUpvoted ? discussion.upvotes - 1 : discussion.upvotes + 1,
            userHasUpvoted: !hasUpvoted,
          }
        }
        return discussion
      }),
    )

    const discussion = discussions.find((d) => d.id === discussionId)
    const action = discussion?.userHasUpvoted ? "removed" : "added"

    toast({
      title: `Upvote ${action}`,
      description: `Your upvote has been ${action} successfully.`,
    })
  }

  const handleReply = (discussionId: string) => {
    if (!replyContent.trim()) {
      toast({
        title: "Reply required",
        description: "Please enter a reply before submitting.",
        variant: "destructive",
      })
      return
    }

    setDiscussions((prev) =>
      prev.map((discussion) => {
        if (discussion.id === discussionId) {
          return {
            ...discussion,
            replies: discussion.replies + 1,
          }
        }
        return discussion
      }),
    )

    setShowReplyDialog(null)
    setReplyContent("")

    toast({
      title: "Reply posted",
      description: "Your reply has been posted successfully.",
    })
  }

  const handleCreateDiscussion = () => {
    if (!newDiscussion.title.trim() || !newDiscussion.content.trim()) {
      toast({
        title: "Discussion incomplete",
        description: "Please fill in both title and content.",
        variant: "destructive",
      })
      return
    }

    const tags = newDiscussion.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)

    const discussion: Discussion = {
      id: Date.now().toString(),
      title: newDiscussion.title,
      content: newDiscussion.content,
      author: {
        name: "John Doe", // In real app, get from auth context
        avatar: "/placeholder.svg?height=32&width=32",
        id: "john123",
      },
      quiz: newDiscussion.quiz || "General Discussion",
      questionNumber: Number.parseInt(newDiscussion.questionNumber) || 0,
      replies: 0,
      upvotes: 0,
      tags: tags.length > 0 ? tags : ["General"],
      createdAt: "Just now",
      isAnswered: false,
      userHasUpvoted: false,
    }

    setDiscussions((prev) => [discussion, ...prev])
    setNewDiscussion({
      title: "",
      content: "",
      quiz: "",
      questionNumber: "",
      tags: "",
    })

    toast({
      title: "Discussion created",
      description: "Your discussion has been posted successfully.",
    })
  }

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setActiveSearchTerm(searchTerm.trim())
      toast({
        title: "Search applied",
        description: `Searching for "${searchTerm.trim()}"`,
      })
    }
  }

  const handleClearSearch = () => {
    setSearchTerm("")
    setActiveSearchTerm("")
    toast({
      title: "Search cleared",
      description: "Showing all discussions",
    })
  }

  const handleTopicFilter = (topic: string) => {
    setSearchTerm(topic.toLowerCase())
    setActiveSearchTerm(topic.toLowerCase())
    toast({
      title: "Filter applied",
      description: `Filtering by "${topic}"`,
    })
  }

  const filteredDiscussions = discussions.filter((discussion) => {
    const matchesSearch =
      !activeSearchTerm ||
      discussion.title.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
      discussion.content.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
      discussion.tags.some((tag) => tag.toLowerCase().includes(activeSearchTerm.toLowerCase())) ||
      discussion.author.name.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
      discussion.quiz.toLowerCase().includes(activeSearchTerm.toLowerCase())

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "answered" && discussion.isAnswered) ||
      (filterStatus === "unanswered" && !discussion.isAnswered) ||
      (filterStatus === "my-posts" && discussion.author.id === "john123") // Current user

    return matchesSearch && matchesFilter
  })

  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    switch (sortBy) {
      case "upvotes":
        return b.upvotes - a.upvotes
      case "replies":
        return b.replies - a.replies
      case "recent":
      default:
        return 0 // Keep original order for "recent"
    }
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Discussions</h1>
            <p className="text-gray-600 dark:text-gray-300">Ask questions, share knowledge, and help others learn</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Search */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Search Discussions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search discussions..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleSearch()
                          }
                        }}
                      />
                    </div>
                    <Button onClick={handleSearch} className="w-full" size="sm" disabled={!searchTerm.trim()}>
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                    {activeSearchTerm && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Searching for: "{activeSearchTerm}"</span>
                        <Button variant="ghost" size="sm" onClick={handleClearSearch} className="h-6 px-2 text-xs">
                          Clear
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Filters */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Filter className="mr-2 h-5 w-5" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Discussions</SelectItem>
                        <SelectItem value="answered">Answered</SelectItem>
                        <SelectItem value="unanswered">Unanswered</SelectItem>
                        <SelectItem value="my-posts">My Posts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="upvotes">Most Upvoted</SelectItem>
                        <SelectItem value="replies">Most Replies</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Trending Topics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {trendingTopics.map((topic) => (
                      <div key={topic.name} className="flex items-center justify-between">
                        <Badge
                          variant="secondary"
                          className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                          onClick={() => handleTopicFilter(topic.name)}
                        >
                          {topic.name}
                        </Badge>
                        <span className="text-sm text-gray-500">{topic.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Community Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Discussions</span>
                    <Badge variant="outline">{discussions.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Active Users</span>
                    <Badge variant="outline">567</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Questions Answered</span>
                    <Badge variant="outline">
                      {Math.round((discussions.filter((d) => d.isAnswered).length / discussions.length) * 100)}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="browse" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="browse">Browse Discussions</TabsTrigger>
                  <TabsTrigger value="create">Start Discussion</TabsTrigger>
                </TabsList>

                <TabsContent value="browse" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                      {activeSearchTerm ? (
                        <>
                          Search Results for "{activeSearchTerm}" ({sortedDiscussions.length})
                        </>
                      ) : (
                        <>
                          {filterStatus === "all"
                            ? "All Discussions"
                            : filterStatus === "answered"
                              ? "Answered Discussions"
                              : filterStatus === "unanswered"
                                ? "Unanswered Discussions"
                                : "My Discussions"}{" "}
                          ({sortedDiscussions.length})
                        </>
                      )}
                    </h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setFilterStatus("all")
                        setSearchTerm("")
                        setActiveSearchTerm("")
                        setSortBy("recent")
                        toast({
                          title: "Filters cleared",
                          description: "Showing all discussions",
                        })
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {sortedDiscussions.map((discussion) => (
                      <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <Avatar>
                              <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {discussion.author.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold text-gray-900 dark:text-white">{discussion.title}</h3>
                                {discussion.isAnswered && (
                                  <Badge variant="default" className="bg-green-600">
                                    Answered
                                  </Badge>
                                )}
                              </div>

                              <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{discussion.content}</p>

                              <div className="flex flex-wrap gap-2 mb-3">
                                {discussion.tags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="text-xs cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                                    onClick={() => handleTopicFilter(tag)}
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center space-x-4">
                                  <span className="flex items-center">
                                    <User className="mr-1 h-4 w-4" />
                                    {discussion.author.name}
                                  </span>
                                  <span className="flex items-center">
                                    <Clock className="mr-1 h-4 w-4" />
                                    {discussion.createdAt}
                                  </span>
                                  {discussion.questionNumber > 0 && (
                                    <span>
                                      Quiz: {discussion.quiz} (Q{discussion.questionNumber})
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleUpvote(discussion.id)}
                                    className={`flex items-center space-x-1 ${
                                      discussion.userHasUpvoted ? "text-blue-600" : ""
                                    }`}
                                  >
                                    <ThumbsUp
                                      className={`h-4 w-4 ${discussion.userHasUpvoted ? "fill-current" : ""}`}
                                    />
                                    <span>{discussion.upvotes}</span>
                                  </Button>

                                  <span className="flex items-center text-gray-500">
                                    <MessageSquare className="mr-1 h-4 w-4" />
                                    {discussion.replies}
                                  </span>

                                  <Dialog
                                    open={showReplyDialog === discussion.id}
                                    onOpenChange={(open) => setShowReplyDialog(open ? discussion.id : null)}
                                  >
                                    <DialogTrigger asChild>
                                      <Button variant="outline" size="sm">
                                        <Reply className="mr-2 h-4 w-4" />
                                        Reply
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Reply to Discussion</DialogTitle>
                                        <DialogDescription>Replying to: "{discussion.title}"</DialogDescription>
                                      </DialogHeader>
                                      <div className="space-y-4">
                                        <Textarea
                                          placeholder="Write your reply..."
                                          value={replyContent}
                                          onChange={(e) => setReplyContent(e.target.value)}
                                          rows={4}
                                        />
                                        <div className="flex justify-end space-x-2">
                                          <Button variant="outline" onClick={() => setShowReplyDialog(null)}>
                                            Cancel
                                          </Button>
                                          <Button onClick={() => handleReply(discussion.id)}>
                                            <Send className="mr-2 h-4 w-4" />
                                            Post Reply
                                          </Button>
                                        </div>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {sortedDiscussions.length === 0 && (
                      <Card>
                        <CardContent className="p-8 text-center">
                          <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No discussions found
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            {activeSearchTerm
                              ? `No discussions match your search for "${activeSearchTerm}".`
                              : filterStatus !== "all"
                                ? "Try adjusting your filters."
                                : "Be the first to start a discussion!"}
                          </p>
                          <div className="flex justify-center space-x-2">
                            {activeSearchTerm && (
                              <Button variant="outline" onClick={handleClearSearch}>
                                Clear Search
                              </Button>
                            )}
                            <Button
                              onClick={() => {
                                setSearchTerm("")
                                setActiveSearchTerm("")
                                setFilterStatus("all")
                                setSortBy("recent")
                              }}
                            >
                              {activeSearchTerm || filterStatus !== "all" ? "Show All Discussions" : "Start Discussion"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="create" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Start a New Discussion</CardTitle>
                      <CardDescription>Ask a question or start a discussion about any quiz topic</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Discussion Title *</label>
                        <Input
                          placeholder="What's your question or topic?"
                          value={newDiscussion.title}
                          onChange={(e) =>
                            setNewDiscussion({
                              ...newDiscussion,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Related Quiz (Optional)</label>
                          <Input
                            placeholder="e.g., JavaScript Fundamentals"
                            value={newDiscussion.quiz}
                            onChange={(e) =>
                              setNewDiscussion({
                                ...newDiscussion,
                                quiz: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Question Number (Optional)</label>
                          <Input
                            placeholder="e.g., 5"
                            type="number"
                            value={newDiscussion.questionNumber}
                            onChange={(e) =>
                              setNewDiscussion({
                                ...newDiscussion,
                                questionNumber: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Tags (Optional)</label>
                        <Input
                          placeholder="e.g., JavaScript, React, Beginner (comma-separated)"
                          value={newDiscussion.tags}
                          onChange={(e) =>
                            setNewDiscussion({
                              ...newDiscussion,
                              tags: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Description *</label>
                        <Textarea
                          placeholder="Provide more details about your question or topic..."
                          rows={6}
                          value={newDiscussion.content}
                          onChange={(e) =>
                            setNewDiscussion({
                              ...newDiscussion,
                              content: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() =>
                            setNewDiscussion({
                              title: "",
                              content: "",
                              quiz: "",
                              questionNumber: "",
                              tags: "",
                            })
                          }
                        >
                          Clear
                        </Button>
                        <Button onClick={handleCreateDiscussion}>
                          <Plus className="mr-2 h-4 w-4" />
                          Post Discussion
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
