export function getDeviceEmoji(): string {
  if (typeof window === 'undefined') return '💻';
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  
  if (/mobile/i.test(userAgent)) {
    if (/iphone|ipad|ipod/i.test(userAgent)) {
      return '📱';
    }
    return '📱';
  }
  
  if (/tablet/i.test(userAgent)) {
    return '📱';
  }
  
  return '💻';
} 