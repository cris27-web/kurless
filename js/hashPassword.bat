@echo off
set /p password=Enter your desired password: 

:: Write the password to a temporary file
echo const bcrypt = require('bcrypt'); > hashPassword.js
echo const password = "%password%"; >> hashPassword.js
echo const saltRounds = 10; >> hashPassword.js
echo bcrypt.hash(password, saltRounds, function(err, hash) { >> hashPassword.js
echo     if (err) { >> hashPassword.js
echo         console.error(err); >> hashPassword.js
echo         return; >> hashPassword.js
echo     } >> hashPassword.js
echo     console.log(`Hashed Password: ${hash}`); >> hashPassword.js
echo }); >> hashPassword.js

:: Run the temporary file with Node.js
node hashPassword.js

:: Clean up the temporary file
del hashPassword.js

pause
