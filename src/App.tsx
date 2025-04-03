import React, { useState, useEffect } from 'react'; 
// Importem React, les funcions useState i useEffect per gestionar l'estat i efectes secundaris.

import jsonbcnData from './jsonbcn.json'; 
// Importem les dades del fitxer JSON (jsonbcnData) que conté informació sobre cognoms, dates i localitats.

import './App.css'; 
// Importem els estils CSS per a l'aplicació.


// Definir el tipus de Localidad per jsonbcnData (localitats dins de cada element de dades)
interface Localidad {
  Continente: string;
  País: string;
  Capital: string;
}

// Definir el tipus de JsonBcnDataItem per jsonbcnData (cada registre de dades individual, incloent cognoms i localitats)
interface JsonBcnDataItem {
  COGNOM: string;
  Data_Referencia: string;
  Valor: number;
  ORDRE_COGNOM: number;
  Localidad: Localidad;
}

// Definir el tipus del resultat final (on combinarem els cognoms amb la informació de la localitat)
interface Resultado {
  COGNOM: string;
  Data_Referencia: string;
  Valor: number;
  ORDRE_COGNOM: number;
  localidad: Localidad;
}

const App = () => {
  // Definir l'estat per als cognoms únics, el cognom seleccionat i els resultats filtrats.
  const [cognomsUnics, setCognomsUnics] = useState<string[]>([]); // Llista de cognoms únics.
  const [cognomSeleccionat, setCognomSeleccionat] = useState<string>(''); // Cognom seleccionat per l'usuari.
  const [resultats, setResultats] = useState<Resultado[]>([]); // Resultats filtrats per al cognom seleccionat.

  // Utilitzar useEffect per obtenir els cognoms únics i ordenar-los.
  useEffect(() => {
    // Obtenim els cognoms únics, eliminant duplicats amb Set, i els ordenem alfabèticament.
    const cognomsUnicsOrdenats = [...new Set(jsonbcnData.map((dada: JsonBcnDataItem) => dada.COGNOM))].sort((a, b) => a.localeCompare(b));
    setCognomsUnics(cognomsUnicsOrdenats); // Actualitzem l'estat dels cognoms únics.
  }, []); // S'executa només una vegada quan el component es munta.

  // Funció per gestionar quan l'usuari selecciona un cognom.
  const handleCognomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cognom = e.target.value; // Obtenim el cognom seleccionat.
    setCognomSeleccionat(cognom); // Actualitzem l'estat del cognom seleccionat.

    if (cognom) {
      // Si hi ha un cognom seleccionat, filtreu les dades per aquest cognom.
      const dadesFiltrades = jsonbcnData.filter((dada: JsonBcnDataItem) => dada.COGNOM === cognom);
      setResultats(dadesFiltrades); // Actualitzem l'estat dels resultats filtrats.
    } else {
      setResultats([]); // Si no s'ha seleccionat cap cognom, es netegen els resultats.
    }
  };

  return (
    <div>
      <div style={{ fontFamily: 'Arial, sans-serif', background: '#121212', color: 'white', textAlign: 'center', padding: '20px' }}>
        <h1 style={{ color: '#00c6ff', marginBottom: '20px' }}>Selecciona un Cognom</h1>

        {/* Selector per escollir un cognom */}
        <select
          style={{ margin: '10px', padding: '10px', borderRadius: '5px', width: '200px' }}
          value={cognomSeleccionat}
          onChange={handleCognomChange} // Quan canviï el valor, cridem a la funció per actualitzar l'estat.
        >
          <option value="">-- Selecciona un Cognom --</option> 
          {/* Opció per defecte per mostrar el missatge de selecció */}
          {cognomsUnics.map((cognom, index) => (
            // Mapeig dels cognoms únics per mostrar-los com a opcions en el desplegable
            <option key={index} value={cognom}>
              {cognom} {/* Mostrem el cognom a l'usuari */}
            </option>
          ))}
        </select>

        {/* Mostrem els resultats filtrats */}
        <div id="resultats" style={{ marginTop: '20px' }}>
          {resultats.length === 0 ? (
            <p>Selecciona un cognom per veure les dades.</p> 
            // Si no hi ha resultats, mostra aquest missatge.
          ) : (
            resultats.map((dada, index) => (
              // Iterem per cada resultat filtrat i el mostrem
              <div key={index} style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '15px', margin: '10px auto', borderRadius: '10px', width: '50%' }}>
                <p>Data: {dada.Data_Referencia}</p>
                <p>Cognom: {dada.COGNOM}</p>
                <p>Valor: {dada.Valor}</p>
                <p>Ordre: {dada.ORDRE_COGNOM}</p>

                {/* Informació de la localitat */}
                {dada.Localidad ? (
                  // Si hi ha informació de la localitat, la mostrem
                  <div style={{ marginTop: '10px', padding: '10px', background: '#e3e3e3', borderRadius: '8px' }}>
                    <h3>Información de la Localidad</h3>
                    <p><strong>Continente:</strong> {dada.Localidad.Continente}</p>
                    <p><strong>País:</strong> {dada.Localidad.País}</p>
                    <p><strong>Capital:</strong> {dada.Localidad.Capital}</p>
                  </div>
                ) : (
                  <p>No hay información de localidad disponible.</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
