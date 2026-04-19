# SharePlate - Full Project Documentation

This README is written as a report-ready reference for the SharePlate project.
It explains:

- what the project does
- all implemented features
- technologies used and why
- backend and frontend architecture
- folder structure and file-by-file responsibilities
- API endpoint details
- setup and run instructions

## 1. Project Overview

SharePlate is a full-stack food-sharing platform where users can:

- register and log in
- post available surplus food
- browse and claim food posts
- earn and view points through a leaderboard
- view profile data including posted and claimed items

The project uses a React frontend and Node.js/Express backend with MongoDB.

## 2. Core Features Implemented

### 2.1 Authentication and Authorization

- User registration with name, email, password, role
- Optional verification document upload during registration
- Secure password hashing with bcrypt
- JWT token generation on login
- Protected frontend routes using auth context + route guard
- Protected backend endpoints via JWT middleware

### 2.2 Food Post Management

- Create food posts with title, location, pickup time, phone, description, image
- View all food posts in reverse chronological order
- View a single post detail page
- Upload food images via multipart form-data
- Serve uploaded images through static backend route

### 2.3 Claiming and Sharing Flow

- Claim unclaimed food post
- Prevent self-claim (user cannot claim own post)
- Prevent duplicate claim if already claimed
- Atomic claim update using query condition claimedBy: null
- Donor points increment (+10) on successful claim

### 2.4 User Profile and Leaderboard

- Profile endpoint returns:
  - current user basic info
  - posts created by current user
  - posts claimed by current user
- Leaderboard endpoint ranks users by points (desc), name (asc)
- Frontend leaderboard highlights current user row

### 2.5 UX and Interface Features

- Global toast notification system (success and error)
- Protected route redirection to login with return path
- Dynamic image fallback when no post image exists
- Map button opens Google Maps search for post location
- Font Awesome icon-based UI
- Dedicated static pages: About, Contact, Terms

## 3. Technology Stack

## 3.1 Frontend Technologies

- React 19: component-based UI and state management
- React Router DOM: client-side routing and route protection
- Axios: API requests and request interceptor for auth token
- Vite: dev server and production build tool
- CSS (modular by page/component): styling and responsive layouts
- Font Awesome CDN: iconography

## 3.2 Backend Technologies

- Node.js: server runtime
- Express 5: REST API framework and middleware handling
- Mongoose: MongoDB schema modeling and DB access
- JWT (jsonwebtoken): stateless authentication tokens
- bcryptjs: password hashing
- multer: multipart file upload handling
- cors: cross-origin access for frontend/backend communication
- dotenv: environment variable management
- nodemon (dev): auto-restart during development

## 3.3 Database

- MongoDB for persistent storage
- Collections used:
  - users
  - foods

## 4. High-Level Architecture

1. User interacts with React pages.
2. Frontend sends HTTP requests using Axios instance.
3. Axios interceptor injects token from localStorage when available.
4. Express routes forward to controllers.
5. Controllers apply business rules and perform Mongoose DB operations.
6. JWT middleware protects selected routes and injects req.user.
7. Multer stores uploads in backend/uploads.
8. Frontend renders API results and user feedback via toast notifications.

## 5. Folder Structure (Workspace Level)

```text
Finalshareplate/
  backend/
    package.json
    server.js
    config/
      multer.js
    controllers/
      authController.js
      foodController.js
      userController.js
    middleware/
      authMiddleware.js
    models/
      Food.js
      User.js
    routes/
      authRoutes.js
      foodRoutes.js
      userRoutes.js
    uploads/
      <uploaded files>

  frontend/
    package.json
    index.html
    vite.config.js
    eslint.config.js
    src/
      main.jsx
      App.jsx
      services/
        api.js
      context/
        AuthContext.jsx
        ToastContext.jsx
      components/
        Navbar.jsx
        Footer.jsx
        ProtectedRoute.jsx
      pages/
        Home.jsx
        LoginPage.jsx
        RegisterPage.jsx
        Dashboard.jsx
        Post.jsx
        PostDetailsPage.jsx
        LeaderboardPage.jsx
        Profile.jsx
        AboutPage.jsx
        ContactPage.jsx
        TermsPage.jsx
        Login.jsx
        Register.jsx
        About.jsx
        Contact.jsx
        Terms.jsx
        Leaderboard.jsx
        PostDetails.jsx
      styles/
        <page/component specific css files>
```

## 6. Backend: File-by-File Responsibility

### 6.1 Entry and Configuration

- backend/server.js
  - creates Express app
  - enables CORS and JSON parsing
  - serves /uploads static files
  - mounts auth/food/user routes
  - connects MongoDB with MONGO_URI
  - starts server on PORT (default 5000)

- backend/config/multer.js
  - configures disk storage for uploads/
  - generates file name as timestamp-originalname

### 6.2 Data Models

- backend/models/User.js
  - fields: name, email, password, role, verified, verificationDocument, points
  - role enum: general | donor | receiver
  - timestamps enabled

- backend/models/Food.js
  - fields: title, description, location, pickupTime, phoneNumber, image
  - relations: donor (User ref), claimedBy (User ref)
  - timestamps enabled

### 6.3 Middleware

- backend/middleware/authMiddleware.js
  - reads Authorization header
  - supports Bearer token format and raw token format
  - verifies JWT with JWT_SECRET
  - sets req.user to decoded user id

### 6.4 Controllers

- backend/controllers/authController.js
  - register:
    - validates required fields
    - checks duplicate email
    - hashes password
    - sets verified true when document uploaded
    - returns sanitized user object
  - login:
    - verifies credentials
    - returns token + sanitized user

- backend/controllers/foodController.js
  - createFood:
    - validates required fields
    - creates post with donor=req.user and optional image
  - getFoods:
    - returns all posts sorted newest first
  - getFoodById:
    - returns one post by id
  - claimFood:
    - blocks self-claim
    - blocks already-claimed posts
    - performs conditional claim update
    - awards donor +10 points

- backend/controllers/userController.js
  - getLeaderboard:
    - lists users sorted by points desc then name asc
  - getProfile:
    - returns current user + their posts + their claimed foods

### 6.5 Routes

- backend/routes/authRoutes.js
  - POST /register (with document upload)
  - POST /login

- backend/routes/foodRoutes.js
  - POST / (auth, with image upload)
  - GET /
  - GET /:id
  - POST /claim/:id (auth)

- backend/routes/userRoutes.js
  - GET /leaderboard
  - GET /me (auth)

## 7. Frontend: File-by-File Responsibility

### 7.1 App Bootstrap and Routing

- frontend/src/main.jsx
  - wraps app with ToastProvider and AuthProvider

- frontend/src/App.jsx
  - defines route map
  - public routes: home, login, register, about, contact, terms
  - protected routes: dashboard, post, post details, leaderboard, profile

### 7.2 Services and Context

- frontend/src/services/api.js
  - Axios instance with base URL from VITE_API_URL or localhost fallback
  - request interceptor attaches localStorage token in Authorization header
  - exports uploads URL and fallback SVG image constant

- frontend/src/context/AuthContext.jsx
  - global auth state: token, user, isAuthenticated
  - actions: login, logout, updateUser
  - localStorage persistence for token and user

- frontend/src/context/ToastContext.jsx
  - global toast system with showToast and dismissToast
  - auto-dismiss after 3.5 seconds

### 7.3 Shared Components

- frontend/src/components/ProtectedRoute.jsx
  - redirects unauthenticated users to /login

- frontend/src/components/Navbar.jsx
  - authenticated navigation and logout

- frontend/src/components/Footer.jsx
  - static footer links and social section

### 7.4 Pages (Active Route Targets)

- frontend/src/pages/Home.jsx
  - landing page, hero video, process flow, impact stats

- frontend/src/pages/LoginPage.jsx
  - login form, toggled password view, redirect to protected route target

- frontend/src/pages/RegisterPage.jsx
  - registration form, role selection, password confirmation
  - terms acceptance gate
  - optional verification document upload

- frontend/src/pages/Dashboard.jsx
  - fetches all food posts
  - claim action and map action
  - displays claimed status and verified donor badge

- frontend/src/pages/Post.jsx
  - create post form with image upload

- frontend/src/pages/PostDetailsPage.jsx
  - single post view by route param id
  - claim post and open map location

- frontend/src/pages/Profile.jsx
  - fetches and displays profile data
  - shows user posts and claimed posts
  - logout action

- frontend/src/pages/LeaderboardPage.jsx
  - fetches leaderboard and shows rank table

- frontend/src/pages/AboutPage.jsx
  - static about content

- frontend/src/pages/ContactPage.jsx
  - static contact content + static message form UI

- frontend/src/pages/TermsPage.jsx
  - static terms and legal disclaimers

### 7.5 Wrapper/Legacy Files in Pages

- frontend/src/pages/Login.jsx
  - re-export wrapper for LoginPage

- frontend/src/pages/Register.jsx
  - re-export wrapper for RegisterPage

- frontend/src/pages/About.jsx, Contact.jsx, Terms.jsx
  - older duplicate static versions not used by router

- frontend/src/pages/Leaderboard.jsx
  - legacy static mock leaderboard (not used by router)

- frontend/src/pages/PostDetails.jsx
  - legacy static post details mock (not used by router)

### 7.6 Styles

- frontend/src/styles/
  - contains CSS files for each page and shared components
  - naming generally follows page/component pattern
  - supports visual separation and maintainability

## 8. API Documentation (Report-Friendly)

Base API URL:

- http://localhost:5000/api (default)

### 8.1 Auth Endpoints

1. POST /api/auth/register
   - auth required: no
   - content type: multipart/form-data
   - fields: name, email, password, role, optional document file
   - response: message + sanitized user object

2. POST /api/auth/login
   - auth required: no
   - body: email, password
   - response: token + sanitized user

### 8.2 Food Endpoints

1. POST /api/food
   - auth required: yes
   - content type: multipart/form-data
   - fields: title, location, pickupTime, phoneNumber, optional description, optional image
   - response: created food object

2. GET /api/food
   - auth required: no
   - response: list of food posts (latest first)

3. GET /api/food/:id
   - auth required: no
   - response: single food post

4. POST /api/food/claim/:id
   - auth required: yes
   - response: claim success message + updated food object

### 8.3 User Endpoints

1. GET /api/users/leaderboard
   - auth required: no
   - response: users with points and verification state

2. GET /api/users/me
   - auth required: yes
   - response: user info + posts + claimedFoods

## 9. Environment Variables

Create backend/.env with:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret
PORT=5000
```

Optional frontend env:

```env
VITE_API_URL=http://localhost:5000/api
```

## 10. How to Run the Project

## 10.1 Backend

```bash
cd backend
npm install
node server.js
```

For development auto-reload:

```bash
npx nodemon server.js
```

## 10.2 Frontend

```bash
cd frontend
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## 11. Important Implementation Notes for Report

- Token is stored in localStorage and sent in Authorization header.
- Backend auth middleware accepts both Bearer token and raw token.
- Verification status is currently based on whether document is uploaded at registration time.
- Posting food is auth-protected, but there is no backend-only role/verified enforcement check for donor in createFood.
- Uploaded files are stored locally in backend/uploads and served via /uploads.
- Some page files are legacy or duplicates and not part of active routing.

## 12. Suggested Report Sections You Can Reuse

Use this README content directly to write:

1. Abstract / Problem Statement
2. Objectives
3. Technology Stack Justification
4. System Architecture
5. Module Description (Auth, Food, Claim, Leaderboard, Profile)
6. Database Design (User and Food schemas)
7. API Design
8. UI and UX Design
9. Security and Validation
10. Limitations and Future Enhancements

---

If you want, I can also generate a second file named REPORT.md that is formatted exactly like a final college/project report template (Abstract, Existing System, Proposed System, Methodology, Results, Conclusion, Future Scope).