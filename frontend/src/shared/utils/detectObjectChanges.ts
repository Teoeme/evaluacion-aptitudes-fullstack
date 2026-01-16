/*
    Detecta los cambios en un objeto
    @param initialValues - El objeto inicial
    @param values - El objeto con los valores actualizados
    @returns Un objeto con los campos que han cambiado
*/
export default function detectObjectChanges(initialValues: Record<string, string|boolean|number>, values: Record<string, string|boolean|number>) {
    
    const changedFields: Record<string, string|boolean|number> = {};

    Object.keys(initialValues).forEach(key => {
        if (initialValues[key] !== values[key]) {
            changedFields[key] = values[key];
        }
    });

    return changedFields;
}




