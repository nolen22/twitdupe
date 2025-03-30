interface EmojiSet {
  search: string;
  home: string;
  explore: string;
  notifications: string;
  messages: string;
  profile: string;
  bookmark: string;
  settings: string;
  logout: string;
  like: string;
  repost: string;
  reply: string;
  share: string;
  menu: string;
}

const defaultEmojis: EmojiSet = {
  search: '🔍',
  home: '🏠',
  explore: '🔎',
  notifications: '🔔',
  messages: '💬',
  profile: '👤',
  bookmark: '🔖',
  settings: '⚙️',
  logout: '🚪',
  like: '❤️',
  repost: '🔄',
  reply: '💬',
  share: '📤',
  menu: '☰',
};

export function getDeviceEmojis(): EmojiSet {
  if (typeof window === 'undefined') return defaultEmojis;

  const ua = window.navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua);
  const isAndroid = /Android/.test(ua);
  const isChrome = /Chrome/.test(ua);
  const isFirefox = /Firefox/.test(ua);
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  const isWindows = /Windows/.test(ua);
  const isMac = /Macintosh/.test(ua);

  // For now, we'll use the same emoji set for all platforms
  // In the future, we can customize emojis for each platform
  return defaultEmojis;
} 