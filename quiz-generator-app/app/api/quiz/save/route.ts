import { type NextRequest, NextResponse } from "next/server"

// Mock database - in a real app, you'd use a proper database
const quizzes: any[] = []

export async function POST(request: NextRequest) {
  try {
    const quizData = await request.json()

    // Validate required fields
    if (!quizData.title || !quizData.questions || quizData.questions.length === 0) {
      return NextResponse.json({ error: "Quiz title and questions are required" }, { status: 400 })
    }

    // Generate quiz ID and add metadata
    const quiz = {
      id: Date.now().toString(),
      ...quizData,
      createdAt: new Date().toISOString(),
      createdBy: "user123", // In real app, get from auth
      attempts: 0,
      avgScore: 0,
    }

    // Save to mock database
    quizzes.push(quiz)

    return NextResponse.json({
      success: true,
      quizId: quiz.id,
      message: "Quiz saved successfully",
    })
  } catch (error) {
    console.error("Quiz save error:", error)
    return NextResponse.json({ error: "Failed to save quiz" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ quizzes })
}
