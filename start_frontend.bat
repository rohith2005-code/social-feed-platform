@echo off
title Frontend Web Server
echo Starting Frontend Web Server on http://127.0.0.1:5500 ...
python -m http.server 5500 --bind 127.0.0.1
pause
