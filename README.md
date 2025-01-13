# Pharmacy App

A pharmacy application with features for user management, product browsing, shopping cart functionality, and email notifications. Built with a Flask backend and React Native frontend, running in Docker with PostgreSQL database.

## Development setup

Follow these steps to set up the project locally:

### Access the Docker Environment

In VSCode, use the "Reopen in Container" option to seamlessly open the project inside the container.

### Backend setup

```bash
cd backend
uv run flask run -h 0.0.0.0
```

### Frontend setup

```bash
cd frontend
npx expo start -c
```

Access the application at http://localhost (Port 8081).

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

---

## Production deployment

Configure Environment Variables in `backend/.env` file with all necessary configuration and specify your host's IP address in `frontend` section of `docker-compose.yml`.

Build and start services:

```bash
docker compose up --build -d
```

Access the application at http://localhost (Port 80). All requests go through Nginx reverse proxy.
