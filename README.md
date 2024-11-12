# Pharmacy App

This project is a pharmacy application that includes user account management, product browsing, a shopping cart, and email notifications. It is designed to run on Docker and PostgreSQL with a Python backend built using Flask.

---

## **Setup**

### **1. Virtual Environment Setup**

For managing Python dependencies, initialize and activate a virtual environment.

#### **Linux/macOS**

```bash
python3 -m venv venv
source venv/bin/activate
```

#### **Windows**

```bash
python -m venv venv
venv\Scripts\activate
```

### **2. Install Required Dependencies**

Once the virtual environment is activated, install the necessary Python packages:

```bash
cd backend
pip install -r requirements.txt
```

---

## **3. Database Setup**

### **Install PostgreSQL**

Make sure PostgreSQL is installed and running on your system.

#### **Linux/macOS (Using Homebrew)**

```bash
brew install postgresql
brew services start postgresql
```

#### **Windows**

Download PostgreSQL from the [official website](https://www.postgresql.org/download/) and follow the installation instructions.

### **Create a Database**

Access the PostgreSQL console:

```bash
psql postgres
```

Create the database for the project:

```sql
CREATE DATABASE pharmacy_db;
```

Access the database console:

```bash
psql pharmacy_db
```

To stop the PostgreSQL service (macOS):

```
ps aux | grep postgres
brew services stop postgresql
```

---

## **4. Flask Migrations**

Prepare the database schema by using Flask-Migrate:

1. Initialize migrations:
   ```bash
   flask db init
   ```
2. Create the initial migration:
   ```bash
   flask db migrate -m "Initial migration"
   ```
3. Apply the migration:
   ```bash
   flask db upgrade
   ```

---

## **5. Run the Application Locally**

To run the app locally (outside of Docker):

1. Activate the virtual environment.
2. Run the Flask app:
   ```bash
   flask run
   ```

The application will be available at `http://127.0.0.1:5000`.

---

## **6. Docker Installation**

### **Install Docker**

Download and install Docker Desktop from the [official Docker website](https://www.docker.com/products/docker-desktop).

Check if Docker is installed:

```bash
docker --version
```

---

## **7. Run the App in Docker**

Build and run the application using Docker Compose:

```bash
docker-compose up --build
```

This command will:

- Build the backend and frontend containers.
- Start the PostgreSQL container.
- Run the application.

---

## **Checking Database Connection**

To verify PostgreSQL is running:

```bash
psql postgres
```

You can use the `pharmacy_db` database created earlier for the app.
