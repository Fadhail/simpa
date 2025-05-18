# Run Frontend
cd Frontend
npm run dev &
FRONTEND_PID=$!

# Run Backend
cd ../Backend
go run main.go &
BACKEND_PID=$!

wait $FRONTEND_PID $BACKEND_PID
