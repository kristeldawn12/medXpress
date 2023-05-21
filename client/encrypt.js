const crypto = require('crypto-browserify');

// Generate a random key
const key = crypto.randomBytes(16).toString('hex');

// Encrypt a message with the key
const cipher = crypto.createCipher('aes-256-cbc', key);
let encrypted = cipher.update('my secret message', 'utf8', 'hex');
encrypted += cipher.final('hex');

console.log('Encrypted message:', encrypted);
