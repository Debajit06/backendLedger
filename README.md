# Backend Ledger System 🏦

A secure, scalable double-entry ledger backend system built with Node.js, Express, MongoDB, and Mongoose. This system manages user authentication, account creation, ledger entries, idempotency, and transactional transfers with session-managed double-entry accounting.

## Features ✨

- **User Authentication**: Registration, Login, Logout, JWT token management, and token blacklisting.
- **Account Management**: Create accounts, retrieve user accounts, and check real-time balance calculated from ledger entries.
- **Double-Entry Transaction Engine**: 
  - Debit and Credit ledger entries executed atomically within MongoDB sessions.
  - Idempotency protection to prevent duplicate transaction processing.
  - Initial system funds injection middleware for admin/system users.
- **Email Service**: Registration & transaction notification emails via Nodemailer (Gmail OAuth2 / App Passwords).

## Tech Stack 🛠️

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) & bcrypt
- **Email Service**: Nodemailer

## Getting Started 🚀

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas cluster or local MongoDB instance

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/backendLedger.git
   cd backendLedger
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory (refer to `.env.example`):
   ```env
   PORT=8080
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

4. Start the server:
   - Development mode (with Nodemon):
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm start
     ```

## API Endpoints 📌

### Auth Routes (`/api/auth`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Log in user and set JWT cookie |
| `POST` | `/api/auth/logout` | Log out user and blacklist token |

### Account Routes (`/api/account`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/account/` | Create account for authenticated user |
| `GET` | `/api/account/` | Get user accounts |
| `GET` | `/api/account/balance/:accountId` | Get account balance |

### Transaction Routes (`/api/transaction`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/transaction/` | Create double-entry transaction |
| `POST` | `/api/transaction/system/initial-funds` | Add initial funds (System users) |

## License 📄
This project is licensed under the ISC License.
