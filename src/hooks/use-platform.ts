
'use client';

import { useState, useEffect } from 'react';

export function usePlatform() {
  const [platform, setPlatform] = useState<{ isMobile: boolean, isDesktop: boolean }>({
    isMobile: false,
    isDesktop: false,
  });

  useEffect(() => {
    // This code runs only on the client, after hydration
    const checkPlatform = () => {
      // @ts-ignore
      const tg = window.Telegram?.WebApp;
      if (tg) {
        const mobilePlatforms = ['ios', 'android'];
        if (mobilePlatforms.includes(tg.platform)) {
          setPlatform({ isMobile: true, isDesktop: false });
        } else {
          setPlatform({ isMobile: false, isDesktop: true });
        }
      } else {
        // Fallback for non-Telegram environments
        const isMobileUserAgent = /Mobi/i.test(navigator.userAgent);
        setPlatform({ isMobile: isMobileUserAgent, isDesktop: !isMobileUserAgent });
      }
    };

    checkPlatform();
  }, []);

  return platform;
}
