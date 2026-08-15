import { useEffect } from 'react';

interface AnalyticsTrackerProps {
  currentPath: string;
}

export default function AnalyticsTracker({ currentPath }: AnalyticsTrackerProps) {
  useEffect(() => {
    const logView = async () => {
      try {
        const isNewVisitor = !sessionStorage.getItem('session_active');
        if (isNewVisitor) {
          sessionStorage.setItem('session_active', 'true');
        }

        // Target endpoint on Express backend
        await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: currentPath || '/',
            isNewVisitor,
          }),
        });
      } catch (e) {
        console.warn('Analytics dispatch skipped:', e);
      }
    };

    logView();
  }, [currentPath]);

  return null;
}
