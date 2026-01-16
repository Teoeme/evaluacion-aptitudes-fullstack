# Evaluación de aptitudes fullstack

## Arquitectura (Backend)

Se implementó una arquitectura **Hexagonal (Ports & Adapters)** con principios de **DDD**.  
El dominio contiene reglas de negocio puras, la aplicación orquesta casos de uso y la infraestructura conecta con frameworks (Express, Mongo).

### Decisiones clave

- **IDs generados en la aplicación**: permite instanciar entidades completas sin depender de la DB.
- **Dominio independiente de infraestructura**: los repositorios son interfaces en dominio y adapters en infraestructura.
- **Value Objects** para Email, Rol, Estado, FirmaDigital, etc.
- **Errores de dominio** con códigos de error específicos.

### Gestión de Identificadores (IDs)

Se optó por **desacoplar la generación de IDs** de la base de datos.  
Se implementó el patrón `IIdGenerator`.

**Justificación:**
1. Permite tener la entidad completa y válida (con ID) en memoria antes de guardarla.
2. Facilita el testing al no depender de la base de datos para generar identidades.
3. Mantiene la inversión de dependencias (el dominio define la necesidad, la infraestructura define la implementación).

### Inyección de Dependencias

Se implementó un contenedor manual (`ServiceContainer`) como composition root.

**Justificación:**
1. Mantiene el dominio libre de frameworks externos.
2. Centraliza el grafo de dependencias.
3. Facilita tests de integración y mocks.

### Tipado de Request en Express

Se utiliza **declaration merging** de TypeScript para extender `Express.Request` con `user`.  
Definido en `types/express/index.d.ts`.

---

## Autenticación

Se utiliza JWT simple (sin refresh tokens) para simplificar la prueba técnica.

- Token con expiración corta
- Guardado en cookie HttpOnly
- Logout = borrar cookie
- Sin revocación (trade‑off aceptado por alcance)

---

## Reglas de negocio (Rondas)

- Las validaciones se generan desde **validaciones activas** y según tipo de vehículo.
- El cumplimiento es la **suma de relevancias cumplidas**.
- Una ronda es **APTA si ≥85% y todas las obligatorias están cumplidas**.
- Si falla una obligatoria → **NO APTA** inmediata.
- Firma digital es obligatoria.
- Se guarda snapshot de validaciones (nombre, relevancia, obligatoria) para trazabilidad.

---

## Testing

Se priorizan **tests de integración** en cada módulo:

- Usuarios
- Vehículos
- Conductores
- Validaciones
- Rondas

Los tests usan factories reutilizables y helpers para autenticación.

---

## Fe de erratas

- El repositorio `MongoUsuarioRepository` no está completo (faltan métodos de listado/actualización/eliminación).  
- Algunos casos de uso de Usuario quedaron fuera del alcance, ya que no eran necesarios para la prueba técnica.

# Evaluación de aptitudes fullstack

// ... contenido existente ...

## Cómo ejecutar

cd backend
npm install
npm run dev

---

## Seeder de Base de Datos

El proyecto incluye un seeder para poblar la base de datos con datos iniciales (usuarios, validaciones, etc.).

### Configuración de Datos Iniciales

Los datos iniciales se configuran en `src/infrastructure/database/mongodb/seedData.ts`. Este archivo contiene:

- **Usuarios**: Al menos un usuario ADMIN y un CONDUCTOR para desarrollo
- **Validaciones**: Checkpoints configurables del sistema de rondas con sus relevancias y tipos de vehículos aplicables

### Comandos Disponibles

#### Ejecutar el Seeder

```bash
cd backend
npm run seed
```


Este comando:
- Conecta a MongoDB usando las variables de entorno configuradas
- Crea usuarios iniciales (si no existen)
- Crea validaciones iniciales (si no existen)
- Es **idempotente**: puedes ejecutarlo múltiples veces sin duplicar datos

Datos Iniciales que se Crean
Usuarios:
admin@sistema.com - Rol: ADMIN
conductor@sistema.com - Rol: CONDUCTOR
Validaciones:
10 validaciones preconfiguradas con relevancias según los requerimientos del negocio
Incluye validaciones obligatorias y opcionales
Configuradas para diferentes tipos de vehículos (Camion, Auto, Moto)

#### Limpiar Base de Datos

```bash
cd backend
npm run seed:clear
```
#### ADVERTENCIA: Este comando elimina TODOS los datos de todas las colecciones en la base de datos antes de ejecutar el seeder.


## Cómo ejecutar
```bash 
cd backend
npm install
npm run dev
```




