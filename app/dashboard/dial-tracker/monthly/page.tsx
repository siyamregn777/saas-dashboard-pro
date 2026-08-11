'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User, Profile } from '@/types'
import {
  Phone,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Gift,
  BarChart3,
  ChevronDown,
  Filter,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Clock,
  Zap,
  Target,
  Users,
  FileText,
  Handshake,
  UserCheck,
  UserPlus
} from 'lucide-react'
import Link from 'next/link'

// Types for monthly data
interface MonthlyStats {
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

interface DayData {
  date: number
  fullDate: Date
  dials: number
  contacts: number
  appointments: number
  presentations: number
  sales: number
  recruiting: number
  isCurrentMonth: boolean
}

export default function MonthlyDialTrackerPage() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date())
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats>({
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

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User'

  // Generate calendar data for the month
  const generateMonthData = (date: Date): DayData[] => {
    const year = date.getFullYear()
    const month = date.getMonth()
    
    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)
    // Day of week for first day (0 = Sunday)
    const startDayOfWeek = firstDay.getDay()
    
    const days: DayData[] = []
    
    // Get days from previous month to fill the first week
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const dateNum = prevMonthLastDay - i
      const prevDate = new Date(year, month - 1, dateNum)
      days.push({
        date: dateNum,
        fullDate: prevDate,
        dials: 0,
        contacts: 0,
        appointments: 0,
        presentations: 0,
        sales: 0,
        recruiting: 0,
        isCurrentMonth: false
      })
    }
    
    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(year, month, i)
      days.push({
        date: i,
        fullDate: currentDate,
        dials: 0,
        contacts: 0,
        appointments: 0,
        presentations: 1, // Sample data
        sales: 0,
        recruiting: 0,
        isCurrentMonth: true
      })
    }
    
    // Get days from next month to fill the last week
    const remainingDays = 42 - days.length // 6 rows * 7 columns
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i)
      days.push({
        date: i,
        fullDate: nextDate,
        dials: 0,
        contacts: 0,
        appointments: 0,
        presentations: 0,
        sales: 0,
        recruiting: 0,
        isCurrentMonth: false
      })
    }
    
    return days
  }

  const [monthlyData, setMonthlyData] = useState<DayData[]>(() => 
    generateMonthData(new Date())
  )

  // Update monthly data when selected month changes
  useEffect(() => {
    setMonthlyData(generateMonthData(selectedMonth))
  }, [selectedMonth])

  const goToPreviousMonth = () => {
    const newDate = new Date(selectedMonth)
    newDate.setMonth(newDate.getMonth() - 1)
    setSelectedMonth(newDate)
  }

  const goToNextMonth = () => {
    const newDate = new Date(selectedMonth)
    newDate.setMonth(newDate.getMonth() + 1)
    setSelectedMonth(newDate)
  }

  const goToCurrentMonth = () => {
    setSelectedMonth(new Date())
  }

  const formatMonth = () => {
    return selectedMonth.toLocaleString('default', { month: 'long', year: 'numeric' })
  }

  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }

  // Calculate totals
  const totals = monthlyData.reduce((acc, day) => ({
    dials: acc.dials + day.dials,
    contacts: acc.contacts + day.contacts,
    appointments: acc.appointments + day.appointments,
    presentations: acc.presentations + day.presentations,
    sales: acc.sales + day.sales,
    recruiting: acc.recruiting + day.recruiting
  }), { dials: 0, contacts: 0, appointments: 0, presentations: 0, sales: 0, recruiting: 0 })

  // Get day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // Get rows (weeks) from the data
  const getWeeks = () => {
    const weeks: DayData[][] = []
    for (let i = 0; i < monthlyData.length; i += 7) {
      weeks.push(monthlyData.slice(i, i + 7))
    }
    return weeks
  }

  const weeks = getWeeks()

  // Stats for the bottom section
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
      value: `$${monthlyStats.weeklyAP}`,
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
      value: `${monthlyStats.hustleScore}`,
      subtitle: 'points',
      color: 'text-yellow-600 dark:text-yellow-400'
    },
    { 
      label: 'Hours Worked', 
      value: `${monthlyStats.hoursWorked}`,
      subtitle: `${Math.round(parseFloat(monthlyStats.hoursWorked) * 60)} mins total`,
      color: 'text-blue-600 dark:text-blue-400'
    },
  ]

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
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

      {/* Monthly Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-yellow-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly</h2>
          </div>
          <span className="text-sm text-gray-400 dark:text-gray-500">|</span>
          <div className="flex items-center gap-2">
            <button
              onClick={goToPreviousMonth}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-gray-500" />
            </button>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {formatMonth()}
            </span>
            <button
              onClick={goToNextMonth}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronRight className="h-4 w-4 text-gray-500" />
            </button>
            <button
              onClick={goToCurrentMonth}
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
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Weekly
          </Link>
          <Link
            href="/dashboard/dial-tracker/monthly"
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-yellow-400 text-gray-900 shadow-sm"
          >
            Monthly
          </Link>
        </div>
      </div>

      {/* Monthly Calendar Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 overflow-x-auto">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-4 w-4 text-yellow-500" />
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">{formatMonth()}</h4>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center">
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">{day}</div>
            </div>
          ))}
        </div>

        {/* Calendar Grid - Each row is a week */}
        <div className="space-y-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-1">
              {week.map((day, dayIndex) => {
                const isTodayDate = isToday(day.fullDate)
                return (
                  <div
                    key={dayIndex}
                    className={`p-1 rounded-lg min-h-[80px] transition-colors ${
                      day.isCurrentMonth
                        ? 'bg-gray-50 dark:bg-gray-700/50'
                        : 'bg-gray-100/50 dark:bg-gray-800/50 opacity-40'
                    } ${isTodayDate ? 'ring-2 ring-yellow-400' : ''}`}
                  >
                    <div className="text-right">
                      <span className={`text-xs font-medium ${isTodayDate ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-500 dark:text-gray-400'}`}>
                        {day.date}
                      </span>
                    </div>
                    <div className="space-y-0.5 mt-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-blue-500">D</span>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{day.dials}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-green-500">C</span>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{day.contacts}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-purple-500">A</span>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{day.appointments}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-orange-500">P</span>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{day.presentations}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-green-600">S</span>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{day.sales}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-red-500">R</span>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{day.recruiting}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <span className="text-blue-500 font-bold">D</span>
              <span className="text-gray-500 dark:text-gray-400">Dials</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-green-500 font-bold">C</span>
              <span className="text-gray-500 dark:text-gray-400">Contacts</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-purple-500 font-bold">A</span>
              <span className="text-gray-500 dark:text-gray-400">Appointments</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-orange-500 font-bold">P</span>
              <span className="text-gray-500 dark:text-gray-400">Presentations</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-green-600 font-bold">S</span>
              <span className="text-gray-500 dark:text-gray-400">Sales</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-red-500 font-bold">R</span>
              <span className="text-gray-500 dark:text-gray-400">Recruiting</span>
            </div>
            <div className="flex items-center gap-1 ml-4">
              <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500"></div>
              <span className="text-gray-500 dark:text-gray-400">Today</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"></div>
              <span className="text-gray-500 dark:text-gray-400">Other month</span>
            </div>
          </div>
        </div>

        {/* Totals Row */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-7 gap-1">
            <div className="col-span-7">
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">TOTALS</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 text-center">
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{totals.dials}</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 text-center">
              <span className="text-sm font-bold text-green-600 dark:text-green-400">{totals.contacts}</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 text-center">
              <span className="text-sm font-bold text-purple-600 dark:text-purple-400">{totals.appointments}</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 text-center">
              <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{totals.presentations}</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 text-center">
              <span className="text-sm font-bold text-green-600 dark:text-green-400">{totals.sales}</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 text-center">
              <span className="text-sm font-bold text-red-600 dark:text-red-400">{totals.recruiting}</span>
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