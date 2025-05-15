#!/bin/sh

echo "🟢 Injecting runtime environment variables..."

envsubst < /usr/share/nginx/html/assets/env.template.json > /usr/share/nginx/html/assets/env.json

exec "$@"
