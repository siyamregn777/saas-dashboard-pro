'use client'

import { X, Gift, Sparkles, TrendingUp, Zap, Star, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function WhatsNewPage() {
  const updates = [
    {
      id: 1,
      title: 'JW Call Coach',
      description: 'AI-powered call coaching is now available! Get real-time feedback on your sales calls with advanced voice analysis.',
      icon: Sparkles,
      color: 'blue',
      date: '2 days ago',
      status: 'New',
      badgeColor: 'blue'
    },
    {
      id: 2,
      title: 'Enhanced Analytics Dashboard',
      description: 'New analytics features including conversion tracking, funnel visualization, and predictive insights.',
      icon: TrendingUp,
      color: 'green',
      date: '1 week ago',
      status: 'Updated',
      badgeColor: 'green'
    },
    {
      id: 3,
      title: 'Hustle Score Beta',
      description: 'Track your performance with the new Hustle Score. Get personalized recommendations to improve your sales game.',
      icon: Zap,
      color: 'purple',
      date: '2 weeks ago',
      status: 'Beta',
      badgeColor: 'purple'
    },
    {
      id: 4,
      title: 'Badge Collection System',
      description: 'Earn badges for your achievements! Collect unique badges as you hit your sales milestones.',
      icon: Star,
      color: 'yellow',
      date: '3 weeks ago',
      status: 'Coming Soon',
      badgeColor: 'yellow'
    }
  ]

  const getBadgeStyles = (color: string) => {
    const styles = {
      blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200',
      green: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-200',
      purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-200',
      yellow: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-200',
    }
    return styles[color as keyof typeof styles] || styles.blue
  }

  const getIconBg = (color: string) => {
    const styles = {
      blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300',
      green: 'bg-green-50 text-green-600 dark:bg-green-900/40 dark:text-green-300',
      purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300',
      yellow: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-300',
    }
    return styles[color as keyof typeof styles] || styles.blue
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <Gift className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">What&apos;s New</h1>
                <p className="text-blue-100 text-sm">Latest updates and features</p>
              </div>
            </div>
            <Link 
              href="/dashboard" 
              aria-label="Close What’s New"
              className="rounded-lg p-2 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Updates List */}
        <div className="p-6 space-y-6">
          {updates.map((update) => {
            const Icon = update.icon
            return (
              <div 
                key={update.id}
                className="group rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${getIconBg(update.color)} flex-shrink-0`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {update.title}
                      </h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getBadgeStyles(update.badgeColor)}`}>
                        {update.status}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {update.date}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {update.description}
                    </p>
                    <button className="mt-3 flex items-center gap-1 text-sm font-medium text-blue-600 transition-all hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-blue-400 dark:hover:text-blue-300 dark:focus-visible:ring-offset-gray-800 group-hover:gap-2">
                      Learn more
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Bottom CTA */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center dark:border-gray-700 dark:bg-gray-900/60">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Want to stay updated? Follow our{' '}
              <a href="#" className="font-medium text-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                changelog
              </a>
              {' '}or join our{' '}
              <a href="#" className="font-medium text-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                community
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
