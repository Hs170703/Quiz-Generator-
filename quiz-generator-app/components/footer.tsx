"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Brain, Mail, Github, Twitter, Instagram } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 border-t border-gray-700">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl text-white">
                <span className="font-bold">Quiz</span>
                <span className="font-light opacity-70">Gen</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              AI-powered platform that revolutionizes learning through interactive quizzes. Join thousands of educators
              and students worldwide.
            </p>
            <div className="flex space-x-3">
              <Link
                href="https://github.com/quizgen"
                className="p-2 bg-gray-800 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
              >
                <Github className="h-4 w-4" />
              </Link>
              <Link
                href="https://twitter.com/quizgen"
                className="p-2 bg-gray-800 rounded-md text-gray-400 hover:text-blue-400 hover:bg-gray-700 transition-all"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="https://instagram.com/quizgen"
                className="p-2 bg-gray-800 rounded-md text-gray-400 hover:text-pink-400 hover:bg-gray-700 transition-all"
              >
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/quiz/create" className="text-gray-400 hover:text-white transition-colors">
                  Create Quiz
                </Link>
              </li>
              <li>
                <Link href="/quiz/join" className="text-gray-400 hover:text-white transition-colors">
                  Join Quiz
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/discussions" className="text-gray-400 hover:text-white transition-colors">
                  Discussions
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Stay Updated</h3>
            <p className="text-gray-400 text-sm">Get updates and tips delivered to your inbox.</p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter email"
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 text-sm h-9"
              />
              <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 h-9">
                <Mail className="h-3 w-3 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-400">
              <span>© {currentYear} QuizGen. All rights reserved.</span>
              <div className="flex items-center space-x-4">
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
                <Link href="/terms-of-service" className="hover:text-white transition-colors">
                  Terms
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-700" />

      {/* Bottom Footer */}
      {/*
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
            <span>© {currentYear} QuizGen. All rights reserved.</span>
            <div className="flex items-center space-x-6">
              <Link
                href="/privacy-policy"
                className="hover:text-white transition-colors duration-300 flex items-center"
              >
                <Shield className="h-4 w-4 mr-1" />
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="hover:text-white transition-colors duration-300 flex items-center"
              >
                <FileText className="h-4 w-4 mr-1" />
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span className="flex items-center">
                Made with <Heart className="h-4 w-4 text-red-500 mx-1 animate-pulse" /> for learners worldwide
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full p-2"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Enhanced Status Indicator }
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>⚡ 99.9% uptime</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>👥 50K+ active users</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>🌍 Available in 25+ countries</span>
            </div>
          </div>
        </div>
      </div>
      */}
    </footer>
  )
}
