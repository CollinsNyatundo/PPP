import { supabase } from '../supabase';

export const sync = {
  async validateConnection() {
    try {
      const { error } = await supabase.from('projects').select('count');
      return !error;
    } catch {
      return false;
    }
  },

  async getLastSyncTimestamp() {
    const timestamp = localStorage.getItem('lastSync');
    return timestamp ? new Date(timestamp) : null;
  },

  async setLastSyncTimestamp() {
    localStorage.setItem('lastSync', new Date().toISOString());
  },

  async clearSyncData() {
    localStorage.removeItem('lastSync');
  },
};