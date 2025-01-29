# Start PostgreSQL service
Write-Host "Starting PostgreSQL service..."
Start-Service postgresql

# Activate virtual environment and start backend
Write-Host "Starting backend server..."
Set-Location -Path "../backend"
.\.venv\Scripts\Activate.ps1
Start-Process powershell -ArgumentList "-NoExit", "-Command", "uvicorn main:app --reload"

# Start frontend
Write-Host "Starting frontend development server..."
Set-Location -Path "../frontend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"

Write-Host "All services started successfully!"
Write-Host "Backend running at: http://localhost:8000"
Write-Host "Frontend running at: http://localhost:3000"
Write-Host "API documentation at: http://localhost:8000/docs"
