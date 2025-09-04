# CoderBrothers Backend

## Overview
CoderBrothers is a backend application built with Node.js, Express.js, and MongoDB. It provides a RESTful API for user management, including functionalities for creating, retrieving, updating, and deleting users.

## Features
- User registration and authentication
- JWT-based authentication middleware
- MongoDB for data storage
- Structured code with controllers, models, and routes

## Technologies Used
- Node.js
- Express.js
- MongoDB (with Mongoose)
- dotenv for environment variable management

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)
- npm (Node package manager)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd CoderBrothers-backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and add your MongoDB connection string and JWT secret:
   ```
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```

### Running the Application
To start the server, run:
```
npm start
```
The server will be running on `http://localhost:3000`.

### API Endpoints
- **POST /api/users**: Create a new user
- **GET /api/users/:id**: Retrieve a user by ID
- **PUT /api/users/:id**: Update a user by ID
- **DELETE /api/users/:id**: Delete a user by ID

### Logging
The application includes a logging utility for tracking application events and errors.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.