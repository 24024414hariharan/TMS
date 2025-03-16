`# Software Architecture Project    ## Overview  This repository contains a full-stack application designed using **Domain-Driven Design (DDD)** and follows the **Microkernel architecture** pattern. The backend is built using **Node.js with TypeScript**, while the frontend is developed with **React and TypeScript**.   ## Key Features  -  **Microkernel Architecture** for a modular and scalable codebase. -  **DDD principles** to maintain a clean separation of concerns. -  **InversifyJS** for dependency injection. -  **Prisma ORM** for database management. -  **JWT-based authentication** for security. -  **React with TypeScript** for frontend development. -  **API communication via Axios** for client-server interaction. -  **Unit testing** with Jest and Testing Library.   ## Prerequisites  -  **Node.js** (>= 18.x) -  **npm** (>= 8.x) -  **PostgreSQL database**    ## Installation    ### Clone the Repository  ```sh git clone https://github.com/24024414hariharan/TMS.git cd TMS`

### Backend Setup (software-architecture)

1.  Navigate to the backend directory:

sh

Copy

`cd <backend-directory>`

1.  Install dependencies:

sh

Copy

`npm install`

1.  Configure environment variables:
    -   Create a `.env` file with the following configurations:

    Copy

    `NODE_ENV=development PORT=<port> JWT_SECRET=<your-secret> DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>`

2.  Run database migrations:

sh

Copy

`npx prisma migrate dev --name init`

**Note:** You can also run `npx prisma migrate dev` without a migration name to sync the existing migrations if they are already created.

1.  Start the backend server:

sh

Copy

`npm run dev`

### Frontend Setup (customer-support)

1.  Navigate to the frontend directory:

sh

Copy

`cd <frontend-directory>`

1.  Install dependencies:

sh

Copy

`npm install`

1.  Configure environment variables:
    -   Create a `.env` file with the following configuration:

    Copy

    `REACT_APP_API_DOMAIN=http://localhost:<port>`

2.  Start the frontend server:

sh

Copy

`npm start`

Scripts
-------

### Backend

json

Copy

`"scripts":  {    "build":  "tsc",    "start":  "node dist/src/index.js",    "dev":  "ts-node-dev --respawn --transpile-only src/server.ts",    "test":  "jest"  }`

### Frontend

json

Copy

`"scripts":  {    "start":  "react-scripts start",    "build":  "react-scripts build",    "test":  "react-scripts test",    "eject":  "react-scripts eject"  }`

Prisma Migrations
-----------------

Prisma is used to manage database schema and migrations.

### Initialize Prisma

sh

Copy

`npx prisma init`

### Create a Migration

sh

Copy

`npx prisma migrate dev --name <migration-name>`

**Note:** You can also run `npx prisma migrate dev` without a migration name to sync the existing migrations if they are already created.

### Apply Migrations

sh

Copy

`npx prisma migrate deploy`

### Generate Prisma Client

sh

Copy

`npx prisma generate`

### Reset Database

sh

Copy

`npx prisma migrate reset`

Development Workflow
--------------------

-   **Watch Mode**: Auto-recompile TypeScript files on changes

    sh

    Copy

    `npm run dev`

-   **Serve**: Run the compiled JavaScript files

    sh

    Copy

    `npm start`

Testing
-------

### Backend

-   Unit tests written with Jest.
-   Run tests with:

    sh

    Copy

    `npm test`

### Frontend

-   Uses React Testing Library and Jest.
-   Run tests with:

    sh

    Copy

    `npm test`

Contribution Guidelines
-----------------------

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature-branch`).
3.  Commit changes (`git commit -m 'Add new feature'`).
4.  Push to the branch (`git push origin feature-branch`).
5.  Open a Pull Request.

Code Maintainers
----------------

| Name | Student ID | Batch |
| --- | --- | --- |
| Hari Haran Rathinakumar | 24024414 | 2024-25 |
