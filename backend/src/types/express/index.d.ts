import { RolUsuario } from "../../domain/value-objects/RolUsuario";

export interface UsuarioAutenticado {
  id: string;
  email: string;
  rol: RolUsuario;
}

declare global {
  namespace Express {
    interface Request {
      user?: UsuarioAutenticado;
    }
  }
}