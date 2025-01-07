# Next.js Microservice for Product Inventory

This project is a basic microservice built with Next.js that handles product updates and fetches product details. It integrates with a PostgreSQL database using Drizzle ORM.

## Project Structure

```
nextjs-microservice
├── src
│   ├── pages
│   │   ├── api
│   │   │   ├── products
│   │   │   │   ├── index.ts        # Handles GET and POST requests for products
│   │   │   │   ├── [id].ts         # Handles GET requests for product by ID
│   │   │   └── index.ts            # Health check endpoint
│   ├── db
│   │   ├── drizzle.ts              # Drizzle ORM configuration
│   │   └── schema.ts               # Database schema definition
│   └── types
│       └── index.ts                 # Type definitions for product items
├── package.json                     # Project dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # Project documentation
```

## Features

- **Fetch Products**: Retrieve a list of all product items.
- **Update Product by ID**: Update details of existing product items.
- **Fetch Product by ID**: Retrieve details of a specific product item using its ID.
- **Health Check**: Simple endpoint to check the health of the microservice.

## Getting Started

1. Clone the repository:

   ```
   git clone <repository-url>
   cd nextjs-microservice
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up your PostgreSQL database and configure the connection in `src/db/drizzle.ts`.

4. Run the development server:

   ```
   npm run dev
   ```

5. Access the API endpoints at `http://localhost:3000/api`.

## API Endpoints

- `GET /api/product`: Fetch all product items.
- `POST /api/product`: Update product items.
- `GET /api/product/:id`: Fetch product item by ID.
- `GET /api/health`: Check the health of the microservice.

## License

This project is licensed under the MIT License.
