# Evaluación de aptitudes fullstack

##Backend

Se optó por la generación de IDs a nivel de aplicación (Application-Side Identity Generation) para garantizar que las Entidades de Dominio sean siempre válidas e inmutables desde su instanciación, desacoplando la lógica de negocio de la generación de claves de la base de datos.

### Gestión de Identificadores (IDs)
Se optó por **desacoplar la generación de IDs** de la base de datos. En lugar de esperar a que la base de datos asigne un ID después de la inserción, la aplicación genera el ID antes de persistir la entidad.

**Decisión:** Implementación del patrón `IIdGenerator`.
- **Justificación:**
  1. Permite tener la entidad completa y válida (con ID) en memoria antes de guardarla.
  2. Facilita el testing al no depender de una base de datos real para tener objetos con identidad.
  3. Mantiene el principio de **Inversión de Dependencias**: El dominio define que necesita un ID, la infraestructura decide cómo generarlo (en este caso, compatible con MongoDB ObjectId o UUID según convenga).

  ### Inyección de Dependencias
Se implementó un patrón de **Inyección de Dependencias Manual** centralizado en un `ServiceContainer`.

**Decisión:** Uso de un Contenedor de Servicios (`ServiceContainer`) en la capa de Infraestructura.
- **Justificación:**
  1. **Clean Architecture:** Mantiene las capas de Dominio y Aplicación libres de frameworks de inyección o decoradores externos (como `@Injectable` de NestJS o TSyringe).
  2. **Centralización:** Toda la composición del grafo de objetos ocurre en un único punto (Composition Root), facilitando la visión global de las dependencias.
  3. **Testabilidad:** Facilita enormemente el testing de integración, permitiendo reemplazar el contenedor real por uno con mocks o implementaciones en memoria para las pruebas, sin tocar el código de la aplicación.

  ### Tipado de Request en Express

Para garantizar tipado seguro en los middlewares se utiliza **declaration merging** de TypeScript, extendiendo `Express.Request` con la propiedad `user`.  
Esto se define en un archivo global `types/express/index.d.ts`.

**Justificación Arquitectónica:**
- Express es un detalle de infraestructura (framework).
- El dominio no depende de Express ni de sus tipos.
- El tipado se declara globalmente para evitar imports repetitivos y mantener una API consistente.

### Autenticación 
Para simplificar la prueba técnica se implementa un solo JWT (sin refresh tokens).
- Guardado en cookie HttpOnly
- Logout = borrar cookie
- No se implementa revocación ni persistencia en BBDD/caché 