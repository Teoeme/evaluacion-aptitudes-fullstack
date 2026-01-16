export interface UsuarioResponseDto {
  id: string;
  nombreCompleto: string;
  email: string;
  rol: string;
  area?: string | undefined;
  createdAt: Date;
}