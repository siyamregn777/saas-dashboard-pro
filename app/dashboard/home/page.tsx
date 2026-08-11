'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User, Profile, DashboardStats, WeeklyData } from '@/types'
import { 
  Phone,
  Trophy,
  Wallet, 
  Users,
  Target,
  Zap,
  Award,
  Clock,
  TrendingUp,
  TrendingDown,
  Edit
} from 'lucide-react'

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [stats] = useState<DashboardStats>({
    apSoldThisWeek: 0,
    salesThisWeek: 0,
    hoursWorked: 0,
    totalDeposits: 0,
    depositsThisWeek: 0,
    depositsThisMonth: 0,
    dialsThisWeek: 0,
    hustleScore: 0,
    goalAmount: 2000,
    totalBadges: 0,
    prestigeLevel: 0,
    progressPercentage: 0,
    weeklyData: [
      { day: 'S', value: 0 },
      { day: 'M', value: 0 },
      { day: 'T', value: 0 },
      { day: 'W', value: 0 },
      { day: 'T', value: 0 },
      { day: 'F', value: 0 },
      { day: 'S', value: 0 },
    ]
  })
  const supabase = createClient()

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user as User)
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        setProfile(profile as Profile)
      }
    }
    getUserData()
  }, [supabase])

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">HOME</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">YOUR DAILY COMMAND CENTER</p>
        </div>
        {/* <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">HOME</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">YOUR DAILY COMMAND CENTER</p>
        </div> */}
      </div>

      {/* Welcome Section - Always Yellow */}
      <div className="bg-yellow-400 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Welcome back, {displayName}!
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-gray-800">Need leads?</span>
              <span className="text-sm font-semibold text-gray-900 bg-white/30 px-3 py-1 rounded-full">
                Try G.O.A.T. Leads →
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-gray-800 max-w-md italic">
              &quot;I was happy when I made my first $100,000 from selling insurance. But I was over the damn moon when I started paying my staff six-figure salaries.&quot;
            </p>
            {/* <p className="text-sm font-semibold text-gray-900 mt-1">— John Wetmore</p> */}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Hustle Score */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">Hustle Score This Week</h3>
            <Zap className="h-4 w-4 text-yellow-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.hustleScore}</p>
          <div className="mt-2 flex items-center gap-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">Goal: 2,000</span>
            <button className="text-xs text-yellow-400 hover:text-yellow-500">
              <Edit className="h-3 w-3 inline" />
            </button>
          </div>
        </div>

        {/* AP Sold */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">AP Sold This Week</h3>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">${stats.apSoldThisWeek}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">+$0 vs last week</p>
        </div>

        {/* Sales This Week */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">Sales This Week</h3>
            <TrendingDown className="h-4 w-4 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">${stats.salesThisWeek}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Same as last week</p>
        </div>

        {/* Deposits This Week */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">Deposits This Week</h3>
            <Wallet className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">${stats.depositsThisWeek}</p>
          <button className="text-xs text-yellow-400 hover:text-yellow-500 mt-1">
            Click for details →
          </button>
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-4">
          {/* Phone Script */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Phone className="h-5 w-5 text-yellow-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Phone Script</h3>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Dials This Week</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.dialsThisWeek}</p>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="h-5 w-5 text-yellow-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Leaderboard</h3>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Deposits This Month</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">${stats.depositsThisMonth}</p>
            </div>
          </div>

          {/* Deposits */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Wallet className="h-5 w-5 text-green-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Deposits</h3>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Deposits This Month</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">${stats.depositsThisMonth}</p>
            </div>
          </div>

          {/* Leads */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-5 w-5 text-purple-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Leads</h3>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Leads</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">0</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Hours Worked */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Hours Worked This Week</h3>
              </div>
              <button className="text-xs text-yellow-400 hover:text-yellow-500">
                Click for breakdown →
              </button>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.hoursWorked} hrs</p>
            
            {/* Weekly Chart */}
            <div className="mt-4 flex items-end justify-between h-20 gap-1">
              {stats.weeklyData.map((day: WeeklyData, index: number) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full max-w-[20px] bg-yellow-400 rounded-t"
                    style={{ height: `${Math.max(5, (day.value / 10) * 100)}%` }}
                  />
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{day.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Badge Collection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">BADGE COLLECTION</h3>
              </div>
              <button className="text-xs text-yellow-400 hover:text-yellow-500">
                Full View →
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">0 unique badges</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">0 total earned</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-gray-400">PRESTIGE</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.prestigeLevel}%</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-gray-500 dark:text-gray-400">Light</span>
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: `${stats.progressPercentage}%` }} />
                </div>
              </div>
              <span className="text-gray-500 dark:text-gray-400">Dark</span>
            </div>
          </div>
        </div>
      </div>

      {/* Goal Tracker */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-yellow-400" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Goal Tracker</h3>
          </div>
          <button className="text-xs text-yellow-400 hover:text-yellow-500 flex items-center gap-1">
            <Edit className="h-3 w-3" />
            edit
          </button>
        </div>
        <div className="mt-3 flex items-center gap-4">
          <div className="flex-1">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${(stats.hustleScore / stats.goalAmount) * 100}%` }} />
            </div>
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            ${stats.hustleScore.toLocaleString()} / ${stats.goalAmount.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}