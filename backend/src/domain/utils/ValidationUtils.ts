
import { RequiredFieldsMissingError } from "../errors/BaseErrors";

export function validateRequiredFields(object: any, fields: string[], context: string): void {
    const missingFields: string[] = [];

    for (const field of fields) {
        const value = object[field];
        if (value === null || value === undefined || value === '') {
            missingFields.push(field);
        }
    }

    if (missingFields.length > 0) {
        throw new RequiredFieldsMissingError(missingFields, context);
    }
}
