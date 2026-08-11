'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User, Profile } from '@/types'
import {
  Phone,
  Clock,
  TrendingUp,
  TrendingDown,
  Zap,
  Target,
  Calendar,
  ChevronDown,
  ChevronRight,
  Plus,
  BarChart3,
  Users,
  FileText,
  Award,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Lock,
  Unlock,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowUp,
  ArrowDown,
  Activity,
  Timer,
  Gauge,
  Sparkles,
  Gift,
  UserCheck,
  Handshake,
  Briefcase,
  UserPlus,
  Filter
} from 'lucide-react'
import Link from 'next/link'

// Types for dial tracker data
interface DailyStats {
  totalDials: number
  sales: number
  contacts: number
  presentations: number
  appointments: number
  recruiting: number
}

interface CallingPace {
  noDialGap: string
  dialsLast5Min: number
  currentHour: number
  dialsLast15Min: number
  best4HourBlock: number
  bestHour: number
  avgPerHour: number
  dialsSinceFirst: number
}

interface Milestone {
  target: number
  current: number
  progress: number
}

interface DateFilter {
  day: number
  month: number
  year: number
}

export default function DialTrackerPage() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily')
  const [isLocked, setIsLocked] = useState(false)
  const [showLogSale, setShowLogSale] = useState(false)
  const [showLogPresentation, setShowLogPresentation] = useState(false)
  const [showLogRecruiting, setShowLogRecruiting] = useState(false)
  const [showDateFilter, setShowDateFilter] = useState(false)
  const [selectedDate, setSelectedDate] = useState<DateFilter>({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  })
  const [dailyStats, setDailyStats] = useState<DailyStats>({
    totalDials: 0,
    sales: 1,
    contacts: 1,
    presentations: 1,
    appointments: 0,
    recruiting: 0
  })
  const [callingPace, setCallingPace] = useState<CallingPace>({
    noDialGap: '1m 19s',
    dialsLast5Min: 6,
    currentHour: 6,
    dialsLast15Min: 6,
    best4HourBlock: 6,
    bestHour: 6,
    avgPerHour: 185,
    dialsSinceFirst: 6
  })
  const [milestones, setMilestones] = useState<Milestone[]>([
    { target: 25, current: 6, progress: 24 },
    { target: 50, current: 6, progress: 12 },
    { target: 75, current: 6, progress: 8 },
    { target: 100, current: 6, progress: 6 },
    { target: 125, current: 6, progress: 4.8 },
    { target: 150, current: 6, progress: 4 },
    { target: 175, current: 6, progress: 3.4 },
    { target: 200, current: 6, progress: 3 },
    { target: 225, current: 6, progress: 2.7 },
    { target: 250, current: 6, progress: 2.4 },
    { target: 275, current: 6, progress: 2.2 },
    { target: 300, current: 6, progress: 2 },
    { target: 325, current: 6, progress: 1.8 },
    { target: 350, current: 6, progress: 1.7 },
    { target: 375, current: 6, progress: 1.6 },
    { target: 400, current: 6, progress: 1.5 },
    { target: 425, current: 6, progress: 1.4 },
    { target: 450, current: 6, progress: 1.3 },
    { target: 475, current: 6, progress: 1.3 },
    { target: 500, current: 6, progress: 1.2 },
  ])
  const supabase = createClient()

  // Generate days, months, years for date filter
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ]
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i)

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

  // Format date for display
  const formatDate = (date: DateFilter) => {
    const monthName = months.find(m => m.value === date.month)?.label || ''
    return `${monthName} ${date.day}, ${date.year}`
  }

  // Apply date filter
  const handleApplyDateFilter = () => {
    // Here you would fetch data for the selected date
    // For now, we just close the modal
    setShowDateFilter(false)
  }

  // Log Sale
  const handleLogSale = () => {
    setDailyStats({
      ...dailyStats,
      sales: dailyStats.sales + 1
    })
    setShowLogSale(false)
  }

  // Log Presentation
  const handleLogPresentation = () => {
    setDailyStats({
      ...dailyStats,
      presentations: dailyStats.presentations + 1
    })
    setShowLogPresentation(false)
  }

  // Log Recruiting
  const handleLogRecruiting = () => {
    setDailyStats({
      ...dailyStats,
      recruiting: dailyStats.recruiting + 1
    })
    setShowLogRecruiting(false)
  }

  // Log Dial
  const handleLogDial = () => {
    setDailyStats({
      ...dailyStats,
      totalDials: dailyStats.totalDials + 1
    })
  }

  // Log Contact
  const handleLogContact = () => {
    setDailyStats({
      ...dailyStats,
      contacts: dailyStats.contacts + 1
    })
  }

  // Log Appointment
  const handleLogAppointment = () => {
    setDailyStats({
      ...dailyStats,
      appointments: dailyStats.appointments + 1
    })
  }

  // Reset Counters
  const handleResetCounters = () => {
    if (confirm('Are you sure you want to reset all counters?')) {
      setDailyStats({
        totalDials: 0,
        sales: 0,
        contacts: 0,
        presentations: 0,
        appointments: 0,
        recruiting: 0
      })
    }
  }

  // Toggle Lock
  const handleToggleLock = () => {
    setIsLocked(!isLocked)
  }

  // Stats cards data
  const statCards = [
    { 
      label: 'Total Dials', 
      value: dailyStats.totalDials, 
      icon: Phone, 
      color: 'blue',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      action: handleLogDial
    },
    { 
      label: 'Contacts', 
      value: dailyStats.contacts, 
      icon: UserCheck, 
      color: 'green',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600 dark:text-green-400',
      action: handleLogContact
    },
    { 
      label: 'Appointments', 
      value: dailyStats.appointments, 
      icon: Calendar, 
      color: 'purple',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400',
      action: handleLogAppointment
    },
    { 
      label: 'Sales', 
      value: dailyStats.sales, 
      icon: Handshake, 
      color: 'green',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600 dark:text-green-400',
      action: handleLogSale
    },
    { 
      label: 'Presentations', 
      value: dailyStats.presentations, 
      icon: FileText, 
      color: 'orange',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      iconColor: 'text-orange-600 dark:text-orange-400',
      action: handleLogPresentation
    },
    { 
      label: 'Recruiting', 
      value: dailyStats.recruiting, 
      icon: UserPlus, 
      color: 'red',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      iconColor: 'text-red-600 dark:text-red-400',
      action: handleLogRecruiting
    },
  ]

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Phone className="h-6 w-6 text-yellow-500" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">DIAL TRACKER</h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">TRACK YOUR DAILY SALES ACTIVITY</p>
        </div>
        {/* <div className="flex items-center gap-2">
          <div className="bg-yellow-400 text-gray-900 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1">
            <Gift className="h-4 w-4" />
            Need leads? Try G.O.A.T. Leads
          </div>
        </div> */}
      </div>

      {/* Daily Entry with Date Filter */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-yellow-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Daily Entry</h2>
          </div>
          <span className="text-sm text-gray-400 dark:text-gray-500">|</span>
          <div className="flex items-center gap-2">
            {/* Date Filter Button */}
            <button
              onClick={() => setShowDateFilter(true)}
              className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Filter className="h-3.5 w-3.5" />
              {formatDate(selectedDate)}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        {/* Navigation Tabs */}
        <div className="flex gap-2">
          <Link
            href="/dashboard/dial-tracker"
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-yellow-400 text-gray-900 shadow-sm"
          >
            Daily
          </Link>
          <Link
            href="/dashboard/dial-tracker/weekly"
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Weekly
          </Link>
          <Link
            href="/dashboard/dial-tracker/monthly"
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Monthly
          </Link>
        </div>
        
      </div>

      {/* Daily Entry Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        {/* Client & Dial Worksheets Header */}
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-4 w-4 text-blue-500" />
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Client & Dial Worksheets</h4>
        </div>

        {/* Stats Grid - 3 columns x 2 rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {statCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className={`${stat.bgColor} rounded-lg p-4 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer group`}
                onClick={stat.action}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${stat.bgColor} group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                  </div>
                </div>
                <button className="mt-2 text-xs text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to log +
                </button>
              </div>
            )
          })}
        </div>

        {/* Compare Months and Actions */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Compare Months
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleLock}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isLocked 
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' 
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {isLocked ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
              {isLocked ? 'Lock Day' : 'Unlock Day'}
            </button>
            <button
              onClick={handleResetCounters}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Counters
            </button>
          </div>
        </div>

        {/* Quote at bottom */}
        <div className="mt-3 text-xs text-gray-400 dark:text-gray-500 italic text-center">
          &quot;neveragainwantedtobeinapositionwhereIwasanxiousaboutmoneywhenitcametoprovidingformykids.&quot;
          <br />
          <span className="font-semibold text-gray-500 dark:text-gray-400">John Wetmore</span>
        </div>
      </div>

      {/* Conversion Rates & Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-yellow-500" />
          CONVERSION RATES & ACTIVITY
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {dailyStats.totalDials > 0 ? `${((dailyStats.contacts / dailyStats.totalDials) * 100).toFixed(1)}%` : '0.0%'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Contact Rate</p>
            <p className="text-xs text-gray-400">{dailyStats.contacts}/{dailyStats.totalDials} dials</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {dailyStats.contacts > 0 ? `${((dailyStats.presentations / dailyStats.contacts) * 100).toFixed(1)}%` : '0.0%'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Presentation Rate</p>
            <p className="text-xs text-gray-400">{dailyStats.presentations}/{dailyStats.contacts} contacts</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">250</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Hustle Score</p>
            <p className="text-xs text-gray-400">points</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">1.7h</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Hours Worked</p>
            <p className="text-xs text-gray-400">100 mins total</p>
          </div>
        </div>
      </div>

      {/* Date Filter Modal */}
      {showDateFilter && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Select Date</h3>
              <button
                onClick={() => setShowDateFilter(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <XCircle className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Month Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Month</label>
                <select
                  value={selectedDate.month}
                  onChange={(e) => setSelectedDate({ ...selectedDate, month: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Day Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Day</label>
                <select
                  value={selectedDate.day}
                  onChange={(e) => setSelectedDate({ ...selectedDate, day: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
                <select
                  value={selectedDate.year}
                  onChange={(e) => setSelectedDate({ ...selectedDate, year: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleApplyDateFilter}
                  className="flex-1 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors font-medium"
                >
                  Apply Filter
                </button>
                <button
                  onClick={() => setShowDateFilter(false)}
                  className="flex-1 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Log Sale Modal */}
      {showLogSale && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Log Sale</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
                <input
                  type="number"
                  placeholder="Enter sale amount"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client</label>
                <input
                  type="text"
                  placeholder="Client name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleLogSale}
                  className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Log Sale
                </button>
                <button
                  onClick={() => setShowLogSale(false)}
                  className="flex-1 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Log Presentation Modal */}
      {showLogPresentation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Log Presentation</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client</label>
                <input
                  type="text"
                  placeholder="Client name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
                <textarea
                  placeholder="Presentation notes"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleLogPresentation}
                  className="flex-1 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Log Presentation
                </button>
                <button
                  onClick={() => setShowLogPresentation(false)}
                  className="flex-1 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Log Recruiting Modal */}
      {showLogRecruiting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Log Recruiting</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Candidate</label>
                <input
                  type="text"
                  placeholder="Candidate name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option>Interview Scheduled</option>
                  <option>Phone Screen</option>
                  <option>In-Person Interview</option>
                  <option>Offer Extended</option>
                  <option>Hired</option>
                </select>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleLogRecruiting}
                  className="flex-1 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Log Recruiting
                </button>
                <button
                  onClick={() => setShowLogRecruiting(false)}
                  className="flex-1 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}