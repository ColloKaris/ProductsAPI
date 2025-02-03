# Products API - Restful API for Managing Products
This is a RESTful API built using Node.js, Express, TypeScript, MongoDB, and JWT authentication. The API allows users to register, log in, manage sessions, and perform CRUD operations on resources.

## Features

- User authentication with JSON Web Tokens (JWT)
- CRUD operations for sessions and products.
- Secure password hashing using bcrypt
- Token refresh mechanism
- Resource validation using Zod and MongoDB Schema Validation
- Database operations done using the MongoDB native Node.js drivers


## Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT), Cookies
- **Security:** bcrypt, CORS
- **Validation:** Zod
- **Logging:** Pino

## Installation & Setup
1. Clone the reposity
2. Install dependencies `npm install`
3. Populate the default.cjs file with RS256 public and private JWT keys
   Generate new Keys: [JWT Keys Generator](https://travistidwell.com/jsencrypt/demo/)
4. Inside the config folder, in the development.json file, supply a secret that will be used for encrypting passwords. 
5. Start the server `npm start`
6. The API will be available at `http://localhost:1337`

## API Endpoints
### Products
| Method | Endpoint                      | Description                | Auth Required |
|--------|-------------------------------|----------------------------|---------------|
| POST   | `/api/products/`              | Create a new Product       | ✅ |
| GET    | `/api/products/:productId`    | Get a single product       | ✅ |
| PUT    | `/api/products/:productId`    | Update a product           | ✅ |
| DELETE | `/api/products/:productId`    | Delete a product           | ✅ |

### Sessions
| Method | Endpoint             | Description                    | Auth Required |
|--------|----------------------|--------------------------------|---------------|
| GET    | `/api/sessions/`     | Create all user sessions       | ✅ |
| POST   | `/api/sessions/`     | Update user session            | ✅ |
| DELETE | `/api/sessions/`     | Invalidate session and logout  | ✅ |

### Users
| Method | Endpoint          | Description                    | Auth Required |
|--------|-------------------|--------------------------------|---------------|
| POST   | `/api/users/`     | Create a User                  | ❌ |

### 
| Method | Endpoint          | Description                        | Auth Required |
|--------|-------------------|------------------------------------|---------------|
| GET   | `/healthcheck/`    | Confirm whether the API is running | ❌ |
