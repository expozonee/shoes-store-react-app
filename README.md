# Shoe Store Manager CRUD App

## Assignment Description

This project is a React application for managing a shoe store. It is designed to practice and implement the following concepts:

- **JSX**
- **Props**
- **State**
- **Routing**
- **CRUD Operations**
- **HTTP Requests**

### Task Overview

Create a CRUD application for a shoe store manager using a real API. The application allows the admin user to create, read, update, and delete shoe products. Regular users can browse the store but cannot modify it.

### Custom Backend Server

A custom backend server was built using **Node.js**, **Express.js**, and **PostgreSQL** to handle RESTful requests to the database. This backend provides full CRUD functionality and interacts with the frontend through HTTP requests.

### Routes

- **Home Page**: `/`
- **Shoes Page**: `/shoes`  
  Displays a list of all shoes with pictures, names, and prices.
- **Shoe Detail Page**: `/shoes/:shoeId`  
  Shows editable fields for updating a shoe, with "Update" and "Delete" buttons.
- **Add Shoe Page**: `/shoes/add`  
  Allows the admin to add a new shoe to the store.
- **Additional Routes**: You may add any other routes as desired.

### User Roles

There are two types of users:

- **Admin User**: Can add, modify, and remove products.
- **Regular User**: Can browse the store.

### User Credentials

- **Admin User**  
  Email: `admin@example.com`  
  Password: `admin123`

- **Regular User**  
  Email: `user@example.com`  
  Password: `user123`

## Known Issues and Challenges

- **Implementation Challenges**:
  - Setting up the custom backend server with Express.js and PostgreSQL required careful configuration of the database connections and crafting SQL queries for the CRUD operations.
  - Implementing authentication and authorization to differentiate between admin and regular users was complex, ensuring secure access to protected routes.
- **Assignment Review**:
  - This assignment was an excellent opportunity to integrate a full-stack application, combining frontend and backend development skills.
  - Building the backend from scratch enhanced understanding of server-side operations and database interactions.
  - The project emphasized the importance of secure authentication mechanisms and proper state management in React.

## Additional Information

- **Technologies Used**:
  - **Frontend**: React, React Router
  - **Backend**: Node.js, Express.js, PostgreSQL
- **API Endpoints**:
  - **GET** `/shoes` - Retrieve all shoes
  - **GET** `/shoe/:shoeId` - Retrieve a specific shoe
  - **POST** `/addShoe` - Add a new shoe (Admin only)
  - **PUT** `/shoe/:shoeId` - Update a shoe (Admin only)
  - **DELETE** `/delete/:shoeId` - Delete a shoe (Admin only)

- **How to Use**:
  - **Admin**:
    - Log in using the admin credentials.
    - Access the Add Shoe page to add new products.
    - Edit or delete existing products from the Shoe Detail page.
  - **Regular User**:
    - Browse the list of available shoes.
    - View details of individual shoes.


