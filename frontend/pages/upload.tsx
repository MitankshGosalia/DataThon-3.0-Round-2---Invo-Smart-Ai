import { useState } from 'react'
import Layout from '../components/Layout'
import FileUpload from '../components/FileUpload'
import { motion } from 'framer-motion'
import { DocumentTextIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function Upload() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [extractedData, setExtractedData] = useState<any>(null)

  const handleUpload = async (file: File) => {
    setUploadedFile(file)
    setProcessing(true)

    // Simulate API call to process invoice
    setTimeout(() => {
      setProcessing(false)
      setExtractedData({
        invoiceNumber: 'INV-2025-001',
        date: 'January 29, 2025',
        dueDate: 'February 28, 2025',
        amount: '$1,234.56',
        tax: '$123.46',
        total: '$1,358.02',
        vendor: {
          name: 'Tech Solutions Inc.',
          address: '123 Business Ave, Tech City, TC 12345',
          email: 'billing@techsolutions.com',
        },
        client: {
          name: 'Client Corporation',
          address: '456 Corporate Blvd, Business City, BC 67890',
          email: 'accounts@clientcorp.com',
        },
      })
    }, 2000)
  }

  return (
    <Layout title="Upload Invoice - InvoSmart AI">
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-white">Upload Invoice</h1>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="mt-8">
            <div className="glass-effect overflow-hidden rounded-lg p-6">
              {!extractedData ? (
                <>
                  <div className="text-center mb-6">
                    <DocumentTextIcon className="mx-auto h-12 w-12 text-blue-400" />
                    <h2 className="mt-2 text-lg font-medium text-white">
                      Upload your invoice
                    </h2>
                    <p className="mt-1 text-sm text-gray-400">
                      Our AI will automatically extract and process the information
                    </p>
                  </div>
                  <FileUpload onUpload={handleUpload} />
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center mb-6">
                    <CheckCircleIcon className="mx-auto h-12 w-12 text-green-400" />
                    <h2 className="mt-2 text-lg font-medium text-white">
                      Invoice Processed Successfully
                    </h2>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white">Invoice Details</h3>
                      <div className="space-y-2">
                        {Object.entries({
                          'Invoice Number': extractedData.invoiceNumber,
                          'Date': extractedData.date,
                          'Due Date': extractedData.dueDate,
                          'Amount': extractedData.amount,
                          'Tax': extractedData.tax,
                          'Total': extractedData.total,
                        }).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-400">{key}</span>
                            <span className="text-white font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">Vendor</h3>
                        <div className="space-y-1">
                          <p className="text-white">{extractedData.vendor.name}</p>
                          <p className="text-gray-400 text-sm">
                            {extractedData.vendor.address}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {extractedData.vendor.email}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">Client</h3>
                        <div className="space-y-1">
                          <p className="text-white">{extractedData.client.name}</p>
                          <p className="text-gray-400 text-sm">
                            {extractedData.client.address}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {extractedData.client.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end space-x-4">
                    <button
                      onClick={() => {
                        setUploadedFile(null)
                        setExtractedData(null)
                      }}
                      className="px-4 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-800 transition-colors"
                    >
                      Upload Another
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Save & Process
                    </button>
                  </div>
                </motion.div>
              )}

              {processing && (
                <div className="mt-6">
                  <div className="animate-pulse flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  </div>
                  <p className="text-center text-sm text-gray-400 mt-2">
                    Processing your invoice...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
