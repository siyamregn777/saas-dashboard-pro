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

export interface UserStats {
  id: string
  user_id: string
  total_calls: number
  total_deposits: number
  total_leads: number
  hustle_score: number
  updated_at: string
}

export interface Activity {
  id: string
  user_id: string
  action: string
  details: Record<string, unknown>
  created_at: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  required_score: number
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

export interface CallRecord {
  id: string
  user_id: string
  lead_id: string
  duration: number
  outcome: string
  notes: string
  recorded_at: string
  created_at: string
}

export interface DashboardStats {
  apSoldThisWeek: number
  salesThisWeek: number
  hoursWorked: number
  totalDeposits: number
  totalLeads: number
  hotLeads: number
  coldLeads: number
  conversionRate: number
  totalBadges: number
  prestigeLevel: number
  progressPercentage: number
  dialsThisWeek: number
  leaderboardRank: number
  topPerformers: TopPerformer[]
  recentActivity: RecentActivity[]
}

export interface TopPerformer {
  rank: number
  name: string
  revenue: number
  growth: number
}

export interface RecentActivity {
  id: string
  user: string
  action: string
  time: string
  avatar: string
}