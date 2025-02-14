# Book Assignment (Backend & Frontend)

This document serves as the README file for the book assignment project, which includes both backend and frontend functionalities.

## Overview
This project enables users to register, log in, add books, and submit reviews through a full-stack application.

## Features
### **Backend Features**
- User Registration & Login (Authentication)
- Add New Books
- Review submittion
- Secure Password Handling
- RESTful API Endpoints
- Book CoverPage upolading

### **Frontend Features**
- User-friendly UI for managing books and reviews
- Authentication (Login & Signup pages)
- Book Listing and Details View
- Review Submission 
- Responsive Design

## Technologies Used
### **Backend Technologies**
- **Node.js** - Backend runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **bcrypt** - Password hashing
- **JWT** - User authentication
- **Cors** - Cross-Origin Resource Sharing
- **Multer** -Handling Image Uploads

### **Frontend Technologies**
- **React.js** - Frontend framework
- **Redux** - State management
- **Axios** - HTTP requests
- **Bootstrap** - UI styling
- **React Router** - Navigation
- **Ract-Bootstarp** - Handling UI Toggle Forms
- **Toast** - Notifications 

## API Endpoints

### **User Authentication**
- **Register:** `POST /user/signup`
- **Login:** `POST /user/signin`

### **Book Management**
- **Add Book:** `POST /books`
- **Get Books:** `GET /books`
- **Get Book by ID:** `GET /books/:id`
- **Search Book By Title:** `GET /search/books`

### **Book Reviews**
- **Add Review:** `POST /reviews`
- **Get Reviews for Book:** `GET /review`

## Project Structure
```
book-assignment/
│-- backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Book.js
│   │   ├── Review.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookController.js
│   │   ├── reviewController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookRoutes.js
│   │   ├── reviewRoutes.js
│   ├── index.js
│   ├── package.json
│-- frontend/
│   ├── src/
|   |   |--Action
|   |   |--Reducer
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   ├── public/
│   ├── package.json
│   ├── README.md
```

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Vittal-Shindhe2001/Book_assignment-.git
   cd book-assignment
   ```

### **Backend Setup**
2. Navigate to the backend folder and install dependencies:
   ```bash
   cd backend
   yarn install
   ```
3. Set up environment variables:
   Create a `.env` file and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_KEY=your_jwt_secret
   ```
4. Run the backend server:
   ```bash
   node index.js
   ```

### **Frontend Setup**
5. Navigate to the frontend folder and install dependencies:
   ```bash
   cd frontend
   yarn install
   ```
6. Run the frontend app:
   ```bash
   yarn start
   ```

## Submission Guidelines
- API should be tested using Postman or similar tools
- Ensure frontend UI is responsive and user-friendly


## Author
Developed by Vittal Shindhe

