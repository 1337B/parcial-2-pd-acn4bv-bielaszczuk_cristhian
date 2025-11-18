/**
 * Servicio de IA para generar notas de sommelier
 * Por ahora usa un texto simulado basado en los datos del vino
 * Preparado para integración futura con IA real (OpenAI, etc.)
 */

/**
 * Genera notas de sommelier simuladas usando los datos del vino
 * @param {Object} wine - Objeto con los datos del vino desde SQLite
 * @returns {string} Texto con las notas del sommelier
 */
export function generateSommelierNotes(wine) {
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

