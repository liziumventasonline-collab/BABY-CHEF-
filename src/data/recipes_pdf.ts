import { Recipe } from "../types";

export const RECIPES_PDF: Recipe[] = [
  // --- 6 MESES ---
  {
    id: "r_pdf_sopa_avena",
    name: "Sopa de avena",
    ageRange: "6 meses",
    prepTime: 10,
    cookTime: 15,
    servings: 1,
    ingredients: [
      "50g de copos de avena",
      "20g de cebolla",
      "20g de puerro",
      "20g de zanahoria",
      "1 diente de ajo",
      "Aceite de oliva virgen extra",
      "1 vaso de agua o caldo de verduras sin sal"
    ],
    steps: [
      "Calienta una sartén a fuego medio y añade los copos de avena. Tuéstalos un par de minutos sin dejar de mover con una cuchara de madera para que no se quemen.",
      "Pela la cebolla, la zanahoria, el diente de ajo y retira la parte verde del puerro. Pica todo muy finito.",
      "Pon un chorrito de aceite de oliva en un cazo y sofríe todas las verduras unos 5 minutos hasta que estén doradas.",
      "Cuando estén hechas las verduras añade los copos de avena tostados y remueve un minuto para que se integren todos los sabores.",
      "Después añade un vaso de agua o caldo de verduras sin sal al cazo y, una vez que esté hirviendo, deja que cueza todo durante 10 minutos. Añade agua si ves que se evapora demasiada.",
      "Pon la sopa en un cuenco y espera a que no queme para dársela a tu bebé."
    ],
    tips: [
      "No dudes en descubrir a tu bebé el sabor de la avena desde muy temprano. Este cereal es rico en proteínas, fibra, manganeso y fósforo, siendo este último importante en la formación de huesos y dientes."
    ],
    variations: ["Sustituye la avena por sémola de trigo o de arroz."],
    nutritionalInfo: { calories: 120, proteins: 3.5, carbs: 18, fats: 2.5, fiber: "2.1 g" },
    vitamins: ["Vitamina A", "Vitamina B"],
    minerals: ["Fósforo", "Manganeso", "Hierro"],
    texture: "Sopa espesa blanda",
    difficulty: "Fácil",
    conservation: "Hasta 24 horas en la nevera.",
    freezing: "No recomendado.",
    reheating: "Entibiar removiendo bien.",
    warnings: ["Probar temperatura antes de dar al bebé."],
    category: "cena",
    attributes: ["sin huevo", "sin leche", "sin azúcar"]
  },
  {
    id: "r_pdf_arroz_brocoli",
    name: "Arroz con brócoli",
    ageRange: "6 meses",
    prepTime: 10,
    cookTime: 20,
    servings: 1,
    ingredients: [
      "50g de arroz",
      "50g de brócoli",
      "20g de cebolla",
      "20g de pimiento rojo",
      "1 diente de ajo",
      "Aceite de oliva virgen extra"
    ],
    steps: [
      "Pon a cocer el arroz en un cazo con agua durante 20 minutos o hasta que esté tierno.",
      "Lava el pimiento y pela la cebolla y el ajo. Pícalo todo muy finito.",
      "Corta y deshecha los troncos más gordos del brócoli. Pica los arbolitos muy finitos, hasta que todos los trozos sean aproximadamente del tamaño del arroz.",
      "En una sartén pon un chorrito de aceite de oliva y rehoga la cebolla, ajo, pimiento y brócoli durante 5 minutos.",
      "Añade el arroz cocido bien escurrido y rehoga todo junto durante 5 minutos más.",
      "¡Ya está listo! Espera a que esté templado y sírvelo a tu bebé, ya verás cómo le gusta."
    ],
    tips: [
      "Este es un plato sencillo, rico y saludable para tu bebé. El brócoli es una verdura rica en vitamina C y hierro, mientras que el arroz es una estupenda fuente de energía en forma de hidratos."
    ],
    variations: ["Usa arroz integral remojado previamente para más fibra."],
    nutritionalInfo: { calories: 130, proteins: 3.2, carbs: 24, fats: 2.1, fiber: "1.9 g" },
    vitamins: ["Vitamina C", "Vitamina A"],
    minerals: ["Hierro", "Calcio", "Potasio"],
    texture: "Granulado tierno chafado",
    difficulty: "Fácil",
    conservation: "Hasta 24 horas en la nevera.",
    freezing: "No recomendado.",
    reheating: "Calentar bien y entibiar.",
    warnings: ["Asegurar que los granos estén muy blandos."],
    category: "almuerzo",
    attributes: ["sin huevo", "sin leche", "sin azúcar", "rica en fibra"]
  },
  {
    id: "r_pdf_croquetas_patatas",
    name: "Croquetas de patatas",
    ageRange: "6 meses",
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    ingredients: [
      "100g de patata",
      "50g de garbanzos cocidos",
      "50g de arroz",
      "Un chorrito de aceite de oliva virgen extra"
    ],
    steps: [
      "Pela la patata y córtala en dados.",
      "En un cazo con agua cuece la patata y el arroz juntos durante 20 minutos.",
      "Escurre la patata y el arroz y ponlos junto a los garbanzos cocidos en un plato grande o tabla de cortar. Empieza a machacar todo con un tenedor mientras lo vas mezclando.",
      "Cuando esté medio machacado añade un pelín de aceite de oliva y sigue machacando y mezclando hasta tener una masa homogénea.",
      "Coge pequeñas porciones de esta masa, dales forma de croqueta con las manos y colócalas en un plato.",
      "Y ya está, listas para comer y disfrutar ¡Que aproveche!"
    ],
    tips: [
      "Estas croquetas de patata son ideales para iniciarse en el baby-led weaning: son muy blanditas, se cogen fácilmente y los ingredientes se encuentran en cualquier cocina. Sólo las llamamos croquetas por la forma, ya que no llevan bechamel, ni rebozado, ni están fritas."
    ],
    variations: ["Añade calabaza al vapor a la mezcla."],
    nutritionalInfo: { calories: 145, proteins: 4.2, carbs: 26, fats: 2.8, fiber: "2.5 g" },
    vitamins: ["Vitamina C", "Vitamina B6"],
    minerals: ["Hierro", "Calcio", "Potasio"],
    texture: "Sólido suave (BLW)",
    difficulty: "Fácil",
    conservation: "Consumir preferiblemente frescas.",
    freezing: "No apto.",
    reheating: "No requiere.",
    warnings: ["Ofrecer en trozos cómodos para el agarre palmar del bebé."],
    category: "merienda",
    attributes: ["sin huevo", "sin leche", "sin azúcar"]
  },
  {
    id: "r_pdf_helado_casero_frutas",
    name: "Helado casero de frutas",
    ageRange: "6 meses",
    prepTime: 10,
    cookTime: 0,
    servings: 2,
    ingredients: [
      "1 plátano maduro",
      "3 fresas maduras",
      "100ml de yogur natural sin azúcar o zumo de naranja natural"
    ],
    steps: [
      "Hacer polos es muy fácil, solo que hay que triturar las frutas que quieras usar para rellenar los moldes y ponerlos en el congelador.",
      "Algunas de las opciones que más nos gustan en casa son: plátano y fresa, yogur y fresa, sandía, zumo de naranja, etc.",
      "Haz un puré con la fruta y rellena el molde de helados. Puedes usar la batidora para triturar o si la fruta está bastante madura basta machacarla con un tenedor.",
      "Los moldes de helados de silicona son los mejores porque es más fácil sacar el polo. Compra moldes pequeños porque los bebés comen poquito.",
      "Pon los moldes llenos de fruta en el congelador durante al menos 12 horas, y cuando estén congelados del todo ya se podrán comer."
    ],
    tips: [
      "Los polos caseros de fruta son una manera divertida y saludable de tomar helados en verano. Pero no sólo sirven para aliviar el calor del bebé, muchos lo agradecen también cuando están saliendo los dientes y necesitan roer cosas frías para aliviar las encías."
    ],
    variations: ["Sustituye las fresas por mango o pera madura."],
    nutritionalInfo: { calories: 85, proteins: 1.5, carbs: 18, fats: 0.8, fiber: "2.1 g" },
    vitamins: ["Vitamina C", "Vitamina A"],
    minerals: ["Potasio", "Magnesio"],
    texture: "Sólido helado que se derrite",
    difficulty: "Fácil",
    conservation: "Hasta 1 mes en el congelador.",
    freezing: "Apto para congelar.",
    reheating: "No requiere.",
    warnings: ["Supervisar siempre para evitar que muerda un trozo grande congelado."],
    category: "merienda",
    attributes: ["sin azúcar"]
  },
  {
    id: "r_pdf_papilla_elote",
    name: "Papilla de elote",
    ageRange: "6 meses",
    prepTime: 10,
    cookTime: 20,
    servings: 1,
    ingredients: [
      "1 elote (mazorca de maíz tierno)",
      "100ml de leche materna o de fórmula",
      "1 cucharadita de aceite de oliva virgen extra"
    ],
    steps: [
      "Desgrana la mazorca de maíz y enjuaga los granos bajo el grifo.",
      "Echa los granos de maíz en un cazo y añade agua hasta cubrirlos.",
      "Hierve a fuego alto unos 15 o 20 minutos hasta que los granos estén tiernos. Controla que no se evapore todo el agua y añade más si es necesario.",
      "Una vez cocidos, tritura los granos con una batidora o procesador de alimentos hasta que quede lo más suave posible. Añadir leche materna o de fórmula poco a poco hasta conseguir la textura deseada para tu bebé.",
      "Pon la papilla de elote en un cuenco, añade una cucharadilla de aceite de oliva virgen extra y remueve bien. Ya está lista para comer ¡Deliciosa!"
    ],
    tips: [
      "Elige una mazorca de maíz dulce que tenga un color brillante y no tenga golpes. Evita las que estén secas o arrugadas. El maíz fresco es más sabroso, pero también puedes utilizar enlatado o congelado."
    ],
    variations: ["Usa batata dulce en lugar de leche para darle más consistencia."],
    nutritionalInfo: { calories: 110, proteins: 2.8, carbs: 16, fats: 3.1, fiber: "1.8 g" },
    vitamins: ["Vitamina B1", "Vitamina C"],
    minerals: ["Fósforo", "Magnesio"],
    texture: "Papilla o crema fina",
    difficulty: "Fácil",
    conservation: "Hasta 24 horas en la nevera.",
    freezing: "No recomendado.",
    reheating: "Entibiar removiendo bien.",
    warnings: ["Colar la papilla si la piel del maíz queda muy gruesa para evitar asfixia."],
    category: "cena",
    attributes: ["sin huevo", "sin azúcar"]
  },
  {
    id: "r_pdf_papilla_kiwi_platano",
    name: "Papilla de kiwi y plátano",
    ageRange: "6 meses",
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    ingredients: [
      "Medio plátano maduro",
      "Medio kiwi maduro",
      "100ml de leche materna o de fórmula"
    ],
    steps: [
      "Si guardas la fruta en la nevera, sácala un rato antes para que no salga la papilla muy fría.",
      "Pela el kiwi y el plátano y córtalos en trozos.",
      "Echa el plátano y el kiwi en el vaso de la batidora. Tritura y añade poco a poco la leche si quieres obtener una textura o sabor más suaves.",
      "Pon la papilla en un plato y ya puedes dársela a tu bebé."
    ],
    tips: [
      "Para esta papilla es muy importante que el kiwi esté maduro (pero no pasado) para que el tronco blanco no esté muy duro. También puedes usar la variedad de kiwi amarillo o golden, que es ligeramente más dulce."
    ],
    variations: ["Añade una cucharadita de copos de avena triturados."],
    nutritionalInfo: { calories: 95, proteins: 1.8, carbs: 20, fats: 0.5, fiber: "2.4 g" },
    vitamins: ["Vitamina C abundante", "Vitamina B6"],
    minerals: ["Potasio", "Magnesio"],
    texture: "Papilla suave",
    difficulty: "Fácil",
    conservation: "Consumir fresca inmediatamente.",
    freezing: "No apto.",
    reheating: "No requiere.",
    warnings: ["El kiwi es una fruta que puede causar acidez; verificar la tolerancia inicial."],
    category: "desayuno",
    attributes: ["sin huevo", "sin azúcar"]
  },
  {
    id: "r_pdf_pure_brocoli_guisantes",
    name: "Puré de brócoli y guisantes",
    ageRange: "6 meses",
    prepTime: 5,
    cookTime: 15,
    servings: 1,
    ingredients: [
      "100g de brócoli (medio brócoli pequeño aprox.)",
      "100g de guisantes frescos o congelados",
      "100g de patata",
      "Un chorrito de aceite de oliva virgen extra"
    ],
    steps: [
      "Pela y lava la patata y lava también el brócoli. Córtalos en dados pequeños.",
      "Pon un vaso de agua a hervir en un cazo. Cuando el agua esté hirviendo echa los dados de patata, el brócoli y los guisantes.",
      "Cuece a fuego medio durante 15 minutos hasta que todas las verduras estén tiernas.",
      "Escurre las verduras y ponlas en el vaso de la batidora. Tritura unos segundos hasta conseguir una textura suave. Si crees que a tu bebé puede molestarle la textura de la piel de los guisantes, usa un chino o pasapurés.",
      "Vierte el puré en un platito o cuenco y añade un chorrito de aceite de oliva virgen, remueve bien.",
      "Espera a que esté tibio y ya se lo puedes dar a tu bebé ¡Que aproveche!"
    ],
    tips: [
      "El brócoli es un alimento con altas cantidades de fibra, hierro y vitaminas A y C así que es muy saludable. Cocinado junto con los guisantes y la patata queda un puré delicioso, ligeramente dulce que le encantará a tu bebé."
    ],
    variations: ["Sustituye la patata por camote dulce."],
    nutritionalInfo: { calories: 110, proteins: 4.8, carbs: 18, fats: 1.5, fiber: "3.5 g" },
    vitamins: ["Vitamina C", "Vitamina A", "Vitamina K"],
    minerals: ["Hierro", "Calcio", "Potasio"],
    texture: "Puré o papilla suave",
    difficulty: "Fácil",
    conservation: "Hasta 48 horas en la nevera.",
    freezing: "Apto para congelar.",
    reheating: "Calentar bien y dejar templar.",
    warnings: ["Asegurar un triturado fino para guisantes enteros."],
    category: "cena",
    attributes: ["sin huevo", "sin leche", "sin azúcar", "rica en fibra"]
  },
  {
    id: "r_pdf_lentejas_rojas_arroz",
    name: "Lentejas rojas con arroz",
    ageRange: "6 meses",
    prepTime: 5,
    cookTime: 15,
    servings: 1,
    ingredients: [
      "100g de lenteja roja",
      "100g de arroz",
      "80g de pimiento rojo",
      "Aceite de oliva virgen extra"
    ],
    steps: [
      "Pon las lentejas en un colador y enjuágalas bien con agua bajo el grifo.",
      "Pon un cazo con agua al fuego y cuando esté hirviendo añade las lentejas y el arroz. Deja que cuezan durante 15 minutos vigilando que no se queden sin agua.",
      "Lava bien el pimiento y pícalo en trocitos muy pequeños. En una sartén pon un chorrito de aceite de oliva y saltea el pimiento durante 5 minutos o hasta que esté dorado.",
      "Una vez estén cocidos el arroz y las lentejas escurre todo el agua y échalos en la sartén con el pimiento. Rehoga 5 minutos todo junto para que se mezclen los sabores.",
      "¡Ya está listo! Espera a que esté tibio y ya puede comerlo tu bebé."
    ],
    tips: [
      "Las lentejas rojas son estupendas para los bebés porque se cocinan rápidamente, tienen un sabor muy rico y son muy digestivas ya que no tienen piel. En esta receta las combinamos con arroz y verduritas para conseguir una comida completa y súper nutritiva para tu bebé."
    ],
    variations: ["Sustituye el pimiento por calabaza rallada."],
    nutritionalInfo: { calories: 155, proteins: 8.5, carbs: 26, fats: 2.1, fiber: "3.2 g" },
    vitamins: ["Vitamina B1", "Vitamina C"],
    minerals: ["Hierro abundante", "Potasio", "Magnesio"],
    texture: "Arroz y lentejas muy blandos chafados",
    difficulty: "Fácil",
    conservation: "Hasta 24 horas en la nevera.",
    freezing: "No recomendado.",
    reheating: "Calentar removiendo bien.",
    warnings: ["Supervisar la deglución del arroz granulado."],
    category: "almuerzo",
    attributes: ["sin huevo", "sin leche", "sin azúcar", "rica en hierro"]
  },
  {
    id: "r_pdf_menestra_verduras",
    name: "Menestra de verduras",
    ageRange: "6 meses",
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    ingredients: [
      "150g de patata",
      "100g de brócoli",
      "50g de zanahoria",
      "50g de cebolla",
      "1 diente de ajo",
      "Aceite de oliva virgen extra"
    ],
    steps: [
      "Lava todas las verduras. Pela la patata y córtala en cubos, corta la zanahoria en rodajas y el brócoli en trocitos.",
      "Pon las verduras en un cazo y añade agua justo hasta cubrirlas. Cuece todo durante 15 minutos o hasta que veas que la patata está tierna.",
      "Mientras cuecen las verduras pica la cebolla y el ajo muy finitos. Ponlos en una sartén con un chorrito de aceite de oliva y sofríe a fuego medio durante un par de minutos hasta que estén dorados.",
      "Escurre las verduras cocidas y échalas en la sartén del sofrito. Remueve a fuego alto durante un par de minutos más para que se mezclen todos los sabores.",
      "Pon la menestra en un plato y echa una cucharadita de aceite de oliva virgen extra por encima. Remueve bien y ya puede comerla tu bebé ¡que aproveche!"
    ],
    tips: [
      "Si tu bebé aún no mastica bien cuece las verduras un poco más de tiempo para que estén más tiernas y machácalas un poco con un tenedor cuando las rehogues con el sofrito. Puedes añadir unos trocitos de jamón cocido en el rehogado final de las verduras."
    ],
    variations: ["Agrega calabacín picado para más jugosidad."],
    nutritionalInfo: { calories: 125, proteins: 3.1, carbs: 22, fats: 2.5, fiber: "2.8 g" },
    vitamins: ["Vitamina A", "Vitamina C"],
    minerals: ["Hierro", "Calcio", "Potasio"],
    texture: "Verduras tiernas chafadas",
    difficulty: "Fácil",
    conservation: "Hasta 24 horas en la nevera.",
    freezing: "No recomendado.",
    reheating: "Calentar removiendo bien.",
    warnings: ["Asegurar que los trozos de zanahoria estén sumamente suaves."],
    category: "almuerzo",
    attributes: ["sin huevo", "sin leche", "sin azúcar", "rica en fibra"]
  },
  {
    id: "r_pdf_bocaditos_lentejas_blw",
    name: "Bocaditos de lentejas BLW",
    ageRange: "6 meses",
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    ingredients: [
      "250g de lentejas rojas (sin piel)",
      "60g de cebolla",
      "Una cucharada sopera de perejil fresco",
      "Media cucharadita de ajo en polvo",
      "1/4 cucharadita de comino en polvo (opcional)",
      "1/4 cucharadita de cúrcuma en polvo (opcional)",
      "Aceite de oliva suave para freír"
    ],
    steps: [
      "Enjuaga las lentejas debajo del grifo y ponlas a remojo con agua abundante durante 2 horas.",
      "Pasadas las 2 horas, escurre el agua completamente y pon las lentejas en el vaso de la batidora. Tritura bien hasta obtener una pasta gruesa. La pasta debe ser seca y gruesa, añade una cucharada de agua si lo ves necesario pero con cuidado porque si se queda muy blanda no podrás moldearla bien.",
      "Pon la pasta de lenteja en un cuenco grande. Pica las cebollas y el perejil muy finito y échalos al cuenco. Añade también el ajo, comino y cúrcuma.",
      "Mezcla todo con las manos hasta tener una masa homogénea. Haz una bola del tamaño de una albóndiga con la masa y aplástala con las manos.",
      "En una sartén mediana pon un dedo de aceite a fuego medio-alto. Cuando esté caliente fríe los bocaditos hasta que estén dorados por ambas caras.",
      "Saca los bocaditos a un plato con papel de cocina para que escurran el aceite sobrante."
    ],
    tips: [
      "Puedes adaptar las especias a los gustos de tu bebé. Si no le gustan los sabores fuertes retira el comino y la cúrcuma. Otras especias o hierbas que puedes usar son pimentón dulce, jengibre en polvo, cilantro fresco, albahaca fresca, orégano, etc."
    ],
    variations: ["Hornéalos a 180°C por 15 minutos para una versión sin freír."],
    nutritionalInfo: { calories: 165, proteins: 10.2, carbs: 24, fats: 4.5, fiber: "4.1 g" },
    vitamins: ["Ácido fólico", "Vitamina B6"],
    minerals: ["Hierro abundante", "Zinc", "Potasio"],
    texture: "Sólidos blandos crujientes por fuera",
    difficulty: "Medio",
    conservation: "Hasta 24 horas en la nevera.",
    freezing: "Apto para congelar antes de freír.",
    reheating: "Entibiar en sartén.",
    warnings: ["Esperar que escurra bien el aceite para que no quede pesado."],
    category: "almuerzo",
    attributes: ["sin huevo", "sin leche", "sin azúcar", "rica en hierro"]
  },

  // --- 9 MESES ---
  {
    id: "r_pdf_tortillas_avena_sin_leche",
    name: "Tortillas de avena sin leche",
    ageRange: "9 meses",
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    ingredients: [
      "150g de harina de avena",
      "2 huevos medianos",
      "200ml de leche de almendras o de avena",
      "Unas gotas de esencia de vainilla natural"
    ],
    steps: [
      "En un cuenco grande bate bien los dos huevos. Echa unas gotas de esencia de vainilla.",
      "Añade la harina de avena y remueve bien para mezclar todo. A continuación echa la leche poco a poco y ve removiendo hasta tener una masa uniforme. No añadas toda la leche si ves que se está poniendo demasiado líquida.",
      "Calienta una sartén antiadherente a fuego medio-alto. Si no tienes una antiadherente añade una pizca de aceite de oliva para que no se peguen las tortitas.",
      "Pon un par de cucharadas de la masa sobre la sartén caliente. Se extenderán en forma de círculo pero si la masa te ha quedado un poco densa puedes extenderlas un poco con la cuchara. Repite hasta llenar el espacio de la sartén.",
      "Cuando la superficie de las tortitas empiece a tener burbujas dales la vuelta con ayuda de una lengua de silicona o una espátula. Cocínalas por la otra cara durante un minuto (no más) antes de sacarlas a un plato.",
      "Cuando ya no quemen sírvelas a tu bebé acompañadas de su fruta favorita ¡le encantarán!"
    ],
    tips: [
      "Estas nutritivas tortitas de avena tienen pocos ingredientes y son súper fáciles de hacer. Además les encantan a todos los bebés y pueden comerlas fácilmente con sus propias manos ¡Anímate a probarlas para el desayuno!"
    ],
    variations: ["Sustituye la leche de almendras por puré de plátano para un sabor más dulce."],
    nutritionalInfo: { calories: 140, proteins: 5.8, carbs: 20, fats: 3.2, fiber: "2.4 g" },
    vitamins: ["Vitamina B12", "Vitamina E"],
    minerals: ["Hierro", "Calcio", "Zinc"],
    texture: "Esponjosa y suave (BLW)",
    difficulty: "Fácil",
    conservation: "Hasta 24 horas en tarro cerrado.",
    freezing: "Apto para congelar.",
    reheating: "Entibiar en tostadora o sartén.",
    warnings: ["Supervisar por la introducción del huevo entero."],
    category: "desayuno",
    attributes: ["sin leche", "sin azúcar", "rica en fibra"]
  },
  {
    id: "r_pdf_hamburguesas_ternera",
    name: "Hamburguesas de ternera",
    ageRange: "9 meses",
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    ingredients: [
      "100g de carne picada de ternera magra",
      "50g de guisantes frescos o congelados",
      "Cebolla y ajo en polvo al gusto",
      "Aceite de oliva virgen extra"
    ],
    steps: [
      "En un cazo con agua pon a cocer los guisantes durante 5 minutos o hasta que estén tiernos.",
      "Una vez cocidos sácalos a un plato y machácalos un poco con un tenedor. Simplemente hay que romperlos para evitar el riesgo de atragantamiento.",
      "Añade la carne picada de ternera al mismo plato y echa un cuarto de cucharadita de cebolla en polvo y otro cuarto de ajo en polvo. Mezcla todo usando el tenedor, hasta que tengas una mezcla homogénea.",
      "Coge porciones de la mezcla y dale forma de pequeñas hamburguesas. Adapta el tamaño a la edad de tu bebé, para que pueda cogerlas fácilmente.",
      "En una sartén a fuego medio pon un chorrito de aceite de oliva y coloca con cuidado las hamburguesas, aplastándolas un poco con ayuda del tenedor. Cocínalas por las dos caras, hasta que estén doradas por fuera y el interior bien cocinado.",
      "Ponlas en un plato con papel absorbente para quitar cualquier exceso de aceite y cuando estén tibias ya puede comerlas tu bebé ¡Que aproveche!"
    ],
    tips: [
      "La carne de ternera es rica en hierro, proteínas de alta calidad y vitamina B2, por eso debe estar presente en la dieta de tu bebé. Tu bebé podrá comer estas hamburguesas fácilmente gracias a la carne picada y aprovechamos para añadir fibra con los guisantes."
    ],
    variations: ["Puedes cambiar los guisantes por zanahoria cocida machacada."],
    nutritionalInfo: { calories: 150, proteins: 12.8, carbs: 6.5, fats: 5.2, fiber: "1.4 g" },
    vitamins: ["Vitamina B12", "Vitamina B2"],
    minerals: ["Hierro (Hemo) abundante", "Zinc", "Potasio"],
    texture: "Sólidos blandos desmenuzables",
    difficulty: "Fácil",
    conservation: "Hasta 24 horas en la nevera.",
    freezing: "Apto para congelar crudas.",
    reheating: "Calentar bien en la sartén.",
    warnings: ["Verificar que no queden partes duras o muy crujientes en el borde."],
    category: "almuerzo",
    attributes: ["sin huevo", "sin leche", "sin azúcar", "rica en hierro"]
  },

  // --- 12 MESES / 1 AÑO + ---
  {
    id: "r_pdf_bocaditos_brocoli",
    name: "Bocaditos de brócoli",
    ageRange: "12 meses",
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    ingredients: [
      "550g de brócoli",
      "2 huevos",
      "60g de harina de almendra",
      "75g de queso cheddar rallado bajo en sal",
      "2 dientes de ajo",
      "Aceite de oliva virgen extra"
    ],
    steps: [
      "Corta los ramilletes del brócoli (no tires el tallo) y pártelos en trozos medianos. Corta los tallos en trozos de unos 2 cm.",
      "Hierve el brócoli en agua abundante hasta que esté tierno. Primero los tallos durante unos 5 minutos y luego los ramilletes otros 5 minutos más.",
      "Una vez cocidos escurre bien el agua del brócoli o los tots quedarán demasiado húmedos y blandos. Ponlo dentro de un trapo o colador y aprieta bien.",
      "Pica el brócoli cocido y los dientes de ajo muy finamente.",
      "En un cuenco grande echa el brócoli picado y añade el queso rallado, los huevos, la harina de almendras y el ajo. Mezcla bien para tener una masa homogénea.",
      "Coge una cucharada sopera de la masa y dale forma de cilindro (como una croqueta pero aplastando los extremos). Ve colocando los tots en una bandeja de horno cubierta con papel de hornear.",
      "Usa un pincel de cocina para pintar los tots con un poco de aceite de oliva.",
      "Hornea durante 20 minutos a 180ºC o hasta que veas que estén crujientes y dorados por fuera.",
      "Una vez que estén fríos (cuidado que pueden quemar por dentro) ya los puedes ofrecer a tu bebé ¡Deliciosos!"
    ],
    tips: [
      "Si no tienes harina de almendras puedes usar simplemente pan rallado o harina de garbanzos. Puedes probar a añadir otras verduras siempre que estén muy picaditas, como coliflor o calabacín."
    ],
    variations: ["Sustituye el cheddar por queso mozzarella."],
    nutritionalInfo: { calories: 135, proteins: 7.2, carbs: 10, fats: 7.5, fiber: "2.8 g" },
    vitamins: ["Vitamina C abundante", "Vitamina A"],
    minerals: ["Calcio", "Potasio", "Magnesio"],
    texture: "Sólidos blandos tierno-crujientes",
    difficulty: "Medio",
    conservation: "Hasta 24 horas en tarro cerrado.",
    freezing: "No recomendado.",
    reheating: "Entibiar en el horno.",
    warnings: ["Dejar enfriar para evitar quemaduras internas con el queso."],
    category: "merienda",
    attributes: ["sin azúcar", "rica en calcio", "rica en fibra"]
  },
  {
    id: "r_pdf_galletas_aceite_naranja",
    name: "Galletas de aceite de oliva y naranja",
    ageRange: "12 meses",
    prepTime: 10,
    cookTime: 10,
    servings: 4,
    ingredients: [
      "Cáscara rallada de una naranja dulce",
      "125ml de zumo de naranja natural",
      "1 huevo entero",
      "400g de harina de repostería (fuerza 0)",
      "100ml de aceite de oliva virgen extra",
      "Una cucharada de polvo de hornear (levadura química)",
      "Una cucharadita de canela en polvo",
      "120g de dátiles Medjoul sin hueso"
    ],
    steps: [
      "Primero pica los dátiles en trocitos pequeños y ponlos a remojo con medio vaso de agua muy caliente durante 20 minutos. Luego escurre los dátiles, ponlos en el vaso de la batidora y tritura bien hasta obtener una pasta. Si hace falta añade poco a poco el agua que has usado para ablandarlos.",
      "Ralla la cáscara de naranja sin llegar a la parte blanca (porque amarga) y luego exprímela para sacar el zumo.",
      "En un cuenco grande bate el huevo y luego añade el zumo, la ralladura de la naranja, el aceite y la pasta de dátiles. Remueve todo bien para mezclar los ingredientes.",
      "En otro bol mezcla la harina, la canela y el polvo de hornear.",
      "Añade poco a poco la harina a la mezcla de huevo y zumo, removiendo todo el rato para obtener una masa homogénea.",
      "Tapa el cuenco con un film transparente y déjalo reposar en la nevera 30 minutos.",
      "Pasado el reposo pon la masa sobre el papel de hornear y extiéndela con un rodillo hasta conseguir una lámina de medio centímetro de espesor. Haz la forma de las galletas con un cortapastas o haciendo círculos con un cuchillo y retira la masa sobrante entre galletas.",
      "Pon el papel con las galletas sobre una bandeja de horno. Precalienta el horno a 180º y hornéalas 10 minutos con aire arriba y abajo (o hasta que estén doradas).",
      "Déjalas enfriar y ya están listas para comer ¡Crujientes y deliciosas!"
    ],
    tips: [
      "Estas galletas se conservan bien en un recipiente hermético durante un par de semanas. Tu bebé debe comer galletas siempre bajo supervisión y sentarse derecho mientras las coma."
    ],
    variations: ["Sustituye la naranja por mandarina para un sabor dulce más suave."],
    nutritionalInfo: { calories: 165, proteins: 3.8, carbs: 28, fats: 5.5, fiber: "2.1 g" },
    vitamins: ["Vitamina C", "Vitamina B12"],
    minerals: ["Hierro", "Calcio"],
    texture: "Galleta blanda seca desmenuzable",
    difficulty: "Medio",
    conservation: "Hasta 2 semanas en tarro hermético.",
    freezing: "Apto para congelar la masa cruda.",
    reheating: "No requiere.",
    warnings: ["Vigilar atentamente por el peligro de atragantamiento con galletas secas."],
    category: "merienda",
    attributes: ["sin leche", "sin azúcar"]
  },
  {
    id: "r_pdf_bebida_miel_resfriado",
    name: "Bebida de miel para el resfriado",
    ageRange: "12 meses",
    prepTime: 5,
    cookTime: 10,
    servings: 1,
    ingredients: [
      "1 limón fresco",
      "Dos cucharaditas de miel de abejas pura de buena procedencia",
      "Unas rodajas de jengibre fresco (opcional)",
      "1 taza de agua"
    ],
    steps: [
      "Lava bien el limón y el jengibre. El jengibre es opcional, tiene un sabor fuerte y pica un poco, pero alivia la tos. Corta el limón por la mitad y pela la cáscara de una de las mitades sin pillar la parte blanca. Corta 2 rodajas finas del jengibre.",
      "Pon una taza de agua a hervir en un cazo. También puedes hervir directamente el agua en el microondas.",
      "Cuando el agua esté hirviendo viértela en una taza y añade la piel del limón y las rodajas de jengibre.",
      "Déjalo reposar 5 minutos y saca la cáscara de limón y el jengibre. Añade el zumo de medio limón y las dos cucharaditas de miel y remueve bien hasta que se disuelvan.",
      "Cuando la bebida no queme pero aún esté caliente ya puedes dársela a tu bebé. Lo mejor es que la tome a sorbitos pequeños justo antes de irse a la cama, para que el calorcito le alivie un poco y le ayude a dormir."
    ],
    tips: [
      "Sólo puedes usar esta bebida si tu bebé tiene más de 12 meses (1 año), antes de esa edad la miel está completamente prohibida por riesgo de botulismo infantil. Recuerda que esta bebida NO CURA, sólo alivia los síntomas de malestar, congestión y garganta irritada (que no es poco)."
    ],
    variations: ["Sustituye el limón por zumo de naranja dulce tibia."],
    nutritionalInfo: { calories: 45, proteins: 0.1, carbs: 12, fats: 0, fiber: "0.1 g" },
    vitamins: ["Vitamina C abundante"],
    minerals: ["Calcio", "Potasio"],
    texture: "Líquido tibio dulce",
    difficulty: "Fácil",
    conservation: "Consumir al instante.",
    freezing: "No apto.",
    reheating: "Calentar unos segundos en microondas.",
    warnings: ["NUNCA ofrecer miel a menores de 1 año (12 meses) debido al riesgo de botulismo."],
    category: "acompañamiento",
    attributes: ["sin huevo", "sin leche", "sin gluten"]
  }
];
