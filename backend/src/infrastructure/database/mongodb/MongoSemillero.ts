import { connectToMongoDB } from "../mongodb/conexion";
import { ServiceContainer } from "../../ServiceContainer";
import { seedData } from "./seedData";
import chalk from "chalk";
import { Email } from "../../../domain/value-objects/Email";

export class MongoSemillero {
    async seed(): Promise<void> {
        try {
            console.log(chalk.blue("Iniciando proceso de semillero..."));

            // Conectar a la base de datos
            await connectToMongoDB();
            console.log(chalk.green("Conexión a MongoDB establecida"));

            // Seed de usuarios
            console.log(chalk.blue("\nCreando usuarios..."));
            await this.seedUsuarios();

            // Seed de validaciones
            console.log(chalk.blue("\nCreando validaciones..."));
            await this.seedValidaciones();

            console.log(chalk.green("\nSemillero completado exitosamente!"));
        } catch (error) {
            console.error(chalk.red("Error durante el semillero:"), error);
            throw error;
        } finally {
            // Cerrar conexión
            const mongoose = await import("mongoose");
            await mongoose.default.connection.close();
            console.log(chalk.blue("🔌 Conexión a MongoDB cerrada"));
        }
    }

    private async seedUsuarios(): Promise<void> {
        for (const usuarioData of seedData.usuarios) {
            try {
                // Verificar si el usuario ya existe
                const email = new Email(
                    usuarioData.email
                );
                const existeUsuario =
                    await ServiceContainer.usuario.registrar["usuarioRepositorio"].buscarPorEmail(
                        email
                    );

                if (existeUsuario) {
                    console.log(
                        chalk.yellow(
                            `  ⏭️  Usuario ${usuarioData.email} ya existe, saltando...`
                        )
                    );
                    continue;
                }

                await ServiceContainer.usuario.registrar.execute(usuarioData);
                console.log(chalk.green(`  ✓ Usuario ${usuarioData.email} creado`));
            } catch (error) {
                // Si es un error de duplicado, lo ignoramos
                if (error instanceof Error && error.message.includes("ya existe")) {
                    console.log(
                        chalk.yellow(
                            ` Usuario ${usuarioData.email} ya existe, saltando...`
                        )
                    );
                    continue;
                }
                console.error(
                    chalk.red(`Error al crear usuario ${usuarioData.email}:`),
                    error
                );
            }
        }
    }

    private async seedValidaciones(): Promise<void> {
        const validacionesExistentes =
            await ServiceContainer.validacion.listar.execute();

        // Crear un mapa de validaciones existentes por nombre
        const validacionesPorNombre = new Map(
            validacionesExistentes.map((v) => [v.nombre, v])
        );

        for (const validacionData of seedData.validaciones) {
            try {
                // Verificar si la validación ya existe
                if (validacionesPorNombre.has(validacionData.nombre)) {
                    console.log(
                        chalk.yellow(
                            `Validación "${validacionData.nombre}" ya existe, saltando...`
                        )
                    );
                    continue;
                }

                await ServiceContainer.validacion.crear.execute(validacionData);
                console.log(chalk.green(`Validación "${validacionData.nombre}" creada`));
            } catch (error) {
                console.error(
                    chalk.red(`Error al crear validación "${validacionData.nombre}":`),
                    error
                );
            }
        }
    }

    async clear(): Promise<void> {
        try {
            console.log(chalk.red("🗑️  Iniciando limpieza de base de datos..."));

            await connectToMongoDB();
            console.log(chalk.green("✓ Conexión a MongoDB establecida"));

            const mongoose = await import("mongoose");

            // Obtener todos los modelos
            const models = mongoose.default.models;

            // Eliminar todas las colecciones (¡CUIDADO: esto elimina todos los datos!)
            for (const modelName in models) {
                const model = models[modelName];
                if (model) {
                    await model.deleteMany({});
                }
                console.log(chalk.yellow(`Colección ${modelName} limpiada`));
            }

            console.log(chalk.green("\nLimpieza completada exitosamente!"));
        } catch (error) {
            console.error(chalk.red("Error durante la limpieza:"), error);
            throw error;
        } finally {
            const mongoose = await import("mongoose");
            await mongoose.default.connection.close();
            console.log(chalk.blue("🔌 Conexión a MongoDB cerrada"));
        }
    }
}

// Ejecutar semillero si se llama directamente
if (require.main === module) {
    const semillero = new MongoSemillero();

    // Verificar argumentos de línea de comandos
    const args = process.argv.slice(2);
    const command = args[0];

    if (command === "clear") {
        semillero.clear()
            .then(() => process.exit(0))
            .catch((error) => {
                console.error(error);
                process.exit(1);
            });
    } else {
        semillero.seed()
            .then(() => process.exit(0))
            .catch((error) => {
                console.error(error);
                process.exit(1);
            });
    }
}