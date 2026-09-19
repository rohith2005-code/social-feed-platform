# Social Feed Platform - Full Stack Project

This folder contains the complete full-stack **Social Feed Platform** application with a Django REST Framework backend and Vanilla JS/HTML5 frontend.

## Folder Location
```
c:\Users\USER\OneDrive\Attachments\New folder\social-feed-platform
```

---

## How to Open in VS Code

### Option 1: From VS Code
1. Open **VS Code**.
2. Click **File** -> **Open Folder...** (or press `Ctrl + K, Ctrl + O`).
3. Select this folder:
   `c:\Users\USER\OneDrive\Attachments\New folder\social-feed-platform`

### Option 2: From Terminal / Command Prompt
Run:
```cmd
code "c:\Users\USER\OneDrive\Attachments\New folder\social-feed-platform"
```

---

## How to Run

### Method 1: Double-Click (Easiest)
Simply double-click **`start_all.bat`**. It will:
1. Start the Django backend at `http://127.0.0.1:8000`
2. Start the Frontend server at `http://127.0.0.1:5500`
3. Automatically open `http://127.0.0.1:5500/login.html` in your browser.

### Method 2: From VS Code Tasks
1. Press `Ctrl + Shift + B` (Run Default Build Task).
2. VS Code will run both backend and frontend servers automatically in the integrated terminal.

### Method 3: Manual Terminal Commands
- **Backend**:
  ```cmd
  python manage.py runserver 127.0.0.1:8000
  ```
- **Frontend**:
  ```cmd
  python -m http.server 5500 --bind 127.0.0.1
  ```

---

## Pre-configured Admin Credentials
- **Username**: `admin`
- **Password**: `admin123`
- **Django Admin URL**: [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

You can also register new user accounts directly on the frontend at [http://127.0.0.1:5500/register.html](http://127.0.0.1:5500/register.html).

---

## Project Structure
```text
social-feed-platform/
├── .vscode/
│   └── tasks.json            <- VS Code run configuration
├── api/                      <- Django REST API app
│   ├── models.py             <- Post & Like models
│   ├── serializers.py        <- Serializers with auth validation
│   ├── views.py              <- API endpoints (Register, Login, Posts, Likes)
│   ├── urls.py               <- API routing
│   └── tests.py              <- Unit & integration tests
├── backend/                  <- Django project settings & root URLs
│   ├── settings.py           <- CORS, DRF, database configuration
│   └── urls.py               <- Admin, root redirect, API routing
├── css/                      <- Frontend stylesheets
├── js/                       <- Frontend scripts
│   └── services/api.js       <- Live fetch calls to backend
├── feed.html                 <- Main feed page
├── login.html                <- Login page
├── register.html             <- Registration page
├── profile.html              <- User profile page
├── db.sqlite3                <- SQLite database with migrations
├── manage.py                 <- Django management CLI
├── requirements.txt          <- Python package dependencies
├── start_all.bat             <- 1-click launcher for all servers
├── start_backend.bat         <- Backend launcher
└── start_frontend.bat        <- Frontend launcher
```
