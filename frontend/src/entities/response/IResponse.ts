// K es el key de la respuesta y T es el tipo de la respuesta
export type IResponse<T = never> = {
  success: boolean;
  message: string;
  code?: string;
  data?: T;
  metadata?: any;
};