import { type NextRequest, NextResponse } from "next/server"

// Enhanced fallback quiz generation with topic-specific questions
function generateFallbackQuiz(topic: string, difficulty: string, questionCount: number) {
  const topicLower = topic.toLowerCase()

  // Topic-specific question templates
  const questionTemplates: { [key: string]: any } = {
    javascript: {
      easy: [
        {
          question: "What keyword is used to declare a variable in JavaScript?",
          options: ["var", "variable", "declare", "let"],
          correctAnswer: 0,
          explanation:
            "The 'var' keyword is used to declare variables in JavaScript, though 'let' and 'const' are preferred in modern JavaScript.",
        },
        {
          question: "Which method is used to add an element to the end of an array?",
          options: ["append()", "push()", "add()", "insert()"],
          correctAnswer: 1,
          explanation: "The push() method adds one or more elements to the end of an array and returns the new length.",
        },
        {
          question: "What does 'console.log()' do in JavaScript?",
          options: [
            "Creates a new variable",
            "Prints output to the console",
            "Defines a function",
            "Imports a library",
          ],
          correctAnswer: 1,
          explanation: "console.log() is used to print output to the browser's console for debugging purposes.",
        },
        {
          question: "How do you create a function in JavaScript?",
          options: ["function myFunc() {}", "create myFunc() {}", "def myFunc() {}", "func myFunc() {}"],
          correctAnswer: 0,
          explanation:
            "Functions in JavaScript are created using the 'function' keyword followed by the function name.",
        },
        {
          question: "What is the correct way to write a JavaScript array?",
          options: [
            "var colors = 'red', 'green', 'blue'",
            "var colors = (1:'red', 2:'green', 3:'blue')",
            "var colors = ['red', 'green', 'blue']",
            "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')",
          ],
          correctAnswer: 2,
          explanation: "JavaScript arrays are written with square brackets and comma-separated values.",
        },
      ],
      medium: [
        {
          question: "What is the difference between '==' and '===' in JavaScript?",
          options: [
            "No difference",
            "=== checks type and value, == only checks value",
            "== is faster",
            "=== is deprecated",
          ],
          correctAnswer: 1,
          explanation:
            "The === operator checks for strict equality (both type and value), while == performs type coercion.",
        },
        {
          question: "What is a closure in JavaScript?",
          options: [
            "A type of loop",
            "A function with access to outer scope",
            "A way to close files",
            "An error handling mechanism",
          ],
          correctAnswer: 1,
          explanation:
            "A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.",
        },
        {
          question: "What does 'this' refer to in JavaScript?",
          options: [
            "The current function",
            "The global object",
            "The object that owns the method",
            "The previous function",
          ],
          correctAnswer: 2,
          explanation: "'this' refers to the object that owns the method where 'this' is used.",
        },
        {
          question: "What is hoisting in JavaScript?",
          options: [
            "Moving variables to the top",
            "A way to lift heavy objects",
            "Variable and function declarations are moved to the top of their scope",
            "A debugging technique",
          ],
          correctAnswer: 2,
          explanation:
            "Hoisting is JavaScript's behavior of moving variable and function declarations to the top of their containing scope.",
        },
      ],
      hard: [
        {
          question: "What is the event loop in JavaScript?",
          options: [
            "A type of for loop",
            "The mechanism that handles asynchronous operations",
            "A debugging tool",
            "A way to bind events",
          ],
          correctAnswer: 1,
          explanation:
            "The event loop is JavaScript's mechanism for handling asynchronous operations and managing the call stack.",
        },
        {
          question: "What is prototypal inheritance in JavaScript?",
          options: [
            "A way to inherit from classes",
            "Objects can inherit directly from other objects",
            "A method of copying functions",
            "A debugging feature",
          ],
          correctAnswer: 1,
          explanation: "JavaScript uses prototypal inheritance where objects can inherit directly from other objects.",
        },
      ],
    },
    react: {
      easy: [
        {
          question: "What is JSX in React?",
          options: [
            "A database",
            "A syntax extension for JavaScript",
            "A testing framework",
            "A state management tool",
          ],
          correctAnswer: 1,
          explanation:
            "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in React components.",
        },
        {
          question: "How do you create a React component?",
          options: [
            "function MyComponent() { return <div>Hello</div>; }",
            "create MyComponent() { return <div>Hello</div>; }",
            "component MyComponent() { return <div>Hello</div>; }",
            "def MyComponent() { return <div>Hello</div>; }",
          ],
          correctAnswer: 0,
          explanation: "React components are created as JavaScript functions that return JSX.",
        },
      ],
      medium: [
        {
          question: "What is the purpose of useEffect hook?",
          options: ["To manage state", "To handle side effects", "To create components", "To style components"],
          correctAnswer: 1,
          explanation:
            "useEffect is used to handle side effects in functional components, such as API calls, subscriptions, or DOM manipulation.",
        },
        {
          question: "What is the useState hook used for?",
          options: ["To handle side effects", "To manage component state", "To create components", "To handle events"],
          correctAnswer: 1,
          explanation: "useState is a React hook that allows you to add state to functional components.",
        },
      ],
    },
    python: {
      easy: [
        {
          question: "Which symbol is used for comments in Python?",
          options: ["//", "#", "/*", "--"],
          correctAnswer: 1,
          explanation: "The # symbol is used for single-line comments in Python.",
        },
        {
          question: "What data type is [1, 2, 3] in Python?",
          options: ["tuple", "list", "dictionary", "set"],
          correctAnswer: 1,
          explanation: "Square brackets [] define a list in Python, which is an ordered, mutable collection.",
        },
        {
          question: "How do you print 'Hello World' in Python?",
          options: [
            "echo('Hello World')",
            "print('Hello World')",
            "console.log('Hello World')",
            "printf('Hello World')",
          ],
          correctAnswer: 1,
          explanation: "The print() function is used to output text in Python.",
        },
      ],
      medium: [
        {
          question: "What is list comprehension in Python?",
          options: [
            "A way to understand lists",
            "A concise way to create lists",
            "A debugging technique",
            "A sorting algorithm",
          ],
          correctAnswer: 1,
          explanation:
            "List comprehension provides a concise way to create lists based on existing lists or other iterables.",
        },
        {
          question: "What is the difference between a list and a tuple in Python?",
          options: [
            "No difference",
            "Lists are mutable, tuples are immutable",
            "Tuples are faster",
            "Lists use more memory",
          ],
          correctAnswer: 1,
          explanation:
            "Lists are mutable (can be changed) while tuples are immutable (cannot be changed after creation).",
        },
      ],
    },
    css: {
      easy: [
        {
          question: "What does CSS stand for?",
          options: [
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Creative Style Sheets",
            "Colorful Style Sheets",
          ],
          correctAnswer: 1,
          explanation: "CSS stands for Cascading Style Sheets, used for styling web pages.",
        },
        {
          question: "How do you select an element with id 'header' in CSS?",
          options: [".header", "#header", "header", "*header"],
          correctAnswer: 1,
          explanation: "The # symbol is used to select elements by their ID in CSS.",
        },
      ],
      medium: [
        {
          question: "What is the CSS box model?",
          options: [
            "A way to create boxes",
            "Content, padding, border, and margin",
            "A layout technique",
            "A debugging tool",
          ],
          correctAnswer: 1,
          explanation: "The CSS box model consists of content, padding, border, and margin areas around an element.",
        },
      ],
    },
  }

  // Default generic questions for unknown topics
  const defaultQuestions = [
    {
      question: `What is a fundamental concept in ${topic}?`,
      options: [
        `Basic ${topic} principle`,
        `Advanced ${topic} technique`,
        `${topic} methodology`,
        `${topic} framework`,
      ],
      correctAnswer: 0,
      explanation: `This question covers fundamental concepts in ${topic}. Understanding basic principles is essential for mastering ${topic}.`,
    },
    {
      question: `Which approach is commonly used in ${topic}?`,
      options: [`Standard ${topic} approach`, `Alternative method`, `Deprecated technique`, `Experimental approach`],
      correctAnswer: 0,
      explanation: `Standard approaches in ${topic} are widely adopted because they follow best practices and proven methodologies.`,
    },
    {
      question: `What is an important skill in ${topic}?`,
      options: [
        `Problem-solving in ${topic}`,
        `Memorizing ${topic} facts`,
        `Avoiding ${topic} concepts`,
        `Ignoring ${topic} principles`,
      ],
      correctAnswer: 0,
      explanation: `Problem-solving is crucial in ${topic} as it helps you apply concepts to real-world situations.`,
    },
  ]

  let selectedQuestions = []

  // Try to find topic-specific questions
  const topicQuestions = questionTemplates[topicLower]
  if (topicQuestions && topicQuestions[difficulty]) {
    selectedQuestions = [...topicQuestions[difficulty]]
  }

  // If we don't have enough topic-specific questions, add from other difficulties or default
  while (selectedQuestions.length < questionCount) {
    if (topicQuestions) {
      // Add from other difficulties
      const allTopicQuestions = [
        ...(topicQuestions.easy || []),
        ...(topicQuestions.medium || []),
        ...(topicQuestions.hard || []),
      ]

      for (const q of allTopicQuestions) {
        if (selectedQuestions.length < questionCount && !selectedQuestions.find((sq) => sq.question === q.question)) {
          selectedQuestions.push(q)
        }
      }
    }

    // Fill remaining with default questions
    if (selectedQuestions.length < questionCount) {
      const defaultIndex = selectedQuestions.length % defaultQuestions.length
      const defaultQ = defaultQuestions[defaultIndex]
      selectedQuestions.push({
        ...defaultQ,
        question: `${defaultQ.question} (Question ${selectedQuestions.length + 1})`,
      })
    }
  }

  // Trim to exact count requested
  selectedQuestions = selectedQuestions.slice(0, questionCount)

  return { questions: selectedQuestions }
}

// Function to safely attempt AI generation
async function attemptAIGeneration(topic: string, difficulty: string, questionCount: number) {
  // Check if OpenAI API key is available
  const openaiApiKey = process.env.OPENAI_API_KEY

  if (!openaiApiKey) {
    return {
      success: false,
      errorType: "no_api_key",
      message: "OpenAI API key not configured",
    }
  }

  try {
    // Dynamically import AI modules
    const { generateText } = await import("ai")
    const { openai } = await import("@ai-sdk/openai")

    const prompt = `Generate ${questionCount} multiple choice questions about ${topic} with ${difficulty} difficulty level. 

For each question, provide:
1. The question text
2. Four answer options (A, B, C, D)
3. The correct answer (0-3 index)
4. A detailed explanation of why the answer is correct

Format the response as a JSON array of questions with this structure:
{
  "questions": [
    {
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Detailed explanation here"
    }
  ]
}

Make sure the questions are educational, accurate, and appropriate for the ${difficulty} difficulty level.`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      system:
        "You are an expert quiz creator. Generate high-quality, educational quiz questions with accurate information and clear explanations.",
    })

    // Parse the generated text as JSON
    const quizData = JSON.parse(text)
    return {
      success: true,
      data: quizData,
    }
  } catch (error: any) {
    // Determine specific error type based on error message
    let errorType = "unknown"
    const errorMessage = error.message || "Unknown error"

    if (errorMessage.includes("quota") || errorMessage.includes("exceeded")) {
      errorType = "quota_exceeded"
    } else if (errorMessage.includes("rate limit") || errorMessage.includes("rate_limit")) {
      errorType = "rate_limit"
    } else if (errorMessage.includes("authentication") || errorMessage.includes("auth")) {
      errorType = "auth_error"
    } else if (errorMessage.includes("network") || errorMessage.includes("fetch")) {
      errorType = "network_error"
    }

    return {
      success: false,
      errorType,
      message: errorMessage,
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { topic, difficulty, questionCount } = await request.json()

    if (!topic || !difficulty || !questionCount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Attempt AI generation first
    const aiResult = await attemptAIGeneration(topic, difficulty, questionCount)

    if (aiResult.success) {
      // AI generation succeeded
      return NextResponse.json(aiResult.data)
    } else {
      // AI generation failed, use fallback
      console.log(`AI generation failed (${aiResult.errorType}): ${aiResult.message}`)

      const fallbackQuiz = generateFallbackQuiz(topic, difficulty, questionCount)

      return NextResponse.json({
        ...fallbackQuiz,
        fallback: true,
        errorType: aiResult.errorType,
        message: `AI generation unavailable (${aiResult.errorType}), using curated questions`,
      })
    }
  } catch (error: any) {
    console.error("Quiz generation error:", error)

    // Even if there's a general error, try to return fallback
    try {
      const fallbackQuiz = generateFallbackQuiz("General Knowledge", "medium", 5)
      return NextResponse.json({
        ...fallbackQuiz,
        fallback: true,
        errorType: "general_error",
        message: "Error occurred, using default questions",
      })
    } catch (fallbackError) {
      // Last resort - return a simple error
      return NextResponse.json({ error: "Failed to generate quiz" }, { status: 500 })
    }
  }
}
