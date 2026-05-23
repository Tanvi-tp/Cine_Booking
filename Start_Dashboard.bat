@echo off
echo Starting Cine DB Dashboard...

:: Add Node.js to PATH temporarily for this session (just in case)
set PATH=%PATH%;C:\Program Files\nodejs

:: Navigate to the Vite project folder
cd /d "%~dp0\frms-app"

:: Start the Vite server
echo Launching React Server...
start npm run dev

:: Wait 3 seconds for server to start, then open the browser
timeout /t 3 /nobreak >nul
start http://localhost:5174

echo Dashboard should now be open in your browser!
echo (Keep this window open while using the dashboard. Close it to stop the server)
pause
