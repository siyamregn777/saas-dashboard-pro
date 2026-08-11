'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User as UserType, Profile as ProfileType } from '@/types'
import { User, Mail, Calendar, Edit, Save, Camera, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const [user, setUser] = useState<UserType | null>(null)
  const [profile, setProfile] = useState<ProfileType | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [fullName, setFullName] = useState('')
  const [bio, setBio] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) {
          router.push('/login')
          return
        }
        setUser(user as UserType)

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error fetching profile:', profileError)
        }

        if (profile) {
          setProfile(profile as ProfileType)
          setFullName(profile.full_name || '')
          setBio(profile.bio || '')
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    getUserData()
  }, [supabase, router])

  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    setMessage(null)

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: fullName,
          bio: bio,
          updated_at: new Date().toISOString(),
        })

      if (error) throw error

      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      setIsEditing(false)
      
      // Refresh profile data
      const { data: updatedProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      setProfile(updatedProfile as ProfileType)
    } catch (error) {
      setMessage({ type: 'error', text: 'Error updating profile' })
      console.error('Error updating profile:', error)
    } finally {
      setSaving(false)
    }
  }

  const getInitials = (name: string) => {
    return name?.charAt(0).toUpperCase() || 'U'
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your personal information</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-3xl font-bold text-gray-900">
                {getInitials(profile?.full_name || user?.email || 'User')}
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                <Camera className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{profile?.full_name || 'User'}</h2>
              <p className="text-gray-800">{user?.email}</p>
              <p className="text-sm text-gray-700 mt-1 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {message && (
            <div className={`mb-4 p-3 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                {isEditing ? (
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <span className="text-gray-900 dark:text-white">{profile?.full_name || 'Not set'}</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-900 dark:text-white">{user?.email}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-400">{profile?.bio || 'No bio yet'}</p>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false)
                      setFullName(profile?.full_name || '')
                      setBio(profile?.bio || '')
                      setMessage(null)
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}