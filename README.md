<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. clonar el repositorio
2. ejecutar
```bash
$ yarn install
```
3. Tener Nest CLI Instalado
```bash
4. Levanatar la base de datos
```bash
$ docker-compose up
```

5. clonar el archivo __.env.template__ y renombrar la copia a __.env__

6. Llenar las variables de entorno en el __.env__

7. reconstruir la base de datos
```bash
http://localhost:${PORT}/api/v1/seed

```

## Stack Usado
* NestJS
* MongoDB
