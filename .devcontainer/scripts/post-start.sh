#!/bin/bash

WORKSPACE_ROOT="/workspaces/pharmacy-app"

if [ -f "${WORKSPACE_ROOT}/backend/pyproject.toml" ]; then
    echo "Running database migrations..."
    cd "${WORKSPACE_ROOT}/backend"
    uv run flask db upgrade
    uv run flask seed products
else
    echo "Error: ${WORKSPACE_ROOT}/backend/pyproject.toml not found"
fi