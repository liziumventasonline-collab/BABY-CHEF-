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
  },
  {
    id: "f7",
    question: "¿Cuándo le puedo dar a mi bebé alimentos para comer con la mano?",
    answer: "Una vez que su bebé pueda sentarse y llevar las manos u otros objetos a la boca, puede darle alimentos para comer con los dedos, para ayudar a que aprenda a alimentarse solo. Para evitar que se asfixie o atragante, asegúrese de que todo lo que le da a su bebé es blando, fácil de tragar y está cortado en pequeños trozos. Algunos ejemplos son: pequeños trozos de plátano, huevos revueltos, pastas bien cocidas y pollo desmenuzado.",
    category: "BLW"
  },
  {
    id: "f8",
    question: "¿Qué cambios puedo esperar en sus deposiciones?",
    answer: "Cuando su bebé comience a comer alimentos sólidos, sus deposiciones (heces) se volverán más sólidas y de color variable. Debido a los azúcares y a las grasas agregados, también tendrán un olor más fuerte. Las arvejas y otras verduras verdes pueden hacer que sus deposiciones sean de un color verde oscuro; la remolacha puede hacer que se vuelva roja (la remolacha a veces hace que la orina también sea roja).",
    category: "Inicio"
  },
  {
    id: "f9",
    question: "¿Debe darle jugo o zumo a mi bebé?",
    answer: "Los bebés no necesitan jugos. A los bebés menores de 12 meses no se les debe dar jugo. Después de los 12 meses de edad (hasta los 3 años de edad), puede darle solamente jugo de fruta 100% natural y no más de 4 onzas (120ml) al día.",
    category: "Nutrición"
  },
  {
    id: "f10",
    question: "¿Mi bebé de 6 a 12 meses necesita agua adicional?",
    answer: "Los bebés sanos no necesitan de agua adicional en grandes cantidades. La leche materna o la fórmula le brindan todo el líquido que necesita. Sin embargo, puede ofrecerle un poquito de agua en un vaso entrenador o con boquilla al iniciar alimentos sólidos, limitando el agua a no más de 1 taza (8 onzas) al día.",
    category: "Nutrición"
  },
  {
    id: "f11",
    question: "¿Por qué los buenos hábitos de alimentación comienzan temprano?",
    answer: "Es importante que su bebé se acostumbre al proceso de comer: sentarse derecho, tomar el alimento con una cuchara o las manos, descansar entre bocados y detenerse cuando no tiene más hambre. Fomente las comidas en familia desde el comienzo. Las investigaciones sugieren que comer regularmente en familia tiene efectos positivos sobre el desarrollo de los niños.",
    category: "Inicio"
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
  },
  {
    id: "g5",
    title: "¿Cómo Comenzar con Sólidos?",
    icon: "Baby",
    category: "Inicio",
    summary: "¿Cuándo y cómo saber si tu bebé está verdaderamente listo para iniciar la alimentación de sólidos?",
    content: `Recuerde que la habilidad para estar listos depende de cada niño y de su ritmo de desarrollo individual. Analiza los siguientes puntos clave:

### 👶 Señales de Madurez Claves
*   **¿Puede mantener la cabeza levantada?** Su bebé debe ser capaz de sentarse en una silla alta, un asiento para comer o un asiento de seguridad para bebés con buen control de la cabeza y mantener una postura erguida.
*   **¿Abre la boca cuando se le acerca el alimento?** Los bebés pueden estar listos si lo miran comer a usted, tratan de alcanzar su comida en la mesa y parecen ansiosos por que se los alimente.
*   **¿Tiene la edad suficiente?** Generalmente, cuando los bebés llegan al doble del peso que tenían al nacer (generalmente, alrededor de los 4 a 6 meses) y pesan alrededor de 13 libras (6 kg) o más, es posible que estén listos para los alimentos sólidos.

### 🥄 El Reflejo de Extrusión
*   **¿Puede traer la comida de una cuchara a su boca?** Si usted le ofrece una cuchara de cereal o puré y el bebé la empuja para sacarla de la boca con la lengua cayéndole en el mentón, es posible que aún tenga el reflejo de extrusión activo. 
*   Es completamente normal. Recuerde que nunca antes había comido nada más espeso que la leche humana o la leche de fórmula. Puede llevarle tiempo acostumbrarse. Pruebe diluyendo las primeras veces, y gradualmente vaya espesando la textura. También es recomendable esperar una semana o dos y volver a probar.`
  },
  {
    id: "g6",
    title: "¿Cómo Alimento a mi Bebé?",
    icon: "Heart",
    category: "Alimentación",
    summary: "Guía paso a paso para que las primeras experiencias de alimentación sean tranquilas y exitosas.",
    content: `Las primeras comidas son de aprendizaje, no de nutrición masiva. Sigue estos sabios consejos para acompañar a tu pequeño en el proceso:

### 🌟 Paso a Paso Inicial
*   **Empiece muy despacio**: Ofrezca media cucharada o incluso menos y hable amorosamente con su bebé durante el proceso (*"Mira, ¿ves qué rico que es esto?"*). Es posible que su bebé no sepa qué hacer al principio. Es posible que parezca confundido, arrugue la nariz, juegue con la comida en la boca o la rechace totalmente.
*   **Evita la frustración del hambre**: Una forma de hacer que comer alimentos sólidos por primera vez sea más fácil es darle a su bebé un poco de leche materna o leche de fórmula primero. Luego, dele media cucharada muy pequeña de comida sólida y termine con más leche materna o fórmula. Esto evitará que su bebé se desespere cuando tenga mucha hambre.
*   **Sé tolerante con el desorden**: No se sorprenda si la mayor parte de las primeras comidas terminan en la cara, las manos y el babero de su bebé. Aumente gradualmente la cantidad de comida, empezando con solo una cucharadita o dos. Esto le permite a su bebé tener tiempo para aprender cómo tragar sólidos de forma segura.

### 🛑 No lo obligues
Si su bebé llora o voltea la cara cuando lo va a alimentar, no lo obligue a comer. Vuelva a amamantarlo o a darle el biberón de forma exclusiva durante un tiempo antes de volver a probar. Recuerde que empezar a comer alimentos sólidos es un proceso gradual y, al principio, su bebé seguirá obteniendo casi toda su nutrición de la leche materna o la fórmula.`
  },
  {
    id: "g7",
    title: "¿Qué Alimento Darle Primero?",
    icon: "Lightbulb",
    category: "Nutrición",
    summary: "Descubre cuáles son los mejores alimentos para iniciar la alimentación complementaria de tu bebé.",
    content: `Usted puede elegir los primeros alimentos de su bebé libremente. Ya sea que decida preparar los alimentos de su bebé usted misma o comprar comida hecha para bebés, tiene muchas opciones saludables. Tenga en cuenta lo siguiente:

### 🥦 Textura y Seguridad
*   Los alimentos deben ser **blandos o en puré** para prevenir atragantamiento. Introduzca nuevos alimentos con "un solo ingrediente" de cualquiera de los grupos de alimentos cada 3 a 5 días para ver bien sus reacciones corporales y digestión.

### 🍳 Alérgenos Tempranos
*   **No hay evidencia** de que esperar a introducir alimentos alérgenos seguros para el bebé (como huevos, soja, cacahuetes/maní o pescado) después de los 4 a 6 meses prevenga alergias alimentarias. De hecho, la introducción temprana y regular previene alergias. 
*   *Nota*: Se recomiendan evaluaciones de alergia antes de introducir cacahuete para bebés que sufren de eccema severo o alergia diagnosticada al huevo. Consulte con su pediatra.

### 🥩 Hierro y Cinc de Alta Prioridad
*   No hay evidencia de que a su bebé le desagraden las verduras si primero le da fruta dulce.
*   Cerciórese de incorporar alimentos que proporcionen **hierro y cinc**, tales como carnes picadas o cocidas muy blandas, lentejas rojas o legumbres trituradas, o cereales fortificados con hierro para bebés. Esto es crucial ya que las reservas de hierro del nacimiento empiezan a agotarse alrededor de los 6 meses.`
  }
];
