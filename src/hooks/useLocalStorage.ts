import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const readValueFromLocalStorage = (): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn('useLocalStorage: Error reading from localStorage', error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValueFromLocalStorage);

  const setValue = (value: T): void => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('useLocalStorage: Error writing to localStorage', error);
    }
  };

  return [storedValue, setValue];
}
