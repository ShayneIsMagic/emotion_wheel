#!/bin/bash

echo "🚀 Building and deploying Emotion Assessment System..."

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# Check if ngrok is installed
if ! command -v ngrok &> /dev/null; then
    echo "📥 Installing ngrok..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install ngrok/ngrok/ngrok
    else
        # Linux
        curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null
        echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list
        sudo apt update && sudo apt install ngrok
    fi
fi

# Start local server
echo "🌐 Starting local server..."
cd dist
python3 -m http.server 8000 &
SERVER_PID=$!

# Wait a moment for server to start
sleep 2

# Start ngrok tunnel
echo "🔗 Creating public tunnel..."
ngrok http 8000 > ngrok.log 2>&1 &
NGROK_PID=$!

# Wait for ngrok to start
sleep 5

# Get the public URL
PUBLIC_URL=$(curl -s http://localhost:4040/api/tunnels | grep -o '"public_url":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -n "$PUBLIC_URL" ]; then
    echo ""
    echo "🎉 Your Emotion Assessment System is now live!"
    echo "🔗 Public URL: $PUBLIC_URL"
    echo ""
    echo "📱 Share this URL with others to test the assessment!"
    echo "🔄 The app will automatically reload when you make changes"
    echo ""
    echo "Press Ctrl+C to stop the servers"
    
    # Keep the script running
    wait
else
    echo "❌ Failed to get public URL from ngrok"
    echo "📋 Check ngrok.log for details"
    kill $SERVER_PID 2>/dev/null
    kill $NGROK_PID 2>/dev/null
    exit 1
fi
