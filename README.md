# Pharmacy App

This project is a pharmacy application that includes user account management, product browsing, a shopping cart, and email notifications. It is designed to run on Docker and PostgreSQL with a Python backend built using Flask and React Native frontend built using Expo.

## Development

### Setup

Follow these steps to set up the project locally:

#### Access the Docker Environment

In VSCode, use the "Reopen in Container" option to seamlessly open the project inside the container.

#### Navigate to `/backend`

```bash
cd backend
```

#### Apply Migrations

Run the following command to apply existing database migrations:

```bash
uv run flask db upgrade
```

#### Run the Development Server

Start the Flask development server:

```bash
uv run flask run
```

---

### Database Management

#### Reset Database

To completely reset the database and its data:

```bash
uv run flask db downgrade base
uv run flask db upgrade
```

#### CLI Commands

Available custom CLI commands:

```bash
uv run flask seed products
```

### Tests

Run all tests:

```bash
uv run pytest
```

To run tests in the Docker container:

```bash
docker compose exec backend uv run pytest
```

## Frontend

To start developing the app all you need to do is:

### Navigate to `/frontend`

```bash
cd frontend
```

### Install all dependencies

```bash
npm install
```

### Starting the app

```bash
npx expo start -c
```

---

## Production deployment

Configure Environment Variables in `backend/.env` file with all necessary configuration and specify your host's IP address in `frontend` section of `docker-compose.yml`.

Build and start services:

```bash
docker compose up --build -d
```

Access the application at http://localhost (Port 80). All requests go through Nginx reverse proxy.
