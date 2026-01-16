
export const Roles = {
    ADMIN: 'ADMIN',
    CONDUCTOR: 'CONDUCTOR'
} as const;

export type Roles = typeof Roles[keyof typeof Roles];


export const JerarquiaRoles: Record<Roles,number> = {
    [Roles.ADMIN]: 1,
    [Roles.CONDUCTOR]: 2,
}

export type TipoRol = Roles;

export class RolUsuario {
    private _value: Roles

    constructor(value: string | Roles) {
        if (!this.isValid(value)) {
            throw new Error(`Rol inválido: ${value}`);
        }
        this._value = value as Roles;
    }

    get value(): Roles {
        return this._value
    }

    private isValid(value: string): boolean {
        return Object.values(Roles).includes(value as Roles);
    }

    readonly equals = (value: Roles | string): boolean => this._value === value
    
    readonly isAtLeast = (role: Roles | string): boolean => {
        if(!Object.values(Roles).includes(role as Roles)) throw new Error('El rol ' + role + ' no es valido')
        return JerarquiaRoles[this._value] <= JerarquiaRoles[role as Roles]
    }

    readonly toJSON = () => {
        return {
            value: this._value
        }
    }
}