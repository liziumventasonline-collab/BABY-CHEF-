/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("La clave GEMINI_API_KEY no está configurada en las variables de entorno.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON
  app.use(express.json());

  // API endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // AI Assistant Proxy
  app.post("/api/assistant", async (req, res) => {
    try {
      const { message, history, babyContext, recipesContext } = req.body;

      if (!message) {
        return res.status(400).json({ error: "El mensaje es obligatorio." });
      }

      let client: GoogleGenAI;
      try {
        client = getGeminiClient();
      } catch (err: any) {
        return res.status(500).json({
          error: "Clave de API de Gemini faltante. Por favor, asegúrate de configurar GEMINI_API_KEY en la sección Secrets de AI Studio.",
          isConfigError: true
        });
      }

      // Context construction
      const systemInstruction = `
Eres BabyChef AI, un asistente virtual experto en alimentación infantil y nutrición para bebés, diseñado para acompañar a madres y padres primerizos en esta hermosa etapa.
Tu tono de voz debe ser SIEMPRE en español, extremadamente tierno, comprensivo, amigable, cálido, positivo y muy seguro (como una pediatra muy cariñosa y cercana).

Contexto del Bebé Actual:
${babyContext ? JSON.stringify(babyContext) : "No se ha configurado el perfil de ningún bebé todavía."}

Base de Conocimiento de Recetas Disponibles en la Aplicación:
${JSON.stringify(recipesContext || [])}

Reglas de respuesta estrictas:
1. Responde de forma muy estructurada, usando títulos limpios, emojis amigables, viñetas de fácil lectura para mamás y papás ocupados.
2. Si el usuario pregunta qué preparar con ciertos ingredientes (ej: 'Tengo plátano, avena y manzana'), busca rigurosamente coincidencias completas o parciales dentro de la lista de Recetas Oficiales provista. Si coincide alguna receta, menciónala con alegría e indícale que está en su catálogo oficial. Si no hay receta oficial idéntica, genera una sugerencia de receta de comida sana adaptada al bebé detallando ingredientes simples y pasos, pero añade una nota dulce aclarando: '(Esta es una sugerencia complementaria saludable no listada originalmente en tu recetario principal)'.
3. Si el usuario te pregunta por recomendaciones de alimentación, tips de BLW, cómo empezar con las papillas, cortes seguros, regla de los 3 días o conservación, respóndele basándote en la evidencia pediátrica actual. Siempre añade al final un recordatorio sutil de consultar con el pediatra de cabecera ante cualquier duda médica o sospecha de alergia severa.
4. Si la pregunta del usuario está completamente fuera del ámbito de los bebés, la maternidad/paternidad, la nutrición infantil, las recetas o la lactancia (ej: '¿Cómo funciona la bolsa de valores?' o 'Escribe un código en Python'), debes responder amablemente y con ternura:
"¡Hola! 🍼 Como asistente de alimentación de bebés y nutrición infantil, mi especialidad es guiarte con recetas deliciosas para tu pequeñín, consejos de BLW, papillas y el crecimiento de tu bebé. Esa información no se encuentra dentro del recetario o mi ámbito de ayuda. ¿Te gustaría que busquemos una receta rica en hierro para tu bebé o hablemos sobre cómo introducir nuevos alimentos?"
5. Mantén las explicaciones seguras. Advierte sobre riesgos de asfixia (alimentos redondos como uvas enteras, frutos secos enteros, zanahoria cruda) y alimentos prohibidos antes del primer año (sal, azúcar, miel, leche entera de vaca).
`;

      const contents: any[] = [];

      // Convert history format to Gemini parts
      if (history && Array.isArray(history)) {
        history.forEach((h: any) => {
          if (h.sender && h.text) {
            contents.push({
              role: h.sender === "user" ? "user" : "model",
              parts: [{ text: h.text }]
            });
          }
        });
      }

      // Add current message
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Error en la llamada a Gemini:", error);
      res.status(500).json({ error: error.message || "Error interno al procesar con Gemini." });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} (env: ${process.env.NODE_ENV || 'development'})`);
  });
}

startServer();
