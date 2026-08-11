'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User, Profile } from '@/types'
import {
  Phone,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Users,
  FileText,
  Handshake,
  UserCheck,
  UserPlus,
  Gift,
  TrendingUp,
  Clock,
  Zap,
  Target,
  Filter,
  ArrowUp,
  ArrowDown
} from 'lucide-react'
import Link from 'next/link'

// Types for weekly data
interface WeeklyStats {
  totalDials: number
  sales: number
  contacts: number
  presentations: number
  appointments: number
  recruiting: number
  weeklyAP: number
  hustleScore: number
  hoursWorked: string
  dialsPerSale: number
}

interface DailyData {
  day: string
  date: number
  fullDate: Date
  dials: number
  contacts: number
  appointments: number
  presentations: number
  sales: number
  recruiting: number
}

export default function WeeklyDialTrackerPage() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [selectedWeek, setSelectedWeek] = useState<Date>(new Date())
  const [showDateFilter, setShowDateFilter] = useState(false)
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats>({
    totalDials: 0,
    sales: 1,
    contacts: 1,
    presentations: 1,
    appointments: 0,
    recruiting: 0,
    weeklyAP: 120,
    hustleScore: 250,
    hoursWorked: '1.7h',
    dialsPerSale: 0
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

  // Generate weekly data with correct dates
  const generateWeeklyData = (baseDate: Date): DailyData[] => {
    const startOfWeek = new Date(baseDate)
    startOfWeek.setDate(baseDate.getDate() - baseDate.getDay())
    
    const weekDays: DailyData[] = []
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek)
      currentDate.setDate(startOfWeek.getDate() + i)
      
      weekDays.push({
        day: dayNames[i],
        date: currentDate.getDate(),
        fullDate: currentDate,
        dials: 0,
        contacts: 0,
        appointments: 0,
        presentations: 1,
        sales: 0,
        recruiting: 0
      })
    }
    
    return weekDays
  }

  const [weeklyData, setWeeklyData] = useState<DailyData[]>(() => 
    generateWeeklyData(new Date())
  )

  // Update weekly data when selected week changes
  useEffect(() => {
    setWeeklyData(generateWeeklyData(selectedWeek))
  }, [selectedWeek])

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User'

  // Get week range
  const getWeekRange = (date: Date) => {
    const start = new Date(date)
    start.setDate(date.getDate() - date.getDay())
    const end = new Date(start)
    end.setDate(start.getDate() + 6)
    return { start, end }
  }

  const weekRange = getWeekRange(selectedWeek)

  const formatDateRange = () => {
    const start = weekRange.start
    const end = weekRange.end
    const startMonth = start.toLocaleString('default', { month: 'short' })
    const endMonth = end.toLocaleString('default', { month: 'short' })
    const startDay = start.getDate()
    const endDay = end.getDate()
    const year = start.getFullYear()
    
    if (startMonth === endMonth) {
      return `${startMonth} ${startDay} - ${endDay}, ${year}`
    }
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`
  }

  const goToPreviousWeek = () => {
    const newDate = new Date(selectedWeek)
    newDate.setDate(newDate.getDate() - 7)
    setSelectedWeek(newDate)
  }

  const goToNextWeek = () => {
    const newDate = new Date(selectedWeek)
    newDate.setDate(newDate.getDate() + 7)
    setSelectedWeek(newDate)
  }

  const goToCurrentWeek = () => {
    setSelectedWeek(new Date())
  }

  // Calculate totals
  const totals = weeklyData.reduce((acc, day) => ({
    dials: acc.dials + day.dials,
    contacts: acc.contacts + day.contacts,
    appointments: acc.appointments + day.appointments,
    presentations: acc.presentations + day.presentations,
    sales: acc.sales + day.sales,
    recruiting: acc.recruiting + day.recruiting
  }), { dials: 0, contacts: 0, appointments: 0, presentations: 0, sales: 0, recruiting: 0 })

  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }

  // Stats cards for the bottom section
  const conversionStats = [
    { 
      label: 'Contact Rate', 
      value: `${totals.dials > 0 ? ((totals.contacts / totals.dials) * 100).toFixed(1) : '0.0'}%`,
      subtitle: `${totals.contacts}/${totals.dials} dials`,
      color: 'text-blue-600 dark:text-blue-400'
    },
    { 
      label: 'Presentation Rate', 
      value: `${totals.contacts > 0 ? ((totals.presentations / totals.contacts) * 100).toFixed(1) : '0.0'}%`,
      subtitle: `${totals.presentations}/${totals.contacts} contacts`,
      color: 'text-purple-600 dark:text-purple-400'
    },
    { 
      label: 'Close Rate', 
      value: `${totals.presentations > 0 ? ((totals.sales / totals.presentations) * 100).toFixed(1) : '0.0'}%`,
      subtitle: `${totals.sales}/${totals.presentations} pres.`,
      color: 'text-green-600 dark:text-green-400'
    },
    { 
      label: 'Dials per Sale', 
      value: `${totals.sales > 0 ? (totals.dials / totals.sales).toFixed(1) : '0'}`,
      subtitle: `${totals.dials}/${totals.sales} sales`,
      color: 'text-orange-600 dark:text-orange-400'
    },
    { 
      label: 'Weekly AP', 
      value: `$${weeklyStats.weeklyAP}`,
      subtitle: '',
      color: 'text-yellow-600 dark:text-yellow-400'
    },
    { 
      label: 'Sale', 
      value: `${totals.sales}`,
      subtitle: '',
      color: 'text-green-600 dark:text-green-400'
    },
    { 
      label: 'Hustle Score', 
      value: `${weeklyStats.hustleScore}`,
      subtitle: 'points',
      color: 'text-yellow-600 dark:text-yellow-400'
    },
    { 
      label: 'Hours Worked', 
      value: `${weeklyStats.hoursWorked}`,
      subtitle: `${Math.round(parseFloat(weeklyStats.hoursWorked) * 60)} mins total`,
      color: 'text-blue-600 dark:text-blue-400'
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
        <div className="flex items-center gap-2">
          <div className="bg-yellow-400 text-gray-900 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1">
            <Gift className="h-4 w-4" />
            Need leads? Try G.O.A.T. Leads
          </div>
        </div>
      </div>

      {/* Weekly Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-yellow-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly</h2>
          </div>
          <span className="text-sm text-gray-400 dark:text-gray-500">|</span>
          <div className="flex items-center gap-2">
            <button
              onClick={goToPreviousWeek}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-gray-500" />
            </button>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {formatDateRange()}
            </span>
            <button
              onClick={goToNextWeek}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronRight className="h-4 w-4 text-gray-500" />
            </button>
            <button
              onClick={goToCurrentWeek}
              className="text-xs text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 font-medium ml-1"
            >
              Today
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href="/dashboard/dial-tracker"
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Daily
          </Link>
          <Link
            href="/dashboard/dial-tracker/weekly"
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-yellow-400 text-gray-900 shadow-sm"
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

      {/* Weekly Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-4 w-4 text-yellow-500" />
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Week of {formatDateRange()}</h4>
        </div>

        {/* Day Headers with Dates */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weeklyData.map((day, index) => {
            const isTodayDate = isToday(day.fullDate)
            return (
              <div key={index} className="text-center">
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">{day.day}</div>
                <div className={`text-sm font-bold ${isTodayDate ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-900 dark:text-white'}`}>
                  {day.date}
                  {isTodayDate && <span className="ml-1 text-[8px]">●</span>}
                </div>
              </div>
            )
          })}
        </div>

        {/* Dials Row */}
        <div className="grid grid-cols-7 gap-2 mb-1">
          {weeklyData.map((day, index) => (
            <div key={index} className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2 text-center min-h-[40px] flex items-center justify-center">
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{day.dials}</span>
            </div>
          ))}
        </div>

        {/* Contacts Row */}
        <div className="grid grid-cols-7 gap-2 mb-1">
          {weeklyData.map((day, index) => (
            <div key={index} className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2 text-center min-h-[40px] flex items-center justify-center">
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">{day.contacts}</span>
            </div>
          ))}
        </div>

        {/* Appointments Row */}
        <div className="grid grid-cols-7 gap-2 mb-1">
          {weeklyData.map((day, index) => (
            <div key={index} className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2 text-center min-h-[40px] flex items-center justify-center">
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">{day.appointments}</span>
            </div>
          ))}
        </div>

        {/* Presentations Row */}
        <div className="grid grid-cols-7 gap-2 mb-1">
          {weeklyData.map((day, index) => (
            <div key={index} className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-2 text-center min-h-[40px] flex items-center justify-center">
              <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">{day.presentations}</span>
            </div>
          ))}
        </div>

        {/* Sales Row */}
        <div className="grid grid-cols-7 gap-2 mb-1">
          {weeklyData.map((day, index) => (
            <div key={index} className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2 text-center min-h-[40px] flex items-center justify-center">
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">{day.sales}</span>
            </div>
          ))}
        </div>

        {/* Recruiting Row */}
        <div className="grid grid-cols-7 gap-2">
          {weeklyData.map((day, index) => (
            <div key={index} className="bg-red-50 dark:bg-red-900/20 rounded-lg p-2 text-center min-h-[40px] flex items-center justify-center">
              <span className="text-sm font-semibold text-red-600 dark:text-red-400">{day.recruiting}</span>
            </div>
          ))}
        </div>

        {/* Totals Row */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-7 gap-2">
            <div className="col-span-7">
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">TOTALS</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 text-center">
              <span className="text-sm font-bold text-gray-900 dark:text-white">{totals.dials}</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 text-center">
              <span className="text-sm font-bold text-gray-900 dark:text-white">{totals.contacts}</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 text-center">
              <span className="text-sm font-bold text-gray-900 dark:text-white">{totals.appointments}</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 text-center">
              <span className="text-sm font-bold text-gray-900 dark:text-white">{totals.presentations}</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 text-center">
              <span className="text-sm font-bold text-gray-900 dark:text-white">{totals.sales}</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 text-center">
              <span className="text-sm font-bold text-gray-900 dark:text-white">{totals.recruiting}</span>
            </div>
            <div className="col-span-7">
              <div className="grid grid-cols-6 gap-2 mt-1">
                <div className="text-[10px] text-gray-400 dark:text-gray-500 text-center">Contacts</div>
                <div className="text-[10px] text-gray-400 dark:text-gray-500 text-center">Appointments</div>
                <div className="text-[10px] text-gray-400 dark:text-gray-500 text-center">Presentations</div>
                <div className="text-[10px] text-gray-400 dark:text-gray-500 text-center">Sales</div>
                <div className="text-[10px] text-gray-400 dark:text-gray-500 text-center">Recruiting</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conversion Rates & Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-yellow-500" />
          CONVERSION RATES & ACTIVITY
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {conversionStats.map((stat, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
              {stat.subtitle && (
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{stat.subtitle}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}