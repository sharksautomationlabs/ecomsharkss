/**
 * Rate limiting utility for +1 phone numbers
 * Limits +1 numbers to 2 submissions per day
 */

interface SubmissionRecord {
  phone: string;
  timestamp: number;
  date: string; // YYYY-MM-DD format
}

const STORAGE_KEY = 'phone_submissions';
const MAX_SUBMISSIONS_PER_DAY = 2;

/**
 * Get today's date in YYYY-MM-DD format
 */
const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

/**
 * Clean up old submissions (older than today)
 */
const cleanOldSubmissions = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    
    const submissions: SubmissionRecord[] = JSON.parse(stored);
    const today = getTodayDate();
    
    // Filter out submissions from previous days
    const todaySubmissions = submissions.filter(
      (record) => record.date === today
    );
    
    // Save only today's submissions
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todaySubmissions));
  } catch (error) {
    console.error('Error cleaning old submissions:', error);
    // Clear storage on error
    localStorage.removeItem(STORAGE_KEY);
  }
};

/**
 * Check if a +1 phone number can submit (hasn't exceeded daily limit)
 * @param phoneNumber - Full phone number with country code (e.g., +14694807938)
 * @returns Object with allowed status and reason if not allowed
 */
export const checkPhoneRateLimit = (
  phoneNumber: string
): { allowed: boolean; reason?: string; count?: number } => {
  // Only apply rate limiting to +1 numbers
  if (!phoneNumber || !phoneNumber.startsWith('+1')) {
    return { allowed: true };
  }

  if (typeof window === 'undefined') {
    return { allowed: true };
  }

  try {
    // Clean up old submissions first
    cleanOldSubmissions();

    // Get existing submissions
    const stored = localStorage.getItem(STORAGE_KEY);
    const today = getTodayDate();
    const now = Date.now();

    let submissions: SubmissionRecord[] = stored
      ? JSON.parse(stored)
      : [];

    // Filter to only today's submissions for this phone number
    const phoneSubmissionsToday = submissions.filter(
      (record) =>
        record.phone === phoneNumber && record.date === today
    );

    // Check if limit exceeded
    if (phoneSubmissionsToday.length >= MAX_SUBMISSIONS_PER_DAY) {
      return {
        allowed: false,
        reason: `You have reached the daily submission limit of ${MAX_SUBMISSIONS_PER_DAY} submissions. Please try again tomorrow.`,
        count: phoneSubmissionsToday.length,
      };
    }

    return {
      allowed: true,
      count: phoneSubmissionsToday.length,
    };
  } catch (error) {
    console.error('Error checking phone rate limit:', error);
    // Allow submission on error to avoid blocking legitimate users
    return { allowed: true };
  }
};

/**
 * Record a phone number submission
 * @param phoneNumber - Full phone number with country code (e.g., +14694807938)
 */
export const recordPhoneSubmission = (phoneNumber: string): void => {
  // Only track +1 numbers
  if (!phoneNumber || !phoneNumber.startsWith('+1')) {
    return;
  }

  if (typeof window === 'undefined') {
    return;
  }

  try {
    // Clean up old submissions first
    cleanOldSubmissions();

    // Get existing submissions
    const stored = localStorage.getItem(STORAGE_KEY);
    const today = getTodayDate();
    const now = Date.now();

    let submissions: SubmissionRecord[] = stored
      ? JSON.parse(stored)
      : [];

    // Add new submission
    const newRecord: SubmissionRecord = {
      phone: phoneNumber,
      timestamp: now,
      date: today,
    };

    submissions.push(newRecord);

    // Save back to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  } catch (error) {
    console.error('Error recording phone submission:', error);
  }
};

/**
 * Get submission count for a phone number today
 * @param phoneNumber - Full phone number with country code
 * @returns Number of submissions today
 */
export const getPhoneSubmissionCount = (phoneNumber: string): number => {
  if (!phoneNumber || !phoneNumber.startsWith('+1')) {
    return 0;
  }

  if (typeof window === 'undefined') {
    return 0;
  }

  try {
    cleanOldSubmissions();

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return 0;

    const submissions: SubmissionRecord[] = JSON.parse(stored);
    const today = getTodayDate();

    return submissions.filter(
      (record) => record.phone === phoneNumber && record.date === today
    ).length;
  } catch (error) {
    console.error('Error getting phone submission count:', error);
    return 0;
  }
};

