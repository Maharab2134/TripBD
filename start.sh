#!/bin/bash

# BDTrip Project Startup Script
# This script starts both servers required for the project

echo "🚀 Starting BDTrip Project..."
echo "================================"

# Check if json-server is installed
if ! command -v json-server &> /dev/null; then
    echo "❌ json-server not found!"
    echo "📦 Installing json-server globally..."
    npm install -g json-server
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found! Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found! Please install Python 3."
    exit 1
fi

# Kill any existing processes on ports 3000 and 8000
echo "🧹 Cleaning up existing processes..."
lsof -ti:3000 | xargs -r kill -9 2>/dev/null
lsof -ti:8000 | xargs -r kill -9 2>/dev/null
sleep 1

# Start JSON Server (Backend API)
echo "🔧 Starting JSON Server (Backend API) on port 3000..."
json-server --watch db.json --port 3000 > /tmp/json-server.log 2>&1 &
JSON_SERVER_PID=$!
sleep 2

# Check if JSON Server started successfully
if ps -p $JSON_SERVER_PID > /dev/null; then
    echo "✅ JSON Server started successfully (PID: $JSON_SERVER_PID)"
else
    echo "❌ Failed to start JSON Server. Check /tmp/json-server.log"
    exit 1
fi

# Start Python HTTP Server (Frontend)
echo "🌐 Starting Python HTTP Server (Frontend) on port 8000..."
python3 -m http.server 8000 > /tmp/python-server.log 2>&1 &
PYTHON_SERVER_PID=$!
sleep 1

# Check if Python Server started successfully
if ps -p $PYTHON_SERVER_PID > /dev/null; then
    echo "✅ Python HTTP Server started successfully (PID: $PYTHON_SERVER_PID)"
else
    echo "❌ Failed to start Python HTTP Server. Check /tmp/python-server.log"
    kill $JSON_SERVER_PID
    exit 1
fi

echo ""
echo "================================"
echo "🎉 BDTrip Project is now running!"
echo "================================"
echo ""
echo "📍 Access the website at:"
echo "   🏠 Homepage: http://localhost:8000/index.html"
echo "   👤 User Login: http://localhost:8000/userLoginReg/login.html"
echo "   🔐 Admin Login: http://localhost:8000/login/adminlogin.html"
echo ""
echo "🔑 Admin Credentials:"
echo "   Username: admin"
echo "   Password: admin"
echo ""
echo "📊 API Endpoints:"
echo "   📡 API Base: http://localhost:3000"
echo "   🗺️  Destinations: http://localhost:3000/destinations"
echo "   👥 Users: http://localhost:3000/users"
echo ""
echo "📝 Logs:"
echo "   JSON Server: /tmp/json-server.log"
echo "   Python Server: /tmp/python-server.log"
echo ""
echo "⚠️  To stop servers, run: ./stop.sh"
echo "   Or press Ctrl+C and then run: pkill -f 'json-server|http.server'"
echo ""
echo "💡 Keep this terminal open. Press Ctrl+C to stop all servers."
echo ""

# Save PIDs for cleanup
echo $JSON_SERVER_PID > /tmp/bdtrip-json-server.pid
echo $PYTHON_SERVER_PID > /tmp/bdtrip-python-server.pid

# Wait for user interrupt
trap 'echo ""; echo "🛑 Stopping servers..."; kill $JSON_SERVER_PID $PYTHON_SERVER_PID 2>/dev/null; rm -f /tmp/bdtrip-*.pid; echo "✅ Servers stopped. Goodbye!"; exit 0' INT

# Keep script running
wait
