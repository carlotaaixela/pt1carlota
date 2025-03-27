export const activitatSchema = {
        type: "array",
        items: {
            "type": "object",
            "properties": {
                "Data_Referencia": { "type": "string", "format": "date" },
                "COGNOM": { "type": "string" },
                "Valor": { "type": "string", "pattern": "^[0-9]+$" },
                "ORDRE_COGNOM": { "type": "integer" }
            },
            "required": ["Data_Referencia", "COGNOM", "Valor", "ORDRE_COGNOM"]
        }
    }