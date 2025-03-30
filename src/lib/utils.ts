const adjectives = [
  'Happy', 'Lucky', 'Clever', 'Brave', 'Swift', 'Wild', 'Calm', 'Bold',
  'Bright', 'Cool', 'Daring', 'Eager', 'Fierce', 'Gentle', 'Jolly', 'Kind'
];

const nouns = [
  'Panda', 'Dragon', 'Eagle', 'Lion', 'Tiger', 'Bear', 'Wolf', 'Fox',
  'Hawk', 'Deer', 'Hawk', 'Owl', 'Hawk', 'Hawk', 'Hawk', 'Hawk'
];

export function generateRandomUsername(): string {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 1000);
  return `${adjective}${noun}${number}`;
} 