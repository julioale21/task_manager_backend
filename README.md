# Coally Task Manager API 🚀

![NestJS](https://img.shields.io/badge/NestJS-v10.4.9-red)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![Swagger](https://img.shields.io/badge/Swagger-UI-blue)
![Jest](https://img.shields.io/badge/Testing-Jest-yellow)

The **Coally Task Manager API** is a simple task manager developed as a technical test for Coally. It is built using [NestJS](https://nestjs.com/), a progressive Node.js framework, and [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) as the database.

---

## 🛠️ Tools and Technologies

- **NestJS**: For creating a modular and scalable application.
- **MongoDB Atlas**: As the database for managing tasks.
- **Swagger**: For API documentation and testing.
- **Jest**: For unit testing.
- **TypeScript**: For type-safe development.
- **Mongoose**: For MongoDB object modeling.

---

## 📂 Project Structure

```plaintext
src/
├── app.module.ts         # Main application module
├── app.controller.ts     # Base controller for health checks or root routes
├── app.service.ts        # Base service for shared logic
├── tasks/                # Feature module for task management
│   ├── tasks.module.ts   # Task module definition
│   ├── tasks.controller.ts # Task controller for routing
│   ├── tasks.service.ts  # Task business logic
│   ├── task.model.ts     # Task Mongoose schema/model
│   ├── dto/              # Data Transfer Objects
│   │   ├── create-task.dto.ts # DTO for creating tasks
│   │   ├── update-task.dto.ts # DTO for updating tasks
│   │   └── find-all-tasks.dto.ts # DTO for filtering and paginating tasks
│   ├── pipes/            # Custom pipes for validation
│   │   └── mongo-id.pipe.ts # Validation pipe for MongoDB Object IDs
│   └── responses/        # API response structures
│       ├── task.response.ts # Response for single task
│       └── paginated-task.response.ts # Response for paginated tasks
└── main.ts               # Application entry point
```

---

## 🏗️ Setting Up the Project

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
   - **Swagger UI**: [http://localhost:3000/api](http://localhost:3000/api)
   - **API Root**: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Running Tests

1. Run unit tests:

   ```bash
   npm run test
   ```

2. Run tests with coverage:
   ```bash
   npm run test:cov
   ```

---

## 🖥️ API Endpoints

### Tasks

- **POST /tasks**: Create a new task.
- **GET /tasks**: Retrieve tasks with optional pagination and filters.
- **GET /tasks/:id**: Retrieve a specific task by its ID.
- **PATCH /tasks/:id**: Update a specific task.
- **DELETE /tasks/:id**: Delete a task by its ID.

---

## 🌟 Why NestJS?

1. **Scalability**: Built-in modular architecture allows separation of concerns.
2. **TypeScript Support**: Ensures type safety and improved developer experience.
3. **Community and Ecosystem**: Rich ecosystem of libraries and tools.
4. **Built-in Features**: Includes powerful tools like dependency injection, middleware, and validation.
5. **Swagger Integration**: Automatic generation of API documentation.

---

## 📖 Additional Notes

- **Validation**: DTOs ensure strict validation of incoming requests using `class-validator` and `class-transformer`.
- **Database**: The application uses MongoDB Atlas for cloud-based database management.
- **Security**: CORS is enabled for development but should be configured appropriately for production.

---

## 📊 Database Schema (Tasks)

| Field         | Type      | Description                          |
| ------------- | --------- | ------------------------------------ |
| `_id`         | `string`  | Unique identifier (MongoDB ObjectID) |
| `title`       | `string`  | Title of the task                    |
| `description` | `string`  | Description of the task (optional)   |
| `status`      | `boolean` | Task completion status               |
| `createdAt`   | `Date`    | Task creation date                   |

---

## 📈 Project Diagram

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

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
