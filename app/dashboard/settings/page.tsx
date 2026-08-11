'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User as UserType, Profile as ProfileType } from '@/types'
import { Save, Bell, Palette, Loader2, Moon, Sun, Globe } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function SettingsPage() {
  const [user, setUser] = useState<UserType | null>(null)
  const [profile, setProfile] = useState<ProfileType | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const supabase = createClient()
  const { theme, setTheme } = useTheme()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    notifications: true,
    darkMode: theme === 'dark',
  })

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user as UserType)
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()
          setProfile(profile as ProfileType)
          if (profile) {
            setFormData({
              fullName: profile.full_name || '',
              email: user.email || '',
              notifications: true,
              darkMode: theme === 'dark',
            })
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }
    getUserData()
  }, [supabase, theme])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setSaving(true)
    setMessage(null)

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: formData.fullName,
          updated_at: new Date().toISOString(),
        })

      if (error) throw error

      setMessage({ type: 'success', text: 'Settings updated successfully!' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Error updating settings' })
      console.error('Error updating settings:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    setFormData({ ...formData, darkMode: newTheme === 'dark' })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-400" />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your account settings and preferences</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {message && (
            <div className={`p-3 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-white">Preferences</h3>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Notifications</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Receive updates and announcements</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.notifications}
                  onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-yellow-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Choose your preferred theme</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleThemeChange('light')}
                  className={`p-2 rounded-lg border transition-colors ${
                    theme === 'light' 
                      ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' 
                      : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  type="button"
                  onClick={() => handleThemeChange('dark')}
                  className={`p-2 rounded-lg border transition-colors ${
                    theme === 'dark' 
                      ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' 
                      : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  type="button"
                  onClick={() => handleThemeChange('system')}
                  className={`p-2 rounded-lg border transition-colors ${
                    theme === 'system' 
                      ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' 
                      : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Globe className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}