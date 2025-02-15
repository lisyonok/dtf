#!/bin/sh

# Запуск миграции
npx prisma migrate deploy

# Запуск приложения
node dist/main.js 