#!/bin/bash
set -e

echo "Pull latest code"
git pull origin main

echo "Stop containers"
docker compose -f docker/docker-compose.yml down

echo "Rebuild and start containers"
docker compose -f docker/docker-compose.yml up -d --build

echo "Validate and reload nginx"
sudo nginx -t && sudo systemctl reload nginx

echo "SSL renew dry-run"
sudo certbot renew --dry-run

echo "Deploy complete"
