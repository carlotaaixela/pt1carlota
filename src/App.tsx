import React, { useState, useEffect } from 'react';
import dades from './jsonbcn.json';
import './App.css';

// Tipus per a les dades
type Filtro = {
  Data_Referencia: string;
  COGNOM: string;
  Valor: string;
  ORDRE_COGNOM: number;
};

const App = () => {
  const [cognomsUnics, setCognomsUnics] = useState<string[]>([]); // Estats per a cognoms únics
  const [cognomSeleccionat, setCognomSeleccionat] = useState<string>(''); // Cognom seleccionat
  const [resultats, setResultats] = useState<Filtro[]>([]); // Resultats filtrats

  // Primer useEffect per obtenir i ordenar els cognoms únics
  useEffect(() => {
    // Obtenim els cognoms únics
    const cognomsUnics = [...new Set(dades.map(dada => dada.COGNOM))];

    // Ordenem els cognoms alfabèticament
    const cognomsOrdenats = cognomsUnics.sort((a, b) => a.localeCompare(b));

    // Actualitzem l'estat amb els cognoms únics ordenats
    setCognomsUnics(cognomsOrdenats);
  }, []); // Aquest useEffect només s'executarà una vegada, quan es carregui el component

  // useEffect per actualitzar els resultats quan el cognom seleccionat canviï
  useEffect(() => {
    if (cognomSeleccionat) {
      // Filtrarem les dades per obtenir les que coincideixen amb el cognom seleccionat
      const dadesFiltrades = dades.filter(dada => dada.COGNOM === cognomSeleccionat);
      setResultats(dadesFiltrades); // Actualitzem els resultats amb les dades filtrades
    } else {
      // Si no hi ha cap cognom seleccionat, netegem els resultats
      setResultats([]);
    }
  }, [cognomSeleccionat]); // Aquest useEffect es dispara cada vegada que canvia cognomSeleccionat

  // Ordenem les dades per ORDRE_COGNOM abans de mostrar-les
  const ordena = dades.sort((a, b) => a.ORDRE_COGNOM - b.ORDRE_COGNOM);

  return (
    <div>
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#121212', color: 'white', textAlign: 'center', padding: '20px' }}>
      <h1 style={{ color: '#00c6ff', marginBottom: '20px' }}>Selecciona un Cognom</h1>

      {/* Selector per escollir el cognom */}
      <select
        style={{ margin: '10px', padding: '10px', borderRadius: '5px', width: '200px' }}
        value={cognomSeleccionat}
        onChange={(e) => setCognomSeleccionat(e.target.value)} // Actualitzem el cognom seleccionat
      >
        <option value="">-- Selecciona un Cognom --</option>
        {cognomsUnics.map((cognom, index) => (
          <option key={index} value={cognom}>
            {cognom}
          </option>
        ))}
      </select>

      
      <div id="resultats" style={{ marginTop: '20px' }}>
        {resultats.length === 0 ? (
          <p>Selecciona un cognom per veure les dades.</p>
        ) : (
          resultats.map((dada, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '15px',
                margin: '10px auto',
                borderRadius: '10px',
                width: '50%',
              }}
            >
              <p>Data: {dada.Data_Referencia}</p>
              <p>Cognom: {dada.COGNOM}</p>
              <p>Valor: {dada.Valor}</p>
              <p>Ordre: {dada.ORDRE_COGNOM}</p>
            </div>
          ))
        )}
      </div>
      </div>

      <img
        id="imagen"
        src="./c.jpg" // Cambia esta URL por la de tu imagen
        alt="Imagen representativa"
      />
    </div>
  );
};

export default App;
