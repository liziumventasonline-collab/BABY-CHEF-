import { PdfRecipe } from "../types";

export interface PDFAgeGroupBook {
  title: string;
  ageRange: string;
  recommendations: string[];
  tips: string[];
  categories: {
    breakfast: PdfRecipe[];
    lunchDinner: PdfRecipe[];
    snacks: PdfRecipe[];
  };
}

export const RECIPES_BY_AGE_PDF: { [key: string]: PDFAgeGroupBook } = {
  "9-12": {
    title: "Recetario Nutritivo para Bebés (9-12 meses)",
    ageRange: "9-12 meses",
    recommendations: [
      "Evitar sal, azúcar y miel en todas las recetas.",
      "Cortar los alimentos en trozos adecuados para la edad (masticación y pinza).",
      "Supervisar siempre durante las comidas.",
      "Introducir nuevos alimentos de forma progresiva para detectar intolerancias o alergias."
    ],
    tips: [
      "Textura primero: Si una receta queda seca, añade agua de cocción, leche o un chorrito de aceite de oliva.",
      "Congela en porciones: Albóndigas, croquetas, muffins y salsas te ahorran tiempo.",
      "Repite exposición: Si no acepta hoy, vuelve a ofrecer en unos días con otra presentación.",
      "Recuerda que cada bebé es diferente. Observa cómo reacciona a las diferentes texturas y sabores."
    ],
    categories: {
      breakfast: [
        {
          id: "pdf_9_12_avena_manzana",
          name: "Avena cremosa con puré de manzana",
          ageRange: "9-12 meses",
          prepTime: 5,
          cookTime: 10,
          servings: 1,
          ingredients: [
            "3 cdas avena fina",
            "½ taza leche materna, fórmula o agua",
            "½ manzana cocida y hecha puré"
          ],
          steps: [
            "Cocinar la avena a fuego bajo en el líquido elegido.",
            "Añadir el puré de manzana cocido y mezclar uniformemente.",
            "Servir tibio con una textura suave."
          ],
          tips: ["La avena fina es ideal para iniciar texturas más grumosas pero suaves."],
          variations: ["Sustituye la manzana por pera cocida en puré."],
          texture: "Puré espeso grumoso suave",
          category: "desayuno",
          attributes: ["sin huevo", "sin azúcar"]
        },
        {
          id: "pdf_9_12_tortilla_espinaca",
          name: "Tortilla suave con espinacas picadas",
          ageRange: "9-12 meses",
          prepTime: 5,
          cookTime: 5,
          servings: 1,
          ingredients: [
            "1 huevo pequeño",
            "1 cda espinaca finamente picada",
            "½ cdta aceite de oliva"
          ],
          steps: [
            "Batir el huevo en un tazón pequeño y mezclar con la espinaca finamente picada.",
            "Verter en una sartén antiadherente caliente con el aceite de oliva.",
            "Cocinar a fuego bajo hasta que cuaje por completo.",
            "Cortar en tiras blandas fáciles de agarrar tipo finger food."
          ],
          tips: ["Asegura que la espinaca esté muy fina para facilitar la deglución."],
          variations: ["Puedes agregar calabacín rallado bien escurrido."],
          texture: "Sólido blando en tiras",
          category: "desayuno",
          attributes: ["sin leche", "sin azúcar"]
        },
        {
          id: "pdf_9_12_pan_aguacate",
          name: "Pan integral con aguacate machacado",
          ageRange: "9-12 meses",
          prepTime: 5,
          cookTime: 0,
          servings: 1,
          ingredients: [
            "1 rebanada pan integral blando, sin costra dura",
            "¼ aguacate maduro"
          ],
          steps: [
            "Aplasta muy bien el aguacate con un tenedor hasta formar una pasta suave.",
            "Unta una capa fina de aguacate sobre la rebanada de pan integral blando.",
            "Corta el pan en tiras gruesas (tipo finger food) para que el bebé lo sostenga fácilmente."
          ],
          tips: ["El aguacate aporta grasas saludables ideales para el desarrollo cerebral."],
          variations: ["Agrega unas gotitas de limón para evitar la oxidación del aguacate."],
          texture: "Finger food blando",
          category: "desayuno",
          attributes: ["sin huevo", "sin leche", "sin azúcar"]
        },
        {
          id: "pdf_9_12_mini_pancakes",
          name: "Mini pancakes de plátano y avena",
          ageRange: "9-12 meses",
          prepTime: 5,
          cookTime: 6,
          servings: 2,
          ingredients: [
            "½ plátano maduro",
            "2 cda avena molida",
            "1 huevo pequeño (o ½ para textura más suave)"
          ],
          steps: [
            "Pisa muy bien el plátano con un tenedor hasta que no tenga grumos grandes.",
            "Mezcla con el huevo batido y la avena molida.",
            "En una sartén antiadherente vierte porciones pequeñas para formar minipancakes.",
            "Cocina por unos 2 minutos de cada lado a fuego muy bajo."
          ],
          tips: ["Sírvelos tibios cortados en trocitos adecuados para su pinza."],
          variations: ["Puedes agregar una pizca de canela en polvo para sazonar."],
          texture: "Esponjoso suave",
          category: "desayuno",
          attributes: ["sin leche", "sin azúcar"]
        },
        {
          id: "pdf_9_12_yogur_pera",
          name: "Yogur natural con pera madura",
          ageRange: "9-12 meses",
          prepTime: 5,
          cookTime: 0,
          servings: 1,
          ingredients: [
            "½ taza yogur natural sin azúcar",
            "½ pera madura en cubitos muy pequeños"
          ],
          steps: [
            "Sirve el yogur natural en un tazón pequeño.",
            "Lava, pela y corta la pera en cubitos muy pequeñitos.",
            "Mezcla el yogur con la pera. Si lo prefieres, aplasta la pera un poco para suavizar la mezcla."
          ],
          tips: ["El yogur aporta calcio y probióticos, y la pera aporta agua y fibra digestiva."],
          variations: ["Sustituye la pera por plátano maduro picadito."],
          texture: "Líquido espeso con trocitos blandos",
          category: "desayuno",
          attributes: ["sin huevo", "sin azúcar"]
        },
        {
          id: "pdf_9_12_muffins_zanahoria",
          name: "Muffins suaves de zanahoria y plátano",
          ageRange: "9-12 meses",
          prepTime: 10,
          cookTime: 18,
          servings: 6,
          ingredients: [
            "1 plátano maduro",
            "½ taza zanahoria rallada fina",
            "1 huevo entero",
            "½ taza avena molida",
            "1 cdta aceite suave (girasol o maíz)"
          ],
          steps: [
            "Precalienta el horno a 180°C.",
            "Pisa el plátano, añade la zanahoria rallada fina, el huevo batido, la avena molida y el aceite.",
            "Mezcla muy bien todo hasta integrar los ingredientes.",
            "Rellena moldes mini y hornea por 15 a 18 minutos. Enfría y sirve cortado en cuartos."
          ],
          tips: ["Excelente opción para meriendas portátiles o desayunos BLW."],
          variations: ["Sustituye la zanahoria por calabaza cocida machacada."],
          texture: "Sólido blando horneado",
          category: "desayuno",
          attributes: ["sin leche", "sin azúcar"]
        },
        {
          id: "pdf_9_12_papilla_pera_avena",
          name: "Papilla de pera y avena cocida",
          ageRange: "9-12 meses",
          prepTime: 5,
          cookTime: 5,
          servings: 1,
          ingredients: [
            "½ pera madura",
            "2 cda avena cocida",
            "2-3 cda agua o leche para ajustar"
          ],
          steps: [
            "Cocina la avena en agua durante unos 5 minutos hasta que esté bien blanda.",
            "Tritura o pisa muy bien la pera madura junto con la avena cocida.",
            "Ajusta el líquido según la textura preferida por el bebé y sirve tibio."
          ],
          tips: ["Perfecto para días en que el bebé prefiere texturas más reconfortantes."],
          variations: ["Utiliza manzana cocida en lugar de pera."],
          texture: "Papilla cremosa con textura",
          category: "desayuno",
          attributes: ["sin huevo", "sin azúcar"]
        },
        {
          id: "pdf_9_12_tostaditas_queso",
          name: "Tostaditas con queso fresco",
          ageRange: "9-12 meses",
          prepTime: 5,
          cookTime: 2,
          servings: 1,
          ingredients: [
            "1 rebanada pan integral blando",
            "1-2 cda queso fresco pasteurizado desmenuzado"
          ],
          steps: [
            "Tuesta la rebanada de pan muy ligeramente (debe quedar blanda por dentro, no crujiente dura).",
            "Coloca el queso fresco desmenuzado encima y presiona ligeramente para que se adhiera.",
            "Corta en tiras largas fáciles de manipular."
          ],
          tips: ["Verifica que el queso sea pasteurizado y bajo en sal."],
          variations: ["Puedes untar una capa milimétrica de aguacate abajo del queso."],
          texture: "Finger food blando tierno",
          category: "desayuno",
          attributes: ["sin huevo", "sin azúcar"]
        },
        {
          id: "pdf_9_12_arroz_con_leche",
          name: "Arroz cremoso con leche y fruta",
          ageRange: "9-12 meses",
          prepTime: 5,
          cookTime: 10,
          servings: 1,
          ingredients: [
            "¼ taza arroz bien cocido",
            "¼ - ½ taza leche materna o de fórmula",
            "2-3 cda fruta blanda picada (plátano o pera)"
          ],
          steps: [
            "Mezcla el arroz previamente cocido (muy blando) con la leche en una ollita y calienta suavemente.",
            "Agrega la fruta picada y aplasta un poco con un tenedor para integrar sabores.",
            "Cocina hasta obtener una textura cremosa y suave."
          ],
          tips: ["El arroz debe estar sobrecocido para que sea extremadamente tierno."],
          variations: ["Sazona con un toquecito mínimo de canela en polvo."],
          texture: "Cremosa con granos tiernos",
          category: "desayuno",
          attributes: ["sin huevo", "sin azúcar"]
        },
        {
          id: "pdf_9_12_batido_platano",
          name: "Batido cremoso de plátano con yogur",
          ageRange: "9-12 meses",
          prepTime: 5,
          cookTime: 0,
          servings: 1,
          ingredients: [
            "½ plátano maduro",
            "¼ - ½ taza yogur natural sin azúcar",
            "2-3 cda agua para aligerar si es necesario"
          ],
          steps: [
            "Coloca el plátano y el yogur en una licuadora o procesador de alimentos.",
            "Licúa hasta que quede una consistencia completamente suave y cremosa.",
            "Ofrece al bebé con una cucharita o en un vasito entrenador."
          ],
          tips: ["Es ideal para refrescar encías inflamadas por la dentición."],
          variations: ["Agrega una fresa muy bien lavada si ya ha sido introducida."],
          texture: "Líquido cremoso espeso",
          category: "desayuno",
          attributes: ["sin huevo", "sin azúcar"]
        }
      ],
      lunchDinner: [
        {
          id: "pdf_9_12_arroz_pollo_zanahoria",
          name: "Arroz con pollo desmenuzado y zanahoria",
          ageRange: "9-12 meses",
          prepTime: 10,
          cookTime: 15,
          servings: 1,
          ingredients: [
            "¼ taza arroz cocido suave",
            "2-3 cda pollo desmenuzado cocido",
            "2 cda zanahoria al vapor picada fina",
            "1 cdta aceite de oliva virgen extra"
          ],
          steps: [
            "Junta en un cuenco el arroz cocido bien tierno, el pollo desmenuzado y la zanahoria.",
            "Calienta la mezcla y añade el aceite de oliva al final.",
            "Sirve y ajusta la humedad agregando una o dos cucharadas de caldo de cocción si queda seco."
          ],
          tips: ["Desmenuza el pollo en fibras extremadamente delgadas e hilos cortos."],
          variations: ["Cambia la zanahoria por calabacín cocido."],
          texture: "Chafado tierno húmedo",
          category: "almuerzo",
          attributes: ["sin huevo", "sin leche", "sin azúcar"]
        },
        {
          id: "pdf_9_12_albondigas_pollo",
          name: "Albóndigas de pollo y avena al horno",
          ageRange: "9-12 meses",
          prepTime: 10,
          cookTime: 15,
          servings: 2,
          ingredients: [
            "200 g pollo molido crudo",
            "3 cda avena molida",
            "1 cda cebolla finamente picada",
            "1 cdta aceite de oliva"
          ],
          steps: [
            "Mezcla muy bien el pollo molido, la avena molida y la cebolla picadita.",
            "Forma bolitas pequeñas del tamaño de una nuez con las manos húmedas.",
            "Coloca en una bandeja aceitada y hornea a 180°C por 12 a 15 minutos para que queden jugosas.",
            "Sirve acompañadas de vegetales cocidos al vapor."
          ],
          tips: ["Asegúrate de no sobrecocerlas para evitar que se pongan duras o secas."],
          variations: ["Puedes agregar calabacín rallado exprimido a la mezcla de carne."],
          texture: "Sólidos blandos masticables",
          category: "almuerzo",
          attributes: ["sin leche", "sin azúcar"]
        },
        {
          id: "pdf_9_12_pescado_camote",
          name: "Pescado blanco al vapor con puré de camote",
          ageRange: "9-12 meses",
          prepTime: 10,
          cookTime: 12,
          servings: 1,
          ingredients: [
            "60-80 g filete de pescado blanco (sin espinas)",
            "½ camote (batata)",
            "1 cdta aceite de oliva"
          ],
          steps: [
            "Cocina el camote en cubitos al vapor hasta que esté muy tierno y haz un puré rústico.",
            "Cocina el pescado blanco al vapor de 6 a 8 minutos.",
            "Desmenuza minuciosamente el pescado verificando que no queden espinas, intégralo al camote y añade aceite."
          ],
          tips: ["El camote aporta una textura cremosa y un dulzor natural delicioso."],
          variations: ["Sustituye el camote por calabaza asada."],
          texture: "Chafado húmedo suave",
          category: "almuerzo",
          attributes: ["sin huevo", "sin leche", "sin azúcar"]
        },
        {
          id: "pdf_9_12_sopa_fideos",
          name: "Sopa de verduras con fideos pequeños",
          ageRange: "9-12 meses",
          prepTime: 5,
          cookTime: 10,
          servings: 2,
          ingredients: [
            "2 tazas agua o caldo casero sin sal",
            "¼ taza fideo cabello de ángel o similar",
            "½ taza verduras picadas en cubitos (zanahoria, calabacín)"
          ],
          steps: [
            "Pon a hervir el agua o caldo y agrega las verduras picadas finas de 8 a 10 minutos.",
            "Añade los fideos pequeños y cocina hasta que queden completamente blandos.",
            "Sirve templado para evitar quemaduras."
          ],
          tips: ["Los fideos delgados se mastican fácilmente con las encías."],
          variations: ["Puedes agregar pollo picado muy fino para añadir proteína."],
          texture: "Sopa blanda con fideos",
          category: "almuerzo",
          attributes: ["sin huevo", "sin leche", "sin azúcar"]
        },
        {
          id: "pdf_9_12_tortilla_patata",
          name: "Tortilla de patata al horno",
          ageRange: "9-12 meses",
          prepTime: 10,
          cookTime: 15,
          servings: 2,
          ingredients: [
            "1 papa pequeña en cubitos cocidos blandos",
            "2 huevos",
            "1 cdta aceite de oliva"
          ],
          steps: [
            "Bate los huevos en un bol grande y añade los cubitos de papa cocida tierna.",
            "Vierte la mezcla en un molde pequeño engrasado.",
            "Hornea a 180°C por 12 a 15 minutos hasta que esté cuajada. Corta en cuadritos blandos."
          ],
          tips: ["Corta en cubos pequeños o bastones seguros para que practiquen la pinza."],
          variations: ["Agrega cebolla picada y salteada previamente para más sabor."],
          texture: "Sólidos blandos cortables",
          category: "almuerzo",
          attributes: ["sin leche", "sin azúcar"]
        },
        {
          id: "pdf_9_12_pasta_tomate",
          name: "Pasta corta con tomate casero y queso",
          ageRange: "9-12 meses",
          prepTime: 5,
          cookTime: 10,
          servings: 1,
          ingredients: [
            "¼ taza pasta corta (ej. espirales o coditos) muy blanda",
            "3-4 cda salsa de tomate natural casera",
            "1 cda queso fresco rallado"
          ],
          steps: [
            "Cocina la pasta más tiempo del habitual para que quede sumamente blanda.",
            "Mezcla con la salsa de tomate tibia.",
            "Espolvorea el queso fresco rallado por encima. Corta la pasta si es necesario."
          ],
          tips: ["La salsa de tomate casera debe ser hecha solo con tomate maduro cocido y colado."],
          variations: ["Sustituye la pasta por arroz tierno cocido."],
          texture: "Trocitos blandos humectados",
          category: "almuerzo",
          attributes: ["sin huevo", "sin azúcar"]
        },
        {
          id: "pdf_9_12_lentejas_verdura",
          name: "Lentejas con calabacín y zanahoria",
          ageRange: "9-12 meses",
          prepTime: 10,
          cookTime: 15,
          servings: 1,
          ingredients: [
            "3 cda lenteja cocida muy tierna",
            "2 cda calabacín en cubitos blandos",
            "2 cda zanahoria en cubitos blandos",
            "Unas cucharadas de agua o caldo"
          ],
          steps: [
            "Junta las lentejas cocidas tiernas y las verduras en un cazo pequeño.",
            "Calienta a fuego bajo añadiendo unas gotas de agua para mantener la humedad.",
            "Aplasta un poco con un tenedor para dar una textura rústica semi-chafada."
          ],
          tips: ["Excelente fuente de hierro vegetal. Sírvelo con un chorrito de limón para mejorar la absorción."],
          variations: ["Añade camote en lugar de zanahoria."],
          texture: "Chafado rústico",
          category: "almuerzo",
          attributes: ["sin huevo", "sin leche", "sin azúcar"]
        },
        {
          id: "pdf_9_12_brocoli_arroz",
          name: "Brócoli al vapor con arroz",
          ageRange: "9-12 meses",
          prepTime: 5,
          cookTime: 8,
          servings: 1,
          ingredients: [
            "¼ taza arroz cocido tierno",
            "3-4 arbolitos de brócoli muy blandos",
            "1 cdta aceite de oliva"
          ],
          steps: [
            "Cocina el brócoli al vapor hasta que los ramilletes estén extremadamente blandos y deshagan al tacto.",
            "Pica muy finos los arbolitos de brócoli cocidos.",
            "Mezcla el brócoli picado con el arroz cocido tibio, añade el aceite de oliva y un chorrito de agua para amalgamar."
          ],
          tips: ["Este plato es una delicia sencilla y llena de antioxidantes."],
          variations: ["Sustituye el arroz por sémola de trigo cocida."],
          texture: "Trocitos muy pequeños húmedos",
          category: "almuerzo",
          attributes: ["sin huevo", "sin leche", "sin azúcar"]
        },
        {
          id: "pdf_9_12_pure_calabaza_pollo",
          name: "Puré mixto de calabaza y pollo",
          ageRange: "9-12 meses",
          prepTime: 5,
          cookTime: 10,
          servings: 1,
          ingredients: [
            "½ taza calabaza cocida tierna",
            "2-3 cda pollo desmenuzado muy tierno",
            "2-3 cda agua de cocción de la calabaza o caldo"
          ],
          steps: [
            "Tritura la calabaza cocida con el agua hasta obtener un puré sedoso.",
            "Incorpora el pollo desmenuzado sumamente fino en el puré.",
            "Mezcla bien para que el pollo se distribuya de forma homogénea y sirve tibio."
          ],
          tips: ["Ideal para bebés que todavía están haciendo la transición a sólidos enteros."],
          variations: ["Cambia la calabaza por zanahoria cocida."],
          texture: "Puré con hilitos de pollo",
          category: "almuerzo",
          attributes: ["sin huevo", "sin leche", "sin azúcar"]
        },
        {
          id: "pdf_9_12_croquetas_arroz",
          name: "Croquetas de arroz y verduras al horno",
          ageRange: "9-12 meses",
          prepTime: 10,
          cookTime: 15,
          servings: 2,
          ingredients: [
            "½ taza arroz cocido tierno",
            "¼ taza verduras picadas cocidas (zanahoria o brócoli)",
            "1 huevo pequeño",
            "1 cdta aceite de oliva"
          ],
          steps: [
            "En un bol mezcla el arroz cocido, las verduras picaditas y el huevo batido.",
            "Forma pequeñas croquetas oblongas con tus manos húmedas.",
            "Colócalas en una bandeja para horno previamente engrasada.",
            "Hornea a 180°C por 12-15 minutos, girándolas a la mitad de cocción."
          ],
          tips: ["Ofrece tibias para que no quemen las encías."],
          variations: ["Puedes rebozarlas ligeramente con una capa fina de avena molida antes de hornear."],
          texture: "Sólido blando desmenuzable",
          category: "almuerzo",
          attributes: ["sin leche", "sin azúcar"]
        },
        {
          id: "pdf_9_12_pescaditos_avena",
          name: "Pescaditos rebozados en avena",
          ageRange: "9-12 meses",
          prepTime: 10,
          cookTime: 12,
          servings: 2,
          ingredients: [
            "80 g pescado blanco en tiras anchas",
            "3 cda avena molida",
            "1 huevo batido",
            "1 cdta aceite de oliva"
          ],
          steps: [
            "Verifica que las tiras de pescado no tengan ninguna espina.",
            "Pasa cada tira de pescado por el huevo batido y luego por la avena molida.",
            "Coloca en una bandeja con papel de hornear engrasado.",
            "Hornea a 190°C de 10 a 12 minutos hasta que estén completamente cocidos."
          ],
          tips: ["El rebozado de avena les da una consistencia suave y fácil de asir."],
          variations: ["Puedes aromatizar la avena con un toquecito de orégano."],
          texture: "Finger food blando tierno",
          category: "almuerzo",
          attributes: ["sin leche", "sin azúcar"]
        },
        {
          id: "pdf_9_12_mini_hamburguesas_pavo",
          name: "Mini hamburguesas de pavo y zanahoria",
          ageRange: "9-12 meses",
          prepTime: 10,
          cookTime: 8,
          servings: 2,
          ingredients: [
            "200 g pavo molido crudo",
            "2 cda zanahoria rallada fina",
            "1 cda avena molida"
          ],
          steps: [
            "En un cuenco integra perfectamente el pavo molido, la zanahoria rallada fina y la avena.",
            "Forma discos pequeños y chatos con la mezcla.",
            "Cocina en una plancha o sartén antiadherente a fuego bajo por 3 a 4 minutos por lado.",
            "Sirve cortadas en trozos manejables acompañadas de trozos de aguacate."
          ],
          tips: ["El pavo es una excelente proteína magra de fácil digestión."],
          variations: ["Utiliza pollo molido en lugar de pavo."],
          texture: "Sólidos blandos tierno-masticables",
          category: "almuerzo",
          attributes: ["sin huevo", "sin leche", "sin azúcar"]
        },
        {
          id: "pdf_9_12_crema_calabacin",
          name: "Crema de calabacín con queso fresco",
          ageRange: "9-12 meses",
          prepTime: 5,
          cookTime: 12,
          servings: 2,
          ingredients: [
            "1 taza calabacín en cubos",
            "½ taza agua",
            "1-2 cda queso fresco pasteurizado rallado"
          ],
          steps: [
            "Cocina el calabacín en agua hirviendo hasta que esté sumamente tierno (unos 10 minutos).",
            "Licúa o procesa el calabacín cocido con un poco de agua de cocción hasta lograr una crema suave.",
            "Añade el queso fresco y mezcla bien para que se disuelva con el calor."
          ],
          tips: ["Sírvela tibia. Es un plato reconfortante y muy hidratante."],
          variations: ["Agrega papa cocida para darle más consistencia."],
          texture: "Puré sedoso fluido",
          category: "almuerzo",
          attributes: ["sin huevo", "sin azúcar"]
        },
        {
          id: "pdf_9_12_pasta_aguacate",
          name: "Pasta con salsa de aguacate y limón",
          ageRange: "9-12 meses",
          prepTime: 5,
          cookTime: 10,
          servings: 1,
          ingredients: [
            "¼ taza pasta corta (espirales o caracoles) muy blanda",
            "¼ aguacate maduro",
            "Unas gotitas de zumo de limón",
            "1 cdta aceite de oliva"
          ],
          steps: [
            "Pisa el aguacate maduro con el aceite de oliva y las gotas de limón hasta formar una crema homogénea.",
            "Cocina la pasta hasta que esté muy blanda por dentro.",
            "Mezcla la pasta tibia escurrida con la crema de aguacate y corta en trozos pequeños si hace falta."
          ],
          tips: ["El limón ayuda a que el aguacate no se ennegrezca rápidamente."],
          variations: ["Sustituye la pasta por fideos de calabacín muy blandos."],
          texture: "Trocitos blandos untados",
          category: "almuerzo",
          attributes: ["sin huevo", "sin leche", "sin azúcar"]
        },
        {
          id: "pdf_9_12_pollo_batata",
          name: "Pollo al horno con batata",
          ageRange: "9-12 meses",
          prepTime: 10,
          cookTime: 25,
          servings: 2,
          ingredients: [
            "1 muslo de pollo o 80g pechuga",
            "½ batata (camote) en cubos grandes",
            "1 cdta aceite de oliva"
          ],
          steps: [
            "Coloca el pollo y los cubos de batata en una bandeja de horno, añade el aceite de oliva.",
            "Hornea de 20 a 25 minutos a 190°C hasta que estén sumamente tiernos.",
            "Desmenuza muy bien el pollo descartando huesos y piel, y aplasta la batata si es necesario para dárselo."
          ],
          tips: ["La cocción al horno concentra el dulzor natural de la batata."],
          variations: ["Puedes asar con calabaza en lugar de batata."],
          texture: "Desmenuzado tierno con chafado",
          category: "almuerzo",
          attributes: ["sin huevo", "sin leche", "sin azúcar"]
        }
      ],
      snacks: [
        {
          id: "pdf_9_12_bastones_camote",
          name: "Bastones de camote al horno",
          ageRange: "9-12 meses",
          prepTime: 5,
          cookTime: 20,
          servings: 2,
          ingredients: [
            "½ camote pelado",
            "1 cdta aceite de oliva"
          ],
          steps: [
            "Corta el camote en forma de bastones anchos y gruesos (del tamaño de un dedo de adulto).",
            "Mezcla los bastones con el aceite de oliva en un bol.",
            "Extiéndelos en una bandeja y hornea a 190°C de 18 a 20 minutos hasta que estén completamente blandos al pincharlos."
          ],
          tips: ["Vigila que no se tuesten demasiado ni queden bordes crujientes duros."],
          variations: ["Prueba a espolvorear una pizca de canela antes de hornear."],
          texture: "Sólidos blandos tipo finger food",
          category: "merienda",
          attributes: ["sin huevo", "sin leche", "sin gluten", "sin azúcar"]
        },
        {
          id: "pdf_9_12_bolitas_platano",
          name: "Bolitas blandas de plátano y avena",
          ageRange: "9-12 meses",
          prepTime: 5,
          cookTime: 0,
          servings: 6,
          ingredients: [
            "1 plátano mediano maduro",
            "½ taza avena molida o fina",
            "Pizca de canela (opcional)"
          ],
          steps: [
            "Pisa muy bien el plátano hasta formar un puré suave.",
            "Añade la avena molida y la canela, mezclando hasta obtener una masa maleable.",
            "Forma pequeñas bolitas con tus manos húmedas y refrigera por 30 minutos antes de servir para darles consistencia."
          ],
          tips: ["Perfecto snack fresco y dulce sin necesidad de cocción."],
          variations: ["Puedes rebozar las bolitas con un poquito de coco rallado fino si el bebé lo tolera."],
          texture: "Masticable húmedo blando",
          category: "merienda",
          attributes: ["sin huevo", "sin leche", "sin azúcar"]
        },
        {
          id: "pdf_9_12_fruta_trocitos",
          name: "Fruta blanda en trocitos",
          ageRange: "9-12 meses",
          prepTime: 5,
          cookTime: 0,
          servings: 1,
          ingredients: [
            "½ taza fruta muy madura pelada (pera, plátano, melón o mandarina sin piel)"
          ],
          steps: [
            "Pela muy bien la fruta seleccionada asegurando quitar semillas o fibras duras.",
            "Corta la fruta en cubos pequeños o láminas adecuadas para la pinza del bebé.",
            "Chafa ligeramente con un tenedor si notas que está un poco firme antes de servir."
          ],
          tips: ["La mandarina siempre debe servirse sin la piel transparente de los gajos."],
          variations: ["Ofrece un mix de dos frutas para estimular la exploración sensorial."],
          texture: "Sólidos blandos jugosos",
          category: "merienda",
          attributes: ["sin huevo", "sin leche", "sin gluten", "sin azúcar"]
        },
        {
          id: "pdf_9_12_galletitas_manzana",
          name: "Galletitas de avena y manzana",
          ageRange: "9-12 meses",
          prepTime: 10,
          cookTime: 14,
          servings: 8,
          ingredients: [
            "1 manzana rallada fina",
            "¾ taza avena molida",
            "1 huevo (opcional para ligar)"
          ],
          steps: [
            "Mezcla muy bien la manzana rallada con la avena molida y el huevo si lo usas.",
            "Forma pequeños montoncitos aplastados sobre una bandeja con papel de hornear.",
            "Hornea de 12 a 14 minutos a 180°C de modo que queden suaves y blandas al morder.",
            "Deja enfriar y ofrece partidas a la mitad."
          ],
          tips: ["Un snack nutritivo, perfecto para calmar encías molestas."],
          variations: ["Sustituye la manzana por pera rallada fina."],
          texture: "Galleta blanda húmeda",
          category: "merienda",
          attributes: ["sin leche", "sin azúcar"]
        },
        {
          id: "pdf_9_12_palitos_pepino_zanahoria",
          name: "Palitos de pepino y zanahoria al vapor",
          ageRange: "9-12 meses",
          prepTime: 5,
          cookTime: 10,
          servings: 1,
          ingredients: [
            "¼ pepino pelado y sin semillas",
            "1 zanahoria mediana pelada"
          ],
          steps: [
            "Corta la zanahoria y el pepino en forma de bastones largos y anchos.",
            "Cocina la zanahoria al vapor hasta que esté sumamente tierna y se desmorone al apretarla.",
            "Si lo prefieres, cuece los palitos de pepino pelado de 1 a 2 minutos para suavizarlos."
          ],
          tips: ["El pepino fresco sin cocer puede ofrecerse si está bien maduro y cortado muy delgado."],
          variations: ["Combina con bastoncitos de calabacín cocidos."],
          texture: "Bastones sólidos tiernos",
          category: "merienda",
          attributes: ["sin huevo", "sin leche", "sin gluten", "sin azúcar"]
        }
      ]
    }
  },
  "12-18": {
    title: "30 Recetas Nutritivas para tu Bebé (12-18 meses)",
    ageRange: "12-18 meses",
    recommendations: [
      "No añadir sal, azúcar ni miel en estas preparaciones.",
      "Adaptar las texturas según la tolerancia y cantidad de dientes del bebé.",
      "Cortar siempre los alimentos en trozos adecuados para evitar riesgo de atragantamiento.",
      "Supervisar en todo momento mientras tu bebé come.",
      "Introducir nuevos alérgenos de forma aislada y observar reacciones."
    ],
    tips: [
      "Hacks de Batch Cooking: Cocina pollo, arroz y verduras en tandas grandes.",
      "Congelar muffins, croquetas y albóndigas en porciones individuales para ahorrar tiempo.",
      "Usa purés de verduras como base espesante para sopas rápidas saludables."
    ],
    categories: {
      breakfast: [
        {
          id: "pdf_12_18_pan_aguacate_queso",
          name: "Pan integral con crema de aguacate y queso fresco",
          ageRange: "12-18 meses",
          prepTime: 5,
          cookTime: 2,
          servings: 1,
          ingredients: [
            "1 rebanada de pan integral blando",
            "¼ aguacate maduro",
            "1-2 cdas queso fresco pasteurizado desmenuzado"
          ],
          steps: [
            "Tuesta ligeramente la rebanada de pan (debe quedar tierna en el centro).",
            "Aplasta el aguacate con un tenedor hasta formar una pasta cremosa y úntala sobre el pan.",
            "Espolvorea el queso fresco desmenuzado encima.",
            "Corta en tiras anchas tipo finger food para ofrecer al bebé."
          ],
          tips: ["Guarda el aguacate sobrante con unas gotitas de limón para que no se oxide."],
          variations: ["Agrega una pizca de orégano seco sobre el queso."],
          texture: "Finger food tierno untado",
          category: "desayuno",
          attributes: ["sin huevo", "sin azúcar"]
        },
        {
          id: "pdf_12_18_avena_platano_rodajas",
          name: "Avena cocida con plátano en rodajitas",
          ageRange: "12-18 meses",
          prepTime: 5,
          cookTime: 6,
          servings: 1,
          ingredients: [
            "3 cda avena fina",
            "½ taza agua o leche",
            "½ plátano maduro en rodajas delgadas"
          ],
          steps: [
            "Hierve el agua o la leche en un cazo pequeño.",
            "Añade la avena y cocina de 4 a 6 minutos a fuego bajo, removiendo constantemente.",
            "Añade el plátano en rodajas finas y aplasta ligeramente con la cuchara para mezclar.",
            "Enfría hasta temperatura templada y sirve."
          ],
          tips: ["A partir de esta edad, se puede usar leche entera si el pediatra da el visto bueno."],
          variations: ["Sustituye el plátano por puré de manzana cocida."],
          texture: "Papilla espesa con trozos blandos",
          category: "desayuno",
          attributes: ["sin huevo", "sin azúcar"]
        },
        {
          id: "pdf_12_18_mini_pancakes_manzana",
          name: "Mini pancakes de manzana y canela",
          ageRange: "12-18 meses",
          prepTime: 5,
          cookTime: 4,
          servings: 2,
          ingredients: [
            "½ manzana rallada fina",
            "1 huevo entero",
            "3 cdas avena molida",
            "Pizca de canela molida"
          ],
          steps: [
            "En un bol mezcla la manzana rallada, el huevo, la avena molida y la canela.",
            "Bate muy bien hasta obtener una masa homogénea.",
            "Calienta una sartén antiadherente a fuego bajo.",
            "Vierte cucharadas de masa cocinando de 1 a 2 minutos por lado hasta dorar ligeramente. Enfría, corta en trozos y ofrece."
          ],
          tips: ["La manzana rallada aporta una humedad deliciosa sin necesidad de endulzantes."],
          variations: ["Prueba rallando pera en lugar de manzana."],
          texture: "Esponjosa y suave",
          category: "desayuno",
          attributes: ["sin leche", "sin azúcar"]
        },
        {
          id: "pdf_12_18_tostadas_cacahuete",
          name: "Tostaditas con crema de cacahuete suave",
          ageRange: "12-18 meses",
          prepTime: 5,
          cookTime: 1,
          servings: 1,
          ingredients: [
            "1 rebanada de pan integral blando",
            "1 cdta crema de cacahuete (maní) 100% natural sin azúcar ni sal"
          ],
          steps: [
            "Tuesta el pan ligeramente para que mantenga una textura blanda fácil de morder.",
            "Extiende una capa fina y uniforme de crema de cacahuete (nunca dejes pegotes gruesos).",
            "Corta el pan en tiras gruesas y ofrece bajo atenta supervisión."
          ],
          tips: ["Asegúrate de que la crema de cacahuete no contenga trozos ni azúcares añadidos."],
          variations: ["Puedes decorar con rodajitas muy finas de plátano."],
          texture: "Sólido untado blando",
          category: "desayuno",
          attributes: ["sin huevo", "sin leche", "sin azúcar"]
        },
        {
          id: "pdf_12_18_tortilla_tomate_calabacin",
          name: "Tortilla de huevo con tomate y calabacín",
          ageRange: "12-18 meses",
          prepTime: 5,
          cookTime: 6,
          servings: 1,
          ingredients: [
            "1 huevo entero",
            "2 cdas calabacín rallado exprimido",
            "1 cda tomate rallado sin piel",
            "1 cdta aceite de oliva"
          ],
          steps: [
            "Bate bien el huevo y mézclalo con el calabacín exprimido y el tomate rallado.",
            "Vierte en una sartén antiadherente caliente con el aceite de oliva a fuego bajo.",
            "Cocina de 2 a 3 minutos por lado hasta que esté completamente cuajada.",
            "Corta en cuadritos pequeños o tiras y sirve tibia."
          ],
          tips: ["Exprime bien el calabacín para que la tortilla no quede demasiado aguada."],
          variations: ["Puedes agregar queso rallado bajo en sal a la mezcla."],
          texture: "Sólido suave y tierno",
          category: "desayuno",
          attributes: ["sin leche", "sin azúcar"]
        },
        {
          id: "pdf_12_18_yogur_fresas",
          name: "Yogur natural con trozos de fresa",
          ageRange: "12-18 meses",
          prepTime: 5,
          cookTime: 0,
          servings: 1,
          ingredients: [
            "½ taza yogur natural sin azúcar",
            "3-4 fresas maduras picadas finas"
          ],
          steps: [
            "Lava de forma minuciosa las fresas y pícalas en cubitos pequeños.",
            "Coloca el yogur natural en un cuenco.",
            "Añade las fresas picadas y mezcla. Si las fresas están un poco firmes, aplástalas un poco con un tenedor."
          ],
          tips: ["Las fresas aportan abundante vitamina C y color atractivo al plato."],
          variations: ["Agrega cubitos pequeños de mango en lugar de fresas."],
          texture: "Cremosa con trozos tiernos",
          category: "desayuno",
          attributes: ["sin huevo", "sin azúcar"]
        },
        {
          id: "pdf_12_18_muffins_platano_zanahoria",
          name: "Muffins caseros de plátano y zanahoria",
          ageRange: "12-18 meses",
          prepTime: 10,
          cookTime: 18,
          servings: 6,
          ingredients: [
            "1 plátano maduro machacado",
            "½ taza zanahoria rallada fina",
            "1 huevo",
            "1 taza avena molida",
            "1 cdta polvo de hornear (opcional)"
          ],
          steps: [
            "Precalienta el horno a 180°C.",
            "Mezcla en un tazón el plátano machacado, la zanahoria rallada y el huevo.",
            "Incorpora la avena molida y el polvo de hornear hasta formar una masa integrada.",
            "Rellena moldes de silicona mini y hornea por 15-18 minutos. Deja enfriar antes de ofrecer."
          ],
          tips: ["El plátano muy maduro aporta toda la dulzura necesaria de forma natural."],
          variations: ["Agrega una cucharada de coco rallado fino a la mezcla."],
          texture: "Bizcocho blando horneado",
          category: "desayuno",
          attributes: ["sin leche", "sin azúcar"]
        },
        {
          id: "pdf_12_18_galletitas_pera",
          name: "Galletitas blandas de avena y pera",
          ageRange: "12-18 meses",
          prepTime: 10,
          cookTime: 15,
          servings: 8,
          ingredients: [
            "1 pera madura rallada fina",
            "1 taza avena molida",
            "1 huevo entero (opcional)"
          ],
          steps: [
            "Mezcla la pera rallada, la avena y el huevo hasta obtener una masa húmeda.",
            "Forma pequeñas galletas redondas sobre una bandeja cubierta con papel de hornear.",
            "Hornea a 180°C durante 12-15 minutos hasta que la base esté ligeramente dorada.",
            "Deja enfriar por completo antes de guardar."
          ],
          tips: ["Quedan blanditas y húmedas por dentro, ideales para morder con facilidad."],
          variations: ["Sustituye la pera por manzana rallada."],
          texture: "Galleta blanda húmeda",
          category: "desayuno",
          attributes: ["sin leche", "sin azúcar"]
        },
        {
          id: "pdf_12_18_batido_avena",
          name: "Batido cremoso de plátano, yogur y avena",
          ageRange: "12-18 meses",
          prepTime: 5,
          cookTime: 0,
          servings: 1,
          ingredients: [
            "½ plátano maduro",
            "½ taza yogur natural sin azúcar",
            "2 cdas avena cocida o cruda bien licuada",
            "Un chorrito de agua para aligerar si es necesario"
          ],
          steps: [
            "Coloca todos los ingredientes en el vaso de la licuadora.",
            "Licúa a velocidad alta hasta conseguir una consistencia suave y sin grumos.",
            "Sirve en un vaso entrenador con sorbete ancho o con cucharita."
          ],
          tips: ["Perfecto desayuno exprés rico en fibra, calcio y carbohidratos complejos."],
          variations: ["Agrega fresas o durazno maduro para cambiar el sabor."],
          texture: "Líquido cremoso espeso",
          category: "desayuno",
          attributes: ["sin huevo", "sin azúcar"]
        },
        {
          id: "pdf_12_18_panecitos_calabaza",
          name: "Panecitos caseros de avena y calabaza",
          ageRange: "12-18 meses",
          prepTime: 10,
          cookTime: 20,
          servings: 6,
          ingredients: [
            "1 taza puré de calabaza cocida bien espesa",
            "1 taza avena molida",
            "1 huevo entero",
            "1 cdta canela molida (opcional)"
          ],
          steps: [
            "En un bol integra muy bien el puré de calabaza, la avena molida, el huevo y la canela.",
            "Distribuye la masa en moldes para muffins pequeños.",
            "Hornea a 180°C por 18 a 20 minutos.",
            "Deja entibiar y ofrécelos troceados en bocados seguros."
          ],
          tips: ["Se pueden congelar una vez horneados y templados."],
          variations: ["Puedes agregar 1 cucharada de queso fresco desmenuzado en el centro."],
          texture: "Panecillo blando húmedo",
          category: "desayuno",
          attributes: ["sin leche", "sin azúcar"]
        }
      ],
      lunchDinner: [
        {
          id: "pdf_12_18_arroz_pollo_brocoli",
          name: "Arroz integral con pollo desmenuzado y brócoli",
          ageRange: "12-18 meses",
          prepTime: 10,
          cookTime: 20,
          servings: 2,
          ingredients: [
            "½ taza arroz integral cocido muy tierno",
            "80 g pechuga de pollo cocida y desmenuzada",
            "3-4 floretes de brócoli cocidos al vapor picados",
            "1 cdta aceite de oliva"
          ],
          steps: [
            "Cocina el arroz integral el tiempo suficiente para que esté muy suave al tacto.",
            "Cocina el pollo y el brócoli al vapor por separado. Pica el brócoli y desmenuza el pollo en hilos cortos.",
            "Mezcla todos los ingredientes en una sartén con el aceite de oliva y calienta de 1 a 2 minutos antes de servir."
          ],
          tips: ["El brócoli cocido al vapor debe deshacerse fácilmente con la presión de tus dedos."],
          variations: ["Sustituye el brócoli por coliflor."],
          texture: "Arroz tierno húmedo con trocitos",
          category: "almuerzo",
          attributes: ["sin huevo", "sin leche", "sin azúcar"]
        },
        {
          id: "pdf_12_18_lentejas_guisadas",
          name: "Lentejas guisadas con zanahoria y calabacín",
          ageRange: "12-18 meses",
          prepTime: 10,
          cookTime: 15,
          servings: 2,
          ingredients: [
            "½ taza lentejas cocidas (muy blanditas)",
            "¼ taza zanahoria cocida en cubitos pequeños",
            "¼ taza calabacín cocido en cubitos pequeños",
            "Un chorrito de agua o caldo de verduras casero sin sal"
          ],
          steps: [
            "En un cazo pequeño mezcla las lentejas cocidas con el calabacín y la zanahoria.",
            "Calienta a fuego bajo y añade un chorrito de caldo para que quede jugoso.",
            "Chafa ligeramente con un tenedor para facilitar que el bebé las agarre con la cuchara."
          ],
          tips: ["Excelente plato único rico en hierro vegetal y fibra digestiva."],
          variations: ["Puedes agregar arroz cocido para hacer un plato con proteína completa."],
          texture: "Guiso espeso semi-chafado",
          category: "almuerzo",
          attributes: ["sin huevo", "sin leche", "sin azúcar"]
        },
        {
          id: "pdf_12_18_espaguetis_cortados",
          name: "Espaguetis cortados con tomate y queso",
          ageRange: "12-18 meses",
          prepTime: 5,
          cookTime: 12,
          servings: 2,
          ingredients: [
            "⅓ taza pasta pequeña o espaguetis partidos muy cocidos",
            "3 cdas salsa de tomate casera natural",
            "1 cda queso fresco o mozzarella pasteurizada rallada"
          ],
          steps: [
            "Cuece la pasta hasta que quede bien tierna. Si usas espaguetis, córtalos previamente en trozos pequeños de 2 cm.",
            "Mezcla la pasta con la salsa de tomate tibia y calienta en una ollita.",
            "Espolvorea con el queso rallado y mezcla bien para que se derrita antes de servir."
          ],
          tips: ["Cortar los espaguetis previene riesgos de atragantamiento por succión de hilos largos."],
          variations: ["Agrega carne de ternera molida bien cocida para hacer boloñesa."],
          texture: "Pasta suave humectada",
          category: "almuerzo",
          attributes: ["sin huevo", "sin azúcar"]
        },
        {
          id: "pdf_12_18_albondigas_pavo",
          name: "Albóndigas de pavo y avena al horno",
          ageRange: "12-18 meses",
          prepTime: 10,
          cookTime: 18,
          servings: 2,
          ingredients: [
            "250 g pavo molido crudo",
            "3 cdas avena molida",
            "½ zanahoria rallada muy fina",
            "1 huevo pequeño (opcional)"
          ],
          steps: [
            "En un cuenco mezcla el pavo, la avena molida, la zanahoria rallada fina y el huevo.",
            "Mezcla bien hasta amalgamar y forma pequeñas bolitas del tamaño de una nuez.",
            "Coloca en una bandeja con papel de hornear.",
            "Hornea a 180°C durante 15-18 minutos hasta que estén bien hechas pero sigan jugosas. Sirve con arroz o puré."
          ],
          tips: ["La zanahoria rallada aporta humedad para que no queden secas."],
          variations: ["Utiliza pollo molido en lugar de pavo."],
          texture: "Sólidos blandos masticables",
          category: "almuerzo",
          attributes: ["sin leche", "sin azúcar"]
        },
        {
          id: "pdf_12_18_pescado_patata",
          name: "Filetitos de pescado al horno con patata",
          ageRange: "12-18 meses",
          prepTime: 10,
          cookTime: 10,
          servings: 1,
          ingredients: [
            "120 g filete de pescado blanco (merluza, lenguado) sin piel ni espinas",
            "1 patata pequeña pelada en rodajas finas",
            "1 cdta aceite de oliva"
          ],
          steps: [
            "Cuece la patata en agua o al vapor hasta que esté muy blanda.",
            "Coloca el filete de pescado y las patatas en una bandeja de horno, añade unas gotitas de aceite de oliva.",
            "Hornea de 8 a 10 minutos a 180°C hasta que el pescado se desmenuce fácilmente.",
            "Desmenuza bien el pescado para buscar espinas ocultas y sirve junto a la patata chafada."
          ],
          tips: ["El pescado blanco es tierno, jugoso y de fácil digestión para el bebé."],
          variations: ["Sustituye la patata por camote."],
          texture: "Desmenuzado muy blando",
          category: "almuerzo",
          attributes: ["sin huevo", "sin leche", "sin azúcar"]
        }
      ],
      snacks: [
        {
          id: "pdf_12_18_bastones_camote_horno",
          name: "Bastones de camote al horno",
          ageRange: "12-18 meses",
          prepTime: 5,
          cookTime: 25,
          servings: 2,
          ingredients: [
            "1 camote mediano pelado",
            "1 cdta aceite de oliva"
          ],
          steps: [
            "Precalienta el horno a 200°C.",
            "Corta el camote en bastones de grosor medio (como patatas fritas gruesas).",
            "Mézclalos con el aceite de oliva y extiéndelos en una bandeja de horno.",
            "Hornea de 20 a 25 minutos hasta que estén tiernos por dentro (nunca tostados duros)."
          ],
          tips: ["Sírvelos templados como finger food. El camote asado es dulce y suave."],
          variations: ["Prueba a usar zanahorias cortadas en bastones cocidas al horno de igual forma."],
          texture: "Sólido blando tipo finger food",
          category: "merienda",
          attributes: ["sin huevo", "sin leche", "sin gluten", "sin azúcar"]
        },
        {
          id: "pdf_12_18_bolitas_platano_coco",
          name: "Bolitas de plátano y avena con coco suave",
          ageRange: "12-18 meses",
          prepTime: 10,
          cookTime: 0,
          servings: 6,
          ingredients: [
            "1 plátano maduro",
            "½ taza avena molida o copos finos",
            "1 cda coco rallado fino sin azúcar (opcional)"
          ],
          steps: [
            "Chafa muy bien el plátano con un tenedor hasta tener un puré sin grumos.",
            "Mezcla con la avena molida para formar una masa manejable.",
            "Forma bolitas pequeñas y, si lo deseas, rebózalas ligeramente con el coco rallado.",
            "Refrigera por 20 minutos para que tomen firmeza antes de servir."
          ],
          tips: ["El coco rallado debe ser sumamente fino para evitar riesgos de atragantamiento."],
          variations: ["Sustituye el coco por harina de almendras si no hay alergias."],
          texture: "Bocados blandos consistentes",
          category: "merienda",
          attributes: ["sin huevo", "sin leche", "sin azúcar"]
        },
        {
          id: "pdf_12_18_frutas_trocitos_mix",
          name: "Frutas en trocitos (mix)",
          ageRange: "12-18 meses",
          prepTime: 5,
          cookTime: 0,
          servings: 1,
          ingredients: [
            "¼ taza melón en cubitos, ¼ taza pera madura en cubitos, ¼ taza mango en cubitos"
          ],
          steps: [
            "Pela todas las frutas de forma cuidadosa retirando semillas, cáscaras e hilos.",
            "Corta en cubitos muy pequeños adecuados para la pinza del bebé.",
            "Sirve en un bol pequeño para que explore usando sus dedos o tenedor de aprendizaje."
          ],
          tips: ["La fruta madura de temporada es ideal por su dulzura y textura suave."],
          variations: ["Agrega fresas maduras picadas o mandarina sin piel de los gajos."],
          texture: "Trocitos jugosos tiernos",
          category: "merienda",
          attributes: ["sin huevo", "sin leche", "sin gluten", "sin azúcar"]
        },
        {
          id: "pdf_12_18_palitos_pepino_zanahoria",
          name: "Palitos de pepino y zanahoria cocida",
          ageRange: "12-18 meses",
          prepTime: 5,
          cookTime: 8,
          servings: 1,
          ingredients: [
            "½ pepino pelado sin semillas en palitos",
            "1 zanahoria mediana cocida al vapor"
          ],
          steps: [
            "Cuece la zanahoria al vapor hasta que esté completamente tierna y fácil de chafar con las encías.",
            "Corta el pepino (sin piel y sin semillas) en tiras delgadas.",
            "Si el pepino está muy firme, puedes cocerlo al vapor de 1 a 2 minutos para suavizarlo."
          ],
          tips: ["Los palitos son excelentes para que practiquen el agarre palmar y la masticación de texturas más sólidas."],
          variations: ["Puedes servir el pepino untado con un toquecito de hummus suave."],
          texture: "Bastones sólidos tiernos",
          category: "merienda",
          attributes: ["sin huevo", "sin leche", "sin gluten", "sin azúcar"]
        },
        {
          id: "pdf_12_18_mini_muffins_frutos_rojos",
          name: "Mini muffins de avena y frutos rojos",
          ageRange: "12-18 meses",
          prepTime: 10,
          cookTime: 18,
          servings: 6,
          ingredients: [
            "1 taza avena molida",
            "1 huevo entero",
            "½ taza puré de plátano o de manzana",
            "¼ taza frutos rojos picados (frescos o descongelados)"
          ],
          steps: [
            "Precalienta el horno a 180°C.",
            "Mezcla en un bol la avena molida, el huevo y el puré de plátano/manzana hasta que esté integrado.",
            "Agrega con cuidado los frutos rojos picados y mezcla suavemente.",
            "Rellena minimoldes y hornea de 15 a 18 minutos hasta que estén esponjosos."
          ],
          tips: ["Perfectos para meriendas escolares o paseos por su facilidad para llevar."],
          variations: ["Sustituye los frutos rojos por arándanos partidos a la mitad."],
          texture: "Bizcocho suave con trocitos",
          category: "merienda",
          attributes: ["sin leche", "sin azúcar"]
        }
      ]
    }
  },
  "18-24": {
    title: "40 Recetas Nutritivas para Bebés (18-24 meses)",
    ageRange: "18-24 meses",
    recommendations: [
      "Supervisa siempre la hora de comer.",
      "Corta los alimentos en tamaños seguros que promuevan la pinza y la masticación.",
      "Introduce alérgenos complejos (cacahuetes, mariscos, frutos secos molidos) de forma gradual y observa por 48 horas.",
      "Ajusta la textura (más picada o en trozos) según la destreza de masticación del bebé."
    ],
    tips: [
      "Variedad visual: Intenta incluir al menos 3 colores diferentes en el plato, esto estimula el interés del niño y asegura variedad de nutrientes.",
      "Involucra al niño en la preparación básica (lavar vegetales, revolver masas templadas) para disminuir el rechazo a nuevos alimentos.",
      "Introduce salsas naturales y cremas ligeras para evitar que los alimentos sólidos queden secos."
    ],
    categories: {
      breakfast: [
        {
          id: "pdf_18_24_pan_hummus_pepino",
          name: "Pan integral con hummus suave y pepino rallado",
          ageRange: "18-24 meses",
          prepTime: 10,
          cookTime: 0,
          servings: 1,
          ingredients: [
            "1 rebanada de pan integral blando",
            "2 cdas de hummus suave (casero o comercial)",
            "¼ de pepino pelado y rallado escurrido"
          ],
          steps: [
            "Si haces hummus casero: licúa 1 taza de garbanzos cocidos con 1 cda de aceite de oliva y agua hasta lograr consistencia cremosa.",
            "Unta el hummus generosamente sobre el pan integral blando.",
            "Ralla el pepino muy fino, exprímelo bien para quitarle el agua sobrante y espárcelo sobre el hummus.",
            "Corta en tiras y ofrece."
          ],
          tips: ["Si el pepino sabe un poco amargo, retírale completamente la piel."],
          variations: ["Puedes agregar zanahoria rallada fina en lugar de pepino."],
          texture: "Tostada blanda untada crujiente",
          category: "desayuno",
          attributes: ["sin huevo", "sin leche", "sin azúcar"]
        },
        {
          id: "pdf_18_24_tortitas_avena_arandanos",
          name: "Tortitas de avena y plátano con arándanos",
          ageRange: "18-24 meses",
          prepTime: 5,
          cookTime: 5,
          servings: 2,
          ingredients: [
            "1 plátano maduro",
            "3 cdas avena molida",
            "1 huevo entero",
            "2 cdas arándanos cortados a la mitad"
          ],
          steps: [
            "Tritura el plátano, mézclalo con el huevo y la avena molida hasta obtener una masa fluida.",
            "Calienta una sartén antiadherente a fuego bajo.",
            "Vierte pequeñas porciones y coloca 2 o 3 mitades de arándanos en cada tortita.",
            "Cocina de 1 a 2 minutos por lado hasta dorar. Enfría y sirve."
          ],
          tips: ["Se pueden congelar ya cocidas y calentar al microondas de 20 a 30 segundos."],
          variations: ["Sustituye los arándanos por pasas finamente picadas."],
          texture: "Esponjosa y frutal",
          category: "desayuno",
          attributes: ["sin leche", "sin azúcar"]
        },
        {
          id: "pdf_18_24_mini_arepitas_aguacate",
          name: "Mini arepitas de maíz rellenas de aguacate",
          ageRange: "18-24 meses",
          prepTime: 10,
          cookTime: 8,
          servings: 2,
          ingredients: [
            "1 taza harina de maíz precocida (para arepas)",
            "1 taza agua templada",
            "¼ aguacate maduro machacado",
            "¼ cdta aceite de oliva (opcional)"
          ],
          steps: [
            "Mezcla la harina de maíz con el agua hasta obtener una masa suave y moldeable.",
            "Forma arepitas pequeñas y chatas de unos 5 cm de diámetro.",
            "Cocina en sartén antiadherente a fuego medio-bajo por 3 o 4 minutos por lado hasta que estén cocidas.",
            "Abre la arepita a la mitad con cuidado y rellénala con el aguacate machacado. Sirve cortada."
          ],
          tips: ["Si la masa de arepa se cuartea al darle forma, añade una cucharadita de agua o aceite para hidratar."],
          variations: ["Agrega queso fresco rallado adentro junto al aguacate."],
          texture: "Masticable suave rellena",
          category: "desayuno",
          attributes: ["sin huevo", "sin leche", "sin gluten", "sin azúcar"]
        },
        {
          id: "pdf_18_24_muffins_zanahoria_manzana",
          name: "Muffins de zanahoria y manzana (sin azúcar)",
          ageRange: "18-24 meses",
          prepTime: 10,
          cookTime: 18,
          servings: 8,
          ingredients: [
            "1 manzana rallada fina",
            "½ taza zanahoria rallada fina",
            "1 huevo entero",
            "1 taza avena molida",
            "½ cdta polvo de hornear",
            "1 cdta canela molida (opcional)"
          ],
          steps: [
            "Precalienta el horno a 180°C.",
            "Mezcla la manzana, la zanahoria y el huevo en un bol grande.",
            "Añade la avena molida, el polvo de hornear y la canela. Integra bien.",
            "Distribuye en minimoldes para muffins y hornea de 15 a 18 minutos hasta que estén firmes y secos al tacto. Sirve tibios."
          ],
          tips: ["Excelente merienda que se conserva fresca en nevera por 3 días."],
          variations: ["Agrega una cucharada de puré de plátano para un extra de dulzor."],
          texture: "Bizcocho blando denso",
          category: "desayuno",
          attributes: ["sin leche", "sin azúcar"]
        },
        {
          id: "pdf_18_24_yogur_granola",
          name: "Yogur natural con granola casera blandita",
          ageRange: "18-24 meses",
          prepTime: 10,
          cookTime: 0,
          servings: 1,
          ingredients: [
            "½ taza yogur natural sin azúcar",
            "¼ taza granola casera blanda"
          ],
          steps: [
            "Para hacer granola blanda rápida: mezcla 1 taza de avena con ¼ taza puré de plátano y 1 cdta de aceite. Hornea de 12 a 15 minutos a 170°C para que quede suave, sin tostar de más.",
            "Coloca el yogur natural en un bol.",
            "Espolvorea la granola blanda encima justo antes de servir para mantener la textura."
          ],
          tips: ["Evita nueces enteras o ingredientes crujientes excesivamente duros en la granola."],
          variations: ["Añade trocitos de fresas o frambuesas al yogur."],
          texture: "Cremosa con crujiente blando",
          category: "desayuno",
          attributes: ["sin huevo", "sin azúcar"]
        },
        {
          id: "pdf_18_24_panecillos_calabaza_queso",
          name: "Panecillos de calabaza con queso fresco",
          ageRange: "18-24 meses",
          prepTime: 10,
          cookTime: 20,
          servings: 6,
          ingredients: [
            "1 taza puré de calabaza cocida",
            "1 taza avena molida o harina integral",
            "1 huevo entero",
            "2 cdas queso fresco desmenuzado"
          ],
          steps: [
            "Mezcla el puré de calabaza, el huevo y la avena en un bol grande hasta formar una masa homogénea.",
            "Incorpora el queso fresco desmenuzado con movimientos suaves.",
            "Forma pequeños panecillos redondos y colócalos en una bandeja.",
            "Hornea a 180°C de 18 a 20 minutos. Deja enfriar y sirve cortados a la mitad."
          ],
          tips: ["La calabaza es una maravillosa fuente de betacarotenos y fibra."],
          variations: ["Sustituye el queso fresco por queso mozzarella rallado."],
          texture: "Panecillo blando húmedo",
          category: "desayuno",
          attributes: ["sin azúcar"]
        }
      ],
      lunchDinner: [
        {
          id: "pdf_18_24_arroz_integral_pollo_salteado",
          name: "Arroz integral con pollo y verduras",
          ageRange: "18-24 meses",
          prepTime: 10,
          cookTime: 20,
          servings: 2,
          ingredients: [
            "½ taza arroz integral cocido muy blando",
            "100 g pechuga de pollo cocida y desmenuzada",
            "½ taza verduras mixtas picadas (zanahoria, calabacín)",
            "1 cdta aceite de oliva"
          ],
          steps: [
            "En una sartén pequeña calienta el aceite de oliva a fuego medio-bajo.",
            "Saltea las verduras picadas finitas durante unos 3 o 4 minutos hasta que estén completamente blandas.",
            "Agrega el arroz integral cocido bien tierno y el pollo desmenuzado.",
            "Rebuelve todo bien, calienta un minuto más y sirve templado."
          ],
          tips: ["Ajusta la textura añadiendo unas cucharadas de caldo casero si notas la mezcla seca."],
          variations: ["Utiliza carne magra de ternera en lugar de pollo."],
          texture: "Arroz tierno con trocitos salteados",
          category: "almuerzo",
          attributes: ["sin huevo", "sin leche", "sin azúcar"]
        },
        {
          id: "pdf_18_24_estofado_ternera",
          name: "Estofado de ternera con patata y zanahoria",
          ageRange: "18-24 meses",
          prepTime: 10,
          cookTime: 45,
          servings: 3,
          ingredients: [
            "250 g ternera tierna en trozos muy pequeños",
            "1 patata mediana en cubos",
            "1 zanahoria en rodajas finas",
            "Agua o caldo casero sin sal para cubrir"
          ],
          steps: [
            "En una olla dora ligeramente los trocitos de ternera con unas gotas de aceite.",
            "Añade la patata, la zanahoria y el agua o caldo hasta cubrir los ingredientes.",
            "Tapa y cocina a fuego muy bajo de 40 a 50 minutos hasta que la carne esté extremadamente blanda.",
            "Desmenuza los trozos grandes antes de ofrecer al bebé."
          ],
          tips: ["La cocción lenta asegura que la carne quede tan tierna que se deshaga con las encías."],
          variations: ["Puedes agregar guisantes tiernos en los últimos 10 minutos de cocción."],
          texture: "Guiso caldoso con trozos blandos",
          category: "almuerzo",
          attributes: ["sin huevo", "sin leche", "sin azúcar"]
        },
        {
          id: "pdf_18_24_pure_calabaza_garbanzos",
          name: "Puré rústico de calabaza con garbanzos",
          ageRange: "18-24 meses",
          prepTime: 10,
          cookTime: 15,
          servings: 2,
          ingredients: [
            "2 tazas calabaza en cubos",
            "½ taza garbanzos cocidos y pelados",
            "1 cdta aceite de oliva"
          ],
          steps: [
            "Cocina la calabaza al vapor o hervida hasta que esté muy blanda.",
            "Tritura la mitad de la calabaza con el aceite de oliva para formar una base cremosa.",
            "Mezcla la crema de calabaza con la otra mitad de calabaza picadita y los garbanzos cocidos enteros.",
            "Sirve templado para que practiquen la masticación de granos blandos enteros."
          ],
          tips: ["Dejar algunos garbanzos enteros estimula la coordinación y masticación."],
          variations: ["Sustituye la calabaza por puré de camote."],
          texture: "Puré espeso rústico con granos",
          category: "almuerzo",
          attributes: ["sin huevo", "sin leche", "sin azúcar"]
        },
        {
          id: "pdf_18_24_pescado_arroz_guisantes",
          name: "Filetitos de pescado al vapor con arroz",
          ageRange: "18-24 meses",
          prepTime: 10,
          cookTime: 10,
          servings: 2,
          ingredients: [
            "120 g filete de pescado blanco fresco sin espinas",
            "½ taza arroz cocido bien tierno",
            "¼ de taza de guisantes cocidos y ligeramente aplastados"
          ],
          steps: [
            "Cocina el filete de pescado blanco al vapor durante unos 8 a 10 minutos hasta que esté bien hecho.",
            "Desmenuza el pescado con tus manos para revisar minuciosamente que no contenga espinas.",
            "Mezcla el pescado desmenuzado con el arroz tierno y los guisantes machacados y sirve."
          ],
          tips: ["Los guisantes enteros son peligro de atragantamiento, siempre hay que machacarlos levemente."],
          variations: ["Puedes bañar el arroz con una cucharadita de salsa de tomate casera."],
          texture: "Arroz tierno mezclado blando",
          category: "almuerzo",
          attributes: ["sin huevo", "sin leche", "sin azúcar"]
        },
        {
          id: "pdf_18_24_mini_albondigas_tomate",
          name: "Mini albóndigas de pollo con salsa de tomate",
          ageRange: "18-24 meses",
          prepTime: 15,
          cookTime: 15,
          servings: 3,
          ingredients: [
            "300 g pollo molido crudo",
            "3 cdas avena molida",
            "¼ taza de zanahoria rallada muy fina",
            "1 taza de salsa de tomate natural casera suave"
          ],
          steps: [
            "En un tazón mezcla el pollo molido, la avena molida y la zanahoria rallada.",
            "Forma bolitas pequeñas (del tamaño de canicas grandes) con tus manos.",
            "Hornea a 180°C por 12 minutos o cocínalas al vapor.",
            "Calienta la salsa de tomate casera, añade las albóndigas y déjalas cocinar 5 minutos en ella para que absorban humedad."
          ],
          tips: ["Sírvelas cortadas a la mitad acompañadas de pasta corta."],
          variations: ["Puedes sustituir el pollo molido por pavo molido."],
          texture: "Albóndigas jugosas en salsa",
          category: "almuerzo",
          attributes: ["sin leche", "sin azúcar"]
        }
      ],
      snacks: [
        {
          id: "pdf_18_24_bastones_verdura_dip",
          name: "Bastones de zanahoria y calabacín con dip",
          ageRange: "18-24 meses",
          prepTime: 10,
          cookTime: 10,
          servings: 2,
          ingredients: [
            "1 zanahoria mediana, ½ calabacín",
            "½ taza yogur natural sin azúcar",
            "1 cda aguacate machacado para el dip"
          ],
          steps: [
            "Pela la zanahoria y corta ambos vegetales en forma de bastones cómodos.",
            "Cocínalos al vapor de 8 a 10 minutos hasta que estén tiernos por dentro pero mantengan su forma.",
            "Mezcla el yogur con el aguacate para formar una salsa o dip untable.",
            "Sirve los bastones tibios junto al dip."
          ],
          tips: ["Un snack divertido que fomenta la autonomía e introduce hortalizas en el juego."],
          variations: ["Sustituye la zanahoria por bastones de camote al horno."],
          texture: "Finger food blando con salsa",
          category: "merienda",
          attributes: ["sin huevo", "sin azúcar"]
        },
        {
          id: "pdf_18_24_bolitas_energeticas",
          name: "Bolitas de avena, plátano y coco",
          ageRange: "18-24 meses",
          prepTime: 10,
          cookTime: 0,
          servings: 10,
          ingredients: [
            "1 plátano mediano maduro",
            "¾ taza avena molida",
            "2 cdas coco rallado fino sin azúcar"
          ],
          steps: [
            "Pisa muy bien el plátano maduro con un tenedor hasta lograr un puré fino.",
            "Agrega la avena molida de forma paulatina y amasa con las manos.",
            "Forma bolitas pequeñas y pásalas por el coco rallado fino para rebozar.",
            "Refrigera de 20 a 30 minutos antes de ofrecer."
          ],
          tips: ["Consérvalas en la nevera en un recipiente cerrado para que no pierdan firmeza."],
          variations: ["Puedes agregar media cucharadita de semillas de chía molidas."],
          texture: "Bocadillos húmedos consistentes",
          category: "merienda",
          attributes: ["sin huevo", "sin leche", "sin azúcar"]
        },
        {
          id: "pdf_18_24_brochetas_fruta",
          name: "Brochetas de fruta segura",
          ageRange: "18-24 meses",
          prepTime: 10,
          cookTime: 0,
          servings: 2,
          ingredients: [
            "½ taza melón en cubos, ½ taza pera madura en cubos, 4 uvas grandes peladas y sin semillas"
          ],
          steps: [
            "Pela y limpia cuidadosamente las frutas.",
            "Corta el melón y la pera en cubitos pequeños. Pela las uvas, córtalas longitudinalmente a la mitad y quítales las pepas.",
            "Ensarta con cuidado los trozos de fruta alternando colores en palillos cortos de madera.",
            "Ofrece al niño siempre bajo estricta supervisión de un adulto."
          ],
          tips: ["Cortar las uvas longitudinalmente evita que obstruyan la vía aérea en caso de deglución apresurada."],
          variations: ["Sustituye el melón por fresas o plátano maduro."],
          texture: "Trocitos de fruta en palillo",
          category: "merienda",
          attributes: ["sin huevo", "sin leche", "sin gluten", "sin azúcar"]
        },
        {
          id: "pdf_18_24_mini_muffins_espinaca",
          name: "Mini muffins de espinaca y queso",
          ageRange: "18-24 meses",
          prepTime: 10,
          cookTime: 15,
          servings: 8,
          ingredients: [
            "½ taza espinaca cocida picada y escurrida",
            "1 huevo entero",
            "½ taza avena molida",
            "¼ taza queso mozzarella o fresco rallado"
          ],
          steps: [
            "Precalienta el horno a 180°C.",
            "En un bol integra muy bien la espinaca, el huevo batido, la avena molida y el queso rallado.",
            "Vierte la masa en moldes para muffins pequeños previamente engrasados.",
            "Hornea de 12 a 15 minutos hasta que estén cuajados y firmes. Sirve templados."
          ],
          tips: ["Son una excelente manera de ofrecer verduras de hoja verde de forma atractiva."],
          variations: ["Puedes agregar calabacín rallado bien exprimido en lugar de espinaca."],
          texture: "Sólidos horneados blandos",
          category: "merienda",
          attributes: ["sin azúcar"]
        },
        {
          id: "pdf_18_24_palitos_pan_aguacate",
          name: "Palitos de pan con puré de aguacate",
          ageRange: "18-24 meses",
          prepTime: 5,
          cookTime: 0,
          servings: 1,
          ingredients: [
            "2-3 palitos de pan integral tostados suaves",
            "¼ aguacate maduro",
            "Unas gotitas de limón y un chorrito de aceite de oliva"
          ],
          steps: [
            "Machaca el aguacate con un tenedor agregando el limón y el aceite de oliva hasta conseguir una crema lisa.",
            "Coloca la crema de aguacate en un cuenco pequeño.",
            "Ofrece los palitos de pan para que el niño aprenda a untar la salsa él mismo."
          ],
          tips: ["Estimula las destrezas de coordinación motora fina de forma entretenida y deliciosa."],
          variations: ["Puedes untar los palitos de pan con crema de queso fresco pasteurizado."],
          texture: "Tostaditas untables crujientes",
          category: "merienda",
          attributes: ["sin huevo", "sin leche", "sin azúcar"]
        }
      ]
    }
  }
};
