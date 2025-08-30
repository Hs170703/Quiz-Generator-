# QuizGen - AI-Powered Quiz Platform

A modern, full-stack quiz application built with Next.js 15, featuring AI-powered question generation, real-time analytics, and community discussions.

![QuizGen Banner](https://via.placeholder.com/800x200/3B82F6/FFFFFF?text=QuizGen+-+AI-Powered+Quiz+Platform)

## 🌟 Features

### Core Functionality
- **AI-Powered Quiz Generation** - Generate questions using OpenAI GPT-4 or fallback to curated questions
- **Manual Quiz Creation** - Create custom quizzes with detailed explanations
- **Interactive Quiz Taking** - Timed quizzes with real-time progress tracking
- **Performance Analytics** - Comprehensive dashboard with charts and statistics
- **Community Discussions** - Ask questions, share knowledge, and help others learn
- **Quiz Management** - Share quizzes via codes, QR codes, or direct links

### Technical Features
- **Responsive Design** - Mobile-first approach with seamless desktop experience
- **Dark Mode Support** - System-aware theme switching
- **Real-time Updates** - Live score tracking and dashboard updates
- **Authentication System** - User management with persistent sessions
- **Search & Filtering** - Advanced search with multiple filter options
- **Toast Notifications** - User feedback for all actions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API Key (optional, for AI generation)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/quizgen.git
   cd quizgen
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Add your OpenAI API key (optional):
   \`\`\`env
   OPENAI_API_KEY=your_openai_api_key_here
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
quiz-generator-app/
├── app/                          # Next.js 15 App Router
│   ├── api/                      # API Routes
│   │   └── quiz/
│   │       ├── generate/         # AI quiz generation
│   │       ├── results/          # Quiz results storage
│   │       ├── save/             # Quiz saving
│   │       └── submit/           # Quiz submission
│   ├── auth/                     # Authentication pages
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/                # User dashboard
│   ├── discussions/              # Community discussions
│   ├── quiz/                     # Quiz-related pages
│   │   ├── create/               # Quiz creation
│   │   ├── join/                 # Join quiz by code
│   │   ├── manage/               # Quiz management
│   │   ├── participants/         # View participants
│   │   ├── preview/              # Preview quiz
│   │   ├── results/              # View results
│   │   └── take/                 # Take quiz
│   ├── privacy-policy/           # Legal pages
│   ├── terms-of-service/
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # Reusable components
│   ├── ui/                       # shadcn/ui components
│   ├── auth-provider.tsx         # Authentication context
│   ├── footer.tsx                # Site footer
│   ├── mobile-nav.tsx            # Mobile navigation
│   ├── navbar.tsx                # Main navigation
│   ├── scroll-to-top.tsx         # Scroll to top button
│   └── theme-provider.tsx        # Theme context
├── hooks/                        # Custom React hooks
│   └── use-toast.ts              # Toast notifications
├── lib/                          # Utility functions
│   └── utils.ts                  # Common utilities
├── scripts/                      # Database scripts
│   ├── create-database.sql       # Database schema
│   └── seed-data.sql             # Sample data
└── public/                       # Static assets
\`\`\`

## 🎯 Key Components

### 1. Authentication System (`components/auth-provider.tsx`)
- **Purpose**: Manages user authentication state
- **Features**: Login, signup, logout, session persistence
- **Storage**: localStorage for demo (replace with secure backend)

\`\`\`typescript
const { user, login, logout } = useAuth()
\`\`\`

### 2. Quiz Generation (`app/api/quiz/generate/route.ts`)
- **AI Generation**: Uses OpenAI GPT-4 for dynamic questions
- **Fallback System**: Curated questions when AI is unavailable
- **Error Handling**: Graceful degradation with informative messages

### 3. Dashboard Analytics (`app/dashboard/page.tsx`)
- **Real-time Data**: Fetches quiz results from API
- **Performance Charts**: Line charts for score trends
- **Category Breakdown**: Bar charts for topic performance
- **Statistics**: Calculates streaks, averages, and totals

### 4. Discussion Forum (`app/discussions/page.tsx`)
- **Interactive Features**: Upvoting, replying, creating discussions
- **Advanced Search**: Multi-field search with Enter key support
- **Filtering**: Status, sorting, and topic-based filters
- **Real-time Updates**: Instant UI updates for all interactions

### 5. Quiz Taking (`app/quiz/take/[id]/page.tsx`)
- **Timer System**: Countdown with auto-submission
- **Progress Tracking**: Visual progress bar and question navigation
- **Result Storage**: Automatic saving to dashboard
- **Detailed Review**: Question-by-question analysis with explanations

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Modern component library
- **Recharts** - Data visualization
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Serverless functions
- **OpenAI API** - AI-powered question generation
- **Mock Database** - In-memory storage (replace with real DB)

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📊 API Endpoints

### Quiz Generation
\`\`\`typescript
POST /api/quiz/generate
Body: { topic: string, difficulty: string, questionCount: number }
Response: { questions: Question[] }
\`\`\`

### Quiz Results
\`\`\`typescript
GET /api/quiz/results?userId=string
Response: { results: QuizResult[] }

POST /api/quiz/results
Body: { quizId, score, totalQuestions, ... }
Response: { success: boolean, result: QuizResult }
\`\`\`

### Quiz Management
\`\`\`typescript
POST /api/quiz/save
Body: { title, description, questions }
Response: { success: boolean, quizId: string }
\`\`\`

## 🎨 UI/UX Features

### Responsive Design
- **Mobile-first**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-friendly**: Large buttons and touch targets

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels and semantic HTML
- **Color Contrast**: WCAG compliant color schemes
- **Focus Management**: Clear focus indicators

### Dark Mode
- **System Aware**: Respects user's system preference
- **Manual Toggle**: Users can override system setting
- **Consistent**: All components support both themes

## 🔧 Configuration

### Environment Variables
\`\`\`env
# Optional: OpenAI API Key for AI generation
OPENAI_API_KEY=your_api_key_here

# Optional: Database connection (for production)
DATABASE_URL=your_database_url_here
\`\`\`

### Customization
- **Colors**: Modify `tailwind.config.ts` for custom color schemes
- **Components**: Extend shadcn/ui components in `components/ui/`
- **Fonts**: Update `app/layout.tsx` for custom fonts

## 📈 Performance Optimizations

### Next.js Features
- **App Router**: Latest Next.js routing system
- **Server Components**: Reduced client-side JavaScript
- **Image Optimization**: Automatic image optimization
- **Code Splitting**: Automatic route-based splitting

### Loading States
- **Skeleton Loaders**: Smooth loading experiences
- **Suspense Boundaries**: Granular loading states
- **Error Boundaries**: Graceful error handling

## 🧪 Testing

### Manual Testing Checklist
- [ ] Quiz creation (manual and AI)
- [ ] Quiz taking with timer
- [ ] Dashboard analytics
- [ ] Discussion interactions
- [ ] Search functionality
- [ ] Mobile responsiveness
- [ ] Dark mode toggle

### Test Data
Run the database scripts to populate with sample data:
\`\`\`bash
# In v0, execute these scripts:
scripts/create-database.sql
scripts/seed-data.sql
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

### Other Platforms
- **Netlify**: Static site deployment
- **Railway**: Full-stack deployment
- **Docker**: Containerized deployment

## 🔮 Future Enhancements

### Planned Features
- [ ] Real database integration (PostgreSQL/MongoDB)
- [ ] Advanced analytics with more chart types
- [ ] Quiz collaboration features
- [ ] Video/image questions support
- [ ] Mobile app (React Native)
- [ ] Offline quiz taking
- [ ] Advanced user roles and permissions

### Technical Improvements
- [ ] Unit and integration tests
- [ ] Performance monitoring
- [ ] SEO optimization
- [ ] PWA features
- [ ] Real-time multiplayer quizzes

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Style
- Use TypeScript for all new code
- Follow existing naming conventions
- Add comments for complex logic
- Ensure responsive design

### Commit Messages
\`\`\`
feat: add new quiz sharing feature
fix: resolve dashboard loading issue
docs: update API documentation
style: improve mobile navigation
\`\`\`

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** - Beautiful component library
- **Vercel** - Hosting and deployment platform
- **OpenAI** - AI-powered question generation
- **Tailwind CSS** - Utility-first CSS framework
- **Next.js Team** - Amazing React framework

## 📞 Support

### Getting Help
- **Documentation**: Check this README and code comments
- **Issues**: Create GitHub issues for bugs
- **Discussions**: Use GitHub Discussions for questions
- **Email**: contact@quizgen.com (if applicable)

### Common Issues

**Q: AI generation not working?**
A: Check your OpenAI API key and billing status. The app will fallback to curated questions.

**Q: Dashboard not updating?**
A: Click the refresh button or take a new quiz to see updated data.

**Q: Mobile navigation issues?**
A: Clear browser cache and ensure you're using a modern browser.

---

**Built with ❤️ by the QuizGen Team**

*Happy Learning! 🎓*
