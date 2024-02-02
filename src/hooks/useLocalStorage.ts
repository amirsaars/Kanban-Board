import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, value: T | (() => T)) {
  const [values, setValues] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue) {
      return JSON.parse(jsonValue);
    }
    if (value instanceof Function) {
      return value();
    }

    return value;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(values));
  }, [key, values]);

  return [values, setValues] as [T, typeof setValues];
}

export default useLocalStorage;
