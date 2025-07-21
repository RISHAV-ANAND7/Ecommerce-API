# Ecommerce API

A RESTful API built using Node.js, Express, and MongoDB that supports user authentication, product management, and cart functionality for an ecommerce system. Authentication is handled using JWT, and password security is ensured with bcrypt.

## Features

- User Registration
- User Login
- JWT Authentication Middleware
- Create, Read, Update, and Delete (CRUD) operations for Products
- Add to Cart, View Cart, Remove from Cart
- Secure password storage with bcrypt

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with Mongoose
- **JWT (JSON Web Token)** for authentication
- **bcrypt** for password hashing

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=5000
   MONGO_URL=<your-mongodb-connection-string>
   JWT=<your-secret-key>
   ```

4. Start the server:

   ```bash
   npm start
   ```

   The API will be running at `http://localhost:5000`.

## API Endpoints

### User Authentication

#### Register a new user

```http
POST /api/register
```

**Request Body:**

```json
{
  "username": "user123",
  "email": "user@example.com",
  "password": "securepassword"
}
```

#### Login

```http
POST /api/login
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Product Management (Requires Authentication)

#### Get all products

```http
GET /api/products/all
Headers: Authorization: Bearer <token>
```

#### Get product by ID

```http
GET /api/products/:id
Headers: Authorization: Bearer <token>
```

#### Create a new product

```http
POST /api/products/new
Headers: Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "name": "Sample Product",
  "description": "Product description",
  "price": 999,
  "stock": 10,
  "category": "electronics"
}
```

#### Update a product

```http
PUT /api/products/:id
Headers: Authorization: Bearer <token>
```

#### Delete a product

```http
DELETE /api/products/:id
Headers: Authorization: Bearer <token>
```

### Cart Operations (Requires Authentication)

#### Add to cart

```http
POST /api/cart/add
Headers: Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "productId": "<product-id>",
  "quantity": 2
}
```

#### View cart

```http
GET /api/cart/user
Headers: Authorization: Bearer <token>
```

#### Remove item from cart

```http
DELETE /api/cart/remove/:productId
Headers: Authorization: Bearer <token>
```

#### Clear cart

```http
CLEAR /api/cart/clear
Headers: Authorization: Bearer <token>
```

#### Decrease product quantity

```http
DELETE QTY /api/cart/decrease/:productId
Headers: Authorization: Bearer <token>
```


## Authentication & Middleware

The API uses JWT-based authentication. Users must log in to receive a token, which must be included in the `Authorization` header for product and cart-related requests.

## License

This project is licensed under the MIT License.
