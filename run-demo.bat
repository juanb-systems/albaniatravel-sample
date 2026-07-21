@echo off
setlocal
cd /d "%~dp0"
echo albania-travel demo launcher
if not exist "web\node_modules" ( pushd web & call npm install & popd )
echo Starting website on http://localhost:4328 ...
start "albania-travel Website" cmd /k "cd /d "%~dp0web" && npm run dev"
timeout /t 6 /nobreak >nul
start "" "http://localhost:4328"
echo.
echo Website: http://localhost:4328
echo (The CMS is only needed at handoff: see RUNNING.md)
pause
