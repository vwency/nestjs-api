#!/bin/bash

until pg_isready -U "$POSTGRES_USER"; do
  echo "Waiting for PostgreSQL to start..."
  sleep 1
done

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --no-password <<-EOSQL
    CREATE DATABASE "$DATABASE_NAME";
EOSQL
