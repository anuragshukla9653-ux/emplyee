# Employee Directory

Full-stack Employee Directory app built with React, Vite, Tailwind CSS, Node.js, Express, MongoDB, and Mongoose.

## Features

- View employees
- Search employees by name or department
- Add employees
- Edit employees
- Responsive card layout for desktop, tablet, and mobile
- MongoDB persistence
- Seed data for first run

## Project Structure

```text
backend/
  config/
    db.js
  controllers/
    employeeController.js
  models/
    Employee.js
  routes/
    employeeRoutes.js
  seed/
    seedEmployees.js
  app.js
  server.js
  .env.example

frontend/
  src/
    components/
      EmployeeCard.jsx
      EmployeeForm.jsx
      EmployeeList.jsx
      SearchBar.jsx
    pages/
      Home.jsx
    services/
      employeeService.js
    App.jsx
    main.jsx
```

## Backend Setup

```powershell
cd backend
npm install
npm run dev
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

## Frontend Setup

```powershell
cd frontend
npm install
npm run dev
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

```text
GET  /api/employees
POST /api/employees
PUT  /api/employees/:id
```

Example request body:

```json
{
  "name": "John Doe",
  "role": "Frontend Developer",
  "department": "Engineering"
}
```

## Seed Data

If the employee collection is empty, the backend inserts:

- John Doe, Developer, Engineering
- Sarah Khan, HR Manager, Human Resources
- Mike Wilson, Designer, Design
- Ali Ahmed, Backend Developer, Engineering
- Emma Smith, Recruiter, Human Resources

## Final Checklist

- MongoDB connected
- GET API works
- POST API works
- PUT API works
- Employees displayed
- Search by name works
- Search by department works
- Add employee works
- Edit employee works
- Mobile responsive
- Component separation
- README included
