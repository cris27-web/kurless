// netlify/functions/verifyPassword.js
const bcrypt = require('bcryptjs'); // Use bcryptjs instead of bcrypt

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    try {
        const { password } = JSON.parse(event.body);

        if (!password) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Password is required.' }),
            };
        }

        const hashedPassword = process.env.UNIVERSAL_PASSWORD_HASH;

        if (!hashedPassword) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Server configuration error.' }),
            };
        }

        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (isMatch) {
            // Generate a simple token (Base64-encoded JSON)
            const token = Buffer.from(JSON.stringify({ authenticated: true, timestamp: Date.now() })).toString('base64');

            return {
                statusCode: 200,
                headers: {
                    'Set-Cookie': `auth_token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict; Secure`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: 'Authentication successful.' }),
            };
        } else {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: 'Invalid password.' }),
            };
        }
    } catch (error) {
        console.error('Error in verifyPassword function:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};
