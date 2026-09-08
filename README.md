# ELRICS Social Microblogging Platform - Frontend Starter

Welcome to the **ELRICS Social Microblogging Platform** technical assessment frontend repository. This project provides the frontend for a modern, consumer-facing social platform and is designed to evaluate a candidate's backend engineering, API design, and full-stack integration skills.

## Project Overview

This repository contains the complete frontend UI for a Microblogging Platform (similar to Twitter/X). It has been built using HTML5, CSS3, and Vanilla JavaScript (ES6 Modules) without any frameworks or build tools to ensure maximum compatibility and simplicity.

The frontend is fully designed with a modern, sleek aesthetic, dark mode support, glassmorphism, and micro-animations. It includes layout, styling, and common frontend interactions such as form validation, modals, loading indicators, toast notifications, and interactive feed elements (like/unlike).

However, **there is no backend implementation.**

**Your task as a candidate is to build your own backend and integrate it with the provided frontend.**

---

## Time Available

**40 Minutes**

The implementation time is limited to **40 minutes**.

The technical discussion and oral evaluation will be conducted separately after the implementation has been completed.

---

## Folder Structure

```text
social-feed-platform/
├── README.md
├── .gitignore
├── login.html
├── register.html
├── feed.html
├── profile.html
├── css/
│   ├── styles.css
│   ├── layout.css
│   ├── components.css
│   └── responsive.css
└── js/
    ├── app.js
    ├── services/
    │   └── api.js
    ├── pages/
    │   ├── login.js
    │   ├── register.js
    │   ├── feed.js
    │   └── profile.js
    ├── components/
    │   ├── modal.js
    │   ├── toast.js
    │   └── loader.js
    └── utils/
        ├── helpers.js
        └── validation.js
```

---

## Setup Instructions

Since this is a static frontend project, there are no dependencies to install.

1. Clone or download this repository.
2. Open the project directory.
3. Serve the project using a static web server.

Examples:

- VS Code Live Server
- Python HTTP Server

Example:

```bash
python -m http.server 8000
```

Then open the application in your browser.

---

## Running the Application

The frontend and backend run independently.

Example:

Frontend

```
http://127.0.0.1:5500
```

Backend

```
http://127.0.0.1:8000
```

You are responsible for configuring your frontend so it communicates with your backend implementation.

Any backend configuration required for successful communication (like CORS) is part of the assessment.

---

## Business Requirements

The company requires a robust backend to support a Social Microblogging application.

Users should be able to:

1. Register a new user account (Username, Email, Password).
2. Log in to the system to get a session/token.
3. View a global feed of posts from all users, sorted by most recent.
4. Create a new text-based post.
5. "Like" and "Unlike" posts.
6. View a user profile page that shows only posts made by that user.

The application should:

- Display loading indicators during data retrieval.
- Display meaningful success and error notifications.
- Handle unexpected failures gracefully.
- Store user and post information persistently.
- Allow only authenticated users to post or like.
- Follow good software engineering practices.

---

## Technical Requirements

### Backend

- Python
- Django
- Django REST Framework

### Database

- SQLite or PostgreSQL

### Frontend

- Use the provided frontend without redesigning it.
- Maintain the existing project structure.

### API Integration

- Implement backend communication primarily inside `js/services/api.js`.
- Other frontend files may be modified only when absolutely necessary (e.g., wiring up the API response to the DOM rendering logic).

---

## Submission Guidelines

1. Build the backend using **Python, Django, and Django REST Framework**.
2. Integrate your backend with the provided frontend.
3. Maintain the existing frontend architecture and project structure.

---

## Deliverables

Submit:

- Complete source code.
- README containing backend setup instructions.
- Database migration files.
- `.env.example` (if environment variables are used).

---

## Assumptions

You may make reasonable assumptions where requirements are not explicitly defined.

Any assumptions made should be documented in your README.

---

## General Rules & Expectations

- Do not modify the overall UI/UX design.
- You may make minor improvements if necessary, but the overall appearance must remain consistent.
- Complete the application according to the business requirements.
- Ensure data is stored reliably.
- Implement appropriate authentication and authorization.
- Follow clean RESTful API design principles.
- Write maintainable, readable, and well-structured code.
- Implement appropriate validation and error handling.

---

## External Resources

You may use:

- Official documentation
- Search engines
- AI coding assistants
- Personal notes

However, you must be able to explain every technical decision during the technical discussion.

---

## Evaluation Criteria

Your submission will be evaluated based on:

- Code quality & Project structure
- Problem-solving ability
- Backend API design & implementation
- Frontend integration
- Authentication & Authorization
- Data validation & Error handling
- Database modeling
- Ability to explain technical decisions

---

**Best of luck!**
