// netlify/functions/verifyPassword.js
const bcrypt = require('bcrypt');

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
            // Generate a simple JWT or any token. For simplicity, we'll use a timestamp token.
            // For production, consider using a proper JWT library.
            const token = btoa(JSON.stringify({ authenticated: true, timestamp: Date.now() }));

            return {
                statusCode: 200,
                headers: {
                    'Set-Cookie': `auth_token=${token}; HttpOnly; Path=/; Max-Age=3600`,
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
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};
