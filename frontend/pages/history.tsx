import { useState } from 'react'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'
import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'

// Mock data for invoices
const mockInvoices = [
  {
    id: 1,
    invoiceNumber: 'INV-2025-001',
    date: '2025-01-29',
    vendor: 'Tech Solutions Inc.',
    amount: '$1,234.56',
    status: 'Completed',
    category: 'Services',
  },
  {
    id: 2,
    invoiceNumber: 'INV-2025-002',
    date: '2025-01-28',
    vendor: 'Office Supplies Co.',
    amount: '$567.89',
    status: 'Completed',
    category: 'Products',
  },
  // Add more mock invoices here
]

export default function History() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDateRange, setSelectedDateRange] = useState('all')

  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.vendor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || invoice.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <Layout title="Invoice History - InvoSmart AI">
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-white">Invoice History</h1>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          {/* Filters */}
          <div className="mt-8 glass-effect rounded-lg p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-400">
                  Search
                </label>
                <input
                  type="text"
                  name="search"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Search by invoice number or vendor"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-400">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="all">All Categories</option>
                  <option value="Services">Services</option>
                  <option value="Products">Products</option>
                  <option value="Equipment">Equipment</option>
                </select>
              </div>

              {/* Date Range Filter */}
              <div>
                <label htmlFor="dateRange" className="block text-sm font-medium text-gray-400">
                  Date Range
                </label>
                <select
                  id="dateRange"
                  name="dateRange"
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>
          </div>

          {/* Invoice List */}
          <div className="mt-8">
            <div className="glass-effect overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flow-root">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead>
                          <tr>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                              Invoice Number
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                              Date
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                              Vendor
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                              Amount
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                              Status
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                          {filteredInvoices.map((invoice, index) => (
                            <motion.tr
                              key={invoice.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                <div className="flex items-center">
                                  <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-2" />
                                  {invoice.invoiceNumber}
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                {invoice.date}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                {invoice.vendor}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                {invoice.amount}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm">
                                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                  {invoice.status}
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                <div className="flex space-x-3">
                                  <button
                                    className="text-gray-400 hover:text-white"
                                    title="View"
                                  >
                                    <EyeIcon className="h-5 w-5" />
                                  </button>
                                  <button
                                    className="text-gray-400 hover:text-white"
                                    title="Download"
                                  >
                                    <ArrowDownTrayIcon className="h-5 w-5" />
                                  </button>
                                  <button
                                    className="text-gray-400 hover:text-red-500"
                                    title="Delete"
                                  >
                                    <TrashIcon className="h-5 w-5" />
                                  </button>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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
