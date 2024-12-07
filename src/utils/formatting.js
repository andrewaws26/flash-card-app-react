// src/utils/formatting.js

const exceptions = [
    "IVORY",
    "ZITUVIMET",
    // Add more exceptions as needed
  ];
  
  /**
   * Converts a string to title case, preserving exceptions.
   * @param {string} str - The string to format.
   * @returns {string} - The formatted string.
   */
  export function toTitleCase(str) {
    return str.replace(/\w\S*/g, (txt) => {
      if (exceptions.includes(txt.toUpperCase())) {
        return txt.toUpperCase();
      }
      if (txt.length > 1 && txt === txt.toUpperCase()) {
        return txt; // Preserve acronyms
      }
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  