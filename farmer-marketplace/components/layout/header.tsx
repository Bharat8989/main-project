"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useAuth } from "@/components/providers/auth-provider"
import { useI18n } from "@/components/providers/i18n-provider"
import { Menu, X, ShoppingCart, MessageCircle, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { t } = useI18n()

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">FC</span>
            </div>
            <span className="text-xl font-bold text-gray-900">FarmConnect</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/marketplace" className="text-gray-700 hover:text-green-600">
              {t("marketplace")}
            </Link>
            {/* <Link href="/how-it-works" className="text-gray-700 hover:text-green-600">
              {t("howItWorks")}
            </Link> */}
            <Link href="/about" className="text-gray-700 hover:text-green-600">
              {t("about")}
            </Link>
          </nav>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />

            {user ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/chat">
                    <MessageCircle className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/orders">
                    <ShoppingCart className="w-4 h-4" />
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <User className="w-4 h-4" />
                      <span className="ml-2">{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">{t("dashboard")}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">{t("profile")}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>{t("logout")}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/auth/login">{t("login")}</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/signup">{t("signup")}</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/marketplace"
                className="px-3 py-2 text-gray-700 hover:text-green-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("marketplace")}
              </Link>
              {/* <Link
                href="/how-it-works"
                className="px-3 py-2 text-gray-700 hover:text-green-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("howItWorks")}
              </Link> */}
              <Link
                href="/about"
                className="px-3 py-2 text-gray-700 hover:text-green-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("about")}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
