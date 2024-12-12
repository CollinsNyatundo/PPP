import { useEffect } from 'react';
import { supabase } from '../supabase';
import { toast } from 'react-toastify';

interface SyncOptions {
  onError?: (error: Error) => void;
  onReconnect?: () => void;
  retryAttempts?: number;
  retryDelay?: number;
}

export function useRealtimeSync(options: SyncOptions = {}) {
  const {
    onError = (error) => toast.error(error.message),
    onReconnect = () => toast.success('Reconnected to server'),
    retryAttempts = 3,
    retryDelay = 1000,
  } = options;

  useEffect(() => {
    let retryCount = 0;
    let reconnectTimeout: NodeJS.Timeout;

    const handleConnectionError = async () => {
      if (retryCount < retryAttempts) {
        retryCount++;
        reconnectTimeout = setTimeout(async () => {
          try {
            await supabase.channel('system').subscribe();
            onReconnect();
            retryCount = 0;
          } catch (error) {
            handleConnectionError();
          }
        }, retryDelay * retryCount);
      } else {
        onError(new Error('Failed to connect after multiple attempts'));
      }
    };

    const subscription = supabase
      .channel('system')
      .on('system', { event: '*' }, (payload) => {
        console.debug('System event:', payload);
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.debug('Connected to real-time updates');
        } else if (status === 'CLOSED') {
          handleConnectionError();
        }
      });

    return () => {
      clearTimeout(reconnectTimeout);
      subscription.unsubscribe();
    };
  }, [onError, onReconnect, retryAttempts, retryDelay]);
}