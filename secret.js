





const crypto = require('crypto');

function generateSecretKey(length) {
    return crypto.randomBytes(length).toString('hex');
}

const secretKey = generateSecretKey(32); // Generate a 256-bit (32-byte) key
console.log(secretKey);
