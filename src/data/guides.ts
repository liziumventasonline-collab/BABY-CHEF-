/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FAQItem, GuideArticle } from "../types";

export const FAQ_DB: FAQItem[] = [
  {
    id: "f1",
    question: "¿Cuándo debo iniciar la alimentación complementaria?",
    answer: "Según la OMS y la Asociación Española de Pediatría, se recomienda iniciar a los 6 meses de vida, siempre que el bebé muestre signos de madurez: se mantiene sentado solo con apoyo, tiene interés por la comida, ha perdido el reflejo de extrusión (no expulsa la comida con la lengua) y sabe coordinar ojo-mano-boca.",
    category: "Inicio"
  },
  {
    id: "f2",
    question: "¿Qué es el método BLW (Baby Led Weaning)?",
    answer: "Consiste en ofrecer alimentos enteros del tamaño y forma adecuados (como bastones de verduras al vapor o frutas blandas) para que el propio bebé los coja con la mano y los lleve a la boca. Fomenta la autorregulación, la masticación y previene el rechazo a texturas en el futuro.",
    category: "BLW"
  },
  {
    id: "f3",
    question: "¿Cuáles son los alimentos prohibidos antes del primer año?",
    answer: "Antes de los 12 meses están estrictamente prohibidos: la sal (daña los riñones), el azúcar y edulcorantes (crean adicción y caries), la miel (riesgo de botulismo infantil), las verduras de hoja verde como espinacas o acelgas en grandes cantidades (por los nitratos), los pescados grandes (atún, pez espada por el mercurio), los lácteos enteros de vaca y los frutos secos enteros (grave riesgo de atragantamiento).",
    category: "Seguridad"
  },
  {
    id: "f4",
    question: "¿Cómo introduzco los alimentos alérgenos?",
    answer: "Introduce los alérgenos comunes (huevo, pescado, gluten, frutos secos molidos, soja, sésamo) de uno en uno, durante el día (para vigilar reacciones), ofreciéndolo durante 3 días seguidos sin introducir ninguna otra novedad. Si no hay erupciones, vómitos ni dificultad respiratoria, el alimento se considera tolerado y debe seguir ofreciéndose semanalmente para mantener la tolerancia.",
    category: "Alergias"
  },
  {
    id: "f5",
    question: "¿Cuánta agua debe beber mi bebé?",
    answer: "Antes de los 6 meses, los bebés no necesitan agua adicional (la leche materna o de fórmula cubre el 100%). A partir de los 6 meses, junto con las comidas, puedes ofrecer pequeños sorbos de agua en un vaso de aprendizaje o vasito normal para que se acostumbre. No lo fuerces; la leche sigue siendo su hidratación principal.",
    category: "Nutrición"
  },
  {
    id: "f6",
    question: "¿Cómo puedo congelar y recalentar la comida del bebé?",
    answer: "Congela los purés y caldos inmediatamente tras entibiarse, dividiéndolos en recipientes individuales herméticos o cubiteras de silicona libres de BPA etiquetadas con la fecha. Para descongelar, pásala al refrigerador 12 horas antes y calienta muy bien hasta hervir (para eliminar bacterias). Deja entibiar antes de dárselo al bebé.",
    category: "Conservación"
  }
];

export const GUIDES_DB: GuideArticle[] = [
  {
    id: "g1",
    title: "BLW vs. Papillas Tradicionales",
    icon: "Baby",
    category: "Alimentación",
    summary: "Descubre las ventajas de cada método y cómo decidir cuál es el mejor camino para tu familia.",
    content: `La decisión entre alimentar a tu bebé con papillas o seguir el método **Baby Led Weaning (BLW)** es una de las primeras elecciones importantes. Aquí te presentamos un resumen objetivo:

### 🥄 Papillas y Purés
*   **Ventajas**: Es fácil controlar la cantidad exacta que consume el bebé. El riesgo de atragantamiento inicial se reduce y requiere menos limpieza inmediata después de las comidas.
*   **Desventajas**: Al bebé le cuesta más acostumbrarse a las texturas sólidas después de los 9 meses. No estimula tanto la masticación temprana ni la motricidad fina de pinza.

### 🥦 Baby Led Weaning (BLW)
*   **Ventajas**: Fomenta la independencia, la coordinación motriz, la autorregulación del apetito y una transición más natural a la comida familiar.
*   **Desventajas**: Es bastante desordenado (la comida suele acabar en el suelo), requiere preparación específica de cortes seguros y causa cierta ansiedad inicial en los padres por miedo a las arcadas (que no son atragantamientos).

**¿La solución ideal?** Muchos pediatras sugieren una **alimentación mixta**: papillas espesas con nutrientes densos por la mañana, y sólidos blandos seguros por la tarde para experimentar.`
  },
  {
    id: "g2",
    title: "La Regla de los 3 Días para Alergias",
    icon: "ShieldAlert",
    category: "Alergias",
    summary: "Aprende a introducir alimentos nuevos de manera segura para detectar intolerancias o alergias alimentarias.",
    content: `Introducir alimentos nuevos al bebé es emocionante, pero debe hacerse de forma estructurada para garantizar su seguridad. La **regla de los 3 días** es el estándar de oro pediátrico:

1.  **Introduce de uno en uno**: Nunca introduzcas dos alimentos nuevos el mismo día. Si el bebé reacciona, no sabrás cuál fue el causante.
2.  **Mantén la prueba por 3 días**: Ofrece el alimento nuevo por la mañana o al mediodía durante tres días consecutivos. Esto es crucial porque algunas alergias o intolerancias tardías tardan hasta 48 horas en manifestarse.
3.  **Vigila los síntomas**: Busca señales de alerta como:
    *   Ronchas de color rojo en la piel o eccemas alrededor de la boca.
    *   Hinchazón en labios, lengua o párpados.
    *   Vómitos repetidos, diarrea repentina o gases inusualmente dolorosos.
    *   Dificultad respiratoria o sibilancias (Llama a emergencias de inmediato en este caso).

*Consejo*: Lleva un diario de alimentos en la sección **Mi Bebé** para tener un registro claro de lo que ya ha tolerado con éxito.`
  },
  {
    id: "g3",
    title: "Cortes Seguros en BLW para Evitar Riesgos",
    icon: "Scissors",
    category: "Seguridad",
    summary: "Guía visual y práctica para cortar verduras, frutas y carnes de forma segura para las manos pequeñas de tu bebé.",
    content: `En el Baby Led Weaning, el corte del alimento determina la seguridad. Las encías del bebé son sumamente fuertes y pueden triturar alimentos blandos, pero no pueden manejar cosas duras o redondas.

### 🥕 Forma y Tamaño: El 'Dedo de Adulto'
*   Los alimentos deben cortarse en forma de **bastón o tira grande**, con un grosor equivalente al de un dedo de adulto (aprox. 6-8 cm de largo).
*   **¿Por qué?** A los 6 meses el bebé agarra la comida con todo el puño cerrado. Si el alimento es muy corto, quedará escondido dentro de su mano y no podrá morderlo. Necesita que sobresalga por arriba de su puño.

### 🍓 Alimentos de Alto Riesgo que Deben Modificarse:
*   **Uvas, tomates cherry y arándanos**: NUNCA se dan enteros debido a su forma redonda y piel dura, que puede sellar la vía respiratoria. Deben aplastarse firmemente con los dedos o cortarse longitudinalmente en cuatro trozos.
*   **Manzana y zanahoria crudas**: Son demasiado duras. Deben ofrecerse ralladas o cocidas al vapor hasta que estén tan blandas que se deshagan al aplastarlas entre tus dedos índice y pulgar.
*   **Frutos secos**: Prohibidos enteros. Ofrécelos únicamente molidos o en cremas 100% naturales untadas muy finamente en pan.`
  },
  {
    id: "g4",
    title: "Consejos Prácticos de Congelación y Conservación",
    icon: "Snowflake",
    category: "Conservación",
    summary: "Organiza tu semana cocinando por lotes (Batch Cooking) y almacenando las comidas del bebé de manera higiénica.",
    content: `La cocina para bebés requiere altos estándares de higiene alimentaria, ya que su sistema digestivo e inmune es muy delicado. Te enseñamos a conservar como una profesional:

### 🧊 Congelación Inteligente
*   **Divide y vencerás**: Utiliza bandejas de silicona aptas para alimentos para congelar purés en cubitos individuales de unos 30ml o 50ml. Una vez congelados, pásalos a una bolsa de congelación con cremallera etiquetada con la fecha. Esto te permite sacar solo la porción exacta que tu bebé comerá.
*   **Rotulación**: Apunta siempre la fecha. Los purés de verdura duran hasta **3 meses** congelados, mientras que los que contienen carne o pescado es mejor consumirlos antes de **2 meses**.

### 🌡️ Descongelado y Recalentado Seguro
*   **Descongela siempre en frío**: Pasa el envase del congelador a la nevera la noche anterior. Nunca dejes descongelar alimentos de bebé a temperatura ambiente, ya que las bacterias se multiplican rápidamente.
*   **Calienta a fondo**: Al recalentar, asegúrate de que el alimento alcance una temperatura alta de ebullición para eliminar patógenos. Después, revuélvelo muy bien para disipar focos de calor caliente y déjalo entibiar por completo antes de dárselo al bebé.
*   **No recongeles**: Una porción descongelada que no se consuma debe desecharse. No vuelvas a congelarla jamás.`
  }
];
