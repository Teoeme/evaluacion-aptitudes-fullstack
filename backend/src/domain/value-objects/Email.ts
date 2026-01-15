export class Email {
    private readonly value: string;
    constructor(value: string) {
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) throw new Error("Email inválido");
        this.value = value;
    }
    getValue(): string { return this.value; }
  
    toJSON():string {
        return this.value
    }
    
    equals(other: Email): boolean { return this.value === other.value; }
}