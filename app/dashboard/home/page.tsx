'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User, Profile, DashboardStats, WeeklyData } from '@/types'
import Link from 'next/link'
import { 
  Zap,
  TrendingUp,
  TrendingDown,
  Clock,
  Wallet,
  Award,
  Target,
  Edit,
  ChevronDown,
  Users,
  User as UserIcon,
  Building2,
  Calendar,
  Filter,
  Download,
  ArrowUp,
  ArrowDown,
  FileText,
  Phone,
  Trophy,
  BarChart3,
  Users as UsersIcon,
  ClipboardList,
  Grid,
  ChevronRight
} from 'lucide-react'

export default function DashboardHome() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [viewMode, setViewMode] = useState<'personal' | 'team'>('personal')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDateRange, setSelectedDateRange] = useState('This Week')
  const supabase = createClient()

  const [stats, setStats] = useState<DashboardStats>({
    apSoldThisWeek: 120,
    salesThisWeek: 1,
    hoursWorked: 0,
    totalDeposits: 0,
    depositsThisWeek: 0,
    depositsThisMonth: 0,
    dialsThisWeek: 0,
    hustleScore: 100,
    goalAmount: 2000,
    totalBadges: 0,
    prestigeLevel: 0,
    progressPercentage: 0,
    rank: 121,           // Added missing property
    totalRank: 242,      // Added missing property
    rankChange: 74,      // Added missing property
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

  // Date range options
  const dateRanges = ['Today', 'This Week', 'This Month', 'Last 30 Days', 'Custom']

  // Resources data
  const resources = [
    { name: 'Submit A Sale', icon: FileText, href: '/dashboard/submit-sale', color: 'blue' },
    { name: 'Dial Tracker', icon: Phone, href: '/dashboard/dial-tracker', color: 'green' },
    { name: 'Leaderboard', icon: Trophy, href: '/dashboard/leaderboard', color: 'yellow' },
    { name: 'Analytics', icon: BarChart3, href: '/dashboard/analytics', color: 'purple' },
    { name: 'Clients', icon: UsersIcon, href: '/dashboard/clients', color: 'indigo' },
    { name: 'Leads', icon: ClipboardList, href: '/dashboard/leads', color: 'red' },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      green: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      yellow: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
      purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
      indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
      red: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="space-y-6">
      {/* Header with JUST WIN */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">JUST WIN</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Welcome back, {displayName}!
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Toggle - Personal / Team */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('personal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                viewMode === 'personal'
                  ? 'bg-yellow-400 text-gray-900 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <UserIcon className="h-3.5 w-3.5" />
              Personal
            </button>
            <button
              onClick={() => setViewMode('team')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                viewMode === 'team'
                  ? 'bg-yellow-400 text-gray-900 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              Team
            </button>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 dark:from-yellow-500 dark:to-yellow-600 rounded-xl p-5">
        <p className="text-sm text-gray-900 dark:text-gray-900 italic max-w-3xl">
          &quot;My story proves that it&apos;s all about being consistent, not quitting, and learning from your mistakes.&quot;
        </p>
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-900 mt-1">— Einstien</p>
      </div>

      {/* Personal Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Hustle Score Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Hustle Score This Week</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                  <ArrowUp className="h-3 w-3" />
                  #{stats.rank} of {stats.totalRank} ↑ {stats.rankChange}
                </span>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.hustleScore}</p>
            
            <div className="mt-3 flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>Goal: 2,000</span>
                  <button className="text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 flex items-center gap-1">
                    <Edit className="h-3 w-3" />
                    edit
                  </button>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full transition-all" 
                    style={{ width: `${(stats.hustleScore / stats.goalAmount) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{((stats.hustleScore / stats.goalAmount) * 100).toFixed(0)}%</p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Dials This Week</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{stats.dialsThisWeek}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Sales This Week</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{stats.salesThisWeek}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Deposits This Month</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">${stats.depositsThisMonth}</p>
              </div>
            </div>
          </div>

          {/* AP Sold & Hours Worked Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">AP Sold This Week</h3>
                <TrendingDown className="h-4 w-4 text-red-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">${stats.apSoldThisWeek}</p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">-$880 vs last week</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Hours Worked This Week</h3>
                <Clock className="h-4 w-4 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.hoursWorked} hrs</p>
              <button className="text-xs text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 mt-1">
                Click for breakdown →
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Sales This Week */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Sales This Week</h3>
              </div>
              {/* Date Selector Button */}
              <div className="relative">
                <button
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  {selectedDateRange}
                  <ChevronDown className={`h-3 w-3 transition-transform ${showDatePicker ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Date Picker Dropdown */}
                {showDatePicker && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                    {dateRanges.map((range) => (
                      <button
                        key={range}
                        onClick={() => {
                          setSelectedDateRange(range)
                          setShowDatePicker(false)
                        }}
                        className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                          selectedDateRange === range
                            ? 'text-yellow-600 dark:text-yellow-400 font-medium'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                    <hr className="my-1 border-gray-200 dark:border-gray-700" />
                    <button className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                      <Filter className="h-3.5 w-3.5" />
                      More filters
                    </button>
                  </div>
                )}
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.salesThisWeek}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Same as last week</p>
          </div>

          {/* Deposits Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-green-500" />
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Deposits This Week</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">${stats.depositsThisWeek}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-green-500" />
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Deposits This Month</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">${stats.depositsThisMonth}</p>
            </div>
          </div>

          {/* Badges & Goal Tracker Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-yellow-500" />
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Badges</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalBadges}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Earn more badges</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-purple-500" />
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Goal Tracker</h3>
              </div>
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>${stats.hustleScore.toLocaleString()}</span>
                  <span>Goal: ${stats.goalAmount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full transition-all" 
                    style={{ width: `${(stats.hustleScore / stats.goalAmount) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badge Collection Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">BADGE COLLECTION</h3>
          </div>
          <button className="text-sm text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 flex items-center gap-1">
            Full View
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="mt-3 flex items-center gap-8">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">0 unique badges</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">0 total earned</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">PRESTIGE 0/8</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-xs text-gray-500 dark:text-gray-400">Light</span>
          <div className="flex-1 max-w-xs">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: '0%' }} />
            </div>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">Dark</span>
        </div>
      </div>

      {/* Resources Section */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Grid className="h-5 w-5 text-yellow-500" />
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Resources</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {resources.map((resource) => {
            const Icon = resource.icon
            return (
              <Link
                key={resource.name}
                href={resource.href}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 text-center hover:shadow-md transition-all hover:border-yellow-400 dark:hover:border-yellow-500 hover:-translate-y-0.5"
              >
                <div className={`w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center ${getColorClasses(resource.color)} group-hover:scale-110 transition-transform`}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                  {resource.name}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}