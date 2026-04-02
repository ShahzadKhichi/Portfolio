# Full-Stack Portfolio

This is a modern, full-stack portfolio application built with React (Frontend) and Express/TypeScript (Backend).

## Architecture
The backend is built with an Object-Oriented, Layered Architecture (`Controller` -> `Service` -> `Repository`) using `TSyringe` for Dependency Injection. The Data layer uses `Mongoose` (MongoDB).

---

## 🚀 API Documentation

### Base URL
`http://localhost:4000` (or your production deployment URL)

### 📧 Public Routes
These routes do not require authentication.

#### `GET /public`
- **Description**: Health check endpoint.
- **Response**: `{ message: "Welcome To API", success: true }`

#### `POST /public/contact`
- **Description**: Sends an email via the contact form.
- **Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "Hello, I would like to hire you."
  }
  ```
- **Response**: `{ message: "Email Sent", success: true }`

---

### 🔐 Authentication Routes (`/api/user`)
All user routes use `Zod` validation. Upon successful login, an access token is returned and a refresh token is attached via HTTP-only cookies.

#### `POST /api/user/login`
- **Description**: Admin login.
- **Body**:
  ```json
  {
    "email": "admin@example.com",
    "password": "yourpassword"
  }
  ```
- **Response**: `{ message: "Login successful", success: true, accessToken: "eyJhbG..." }`

#### `POST /api/user/forgot-password`
- **Description**: Requests a 6-digit OTP to the admin email.
- **Body**: `{ "email": "admin@example.com" }`

#### `POST /api/user/verify-otp`
- **Description**: Verifies the OTP (valid for 10 minutes).
- **Body**:
  ```json
  {
    "email": "admin@example.com",
    "otp": "123456"
  }
  ```

#### `POST /api/user/reset-password`
- **Description**: Commits a new password if the OTP is valid.
- **Body**:
  ```json
  {
    "email": "admin@example.com",
    "otp": "123456",
    "newPassword": "newsecurepassword"
  }
  ```

---

### 💼 Project Routes (`/api/projects`)

#### `GET /api/projects`
- **Description**: Fetch all portfolio projects.
- **Access**: Public
- **Response**: `{ success: true, projects: [{...}] }`

#### `GET /api/projects/:id`
- **Description**: Fetch a single project by ID.
- **Access**: Public

#### `POST /api/projects`
- **Description**: Create a new project. Supports `multipart/form-data` for image uploads (Cloudinary).
- **Access**: 🔒 Protected (Requires Bearer Token)
- **Headers**: `Authorization: Bearer <accessToken>`
- **Body (`multipart/form-data`)**:
  - `title`: string
  - `description`: string
  - `image`: file (binary)
  - `tags`: string (JSON array or comma-separated)
  - `github`: string (URL)
  - `live`: string (URL)

#### `PUT /api/projects/:id`
- **Description**: Update an existing project.
- **Access**: 🔒 Protected (Requires Bearer Token)
- **Headers**: `Authorization: Bearer <accessToken>`
- **Body**: Same as `POST` above.

#### `DELETE /api/projects/:id`
- **Description**: Delete a project by ID.
- **Access**: 🔒 Protected (Requires Bearer Token)
- **Headers**: `Authorization: Bearer <accessToken>`

---

## Environment Variables
The backend requires the following variables in the `.env` file:
```env
PORT=4000
DB_URL=mongodb+srv://...
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

# NodeMailer
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password

# Cloudinary
API_KEY=your_cloudinary_key
API_SECRET=your_cloudinary_secret
CLOUD_NAME=your_cloudinary_name
```
