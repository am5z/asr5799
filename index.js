const crypto = require('crypto');

function generateKey(seed) {
  return crypto.createHash('sha256').update(seed).digest();
}

function encode(message, seed) {
  const key = generateKey(seed);
  let encoded = '';
  
  for (let i = 0; i < message.length; i++) {
    const charCode = message.charCodeAt(i);
    const keyByte = key[i % key.length];
    const shiftedChar = String.fromCharCode((charCode + keyByte) % 256);
    encoded += shiftedChar;
  }
  
  return Buffer.from(encoded.split('').reverse().join('')).toString('base64');
}

function decode(encodedMessage, seed) {
  const key = generateKey(seed);
  const reversed = Buffer.from(encodedMessage, 'base64').toString('utf-8').split('').reverse().join('');
  let decoded = '';
  
  for (let i = 0; i < reversed.length; i++) {
    const charCode = reversed.charCodeAt(i);
    const keyByte = key[i % key.length];
    const shiftedChar = String.fromCharCode((charCode - keyByte + 256) % 256);
    decoded += shiftedChar;
  }
  
  return decoded;
}

// this is an example
const message = "M. Brown";
const seed = "5799";

const encoded = encode(message, seed);
console.log("Encoded:", encoded);

const decoded = decode(encoded, seed);
console.log("Decoded:", decoded);
