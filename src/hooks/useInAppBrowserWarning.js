import { useEffect } from 'react';
import toast from 'react-hot-toast';

export function useInAppBrowserWarning() {
  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const inAppKeywords = ['Instagram', 'FBAN', 'FBAV', 'Messenger', 'TikTok', 'Twitter', 'LinkedIn', 'WhatsApp'];

    if (inAppKeywords.some((keyword) => ua.includes(keyword))) {
      toast.error('You are opening this page from an in-app browser. Please open it in Chrome or another browser to enable downloading.', { duration: 6000 });
    }
  }, []);
}
