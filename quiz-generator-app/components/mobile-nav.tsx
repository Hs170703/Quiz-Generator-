"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Menu, Home, Trophy, MessageSquare, Plus, Play, User, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { usePathname } from "next/navigation"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const handleLinkClick = () => {
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Q</span>
            </div>
            <span className="text-xl">
              <span className="font-bold">Quiz</span>
              <span className="font-light opacity-70">Gen</span>
            </span>
          </div>

          {/* User Info */}
          {user && (
            <div className="flex items-center space-x-3 mb-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{user.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 truncate">{user.email}</p>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            <Link
              href="/"
              onClick={handleLinkClick}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive("/")
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>

            <Link
              href="/dashboard"
              onClick={handleLinkClick}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive("/dashboard")
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Trophy className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/discussions"
              onClick={handleLinkClick}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive("/discussions")
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <MessageSquare className="h-5 w-5" />
              <span>Discussions</span>
            </Link>

            {user && (
              <>
                <Separator className="my-4" />

                <div className="space-y-2">
                  <p className="px-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Quick Actions
                  </p>
                  <Link
                    href="/quiz/create"
                    onClick={handleLinkClick}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Create Quiz</span>
                  </Link>
                  <Link
                    href="/quiz/join"
                    onClick={handleLinkClick}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Play className="h-5 w-5" />
                    <span>Join Quiz</span>
                  </Link>
                </div>
              </>
            )}
          </nav>

          {/* Bottom Section */}
          <div className="mt-auto space-y-2">
            {user ? (
              <>
                <Separator className="mb-4" />
                <Link
                  href="/profile"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/settings"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={() => {
                    logout()
                    handleLinkClick()
                  }}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full text-left"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Log out</span>
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <Link href="/auth/login" onClick={handleLinkClick}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signup" onClick={handleLinkClick}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
