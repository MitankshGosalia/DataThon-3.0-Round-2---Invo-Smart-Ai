export interface User {
  id: number;
  email: string;
  fullName: string;
  createdAt: string;
}

export interface Invoice {
  id: number;
  filename: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  invoiceNumber: string;
  date: string;
  dueDate: string;
  amount: number;
  tax: number;
  total: number;
  vendorName: string;
  vendorAddress: string;
  vendorEmail: string;
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  createdAt: string;
  processedAt?: string;
  ownerId: number;
}

export interface InvoiceAnalytics {
  totalCount: number;
  totalAmount: number;
  averageAmount: number;
  processingTime: number;
  successRate: number;
  monthlyTrends: {
    [key: string]: {
      count: number;
      amount: number;
    };
  };
  categoryDistribution: {
    [key: string]: number;
  };
}
