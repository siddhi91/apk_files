import React, { createContext, useContext, useState } from 'react';
import { Appearance } from 'react-native';

// Create a context for the theme
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => {
  return useContext(ThemeContext);
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Initialize the theme based on system preferences or default to light mode
  const systemDarkMode = Appearance.getColorScheme() === 'dark';
  const [isDarkMode, setIsDarkMode] = useState(systemDarkMode);

  // Function to toggle between dark and light mode
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
