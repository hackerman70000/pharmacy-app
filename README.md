# Pharmacy App

This project is a pharmacy application that includes user account management, product browsing, a shopping cart, and email notifications. It is designed to run on Docker and PostgreSQL with a Python backend built using Flask.

## Development

### Setup

Follow these steps to set up the project locally:

1. **Clone the Repository**

   Clone the project repository and navigate to the backend directory:

   ```bash
   git clone https://github.com/hackerman70000/pharmacy-app.git
   cd pharmacy-app/backend
   ```

2. **Create and Activate Virtual Environment**

   For macOS/Linux:

   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

   For Windows:

   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```

3. **Install Dependencies**

   Install the required Python packages:

   ```bash
   pip install -r requirements.txt
   ```

4. **Set Up Environment Variables**

   Create a `.env` file in the `backend` directory:

   ```bash
   touch .env
   ```

   Add the following content to your `.env` file:

   ```bash
   DATABASE_URL=postgresql://yourusername@localhost/pharmacy_db
   SECRET_KEY=your-secret-key-here
   ```

5. **Create the Database**

   Use the `createdb` command to create the PostgreSQL database:

   ```bash
   createdb pharmacy_db
   ```

6. **Apply Migrations**

   Run the following command to apply existing database migrations:

   ```bash
   flask db upgrade
   ```

7. **Run the Development Server**

   Start the Flask development server:

   ```bash
   flask run
   ```

---

### Development Workflow

1. Pull latest changes:

```bash
git pull origin main
```

2. Update dependencies:

```bash
pip install -r requirements.txt
```

3. Apply migrations:

```bash
flask db upgrade
```

4. Create new branch for feature:

```bash
git checkout -b feature/your-feature-name
```

5. Before committing:

Run these commands to ensure code quality:

```bash
# Format code with ruff
ruff format .
```

---

### Common Issues and Solutions

1. Database connection issues:

Check if PostgreSQL is running:

```bash
ps aux | grep postgres
```

Restart PostgreSQL (macOS):

```bash
brew services restart postgresql
```

2. Migration issues:

To reset migrations:

```bash
rm -rf migrations/
flask db init
flask db migrate -m "Reset migrations"
flask db upgrade
```
