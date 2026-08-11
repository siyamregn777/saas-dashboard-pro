'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User, Profile } from '@/types'
import {
  ArrowLeft,
  Plus,
  Save,
  Upload,
  FileText,
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Building2,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Edit,
  Trash2,
  Eye,
  Download,
  Image,
  Camera,
  Info,
  HelpCircle,
  Shield,
  Heart,
  Briefcase,
  CreditCard,
  FileCheck,
  Award,
  TrendingUp,
  Clock,
  Zap,
  Sparkles,
  X
} from 'lucide-react'
import Link from 'next/link'

// Types
interface QuickSaleForm {
  saleDate: string
  annualPremium: string
  carrier: string
}

interface FullClientForm {
  // Client Information
  clientName: string
  date: string
  dateOfBirth: string
  age: string
  phone: string
  smoker: boolean
  email: string
  address: string
  city: string
  state: string
  postalCode: string
  height: string
  weight: string
  occupation: string
  // Beneficiary
  beneficiaryName: string
  beneficiaryRelationship: string
  // Medical
  healthConditions: string
  // Financial
  clientIncome: string
  spouseIncome: string
  financialAssets: string
  goldenQuestion: string
  // Payment
  paymentMethod: string
  // Policy
  policyNumber: string
  firstDraftDate: string
  socialSecurityBilling: string
  whyPolicy: string
  notes: string
  // Lead
  leadVendor: string
  leadType: string
  leadAge: string
  fieldOrTele: string
  appointmentType: string
  // Quote
  coverage: string
  premiumPerMonth: string
  quoteNotes: string
  selectedPolicy: boolean
}

interface Calculator {
  annualPremium: number
  compRate: number
  advanceRate: number
}

export default function PostSalePage() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [saleType, setSaleType] = useState<'quick' | 'full'>('quick')
  const [activeTab, setActiveTab] = useState<'client' | 'quote' | 'payment' | 'policy' | 'lead'>('client')
  const supabase = createClient()

  // Quick Sale Form
  const [quickSale, setQuickSale] = useState<QuickSaleForm>({
    saleDate: new Date().toISOString().split('T')[0],
    annualPremium: '',
    carrier: ''
  })

  // Full Client Sale Form
  const [fullClient, setFullClient] = useState<FullClientForm>({
    clientName: '',
    date: new Date().toISOString().split('T')[0],
    dateOfBirth: '',
    age: '',
    phone: '',
    smoker: false,
    email: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    height: '',
    weight: '',
    occupation: '',
    beneficiaryName: '',
    beneficiaryRelationship: '',
    healthConditions: '',
    clientIncome: '',
    spouseIncome: '',
    financialAssets: '',
    goldenQuestion: '',
    paymentMethod: '',
    policyNumber: '',
    firstDraftDate: '',
    socialSecurityBilling: '',
    whyPolicy: '',
    notes: '',
    leadVendor: '',
    leadType: '',
    leadAge: '',
    fieldOrTele: '',
    appointmentType: '',
    coverage: '',
    premiumPerMonth: '',
    quoteNotes: '',
    selectedPolicy: false,
  })

  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessingAI, setIsProcessingAI] = useState(false)

  // Projected Pay Calculator
  const [calculator, setCalculator] = useState<Calculator>({
    annualPremium: 0,
    compRate: 140,
    advanceRate: 80
  })

  const projectedPay = calculator.annualPremium * (calculator.compRate / 100) * (calculator.advanceRate / 100)

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

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
      setIsProcessingAI(true)
      // Simulate AI processing
      setTimeout(() => {
        setIsProcessingAI(false)
        // Auto-fill some fields with sample data
        setFullClient({
          ...fullClient,
          clientName: 'John Doe',
          phone: '(555) 123-4567',
          email: 'john@example.com',
          address: '123 Main St',
          city: 'Los Angeles',
          state: 'CA',
          postalCode: '90210'
        })
      }, 2000)
    }
  }

  const downloadWorksheet = () => {
    // Create a simple text worksheet
    const worksheet = `
CLIENT SALE WORKSHEET
=====================
Client: ${fullClient.clientName || '___________'}
Date: ${fullClient.date || '___________'}
Phone: ${fullClient.phone || '___________'}
Email: ${fullClient.email || '___________'}

Policy Details:
- Coverage: ${fullClient.coverage || '___________'}
- Premium: $${fullClient.premiumPerMonth || '___________'}/mo

Notes: ${fullClient.notes || '___________'}
    `
    const blob = new Blob([worksheet], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sale-worksheet-${fullClient.clientName || 'client'}-${fullClient.date || 'today'}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (saleType === 'quick') {
      console.log('Quick Sale:', quickSale)
    } else {
      console.log('Full Client Sale:', fullClient)
    }
    // Here you would save to Supabase
    alert('Sale posted successfully!')
  }

  const handleQuickSaleChange = (field: keyof QuickSaleForm, value: string) => {
    setQuickSale({ ...quickSale, [field]: value })
  }

  const handleFullClientChange = (field: keyof FullClientForm, value: string | boolean) => {
    setFullClient({ ...fullClient, [field]: value as any })
  }

  // Tabs for full client sale
  const tabs = [
    { id: 'client' as const, label: 'Client Information', icon: UserIcon },
    { id: 'quote' as const, label: 'Quote Comparisons', icon: FileCheck },
    { id: 'payment' as const, label: 'Payment Information', icon: CreditCard },
    { id: 'policy' as const, label: 'Policy Details', icon: Shield },
    { id: 'lead' as const, label: 'Lead Information', icon: TrendingUp },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'client':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900 dark:text-white">Client Information</h4>
              <span className="text-xs text-gray-500 dark:text-gray-400">Sale Status: Draft</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Client Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Full name"
                  value={fullClient.clientName}
                  onChange={(e) => handleFullClientChange('clientName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={fullClient.date}
                  onChange={(e) => handleFullClientChange('date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={fullClient.dateOfBirth}
                  onChange={(e) => handleFullClientChange('dateOfBirth', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Age</label>
                <input
                  type="number"
                  placeholder="Age"
                  value={fullClient.age}
                  onChange={(e) => handleFullClientChange('age', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                <input
                  type="tel"
                  placeholder="(555) 555-5555"
                  value={fullClient.phone}
                  onChange={(e) => handleFullClientChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Smoker</label>
                <select
                  value={fullClient.smoker ? 'yes' : 'no'}
                  onChange={(e) => handleFullClientChange('smoker', e.target.value === 'yes')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={fullClient.email}
                  onChange={(e) => handleFullClientChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                <input
                  type="text"
                  placeholder="Street address"
                  value={fullClient.address}
                  onChange={(e) => handleFullClientChange('address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={fullClient.city}
                  onChange={(e) => handleFullClientChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">State</label>
                <input
                  type="text"
                  placeholder="State"
                  value={fullClient.state}
                  onChange={(e) => handleFullClientChange('state', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Postal Code</label>
                <input
                  type="text"
                  placeholder="Zip"
                  value={fullClient.postalCode}
                  onChange={(e) => handleFullClientChange('postalCode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Height &amp; Weight</label>
  <input
    type="text"
    placeholder={"5'10\" / 180 lbs"}
    value={fullClient.height && fullClient.weight ? `${fullClient.height} / ${fullClient.weight} lbs` : ''}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
      const parts = e.target.value.split('/')
      handleFullClientChange('height', parts[0]?.trim() || '')
      handleFullClientChange('weight', parts[1]?.trim().replace('lbs', '') || '')
    }}
    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
  />
</div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Occupation</label>
                <input
                  type="text"
                  placeholder="Job title"
                  value={fullClient.occupation}
                  onChange={(e) => handleFullClientChange('occupation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h5 className="font-medium text-gray-900 dark:text-white mb-3">Primary Beneficiary</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Beneficiary Name</label>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={fullClient.beneficiaryName}
                    onChange={(e) => handleFullClientChange('beneficiaryName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Relationship</label>
                  <input
                    type="text"
                    placeholder="e.g., Spouse, Child"
                    value={fullClient.beneficiaryRelationship}
                    onChange={(e) => handleFullClientChange('beneficiaryRelationship', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h5 className="font-medium text-gray-900 dark:text-white mb-3">Medical Information</h5>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Health Conditions / Prescriptions</label>
                <textarea
                  placeholder="List any health conditions or prescriptions"
                  rows={3}
                  value={fullClient.healthConditions}
                  onChange={(e) => handleFullClientChange('healthConditions', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h5 className="font-medium text-gray-900 dark:text-white mb-3">Financial Inventory</h5>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    💰 The Golden Question:
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-2">
                    &quot;Do you have anything that acts like life insurance when you die?&quot;
                  </p>
                  <textarea
                    placeholder="Client's response..."
                    rows={2}
                    value={fullClient.goldenQuestion}
                    onChange={(e) => handleFullClientChange('goldenQuestion', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client Income</label>
                    <input
                      type="text"
                      placeholder="e.g. $45,000/yr"
                      value={fullClient.clientIncome}
                      onChange={(e) => handleFullClientChange('clientIncome', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Spouse Income</label>
                    <input
                      type="text"
                      placeholder="e.g. $35,000/yr"
                      value={fullClient.spouseIncome}
                      onChange={(e) => handleFullClientChange('spouseIncome', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Financial Assets</label>
                  <textarea
                    placeholder="No financial assets added yet."
                    rows={2}
                    value={fullClient.financialAssets}
                    onChange={(e) => handleFullClientChange('financialAssets', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )
      case 'quote':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900 dark:text-white">Quote Comparisons</h4>
              <span className="text-xs text-red-500">* (required when posting a sale)</span>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg text-sm text-yellow-700 dark:text-yellow-300">
              <Info className="h-4 w-4 inline mr-2" />
              Quotes (click checkmark to select chosen policy *)
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Coverage $</label>
                  <input
                    type="text"
                    placeholder="Coverage amount"
                    value={fullClient.coverage}
                    onChange={(e) => handleFullClientChange('coverage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Premium $/mo</label>
                  <input
                    type="text"
                    placeholder="Monthly premium"
                    value={fullClient.premiumPerMonth}
                    onChange={(e) => handleFullClientChange('premiumPerMonth', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                      fullClient.selectedPolicy
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                    onClick={() => handleFullClientChange('selectedPolicy', !fullClient.selectedPolicy)}
                  >
                    {fullClient.selectedPolicy ? '✓ Selected' : 'Select Policy'}
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
                <textarea
                  placeholder="Quote notes..."
                  rows={2}
                  value={fullClient.quoteNotes}
                  onChange={(e) => handleFullClientChange('quoteNotes', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        )
      case 'payment':
        return (
          <div className="space-y-6">
            <h4 className="font-semibold text-gray-900 dark:text-white">Payment Information</h4>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg text-sm text-yellow-700 dark:text-yellow-300">
              <AlertCircle className="h-4 w-4 inline mr-2" />
              Only the payment method is stored. Do not enter bank, card, or account numbers.
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Method</label>
              <select
                value={fullClient.paymentMethod}
                onChange={(e) => handleFullClientChange('paymentMethod', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Select payment method...</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Check">Check</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
          </div>
        )
      case 'policy':
        return (
          <div className="space-y-6">
            <h4 className="font-semibold text-gray-900 dark:text-white">Policy Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Policy Number</label>
                <input
                  type="text"
                  placeholder="New policy number"
                  value={fullClient.policyNumber}
                  onChange={(e) => handleFullClientChange('policyNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Draft Date</label>
                <input
                  type="date"
                  value={fullClient.firstDraftDate}
                  onChange={(e) => handleFullClientChange('firstDraftDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Their Why For Having The Policy</label>
              <textarea
                placeholder="Why is this policy important to the client?"
                rows={3}
                value={fullClient.whyPolicy}
                onChange={(e) => handleFullClientChange('whyPolicy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
              <textarea
                placeholder="Additional notes..."
                rows={3}
                value={fullClient.notes}
                onChange={(e) => handleFullClientChange('notes', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        )
      case 'lead':
        return (
          <div className="space-y-6">
            <h4 className="font-semibold text-gray-900 dark:text-white">Lead Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lead Vendor</label>
                <input
                  type="text"
                  placeholder="Lead vendor"
                  value={fullClient.leadVendor}
                  onChange={(e) => handleFullClientChange('leadVendor', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lead Type</label>
                <select
                  value={fullClient.leadType}
                  onChange={(e) => handleFullClientChange('leadType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select type...</option>
                  <option value="Web">Web</option>
                  <option value="Phone">Phone</option>
                  <option value="Referral">Referral</option>
                  <option value="Event">Event</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lead Age</label>
                <input
                  type="text"
                  placeholder="Lead age"
                  value={fullClient.leadAge}
                  onChange={(e) => handleFullClientChange('leadAge', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Field or Tele</label>
                <select
                  value={fullClient.fieldOrTele}
                  onChange={(e) => handleFullClientChange('fieldOrTele', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select...</option>
                  <option value="Field">Field</option>
                  <option value="Tele">Tele</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Appointment Type</label>
                <select
                  value={fullClient.appointmentType}
                  onChange={(e) => handleFullClientChange('appointmentType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select type...</option>
                  <option value="In-Person">In-Person</option>
                  <option value="Phone">Phone</option>
                  <option value="Virtual">Virtual</option>
                </select>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h5 className="font-medium text-gray-900 dark:text-white mb-3">Projected Pay Calculator</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Annual Premium</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                    <input
                      type="number"
                      value={calculator.annualPremium}
                      onChange={(e) => setCalculator({ ...calculator, annualPremium: parseFloat(e.target.value) || 0 })}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Comp %</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={calculator.compRate}
                      onChange={(e) => setCalculator({ ...calculator, compRate: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Advance %</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={calculator.advanceRate}
                      onChange={(e) => setCalculator({ ...calculator, advanceRate: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">%</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Formula:</strong> AP &times; Comp Rate &times; Advance Rate
                </p>
                <p className="text-lg font-bold text-yellow-700 dark:text-yellow-400 mt-2">
                  Projected Pay: ${projectedPay.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/clients"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-500" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Post a Sale</h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Choose how much detail you want to track for this sale.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            type="submit"
            form="sale-form"
            className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg text-sm font-semibold hover:bg-yellow-500 transition-colors flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save &amp; Post
          </button>
        </div>
      </div>

      {/* Sale Type Toggle */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setSaleType('quick')}
          className={`p-6 rounded-xl border-2 text-left transition-all ${
            saleType === 'quick'
              ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-yellow-300 dark:hover:border-yellow-700'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${saleType === 'quick' ? 'bg-yellow-400' : 'bg-gray-200 dark:bg-gray-700'}`}>
              <Zap className={`h-5 w-5 ${saleType === 'quick' ? 'text-gray-900' : 'text-gray-500'}`} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Quick Sale</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Date, AP, and carrier only</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            Counts toward tracker, leaderboards, Discord, and agency production.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Does not store any client information.
          </p>
        </button>

        <button
          type="button"
          onClick={() => setSaleType('full')}
          className={`p-6 rounded-xl border-2 text-left transition-all ${
            saleType === 'full'
              ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-yellow-300 dark:hover:border-yellow-700'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${saleType === 'full' ? 'bg-yellow-400' : 'bg-gray-200 dark:bg-gray-700'}`}>
              <FileCheck className={`h-5 w-5 ${saleType === 'full' ? 'text-gray-900' : 'text-gray-500'}`} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Full Client Sale</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Full worksheet with client details</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            Full worksheet for client recordkeeping, lead tracking, projected pay, deposits, and client follow-up.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Best when you want the sale and the client details available later.
          </p>
        </button>
      </div>

      {/* Form Content */}
      <form id="sale-form" onSubmit={handleSubmit}>
        {saleType === 'quick' ? (
          // Quick Sale Form
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Sale</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Post a lightweight sale with only date, AP, and carrier. No client details required.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sale Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={quickSale.saleDate}
                  onChange={(e) => handleQuickSaleChange('saleDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Annual Premium <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                  <input
                    type="number"
                    placeholder="1,200"
                    value={quickSale.annualPremium}
                    onChange={(e) => handleQuickSaleChange('annualPremium', e.target.value)}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Carrier <span className="text-red-500">*</span>
                </label>
                <select
                  value={quickSale.carrier}
                  onChange={(e) => handleQuickSaleChange('carrier', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Select carrier...</option>
                  <option value="American Amicable">American Amicable</option>
                  <option value="Corebridge">Corebridge</option>
                  <option value="AIG">AIG</option>
                  <option value="Prudential">Prudential</option>
                  <option value="Transamerica">Transamerica</option>
                </select>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <Info className="h-4 w-4 inline mr-2" />
                  Quick sales count toward your tracker, leaderboards, and agency production.
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                  Use a full client sale when you want lead source, appointment type, projected pay, policy notes, client messages, and searchable client records.
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Full Client Sale Form
          <div className="space-y-6">
            {/* AI Upload */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex flex-wrap items-start gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <Upload className="h-5 w-5 text-yellow-500" />
                    <h4 className="font-medium text-gray-900 dark:text-white">Upload a PDF or photo of client sale info to auto-fill</h4>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    AI may misread handwriting &mdash; always review &amp; edit before saving
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf,image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      Upload
                    </div>
                  </label>
                  <button
                    type="button"
                    onClick={downloadWorksheet}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Worksheet
                  </button>
                </div>
              </div>
              {isProcessingAI && (
                <div className="mt-3 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  AI is analyzing your document...
                </div>
              )}
              {uploadedFile && !isProcessingAI && (
                <div className="mt-3 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  File processed: {uploadedFile.name}
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      activeTab === tab.id
                        ? 'bg-yellow-400 text-gray-900 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Tab Content */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              {renderTabContent()}
            </div>
          </div>
        )}

        {/* Footer with Submit */}
        <div className="flex flex-wrap items-center justify-between pt-4 mt-6 border-t border-gray-200 dark:border-gray-700 gap-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>🏆 New Sale</span>
            <span>✦ ${saleType === 'quick' ? quickSale.annualPremium || '0' : projectedPay.toFixed(0)}</span>
            <span>Annual Premium</span>
            <span>✦ Week-To-Date: 0 Sales</span>
            <span>$0 Total AP</span>
          </div>
          <div className="flex gap-3">
            <Link
              href="/dashboard/clients"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-500 transition-colors flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {saleType === 'quick' ? 'Post Quick Sale' : 'Post Full Client Sale'}
            </button>
          </div>
        </div>
      </form>

      {/* Footer */}
      <div className="text-center text-xs text-gray-400 dark:text-gray-500 pt-4">
        tracker.johnwetmore.com &copy; 2026 John Wetmore
      </div>
    </div>
  )
}