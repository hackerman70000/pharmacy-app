FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

RUN pip install uv

COPY . .
RUN uv sync

ENV FLASK_APP=app.py
ENV FLASK_ENV=production

CMD uv run flask db upgrade && \
    uv run gunicorn --bind 0.0.0.0:5000 'app:create_app()'