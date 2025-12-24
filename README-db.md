# DB: cómo localizar y probar la configuración en este proyecto

1) Buscar archivos relevantes:
- PowerShell:
  Get-ChildItem -Recurse -Force -Include ".env*","next.config.js","prisma/schema.prisma","*.php" | Select-Object FullName
- Bash:
  grep -R --line-number -E "DATABASE_URL|DB_HOST|DB_DATABASE|prisma|database.php" .

2) Si hay .env / .env.local:
- Abre el archivo y verifica `DATABASE_URL` o `DB_HOST` / `DB_DATABASE` / `DB_USERNAME` / `DB_PASSWORD`.

3) Probar conexión (ejemplos):
- PostgreSQL:
  psql "postgresql://user:password@host:5432/dbname"
- MySQL:
  mysql -u usuario -p -h host -P 3306 nombre_bd

4) Si usas Prisma:
- Revisa prisma/schema.prisma y corrige datasource url:
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }
- Migraciones:
  npx prisma migrate deploy
  npx prisma db pull

5) Si usas Laravel (PHP):
- Verifica config/database.php y .env, luego:
  composer install
  php artisan migrate

6) Buenas prácticas:
- Nunca subir .env con credenciales.
- Utiliza variables de entorno en Vercel (Project Settings > Environment Variables).
- Para tests locales, crea .env.local y rellena valores.

