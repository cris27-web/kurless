@echo off
echo Adding changes to staging...
git add .

echo Enter your commit message:
set /p commitMessage=

git commit -m "%commitMessage%"
git push origin main

echo.
echo Commit and push completed!
pause
