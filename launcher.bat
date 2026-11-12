@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title AeroLens Launcher
cd /d "%~dp0"

REM ============================================================
REM  AeroLens Launcher
REM  - Manual run (double-click): register protocol + start server + open login page
REM  - Protocol trigger (aerolens://start): register protocol + start server only
REM ============================================================

REM Register custom protocol on first run
reg query "HKCU\Software\Classes\aerolens\shell\open\command" >nul 2>nul
if errorlevel 1 (
  echo [AeroLens] Registering aerolens:// protocol...
  set "LAUNCHER=%~dp0launcher.bat"
  reg add "HKCU\Software\Classes\aerolens" /ve /d "URL:AeroLens Launcher" /f >nul
  reg add "HKCU\Software\Classes\aerolens" /v "URL Protocol" /d "" /f >nul
  reg add "HKCU\Software\Classes\aerolens\shell\open\command" /ve /d "\"!LAUNCHER!\" \"%1\"" /f >nul
  echo [AeroLens] Protocol registered. You can now trigger it from the browser.
)

REM Check if port 8765 is already listening
netstat -ano | findstr ":8765" | findstr "LISTENING" >nul
if %errorlevel%==0 (
  echo [AeroLens] Server already running.
  if "%~1"=="" goto openBrowser
  exit /b 0
)

REM Start local server (static + AI poem proxy) in a minimized window
echo [AeroLens] Starting local server on port 8765...
start "AeroLens Server" /min python server.py 8765

REM Wait for server to be ready
timeout /t 2 /nobreak >nul

REM If triggered by protocol (has argument), don't open browser
if not "%~1"=="" exit /b 0

:openBrowser
start "" "http://localhost:8765/login.html"
echo [AeroLens] Opened login page in browser.
echo [AeroLens] You can close this window. The server keeps running.
endlocal
exit /b 0
