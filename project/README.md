# Task Manager - Fullstack Application

A modern, production-ready task management application built with React (TypeScript) for the frontend and Node.js/Express (TypeScript) for the backend, using MongoDB Atlas as the database.

## 🚀 Features

### Frontend
- ✅ Modern React 18 with TypeScript
- ✅ TailwindCSS for beautiful, responsive styling
- ✅ React Query (TanStack Query) for efficient data fetching and caching
- ✅ Real-time UI updates with optimistic updates
- ✅ Loading states and error handling
- ✅ Task creation, editing, deletion, and completion toggle
- ✅ Progress tracking with visual progress bars
- ✅ Responsive design for mobile and desktop

### Backend
- ✅ RESTful API with Express.js and TypeScript
- ✅ MongoDB Atlas with Mongoose ODM
- ✅ Input validation with Zod
- ✅ Comprehensive error handling with proper HTTP status codes
- ✅ CORS support for cross-origin requests
- ✅ Health check endpoint for monitoring
- ✅ Comprehensive unit tests with Jest and Supertest

### Database
- ✅ MongoDB Atlas cloud database
- ✅ Mongoose schemas with validation
- ✅ Automatic timestamps
- ✅ Type-safe database operations

### Testing
- ✅ Unit tests for React components with React Testing Library
- ✅ Comprehensive API endpoint tests with Supertest and Jest
- ✅ In-memory MongoDB for testing
- ✅ High test coverage

## 🛠 Technologies Used

### Frontend
- React 18
- TypeScript
- TailwindCSS
- React Query (TanStack Query)
- Axios (HTTP client)
- Lucide React (icons)
- Vite (build tool)

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- Mongoose (ODM)
- Zod (validation)
- Jest & Supertest (testing)

### Testing
- Jest
- React Testing Library
- Supertest
- MongoDB Memory Server
- @testing-library/jest-dom

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account

## 🚀 Getting Started

### 1. Clone the Repository

\`\`\`bash
git clone <your-repo-url>
cd task-manager
\`\`\`

### 2. Set Up MongoDB Atlas

1. Create a MongoDB Atlas account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create a database user with read/write permissions
4. Get your connection string from the "Connect" button
5. Replace `<username>`, `<password>`, and `<cluster-url>` in the connection string

### 3. Environment Variables

#### Frontend (.env)
\`\`\`bash
cp .env.example .env
\`\`\`

Update `.env`:
\`\`\`
VITE_API_URL=http://localhost:3001/api
\`\`\`

#### Backend (backend/.env)
\`\`\`bash
cp backend/.env.example backend/.env
\`\`\`

Update `backend/.env` with your MongoDB Atlas connection string:
\`\`\`
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority
PORT=3001
NODE_ENV=development
\`\`\`

### 4. Install Dependencies

#### Frontend
\`\`\`bash
npm install
\`\`\`

#### Backend
\`\`\`bash
cd backend
npm install
\`\`\`

### 5. Start Development Servers

#### Option 1: Start Both Servers Separately

**Frontend (Terminal 1):**
\`\`\`bash
npm run dev
\`\`\`

**Backend (Terminal 2):**
\`\`\`bash
npm run backend:dev
\`\`\`

#### Option 2: Use Package Scripts

**Backend:**
\`\`\`bash
npm run backend:dev
\`\`\`

**Frontend:**
\`\`\`bash
npm run dev
\`\`\`

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3001`.

## 🧪 Running Tests

### Frontend Tests
\`\`\`bash
npm test
\`\`\`

### Backend Tests
\`\`\`bash
npm run backend:test
# or
cd backend && npm test
\`\`\`

### Run Tests in Watch Mode
\`\`\`bash
# Frontend
npm run test:watch

# Backend
cd backend && npm run test:watch
\`\`\`

## 🏗 Building for Production

### Frontend
\`\`\`bash
npm run build
\`\`\`

### Backend
\`\`\`bash
cd backend
npm run build
\`\`\`

## 📁 Project Structure

\`\`\`
task-manager/
├── frontend/                    # Frontend source code
│   ├── components/              # React components
│   │   ├── TaskForm.tsx        # Task creation form
│   │   ├── TaskItem.tsx        # Individual task component
│   │   └── TaskList.tsx        # Task list container
│   ├── hooks/                   # Custom React hooks
│   │   └── useTasks.ts         # React Query hooks for tasks
│   ├── lib/                     # Utility libraries
│   │   └── api.ts              # API client and validation
│   ├── __tests__/              # Frontend tests
│   └── App.tsx                 # Main App component
├── backend/                     # Backend source code
│   ├── src/
│   │   ├── config/             # Configuration files
│   │   │   └── database.ts     # MongoDB connection
│   │   ├── controllers/        # Route controllers
│   │   │   └── taskController.ts
│   │   ├── middleware/         # Express middleware
│   │   │   └── errorHandler.ts
│   │   ├── models/             # Mongoose models
│   │   │   └── Task.ts
│   │   ├── routes/             # API routes
│   │   │   └── taskRoutes.ts
│   │   ├── validation/         # Input validation schemas
│   │   │   └── taskValidation.ts
│   │   └── server.ts           # Express server setup
│   └── __tests__/              # Backend tests
│       └── task.test.ts        # API endpoint tests
└── README.md
\`\`\`

## 🔌 API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks (sorted by creation date, newest first)
- `POST /api/tasks` - Create a new task
  - Body: `{ "title": "Task title" }`
- `PUT /api/tasks/:id` - Update a task
  - Body: `{ "title": "New title", "completed": true }`
- `DELETE /api/tasks/:id` - Delete a task

### Health Check
- `GET /api/health` - Server health status

### API Response Format

**Success Response:**
\`\`\`json
{
  "success": true,
  "data": { ... }
}
\`\`\`

**Error Response:**
\`\`\`json
{
  "success": false,
  "message": "Error description"
}
\`\`\`

## 📱 Features Overview

### Task Management
- **Create Tasks**: Add new tasks with descriptive titles (max 200 characters)
- **Edit Tasks**: Click the edit icon to modify task titles inline
- **Complete Tasks**: Toggle task completion with checkboxes
- **Delete Tasks**: Remove tasks with confirmation dialog
- **Progress Tracking**: Visual progress bar showing completion status

### User Experience
- **Loading States**: Smooth loading indicators for all operations
- **Error Handling**: User-friendly error messages with proper HTTP status codes
- **Optimistic Updates**: Immediate UI feedback before server confirmation
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🧪 Testing Strategy

### Frontend Testing
- Component rendering tests
- User interaction tests (form submission, task editing, deletion)
- API integration tests
- Error handling tests

### Backend Testing
- API endpoint tests (GET, POST, PUT, DELETE)
- Input validation tests
- Error handling tests
- Database operation tests
- MongoDB Memory Server for isolated testing

## 🚀 Deployment

### Frontend (Vercel)

1. **Connect Repository:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select the root directory

2. **Configure Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables:**
   - Add `VITE_API_URL` with your backend URL

4. **Deploy:**
   - Vercel will automatically deploy on push to main branch

### Backend (Render)

1. **Create Web Service:**
   - Go to [render.com](https://render.com)
   - Create a new Web Service
   - Connect your GitHub repository

2. **Configure Service:**
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

3. **Environment Variables:**
   - Add `MONGODB_URI` with your MongoDB Atlas connection string
   - Add `NODE_ENV=production`
   - Add `PORT` (Render will provide this automatically)

4. **Deploy:**
   - Render will automatically deploy on push to main branch

### Alternative Backend Deployment (Railway)

1. **Connect Repository:**
   - Go to [railway.app](https://railway.app)
   - Create new project from GitHub repo

2. **Configure:**
   - Set root directory to `backend`
   - Add environment variables

3. **Deploy:**
   - Railway will handle the deployment automatically

## 🔧 Environment Variables Reference

### Frontend
- `VITE_API_URL`: Backend API URL (e.g., `https://your-backend.onrender.com/api`)

### Backend
- `MONGODB_URI`: MongoDB Atlas connection string
- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)

## 🔍 API Testing

You can test the API endpoints using tools like Postman or curl:

\`\`\`bash
# Health check
curl http://localhost:3001/api/health

# Get all tasks
curl http://localhost:3001/api/tasks

# Create a task
curl -X POST http://localhost:3001/api/tasks \\
  -H "Content-Type: application/json" \\
  -d '{"title": "My new task"}'

# Update a task
curl -X PUT http://localhost:3001/api/tasks/TASK_ID \\
  -H "Content-Type: application/json" \\
  -d '{"completed": true}'

# Delete a task
curl -X DELETE http://localhost:3001/api/tasks/TASK_ID
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [TailwindCSS](https://tailwindcss.com/) - Styling framework
- [MongoDB Atlas](https://www.mongodb.com/atlas) - Cloud database
- [React Query](https://tanstack.com/query) - Data fetching library
- [Express.js](https://expressjs.com/) - Backend framework
- [Mongoose](https://mongoosejs.com/) - MongoDB ODM
- [Lucide React](https://lucide.dev/) - Icon library

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error:**
   - Verify your MongoDB Atlas connection string
   - Check if your IP address is whitelisted in MongoDB Atlas
   - Ensure database user has proper permissions

2. **CORS Issues:**
   - Make sure the backend is running on the correct port
   - Check that VITE_API_URL matches your backend URL

3. **Build Errors:**
   - Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
   - Check Node.js version (requires v18+)

4. **Test Failures:**
   - Ensure MongoDB Memory Server can start (may require additional setup on some systems)
   - Check that all dependencies are installed

### Getting Help

If you encounter issues:
1. Check the console for error messages
2. Verify environment variables are set correctly
3. Ensure all dependencies are installed
4. Check that MongoDB Atlas is accessible
5. Review the API endpoints and request format

For additional help, please open an issue in the repository.