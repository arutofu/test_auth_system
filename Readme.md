# Как работает

Основные команды

- backend

  ```bash
  cd backend
  npm install
  ```

- frontend

  ```bash
  cd frontend
  npm install
  ```

- Запуск контейнера

  ```bash
  docker compose up -d
  ```

- Пересборка при изменении backend или Dockerfile

  ```bash
  docker compose up -d --build
  ```

- Остановка контейнера

  ```bash
  docker compose down
  ```

- Сброс БД

  ```bash
  docker compose down -v
  ```

- Логи backend

  ```bash
  docker compose logs -f backend
  ```

- Локальный запуск frontend

  ```bash
  cd frontend
  npm run dev
  ```

## Типовой рабочий сценарий

- Запустить backend + БД

  ```bash
  docker compose up -d
  ```

- Запустить frontend

  ```bash
  cd frontend
  npm run dev
  ```

- Открыть [localhost:5173](http://localhost:5173)

## Якоря

- [Как работает](#как-работает)
  - [Типовой рабочий сценарий](#типовой-рабочий-сценарий)
  - [Якоря](#якоря)
  - [Что есть что?](#что-есть-что)
    - [NestJs](#nestjs)
    - [TypeORM](#typeorm)
    - [PostgreSQL](#postgresql)
    - [React](#react)
    - [TypeScript](#typescript)
    - [Mantine](#mantine)
    - [Docker Compose](#docker-compose)
  - [Что делать?](#что-делать)
    - [1. Node.js](#1-nodejs)
    - [2. NestJS](#2-nestjs)
    - [3. React](#3-react)
    - [4. Подключить основные Mantine пакеты](#4-подключить-основные-mantine-пакеты)
    - [5. Docker Desktop](#5-docker-desktop)
    - [6. Docker Compose](#6-docker-compose)
    - [6.1. Docker Compose поднимает БД + backend](#61-docker-compose-поднимает-бд--backend)
    - [7. Подключить PostgreSQL к NestJS через TypeORM](#7-подключить-postgresql-к-nestjs-через-typeorm)
    - [8. Настройка TypeORM](#8-настройка-typeorm)
    - [8.1 Запуск после настройки](#81-запуск-после-настройки)
    - [8.2 Сущность - user](#82-сущность---user)
    - [8.3 UserModule](#83-usermodule)
    - [8.4 UserService](#84-userservice)
    - [8.5 Подключить UsersModule в AppModule](#85-подключить-usersmodule-в-appmodule)
    - [8.6 Проверка БД](#86-проверка-бд)
    - [9 Создание admin при запуске приложения](#9-создание-admin-при-запуске-приложения)
    - [9.1 Хеширование паролей](#91-хеширование-паролей)
    - [9.2 Создем admin, если его нет](#92-создем-admin-если-его-нет)
    - [9.3 Создание admin в OnModuleInit](#93-создание-admin-в-onmoduleinit)
    - [9.4 Подключить init-класс в UsersModule как provider](#94-подключить-init-класс-в-usersmodule-как-provider)
    - [9.5 Подключить init-класс в UsersModule как provider](#95-подключить-init-класс-в-usersmodule-как-provider)
      - [9.6 Подключить init-класс в UsersModule как provider](#96-подключить-init-класс-в-usersmodule-как-provider)
      - [9.7 NestJS Validation](#97-nestjs-validation)
      - [9.8 Включить глобальную валидацию (ValidationPipe)](#98-включить-глобальную-валидацию-validationpipe)
    - [9.9 Создать AuthModule](#99-создать-authmodule)
    - [9.10 JwtGuard](#910-jwtguard)
    - [9.11 Разделение прав](#911-разделение-прав)
    - [9.12 Подключаем в UserModule](#912-подключаем-в-usermodule)
    - [9.13 Подключаем JwtModule в users.module.ts](#913-подключаем-jwtmodule-в-usersmodulets)
    - [9.14 Подключаем JwtModule в admin.module.ts](#914-подключаем-jwtmodule-в-adminmodulets)
    - [9.15 Cписок пользователей только для admin](#915-cписок-пользователей-только-для-admin)
    - [10 Страницы](#10-страницы)
    - [11 Стили](#11-стили)
    - [12 Трудности](#12-трудности)
    - [13 Ошибки](#13-ошибки)
    - [13 Времязатраты](#13-времязатраты)

## Что есть что?

### NestJs

- [NestJS](https://docs.nestjs.com/) - фреймворк для построения масштабируемых серверных приложений на Node.js с архитектурой, вдохновлённой Angular.

- "Out-of-the-box application architecture" - встроенная модульная архитектура (modules, controllers, providers), упрощающая поддержку и масштабирование приложения.

### TypeORM

- [TypeORM](https://typeorm.io/docs/getting-started) is an ***ORM*** that can run in Node.js... platforms and can be used with TypeScript and JavaScript. </br>
  - [ORM - Object–relational mapping.](https://en.wikipedia.org/wiki/Object–relational_mapping) Объектно-реляционное отображение. Технология программирования, которая связывает базы данных с концепциями объектно-ориентированных языков программирования. </br>
  > ORM позволяет работать с данными в терминах объектов и классов, автоматически формируя SQL-запросы, при этом не запрещая использовать "чистый" SQL при необходимости.

> Обеспечивает работу с данными в терминах классов, а не таблиц данных, и, напротив, преобразовывает термины и данные классов в данные, пригодные для хранения в СУБД. "***Избавляет от написания большого количества кода, часто однообразного и подверженного ошибкам.***" [(wikipedia)](https://ru.wikipedia.org/wiki/ORM).

### PostgreSQL

- [PostgreSQL](https://www.postgresql.org/) ***объектно-реляционная*** СУБД с открытым исходным кодом.
  - Объектно-реляционная СУБД - СУБД, похожая на ***реляционную базу данных***, но с объектно-ориентированной моделью: объекты, классы и наследование напрямую поддерживаются в схемах баз данных и в языке запросов. </br>
    >Объектно-реляционная означает, что помимо классической реляционной модели PostgreSQL поддерживает расширенные типы данных, наследование таблиц, пользовательские типы и функции, что позволяет ближе интегрировать БД с объектной моделью приложения.
    - Реляционная база данных - это составленная по ***реляционной модели база данных***, в которой данные, занесенные в таблицы, имеют изначально заданные отношения. </br>
        >Отношения состоят из заголовка (столбца) и тела (строки).

### React

- [The library for web and native user interfaces](https://react.dev/)
- "lets you build user interfaces out of individual pieces called components"

>React - библиотека для построения пользовательских интерфейсов, основанная на компонентном подходе.

### TypeScript

- [TypeScript is JavaScript with syntax for types](https://www.typescriptlang.org/)
  - Возможность явного статического назначения типов
  - Поддержка использования полноценных классов
  - Поддержка подключения модулей

>TypeScript снижает количество ошибок на этапе разработки за счёт статической типизации и улучшает поддержку кода в больших проектах.

### Mantine

- [React components library](https://mantine.dev/)
- "includes everything you need to create complex web applications"

>Mantine - библиотека UI-компонентов для React, предоставляющая готовые элементы интерфейса, систему темизации и инструменты для работы с формами и состоянием.

### Docker Compose

- [Docker Compose is a tool for defining and running multi-container applications](https://docs.docker.com/compose/)
- "simplifies the control of your entire application stack, making it easy to manage services, networks, and volumes in a single YAML configuration file"

## Что делать?

### 1. Node.js

- [X] **[Node.js](https://nodejs.org/en/download)**

### 2. NestJS

- [X] **[NestJS](https://docs.nestjs.com/first-steps)**

    ```bash
    npm i -g @nestjs/cli
    nest new backend
    ```

    [Проверка](https://docs.nestjs.com/cli/overview)

    ```bash
    cd backend
    npm run start:dev
    ```

    Приложение находится на [localhost:3000](http://localhost:3000)

### 3. React

- [X] **[React](https://react.dev/) и TypeScript как зависимость (React + TypeScript шаблон)**

    Согласно "[Build a React App from Scratch](https://react.dev/learn/build-a-react-app-from-scratch)"

    ```bash
    npm create vite@latest frontend - -template react-ts
    ```

    Далее по [инструкции](https://vite.dev/guide/)

    ```bash
    npm install
    npm run dev
    ```

    Приложение находится на [localhost:5173](http://localhost:5173/)

### 4. Подключить основные Mantine пакеты

- [X] **Подключить [основные Mantine пакеты](https://mantine.dev/guides/vite/)**

    ```bash
    npm install @mantine/core @mantine/hooks
    ```

### 5. Docker Desktop

- [X] **Docker Desktop**

### 6. Docker Compose

- [X] **Docker Compose**

    [Example compose.yaml for postgres:](https://hub.docker.com/_/postgres)

    ```yml
    services:

      db:
          image: postgres
          restart: always
          # set shared memory limit when using docker compose
          shm_size: 128mb
          # or set shared memory limit when deploy via swarm stack
          #volumes:
          #  - type: tmpfs
          #    target: /dev/shm
          #    tmpfs:
          #      size: 134217728 # 128*2^20 bytes = 128Mb
          environment:
            POSTGRES_PASSWORD: example

      adminer:
          image: adminer
          restart: always
          ports:
          - 8080:8080
    ```

    [compose](https://docs.docker.com/reference/compose-file/services/#ports):

    ```yml
    services:

      db:
          image: postgres
          restart: always
          # set shared memory limit when using docker compose
          shm_size: 128mb
          # or set shared memory limit when deploy via swarm stack
          #volumes:
          #  - type: tmpfs
          #    target: /dev/shm
          #    tmpfs:
          #      size: 134217728 # 128*2^20 bytes = 128Mb
          environment:
            POSTGRES_USER: test_usr
            POSTGRES_PASSWORD: test_pass
            POSTGRES_DB: test_db
          ports:
          - 1234:1234

      adminer:
          image: adminer
          restart: always
          ports:
          - 8080:8080
    ```

    "If you need to re-initialize or change settings, make sure to remove or re-create the volume first."

    ```bash
    docker compose down -v
    docker compose up -d
    ```

### 6.1. Docker Compose поднимает БД + backend

- [X] **Docker Compose поднимает БД + backend**

  [Dockerfile](https://docs.nestjs.com/deployment) /Project/backend/Dockerfile:

  ```dockerfile
  FROM node:20-alpine
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci
  COPY . .
  RUN npm run build
  EXPOSE 3000
  CMD ["node", "dist/main.js"]
  ```

  /Project/docker-compose.yml:

  ```.yml
  services:
    db:
      image: postgres
      restart: always
      environment:
        POSTGRES_USER: test_usr
        POSTGRES_PASSWORD: test_pass
        POSTGRES_DB: test_db
      ports:
        - "1234:5432"

    adminer:
      image: adminer
      restart: always
      ports:
        - "8080:8080"

    backend:
      build: ./backend
      restart: always
      env_file:
        - ./backend/.env
      ports:
        - "3000:3000"
      depends_on:
        - db
  ```

  ```bash
  docker compose up -d -build
  ```

### 7. Подключить PostgreSQL к NestJS через TypeORM

- [X] **Подключить PostgreSQL к NestJS через TypeORM согласно [TypeORM Integration](https://docs.nestjs.com/techniques/database)**

    ```bash
    cd backend
    npm i @nestjs/typeorm typeorm pg
    ```

### 8. Настройка TypeORM

- [X] **Настройка TypeORM**

    [По умолчанию](https://hub.docker.com/_/postgres) user=postgres, db=postgres, пароль=example

    "A good approach ... is to **create a ConfigModule** that exposes a **ConfigService** which loads the appropriate **.env file**."

    "we first install the required dependency":

    ```bash
    npm install -save @nestjs/config
    ```

    "A sample .env file looks something like this" + "[Suported Environment Variables](https://hub.docker.com/r/postgis/postgis)":

    ```.env
    DATABASE_USER=example
    DATABASE_PASSWORD=example
    ```

    Актуальный .env

    ```.env
    DATABASE_USER=test_usr
    DATABASE_PASSWORD=test_pass
    DATABASE_DB=test_db
    DATABASE_PORT=1234
    DATABASE_HOST=db
    ```

    "When you want to use ConfigModule in other modules, you'll need to import it":

    ```typescript
    import { Module } from '@nestjs/common';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    import { ConfigModule } from '@nestjs/config';  //

    @Module({
    // Загрузка .env в process.env
    imports: [ConfigModule.forRoot({    //
        isGlobal: true,                 //
        })],                            //
    controllers: [AppController],
    providers: [AppService],
    })
    export class AppModule {}
    ```

    Согласно [TypeORM Integration](https://docs.nestjs.com/techniques/database)
    и [Data Source Options example](https://typeorm.io/docs/data-source/data-source-options/), **app.module.ts**:

    ```typescript
    import { Module } from '@nestjs/common';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    import { ConfigModule } from '@nestjs/config';    //
    import { TypeOrmModule } from '@nestjs/typeorm';  //

    @Module({
        // "merge key/value pairs from the .env file" https://docs.nestjs.com/techniques/configuration
        imports:[
        ConfigModule.forRoot({    //
            isGlobal: true,         //
            }),                     //
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),  // Type 'string' is not assignable to type 'number'.ts(2322)
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DB,
            entities: [],
            synchronize: true,  // "Setting synchronize: true shouldn't be used in production - otherwise you can lose production data"
            autoLoadEntities: true, // entities - "classes that map to database tables" (https://typeorm.io/docs/entity/entities/)
                                    // user 
        }),
        ],
    controllers: [AppController],
    providers: [AppService],
    })
    export class AppModule {}
    ```

### 8.1 Запуск после настройки

- [X] **Запуск после настройки**

  ```bash
  npm run start:dev
  ```

### 8.2 Сущность - user

- [X] **[Сущность](https://typeorm.io/entities) - user**

  ```typescript
  import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

  @Entity()
  export class User {
      @PrimaryGeneratedColumn()
      id: number

      @Column()
      firstName: string

      @Column()
      lastName: string

      @Column()
      isActive: boolean
  }
  ```

  | user        |              |                            |
  |-------------|--------------|----------------------------|
  | id          | int          | PRIMARY KEY AUTO_INCREMENT |
  | firstName   | varchar(255) |                            |
  | lastName    | varchar(255) |                            |
  | isActive    | boolean      |                            |

### 8.3 UserModule

- [X] **[UserModule](https://docs.nestjs.com/techniques/database#repository-pattern)**

  Example:

  ```typescript
  import { Module } from '@nestjs/common';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { UsersService } from './users.service';
  import { UsersController } from './users.controller';
  import { User } from './user.entity';

  @Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
  })
  export class UsersModule {}
  ```

### 8.4 UserService

- [X] **[UserService](https://docs.nestjs.com/techniques/database#repository-pattern)**

  Example:

  ```typescript
  import { Injectable } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { User } from './user.entity';

  @Injectable()
  export class UsersService {
      constructor(
          @InjectRepository(User)
          private usersRepository: Repository<User>,
      ) {}

      findAll(): Promise<User[]> {
          return this.usersRepository.find();
      }

      findOne(id: number): Promise<User | null> {
          return this.usersRepository.findOneBy({ id });
      }

      async remove(id: number): Promise<void> {
          await this.usersRepository.delete(id);
      }
  }
  ```

### 8.5 Подключить UsersModule в AppModule

- [X] **Подключить UsersModule в AppModule**

  ```typescript
  imports: [
  // ...
  UsersModule,
  ],
  ```

### 8.6 Проверка БД

- [X] **Проверка БД>**

  [localhost:8080](http://localhost:8080) </br>
  Username: test_usr  </br>
  Password: test_pass </br>
  Database: test_db   </br>

### 9 Создание admin при запуске приложения

- [X] **Создание admin при запуске приложения**

    .env:

    ```.env
    FIRST_ADMIN_EMAIL=admin@example.com
    FIRST_ADMIN_PASSWORD=admin12345
    ```

### 9.1 Хеширование паролей

- [X] **Хеширование паролей по [инструкции](https://docs.nestjs.com/security/encryption-and-hashing)**

  ```bash
  npm i bcrypt
  npm i -D @types/bcrypt
  ```

### 9.2 Создем admin, если его нет

- [X] **Создем admin, если его нет**

  Согласно [документации TypeORM API](https://typeorm.io/docs/working-with-entity-manager/repository-api/) мы можем:

- Посчитать записи по условию **repository.count**
- Создать запись **repository.create**
- И сохранить запись **repository.save**

  Добавим в **users.service.ts** импорты:

  ```typescript
  import * as bcrypt from 'bcrypt';
  import { UserRole } from './user.entity';
  ```

  И функцию проверки:

  ```typescript
  async ensureFirstAdmin(email: string, password: string) {
      const adminsCount = await this.usersRepo.count({ where: { role: UserRole.ADMIN } });
      if (adminsCount > 0) return;

  const passwordHash = await bcrypt.hash(password, 10);

  await this.usersRepo.save(
      this.usersRepo.create({
      email,
      passwordHash,
      role: UserRole.ADMIN,
      }),
  );
  ```

### 9.3 Создание admin в OnModuleInit

- [X] **Создание admin в **OnModuleInit** согласно [Lifecycle Events](https://docs.nestjs.com/fundamentals/lifecycle-events)**

  В **users.init.ts**:

  ```typescript
  import { Injectable, OnModuleInit } from '@nestjs/common';
  import { UsersService } from './users.service';

  @Injectable()
  export class UsersInit implements OnModuleInit {
      constructor(private readonly usersService: UsersService) {}

      async onModuleInit() {
          const email = process.env.FIRST_ADMIN_EMAIL;
          const password = process.env.FIRST_ADMIN_PASSWORD;

          if (!email || !password) return;

          await this.usersService.ensureFirstAdmin(email, password);
      }
  }
  ```

### 9.4 Подключить init-класс в UsersModule как provider

- [X] **Подключить init-класс в UsersModule как provider**

  >[Чтобы Nest создал экземпляр UsersInit и вызвал lifecycle hook, класс должен быть зарегистрирован как provider в модуле.](https://docs.nestjs.com/providers)

  В **users.module.ts**:

  ```typescript
  import { UsersInit } from './users.init';
  ...
  providers: [UsersService, UsersInit],
  ```

  Проверим:

  ```bash
  docker compose down -v
  docker compose up -d
  npm run start:dev
  ```

  ```bash
  [Nest] 42164 LOG FIRST_ADMIN_EMAIL=admin@example.com
  [Nest] 42164 LOG FIRST_ADMIN_PASSWORD=admin12345
  [Nest] 42164 LOG Admin already exist
  ```

### 9.5 Подключить init-класс в UsersModule как provider

- [X] **Register/login, JWT, Validation согласно [документации](https://docs.nestjs.com/security/authentication)**

#### 9.6 Подключить init-класс в UsersModule как provider

- [X] **@nestjs/jwt и @nestjs/passport для JWT-авторизации**

  ```bash
  npm install @nestjs/jwt @nestjs/passport passport passport-jwt
  npm install -D @types/passport-jwt
  ```

#### 9.7 NestJS Validation

- [X] **[NestJS Validation](https://docs.nestjs.com/techniques/validation)**

  ```bash
  npm i class-validator class-transformer
  ```

#### 9.8 Включить глобальную валидацию (ValidationPipe)

- [X] **Включить глобальную валидацию (ValidationPipe)**

  ```typescript
  import { ValidationPipe } from '@nestjs/common';
  ...
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // удаляет лишние поля
      forbidNonWhitelisted: true, // ругается на лишние поля
      transform: true,            // преобразует типы
    }),
  );
  ```

### 9.9 Создать AuthModule

- [X] **Создать AuthModule согласно [документации1 (authentication)](https://docs.nestjs.com/security/authentication), [документации2 (modules)](https://docs.nestjs.com/modules) и [документации3 (class-validator)]([class-validator](https://github.com/typestack/class-validator))**

  backend/src/auth/dto/register.dto.ts:

  ```typescript
  import { IsEmail, MinLength } from 'class-validator';

  export class RegisterDto {
    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;
  }
  ```

  backend/src/auth/dto/login.dto.ts

  ```typescript
  import { IsEmail, MinLength } from 'class-validator';

  export class LoginDto {
    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;
  }
  ```

  [AuthService](https://docs.nestjs.com/security/authentication). auth.service.ts:

  ```typescript
  import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
  import * as bcrypt from 'bcrypt';
  import { UsersService } from '../users/users.service';
  import { JwtService } from '@nestjs/jwt';
  import { UserRole } from '../users/user.entity';

  @Injectable()
  export class AuthService {
    constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService,
    ) {}

    async register(email: string, password: string) {
      const existing = await this.usersService.findByEmail(email);
      if (existing) throw new ConflictException('Email already registered');

      const passwordHash = await bcrypt.hash(password, 10);

      const user = await this.usersService.createUser({
        email,
        passwordHash,
        role: UserRole.USER,
      });

      return this.signToken(user.id, user.email, user.role);
    }

    async login(email: string, password: string) {
      const user = await this.usersService.findByEmail(email);
      if (!user) throw new UnauthorizedException('Invalid credentials');

      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) throw new UnauthorizedException('Invalid credentials');

      return this.signToken(user.id, user.email, user.role);
    }

    private signToken(userId: number, email: string, role: string) {
      const payload = { sub: userId, email, role };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
  ```

  [AuthController](https://docs.nestjs.com/security/authentication). auth.controller.ts:

  ```typescript
  import { Body, Controller, Post } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { RegisterDto } from './dto/register.dto';
  import { LoginDto } from './dto/login.dto';

  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() dto: RegisterDto) {
      return this.authService.register(dto.email, dto.password);
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
      return this.authService.login(dto.email, dto.password);
    }
  }
  ```

  Добавим его в app.module.ts:

  ```typescript
  import { AuthModule } from './auth/auth.module';
  ...
  imports: [
    AuthModule,
  ]
  ```

  [AuthModule](https://docs.nestjs.com/security/authentication). auth.module.ts:

  ```typescript
  import { Module } from '@nestjs/common';
  import { JwtModule } from '@nestjs/jwt';
  import { UsersModule } from '../users/users.module';
  import { AuthService } from './auth.service';
  import { AuthController } from './auth.controller';

  @Module({
    imports: [
      UsersModule,
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
      }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
  })
  export class AuthModule {}
  ```

### 9.10 JwtGuard

- [X] **[JwtGuard](https://docs.nestjs.com/guards)**

  backend/src/auth/jwt.guard.ts согласно [документации (authentication)](https://docs.nestjs.com/security/authentication):

  ```typescript
  import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';

  @Injectable()
  export class JwtGuard implements CanActivate {
    constructor(private readonly jwt: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
      const req = context.switchToHttp().getRequest();

      const auth = req.headers['authorization'] as string | undefined;
      const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;

      if (!token) throw new UnauthorizedException('Missing Bearer token');

      try {
        const payload = this.jwt.verify(token); // проверяет подпись + exp
        req.user = payload;                    // сохраняем payload в request
        return true;
      } catch {
        throw new UnauthorizedException('Invalid token');
      }
    }
  }
  ```

### 9.11 Разделение прав

- [X] **Разделение прав. Отдельный guard, чтобы не смешивать**

  backend/src/auth/admin.guard.ts:

  ```typescript
  import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';

  @Injectable()
  export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const req = context.switchToHttp().getRequest();
      const role = req.user?.role;

      if (role !== 'admin') throw new ForbiddenException('Admin only');
      return true;
    }
  }
  ```

  [backend/src/users/users.controller.ts](https://docs.nestjs.com/controllers):

  ```typescript
  import { Controller, Get, Req, UseGuards } from '@nestjs/common';
  import { JwtGuard } from '../auth/jwt.guard';

  @Controller()
  export class UsersController {
    @UseGuards(JwtGuard)
    @Get('me')
    me(@Req() req: any) {
      return {
        id: req.user.sub,
        email: req.user.email,
        role: req.user.role,
      };
    }
  }
  ```

### 9.12 Подключаем в UserModule

- [X] **Подключаем в UserModule**

  ```typescript
  import { UsersController } from './users.controller';
  ...
  @Module({
  controllers: [UsersController],
  })
  ```

### 9.13 Подключаем JwtModule в users.module.ts

- [X] **Подключаем JwtModule в users.module.ts**

```typescript
import { JwtModule } from '@nestjs/jwt';
...
JwtModule.register({
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: (process.env.JWT_EXPIRES_IN ?? '1h') as any },
}),
  ```

### 9.14 Подключаем JwtModule в admin.module.ts

- [X] **Подключаем JwtModule в admin.module.ts**

```typescript
import { JwtModule } from '@nestjs/jwt';
...
JwtModule.register({
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: (process.env.JWT_EXPIRES_IN ?? '1h') as any },
}),
```

### 9.15 Cписок пользователей только для admin

- [X] **Cписок пользователей только для admin**

  "Обычные пользователи не могут получить доступ к списку ни через интерфейс, ни через API."

  Определенно точно не стоит отдавать passwordHash

  Согласно [controllers](https://docs.nestjs.com/controllers) и [guards](https://docs.nestjs.com/guards) **backend/src/admin/admin.controller.ts**

  ```typescript
  import { Controller, Get, UseGuards } from '@nestjs/common';
  import { UsersService } from '../users/users.service';
  import { JwtGuard } from '../auth/jwt.guard';
  import { AdminGuard } from '../auth/admin.guard';

  @Controller('admin')
  export class AdminController {
    constructor(private readonly users: UsersService) {}

    @UseGuards(JwtGuard, AdminGuard)
    @Get('users')
    async listUsers() {
      const list = await this.users.findAll();
      return list.map(u => ({
        id: u.id,
        email: u.email,
        role: u.role,
        createdAt: u.createdAt,
      }));
    }
  }
  ```

  backend/src/admin/admin.module.ts:

  ```typescript
  import { Module } from '@nestjs/common';
  import { UsersModule } from '../users/users.module';
  import { AdminController } from './admin.controller';

  @Module({
    imports: [UsersModule],
    controllers: [AdminController],
  })
  export class AdminModule {}
  ```

  Добавим его в app.module.ts:

  ```typescript
  import { AdminModule } from './admin/admin.module';
  ...
  imports: [
    AdminModule,
  ]
  ```

### 10 Страницы

- [X] **10 Страницы**

  - Используем готовый шаблон

    В корневой директории:

    ```bash
    cd frontend
    npm install @mantine/form @mantine/core @mantine/hooks
    npm install react-router-dom
    ```

    Разрешает ли backend запросы с rontend </br>
    backend/src/main.ts:

    ```typescript
    app.enableCors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    });
    ```
  
  - Создадим:
    - src/auth.ts - хранение токена
    - src/api.ts - запросы к backend
      - Используя Mantine компоненты:
        - src/pages/LoginPage.tsx
        - src/pages/RegisterPage.tsx
        - src/pages/ProfilePage.tsx
        - src/pages/AdminUsersPage.tsx
    - src/App.tsx - роутинг:

      ```typescript
      // import { StrictMode } from 'react'
      // import { createRoot } from 'react-dom/client'
      import './index.css'
      import App from './App.tsx'

      import React from 'react';
      import ReactDOM from 'react-dom/client';
      import { MantineProvider } from '@mantine/core';
      import { BrowserRouter } from 'react-router-dom';

      // createRoot(document.getElementById('root')!).render(
      //   <StrictMode>
      //     <App />
      //   </StrictMode>,
      // )

      ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
          <MantineProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </MantineProvider>
        </React.StrictMode>
      ```

    - src/ProtectedRoute.tsx:

      ```typescript
      import { Navigate } from 'react-router-dom';
      import { auth } from './auth';

      export function ProtectedRoute({ children }: { children: JSX.Element }) {
        const token = auth.getToken();
        if (!token) return <Navigate to="/login" replace />;
        return children;
      }
      ```

    - src/AdminRoute.tsx:

    ```typescript

    ```

    - src/main.tsx - createRoot:

      ```typescript
      import { Routes, Route, Navigate } from 'react-router-dom';
      import { LoginPage } from './pages/LoginPage';
      import { RegisterPage } from './pages/RegisterPage';
      import { ProfilePage } from './pages/ProfilePage';
      import { AdminUsersPage } from './pages/AdminUsersPage';
      import { ProtectedRoute } from './ProtectedRoute';
      import { AdminRoute } from './AdminRoute';

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminUsersPage />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div>Not found</div>} />
      </Routes>
      ```

### 11 Стили

- [X] **11 Стили**

  - Подключить стили Mantine

    В **frontend/src/main.tsx**:

    ```typescript
    import '@mantine/core/styles.css';
    ```

  - Убрать стили Vite-шаблона

    В **frontend/src/index.css** заменить html и body:

    ```typescript
    html, body {
      height: 100%;
    }

    body {
      margin: 0;
    }
    ```

  - Убрать подключение App.css

    В **frontend/src/App.tsx** закомментировать/удалить:

    ```typescript
    import './App.css'
    ```

### 12 Трудности

- Поиск информации
- Установка и настройка
  - React - способы установки
  - Mantine - способы установки
  - Docker Compose / PostgreSQL - трудно читаемая [документация](https://hub.docker.com/_/postgres), в которой сложно разобраться
  - Настройка Jwt

### 13 Ошибки

- 1 Неправильный порт

    ```bash
    npm run start:dev

    [Nest] 38164 ERROR [TypeOrmModule] Unable to connect to the database. Retrying (1)...
    ```

    docker-compose.yml:

    ```bash
    ports:
  - 1234:1234
    ```

  - Исправление:

    HOST_PORT:CONTAINER_PORT. Postgres стандартно слушает 5432 в контейнере

    ```bash
    ports:
      - "1234:5432"
    ```

- 2 Jwt

  ```bash
  [Nest] 3720 ERROR [ExceptionHandler] UnknownDependenciesException [Error]: Nest can't resolve dependencies of the JwtGuard (?). Please make sure that the argument JwtService at index [0] is available in the UsersModule context.
  ```

  В users.module.ts добавить JwtModule.register

  ```typescript
  import { JwtModule } from '@nestjs/jwt';
  ...
  TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
  }),
  ```

  ```typescript
  expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
  ```

  Дает ошибку:

  ```bash
  Type 'string' is not assignable to type 'number | StringValue | undefined'.ts(2322)
  ```

  Решение:

  ```typescript
  expiresIn: (process.env.JWT_EXPIRES_IN ?? '1h') as any,
  ```

### 13 Времязатраты

- 5 часов </br>
    Изучение
- 8 часов </br>
    Backend
- 3 часа </br>
    Frontend
