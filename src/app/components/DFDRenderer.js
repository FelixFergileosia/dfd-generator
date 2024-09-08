// src/components/DFDRenderer.js
import { useEffect } from 'react';
import SVG from 'svg.js';

const DFDRenderer = ({ diagramAST }) => {
  useEffect(() => {
    const draw = SVG().addTo('#dfd').size(800, 600); // Create an SVG canvas

    // Iterate through the AST and render elements
    diagramAST.entities.forEach((entity, index) => {
      draw.rect(100, 50).move(100 * index, 100).attr({ fill: '#f5f5f5', stroke: '#000' });
      draw.text(entity.name).move(100 * index, 120);
    });

    // Add flows or connections
    diagramAST.flows.forEach((flow) => {
      draw.line(200, 150, 300, 150).stroke({ width: 2 });
    });

  }, [diagramAST]);

  return <div id="dfd"></div>;
};

export default DFDRenderer;
