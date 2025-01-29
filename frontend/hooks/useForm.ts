import { useState, useCallback } from 'react';

interface FormErrors {
  [key: string]: string;
}

export function useForm<T extends { [key: string]: any }>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));
      // Clear error when field is modified
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    validate(name, value);
  }, []);

  const validate = (name: string, value: any) => {
    // Add your validation rules here
    if (value === '') {
      setErrors((prev) => ({
        ...prev,
        [name]: 'This field is required',
      }));
      return false;
    }

    if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        [name]: 'Please enter a valid email address',
      }));
      return false;
    }

    return true;
  };

  const validateAll = () => {
    const newErrors: FormErrors = {};
    Object.keys(values).forEach((key) => {
      if (!validate(key, values[key])) {
        newErrors[key] = errors[key] || 'Invalid value';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    onSubmit: (values: T) => Promise<void>,
    onError?: (error: any) => void
  ) => {
    try {
      setIsSubmitting(true);
      if (validateAll()) {
        await onSubmit(values);
      }
    } catch (error) {
      if (onError) {
        onError(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  };

  const setFieldValue = (name: keyof T, value: any) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setFieldError = (name: string, error: string) => {
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    setFieldError,
  };
}
