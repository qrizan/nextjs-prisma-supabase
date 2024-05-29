## Project Management App

#### built with

| Tools    |                            |
| :------- | :------------------------- |
| NextJS   | https://nextjs.org         |
| Prisma   | https://www.prisma.io      |
| Flowbite | https://flowbite-react.com |
| Supabase | https://supabase.com       |
| etc      |                            |

## setup

#### tested on

```
rizan@linux ~/Projects/nextjs-prisma-supabase $ node -v
v20.13.0
rizan@linux ~/Projects/nextjs-prisma-supabase $ bun --version
1.1.9
rizan@linux ~/Projects/nextjs-prisma-supabase $

```

#### install dependencies

```
bun install
```

#### copy .env

```
copy .env.example .env
```

#### create database

> https://supabase.com/docs/guides/database/overview

#### generate NEXTAUTH_SECRET

```
openssl rand -base64 32
```

#### .env configuration

```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
NEXTAUTH_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### database migration

```
bunx prisma migrate dev --name init
```

#### data example

> data/SQL.txt

#### runnning

```
bun --watch run dev
```

#### screenshots

![dashboard](screenshots/dashboard.png)

![projects-list](screenshots/projects-list.png)

![project-detail](screenshots/project-detail.png)