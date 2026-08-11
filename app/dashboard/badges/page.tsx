'use client'

import { Award, Star, Trophy, Target, Flame, Crown } from 'lucide-react'

const badges = [
  { name: 'Top Clearer', icon: Trophy, color: 'text-yellow-500', bg: 'bg-yellow-50', earned: true },
  { name: 'Top Builder', icon: Star, color: 'text-blue-500', bg: 'bg-blue-50', earned: true },
  { name: 'Snipar', icon: Target, color: 'text-green-500', bg: 'bg-green-50', earned: true },
  { name: 'Marathon', icon: Flame, color: 'text-red-500', bg: 'bg-red-50', earned: true },
  { name: 'Most Improved', icon: Award, color: 'text-purple-500', bg: 'bg-purple-50', earned: true },
  { name: 'Grind King', icon: Crown, color: 'text-orange-500', bg: 'bg-orange-50', earned: false },
]

export default function BadgesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Badges</h2>
        <div className="text-sm text-gray-600">
          <span className="font-bold text-gray-800">82</span> total earned • <span className="font-bold text-gray-800">27</span> unique
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {badges.map((badge) => (
          <div key={badge.name} className={`bg-white rounded-xl p-6 shadow-sm border ${badge.earned ? 'border-gray-100' : 'border-gray-200 opacity-60'} text-center`}>
            <div className={`w-16 h-16 ${badge.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
              <badge.icon className={`w-8 h-8 ${badge.color}`} />
            </div>
            <h3 className="font-semibold text-gray-800">{badge.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{badge.earned ? 'Earned' : 'Locked'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}