# Task Management Application

A simple **task management application** built with **NestJS** (backend) and **React** (frontend). It supports drag-and-drop task management, task filtering, and CRUD operations.

---

## Features

- User authentication with **JWT**.
- Create, read, update, and delete tasks.
- Drag-and-drop task management using `@hello-pangea/dnd`.
- Task filtering by priority (Low, Medium, High).
- Edit and delete tasks from the board.
- Responsive UI with **Ant Design** components.

---

## Technologies Used

**Backend**:

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- JWT Authentication
- Dockerized for development

**Frontend**:

- React
- TypeScript
- Ant Design
- `@hello-pangea/dnd` for drag-and-drop
- Styled-components

**Dev Tools**:

- Docker Compose for container orchestration
- Vite for frontend development

---

## Architecture Overview

The app uses a **modular architecture** with clear separation between frontend and backend:

1. **Backend (NestJS)**:
   - **Modules**: Auth, Users, Tasks
   - **Services**: Handles business logic (task creation, update, delete, status changes)
   - **Controllers**: Expose REST API endpoints
   - **Database**: PostgreSQL via TypeORM
   - **Dockerized** for local development and testing

2. **Frontend (React + TypeScript)**:
   - **Components**:
     - `Board` → Main task board managing columns
     - `Column` → Represents a task column (To Do, In Progress, Done)
     - `TaskCard` → Presentational task component (drag-and-drop)
   - **Hooks**:
     - `useTasks` → Handles API requests, loading states, and task CRUD
   - **State Management**: Component-level state using `useState` and `useEffect`
   - **UI**: Ant Design + Styled-components for consistent theming

3. **Drag-and-drop and filtering**:
   - Implemented at the `Board` and `Column` level
   - Task priority filtering is handled per column
   - Task edits and deletes are triggered from the board level for central state management

---

## Setup Instructions

### Prerequisites

- Node.js >= 20
- Docker & Docker Compose
- PostgreSQL (or use Docker container)
- npm / yarn

---

### Clone the Repository

```bash
git clone <repository-url>
cd task-management
cd backend
npm install
Set up environment variables in .env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=
JWT_SECRET=
JWT_EXPIRES_IN=
npm run start:dev

cd frontend
npm install
npm run dev
```
### You can run the entire stack using Docker Compose
```bash
docker-compose up --build
```