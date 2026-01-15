export class CustomError extends Error {
  code: string;
  details: string;
  constructor(message: string, details?: string, code?: string) {
        super(message);
        this.name = 'CustomError';
        this.details = details || '';
        this.code = code || 'CUSTOM_ERROR';
    }
}

// Errores genéricos extensibles
export class RequiredFieldsMissingError extends CustomError {
    constructor(fields: string[], context: string = "") {
      const fieldsList = fields.join(", ");
      const contextMsg = context ? ` en ${context}` : "";
      super(`Campos requeridos faltantes: ${fieldsList}${contextMsg}`);
      this.name = 'RequiredFieldsMissingError';
    }
  }
  
  export class InvalidFormatError extends CustomError {
    constructor(field: string, expectedFormat: string, context: string = "") {
      const contextMsg = context ? ` en ${context}` : "";
      super(`Formato inválido para ${field}. Se esperaba: ${expectedFormat}${contextMsg}`);
      this.name = 'InvalidFormatError';
    }
  }
  
  export class ResourceNotFoundError extends CustomError {
    constructor(resource: string, identifier: string) {
      super(`${resource} con identificador '${identifier}' no encontrado`);
      this.name = 'ResourceNotFoundError';
    }
  }
  
  export class ResourceAlreadyExistsError extends CustomError {
    constructor(resource: string, field: string, value: string) {
      super(`${resource} con ${field} '${value}' ya existe`);
      this.name = 'ResourceAlreadyExistsError';
    }
  }
  
  export class UnauthorizedOperationError extends CustomError {
    constructor(operation: string, reason: string = "") {
      const details = reason &&  `Operación no autorizada: ${operation} | ${reason}`;
      super(`No autorizado`,details);
      this.name = 'UnauthorizedOperationError';
    }
  }

  export class BadRequestError extends CustomError {
    constructor(message: string, details?: string) {
      super(message, details);
      this.name = 'BadRequestError';
    }
  }

  export class InternalValidationError extends CustomError {
    constructor(message: string, details?: string) {
      super(message, details);
      this.name = 'InternalValidationError';
    }
  }

  export class UnauthorizedError extends CustomError {
    constructor(message:string, details?:string) {
      super(message, details);
      this.name = 'UnauthorizedError';
    }
  }

  export class ForbiddenError extends CustomError {
    constructor(message:string, details?:string) {
      super(message, details);
      this.name = 'ForbiddenError';
    }
  }

  export class InvalidResponseError extends CustomError {
    constructor(message:string, details?:string) {
      super(message, details);
      this.name = 'InvalidResponseError';
    }
  }

  export class InvalidStateError extends CustomError {
    constructor(resource:string, currentState:string, attempedAction:string) {
      super(
        `No se puede ${attempedAction} ${resource}`,
        `No se puede ${attempedAction} ${resource} porque está en estado ${currentState}`
      );
      this.name = 'InvalidStateError';
    }
  }