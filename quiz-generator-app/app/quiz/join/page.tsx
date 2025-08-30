"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Search, Clock, Users, Trophy, Play } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const popularQuizzes = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics",
    questions: 15,
    difficulty: "Medium",
    attempts: 245,
    avgScore: 78,
    tags: ["Programming", "JavaScript"],
  },
  {
    id: "2",
    title: "React Hooks Deep Dive",
    description: "Advanced React hooks concepts and patterns",
    questions: 20,
    difficulty: "Hard",
    attempts: 189,
    avgScore: 65,
    tags: ["React", "Frontend"],
  },
  {
    id: "3",
    title: "Python Data Structures",
    description: "Lists, dictionaries, sets, and more",
    questions: 12,
    difficulty: "Easy",
    attempts: 156,
    avgScore: 85,
    tags: ["Python", "Data Structures"],
  },
  {
    id: "4",
    title: "Web Security Basics",
    description: "Essential web security concepts",
    questions: 18,
    difficulty: "Medium",
    attempts: 134,
    avgScore: 72,
    tags: ["Security", "Web Development"],
  },
]

export default function JoinQuizPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [quizCode, setQuizCode] = useState("")

  const router = useRouter()
  const { toast } = useToast()

  const filteredQuizzes = popularQuizzes.filter(
    (quiz) =>
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const handleJoinByCode = () => {
    if (!quizCode.trim()) {
      toast({
        title: "Quiz code required",
        description: "Please enter a valid quiz code.",
        variant: "destructive",
      })
      return
    }

    // Simulate finding quiz by code
    const foundQuiz = popularQuizzes.find((quiz) => quiz.id === "1") // Mock finding quiz

    if (foundQuiz) {
      toast({
        title: "Quiz found!",
        description: `Joining "${foundQuiz.title}"...`,
      })
      router.push(`/quiz/take/${foundQuiz.id}?code=${quizCode}`)
    } else {
      toast({
        title: "Quiz not found",
        description: "Please check the code and try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Join a Quiz</h1>
            <p className="text-gray-600 dark:text-gray-300">Find and take quizzes created by the community</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Search and Filters */}
            <div className="lg:col-span-1 space-y-6">
              {/* Join by Code */}
              <Card>
                <CardHeader>
                  <CardTitle>Join by Code</CardTitle>
                  <CardDescription>Enter a quiz code to join directly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Enter quiz code" value={quizCode} onChange={(e) => setQuizCode(e.target.value)} />
                  <Button className="w-full" disabled={!quizCode.trim()} onClick={handleJoinByCode}>
                    <Play className="mr-2 h-4 w-4" />
                    Join Quiz
                  </Button>
                </CardContent>
              </Card>

              {/* Search */}
              <Card>
                <CardHeader>
                  <CardTitle>Search Quizzes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by title, topic, or tags"
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Quizzes</span>
                    <Badge variant="secondary">1,234</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Active Users</span>
                    <Badge variant="secondary">5,678</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Quizzes Today</span>
                    <Badge variant="secondary">89</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quiz List */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Popular Quizzes</h2>
                  <Badge variant="outline">{filteredQuizzes.length} results</Badge>
                </div>

                {filteredQuizzes.map((quiz) => (
                  <Card key={quiz.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{quiz.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-3">{quiz.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {quiz.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Badge className={getDifficultyColor(quiz.difficulty)}>{quiz.difficulty}</Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            {quiz.questions} questions
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-1 h-4 w-4" />
                            {quiz.attempts} attempts
                          </div>
                          <div className="flex items-center">
                            <Trophy className="mr-1 h-4 w-4" />
                            {quiz.avgScore}% avg
                          </div>
                        </div>
                        <Button asChild>
                          <Link href={`/quiz/take/${quiz.id}`}>
                            <Play className="mr-2 h-4 w-4" />
                            Start Quiz
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredQuizzes.length === 0 && (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No quizzes found</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Try adjusting your search terms or browse all available quizzes.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
