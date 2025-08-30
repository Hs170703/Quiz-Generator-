"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { ArrowLeft, Play, Edit, Settings } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock quiz data - in real app, fetch from API
const mockQuiz = {
  id: "quiz-123",
  title: "JavaScript Fundamentals",
  description: "Test your knowledge of JavaScript basics",
  difficulty: "Medium",
  timeLimit: 600, // 10 minutes
  questions: [
    {
      id: "1",
      question: "What is the correct way to declare a variable in JavaScript?",
      options: ["var myVar;", "variable myVar;", "v myVar;", "declare myVar;"],
      correctAnswer: 0,
      explanation:
        'The "var" keyword is used to declare variables in JavaScript, though "let" and "const" are preferred in modern JavaScript.',
    },
    {
      id: "2",
      question: "Which method is used to add an element to the end of an array?",
      options: ["append()", "push()", "add()", "insert()"],
      correctAnswer: 1,
      explanation:
        "The push() method adds one or more elements to the end of an array and returns the new length of the array.",
    },
    {
      id: "3",
      question: 'What does "===" operator do in JavaScript?',
      options: ["Assignment", "Equality without type checking", "Strict equality with type checking", "Not equal"],
      correctAnswer: 2,
      explanation: "The === operator checks for strict equality, meaning both value and type must be the same.",
    },
  ],
  stats: {
    attempts: 245,
    avgScore: 78,
    avgTime: 480, // 8 minutes
  },
  code: "ABC123",
  createdAt: "2024-01-07",
}

export default function QuizPreviewPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Quiz Management
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Quiz Preview</h1>
                <p className="text-gray-600 dark:text-gray-300">Preview how your quiz will appear to participants</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" asChild>
                  <Link href={`/quiz/edit/${params.id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Quiz
                  </Link>
                </Button>
                <Button asChild>
                  <Link href={`/quiz/take/${params.id}`}>
                    <Play className="mr-2 h-4 w-4" />
                    Take Quiz
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Quiz Info Card */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{mockQuiz.title}</CardTitle>
                  <CardDescription className="text-lg mt-2">{mockQuiz.description}</CardDescription>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge variant="secondary" className="text-sm">
                    Code: {mockQuiz.code}
                  </Badge>
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                    {mockQuiz.difficulty}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{mockQuiz.questions.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Questions</div>
                </div>
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{formatTime(mockQuiz.timeLimit)}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Time Limit</div>
                </div>
                <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{mockQuiz.stats.attempts}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Attempts</div>
                </div>
                <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{mockQuiz.stats.avgScore}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Avg Score</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Questions Preview */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Questions Preview</h2>

            {mockQuiz.questions.map((question, index) => (
              <Card key={question.id}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Question {index + 1} of {mockQuiz.questions.length}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">{question.question}</h3>

                  <div className="space-y-3 mb-4">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-3 rounded-lg border transition-colors ${
                          optIndex === question.correctAnswer
                            ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200"
                            : "bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="font-medium mr-3 text-sm bg-white dark:bg-gray-900 px-2 py-1 rounded">
                            {String.fromCharCode(65 + optIndex)}
                          </span>
                          {option}
                          {optIndex === question.correctAnswer && (
                            <Badge variant="default" className="ml-auto bg-green-600">
                              Correct
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {question.explanation && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-2">Explanation:</h4>
                      <p className="text-blue-800 dark:text-blue-300 text-sm">{question.explanation}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href={`/quiz/take/${params.id}`}>
                <Play className="mr-2 h-4 w-4" />
                Take This Quiz
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={`/quiz/manage?code=${mockQuiz.code}`}>
                <Settings className="mr-2 h-4 w-4" />
                Back to Management
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
