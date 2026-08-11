'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ThemeToggle from '@/components/ThemeToggle'
import type { User } from '@/types'
import { 
  Users, 
  Zap, 
  Award,
  ChevronRight,
  Phone,
  Trophy,
  Wallet,
  Target,
  ArrowRight
} from 'lucide-react'

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user as User)
      setLoading(false)
    }
    getUser()
  }, [supabase])

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard/home')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center text-gray-900 font-bold">
                S
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">SalesTracker</span>
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-sm font-medium bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              The #1 Sales Tracking Platform
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Track Your Sales
              <span className="block text-yellow-400">Like a Pro</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
              The all-in-one platform for insurance agents and sales professionals to track calls, leads, deposits, and performance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/login"
                className="px-8 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
              >
                Sign In
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">No credit card required • Free forever</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Everything You Need to Succeed</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Powerful tools designed for sales professionals</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Call Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Track every call, dial, and conversation with your leads.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Leaderboards</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Compete with your team and see who&apos;s performing best.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mx-auto mb-4">
                <Wallet className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Deposit Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Monitor your deposits and sales performance in real-time.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Lead Management</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Organize and track all your leads in one place.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Goal Setting</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Set and track your sales goals with ease.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Badge Collection</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Earn badges and achievements as you hit your milestones.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial/Quote Section */}
      <section className="py-16 bg-yellow-50 dark:bg-yellow-900/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl text-yellow-400 mb-4">&quot;</div>
          <blockquote className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white">
            I was happy when I made my first $100,000 from selling insurance. But I was over the damn moon when I started paying my staff six-figure salaries.
          </blockquote>
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-semibold">— John Wetmore</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">Insurance Sales Professional</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Tracking?</h2>
          <p className="text-gray-400 mb-8">Join thousands of sales professionals already using SalesTracker.</p>
          <Link
            href="/signup"
            className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
          >
            Get Started Now
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-yellow-400 flex items-center justify-center text-gray-900 font-bold text-xs">
                S
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">SalesTracker</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 sm:mt-0">
              &copy; {new Date().getFullYear()} SalesTracker. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}