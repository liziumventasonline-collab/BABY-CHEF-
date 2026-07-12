/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Recipe } from "../types";

export const RECIPES_DB: Recipe[] = [
  {
    id: "r1",
    name: "Puré de Calabaza, Zanahoria y Patata Dulce",
    ageRange: "6 meses",
    prepTime: 10,
    cookTime: 15,
    servings: 3,
    ingredients: [
      "150g de calabaza dulce pelada",
      "1 zanahoria mediana pelada",
      "1 patata dulce (boniato) pequeña",
      "1 cucharadita de aceite de oliva virgen extra (añadido en crudo al servir)"
    ],
    steps: [
      "Corta la calabaza, la zanahoria y la patata dulce en cubos pequeños de tamaño uniforme.",
      "Cocina las verduras al vapor durante 15 minutos o hasta que estén completamente tiernas al pincharlas con un tenedor.",
      "Coloca las verduras cocidas en una batidora o pásalas por un pasapurés. Añade un poco de agua de la cocción si deseas una textura más ligera.",
      "Tritura hasta obtener una papilla fina, homogénea y libre de grumos.",
      "Sirve una porción templada y añade un chorrito de aceite de oliva virgen extra mezclando muy bien."
    ],
    tips: [
      "No añadas sal bajo ninguna circunstancia. El riñón del bebé aún está madurando.",
      "Puedes añadir una pizca de cilantro o comino para introducir sabores sutiles."
    ],
    variations: [
      "Añade 30g de pechuga de pollo deshilachada a partir de los 7 meses para aportar proteínas."
    ],
    nutritionalInfo: {
      calories: 95,
      proteins: 1.5,
      carbs: 18,
      fats: 2.2,
      iron: "0.8 mg - Fuente natural indirecta",
      calcium: "25 mg",
      fiber: "3.2 g"
    },
    vitamins: ["Vitamina A (Beta-caroteno)", "Vitamina C"],
    minerals: ["Potasio", "Calcio", "Magnesio"],
    texture: "Papilla suave",
    difficulty: "Fácil",
    conservation: "Conserva en un tarro hermético de vidrio en la nevera por un máximo de 48 horas.",
    freezing: "Apta para congelar en porciones individuales en moldes de silicona libres de BPA. Dura hasta 3 meses en el congelador.",
    reheating: "Descongela en la nevera la noche anterior. Calienta suavemente al baño maría o microondas, revolviendo bien para evitar puntos calientes.",
    warnings: [
      "Asegúrate de que la temperatura sea tibia antes de dársela al bebé.",
      "Introduce la zanahoria por separado previamente para descartar reacciones alérgicas."
    ],
    category: "almuerzo",
    attributes: ["sin huevo", "sin leche", "sin gluten", "sin azúcar", "rica en fibra"]
  },
  {
    id: "r2",
    name: "Bastoncitos de Aguacate y Plátano (BLW)",
    ageRange: "6 meses",
    prepTime: 5,
    cookTime: 0,
    servings: 2,
    ingredients: [
      "1 aguacate maduro grande",
      "1 plátano maduro mediano",
      "1 cucharada de copos de avena finos (opcional, para rebozar)"
    ],
    steps: [
      "Pela el aguacate y corta tiras largas y gruesas (del tamaño de un dedo de adulto, unos 6-8 cm). Esto facilita el agarre con el puño del bebé.",
      "Pela el plátano y divídelo longitudinalmente en 3 partes de forma natural con los dedos, o córtalo en tiras del mismo tamaño.",
      "Si los bastones de aguacate están muy resbaladizos, rebózalos ligeramente en copos de avena molidos o sésamo tostado molido para que el bebé pueda sujetarlos mejor."
    ],
    tips: [
      "El aguacate debe estar maduro pero firme; si está demasiado blando se deshará en la mano del bebé.",
      "El método BLW estimula la motricidad fina y la autogestión alimentaria."
    ],
    variations: [
      "Puedes espolvorear una pizca de canela en polvo sobre el plátano para un aroma delicioso."
    ],
    nutritionalInfo: {
      calories: 180,
      proteins: 2.5,
      carbs: 22,
      fats: 11,
      iron: "0.6 mg",
      calcium: "12 mg",
      fiber: "4.5 g"
    },
    vitamins: ["Vitamina E", "Vitamina B6", "Vitamina C"],
    minerals: ["Potasio", "Grasas Saludables (Ácido oleico)", "Magnesio"],
    texture: "Sólido suave (BLW)",
    difficulty: "Fácil",
    conservation: "Consumir inmediatamente. El aguacate se oxida rápidamente al aire.",
    freezing: "No se recomienda congelar.",
    reheating: "No requiere calentarse. Servir a temperatura ambiente.",
    warnings: [
      "Supervisa siempre al bebé mientras come. Debe estar sentado erguido a 90 grados.",
      "No uses avena si tu bebé aún no tolera o no ha introducido el gluten (aunque la avena pura es sin gluten, suele tener contaminación cruzada)."
    ],
    category: "merienda",
    attributes: ["sin huevo", "sin leche", "sin azúcar", "rica en fibra"]
  },
  {
    id: "r3",
    name: "Papilla de Avena y Manzana Dulce con Canela",
    ageRange: "6 meses",
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    ingredients: [
      "3 cucharadas soperas de copos de avena finos",
      "1 manzana dulce (Gala o Fuji) pelada y rallada",
      "1 taza de agua, leche materna o de fórmula",
      "Una pizca de canela de Ceylán en polvo (sin azúcares)"
    ],
    steps: [
      "En un cazo pequeño, pon a calentar la taza de agua o leche junto con la manzana rallada y la avena.",
      "Cocina a fuego lento durante unos 8-10 minutos, removiendo continuamente con una cuchara de madera para que no se pegue.",
      "Cuando la avena haya absorbido el líquido y tenga una textura cremosa de gachas suaves, retira del fuego.",
      "Añade la pizca de canela de Ceylán y mezcla enérgicamente.",
      "Si el bebé prefiere una textura ultra fina, puedes pasar la mezcla por la batidora."
    ],
    tips: [
      "La avena es excelente para el tránsito intestinal del bebé gracias a su fibra soluble.",
      "Utiliza canela de Ceylán, ya que la variedad Cassia contiene cumarina y no se recomienda en exceso para bebés."
    ],
    variations: [
      "A partir de los 8 meses, puedes añadir una cucharada de puré de almendras 100% natural (sin sal ni azúcar) para introducir frutos secos."
    ],
    nutritionalInfo: {
      calories: 120,
      proteins: 3.1,
      carbs: 21,
      fats: 2.5,
      iron: "1.2 mg - Excelente aporte vegetal",
      calcium: "45 mg",
      fiber: "3.5 g"
    },
    vitamins: ["Vitamina B1", "Vitamina B5", "Vitamina E"],
    minerals: ["Hierro", "Fósforo", "Magnesio", "Zinc"],
    texture: "Papilla cremosa / Gachas",
    difficulty: "Fácil",
    conservation: "Guarda en la nevera hasta por 24 horas. Puede espesarse al enfriarse; añade un chorrito de leche tibia antes de servir.",
    freezing: "No se recomienda congelar gachas de avena preparadas.",
    reheating: "Calienta ligeramente en un cazo añadiendo un poco de agua o leche para recuperar la textura cremosa.",
    warnings: [
      "Espera a que esté tibia antes de dársela al bebé.",
      "Verifica la tolerancia al gluten al introducir la avena."
    ],
    category: "desayuno",
    attributes: ["sin huevo", "sin leche", "sin azúcar", "rica en fibra", "rica en hierro"]
  },
  {
    id: "r4",
    name: "Crema de Lentejas Rojas con Zanahoria e Hilo de Aceite",
    ageRange: "8 meses",
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    ingredients: [
      "1/2 taza de lentejas rojas peladas (no necesitan remojo previo)",
      "1 zanahoria mediana picada",
      "1/2 puerro (solo la parte blanca) picado",
      "1 patata pequeña cortada en cubos",
      "2 tazas de agua o caldo de verduras casero sin sal",
      "1 cucharadita de aceite de oliva virgen extra"
    ],
    steps: [
      "Lava bien las lentejas rojas bajo el chorro de agua fría.",
      "En una olla, añade las lentejas rojas, la zanahoria picada, el puerro y la patata.",
      "Vierte las 2 tazas de agua o caldo vegetal sin sal.",
      "Lleva a ebullición, luego reduce el fuego, tapa la olla y cocina a fuego lento durante 20 minutos hasta que todo esté tierno.",
      "Tritura el contenido de la olla con una batidora de mano hasta obtener una crema espesa y sin grumos.",
      "Sirve una porción templada con un chorrito de aceite de oliva crudo mezclado."
    ],
    tips: [
      "Las lentejas rojas son ideales para comenzar con las legumbres porque al no tener piel se digieren mucho mejor y no producen tantos gases.",
      "El aporte de hierro se absorbe mejor si añades unas gotas de zumo de naranja o limón exprimido en el plato."
    ],
    variations: [
      "Puedes añadir una pizca de cúrcuma para darle un toque antioxidante y un color amarillo brillante muy llamativo."
    ],
    nutritionalInfo: {
      calories: 145,
      proteins: 7.8,
      carbs: 22,
      fats: 2.6,
      iron: "2.4 mg - ¡Muy alto en hierro vegetal!",
      calcium: "30 mg",
      fiber: "5.1 g"
    },
    vitamins: ["Vitamina A", "Ácido fólico (Vitamina B9)", "Vitamina C"],
    minerals: ["Hierro", "Potasio", "Fósforo", "Magnesio"],
    texture: "Puré espeso texturizado",
    difficulty: "Fácil",
    conservation: "Se conserva de manera excelente en la nevera hasta por 3 días en recipientes cerrados.",
    freezing: "Congela perfectamente en recipientes herméticos por 3 meses.",
    reheating: "Calienta a fuego lento o microondas, agitando bien para homogeneizar la temperatura.",
    warnings: [
      "Introduce el puerro previamente para descartar alergias.",
      "El exceso de fibra de legumbres puede causar gases sutiles; vigila la digestión del bebé."
    ],
    category: "almuerzo",
    attributes: ["sin huevo", "sin leche", "sin gluten", "sin azúcar", "rica en hierro", "rica en fibra"]
  },
  {
    id: "r5",
    name: "Croquetas Horneadas de Brócoli y Patata (BLW)",
    ageRange: "8 meses",
    prepTime: 15,
    cookTime: 18,
    servings: 6,
    ingredients: [
      "1 taza de ramilletes de brócoli cocidos al vapor",
      "1 patata grande cocida y pelada",
      "2 cucharadas de pan rallado integral o harina de garbanzo",
      "1 cucharada de levadura nutricional (aporta un toque de queso delicioso sin sal)"
    ],
    steps: [
      "Chafa la patata cocida con un tenedor hasta tener un puré seco y firme.",
      "Pica el brócoli cocido al vapor finamente (solo los ramilletes blandos, descarta los tallos duros).",
      "En un bol, mezcla el puré de patata, el brócoli picado, el pan rallado integral (o harina de garbanzo) y la levadura nutricional.",
      "Con las manos limpias, amasa la mezcla y forma pequeñas croquetas alargadas u ovaladas que quepan en la mano de tu bebé.",
      "Precalienta el horno a 180°C y coloca las croquetas en una bandeja con papel de horno.",
      "Hornea durante 15-18 minutos, dándoles la vuelta a mitad del tiempo, hasta que estén ligeramente doradas pero tiernas por dentro."
    ],
    tips: [
      "Estas croquetas son fantásticas para que el bebé experimente texturas grumosas y desarrolle el masticado con las encías.",
      "La levadura nutricional es segura para bebés y añade vitamina B."
    ],
    variations: [
      "Puedes sustituir el brócoli por coliflor o calabacín rallado bien escurrido."
    ],
    nutritionalInfo: {
      calories: 110,
      proteins: 3.5,
      carbs: 21,
      fats: 0.8,
      iron: "1.1 mg",
      calcium: "40 mg",
      fiber: "3.2 g"
    },
    vitamins: ["Vitamina C", "Vitamina K", "Complejo B"],
    minerals: ["Potasio", "Calcio", "Hierro"],
    texture: "Sólido blando / Trozos manejables",
    difficulty: "Medio",
    conservation: "Conserva en la nevera en un envase cerrado por un máximo de 48 horas.",
    freezing: "Puedes congelarlas antes de hornear. Colócalas separadas en una bandeja y, una vez congeladas, pásalas a una bolsa. Duran 2 meses.",
    reheating: "Si están horneadas, recaliéntalas en un horno o sartén sin aceite para que no pierdan firmeza.",
    warnings: [
      "Asegúrate de que se enfríen a temperatura tibia antes de servir, ya que el puré de patata retiene mucho calor interno.",
      "Supervisa siempre que el bebé no introduzca porciones demasiado grandes en su boca."
    ],
    category: "cena",
    attributes: ["sin huevo", "sin leche", "sin azúcar", "rica en fibra", "sin gluten"]
  },
  {
    id: "r6",
    name: "Puré Cremoso de Pollo Orgánico con Guisantes y Calabacín",
    ageRange: "7 meses",
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    ingredients: [
      "50g de pechuga de pollo orgánica picada",
      "1/2 calabacín mediano con piel (bien lavado)",
      "1/4 taza de guisantes tiernos (frescos o congelados)",
      "1 patata pequeña pelada",
      "1 cucharadita de aceite de oliva virgen extra"
    ],
    steps: [
      "Trocea la patata y el calabacín en trozos pequeños.",
      "En una vaporera, coloca la patata, el calabacín, los guisantes y la pechuga de pollo cortada en cubitos pequeños.",
      "Cocina al vapor todo junto durante 15 minutos, comprobando que el pollo esté bien cocinado por dentro.",
      "Coloca todos los ingredientes en una batidora, añade 2-3 cucharadas de caldo vegetal sin sal o de agua para facilitar la mezcla.",
      "Tritura a velocidad máxima hasta que consigas una textura cremosa de puré espeso.",
      "Sirve tibio y mezcla el aceite de oliva justo antes de que el bebé lo consuma."
    ],
    tips: [
      "La cocción al vapor conserva mucho mejor los nutrientes del pollo y de los vegetales que hervir en agua abundante.",
      "Los guisantes son ricos en proteínas vegetales y aportan un dulzor natural muy agradable."
    ],
    variations: [
      "Sustituye el pollo por pavo o ternera magra para variar las fuentes de hierro."
    ],
    nutritionalInfo: {
      calories: 135,
      proteins: 10.5,
      carbs: 16,
      fats: 2.8,
      iron: "1.4 mg - Hierro Hemo de alta absorción",
      calcium: "28 mg",
      fiber: "2.8 g"
    },
    vitamins: ["Vitamina B12", "Vitamina B6", "Vitamina A"],
    minerals: ["Hierro (Hemo)", "Zinc", "Potasio"],
    texture: "Papilla espesa grumosa muy fina",
    difficulty: "Fácil",
    conservation: "Guarda en la nevera hasta 24 horas en tarros limpios.",
    freezing: "Apto para congelar. Consume antes de 2 meses.",
    reheating: "Calienta al baño maría o microondas. Revuelve insistentemente y prueba la temperatura antes de ofrecer.",
    warnings: [
      "El pollo debe estar completamente cocinado (sin partes rosadas) para evitar cualquier riesgo de salmonelosis.",
      "Lava muy bien la piel del calabacín si vas a utilizarla."
    ],
    category: "almuerzo",
    attributes: ["sin huevo", "sin leche", "sin gluten", "sin azúcar"]
  },
  {
    id: "r7",
    name: "Tortitas Blandas de Avena y Plátano (BLW Desayuno)",
    ageRange: "9 meses",
    prepTime: 5,
    cookTime: 6,
    servings: 4,
    ingredients: [
      "1 plátano maduro grande",
      "3 cucharadas de harina de avena integral",
      "1 huevo (previamente introducido con éxito)",
      "Unas gotas de aceite de coco o de oliva para la plancha"
    ],
    steps: [
      "Chafa muy bien el plátano con un tenedor en un plato hondo hasta que se haga un puré casi líquido.",
      "Añade el huevo y bate enérgicamente con el tenedor hasta integrarlo completamente con el plátano.",
      "Añade la harina de avena y mezcla bien hasta tener una masa homogénea de densidad media.",
      "Engrasa una sartén antiadherente con unas gotas de aceite de coco o de oliva y calienta a fuego medio-bajo.",
      "Vierte cucharadas de masa para formar minitortitas del tamaño de la palma del bebé.",
      "Cocina durante 2-3 minutos hasta que salgan pequeñas burbujas, dale la vuelta con cuidado y cocina por el otro lado durante 2 minutos más hasta que estén hechas por dentro."
    ],
    tips: [
      "Esta receta es un clásico para desayunos BLW saludables. Son blanditas y se deshacen fácilmente en la boca del bebé.",
      "El huevo aporta colina y proteínas de excelente calidad biológica para el desarrollo cerebral."
    ],
    variations: [
      "Si el bebé tiene alergia al huevo, puedes sustituirlo por 1 cucharada de semillas de chía hidratadas en 3 cucharadas de agua (huevo de chía)."
    ],
    nutritionalInfo: {
      calories: 160,
      proteins: 5.2,
      carbs: 24,
      fats: 4.8,
      iron: "1.3 mg",
      calcium: "35 mg",
      fiber: "3.1 g"
    },
    vitamins: ["Vitamina D", "Vitamina B12", "Vitamina A"],
    minerals: ["Potasio", "Fósforo", "Hierro", "Selenio"],
    texture: "Sólido blando esponjoso (BLW)",
    difficulty: "Fácil",
    conservation: "Se conservan muy bien en un táper en la nevera por 24 horas.",
    freezing: "Aptas para congelar. Sepáralas con papel encerado y congélalas por un mes.",
    reheating: "Unos segundos en la tostadora o sartén templada son suficientes para recuperar su esponjosidad.",
    warnings: [
      "El huevo es un alérgeno común. Introduce primero la yema y la clara por separado de forma gradual según consejo pediátrico."
    ],
    category: "desayuno",
    attributes: ["sin leche", "sin azúcar", "rica en fibra"]
  },
  {
    id: "r8",
    name: "Papilla Dulce de Pera y Manzana al Vapor con Toque de Coco",
    ageRange: "6 meses",
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    ingredients: [
      "1 pera madura pelada y sin corazón",
      "1 manzana dulce pelada y sin corazón",
      "1 cucharadita de aceite de coco virgen extra prensado en frío"
    ],
    steps: [
      "Corta la pera y la manzana en trozos medianos.",
      "Cocina al vapor durante 10 minutos hasta que estén sumamente tiernas.",
      "Tritura los trozos cocinados con la batidora de mano o aplástalos firmemente con un tenedor si deseas empezar con una textura chafada.",
      "Añade la cucharadita de aceite de coco virgen y mezcla muy bien para dar un toque de sabor exótico y grasas saludables."
    ],
    tips: [
      "La manzana y la pera al vapor son frutas ideales para iniciar la alimentación complementaria por su bajísimo índice de alergenicidad."
    ],
    variations: [
      "Añade una pizca de vainilla en polvo natural sin azúcar para potenciar su aroma dulce natural."
    ],
    nutritionalInfo: {
      calories: 90,
      proteins: 0.5,
      carbs: 19,
      fats: 2.1,
      iron: "0.3 mg",
      calcium: "15 mg",
      fiber: "3.1 g"
    },
    vitamins: ["Vitamina C", "Vitamina B2"],
    minerals: ["Potasio", "Grasas saludables", "Fósforo"],
    texture: "Papilla muy fina y suave / Compota",
    difficulty: "Fácil",
    conservation: "Hasta 48 horas en la nevera.",
    freezing: "Sí, excelente en recipientes pequeños de congelación por 3 meses.",
    reheating: "Sirve a temperatura ambiente o calienta ligeramente templado.",
    warnings: [
      "La compota se digiere rápido; no sustituye la lactancia, es un complemento nutricional."
    ],
    category: "merienda",
    attributes: ["sin huevo", "sin leche", "sin gluten", "sin azúcar"]
  },
  {
    id: "r9",
    name: "Arroz Cremoso de Pescado Blanco y Verduras Tiernas",
    ageRange: "9 meses",
    prepTime: 10,
    cookTime: 20,
    servings: 3,
    ingredients: [
      "60g de filete de pescado blanco (merluza o lenguado) sin espinas y sin piel",
      "3 cucharadas de arroz redondo",
      "1/4 cebolla pequeña finamente picada",
      "1/2 zanahoria rallada fina",
      "1.5 tazas de agua o caldo de verduras casero sin sal",
      "1 cucharadita de aceite de oliva virgen extra"
    ],
    steps: [
      "En un cazo pequeño con un poquito de aceite de oliva, rehoga la cebolla y la zanahoria rallada a fuego muy lento por 3 minutos.",
      "Añade el arroz y revuelve durante un minuto.",
      "Vierte el agua o caldo y sube el fuego hasta que hierva. Luego reduce al mínimo, tapa y cocina por 15 minutos.",
      "Comprueba minuciosamente que el filete de pescado no tenga ninguna espina pasándolo por tus dedos limpios. Desmenuza el pescado.",
      "Añade el pescado desmenuzado al arroz en los últimos 5 minutos de cocción, removiendo bien para integrar y que el arroz quede caldoso y tierno.",
      "Chafa ligeramente con un tenedor para aplastar los granos de arroz y el pescado antes de servir."
    ],
    tips: [
      "El pescado blanco aporta proteínas de alta calidad y ácidos grasos esenciales para el sistema nervioso del bebé.",
      "Utiliza un arroz redondo porque libera más almidón y crea una textura más cremosa y aglutinada que facilita tragar."
    ],
    variations: [
      "A partir de los 12 meses, puedes añadir un chorrito de leche o bebida de avena para darle más cremosidad al plato."
    ],
    nutritionalInfo: {
      calories: 150,
      proteins: 9.8,
      carbs: 23,
      fats: 2.9,
      iron: "0.9 mg",
      calcium: "38 mg",
      fiber: "1.2 g"
    },
    vitamins: ["Vitamina B12", "Vitamina D", "Vitamina A"],
    minerals: ["Fósforo", "Yodo", "Potasio", "Calcio"],
    texture: "Sólidos chafados con tenedor / Texturizado",
    difficulty: "Medio",
    conservation: "Se aconseja consumir preferentemente en el día por la sensibilidad alimentaria del pescado.",
    freezing: "No se recomienda congelar recetas que contengan arroz ya que cambia drásticamente su textura.",
    reheating: "Calentar templado agregando una cucharada de agua para devolver humedad.",
    warnings: [
      "¡REVISA LAS ESPINAS DE FORMA EXTREMA! Las espinas son un peligro grave de asfixia.",
      "El pescado es un alérgeno común. Introduce siempre de día para vigilar posibles erupciones o vómitos."
    ],
    category: "almuerzo",
    attributes: ["sin huevo", "sin leche", "sin gluten", "sin azúcar"]
  },
  {
    id: "r10",
    name: "Muffins de Calabaza, Manzana y Canela (Sin Azúcar)",
    ageRange: "12 meses",
    prepTime: 15,
    cookTime: 20,
    servings: 8,
    ingredients: [
      "1 taza de puré de calabaza asada",
      "1 manzana rallada fina",
      "1.5 tazas de harina de trigo integral o espelta integral",
      "1/2 taza de leche de avena o de almendras sin azúcar",
      "2 cucharaditas de polvo de hornear (impulsor químico)",
      "1 cucharadita de canela de Ceylán",
      "3 cucharadas de aceite de oliva suave o aceite de coco derretido",
      "1 huevo entero (opcional, ayuda a ligar)"
    ],
    steps: [
      "Precalienta el horno a 180°C y engrasa un molde para minimuffins.",
      "En un bol grande, mezcla los ingredientes húmedos: el puré de calabaza, la manzana rallada, la leche vegetal, el aceite y el huevo batido.",
      "En otro bol, tamiza la harina integral, el polvo de hornear y la canela.",
      "Junta los ingredientes secos con los húmedos removiendo suavemente con una espátula hasta conseguir una masa espesa. No mezcles en exceso.",
      "Vierte la masa en los moldes de muffins llenando hasta 3/4 partes de su capacidad.",
      "Hornea durante 18-20 minutos. Introduce un palillo de madera; debe salir limpio al pinchar el centro de un muffin.",
      "Deja enfriar por completo antes de desmoldar."
    ],
    tips: [
      "El dulzor proviene enteramente de la calabaza asada y la manzana madura. No añadas edulcorantes, miel ni azúcar.",
      "La miel de abeja está estrictamente prohibida en niños menores de 1 año por riesgo de botulismo infantil."
    ],
    variations: [
      "Añade pasas picadas muy pequeñitas remojadas previamente en agua caliente para dar más puntos de dulzor."
    ],
    nutritionalInfo: {
      calories: 110,
      proteins: 3.2,
      carbs: 18,
      fats: 3.8,
      iron: "1.0 mg",
      calcium: "42 mg",
      fiber: "2.8 g"
    },
    vitamins: ["Vitamina A", "Vitamina E", "Vitamina B1"],
    minerals: ["Calcio", "Hierro", "Magnesio"],
    texture: "Sólido blando esponjoso desmigable",
    difficulty: "Medio",
    conservation: "Conserva en una lata o táper hermético a temperatura ambiente por 2 días, o en la nevera hasta por 5 días.",
    freezing: "Congela de maravilla. Envuélvelos individualmente en film ecológico y congélalos por 3 meses. Descongela a temperatura ambiente en 20 minutos.",
    reheating: "Puedes templarlos unos segundos en el microondas o comerlos fríos.",
    warnings: [
      "Asegúrate de que el huevo y el gluten han sido previamente tolerados.",
      "Corta el muffin en trocitos pequeños antes de ofrecérselo al niño para evitar atragantamientos."
    ],
    category: "merienda",
    attributes: ["sin leche", "sin azúcar", "rica en fibra"]
  },
  {
    id: "r11",
    name: "Tortilla de Espinacas Baby y Queso Fresco sin Sal",
    ageRange: "12 meses",
    prepTime: 5,
    cookTime: 5,
    servings: 1,
    ingredients: [
      "1 taza de espinacas frescas baby bien lavadas",
      "1 huevo grande orgánico",
      "30g de queso fresco sin sal o requesón",
      "1 cucharadita de aceite de oliva virgen extra"
    ],
    steps: [
      "Pica las espinacas frescas finamente con un cuchillo.",
      "En una sartén pequeña, añade unas gotas de aceite de oliva y saltea las espinacas picadas por 1-2 minutos a fuego medio hasta que reduzcan de volumen. Retira y escurre el exceso de agua.",
      "En un bol pequeño, bate el huevo vigorosamente, añade el queso desmenuzado y las espinacas salteadas escurridas.",
      "Vierte la mezcla en la sartén antiadherente caliente.",
      "Cocina durante 2 minutos, dale la vuelta con la ayuda de un plato pequeño y cocina un minuto más por el otro lado hasta que el huevo esté completamente cuajado.",
      "Deja templar y córtala en tiras finas o cuadraditos antes de servir."
    ],
    tips: [
      "El huevo y las espinacas aportan hierro, ácido fólico y proteínas de alto valor.",
      "El queso fresco aporta calcio esencial para el desarrollo de los huesos y dientes."
    ],
    variations: [
      "Añade un poco de tomate pelado picado sin semillas para un toque jugoso y vitamina C."
    ],
    nutritionalInfo: {
      calories: 140,
      proteins: 9.5,
      carbs: 1.5,
      fats: 10.2,
      iron: "1.8 mg",
      calcium: "110 mg - ¡Riquísimo en calcio!",
      fiber: "0.8 g"
    },
    vitamins: ["Vitamina A", "Vitamina K", "Complejo B", "Vitamina C"],
    minerals: ["Calcio", "Hierro", "Fósforo", "Yodo"],
    texture: "Sólido blando masticable",
    difficulty: "Fácil",
    conservation: "Consumir al instante. El huevo recalentado pierde propiedades y textura.",
    freezing: "No apto para congelar.",
    reheating: "No calentar repetidamente.",
    warnings: [
      "Usa siempre queso fresco SIN SAL. Los bebés no deben consumir sodio añadido.",
      "El huevo debe estar 100% cuajado."
    ],
    category: "cena",
    attributes: ["sin azúcar", "sin gluten", "rica en hierro", "rica en calcio"]
  },
  {
    id: "r12",
    name: "Hamburguesitas Súper-Hierro de Ternera y Espinaca",
    ageRange: "10 meses",
    prepTime: 15,
    cookTime: 10,
    servings: 4,
    ingredients: [
      "120g de carne de ternera picada magra de excelente calidad",
      "1/2 taza de hojas de espinaca cocidas, escurridas al máximo y picadas",
      "2 cucharadas de copos de avena finos (para ligar la masa)",
      "1/4 cucharadita de ajo en polvo (opcional, para saborizar sin sal)",
      "1 cucharadita de aceite de oliva"
    ],
    steps: [
      "En un bol grande, mezcla la carne picada con la espinaca finamente trinchada.",
      "Añade los copos de avena finos y el ajo en polvo. Amasa con las manos hasta conseguir una textura compacta que se deje moldear.",
      "Divide la masa en 4 partes y dales forma de hamburguesa pequeña, aplanándolas con la palma de la mano (grosor aproximado de 1 cm).",
      "Calienta una sartén antiadherente con la cucharadita de aceite de oliva.",
      "Cocina las hamburguesitas a fuego medio durante unos 4-5 minutos por cada lado, asegurándote de que el centro quede totalmente cocinado y no quede nada rosado."
    ],
    tips: [
      "La carne roja es una de las mejores fuentes de hierro hemo, el cual el cuerpo del bebé absorbe de manera sumamente eficiente.",
      "La avena absorbe los jugos de la carne haciendo que la hamburguesa quede muy blanda e ideal para triturar con las encías."
    ],
    variations: [
      "Puedes prepararlas con carne de pollo o pavo molida si lo prefieres."
    ],
    nutritionalInfo: {
      calories: 115,
      proteins: 11.2,
      carbs: 4.5,
      fats: 5.6,
      iron: "2.1 mg - Fuente rica de hierro hemo",
      calcium: "18 mg",
      fiber: "1.1 g"
    },
    vitamins: ["Vitamina B12", "Hierro Hemo", "Vitamina A"],
    minerals: ["Hierro", "Zinc", "Potasio", "Magnesio"],
    texture: "Sólido blando desmenuzable",
    difficulty: "Fácil",
    conservation: "Hasta 24 horas en un recipiente cerrado en nevera.",
    freezing: "Aptas para congelar crudas. Envuélvelas bien por separado. Duran 2 meses.",
    reheating: "Cocina directamente congeladas en la sartén a fuego muy lento con tapa para que se cocine el interior.",
    warnings: [
      "La carne picada debe consumirse con rigurosa frescura y estar completamente cocinada en su interior."
    ],
    category: "almuerzo",
    attributes: ["sin huevo", "sin leche", "sin azúcar", "rica en hierro"]
  },
  {
    id: "r13",
    name: "Arepitas de Maíz con Aguacate Cremoso",
    ageRange: "18 meses",
    prepTime: 10,
    cookTime: 12,
    servings: 3,
    ingredients: [
      "1/2 taza de harina de maíz precocida (blanca o amarilla)",
      "1/2 taza de agua tibia",
      "1/2 aguacate maduro mediano",
      "1 cucharadita de aceite de oliva para la plancha"
    ],
    steps: [
      "En un bol pequeño, vierte el agua tibia y agrega la harina de maíz poco a poco, mezclando constantemente para evitar grumos.",
      "Amasa bien con las manos por 2 minutos hasta conseguir una masa suave, húmeda y moldeable que no se agriete.",
      "Forma pequeñas esferas de masa y aplástalas suavemente con las palmas de las manos para dar forma de arepitas delgadas (de unos 5-6 cm de diámetro).",
      "Calienta una plancha o sartén antiadherente a fuego medio y engrásala ligeramente con el aceite de oliva.",
      "Cocina las arepitas durante 5-6 minutos por cada lado, hasta que se forme una capa crujiente muy fina en la superficie pero permanezcan blandas por dentro.",
      "Abre las arepitas por la mitad y rellénalas con aguacate maduro machacado con tenedor (estilo puré) antes de servirlas tibias."
    ],
    tips: [
      "El maíz es naturalmente libre de gluten y aporta carbohidratos saludables de fácil digestión.",
      "El aguacate aporta ácido oleico (grasas saludables cruciales para el desarrollo cognitivo del lactante)."
    ],
    variations: [
      "Puedes mezclar un poco de queso fresco sin sal rallado o pechuga de pollo deshilachada con el aguacate para un relleno más nutritivo."
    ],
    nutritionalInfo: {
      calories: 125,
      proteins: 2.0,
      carbs: 16,
      fats: 6.2,
      iron: "0.5 mg",
      calcium: "12 mg",
      fiber: "2.5 g"
    },
    vitamins: ["Vitamina E", "Vitamina B6", "Ácido Fólico"],
    minerals: ["Potasio", "Magnesio", "Fósforo"],
    texture: "Sólido blando manejable (BLW)",
    difficulty: "Fácil",
    conservation: "Consumir al instante. Las arepitas se ponen duras al enfriarse y el aguacate se oxida.",
    freezing: "Se pueden congelar las arepitas precocidas sin el relleno. Duran hasta 2 meses.",
    reheating: "Calentar en sartén con tapa añadiendo unas gotas de agua para que queden tiernas.",
    warnings: [
      "Asegúrate de que el relleno esté tibio o a temperatura ambiente.",
      "Utiliza harina de maíz 100% pura sin conservantes ni sodio añadido."
    ],
    category: "desayuno",
    attributes: ["sin huevo", "sin leche", "sin gluten", "sin azúcar"]
  },
  {
    id: "r14",
    name: "Estofado de Ternera con Papas y Calabaza Tierna",
    ageRange: "18 meses",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    ingredients: [
      "150g de carne de ternera magra picada o picada muy fina",
      "1 papa mediana pelada y cortada en cubitos pequeños",
      "1/2 taza de calabaza cortada en trozos pequeños",
      "1/2 zanahoria picada fina",
      "1/2 taza de caldo de carne casero sin sal",
      "1 cucharadita de aceite de oliva"
    ],
    steps: [
      "En una olla pequeña, calienta el aceite de oliva a fuego medio y sella la ternera picada por 3 minutos hasta que cambie de color.",
      "Agrega la zanahoria picada, la papa en cubitos y la calabaza.",
      "Vierte el caldo de carne casero sin sal (debe cubrir ligeramente los ingredientes).",
      "Lleva a ebullición, luego reduce el fuego a bajo, tapa la olla y cocina a fuego lento durante 25-30 minutos, hasta que las papas y la calabaza se deshagan al tocarlas y la ternera esté extremadamente tierna.",
      "Chafa las verduras ligeramente con un tenedor para dar una consistencia de estofado espeso con trocitos blandos manejables por el bebé."
    ],
    tips: [
      "Garantiza un aporte óptimo de hierro hemo de alta absorción, esencial para evitar la anemia ferropénica en la fase de crecimiento acelerado.",
      "El caldo casero aporta aminoácidos y colágeno natural que protege la barrera intestinal."
    ],
    variations: [
      "Puedes agregar un toque sutil de comino molido para iniciar a tu bebé en condimentos saludables y naturales."
    ],
    nutritionalInfo: {
      calories: 145,
      proteins: 11.5,
      carbs: 15,
      fats: 4.8,
      iron: "2.3 mg - Muy alto en hierro hemo",
      calcium: "20 mg",
      fiber: "2.1 g"
    },
    vitamins: ["Vitamina B12", "Vitamina A (Beta-caroteno)", "Vitamina B6"],
    minerals: ["Hierro (Hemo)", "Zinc", "Potasio", "Fósforo"],
    texture: "Sólidos chafados con tenedor / Texturizado blando",
    difficulty: "Medio",
    conservation: "Conserva en la nevera en un recipiente hermético hasta por 48 horas.",
    freezing: "Apto para congelar por un máximo de 2 meses.",
    reheating: "Calentar bien en olla, añadiendo un poquito de agua si se ha resecado, revolviendo para evitar puntos calientes.",
    warnings: [
      "Revisa que la carne no tenga trozos grasosos ni nervios que puedan dificultar el masticado con las encías.",
      "Sirve siempre tibio, nunca caliente."
    ],
    category: "almuerzo",
    attributes: ["sin huevo", "sin leche", "sin gluten", "sin azúcar", "rica en hierro"]
  },
  {
    id: "r15",
    name: "Mini Albóndigas de Pollo y Salsa de Tomate Casera",
    ageRange: "9 meses",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    ingredients: [
      "120g de pechuga de pollo molida",
      "2 cucharadas de avena molida (harina de avena)",
      "2 tomates maduros medianos (pelados y sin semillas)",
      "1/4 cucharadita de albahaca seca en polvo",
      "1 cucharadita de aceite de oliva"
    ],
    steps: [
      "En un bol, mezcla el pollo molido con la avena molida. Integra bien con tus manos limpias y forma mini albóndigas del tamaño de una uva grande (para que el bebé las coja fácilmente).",
      "En una olla pequeña, machaca los tomates pelados y sin semillas con un chorrito de agua para formar una salsa rústica. Añade la albahaca.",
      "Coloca las mini albóndigas con mucho cuidado dentro de la salsa de tomate hirviendo a fuego lento.",
      "Tapa y cocina a fuego bajo durante 15-20 minutos, girándolas suavemente a mitad del tiempo para que se cuezan perfectamente por dentro.",
      "Sirve dos o tres albóndigas bañadas con un poco de la salsa de tomate tibia."
    ],
    tips: [
      "La vitamina C presente en el tomate ayuda a absorber mejor los nutrientes minerales de la avena y el pollo.",
      "La avena hace que la carne de las albóndigas quede jugosa, tierna y fácil de digerir."
    ],
    variations: [
      "Puedes agregar un poco de calabacín rallado muy fino a la masa de las albóndigas para aumentar el consumo de verduras de forma camuflada."
    ],
    nutritionalInfo: {
      calories: 110,
      proteins: 9.8,
      carbs: 6.0,
      fats: 3.2,
      iron: "1.1 mg",
      calcium: "18 mg",
      fiber: "1.4 g"
    },
    vitamins: ["Vitamina C", "Vitamina B6", "Licopeno"],
    minerals: ["Zinc", "Potasio", "Fósforo"],
    texture: "Sólido blando desmenuzable (BLW)",
    difficulty: "Medio",
    conservation: "Conserva en nevera hasta por 24 horas en un recipiente cerrado.",
    freezing: "Puedes congelarlas ya cocidas con su salsa por 2 meses.",
    reheating: "Calentar al baño maría o microondas suavemente.",
    warnings: [
      "Asegúrate de que las albóndigas estén bien cocidas y se deshagan con una ligera presión del tenedor."
    ],
    category: "almuerzo",
    attributes: ["sin huevo", "sin leche", "sin azúcar"]
  },
  {
    id: "r16",
    name: "Muffin de Zanahoria y Manzana (Especial Bebé)",
    ageRange: "9 meses",
    prepTime: 10,
    cookTime: 18,
    servings: 6,
    ingredients: [
      "1 zanahoria mediana pelada y finamente rallada",
      "1 manzana dulce madura rallada",
      "1/2 taza de harina de avena integral",
      "1 cucharadita de levadura química sin sodio",
      "1 cucharada de aceite de coco derretido",
      "1 pizca de canela de Ceylán"
    ],
    steps: [
      "Precalienta el horno a 180°C y prepara moldes para muffins pequeños de silicona.",
      "En un bol hondo, combina la zanahoria rallada, la manzana rallada y el aceite de coco derretido.",
      "Agrega la harina de avena, la canela de Ceylán y la levadura química sin sodio.",
      "Mezcla todo con paciencia hasta que la avena absorba la humedad de las frutas y quede una masa espesa y densa.",
      "Reparte la mezcla en los moldes llenando 3/4 partes.",
      "Hornea por 15-18 minutos hasta que se sientan firmes al tacto y un palillo salga limpio.",
      "Deja enfriar completamente antes de retirar de los moldes para que no se desmoronen."
    ],
    tips: [
      "Esponjosos y deliciosamente dulces gracias al azúcar natural (fructosa) de la manzana y la zanahoria.",
      "Perfectos para desayunos o meriendas rápidas fuera de casa."
    ],
    variations: [
      "A partir de los 12 meses, puedes añadir un toque de plátano bien machacado para un sabor aún más dulce."
    ],
    nutritionalInfo: {
      calories: 85,
      proteins: 1.8,
      carbs: 12,
      fats: 2.5,
      iron: "0.6 mg",
      calcium: "22 mg",
      fiber: "2.0 g"
    },
    vitamins: ["Vitamina A (Beta-caroteno)", "Vitamina B1", "Vitamina C"],
    minerals: ["Potasio", "Calcio", "Magnesio"],
    texture: "Sólido blando esponjoso",
    difficulty: "Fácil",
    conservation: "Guardar en un envase hermético en la nevera por un máximo de 3 días.",
    freezing: "Congela perfecto envueltos individualmente por 3 meses.",
    reheating: "Entibiar unos 10 segundos en microondas para recuperar esponjosidad.",
    warnings: [
      "Vigila que el bebé tome mordiscos pequeños adecuados a su masticación."
    ],
    category: "merienda",
    attributes: ["sin huevo", "sin leche", "sin azúcar", "rica en fibra"]
  }
];

