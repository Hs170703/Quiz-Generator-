"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navbar } from "@/components/navbar"
import { ArrowLeft, Search, Download, Mail, Users } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock participants data
const mockParticipants = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    score: 92,
    timeSpent: 480, // 8 minutes
    completedAt: "2024-01-07 14:30",
    status: "completed",
    attempts: 1,
  },
  {
    id: "2",
    name: "Mike Rodriguez",
    email: "mike@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    score: 85,
    timeSpent: 525, // 8:45
    completedAt: "2024-01-07 15:15",
    status: "completed",
    attempts: 2,
  },
  {
    id: "3",
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    score: 78,
    timeSpent: 600, // 10 minutes
    completedAt: "2024-01-07 16:00",
    status: "completed",
    attempts: 1,
  },
  {
    id: "4",
    name: "Emma Wilson",
    email: "emma@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    score: 0,
    timeSpent: 0,
    completedAt: null,
    status: "invited",
    attempts: 0,
  },
  {
    id: "5",
    name: "David Kim",
    email: "david@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    score: 0,
    timeSpent: 180, // 3 minutes - abandoned
    completedAt: null,
    status: "in-progress",
    attempts: 1,
  },
]

const mockQuiz = {
  title: "JavaScript Fundamentals",
  code: "ABC123",
  totalQuestions: 15,
}

export default function ParticipantsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const formatTime = (seconds: number) => {
    if (seconds === 0) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "invited":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const filteredParticipants = mockParticipants.filter((participant) => {
    const matchesSearch =
      participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || participant.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: mockParticipants.length,
    completed: mockParticipants.filter((p) => p.status === "completed").length,
    inProgress: mockParticipants.filter((p) => p.status === "in-progress").length,
    invited: mockParticipants.filter((p) => p.status === "invited").length,
    avgScore: Math.round(
      mockParticipants.filter((p) => p.status === "completed").reduce((acc, p) => acc + p.score, 0) /
        mockParticipants.filter((p) => p.status === "completed").length,
    ),
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Quiz Management
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Quiz Participants</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  {mockQuiz.title} (Code: {mockQuiz.code})
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Reminders
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Total</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">In Progress</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-600">{stats.invited}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Invited</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.avgScore}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Avg Score</div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search participants..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filterStatus === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={filterStatus === "completed" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus("completed")}
                  >
                    Completed
                  </Button>
                  <Button
                    variant={filterStatus === "in-progress" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus("in-progress")}
                  >
                    In Progress
                  </Button>
                  <Button
                    variant={filterStatus === "invited" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus("invited")}
                  >
                    Invited
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Participants List */}
          <Card>
            <CardHeader>
              <CardTitle>Participants ({filteredParticipants.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredParticipants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {participant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{participant.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{participant.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {participant.status === "completed" ? `${participant.score}%` : "-"}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">Score</div>
                      </div>

                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {formatTime(participant.timeSpent)}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">Time</div>
                      </div>

                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{participant.attempts}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">Attempts</div>
                      </div>

                      <Badge className={getStatusColor(participant.status)}>
                        {participant.status.replace("-", " ")}
                      </Badge>

                      {participant.completedAt && (
                        <div className="text-right">
                          <div className="text-sm text-gray-600 dark:text-gray-300">{participant.completedAt}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {filteredParticipants.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No participants found</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {searchTerm ? "Try adjusting your search terms." : "Share your quiz to get participants!"}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
