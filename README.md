# BDTrip - Bangladesh Tourism Website

A complete tourism website with user authentication, booking system, and admin panel.

## 🚀 Features

- **User Features:**
  - Browse destinations across Bangladesh and international locations
  - User registration and login system
  - Book tour packages and adventure services
  - Duplicate booking prevention
  - Secure login-protected booking

- **Admin Features:**
  - Dashboard with statistics
  - User management (CRUD operations)
  - Service bookings management
  - Destination bookings management
  - Destination management (Add/Edit/Delete)
  - Real-time data updates

## 📋 Prerequisites

Before running this project, make sure you have installed:

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/
   - Verify: `node --version`

2. **Python 3** (for static file server)
   - Usually pre-installed on Linux/Mac
   - Verify: `python3 --version`

3. **json-server** (for mock backend API)
   - Install globally: `npm install -g json-server`
   - Verify: `json-server --version`

## 🛠️ Installation & Setup

### Step 1: Clone or Download the Project

```bash
cd /home/dev/Downloads/BDTrip
```

### Step 2: Install json-server (if not installed)

```bash
npm install -g json-server
```

### Step 3: Verify db.json exists

Make sure `db.json` file is present in the project root with all collections:
- admin
- users
- destinations
- serviceBookings
- destinationBookings
- bookPlaces

## ▶️ Running the Project

You need to run **TWO servers** simultaneously:

### Terminal 1: Start JSON Server (Backend API)

```bash
cd /home/dev/Downloads/BDTrip
json-server --watch db.json --port 3000
```

**What it does:**
- Runs the backend API on `http://localhost:3000`
- Watches `db.json` for real-time updates
- Provides REST API endpoints for all data

**Available Endpoints:**
- `http://localhost:3000/destinations` - All destinations
- `http://localhost:3000/users` - All users
- `http://localhost:3000/serviceBookings` - Service bookings
- `http://localhost:3000/destinationBookings` - Destination bookings
- `http://localhost:3000/admin` - Admin credentials

### Terminal 2: Start Python HTTP Server (Frontend)

```bash
cd /home/dev/Downloads/BDTrip
python3 -m http.server 8000
```

**What it does:**
- Serves static files (HTML, CSS, JS) on `http://localhost:8000`
- Allows you to access the website in browser

## 🌐 Access the Website

After both servers are running, open your browser and visit:

### User Side:
- **Homepage**: http://localhost:8000/index.html
- **Login**: http://localhost:8000/userLoginReg/login.html
- **Register**: http://localhost:8000/userLoginReg/registration.html
- **Discover**: http://localhost:8000/discover.html
- **Services**: http://localhost:8000/service.html
- **Destination Details**: http://localhost:8000/destination.html
- **Blog**: http://localhost:8000/blog.html
- **About**: http://localhost:8000/about.html

### Admin Side:
- **Admin Login**: http://localhost:8000/login/adminlogin.html
  - **Username**: admin
  - **Password**: admin
- **Dashboard**: http://localhost:8000/admin/adminDashboard.html
- **User Management**: http://localhost:8000/admin/users.html
- **Service Bookings**: http://localhost:8000/admin/bookings.html
- **Destination Bookings**: http://localhost:8000/admin/destinationBookings.html
- **Manage Destinations**: http://localhost:8000/admin/admin.html

## 📝 Quick Start Guide

### For First Time Users:

1. **Start Both Servers** (follow steps above)

2. **Create a User Account**:
   - Visit: http://localhost:8000/userLoginReg/registration.html
   - Fill in your details and register

3. **Login**:
   - Visit: http://localhost:8000/userLoginReg/login.html
   - Use your registered credentials

4. **Browse & Book**:
   - Explore destinations
   - Book tours or services
   - Your bookings will be saved in `db.json`

### For Admin:

1. **Admin Login**:
   - Visit: http://localhost:8000/login/adminlogin.html
   - Username: `admin`
   - Password: `admin`

2. **Manage Everything**:
   - View all users
   - Manage bookings (Confirm/Cancel/Delete)
   - Add/Edit/Delete destinations
   - View statistics

## 🔧 Troubleshooting

### Problem: "Cannot GET /" or "Not Found"

**Solution**: Make sure Python HTTP server is running on port 8000

```bash
cd /home/dev/Downloads/BDTrip
python3 -m http.server 8000
```

### Problem: "Failed to fetch" or API errors

**Solution**: Make sure JSON Server is running on port 3000

```bash
cd /home/dev/Downloads/BDTrip
json-server --watch db.json --port 3000
```

### Problem: Port already in use

**Solution**: Kill the process and restart

```bash
# For port 3000 (JSON Server)
lsof -ti:3000 | xargs kill -9
json-server --watch db.json --port 3000

# For port 8000 (Python Server)
lsof -ti:8000 | xargs kill -9
python3 -m http.server 8000
```

### Problem: "Uncaught SyntaxError: redeclaration of const"

**Solution**: Clear browser cache (Ctrl + Shift + R or Cmd + Shift + R)

## 📂 Project Structure

```
BDTrip/
├── index.html                 # Homepage
├── config.js                  # API configuration
├── db.json                    # Database file (auto-updated)
├── package.json               # Project metadata
├── admin/                     # Admin panel
│   ├── adminDashboard.html    # Admin dashboard
│   ├── users.html             # User management
│   ├── bookings.html          # Service bookings
│   ├── destinationBookings.html # Destination bookings
│   └── admin.html             # Destination management
├── userLoginReg/              # User authentication
│   ├── login.html             # User login
│   ├── registration.html      # User registration
│   └── logstatus.js          # Login state management
├── css/                       # Stylesheets
├── image/                     # Images
├── video/                     # Video files
└── login/                     # Admin login
    └── adminlogin.html        # Admin login page
```

## 🔑 Default Credentials

### Admin:
- **Username**: admin
- **Password**: admin

### Test User (if exists):
- Check `db.json` → `users` collection for existing users
- Or create a new account via registration

## 🎯 Features Overview

### User Features:
- ✅ Browse 45+ destinations
- ✅ User registration with validation
- ✅ Login/Logout functionality
- ✅ Book adventure services (rafting, diving, etc.)
- ✅ Book tour packages
- ✅ Duplicate booking prevention
- ✅ Login-protected booking system

### Admin Features:
- ✅ User management (View, Edit, Delete)
- ✅ Service booking management (Confirm, Cancel, Delete)
- ✅ Destination booking management (Confirm, Cancel, Delete)
- ✅ Destination management (Add, Edit, Delete, Sort)
- ✅ Statistics dashboard
- ✅ Search and filter functionality

## 🚀 Production Deployment

For production deployment:

1. Replace `http://localhost:3000` in `config.js` with your deployed API URL
2. Deploy `db.json` to a proper database (MongoDB, PostgreSQL, etc.)
3. Use a proper backend (Node.js + Express) instead of json-server
4. Deploy frontend to hosting service (Netlify, Vercel, GitHub Pages)

## 🐛 Known Issues

- Video files need to be added to `/video/` folder (1.mp4 to 5.mp4)
- Client-side authentication (add server-side validation for production)
- No email verification (can be added)

## 📞 Support

For any issues or questions:
- Check the Troubleshooting section above
- Review browser console (F12) for errors
- Check both server terminals for error logs

## 📄 License

This project is for educational purposes.

---

**Made with ❤️ for Bangladesh Tourism**

© 2025 BDTrip. All rights reserved.
