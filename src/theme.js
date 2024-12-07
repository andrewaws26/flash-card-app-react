// src/theme.js

export const lightTheme = {
  primary: '#ffffff',
  secondary: '#6366f1',
  background: '#f0f4f8', // Slightly lighter for better contrast
  text: '#1e293b',
  textSecondary: '#4b5563', // Added for secondary text
  accent: '#4f46e5',
  accentLight: '#c7d2fe', // Lightened version of accent for highlighting matches
  surface: '#ffffff',
  backgroundSecondary: '#f3f4f6', // Added for Adverse Reactions background
  error: '#ef4444',
  success: '#22c55e',
  border: '#e2e8f0',
  shadow: '0 2px 4px rgba(0, 0, 0, 0.1)',       // Reduced shadow
  hoverShadow: '0 4px 6px rgba(0, 0, 0, 0.15)', // Reduced shadow
  hover: '#f1f5f9', // Light gray for hover backgrounds
  highlightedBackground: '#d0eaff', // New property for highlighted suggestions
  highlightedText: '#1e293b', // Text color when highlighted
  swipeRight: '#22c55e',
  swipeLeft: '#ef4444',
  buttonHover: '#e2e8f0',
};

export const darkTheme = {
  primary: '#1e293b',
  secondary: '#818cf8',
  background: '#0f172a',
  text: '#f8fafc',
  textSecondary: '#a1a1aa', // Added for secondary text
  accent: '#6366f1',
  accentLight: '#8b95fa', // Lightened version of accent for highlighting matches
  surface: '#1f2937',
  backgroundSecondary: '#334155', // Added for Adverse Reactions background
  error: '#f87171',
  success: '#4ade80',
  border: '#334155',
  shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
  hoverShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
  hover: '#374151', // Darker gray for hover backgrounds
  highlightedBackground: '#3b82f6', // New property for highlighted suggestions
  highlightedText: '#ffffff', // Text color when highlighted
  swipeRight: '#4ade80',
  swipeLeft: '#f87171',
  buttonHover: '#4b5563',
};
