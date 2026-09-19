@echo off
title Social Feed Platform - Launch All
echo ==============================================
echo   Launching Backend and Frontend Servers...
echo ==============================================

start "Django Backend Server (Port 8000)" cmd /k "python manage.py runserver 127.0.0.1:8000"
start "Frontend Web Server (Port 5500)" cmd /k "python -m http.server 5500 --bind 127.0.0.1"

echo.
echo Waiting for servers to initialize...
timeout /t 3 >nul

echo Opening browser at http://127.0.0.1:5500/login.html ...
start http://127.0.0.1:5500/login.html

echo.
echo [Done] Both servers are running!
echo Backend:  http://127.0.0.1:8000/
echo Admin:    http://127.0.0.1:8000/admin/ (admin / admin123)
echo Frontend: http://127.0.0.1:5500/login.html
echo.
