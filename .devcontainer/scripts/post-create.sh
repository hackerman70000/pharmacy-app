#!/bin/bash

WORKSPACE_ROOT="/workspaces/pharmacy-app"

if [ ! -f "${WORKSPACE_ROOT}/backend/.env" ]; then
    echo "Setting up environment variables..."
    
    read -p "Enter Gmail address: " email
    echo "Enter Gmail app password: "
    read -s password
    echo

    cat > "${WORKSPACE_ROOT}/backend/.env" << ENVEOF
SECRET_KEY=$(openssl rand -base64 32)
TOKEN_SECRET_KEY=$(openssl rand -base64 32)
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=$email
MAIL_PASSWORD=$password
MAIL_DEFAULT_SENDER=$email
ENVEOF
fi

if [ -f "${WORKSPACE_ROOT}/frontend/package.json" ]; then
    echo "Installing frontend dependencies..."
    cd "${WORKSPACE_ROOT}/frontend"
    npm install
else
    echo "Error: ${WORKSPACE_ROOT}/frontend/package.json not found"
fi

if [ -f "${WORKSPACE_ROOT}/backend/pyproject.toml" ]; then
    echo "Installing backend dependencies..."
    cd "${WORKSPACE_ROOT}/backend"
    uv sync
else
    echo "Error: ${WORKSPACE_ROOT}/backend/pyproject.toml not found"
fi