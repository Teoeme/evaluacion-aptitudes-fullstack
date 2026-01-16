import { CustomError } from "./BaseErrors";

export class ConductorCreaRondaParaOtroConductorError extends CustomError {
    constructor() {
      super(`No es posible crear ronda para otro conductor`,"",RondaErrorsCodes.RONDA_CONDUCTOR_OTRO_CONDUCTOR,403);
      this.name = 'ConductorCreaRondaParaOtroConductorError';
    }
}

export enum RondaErrorsCodes {
  RONDA_CONDUCTOR_OTRO_CONDUCTOR = 'RONDA_CONDUCTOR_OTRO_CONDUCTOR',
}