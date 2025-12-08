import { ScanRecord, UserProfile } from '../types';

const KEYS = {
  PROFILE: 'nutriguard_profile',
  HISTORY: 'nutriguard_history',
};

export const getProfile = (): UserProfile | null => {
  const data = localStorage.getItem(KEYS.PROFILE);
  return data ? JSON.parse(data) : null;
};

export const saveProfile = (profile: UserProfile): void => {
  localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
};

export const getHistory = (): ScanRecord[] => {
  const data = localStorage.getItem(KEYS.HISTORY);
  return data ? JSON.parse(data) : [];
};

export const saveScan = (record: ScanRecord): void => {
  const history = getHistory();
  // Keep last 20 scans
  const newHistory = [record, ...history].slice(0, 20);
  localStorage.setItem(KEYS.HISTORY, JSON.stringify(newHistory));
};

export const clearData = (): void => {
  localStorage.removeItem(KEYS.PROFILE);
  localStorage.removeItem(KEYS.HISTORY);
};

// Initial state creator
export const createInitialProfile = (): UserProfile => ({
  id: crypto.randomUUID(),
  name: 'User',
  conditions: [],
  onboarded: false,
  language: 'zh', // Default to Chinese as requested
});