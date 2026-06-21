/**
 * useNetworkStatus hook for tracking browser online/offline state.
 *
 * Returns a boolean that reflects navigator.onLine and updates
 * automatically when connectivity changes. Useful for showing
 * offline banners or disabling network-dependent actions.
 *
 * @module useNetworkStatus
 */
import { useEffect, useState } from 'react';

/**
 * Returns true when the browser reports an active network connection.
 * Defaults to true in SSR environments.
 *
 * @returns {boolean} Whether the browser is online.
 */
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline  = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online',  handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online',  handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

export default useNetworkStatus;
