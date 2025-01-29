import { useState, useEffect } from 'react';
import { InvoiceAnalytics } from '../types';
import * as api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<InvoiceAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const data = await api.getAnalytics();
      setAnalytics(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAnalytics();
    }
  }, [user]);

  const refreshAnalytics = () => {
    return fetchAnalytics();
  };

  return {
    analytics,
    loading,
    error,
    refreshAnalytics,
  };
}
