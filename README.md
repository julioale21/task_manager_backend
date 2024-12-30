![Coally Logo](https://coally.com/wp-content/uploads/2023/09/Horizontal-Version-Principal-1.png)

# Coally - Task Manager API 🚀

![NestJS](https://img.shields.io/badge/NestJS-v10.4.9-red)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![Swagger](https://img.shields.io/badge/Swagger-UI-blue)
![Jest](https://img.shields.io/badge/Testing-Jest-yellow)

The **Coally Task Manager API** is a simple task manager developed as a technical test for Coally. It is built using [NestJS](https://nestjs.com/), a progressive Node.js framework, and [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) as the database.

---

## 🔧 Tools and Technologies

- **NestJS**: For creating a modular and scalable application.
- **MongoDB Atlas**: As the database for managing tasks.
- **Swagger**: For API documentation and testing.
- **Jest**: For unit testing.
- **TypeScript**: For type-safe development.
- **Mongoose**: For MongoDB object modeling.
- **Passport Module**: Used for managing authentication tokens.

---

## 🔢 Key Features

- **Authentication and Authorization**:
  - Handled using NestJS Passport.
  - Custom decorators for protecting routes with authentication tokens.
- **Task Querying**:
  - Supports pagination, filtering by status, and search parameters for task retrieval.
- **API Documentation**:
  - Interactive Swagger UI for easy testing and exploration.

---

## 📂 Project Structure

```plaintext
src/
├── auth/                # Authentication module
│   ├── strategies/      # JWT strategies
│   │   └── jwt.strategy.ts
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── auth.service.ts
│   └── user.model.ts    # User schema/model
├── common/pipes/        # Custom validation pipes
│   ├── mongo-id.pipe.spec.ts
│   └── mongo-id.pipe.ts
├── interceptors/        # Global or module-specific interceptors
├── tasks/               # Task management module
│   ├── dto/             # Data Transfer Objects
│   ├── responses/       # API response structures
│   │   ├── task.response.ts
│   │   └── paginated-task.response.ts
│   ├── tasks.controller.ts
│   ├── tasks.controller.spec.ts
│   ├── tasks.module.ts
│   ├── tasks.service.spec.ts
│   └── tasks.service.ts
├── app.controller.ts    # Root application controller
├── app.module.ts        # Root application module
├── app.service.ts       # Root application service
└── main.ts              # Application entry point
```

---

## 🔧 Setting Up the Project

### Prerequisites

- **Node.js**: Ensure you have Node.js version `16.x` or higher installed.
- **MongoDB Atlas Account**: You'll need access to MongoDB Atlas with a connection string.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/julioale21/task_manager_backend.git
   cd coally-task-manager
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```env
   MONGODB_URI=mongodb+srv://julioale04031981:IllRhEXGE0QkImIL@cluster0.jmuny.mongodb.net/coally-db?retryWrites=true&w=majority
   ```

---

## 🚀 Running the Application

1. Start the server:

   ```bash
   npm run start:dev
   ```

2. Open the application in your browser:
   - **Swagger UI**: [http://localhost:3002/api](http://localhost:3002/api)
   - **API Root**: [http://localhost:3002](http://localhost:3002)

---

## 💡 Additional Features

### API Endpoints

#### Tasks

- **POST /tasks**: Create a new task.
- **GET /tasks**: Retrieve tasks with optional pagination and filters.
- **GET /tasks/:id**: Retrieve a specific task by its ID.
- **PATCH /tasks/:id**: Update a specific task.
- **DELETE /tasks/:id**: Delete a task by its ID.

### Custom Features

- **Protected Routes**:
  - Leveraging custom decorators for token validation.
- **Advanced Querying**:
  - Pagination, status-based filtering, and parameterized searching.

---

## 🔧 Testing

1. Run unit tests:

   ```bash
   npm run test
   ```

2. Run tests with coverage:

   ```bash
   npm run test:cov
   ```

---

## 🌐 Database Schema (Tasks)

| Field         | Type      | Description                          |
| ------------- | --------- | ------------------------------------ |
| `_id`         | `string`  | Unique identifier (MongoDB ObjectID) |
| `title`       | `string`  | Title of the task                    |
| `description` | `string`  | Description of the task (optional)   |
| `status`      | `boolean` | Task completion status               |
| `createdAt`   | `Date`    | Task creation date                   |

---

## 📊 Project Diagram

```plaintext
+-------------------------------------------+
|                NestJS App                 |
+-----------------------+-------------------+
| Modules: Tasks Module | Database: MongoDB |
+-----------------------+-------------------+
|      Controller       |  Service Layer    |
|    - tasks.controller | - tasks.service   |
+-----------------------+-------------------+
|          DTOs         |      Pipes        |
| - create-task.dto     | - mongo-id.pipe   |
| - update-task.dto     |                   |
+-----------------------+-------------------+
```

---

## ✨ Contributing

Feel free to fork this repository and submit pull requests. Any contributions to improve this project are welcome!

---

## Solved by Julio Romero ✨

I am a **full-stack web and mobile Flutter developer** with over 6 years of experience. Currently, I work for **Moonshot Partners**, building a mobile application for **Digitel Venezuela** using Flutter.

### Connect with Me:

- **[LinkedIn](https://www.linkedin.com/in/julio-alejandro-romero-bb4197119/)**
- **[GitHub](https://github.com/julioale21)**

---

## 🔔 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

