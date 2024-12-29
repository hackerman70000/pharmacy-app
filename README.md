# Pharmacy App

This project is a pharmacy application that includes user account management, product browsing, a shopping cart, and email notifications. It is designed to run on Docker and PostgreSQL with a Python backend built using Flask.

## Development

### Setup

Follow these steps to set up the project locally:

#### 1. **Clone the Repository**

Clone the project repository and navigate to the backend directory:

```bash
git clone https://github.com/hackerman70000/pharmacy-app.git
```

#### 2. Access the Docker Environment

For an optimal development experience, it is recommended to use Visual Studio Code with the Dev Containers extension.

You can access the container in two ways:

1. **Reopen in Container**: In VSCode, use the "Reopen in Container" option to seamlessly open the project inside the container.
   - During container creation, you'll be prompted to enter e-mail credentials for the email notification system

2. **Access via Terminal**: Alternatively, you can connect to the container directly through the terminal using the appropriate Docker commands.

#### 3. **Create the Database**

Use the `createdb` command to create the PostgreSQL database:

```bash
createdb pharmacy_db
```

#### 4. **Navigate to `/backend`**

```bash
cd backend
```

#### 5. **Apply Migrations**

Run the following command to apply existing database migrations:

```bash
uv run flask db upgrade
```

#### 6. **Run the Development Server**

Start the Flask development server:

```bash
uv run flask run
```

---

### Database Management

#### Reset Database

To completely reset the database and its data:

```bash
uv run flask db downgrade base  # Go back to empty state
uv run flask db upgrade        # Recreate all tables
uv run flask seed products     # Reseed with example data
```

#### CLI Commands

Available custom CLI commands:

```bash
uv run flask seed products     # Add example pharmacy products to the database
```

#### PostgreSQL Database

To inspect the database directly using PostgreSQL CLI:

1. Connect to the database:

```bash
psql pharmacy_db
```

2. Useful PostgreSQL commands:

```sql
\l        # List all databases
\dt       # List all tables in the current database
\d TABLE  # Describe table structure
\du       # List all users and their roles
\q        # Quit psql
```

Example queries:

```sql
SELECT * FROM users;           # View all users
SELECT * FROM products;        # View all products
SELECT * FROM cart;           # View all cart items
```

---

### Common Issues and Solutions

1. Migration issues:

To reset migrations:

```bash
rm -rf migrations/
uv run flask db init
uv run flask db migrate -m "Reset migrations"
uv run flask db upgrade
```

2. **Order Email Notifications**:
   If order confirmation emails are not being received:
   - Check your spam folder
   - Verify email credentials in .env file
   - Ensure the Gmail App Password is correct
   - Check the application logs for email-related errors