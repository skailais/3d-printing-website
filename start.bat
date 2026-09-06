@echo off
REM Runs CaliPrint on this machine as a server.
REM Port 4000 (Layer Zero already uses 3000), reachable from the local network.

cd /d "%~dp0"
title CaliPrint server

if not exist ".env.local" (
  echo.
  echo   No .env.local found — the control page will stay locked.
  echo   Run this once first:
  echo.
  echo     npm run setup:admin -- "your chosen password"
  echo.
  pause
)

if not exist "node_modules" (
  echo Installing dependencies...
  call npm install || goto :failed
)

echo Building...
call npm run build || goto :failed

echo.
echo   CaliPrint is running.
echo     On this machine   http://localhost:4000
echo     On the network    http://%COMPUTERNAME%:4000
echo     Control page      http://localhost:4000/master
echo.
echo   Quote requests and their files are written to the data\ folder.
echo   Close this window to stop the server.
echo.

call npm run start
goto :eof

:failed
echo.
echo   Something went wrong above. The server did not start.
pause
