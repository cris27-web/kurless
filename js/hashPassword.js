// hashPassword.js
const bcrypt = require('bcrypt');

const password = 'YourSecurePasswordHere'; // Replace with your desired password
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Hashed Password: ${hash}`);
});
