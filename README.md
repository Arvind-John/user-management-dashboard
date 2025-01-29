# Overview
This is a simple React.js web application for managing users. It allows users to view, add, edit, and delete user details using a mock backend API (JSONPlaceholder). The app interacts with the /users endpoint for fetching and manipulating user data.

## 1. Features
- Fetch and display a list of users with ID, First Name, Last Name, Email, and Department.
- Add a new user by sending a POST request to /users.
- Edit an existing user by fetching their details and sending a PUT request to /users/:id.
- Delete a user by sending a DELETE request to /users/:id.
- Handle API errors and display appropriate messages.

## 2. Technologies Used
- React.js
- Axios (for HTTP requests)
- JSONPlaceholder (Mock API)

## 3. Installation
- Clone the repository: git clone https://github.com/Arvind-John/user-management-dashboard
- Install dependencies: npm install
- Start the application: npm start

## 4. API Endpoints Used
- GET https://jsonplaceholder.typicode.com/users - Fetch user list.
- POST https://jsonplaceholder.typicode.com/users - Add a new user.
- PUT https://jsonplaceholder.typicode.com/users/:id - Edit a user.
- DELETE https://jsonplaceholder.typicode.com/users/:id - Delete a user.

## 5. How to Use
- Open the application in your browser.
- Click on "Add User" to add a new user.
- Click "Edit" next to a user to modify their details.
- Click "Delete" to remove a user.

## 6. Error Handling
- Displays an error message if the API request fails.
- Prevents users from submitting empty fields.

## 7. Future Enhancements
- Add authentication and user roles.
- Improve UI with more styling.
