// Importamos los archivos JSON que contienen los datos
import bcnData from './bcn.json';  // Ajusta la ruta según corresponda
import jsonbcnData from './jsonbcn.json';  // Ajusta la ruta según corresponda

// Exportamos los datos importados
export { bcnData, jsonbcnData };
type bcnData = {
    Continente: string;
    País: string;
    Capital: string;
  };
  
  // Definimos el tipo de los filtros para los datos
  type jsonbcnData = {
    Data_Referencia: string;
    COGNOM: string;
    Valor: string;
    ORDRE_COGNOM: number;
  };

  export { bcnData as bcnData1, jsonbcnData as jsonbcnData1 };
  
  