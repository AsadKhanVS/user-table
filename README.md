Next.js + Node.js/Express + MongoDB Project
📌 Project Overview
This project is built with Next.js for the frontend and Node.js/Express for the backend, using MongoDB as the database. It follows a structured architecture with controllers, middleware, and routes to ensure maintainability and scalability.

Project Structure
🔹 Frontend (Next.js)
Built using Next.js (React framework).
Handles UI and client-side interactions.
Communicates with the backend through API calls.
🔹 Backend (Node.js/Express + MongoDB)
The backend is structured into different folders for better organization:

Controllers:
Handle business logic and interact with the database. Example: fetching, updating, or deleting records.

Middleware:
Functions that process requests before they reach controllers. Used for authentication, validation, logging, etc.

Routes:
Define API endpoints and map them to controller functions.

Models:
Define the structure of MongoDB collections using Mongoose schemas.

Seeder:
Populates the database with initial data automatically. Useful for setting up default records for testing or development.

Technologies Used
=> Frontend
Next.js (React framework)
React Query (for data fetching)
Tailwind CSS (or your preferred UI library)
Axios (for API calls)

=> Backend
Node.js (JavaScript runtime)
Express.js (Backend framework)
MongoDB (NoSQL database)
Mongoose (MongoDB ORM)

How to Run the Project
🔹 1. Clone the Repository

git clone <repository-url>
cd client
npm install
npm run dev

cd backend
npm install
npm run dev

3. Setup Environment Variables
   Create a .env file in the backend with the following:

PORT=5000
MONGO_URI=''
