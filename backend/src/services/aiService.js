/**
 * Servicio de IA para generar notas de sommelier usando OpenAI
 */

import OpenAI from 'openai';

/**
 * Genera notas de sommelier usando OpenAI basándose en los datos del vino
 * @param {Object} wine - Objeto con los datos del vino desde SQLite
 * @returns {Promise<string>} Texto con las notas del sommelier generadas por IA
 */
export async function generateSommelierNotes(wine) {
  // Si no hay API key, usar texto simulado como fallback
  if (!process.env.OPENAI_API_KEY) {
    console.warn('OPENAI_API_KEY no configurada, usando texto simulado');
    const simulatedNotes = generateSimulatedNotes(wine);
    return {
      aiNotes: simulatedNotes,
      prompt: 'Texto simulado - sin prompt',
      modelUsed: 'fallback-simulated',
      tokensUsed: 0
    };
  }

  try {
    console.log('Generando notas del sommelier con OpenAI GPT-4...');

    // Inicializar cliente de OpenAI
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    // Construir el prompt con los datos del vino
    const prompt = buildPrompt(wine);

    const modelToUse = 'gpt-4o-mini';

    // Generar contenido con OpenAI usando Chat Completions API
    const response = await client.chat.completions.create({
      model: modelToUse,
      messages: [
        {
          role: 'system',
          content: 'Eres un sommelier profesional experto en vinos con años de experiencia. Tienes acceso a información de críticas profesionales, guías de vinos y conocimiento profundo sobre bodegas y regiones vitivinícolas. Generas análisis OBJETIVOS basados en información real, no en datos proporcionados por el usuario.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const aiNotes = response.choices[0].message.content;
    const tokensUsed = response.usage?.total_tokens || 0;

    console.log(`Notas generadas exitosamente con OpenAI (${tokensUsed} tokens)`);

    return {
      aiNotes,
      prompt,
      modelUsed: modelToUse,
      tokensUsed
    };

  } catch (error) {
    const errorMessage = error.message || error.toString();

    if (error.status === 429) {
      console.warn('Cuota de OpenAI excedida, usando texto simulado como fallback');
    } else if (error.status === 401) {
      console.error('API key de OpenAI inválida, usando texto simulado como fallback');
    } else {
      console.error('Error al generar notas con OpenAI:', errorMessage);
    }

    // Fallback a notas simuladas si falla la IA
    console.log('Generando notas simuladas basadas en los datos del vino...');
    const simulatedNotes = generateSimulatedNotes(wine);
    return {
      aiNotes: simulatedNotes,
      prompt: buildPrompt(wine),
      modelUsed: 'fallback-simulated',
      tokensUsed: 0
    };
  }
}

/**
 * Construye el prompt para OpenAI solicitando análisis objetivo del vino
 */
function buildPrompt(wine) {
  const {
    name,
    winery,
    grape,
    year,
    region,
    country
  } = wine;

  let prompt = `Necesito un análisis profesional y OBJETIVO del siguiente vino basándote en información real de sommeliers, críticas profesionales y características conocidas de la bodega y la cepa:\n\n`;

  prompt += `VINO A ANALIZAR:\n`;
  prompt += `- Nombre: ${name}\n`;
  if (winery) prompt += `- Bodega: ${winery}\n`;
  if (grape) prompt += `- Cepa: ${grape}\n`;
  if (year) prompt += `- Añada: ${year}\n`;
  if (region || country) prompt += `- Origen: ${region || ''}${region && country ? ', ' : ''}${country || ''}\n`;

  prompt += `\n⚠️ IMPORTANTE: NO repitas información que haya proporcionado el usuario. Busca información OBJETIVA sobre este vino específico.\n\n`;

  prompt += `Por favor, proporciona un análisis estructurado con:\n\n`;

  prompt += `1. TÍTULO Y DESCRIPCIÓN BREVE\n`;
  prompt += `   - Un título atractivo para el análisis\n`;
  prompt += `   - Una descripción de 2-3 líneas sobre el vino y la bodega\n\n`;

  prompt += `2. PERFIL AROMÁTICO (OBJETIVO)\n`;
  prompt += `   - Aromas característicos que este vino REALMENTE presenta según críticas profesionales\n`;
  prompt += `   - No uses información que haya dado el usuario, sino lo que se conoce objetivamente de este vino\n\n`;

  prompt += `3. PERFIL DE SABORES (OBJETIVO)\n`;
  prompt += `   - Sabores y características en boca según la información real del vino\n`;
  prompt += `   - Estructura, cuerpo, acidez, taninos si aplica\n\n`;

  prompt += `4. MARIDAJE Y RECOMENDACIONES\n`;
  prompt += `   - Sugerencias específicas de maridaje\n`;
  prompt += `   - Temperatura de servicio ideal\n`;
  prompt += `   - Ocasiones recomendadas\n\n`;

  prompt += `5. POTENCIAL DE GUARDA\n`;
  prompt += `   - Cuánto tiempo puede guardarse\n`;
  prompt += `   - Si está en su punto óptimo o necesita más tiempo\n\n`;

  prompt += `6. CURIOSIDADES O DATOS INTERESANTES\n`;
  prompt += `   - Algún dato curioso sobre la bodega, la cepa o la región\n`;
  prompt += `   - Premios o reconocimientos si los tiene\n`;
  prompt += `   - Características especiales del proceso de elaboración\n\n`;

  prompt += `Formato: Usa un tono profesional pero accesible. Estructura el texto con títulos claros y separa las secciones con saltos de línea.`;

  return prompt;
}

/**
 * Genera notas simuladas como fallback (versión anterior)
 */
function generateSimulatedNotes(wine) {
  // Construcción del texto simulado usando los datos reales del vino
  const {
    name,
    winery,
    grape,
    year,
    region,
    country,
    rating,
    aromas,
    flavors,
    notes
  } = wine;

  // Texto simulado estructurado como notas de sommelier
  let sommelierText = `Analisis SommelIAr de "${name}"\n\n`;

  // Información básica
  sommelierText += `INFORMACION GENERAL:\n`;
  if (winery) sommelierText += `Bodega: ${winery}\n`;
  if (grape) sommelierText += `Cepa: ${grape}\n`;
  if (year) sommelierText += `Cosecha: ${year}\n`;
  if (region || country) {
    sommelierText += `Origen: ${region ? region : ''}${region && country ? ', ' : ''}${country ? country : ''}\n`;
  }
  if (rating) sommelierText += `Calificacion personal: ${rating}/5 estrellas\n`;

  // Perfil sensorial
  sommelierText += `\nPERFIL AROMATICO:\n`;
  if (aromas) {
    sommelierText += `${aromas}\n`;
  } else {
    sommelierText += `No se han registrado aromas especificos.\n`;
  }

  sommelierText += `\nPERFIL DE SABORES:\n`;
  if (flavors) {
    sommelierText += `${flavors}\n`;
  } else {
    sommelierText += `No se han registrado sabores especificos.\n`;
  }

  // Notas personales del usuario
  if (notes) {
    sommelierText += `\nNOTAS PERSONALES:\n${notes}\n`;
  }

  // Recomendaciones simuladas basadas en los datos
  sommelierText += `\nRECOMENDACIONES DEL SOMMELIER:\n`;

  // Generar recomendación basada en la cepa
  if (grape) {
    const grapeRecommendations = {
      'Malbec': 'Ideal para acompañar carnes rojas a la parrilla, quesos curados o platos con salsas robustas.',
      'Cabernet Sauvignon': 'Perfecto con carnes asadas, cordero o platos con hierbas aromáticas.',
      'Merlot': 'Excelente con aves de corral, cerdo o pasta con salsas de tomate.',
      'Pinot Noir': 'Maridaje ideal con salmón, pato o platos de setas.',
      'Syrah': 'Combina bien con carnes especiadas, BBQ o guisos sustanciosos.',
      'Chardonnay': 'Perfecto con pescados, mariscos o platos con crema.',
      'Sauvignon Blanc': 'Excelente con ensaladas, pescados blancos o quesos de cabra.',
      'Torrontés': 'Ideal como aperitivo o con comida asiática y picante.'
    };

    const recommendation = grapeRecommendations[grape] ||
      'Este vino puede disfrutarse con una variedad de platos según su perfil de sabor.';

    sommelierText += `Maridaje: ${recommendation}\n`;
  }

  // Temperatura de servicio simulada
  sommelierText += `\nTemperatura de servicio recomendada: `;
  if (grape && ['Chardonnay', 'Sauvignon Blanc', 'Torrontés', 'Riesling'].includes(grape)) {
    sommelierText += `8-10°C (vino blanco)\n`;
  } else {
    sommelierText += `16-18°C (vino tinto)\n`;
  }

  sommelierText += `\n---\n`;
  sommelierText += `Estas notas han sido generadas por SommelIAr basandose en tus datos.\n`;

  return sommelierText;
}

/**
 * INTEGRACIÓN FUTURA CON IA REAL
 *
 * Para integrar con un proveedor de IA como OpenAI, reemplazar la función anterior con algo como:
 *
 * export async function generateSommelierNotes(wine) {
 *   try {
 *     // Construir el prompt con los datos del vino
 *     const prompt = `
 *       Eres un sommelier experto. Genera notas profesionales para este vino:
 *       - Nombre: ${wine.name}
 *       - Bodega: ${wine.winery}
 *       - Cepa: ${wine.grape}
 *       - Año: ${wine.year}
 *       - Región: ${wine.region}, ${wine.country}
 *       - Aromas: ${wine.aromas}
 *       - Sabores: ${wine.flavors}
 *       - Notas: ${wine.notes}
 *
 *       Proporciona un análisis detallado, recomendaciones de maridaje y temperatura de servicio.
 *     `;
 *
 *     // Ejemplo con OpenAI API
 *     const response = await fetch('https://api.openai.com/v1/chat/completions', {
 *       method: 'POST',
 *       headers: {
 *         'Content-Type': 'application/json',
 *         'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
 *       },
 *       body: JSON.stringify({
 *         model: 'gpt-3.5-turbo',
 *         messages: [
 *           { role: 'system', content: 'Eres un sommelier profesional experto en vinos.' },
 *           { role: 'user', content: prompt }
 *         ],
 *         temperature: 0.7,
 *         max_tokens: 500
 *       })
 *     });
 *
 *     const data = await response.json();
 *     return data.choices[0].message.content;
 *
 *   } catch (error) {
 *     console.error('Error al generar notas con IA:', error);
 *     // Fallback a notas simuladas en caso de error
 *     return generateSimulatedNotes(wine);
 *   }
 * }
 *
 * NOTA: Recordar agregar OPENAI_API_KEY al archivo .env
 */

