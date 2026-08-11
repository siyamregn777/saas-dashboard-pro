// types/index.ts

export interface User {
  id: string
  email: string
  user_metadata?: {
    full_name?: string
  }
  created_at?: string
}

export interface Profile {
  id: string
  full_name: string
  email: string
  bio?: string
  avatar_url?: string
  created_at?: string
  updated_at?: string
}

export interface DashboardStats {
  apSoldThisWeek: number
  salesThisWeek: number
  hoursWorked: number
  totalDeposits: number
  depositsThisWeek: number
  depositsThisMonth: number
  dialsThisWeek: number
  hustleScore: number
  goalAmount: number
  totalBadges: number
  prestigeLevel: number
  progressPercentage: number
  weeklyData: WeeklyData[]
}

export interface WeeklyData {
  day: string
  value: number
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earned: boolean
  earned_at?: string
}

export interface Lead {
  id: string
  user_id: string
  name: string
  email: string
  phone: string
  status: 'hot' | 'warm' | 'cold'
  source: string
  notes: string
  created_at: string
  updated_at: string
}

export interface Deposit {
  id: string
  user_id: string
  amount: number
  type: string
  status: 'pending' | 'completed' | 'failed'
  description: string
  created_at: string
}