"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Navbar } from "@/components/navbar"
import {
  Share2,
  Copy,
  QrCode,
  Mail,
  MessageCircle,
  Eye,
  Users,
  Clock,
  Settings,
  LinkIcon,
  Download,
} from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import QRCode from "qrcode"

export default function QuizManagePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const quizCode = searchParams.get("code") || "ABC123"
  const [quizUrl, setQuizUrl] = useState("")
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [visibility, setVisibility] = useState("public")
  const [timeLimit, setTimeLimit] = useState("10")
  const [allowRetakes, setAllowRetakes] = useState(true)
  const [showAnswers, setShowAnswers] = useState(true)
  const { toast } = useToast()

  // Mock quiz data
  const quizData = {
    id: "quiz-123",
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics",
    questions: 15,
    code: quizCode,
    createdAt: "2024-01-07",
    attempts: 0,
    avgScore: 0,
  }

  useEffect(() => {
    const baseUrl = window.location.origin
    const url = `${baseUrl}/quiz/take/${quizData.id}?code=${quizCode}`
    setQuizUrl(url)

    // Generate QR Code
    QRCode.toDataURL(url).then(setQrCodeUrl).catch(console.error)
  }, [quizCode, quizData.id])

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard.`,
    })
  }

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Take my quiz: ${quizData.title}`)
    const body = encodeURIComponent(
      `Hi! I've created a quiz called "${quizData.title}" and would love for you to try it.\n\nQuiz Code: ${quizCode}\nDirect Link: ${quizUrl}\n\nHave fun!`,
    )
    window.open(`mailto:?subject=${subject}&body=${body}`)
  }

  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(`Check out my quiz: "${quizData.title}"\nCode: ${quizCode}\nLink: ${quizUrl}`)
    window.open(`https://wa.me/?text=${text}`)
  }

  const downloadQRCode = () => {
    const link = document.createElement("a")
    link.download = `quiz-${quizCode}-qr.png`
    link.href = qrCodeUrl
    link.click()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Quiz Published Successfully! 🎉
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              Your quiz "{quizData.title}" is now live and ready to be shared
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Quiz Info */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="text-lg sm:text-xl">{quizData.title}</span>
                    <Badge variant="default" className="bg-green-600 w-fit">
                      Published
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">{quizData.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-xl sm:text-2xl font-bold text-blue-600">{quizData.questions}</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Questions</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-xl sm:text-2xl font-bold text-green-600">{quizData.attempts}</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Attempts</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-xl sm:text-2xl font-bold text-purple-600">{quizData.avgScore}%</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Avg Score</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="text-xl sm:text-2xl font-bold text-orange-600">{quizCode}</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Quiz Code</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="share" className="space-y-4 sm:space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="share" className="text-xs sm:text-sm">
                    Share Quiz
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="text-xs sm:text-sm">
                    Quiz Settings
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="share" className="space-y-4 sm:space-y-6">
                  {/* Quiz Code Sharing */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg sm:text-xl">
                        <Share2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        Share with Quiz Code
                      </CardTitle>
                      <CardDescription className="text-sm">
                        Share this code with participants to let them join your quiz
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="quiz-code">Quiz Code</Label>
                        <div className="flex mt-1">
                          <Input
                            id="quiz-code"
                            value={quizCode}
                            readOnly
                            className="font-mono text-base sm:text-lg font-bold text-center"
                          />
                          <Button
                            variant="outline"
                            className="ml-2 px-3"
                            onClick={() => copyToClipboard(quizCode, "Quiz code")}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        Participants can enter this code at the "Join Quiz" page to access your quiz.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Direct Link Sharing */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg sm:text-xl">
                        <LinkIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        Direct Link
                      </CardTitle>
                      <CardDescription className="text-sm">Share the direct link to your quiz</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Input value={quizUrl} readOnly className="font-mono text-xs sm:text-sm flex-1" />
                        <Button
                          variant="outline"
                          onClick={() => copyToClipboard(quizUrl, "Quiz link")}
                          className="sm:w-auto"
                        >
                          <Copy className="h-4 w-4 mr-2 sm:mr-0" />
                          <span className="sm:hidden">Copy Link</span>
                        </Button>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button variant="outline" onClick={shareViaEmail} className="flex-1 sm:flex-none">
                          <Mail className="mr-2 h-4 w-4" />
                          Email
                        </Button>
                        <Button variant="outline" onClick={shareViaWhatsApp} className="flex-1 sm:flex-none">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          WhatsApp
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* QR Code */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg sm:text-xl">
                        <QrCode className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        QR Code
                      </CardTitle>
                      <CardDescription className="text-sm">Let participants scan to join instantly</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      {qrCodeUrl && (
                        <div className="inline-block p-4 bg-white rounded-lg shadow-sm">
                          <img
                            src={qrCodeUrl || "/placeholder.svg"}
                            alt="Quiz QR Code"
                            className="w-32 h-32 sm:w-48 sm:h-48 mx-auto"
                          />
                        </div>
                      )}
                      <Button variant="outline" onClick={downloadQRCode} className="w-full sm:w-auto">
                        <Download className="mr-2 h-4 w-4" />
                        Download QR Code
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4 sm:space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg sm:text-xl">
                        <Settings className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        Quiz Settings
                      </CardTitle>
                      <CardDescription className="text-sm">
                        Configure how participants can access and take your quiz
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="visibility">Quiz Visibility</Label>
                        <Select value={visibility} onValueChange={setVisibility}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public - Anyone can find and take</SelectItem>
                            <SelectItem value="unlisted">Unlisted - Only accessible via link/code</SelectItem>
                            <SelectItem value="private">Private - Invite only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="time-limit">Time Limit (minutes)</Label>
                        <Select value={timeLimit} onValueChange={setTimeLimit}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 minutes</SelectItem>
                            <SelectItem value="10">10 minutes</SelectItem>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="0">No time limit</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="allow-retakes">Allow Retakes</Label>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                            Let participants retake the quiz multiple times
                          </p>
                        </div>
                        <Switch id="allow-retakes" checked={allowRetakes} onCheckedChange={setAllowRetakes} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="show-answers">Show Correct Answers</Label>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                            Display correct answers after completion
                          </p>
                        </div>
                        <Switch id="show-answers" checked={showAnswers} onCheckedChange={setShowAnswers} />
                      </div>

                      <Button className="w-full">Save Settings</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Quick Actions Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => router.push(`/quiz/preview/${quizData.id}`)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Preview Quiz
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => router.push(`/quiz/participants/${quizData.id}`)}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    View Participants
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => router.push(`/quiz/results/${quizData.id}`)}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    View Results
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Sharing Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Share the quiz code for easy access</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Use QR codes for in-person events</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Direct links work great for online sharing</p>
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
