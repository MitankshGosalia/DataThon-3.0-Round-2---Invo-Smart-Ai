import { useState } from 'react'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'
import {
  UserCircleIcon,
  BellIcon,
  KeyIcon,
  CloudIcon,
  CogIcon,
  SwatchIcon,
} from '@heroicons/react/24/outline'

const settingsSections = [
  {
    id: 'profile',
    name: 'Profile Settings',
    icon: UserCircleIcon,
    fields: [
      { name: 'fullName', label: 'Full Name', type: 'text', value: 'John Doe' },
      { name: 'email', label: 'Email Address', type: 'email', value: 'john@example.com' },
      { name: 'company', label: 'Company', type: 'text', value: 'Tech Corp' },
    ],
  },
  {
    id: 'notifications',
    name: 'Notification Preferences',
    icon: BellIcon,
    fields: [
      {
        name: 'emailNotifications',
        label: 'Email Notifications',
        type: 'toggle',
        value: true,
      },
      {
        name: 'smsNotifications',
        label: 'SMS Notifications',
        type: 'toggle',
        value: false,
      },
      {
        name: 'whatsappNotifications',
        label: 'WhatsApp Notifications',
        type: 'toggle',
        value: true,
      },
    ],
  },
  {
    id: 'security',
    name: 'Security',
    icon: KeyIcon,
    fields: [
      {
        name: 'twoFactorAuth',
        label: 'Two-Factor Authentication',
        type: 'toggle',
        value: true,
      },
      {
        name: 'password',
        label: 'Change Password',
        type: 'button',
        action: 'Change',
      },
    ],
  },
  {
    id: 'integration',
    name: 'Integrations',
    icon: CloudIcon,
    fields: [
      {
        name: 'googleDrive',
        label: 'Google Drive',
        type: 'connection',
        status: 'connected',
      },
      {
        name: 'dropbox',
        label: 'Dropbox',
        type: 'connection',
        status: 'disconnected',
      },
      {
        name: 'slack',
        label: 'Slack',
        type: 'connection',
        status: 'connected',
      },
    ],
  },
  {
    id: 'appearance',
    name: 'Appearance',
    icon: SwatchIcon,
    fields: [
      {
        name: 'theme',
        label: 'Theme',
        type: 'select',
        value: 'dark',
        options: ['light', 'dark', 'system'],
      },
      {
        name: 'language',
        label: 'Language',
        type: 'select',
        value: 'en',
        options: ['en', 'es', 'fr', 'de'],
      },
    ],
  },
  {
    id: 'advanced',
    name: 'Advanced Settings',
    icon: CogIcon,
    fields: [
      {
        name: 'apiKey',
        label: 'API Key',
        type: 'password',
        value: '************************',
      },
      {
        name: 'exportData',
        label: 'Export All Data',
        type: 'button',
        action: 'Export',
      },
    ],
  },
]

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile')
  const [formData, setFormData] = useState({})

  const handleInputChange = (sectionId: string, fieldName: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [fieldName]: value,
      },
    }))
  }

  const handleSave = () => {
    console.log('Saving settings:', formData)
    // Implement save functionality
  }

  return (
    <Layout title="Settings - InvoSmart AI">
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-white">Settings</h1>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="mt-8">
            <div className="glass-effect overflow-hidden rounded-lg">
              <div className="grid grid-cols-12 divide-x divide-gray-700">
                {/* Sidebar */}
                <div className="col-span-3 p-6">
                  <nav className="space-y-2">
                    {settingsSections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                          activeSection === section.id
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-400 hover:bg-gray-800'
                        }`}
                      >
                        <section.icon className="h-5 w-5" />
                        <span>{section.name}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Main Content */}
                <div className="col-span-9 p-6">
                  {settingsSections.map(
                    (section) =>
                      activeSection === section.id && (
                        <motion.div
                          key={section.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h2 className="text-xl font-medium text-white mb-6">
                            {section.name}
                          </h2>
                          <div className="space-y-6">
                            {section.fields.map((field) => (
                              <div key={field.name} className="grid grid-cols-3 items-center">
                                <label
                                  htmlFor={field.name}
                                  className="text-sm font-medium text-gray-400"
                                >
                                  {field.label}
                                </label>
                                <div className="col-span-2">
                                  {field.type === 'text' || field.type === 'email' || field.type === 'password' ? (
                                    <input
                                      type={field.type}
                                      id={field.name}
                                      name={field.name}
                                      defaultValue={field.value}
                                      onChange={(e) =>
                                        handleInputChange(section.id, field.name, e.target.value)
                                      }
                                      className="block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                  ) : field.type === 'toggle' ? (
                                    <button
                                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                        field.value ? 'bg-blue-600' : 'bg-gray-700'
                                      }`}
                                      onClick={() =>
                                        handleInputChange(section.id, field.name, !field.value)
                                      }
                                    >
                                      <span
                                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                          field.value ? 'translate-x-5' : 'translate-x-0'
                                        }`}
                                      />
                                    </button>
                                  ) : field.type === 'select' ? (
                                    <select
                                      id={field.name}
                                      name={field.name}
                                      defaultValue={field.value}
                                      onChange={(e) =>
                                        handleInputChange(section.id, field.name, e.target.value)
                                      }
                                      className="block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    >
                                      {field.options?.map((option) => (
                                        <option key={option} value={option}>
                                          {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </option>
                                      ))}
                                    </select>
                                  ) : field.type === 'button' ? (
                                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                      {field.action}
                                    </button>
                                  ) : field.type === 'connection' ? (
                                    <div className="flex items-center space-x-3">
                                      <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                          field.status === 'connected'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                        }`}
                                      >
                                        {field.status.charAt(0).toUpperCase() + field.status.slice(1)}
                                      </span>
                                      <button className="text-sm text-blue-400 hover:text-blue-500">
                                        {field.status === 'connected' ? 'Disconnect' : 'Connect'}
                                      </button>
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )
                  )}

                  {/* Save Button */}
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
