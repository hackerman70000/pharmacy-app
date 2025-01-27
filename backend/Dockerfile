FROM python:3.12-slim-bookworm

WORKDIR /app

RUN groupadd -r appgroup && useradd -r -g appgroup appuser

RUN apt-get update && apt-get install -y gcc \
    && rm -rf /var/lib/apt/lists/* \
    && mkdir -p /home/appuser/.cache \
    && chown -R appuser:appgroup /app \
    && chown -R appuser:appgroup /home/appuser

COPY pyproject.toml uv.lock ./
RUN pip install uv

USER appuser
RUN uv sync

COPY --chown=appuser:appgroup . .

ENV FLASK_APP=app.py
ENV FLASK_ENV=production

CMD uv run flask db upgrade && \
    uv run flask seed products && \
    uv run gunicorn --bind 0.0.0.0:5000 'app:create_app()'