import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface FileUploadProps {
  onUpload: (file: File) => void
  accept?: string[]
  maxSize?: number
}

export default function FileUpload({
  onUpload,
  accept = ['application/pdf', 'image/jpeg', 'image/png'],
  maxSize = 5242880, // 5MB
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        if (file.size > maxSize) {
          toast.error('File is too large. Maximum size is 5MB.')
          return
        }
        onUpload(file)
        toast.success('File uploaded successfully!')
      }
    },
    [maxSize, onUpload]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {}),
    maxSize,
    multiple: false,
  })

  return (
    <motion.div
      className="w-full"
      animate={{ scale: isDragging ? 1.02 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <div
        {...getRootProps()}
        className={`w-full h-64 border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 ${
          isDragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500'
        }`}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDrop={() => setIsDragging(false)}
      >
        <input {...getInputProps()} />
        <CloudArrowUpIcon className="w-12 h-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Drag and drop your invoice here, or click to select
        </p>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Supported formats: PDF, JPEG, PNG (max 5MB)
        </p>
      </div>
    </motion.div>
  )
}
