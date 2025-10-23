/**
 * Simple Logger Utility
 * Provides info, error, and warn logging with timestamps
 */

export const logger = {
  /**
   * Log info level message
   * @param message - Message to log
   * @param data - Optional data to log
   */
  info: (message: string, data?: any): void => {
    const timestamp = new Date().toISOString();
    if (data) {
      console.log(`[INFO] ${timestamp} - ${message}`, data);
    } else {
      console.log(`[INFO] ${timestamp} - ${message}`);
    }
  },

  /**
   * Log error level message
   * @param message - Message to log
   * @param error - Optional error object
   */
  error: (message: string, error?: any): void => {
    const timestamp = new Date().toISOString();
    if (error) {
      console.error(`[ERROR] ${timestamp} - ${message}`, error);
    } else {
      console.error(`[ERROR] ${timestamp} - ${message}`);
    }
  },

  /**
   * Log warn level message
   * @param message - Message to log
   * @param data - Optional data to log
   */
  warn: (message: string, data?: any): void => {
    const timestamp = new Date().toISOString();
    if (data) {
      console.warn(`[WARN] ${timestamp} - ${message}`, data);
    } else {
      console.warn(`[WARN] ${timestamp} - ${message}`);
    }
  },
};
