# API REST para un estudio de tatuajes 

## Descripción

El proyecto consiste en desarrollar una API RESTful para la gestión de citas  de un estudio de tauajes. La API permitirá a los usuarios realizar operaciones como registar,login , actualizar y eliminar citas, gestionar usuarios, artistas, tauajes y otros diseños


## Características Principales

- Gestión de Usuarios
- Gestión de citas
- Gestión de Artistas
- Visualización de citas
- Actualizacion de citas
- Visualización de Usuarios
- Visualización de perfil
- Actualizacion de Perfil de Usuario
- Registro y Login de Usuarios

## Endpoints principales

### Users

| Método | URI                              | Acción                     | Rol     |
|--------|----------------------------------|----------------------------|---------|
| POST   | `/api/users/registerAdmin`       | Registrar                  | admin   |
| POST   | `/api/users/registerArtist`      | Registrar                  | artist  |
| POST   | `/api/users/register`            | Registrar                  | client  |
| POST   | `/api/users/login `              | Actualiza perfil           | client  |
| GET    | `/api/users/profile `            | Obtener usuario            | client  |
| GET    | `/api/users/artists/list`        | Obtener lista de artistas  | admin   |
| GET    | `/api/users//getall  `           | ver todos los usuarios     | client  |
| Patch  | `/api/users/profile/update `     | actualizar datos de usuario| client  |


### Appointments

| Método | URI                                    | Acción         | Rol         |
|--------|----------------------------------------|----------------|-------------|
| POST   | `/api/appointments/newAppointment`     | Crear cita     | client      |
| PATCH  | `/api/appointments/:id`                | Actualizar     | admin       |
| DELETE | `/api/appointments/delete/:id`         | Eliminar citas | client      |
| GET    | `/api/appointments/mysessions/:id`     | ver cita por id| client      |
| GET    | `/api/appointments/myappointments/:id` |ver citas artist| artist      |
| GET    | `/api/appointments/get`                |ver todas citas | admin       |




##  Instalación en local
1. Clonar el repositorio
2. ` $ npm install `
3. Conectamos nuestro repositorio con la base de datos 
4. ``` $ Ejecutamos las migraciones ``` 
5. ``` $ npm run dev ```
6. 

## Tecnologías
- ORM: **TypeOrm**.
- Lenguaje:  **TypeScript**.

## Base de Datos Relacional
![Database](./imagenes//DiagramaDatabase.png)


