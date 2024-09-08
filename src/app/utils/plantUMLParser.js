// src/utils/plantUMLParser.js
import plantuml from 'plantuml-parser';

export const parsePlantUML = (source) => {
  return plantuml.parse(source);
};
