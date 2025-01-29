import { useState, useEffect } from 'react';
import { Invoice } from '../types';
import * as api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

interface UseInvoicesOptions {
  limit?: number;
  autoFetch?: boolean;
}

export function useInvoices(options: UseInvoicesOptions = {}) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const data = await api.getInvoices({ limit: options.limit });
      setInvoices(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options.autoFetch !== false && user) {
      fetchInvoices();
    }
  }, [user, options.autoFetch]);

  const uploadInvoice = async (file: File) => {
    try {
      const newInvoice = await api.uploadInvoice(file);
      setInvoices((prev) => [newInvoice, ...prev]);
      return newInvoice;
    } catch (err) {
      throw err;
    }
  };

  const refreshInvoices = () => {
    return fetchInvoices();
  };

  return {
    invoices,
    loading,
    error,
    uploadInvoice,
    refreshInvoices,
  };
}
