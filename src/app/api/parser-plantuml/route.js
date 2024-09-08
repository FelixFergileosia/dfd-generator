// src/app/api/parse-plantuml/route.js
import plantuml from 'plantuml-parser';

export async function POST(req) {
  try {
    const { plantUML } = await req.json();
    const diagramAST = plantuml.parse(plantUML);

    return new Response(JSON.stringify({ diagramAST }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
