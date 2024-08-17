# Pokémon Battle App

Pokémon Battle App es una aplicación web que permite a los usuarios seleccionar Pokémon, iniciar batallas y ver los resultados en tiempo real.
El proyecto está dividido en dos partes: el backend, que maneja la lógica de las batallas y el almacenamiento de datos, y el frontend, que proporciona una interfaz de usuario interactiva.

## Características

- **Selección de Pokémon:** Los usuarios pueden seleccionar su Pokémon favorito para la batalla.
- **Batalla Aleatoria:** Los usuarios pueden seleccionar un oponente aleatorio para la batalla.
- **Iniciar Batalla:** Los usuarios pueden iniciar una batalla entre dos Pokémon y ver los resultados en tiempo real.

## Tecnologías Utilizadas

- **Backend:**
  - [NestJS](https://nestjs.com/)
  - [TypeORM](https://typeorm.io/)
  - [SQLite](https://www.sqlite.org/index.html)

- **Frontend:**
  - [React](https://reactjs.org/)
  - [Material-UI](https://mui.com/)
  - [Axios](https://axios-http.com/)

## Requisitos Previos

- Node.js (versión 14.x o superior)
- npm o yarn
- SQLite (preinstalado con Node.js)
- CLI de NestJs: npm install -g @nestjs/cli
- CLI de Typeorm: npm i -g typeorm

## Instrucciones de Instalación
- Instalar CLI de NestJs: npm install -g @nestjs/cli
- Instalar CLI Typeorm:  npm i -g typeorm
- Instalar dependencias: npm install
- 
### Instalar las dependencias de cada carpeta
### Backend:
 - cd backend
 - npm install
 - npm run migration:run (Necesario para poblar la base de datos)
### Frontend:
 - cd frontend
 - npm install
 - Creacion de .env:
REACT_APP_API_BASE_URL=http://localhost:4000
  
## Comandos disponibles:

### Correr el proyecto
npm start (root del repo)
El backend corre por defecto en localhost:4000 y el front en localhost:3000

### Backend
 - cd backend
 - Ejecutar migraciones: npm run migration:run
 - Crear migracion: npm run migration:generate -- db/migrations/Ejemplo
 - Revertir migraciones: npm run migration:revert

###Frontend
 - cd frontend
 - npm start (Iniciar frontend)

### Clonar el Repositorio

```bash
git clone https://github.com/CarrioliDante/pokemon-battle-test.git
cd pokemon-battle-test
```
## Notas Adicionales
Configuración de Variables de Entorno:
Si es necesario, puedes configurar la URL base de la API en el frontend utilizando una variable de entorno llamada REACT_APP_API_BASE_URL. Por defecto, está configurada para http://localhost:4000.
