@echo off
echo Stopping albania-travel (ports 3465 and 4328)...
for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":4328" ^| findstr "LISTENING"') do taskkill /PID %%p /F >nul 2>&1
for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":3465" ^| findstr "LISTENING"') do taskkill /PID %%p /F >nul 2>&1
echo Done.
pause
