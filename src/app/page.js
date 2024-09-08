// src/app/page.js
'use client'; // Client-side component

import { useState } from 'react';
import DFDRenderer from './components/DFDRenderer';

export default function HomePage() {
  const [plantUML, setPlantUML] = useState('');
  const [diagramAST, setDiagramAST] = useState(null);

  const handleGenerateDFD = async () => {
    const response = await fetch('/api/parse-plantuml', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plantUML }),
    });

    if (response.ok) {
      const data = await response.json();
      setDiagramAST(data.diagramAST);
    } else {
      console.error('Failed to parse PlantUML');
    }
  };

  return (
    <div>
      <textarea
        value={plantUML}
        onChange={(e) => setPlantUML(e.target.value)}
        placeholder="Enter PlantUML DFD syntax"
        rows="10"
        cols="50"
      />
      <button onClick={handleGenerateDFD}>Generate DFD</button>

      {diagramAST && <DFDRenderer diagramAST={diagramAST} />}
    </div>
  );
}
