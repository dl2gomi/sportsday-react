import { useState } from 'react';

function useLocalStorage(key, initialValue) {
  // Get the initial value from local storage or use the initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // Define a function to update the stored value
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  // Define a function to add a value
  const addValue = (value) => {
    try {
      Array.isArray(storedValue) &&
        !storedValue.includes(value) &&
        setValue([...storedValue, value]);
    } catch (err) {
      console.log(error);
    }
  };

  // Define a function to add a value
  const removeValue = (value) => {
    try {
      Array.isArray(storedValue) &&
        setValue(storedValue.filter((item) => item !== value));
    } catch (err) {
      console.log(error);
    }
  };

  return [storedValue, setValue, addValue, removeValue];
}

export default useLocalStorage;
