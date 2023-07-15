version: "3.8"

services:
  postgres:
    container_name: manok_dot_dev_postgres
    image: postgres
    environment:
      POSTGRES_USER: "op://cli-$APP_ENV/db/username"
      POSTGRES_PASSWORD: "op://cli-$APP_ENV/db/password" # local only password
      PGDATA: /data/postgres
    volumes:
      - postgres:/data/postgres
    ports:
      - "5432:5432"
    networks:
      - manok_dot_dev_network
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready"]
      interval: 10s
      timeout: 5s
      retries: 5

  pgadmin:
    container_name: manok_dot_dev_pgadmin
    image: dpage/pgadmin4
    environment:
      PGADMIN_CONFIG_SERVER_MODE: "False"
    volumes:
      - pgadmin:/var/lib/pgadmin

    ports:
      - "${PGADMIN_PORT:-5050}:80"
    networks:
      - manok_dot_dev_network
    restart: unless-stopped

networks:
  manok_dot_dev_network:
    driver: bridge

volumes:
  postgres:
  pgadmin:
