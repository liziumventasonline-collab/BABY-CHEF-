import { WeeklyPdfPlan } from "../types";

export const WEEKLY_PLANNER_PDF: WeeklyPdfPlan[] = [
  {
    weekNumber: 1,
    stageTitle: "Etapa 1: 6 a 8 meses",
    weekTitle: "Semana 1: Texturas suaves y papillas de un solo ingrediente",
    days: [
      { dayName: "Lunes", breakfast: "Papilla de plátano", lunch: "Puré de calabaza", dinner: "Puré de zanahoria", snack: "Compota de manzana" },
      { dayName: "Martes", breakfast: "Papilla de pera", lunch: "Puré de camote", dinner: "Puré de papa", snack: "Compota de pera" },
      { dayName: "Miércoles", breakfast: "Papilla de manzana", lunch: "Puré de calabacín", dinner: "Puré de zanahoria y papa", snack: "Puré de plátano" },
      { dayName: "Jueves", breakfast: "Papilla de avena y plátano", lunch: "Puré de calabaza con pollo", dinner: "Puré de batata", snack: "Compota mixta" },
      { dayName: "Viernes", breakfast: "Papilla de pera y manzana", lunch: "Puré de calabacín con arroz", dinner: "Puré de zanahoria", snack: "Yogur natural" },
      { dayName: "Sábado", breakfast: "Papilla de mango", lunch: "Puré de camote y pollo", dinner: "Puré de brócoli", snack: "Compota de manzana" },
      { dayName: "Domingo", breakfast: "Papilla de avena y pera", lunch: "Puré de papa y calabaza", dinner: "Puré de batata", snack: "Compota de pera" }
    ],
    shoppingList: [
      { category: "Verduras", items: [{ name: "Calabaza", quantity: "1 unidad" }, { name: "Zanahoria", quantity: "3 unidades" }, { name: "Camote", quantity: "2 unidades" }, { name: "Calabacín", quantity: "2 unidades" }, { name: "Papa", quantity: "3 unidades" }, { name: "Brócoli", quantity: "1 unidad" }] },
      { category: "Proteínas", items: [{ name: "Pollo", quantity: "200 g" }] },
      { category: "Frutas", items: [{ name: "Plátano", quantity: "3 unidades" }, { name: "Pera", quantity: "3 unidades" }, { name: "Manzana", quantity: "3 unidades" }, { name: "Mango", quantity: "1 unidad" }] },
      { category: "Cereales", items: [{ name: "Avena", quantity: "250 g" }, { name: "Arroz", quantity: "1 taza" }] },
      { category: "Lácteos", items: [{ name: "Yogur natural", quantity: "500 g" }] }
    ]
  },
  {
    weekNumber: 2,
    stageTitle: "Etapa 1: 6 a 8 meses",
    weekTitle: "Semana 2: Explorando nuevas combinaciones",
    days: [
      { dayName: "Lunes", breakfast: "Papilla de avena y pera", lunch: "Puré de calabaza y zanahoria", dinner: "Puré de papa y pollo", snack: "Compota de manzana" },
      { dayName: "Martes", breakfast: "Papilla de plátano y yogur", lunch: "Puré de camote y calabacín", dinner: "Puré de batata", snack: "Compota de pera" },
      { dayName: "Miércoles", breakfast: "Papilla de manzana y canela", lunch: "Puré de brócoli con papa", dinner: "Puré de zanahoria y lentejas", snack: "Yogur natural" },
      { dayName: "Jueves", breakfast: "Papilla de avena y mango", lunch: "Puré de calabaza y pollo", dinner: "Puré de calabacín y arroz", snack: "Compota mixta" },
      { dayName: "Viernes", breakfast: "Papilla de pera", lunch: "Puré de camote con zanahoria", dinner: "Puré de batata y lentejas", snack: "Compota de manzana" },
      { dayName: "Sábado", breakfast: "Papilla de plátano y manzana", lunch: "Puré de calabaza y papa", dinner: "Puré de brócoli", snack: "Yogur natural" },
      { dayName: "Domingo", breakfast: "Papilla de mango", lunch: "Puré de arroz y pollo", dinner: "Puré de camote y calabacín", snack: "Compota mixta" }
    ],
    shoppingList: [
      { category: "Verduras", items: [{ name: "Calabaza", quantity: "1 unidad" }, { name: "Zanahoria", quantity: "3 unidades" }, { name: "Camote", quantity: "3 unidades" }, { name: "Calabacín", quantity: "2 unidades" }, { name: "Papa", quantity: "2 unidades" }, { name: "Brócoli", quantity: "1 unidad" }] },
      { category: "Proteínas", items: [{ name: "Pollo", quantity: "250 g" }, { name: "Lentejas cocidas", quantity: "1 taza" }] },
      { category: "Frutas", items: [{ name: "Plátano", quantity: "3 unidades" }, { name: "Pera", quantity: "3 unidades" }, { name: "Manzana", quantity: "2 unidades" }, { name: "Mango", quantity: "1 unidad" }] },
      { category: "Cereales", items: [{ name: "Avena", quantity: "250 g" }, { name: "Arroz", quantity: "1 taza" }] },
      { category: "Lácteos", items: [{ name: "Yogur natural", quantity: "500 g" }] }
    ]
  },
  {
    weekNumber: 3,
    stageTitle: "Etapa 1: 6 a 8 meses",
    weekTitle: "Semana 3: Introduciendo texturas más firmes",
    days: [
      { dayName: "Lunes", breakfast: "Papilla de pera y avena", lunch: "Puré de calabaza y pollo", dinner: "Puré de papa con aceite de oliva", snack: "Compota de manzana" },
      { dayName: "Martes", breakfast: "Papilla de plátano y mango", lunch: "Puré de camote y arroz", dinner: "Puré de brócoli y zanahoria", snack: "Yogur natural" },
      { dayName: "Miércoles", breakfast: "Papilla de manzana y canela", lunch: "Puré de calabacín con pollo", dinner: "Puré de batata", snack: "Compota de pera" },
      { dayName: "Jueves", breakfast: "Papilla de avena con fruta mixta", lunch: "Puré de calabaza y papa", dinner: "Puré de calabacín", snack: "Compota de mango" },
      { dayName: "Viernes", breakfast: "Papilla de pera y yogur", lunch: "Puré de camote y pollo", dinner: "Puré de zanahoria y lentejas", snack: "Compota de manzana" },
      { dayName: "Sábado", breakfast: "Papilla de plátano y manzana", lunch: "Puré de batata con guisantes", dinner: "Puré de papa", snack: "Yogur natural" },
      { dayName: "Domingo", breakfast: "Papilla de mango", lunch: "Puré de calabaza con arroz", dinner: "Puré de calabacín y zanahoria", snack: "Compota mixta" }
    ],
    shoppingList: [
      { category: "Verduras", items: [{ name: "Calabaza", quantity: "1 unidad" }, { name: "Zanahoria", quantity: "3 unidades" }, { name: "Camote", quantity: "3 unidades" }, { name: "Calabacín", quantity: "2 unidades" }, { name: "Papa", quantity: "2 unidades" }, { name: "Brócoli", quantity: "1 un." }, { name: "Guisantes", quantity: "1 taza" }] },
      { category: "Proteínas", items: [{ name: "Pollo", quantity: "250 g" }, { name: "Lentejas cocidas", quantity: "1 taza" }] },
      { category: "Frutas", items: [{ name: "Plátano", quantity: "3 un." }, { name: "Pera", quantity: "3 un." }, { name: "Manzana", quantity: "2 un." }, { name: "Mango", quantity: "1 un." }] },
      { category: "Cereales", items: [{ name: "Avena", quantity: "250 g" }, { name: "Arroz", quantity: "1 taza" }] },
      { category: "Lácteos", items: [{ name: "Yogur natural", quantity: "500 g" }] }
    ]
  },
  {
    weekNumber: 4,
    stageTitle: "Etapa 1: 6 a 8 meses",
    weekTitle: "Semana 4: Combinaciones de sabores",
    days: [
      { dayName: "Lunes", breakfast: "Papilla de avena y pera", lunch: "Puré de calabaza con pollo", dinner: "Puré de camote y calabacín", snack: "Compota de manzana y plátano" },
      { dayName: "Martes", breakfast: "Papilla de avena con manzana y canela", lunch: "Puré de papa con zanahoria", dinner: "Puré de batata", snack: "Compota de pera" },
      { dayName: "Miércoles", breakfast: "Papilla de yogur con plátano", lunch: "Puré de calabacín con arroz", dinner: "Puré de lentejas con zanahoria", snack: "Compota de mango" },
      { dayName: "Jueves", breakfast: "Papilla de mango", lunch: "Puré de calabaza y papa", dinner: "Puré de brócoli", snack: "Yogur natural" },
      { dayName: "Viernes", breakfast: "Papilla de pera y manzana", lunch: "Puré de camote con pollo", dinner: "Puré de batata y guisantes", snack: "Compota de manzana" },
      { dayName: "Sábado", breakfast: "Papilla de plátano con avena", lunch: "Puré de papa y calabaza", dinner: "Puré de calabacín", snack: "Compota mixta" },
      { dayName: "Domingo", breakfast: "Yogur con pera rallada", lunch: "Puré de arroz con pollo", dinner: "Puré de zanahoria y papa", snack: "Compota de pera" }
    ],
    shoppingList: [
      { category: "Verduras", items: [{ name: "Calabaza", quantity: "1 un." }, { name: "Camote", quantity: "2 un." }, { name: "Calabacín", quantity: "2 un." }, { name: "Papa", quantity: "3 un." }, { name: "Brócoli", quantity: "1 un." }, { name: "Zanahoria", quantity: "3 un." }] },
      { category: "Proteínas", items: [{ name: "Pollo", quantity: "200 g" }, { name: "Lentejas cocidas", quantity: "1 taza" }] },
      { category: "Frutas", items: [{ name: "Pera", quantity: "3 un." }, { name: "Manzana", quantity: "3 un." }, { name: "Plátano", quantity: "2 un." }, { name: "Mango", quantity: "1 un." }] },
      { category: "Cereales", items: [{ name: "Arroz integral", quantity: "1 taza" }, { name: "Avena", quantity: "250 g" }] }
    ]
  },
  {
    weekNumber: 5,
    stageTitle: "Etapa 1: 6 a 8 meses",
    weekTitle: "Semana 5: Texturas más densas",
    days: [
      { dayName: "Lunes", breakfast: "Avena con manzana rallada", lunch: "Puré de camote con pollo", dinner: "Puré de calabaza", snack: "Compota de pera" },
      { dayName: "Martes", breakfast: "Pera con yogur", lunch: "Puré de papa con zanahoria", dinner: "Puré de brócoli", snack: "Compota de manzana" },
      { dayName: "Miércoles", breakfast: "Avena con plátano", lunch: "Puré de calabacín con arroz", dinner: "Puré de lentejas con batata", snack: "Yogur natural" },
      { dayName: "Jueves", breakfast: "Mango y pera", lunch: "Puré de calabaza con pollo", dinner: "Puré de papa", snack: "Compota mixta" },
      { dayName: "Viernes", breakfast: "Papilla de manzana con canela", lunch: "Puré de camote con calabacín", dinner: "Puré de zanahoria", snack: "Yogur" },
      { dayName: "Sábado", breakfast: "Pera y plátano", lunch: "Puré de calabaza con arroz", dinner: "Puré de batata", snack: "Compota de manzana" },
      { dayName: "Domingo", breakfast: "Avena con mango", lunch: "Puré de papa con pollo", dinner: "Puré de calabacín", snack: "Compota de pera" }
    ],
    shoppingList: [
      { category: "Verduras", items: [{ name: "Calabaza", quantity: "1 un." }, { name: "Camote", quantity: "2 un." }, { name: "Calabacín", quantity: "2 un." }, { name: "Papa", quantity: "2 un." }, { name: "Brócoli", quantity: "1 un." }, { name: "Zanahoria", quantity: "2 un." }, { name: "Batata", quantity: "2 un." }] },
      { category: "Proteínas", items: [{ name: "Pollo", quantity: "250 g" }, { name: "Lentejas cocidas", quantity: "1 taza" }] },
      { category: "Frutas", items: [{ name: "Pera", quantity: "3 un." }, { name: "Manzana", quantity: "2 un." }, { name: "Plátano", quantity: "2 un." }, { name: "Mango", quantity: "1 un." }] },
      { category: "Cereales", items: [{ name: "Avena", quantity: "250 g" }, { name: "Arroz integral", quantity: "1 taza" }] },
      { category: "Lácteos", items: [{ name: "Yogur natural", quantity: "500 g" }] }
    ]
  },
  {
    weekNumber: 6,
    stageTitle: "Etapa 1: 6 a 8 meses",
    weekTitle: "Semana 6: Pequeñas mezclas",
    days: [
      { dayName: "Lunes", breakfast: "Yogur con plátano", lunch: "Puré de calabaza con pollo", dinner: "Puré de zanahoria y batata", snack: "Compota de manzana" },
      { dayName: "Martes", breakfast: "Avena con pera", lunch: "Puré de brócoli con papa", dinner: "Puré de calabacín", snack: "Compota de pera" },
      { dayName: "Miércoles", breakfast: "Avena con manzana", lunch: "Puré de camote con arroz", dinner: "Puré de lentejas con zanahoria", snack: "Yogur natural" },
      { dayName: "Jueves", breakfast: "Mango con yogur", lunch: "Puré de papa y calabaza", dinner: "Puré de batata", snack: "Compota mixta" },
      { dayName: "Viernes", breakfast: "Pera y manzana", lunch: "Puré de calabacín con pollo", dinner: "Puré de brócoli", snack: "Yogur" },
      { dayName: "Sábado", breakfast: "Plátano y pera", lunch: "Puré de calabaza con arroz", dinner: "Puré de zanahoria", snack: "Compota de manzana" },
      { dayName: "Domingo", breakfast: "Avena con manzana", lunch: "Puré de camote con pollo", dinner: "Puré de batata con guisantes", snack: "Compota de pera" }
    ],
    shoppingList: [
      { category: "Verduras", items: [{ name: "Calabaza", quantity: "1 un." }, { name: "Zanahoria", quantity: "3 un." }, { name: "Batata", quantity: "2 un." }, { name: "Calabacín", quantity: "2 un." }, { name: "Papa", quantity: "2 un." }, { name: "Brócoli", quantity: "1 un." }, { name: "Guisantes", quantity: "1 taza" }] },
      { category: "Proteínas", items: [{ name: "Pollo", quantity: "250 g" }, { name: "Lentejas cocidas", quantity: "1 taza" }] },
      { category: "Frutas", items: [{ name: "Pera", quantity: "3 un." }, { name: "Manzana", quantity: "3 un." }, { name: "Plátano", quantity: "2 un." }, { name: "Mango", quantity: "1 un." }] },
      { category: "Cereales", items: [{ name: "Avena", quantity: "250 g" }, { name: "Arroz integral", quantity: "1 taza" }] },
      { category: "Lácteos", items: [{ name: "Yogur natural", quantity: "500 g" }] }
    ]
  },
  {
    weekNumber: 7,
    stageTitle: "Etapa 2: 9 a 12 meses",
    weekTitle: "Semana 7: Descubriendo nuevos sabores",
    days: [
      { dayName: "Lunes", breakfast: "Pan integral con aguacate", lunch: "Puré de pollo, papa y zanahoria", dinner: "Puré de lentejas y camote", snack: "Yogur con pera cocida" },
      { dayName: "Martes", breakfast: "Avena espesa con plátano", lunch: "Arroz con pollo y brócoli", dinner: "Puré de calabaza con queso fresco", snack: "Compota de manzana" },
      { dayName: "Miércoles", breakfast: "Tortitas de plátano y avena", lunch: "Pescado blanco con arroz", dinner: "Puré de batata", snack: "Fruta blanda" },
      { dayName: "Jueves", breakfast: "Yogur con manzana rallada", lunch: "Mini albóndigas de pollo con tomate", dinner: "Puré de calabacín con garbanzos", snack: "Compota de pera" },
      { dayName: "Viernes", breakfast: "Crepe integral con puré de fruta", lunch: "Quinoa con calabaza y queso", dinner: "Sopa de verduras con pan blando", snack: "Bolitas de avena" },
      { dayName: "Sábado", breakfast: "Pan pita con hummus", lunch: "Pasta corta con salsa de calabacín", dinner: "Puré de zanahoria con pollo", snack: "Yogur" },
      { dayName: "Domingo", breakfast: "Muffin de zanahoria y manzana", lunch: "Pollo al vapor con batata", dinner: "Puré de brócoli y papa", snack: "Fruta mixta" }
    ],
    shoppingList: [
      { category: "Verduras", items: [{ name: "Zanahoria", quantity: "2 un." }, { name: "Camote", quantity: "2 un." }, { name: "Papa", quantity: "2 un." }, { name: "Calabaza", quantity: "1 un." }, { name: "Calabacín", quantity: "2 un." }, { name: "Brócoli", quantity: "1 un." }] },
      { category: "Proteínas", items: [{ name: "Pollo", quantity: "250 g" }, { name: "Pescado blanco", quantity: "150 g" }, { name: "Garbanzos cocidos", quantity: "1 taza" }, { name: "Lentejas", quantity: "1 taza" }] },
      { category: "Frutas", items: [{ name: "Pera", quantity: "2 un." }, { name: "Manzana", quantity: "2 un." }, { name: "Plátano", quantity: "2 un." }, { name: "Aguacate", quantity: "1 un." }] },
      { category: "Cereales y Granos", items: [{ name: "Pan integral", quantity: "1 barra" }, { name: "Avena", quantity: "250 g" }, { name: "Arroz integral", quantity: "1 taza" }, { name: "Quinoa", quantity: "1 taza" }, { name: "Pasta corta", quantity: "1 taza" }, { name: "Pan pita", quantity: "1 un." }] },
      { category: "Lácteos y Otros", items: [{ name: "Queso fresco", quantity: "150 g" }, { name: "Yogur natural", quantity: "500 g" }, { name: "Hummus", quantity: "1 porción" }] }
    ]
  },
  {
    weekNumber: 8,
    stageTitle: "Etapa 2: 9 a 12 meses",
    weekTitle: "Semana 8: Texturas más firmes",
    days: [
      { dayName: "Lunes", breakfast: "Tortitas de avena y plátano", lunch: "Arroz integral con pollo y verduras", dinner: "Puré de garbanzos con calabaza", snack: "Compota de pera" },
      { dayName: "Martes", breakfast: "Yogur con granola blanda", lunch: "Pescado con guisantes y arroz", dinner: "Puré de batata con queso", snack: "Fruta blanda" },
      { dayName: "Miércoles", breakfast: "Crepe integral con puré de mango", lunch: "Albóndigas de pollo con tomate", dinner: "Sopa de verduras con pan", snack: "Bolitas de avena" },
      { dayName: "Jueves", breakfast: "Pan integral con hummus", lunch: "Pasta corta con salsa de calabacín", dinner: "Puré de papa con brócoli", snack: "Yogur" },
      { dayName: "Viernes", breakfast: "Muffin de zanahoria", lunch: "Quinoa con calabaza y queso", dinner: "Puré de zanahoria con lentejas", snack: "Compota de manzana" },
      { dayName: "Sábado", breakfast: "Avena espesa con pera", lunch: "Pollo con arroz y zanahoria", dinner: "Puré de calabacín con papa", snack: "Frutas variadas" },
      { dayName: "Domingo", breakfast: "Yogur con plátano", lunch: "Pescado con batata", dinner: "Puré de calabaza y papa", snack: "Compota mixta" }
    ],
    shoppingList: [
      { category: "Verduras", items: [{ name: "Calabaza", quantity: "1 un." }, { name: "Zanahoria", quantity: "3 un." }, { name: "Camote/Batata", quantity: "2 un." }, { name: "Calabacín", quantity: "2 un." }, { name: "Papa", quantity: "2 un." }, { name: "Brócoli", quantity: "1 un." }] },
      { category: "Proteínas", items: [{ name: "Pollo", quantity: "250 g" }, { name: "Pescado blanco", quantity: "150 g" }, { name: "Garbanzos", quantity: "1 taza" }, { name: "Lentejas", quantity: "1 taza" }] },
      { category: "Frutas", items: [{ name: "Pera", quantity: "2 un." }, { name: "Manzana", quantity: "2 un." }, { name: "Plátano", quantity: "2 un." }, { name: "Mango", quantity: "1 un." }] },
      { category: "Cereales y Granos", items: [{ name: "Pan integral", quantity: "1 un." }, { name: "Avena", quantity: "250 g" }, { name: "Arroz", quantity: "1 taza" }, { name: "Pasta corta", quantity: "1 taza" }, { name: "Quinoa", quantity: "1 taza" }] },
      { category: "Lácteos y Otros", items: [{ name: "Yogur natural", quantity: "500 g" }, { name: "Queso fresco", quantity: "150 g" }] }
    ]
  },
  {
    weekNumber: 9,
    stageTitle: "Etapa 2: 9 a 12 meses",
    weekTitle: "Semana 9: Colores y texturas",
    days: [
      { dayName: "Lunes", breakfast: "Papilla de mango con yogur", lunch: "Mini albóndigas de pollo con tomate", dinner: "Puré de calabaza con lentejas", snack: "Compota de pera y canela" },
      { dayName: "Martes", breakfast: "Panecillo de calabaza con queso", lunch: "Arroz con verduras", dinner: "Puré de batata con pescado", snack: "Yogur" },
      { dayName: "Miércoles", breakfast: "Crepe integral con puré de manzana", lunch: "Quinoa con calabaza y queso", dinner: "Puré de brócoli con papa", snack: "Fruta blanda" },
      { dayName: "Jueves", breakfast: "Avena espesa con plátano", lunch: "Pollo con arroz y guisantes", dinner: "Puré de calabacín", snack: "Compota de manzana" },
      { dayName: "Viernes", breakfast: "Yogur con pera rallada", lunch: "Pasta corta con salsa de calabacín", dinner: "Puré de zanahoria con pollo", snack: "Bolitas de avena" },
      { dayName: "Sábado", breakfast: "Muffin de manzana y zanahoria", lunch: "Pescado con arroz", dinner: "Sopa de verduras", snack: "Fruta" },
      { dayName: "Domingo", breakfast: "Pan pita con hummus", lunch: "Guiso de alubias con verduras", dinner: "Puré de camote", snack: "Yogur" }
    ],
    shoppingList: [
      { category: "Verduras", items: [{ name: "Calabaza", quantity: "1 un." }, { name: "Zanahoria", quantity: "3 un." }, { name: "Camote/Batata", quantity: "2 un." }, { name: "Calabacín", quantity: "2 un." }, { name: "Papa", quantity: "2 un." }, { name: "Brócoli", quantity: "1 un." }] },
      { category: "Proteínas", items: [{ name: "Pollo", quantity: "250 g" }, { name: "Pescado", quantity: "150 g" }, { name: "Lentejas", quantity: "1 taza" }] },
      { category: "Frutas", items: [{ name: "Pera", quantity: "2 un." }, { name: "Manzana", quantity: "2 un." }, { name: "Plátano", quantity: "2 un." }, { name: "Mango", quantity: "1 un." }] },
      { category: "Cereales y Granos", items: [{ name: "Pan integral/pita", quantity: "1 un." }, { name: "Avena", quantity: "250 g" }, { name: "Arroz", quantity: "1 taza" }, { name: "Pasta", quantity: "1 taza" }, { name: "Quinoa", quantity: "1 taza" }] },
      { category: "Lácteos y Otros", items: [{ name: "Yogur", quantity: "500 g" }, { name: "Queso fresco", quantity: "150 g" }] }
    ]
  },
  {
    weekNumber: 10,
    stageTitle: "Etapa 3: 12 a 18 meses",
    weekTitle: "Semana 10: Primeras comidas familiares",
    days: [
      { dayName: "Lunes", breakfast: "Tortilla francesa con champiñones", lunch: "Arroz integral con pollo y verduras", dinner: "Crema de zanahoria", snack: "Yogur con fruta" },
      { dayName: "Martes", breakfast: "Pan integral con queso fresco", lunch: "Croquetas de brócoli al horno", dinner: "Puré de batata con pollo", snack: "Fruta blanda" },
      { dayName: "Miércoles", breakfast: "Avena con manzana y dátiles", lunch: "Pasta corta con salsa de calabacín", dinner: "Sopa de verduras con pan", snack: "Compota" },
      { dayName: "Jueves", breakfast: "Muffin de espinaca y queso", lunch: "Quinoa con calabaza y queso", dinner: "Puré de papa y calabacín", snack: "Bolitas de avena" },
      { dayName: "Viernes", breakfast: "Yogur con granola", lunch: "Pescado al vapor con arroz", dinner: "Puré de zanahoria con lentejas", snack: "Fruta" },
      { dayName: "Sábado", breakfast: "Crepe integral con puré de pera", lunch: "Mini lasaña de verduras y carne", dinner: "Puré de brócoli y papa", snack: "Yogur" },
      { dayName: "Domingo", breakfast: "Panecillo de calabaza", lunch: "Pollo al horno con batata", dinner: "Puré de calabaza con garbanzos", snack: "Compota" }
    ],
    shoppingList: [
      { category: "Verduras", items: [{ name: "Champiñones", quantity: "100 g" }, { name: "Calabaza", quantity: "1 un." }, { name: "Zanahoria", quantity: "3 un." }, { name: "Batata", quantity: "2 un." }, { name: "Papa", quantity: "2 un." }] },
      { category: "Proteínas", items: [{ name: "Pollo", quantity: "250 g" }, { name: "Carne magra", quantity: "200 g" }, { name: "Pescado blanco", quantity: "150 g" }, { name: "Garbanzos", quantity: "1 taza" }] },
      { category: "Frutas", items: [{ name: "Manzana", quantity: "2 un." }, { name: "Pera", quantity: "2 un." }, { name: "Plátano", quantity: "2 un." }] },
      { category: "Cereales y Granos", items: [{ name: "Arroz integral", quantity: "1 taza" }, { name: "Pasta corta", quantity: "1 taza" }, { name: "Quinoa", quantity: "1 taza" }, { name: "Avena", quantity: "250 g" }] },
      { category: "Lácteos y Otros", items: [{ name: "Yogur natural", quantity: "500 g" }, { name: "Queso de fundir / rallado", quantity: "150 g" }, { name: "Queso fresco", quantity: "150 g" }] }
    ]
  },
  {
    weekNumber: 11,
    stageTitle: "Etapa 3: 12 a 18 meses",
    weekTitle: "Semana 11: Confort y variedad",
    days: [
      { dayName: "Lunes", breakfast: "Pan integral con hummus", lunch: "Estofado de ternera con papa y zanahoria", dinner: "Puré de batata con queso fresco", snack: "Fruta blanda" },
      { dayName: "Martes", breakfast: "Avena con pera", lunch: "Hamburguesitas de lenteja con arroz", dinner: "Crema suave de calabaza", snack: "Yogur natural" },
      { dayName: "Miércoles", breakfast: "Yogur con manzana rallada", lunch: "Pasta corta con tomate y verduras", dinner: "Puré de brócoli con papa", snack: "Galleta blanda de avena" },
      { dayName: "Jueves", breakfast: "Tortilla de patata y calabacín", lunch: "Quinoa con pollo y verduras", dinner: "Sopa de verduras con fideos blandos", snack: "Compota casera" },
      { dayName: "Viernes", breakfast: "Batido de mango, yogur y avena", lunch: "Pescado al vapor con arroz y guisantes", dinner: "Puré de zanahoria con aceite de oliva", snack: "Fruta variada" },
      { dayName: "Sábado", breakfast: "Muffin de zanahoria", lunch: "Croquetas de brócoli y queso", dinner: "Puré de camote con pollo", snack: "Yogur" },
      { dayName: "Domingo", breakfast: "Crepe integral con puré de fruta", lunch: "Guiso de alubias con verduras", dinner: "Puré de calabacín con papa", snack: "Fruta blanda" }
    ],
    shoppingList: [
      { category: "Verduras", items: [{ name: "Calabaza", quantity: "1 un." }, { name: "Zanahoria", quantity: "4 un." }, { name: "Papa", quantity: "4 un." }, { name: "Batata/Camote", quantity: "3 un." }, { name: "Calabacín", quantity: "2 un." }, { name: "Brócoli", quantity: "1 un." }, { name: "Guisantes", quantity: "1 taza" }, { name: "Pepino", quantity: "1 un." }, { name: "Tomate", quantity: "2 un." }] },
      { category: "Proteínas", items: [{ name: "Ternera magra", quantity: "250 g" }, { name: "Pollo", quantity: "300 g" }, { name: "Pescado blanco", quantity: "180 g" }, { name: "Alubias cocidas", quantity: "1 taza" }, { name: "Lentejas cocidas", quantity: "1 taza" }] },
      { category: "Frutas", items: [{ name: "Pera", quantity: "2 un." }, { name: "Manzana", quantity: "2 un." }, { name: "Mango", quantity: "1 un." }, { name: "Fruta variada", quantity: "2-3 un." }] },
      { category: "Cereales y Granos", items: [{ name: "Pan integral", quantity: "1 barra" }, { name: "Avena", quantity: "300 g" }, { name: "Pasta corta", quantity: "1 taza" }, { name: "Arroz integral", quantity: "1 taza" }, { name: "Quinoa", quantity: "1 taza" }] },
      { category: "Lácteos y Otros", items: [{ name: "Yogur natural", quantity: "600 g" }, { name: "Queso fresco", quantity: "200 g" }, { name: "Hummus", quantity: "1 porción" }, { name: "Fideos finos", quantity: "1 taza" }] }
    ]
  },
  {
    weekNumber: 12,
    stageTitle: "Etapa 3: 12 a 18 meses",
    weekTitle: "Semana 12: Mini platos familiares",
    days: [
      { dayName: "Lunes", breakfast: "Pan integral con queso crema", lunch: "Arroz integral con pollo y verduras", dinner: "Crema de zanahoria con naranja", snack: "Fruta fresca" },
      { dayName: "Martes", breakfast: "Yogur con avena", lunch: "Mini albóndigas de carne magra con tomate", dinner: "Puré de batata", snack: "Compota de manzana" },
      { dayName: "Miércoles", breakfast: "Tortitas de avena y plátano con arándanos", lunch: "Quinoa con calabaza y queso", dinner: "Sopa de verduras con fideos", snack: "Yogur" },
      { dayName: "Jueves", breakfast: "Avena con pera y canela", lunch: "Pescado al vapor con arroz y brócoli", dinner: "Puré de calabacín con papa", snack: "Galleta de avena" },
      { dayName: "Viernes", breakfast: "Panecillo de calabaza", lunch: "Hamburguesitas de lenteja y arroz", dinner: "Puré de zanahoria con pollo", snack: "Fruta" },
      { dayName: "Sábado", breakfast: "Crepe integral con puré de manzana", lunch: "Pasta corta con salsa de calabacín", dinner: "Puré de camote con queso", snack: "Compota" },
      { dayName: "Domingo", breakfast: "Yogur con fruta", lunch: "Pollo al horno con batata", dinner: "Puré de calabaza con garbanzos", snack: "Fruta" }
    ],
    shoppingList: [
      { category: "Verduras", items: [{ name: "Calabaza", quantity: "1 un." }, { name: "Zanahoria", quantity: "3 un." }, { name: "Batata/Camote", quantity: "2 un." }, { name: "Papa", quantity: "2 un." }, { name: "Calabacín", quantity: "2 un." }, { name: "Brócoli", quantity: "1 un." }, { name: "Tomate", quantity: "2 un." }, { name: "Naranja", quantity: "1 un." }] },
      { category: "Proteínas", items: [{ name: "Pollo", quantity: "350 g" }, { name: "Carne magra", quantity: "200 g" }, { name: "Pescado blanco", quantity: "180 g" }, { name: "Lentejas cocidas", quantity: "1 taza" }, { name: "Garbanzos", quantity: "1 taza" }] },
      { category: "Frutas", items: [{ name: "Plátano", quantity: "2 un." }, { name: "Pera", quantity: "2 un." }, { name: "Manzana", quantity: "2 un." }, { name: "Arándanos", quantity: "80 g" }] },
      { category: "Cereales y Granos", items: [{ name: "Pan integral", quantity: "1 barra" }, { name: "Avena", quantity: "300 g" }, { name: "Pasta", quantity: "1 taza" }, { name: "Arroz integral", quantity: "1 taza" }, { name: "Quinoa", quantity: "1 taza" }] },
      { category: "Lácteos y Otros", items: [{ name: "Yogur natural", quantity: "600 g" }, { name: "Queso fresco/rallado", quantity: "200 g" }] }
    ]
  },
  {
    weekNumber: 13,
    stageTitle: "Etapa 3: 12 a 18 meses",
    weekTitle: "Semana 13: Transición a trocitos",
    days: [
      { dayName: "Lunes", breakfast: "Tostaditas integrales con aguacate", lunch: "Arroz integral con pollo y verduras", dinner: "Sopa de verduras con pasta", snack: "Yogur con fruta" },
      { dayName: "Martes", breakfast: "Tortilla francesa con champiñones finos", lunch: "Quinoa con calabaza y queso", dinner: "Puré de batata con pollo", snack: "Galleta de avena" },
      { dayName: "Miércoles", breakfast: "Panecillos de calabaza con queso", lunch: "Pescado al horno con patata", dinner: "Puré de brócoli y zanahoria", snack: "Fruta blanda" },
      { dayName: "Jueves", breakfast: "Avena espesa con plátano", lunch: "Mini albóndigas de carne con tomate", dinner: "Verduras al vapor con pasta", snack: "Yogur" },
      { dayName: "Viernes", breakfast: "Yogur con granola blandita", lunch: "Hamburguesitas de lenteja con arroz", dinner: "Crema suave de calabaza", snack: "Fruta" },
      { dayName: "Sábado", breakfast: "Crepe integral con puré de pera", lunch: "Empanaditas de pollo y espinaca", dinner: "Puré de calabacín con papa", snack: "Compota" },
      { dayName: "Domingo", breakfast: "Muffin de zanahoria y manzana", lunch: "Pollo al horno con batata", dinner: "Quinoa con verduras", snack: "Fruta" }
    ],
    shoppingList: [
      { category: "Verduras", items: [{ name: "Calabaza", quantity: "1 un." }, { name: "Zanahoria", quantity: "3 un." }, { name: "Papa", quantity: "3 un." }, { name: "Batata/Camote", quantity: "2 un." }, { name: "Calabacín", quantity: "2 un." }, { name: "Brócoli", quantity: "1 un." }, { name: "Champiñones", quantity: "100 g" }, { name: "Espinaca", quantity: "100 g" }, { name: "Tomate", quantity: "2 un." }, { name: "Aguacate", quantity: "1 un." }] },
      { category: "Proteínas", items: [{ name: "Pollo", quantity: "350 g" }, { name: "Carne magra", quantity: "200 g" }, { name: "Pescado blanco", quantity: "180 g" }, { name: "Lentejas cocidas", quantity: "1 taza" }] },
      { category: "Frutas", items: [{ name: "Plátano", quantity: "2 un." }, { name: "Pera", quantity: "2 un." }, { name: "Manzana", quantity: "2 un." }] },
      { category: "Cereales y Granos", items: [{ name: "Pan integral", quantity: "1 un." }, { name: "Avena", quantity: "300 g" }, { name: "Pasta", quantity: "1 taza" }, { name: "Arroz integral", quantity: "1 taza" }, { name: "Quinoa", quantity: "1 taza" }, { name: "Granola casera", quantity: "1 taza" }] },
      { category: "Lácteos y Otros", items: [{ name: "Yogur natural", quantity: "600 g" }, { name: "Queso fresco/rallado", quantity: "200 g" }] }
    ]
  },
  {
    weekNumber: 14,
    stageTitle: "Etapa 3: 12 a 18 meses",
    weekTitle: "Semana 14: Ritmo familiar",
    days: [
      { dayName: "Lunes", breakfast: "Yogur con fruta y avena", lunch: "Arroz con ternera y verduras", dinner: "Puré de camote con queso", snack: "Fruta" },
      { dayName: "Martes", breakfast: "Tortitas de avena y plátano", lunch: "Pescado con arroz y guisantes", dinner: "Sopa de verduras", snack: "Galleta de avena" },
      { dayName: "Miércoles", breakfast: "Pan integral con hummus", lunch: "Pasta corta con salsa de calabacín", dinner: "Puré de brócoli y papa", snack: "Yogur" },
      { dayName: "Jueves", breakfast: "Avena con pera y canela", lunch: "Guiso de alubias con verduras", dinner: "Puré de zanahoria con pollo", snack: "Fruta" },
      { dayName: "Viernes", breakfast: "Crepe con puré de manzana", lunch: "Quinoa con calabaza y queso", dinner: "Verduras al vapor con pasta", snack: "Compota" },
      { dayName: "Sábado", breakfast: "Muffin de espinaca y queso", lunch: "Mini lasaña de verduras y carne", dinner: "Puré de batata", snack: "Yogur" },
      { dayName: "Domingo", breakfast: "Panecillo de calabaza", lunch: "Pollo al horno con batata", dinner: "Puré de calabacín y papa", snack: "Fruta" }
    ],
    shoppingList: [
      { category: "Verduras", items: [{ name: "Calabaza", quantity: "1 un." }, { name: "Zanahoria", quantity: "3 un." }, { name: "Batata/Camote", quantity: "3 un." }, { name: "Papa", quantity: "2 un." }, { name: "Calabacín", quantity: "2 un." }, { name: "Brócoli", quantity: "1 un." }, { name: "Guisantes", quantity: "1 taza" }, { name: "Tomate", quantity: "2 un." }, { name: "Espinaca", quantity: "100 g" }] },
      { category: "Proteínas", items: [{ name: "Ternera magra", quantity: "250 g" }, { name: "Pollo", quantity: "300 g" }, { name: "Pescado blanco", quantity: "180 g" }, { name: "Alubias", quantity: "1 taza" }] },
      { category: "Frutas", items: [{ name: "Plátano", quantity: "2 un." }, { name: "Pera", quantity: "2 un." }, { name: "Manzana", quantity: "2 un." }, { name: "Fruta variada", quantity: "2-3 un." }] },
      { category: "Cereales y Granos", items: [{ name: "Pan integral", quantity: "1 barra" }, { name: "Avena", quantity: "300 g" }, { name: "Pasta", quantity: "1 taza" }, { name: "Arroz integral", quantity: "1 taza" }, { name: "Quinoa", quantity: "1 taza" }] },
      { category: "Lácteos y Otros", items: [{ name: "Yogur natural", quantity: "600 g" }, { name: "Queso fresco/rallado", quantity: "200 g" }, { name: "Hummus", quantity: "1 porción" }] }
    ]
  },
  {
    weekNumber: 15,
    stageTitle: "Etapa 3: 12 a 18 meses",
    weekTitle: "Semana 15: Sabores que abrazan",
    days: [
      { dayName: "Lunes", breakfast: "Tostadas integrales con queso fresco", lunch: "Hamburguesitas de lenteja y arroz", dinner: "Crema de zanahoria con naranja", snack: "Fruta blanda" },
      { dayName: "Martes", breakfast: "Yogur con plátano", lunch: "Pollo guisado suave con papa", dinner: "Puré de brócoli con queso", snack: "Galleta de avena" },
      { dayName: "Miércoles", breakfast: "Avena con manzana", lunch: "Pescado con batata", dinner: "Verduras al vapor con pasta", snack: "Compota" },
      { dayName: "Jueves", breakfast: "Tortilla de patata y calabacín", lunch: "Quinoa con calabaza y queso", dinner: "Puré de camote con pollo", snack: "Yogur" },
      { dayName: "Viernes", breakfast: "Muffin de zanahoria", lunch: "Estofado de ternera con verduras", dinner: "Puré de calabacín con papa", snack: "Fruta" },
      { dayName: "Sábado", breakfast: "Crepe integral con puré de pera", lunch: "Pasta corta con tomate y verduras", dinner: "Sopa de verduras", snack: "Yogur" },
      { dayName: "Domingo", breakfast: "Pan pita con hummus", lunch: "Pollo al horno con batata", dinner: "Puré de zanahoria", snack: "Fruta" }
    ],
    shoppingList: [
      { category: "Verduras", items: [{ name: "Calabaza", quantity: "1 un." }, { name: "Zanahoria", quantity: "4 un." }, { name: "Papa", quantity: "3 un." }, { name: "Batata/Camote", quantity: "3 un." }, { name: "Calabacín", quantity: "2 un." }, { name: "Brócoli", quantity: "1 un." }, { name: "Tomate", quantity: "2 un." }] },
      { category: "Proteínas", items: [{ name: "Pollo", quantity: "350 g" }, { name: "Ternera magra", quantity: "250 g" }, { name: "Pescado blanco", quantity: "180 g" }, { name: "Lentejas cocidas", quantity: "1 taza" }] },
      { category: "Frutas", items: [{ name: "Plátano", quantity: "2 un." }, { name: "Manzana", quantity: "2 un." }, { name: "Pera", quantity: "2 un." }, { name: "Naranja", quantity: "1 un." }] },
      { category: "Cereales y Granos", items: [{ name: "Pan integral/pita", quantity: "1 un." }, { name: "Avena", quantity: "300 g" }, { name: "Pasta", quantity: "1 taza" }, { name: "Arroz integral", quantity: "1 taza" }, { name: "Quinoa", quantity: "1 taza" }] },
      { category: "Lácteos y Otros", items: [{ name: "Yogur natural", quantity: "600 g" }, { name: "Queso fresco/rallado", quantity: "200 g" }, { name: "Hummus", quantity: "1 porción" }] }
    ]
  },
  {
    weekNumber: 16,
    stageTitle: "Etapa 4: 18 a 24 meses",
    weekTitle: "Semana 16: Pequeño gourmet",
    days: [
      { dayName: "Lunes", breakfast: "Avena con pera madura", lunch: "Arroz integral con pollo y verduras", dinner: "Crema de calabaza suave", snack: "Fruta picada" },
      { dayName: "Martes", breakfast: "Yogur con granola blanda", lunch: "Guiso de alubias con verduras", dinner: "Puré de batata con queso fresco", snack: "Compota" },
      { dayName: "Miércoles", breakfast: "Tortitas de avena, plátano y arándanos", lunch: "Pescado al vapor con arroz y brócoli", dinner: "Verduras al vapor con pasta", snack: "Yogur" },
      { dayName: "Jueves", breakfast: "Panecillo de calabaza con queso", lunch: "Albóndigas de carne con salsa de tomate", dinner: "Puré de calabacín con papa", snack: "Fruta" },
      { dayName: "Viernes", breakfast: "Crepe integral con puré de manzana", lunch: "Quinoa con verduras y queso", dinner: "Puré de zanahoria con pollo", snack: "Galletas de avena" },
      { dayName: "Sábado", breakfast: "Pan integral con hummus", lunch: "Croquetas de brócoli al horno", dinner: "Sopa de verduras", snack: "Fruta" },
      { dayName: "Domingo", breakfast: "Muffin de espinaca y queso", lunch: "Pollo con batata al horno", dinner: "Puré de garbanzos con camote", snack: "Yogur" }
    ],
    shoppingList: [
      { category: "Verduras", items: [{ name: "Calabaza", quantity: "1 un." }, { name: "Zanahoria", quantity: "3 un." }, { name: "Batata/Camote", quantity: "2 un." }, { name: "Papa", quantity: "2 un." }, { name: "Calabacín", quantity: "2 un." }, { name: "Brócoli", quantity: "1 un." }, { name: "Espinaca", quantity: "100 g" }, { name: "Tomate", quantity: "2 un." }] },
      { category: "Proteínas", items: [{ name: "Pollo", quantity: "350 g" }, { name: "Carne magra", quantity: "200 g" }, { name: "Pescado blanco", quantity: "180 g" }, { name: "Garbanzos", quantity: "1 taza" }, { name: "Alubias", quantity: "1 taza" }] },
      { category: "Frutas", items: [{ name: "Pera", quantity: "2 un." }, { name: "Manzana", quantity: "2 un." }, { name: "Plátano", quantity: "2 un." }, { name: "Arándanos", quantity: "80 g" }] },
      { category: "Cereales y Granos", items: [{ name: "Pan integral", quantity: "1 un." }, { name: "Avena", quantity: "300 g" }, { name: "Pasta", quantity: "1 taza" }, { name: "Arroz integral", quantity: "1 taza" }, { name: "Quinoa", quantity: "1 taza" }, { name: "Granola casera", quantity: "1 taza" }] },
      { category: "Lácteos y Otros", items: [{ name: "Yogur natural", quantity: "600 g" }, { name: "Queso fresco/rallado", quantity: "200 g" }, { name: "Hummus", quantity: "1 porción" }] }
    ]
  },
  {
    weekNumber: 17,
    stageTitle: "Etapa 4: 18 a 24 meses",
    weekTitle: "Semana 17: Mini explorador",
    days: [
      { dayName: "Lunes", breakfast: "Yogur con fruta picada", lunch: "Pasta corta con salsa de calabacín", dinner: "Puré de brócoli con papa", snack: "Compota" },
      { dayName: "Martes", breakfast: "Avena con manzana y canela", lunch: "Quinoa con calabaza y pollo", dinner: "Sopa de verduras con pan blando", snack: "Fruta" },
      { dayName: "Miércoles", breakfast: "Tostadas integrales con aguacate", lunch: "Estofado de ternera con papa", dinner: "Puré de batata", snack: "Yogur" },
      { dayName: "Jueves", breakfast: "Tortilla francesa con verduras finas", lunch: "Pescado con arroz y guisantes", dinner: "Puré de calabacín", snack: "Galleta de avena" },
      { dayName: "Viernes", breakfast: "Crepe integral con puré de pera", lunch: "Hamburguesitas de lenteja con arroz", dinner: "Verduras al vapor con pasta", snack: "Fruta" },
      { dayName: "Sábado", breakfast: "Panecillo de calabaza con queso", lunch: "Croquetas de brócoli al horno", dinner: "Puré de zanahoria con pollo", snack: "Yogur" },
      { dayName: "Domingo", breakfast: "Muffin de zanahoria y manzana", lunch: "Pollo al horno con batata", dinner: "Puré de calabaza con garbanzos", snack: "Fruta" }
    ],
    shoppingList: [
      { category: "Verduras", items: [{ name: "Calabaza", quantity: "1 un." }, { name: "Zanahoria", quantity: "3 un." }, { name: "Batata/Camote", quantity: "2 un." }, { name: "Papa", quantity: "2 un." }, { name: "Calabacín", quantity: "2 un." }, { name: "Brócoli", quantity: "1 un." }, { name: "Guisantes", quantity: "1 taza" }, { name: "Tomate", quantity: "2 un." }] },
      { category: "Proteínas", items: [{ name: "Pollo", quantity: "350 g" }, { name: "Ternera magra", quantity: "250 g" }, { name: "Pescado blanco", quantity: "180 g" }, { name: "Lentejas cocidas", quantity: "1 taza" }, { name: "Garbanzos", quantity: "1 taza" }] },
      { category: "Frutas", items: [{ name: "Manzana", quantity: "2 un." }, { name: "Pera", quantity: "2 un." }, { name: "Plátano", quantity: "2 un." }, { name: "Aguacate", quantity: "1 un." }] },
      { category: "Cereales y Granos", items: [{ name: "Pan integral", quantity: "1 barra" }, { name: "Avena", quantity: "300 g" }, { name: "Pasta", quantity: "1 taza" }, { name: "Arroz integral", quantity: "1 taza" }, { name: "Quinoa", quantity: "1 taza" }] },
      { category: "Lácteos y Otros", items: [{ name: "Yogur natural", quantity: "600 g" }, { name: "Queso fresco/rallado", quantity: "200 g" }] }
    ]
  },
  {
    weekNumber: 18,
    stageTitle: "Etapa 4: 18 a 24 meses",
    weekTitle: "Semana 18: Descubre el sabor",
    days: [
      { dayName: "Lunes", breakfast: "Avena con mango", lunch: "Risotto de champiñones y pollo", dinner: "Puré de camote con espinaca", snack: "Compota de manzana y pera" },
      { dayName: "Martes", breakfast: "Yogur con granola", lunch: "Quinoa con calabaza y queso", dinner: "Sopa de verduras", snack: "Fruta" },
      { dayName: "Miércoles", breakfast: "Tortitas de avena y plátano", lunch: "Pescado con arroz y zanahoria", dinner: "Puré de brócoli con papa", snack: "Yogur" },
      { dayName: "Jueves", breakfast: "Pan con hummus", lunch: "Estofado de ternera con verduras", dinner: "Puré de calabacín con papa", snack: "Galleta de avena" },
      { dayName: "Viernes", breakfast: "Crepe integral con puré de manzana", lunch: "Hamburguesitas de lenteja y arroz", dinner: "Verduras al vapor con pasta", snack: "Fruta" },
      { dayName: "Sábado", breakfast: "Muffin de espinaca y queso", lunch: "Pollo al horno con batata", dinner: "Puré de calabaza con garbanzos", snack: "Yogur" },
      { dayName: "Domingo", breakfast: "Panecillo de calabaza", lunch: "Croquetas de brócoli y queso", dinner: "Puré de zanahoria con pollo", snack: "Compota" }
    ],
    shoppingList: [
      { category: "Verduras", items: [{ name: "Calabaza", quantity: "1 un." }, { name: "Zanahoria", quantity: "3 un." }, { name: "Batata/Camote", quantity: "2 un." }, { name: "Papa", quantity: "2 un." }, { name: "Calabacín", quantity: "2 un." }, { name: "Brócoli", quantity: "1 un." }, { name: "Champiñones", quantity: "100 g" }, { name: "Espinaca", quantity: "100 g" }] },
      { category: "Proteínas", items: [{ name: "Pollo", quantity: "350 g" }, { name: "Ternera magra", quantity: "250 g" }, { name: "Pescado blanco", quantity: "180 g" }, { name: "Lentejas cocidas", quantity: "1 taza" }, { name: "Garbanzos", quantity: "1 taza" }] },
      { category: "Frutas", items: [{ name: "Pera", quantity: "2 un." }, { name: "Manzana", quantity: "2 un." }, { name: "Plátano", quantity: "2 un." }, { name: "Mango", quantity: "1 un." }] },
      { category: "Cereales y Granos", items: [{ name: "Pan integral", quantity: "1 un." }, { name: "Avena", quantity: "300 g" }, { name: "Pasta", quantity: "1 taza" }, { name: "Arroz", quantity: "1 taza" }, { name: "Quinoa", quantity: "1 taza" }, { name: "Granola casera", quantity: "1 taza" }] },
      { category: "Lácteos y Otros", items: [{ name: "Yogur natural", quantity: "600 g" }, { name: "Queso fresco/rallado", quantity: "200 g" }, { name: "Hummus", quantity: "1 porción" }] }
    ]
  },
  {
    weekNumber: 19,
    stageTitle: "Etapa 4: 18 a 24 meses",
    weekTitle: "Semana 19: Aventuritas en la mesa",
    days: [
      { dayName: "Lunes", breakfast: "Pan integral con hummus", lunch: "Pollo al horno con batata", dinner: "Sopa de fideos con calabaza", snack: "Fruta" },
      { dayName: "Martes", breakfast: "Avena con pera", lunch: "Quinoa con calabaza y queso", dinner: "Puré de brócoli con papa", snack: "Yogur" },
      { dayName: "Miércoles", breakfast: "Yogur con plátano", lunch: "Pescado con arroz y guisantes", dinner: "Verduras al vapor con pasta", snack: "Compota" },
      { dayName: "Jueves", breakfast: "Tortilla francesa con champiñones", lunch: "Hamburguesitas de lenteja y arroz", dinner: "Crema de zanahoria", snack: "Fruta" },
      { dayName: "Viernes", breakfast: "Muffin de zanahoria", lunch: "Estofado de ternera con verduras", dinner: "Puré de batata", snack: "Yogur" },
      { dayName: "Sábado", breakfast: "Crepe integral con puré de fruta", lunch: "Croquetas de brócoli y queso", dinner: "Puré de calabacín con papa", snack: "Fruta" },
      { dayName: "Domingo", breakfast: "Panecillo de calabaza", lunch: "Arroz con pollo y verduras", dinner: "Puré de camote con garbanzos", snack: "Compota" }
    ],
    shoppingList: [
      { category: "Verduras", items: [{ name: "Calabaza", quantity: "1 un." }, { name: "Zanahoria", quantity: "3 un." }, { name: "Batata/Camote", quantity: "2 un." }, { name: "Papa", quantity: "2 un." }, { name: "Calabacín", quantity: "2 un." }, { name: "Brócoli", quantity: "1 un." }, { name: "Champiñones", quantity: "100 g" }, { name: "Guisantes", quantity: "1 taza" }, { name: "Pepino", quantity: "1 un." }, { name: "Tomate", quantity: "2 un." }] },
      { category: "Proteínas", items: [{ name: "Pollo", quantity: "350 g" }, { name: "Ternera magra", quantity: "250 g" }, { name: "Pescado blanco", quantity: "180 g" }, { name: "Lentejas", quantity: "1 taza" }, { name: "Garbanzos", quantity: "1 taza" }] },
      { category: "Frutas", items: [{ name: "Pera", quantity: "2 un." }, { name: "Manzana", quantity: "2 un." }, { name: "Plátano", quantity: "2 un." }, { name: "Fruta variada", quantity: "2-3 un." }] },
      { category: "Cereales y Granos", items: [{ name: "Pan integral", quantity: "1 barra" }, { name: "Avena", quantity: "300 g" }, { name: "Pasta", quantity: "1 taza" }, { name: "Arroz", quantity: "1 taza" }, { name: "Quinoa", quantity: "1 taza" }, { name: "Fideos finos", quantity: "1 taza" }] },
      { category: "Lácteos y Otros", items: [{ name: "Yogur natural", quantity: "600 g" }, { name: "Queso fresco/rallado", quantity: "200 g" }] }
    ]
  },
  {
    weekNumber: 20,
    stageTitle: "Etapa 4: 18 a 24 meses",
    weekTitle: "Semana 20: Pequeño chef feliz",
    days: [
      { dayName: "Lunes", breakfast: "Crepe integral con puré de fruta", lunch: "Empanaditas de pollo y espinaca", dinner: "Verduras al vapor con pasta", snack: "Yogur con compota" },
      { dayName: "Martes", breakfast: "Avena con manzana", lunch: "Quinoa con verduras y queso", dinner: "Puré de batata con pollo", snack: "Fruta" },
      { dayName: "Miércoles", breakfast: "Pan integral con queso fresco", lunch: "Pescado con arroz y zanahoria", dinner: "Crema de calabaza", snack: "Galleta de avena" },
      { dayName: "Jueves", breakfast: "Yogur con granola", lunch: "Albóndigas de carne magra con tomate", dinner: "Puré de brócoli con papa", snack: "Fruta" },
      { dayName: "Viernes", breakfast: "Tortitas de avena y plátano", lunch: "Guiso de alubias con verduras", dinner: "Sopa de verduras", snack: "Compota" },
      { dayName: "Sábado", breakfast: "Muffin de espinaca y queso", lunch: "Pasta corta con salsa de calabacín", dinner: "Puré de zanahoria con queso", snack: "Yogur" },
      { dayName: "Domingo", breakfast: "Pan pita con hummus", lunch: "Pollo al horno con batata", dinner: "Puré de calabacín con papa", snack: "Fruta" }
    ],
    shoppingList: [
      { category: "Verduras", items: [{ name: "Calabaza", quantity: "1 un." }, { name: "Zanahoria", quantity: "3 un." }, { name: "Batata/Camote", quantity: "3 un." }, { name: "Papa", quantity: "2 un." }, { name: "Calabacín", quantity: "2 un." }, { name: "Brócoli", quantity: "1 un." }, { name: "Espinaca", quantity: "100 g" }, { name: "Tomate", quantity: "2 un." }] },
      { category: "Proteínas", items: [{ name: "Pollo", quantity: "350 g" }, { name: "Carne magra", quantity: "200 g" }, { name: "Pescado blanco", quantity: "180 g" }, { name: "Alubias", quantity: "1 taza" }] },
      { category: "Frutas", items: [{ name: "Manzana", quantity: "2 un." }, { name: "Plátano", quantity: "2 un." }, { name: "Fruta variada", quantity: "2-3 un." }] },
      { category: "Cereales y Granos", items: [{ name: "Pan integral/pita", quantity: "1 un." }, { name: "Avena", quantity: "300 g" }, { name: "Pasta", quantity: "1 taza" }, { name: "Arroz", quantity: "1 taza" }, { name: "Quinoa", quantity: "1 taza" }, { name: "Granola casera", quantity: "1 taza" }] },
      { category: "Lácteos y Otros", items: [{ name: "Yogur natural", quantity: "600 g" }, { name: "Queso fresco/rallado", quantity: "200 g" }] }
    ]
  },
  {
    weekNumber: 21,
    stageTitle: "Etapa 4: 18 a 24 meses",
    weekTitle: "Semana 21: Mini chef curioso",
    days: [
      { dayName: "Lunes", breakfast: "Muffins de avena y plátano", lunch: "Quinoa con calabaza y queso fresco", dinner: "Puré de lentejas con batata", snack: "Chips blandos de camote" },
      { dayName: "Martes", breakfast: "Yogur con fruta", lunch: "Arroz con pollo y verduras", dinner: "Crema de zanahoria suave", snack: "Galletas de avena" },
      { dayName: "Miércoles", breakfast: "Pan integral con aguacate", lunch: "Pescado al vapor con arroz y brócoli", dinner: "Verduras al vapor con pasta", snack: "Compota casera" },
      { dayName: "Jueves", breakfast: "Avena con pera madura", lunch: "Hamburguesitas de lenteja con arroz", dinner: "Puré de calabacín con papa", snack: "Fruta" },
      { dayName: "Viernes", breakfast: "Crepe integral con puré de manzana", lunch: "Guiso de alubias con verduras", dinner: "Puré de brócoli con papa", snack: "Yogur" },
      { dayName: "Sábado", breakfast: "Muffin de zanahoria y manzana", lunch: "Mini lasaña de verduras y carne", dinner: "Puré de batata con queso", snack: "Fruta" },
      { dayName: "Domingo", breakfast: "Yogur con granola casera", lunch: "Pollo al horno con batata", dinner: "Puré de calabaza con garbanzos", snack: "Fruta variada" }
    ],
    shoppingList: [
      { category: "Verduras", items: [{ name: "Calabaza", quantity: "1 un." }, { name: "Zanahoria", quantity: "3 un." }, { name: "Batata/Camote", quantity: "2 un." }, { name: "Papa", quantity: "2 un." }, { name: "Calabacín", quantity: "2 un." }, { name: "Brócoli", quantity: "1 un." }, { name: "Camote adicional", quantity: "2 un." }, { name: "Tomate", quantity: "2 un." }] },
      { category: "Proteínas", items: [{ name: "Pollo", quantity: "350 g" }, { name: "Carne magra", quantity: "200 g" }, { name: "Pescado blanco", quantity: "180 g" }, { name: "Lentejas", quantity: "1 taza" }, { name: "Garbanzos", quantity: "1 taza" }, { name: "Alubias", quantity: "1 taza" }] },
      { category: "Frutas", items: [{ name: "Plátano", quantity: "2 un." }, { name: "Manzana", quantity: "2 un." }, { name: "Pera", quantity: "2 un." }, { name: "Fruta variada", quantity: "2-3 un." }] },
      { category: "Cereales y Granos", items: [{ name: "Pan integral", quantity: "1 un." }, { name: "Avena", quantity: "300 g" }, { name: "Pasta", quantity: "1 taza" }, { name: "Arroz", quantity: "1 taza" }, { name: "Quinoa", quantity: "1 taza" }, { name: "Granola casera", quantity: "1 taza" }] },
      { category: "Lácteos y Otros", items: [{ name: "Yogur natural", quantity: "600 g" }, { name: "Queso fresco/rallado", quantity: "200 g" }] }
    ]
  },
  {
    weekNumber: 22,
    stageTitle: "Etapa 4: 18 a 24 meses",
    weekTitle: "Semana 22: Pequeños grandes bocados",
    days: [
      { dayName: "Lunes", breakfast: "Yogur con granola casera", lunch: "Albóndigas de pollo con arroz", dinner: "Puré de zanahoria y brócoli", snack: "Compota" },
      { dayName: "Martes", breakfast: "Avena con manzana y canela", lunch: "Pasta corta con salsa de calabacín", dinner: "Sopa de verduras", snack: "Fruta" },
      { dayName: "Miércoles", breakfast: "Tostadas integrales con queso fresco", lunch: "Pescado con arroz y guisantes", dinner: "Puré de batata", snack: "Yogur" },
      { dayName: "Jueves", breakfast: "Crepe integral con puré de pera", lunch: "Quinoa con calabaza y queso", dinner: "Verduras al vapor con pasta", snack: "Galletas de avena" },
      { dayName: "Viernes", breakfast: "Muffin de espinaca y queso", lunch: "Pollo con batata al horno", dinner: "Puré de calabacín con papa", snack: "Fruta" },
      { dayName: "Sábado", breakfast: "Pan pita con hummus", lunch: "Estofado de ternera con verduras", dinner: "Crema de zanahoria", snack: "Yogur" },
      { dayName: "Domingo", breakfast: "Tortitas de avena y plátano", lunch: "Croquetas de brócoli y queso", dinner: "Puré de camote con garbanzo", snack: "Compota" }
    ],
    shoppingList: [
      { category: "Verduras", items: [{ name: "Calabaza", quantity: "1 un." }, { name: "Zanahoria", quantity: "3 un." }, { name: "Batata/Camote", quantity: "2 un." }, { name: "Papa", quantity: "2 un." }, { name: "Calabacín", quantity: "2 un." }, { name: "Brócoli", quantity: "1 un." }, { name: "Espinaca", quantity: "100 g" }, { name: "Guisantes", quantity: "1 taza" }, { name: "Tomate", quantity: "2 un." }] },
      { category: "Proteínas", items: [{ name: "Pollo", quantity: "350 g" }, { name: "Ternera magra", quantity: "250 g" }, { name: "Pescado", quantity: "180 g" }, { name: "Garbanzos", quantity: "1 taza" }] },
      { category: "Frutas", items: [{ name: "Manzana", quantity: "2 un." }, { name: "Pera", quantity: "2 un." }, { name: "Plátano", quantity: "2 un." }, { name: "Fruta variada", quantity: "2-3 un." }] },
      { category: "Cereales y Granos", items: [{ name: "Pan integral/pita", quantity: "1 un." }, { name: "Avena", quantity: "300 g" }, { name: "Pasta", quantity: "1 taza" }, { name: "Arroz", quantity: "1 taza" }, { name: "Quinoa", quantity: "1 taza" }, { name: "Granola casera", quantity: "1 taza" }] },
      { category: "Lácteos y Otros", items: [{ name: "Yogur natural", quantity: "600 g" }, { name: "Queso fresco/rallado", quantity: "200 g" }, { name: "Hummus", quantity: "1 porción" }] }
    ]
  },
  {
    weekNumber: 23,
    stageTitle: "Etapa 4: 18 a 24 meses",
    weekTitle: "Semana 23: Sabores que enamoran",
    days: [
      { dayName: "Lunes", breakfast: "Arepitas de maíz con aguacate", lunch: "Estofado de ternera con papas", dinner: "Puré de calabacín con queso", snack: "Bolitas de avena" },
      { dayName: "Martes", breakfast: "Yogur con fruta picada", lunch: "Arroz con pollo y zanahoria", dinner: "Sopa de verduras", snack: "Galleta de avena" },
      { dayName: "Miércoles", breakfast: "Avena con manzana", lunch: "Pescado al horno con batata", dinner: "Verduras al vapor con pasta", snack: "Compota" },
      { dayName: "Jueves", breakfast: "Pan integral con hummus", lunch: "Quinoa con calabaza y queso", dinner: "Puré de brócoli con papa", snack: "Fruta" },
      { dayName: "Viernes", breakfast: "Crepe integral con puré de pera", lunch: "Hamburguesitas de lenteja con arroz", dinner: "Crema de zanahoria", snack: "Yogur" },
      { dayName: "Sábado", breakfast: "Muffin de zanahoria y manzana", lunch: "Croquetas de brócoli y queso", dinner: "Puré de camote con pollo", snack: "Fruta" },
      { dayName: "Domingo", breakfast: "Panecillo de calabaza", lunch: "Pollo al horno con batata", dinner: "Puré de calabaza con garbanzos", snack: "Compota" }
    ],
    shoppingList: [
      { category: "Verduras", items: [{ name: "Calabaza", quantity: "1 un." }, { name: "Zanahoria", quantity: "3 un." }, { name: "Batata/Camote", quantity: "3 un." }, { name: "Papa", quantity: "2 un." }, { name: "Calabacín", quantity: "2 un." }, { name: "Brócoli", quantity: "1 un." }, { name: "Tomate", quantity: "2 un." }, { name: "Aguacate", quantity: "1 un." }] },
      { category: "Proteínas", items: [{ name: "Pollo", quantity: "350 g" }, { name: "Ternera magra", quantity: "250 g" }, { name: "Pescado", quantity: "180 g" }, { name: "Lentejas", quantity: "1 taza" }, { name: "Garbanzos", quantity: "1 taza" }] },
      { category: "Frutas", items: [{ name: "Manzana", quantity: "2 un." }, { name: "Pera", quantity: "2 un." }, { name: "Fruta variada", quantity: "2-3 un." }] },
      { category: "Cereales y Granos", items: [{ name: "Harina de maíz", quantity: "1 taza" }, { name: "Pan integral", quantity: "1 un." }, { name: "Avena", quantity: "300 g" }, { name: "Pasta", quantity: "1 taza" }, { name: "Arroz", quantity: "1 taza" }, { name: "Quinoa", quantity: "1 taza" }] },
      { category: "Lácteos y Otros", items: [{ name: "Yogur natural", quantity: "600 g" }, { name: "Queso fresco/rallado", quantity: "200 g" }, { name: "Hummus", quantity: "1 porción" }] }
    ]
  },
  {
    weekNumber: 24,
    stageTitle: "Etapa 4: 18 a 24 meses",
    weekTitle: "Semana 24: Graduación de sabores",
    days: [
      { dayName: "Lunes", breakfast: "Batido de mango, yogur y avena", lunch: "Mini lasaña de verduras y carne", dinner: "Crema de zanahoria con naranja", snack: "Galletas de avena" },
      { dayName: "Martes", breakfast: "Pan integral con queso fresco", lunch: "Quinoa con verduras y queso", dinner: "Puré de batata con pollo", snack: "Fruta" },
      { dayName: "Miércoles", breakfast: "Avena con pera y canela", lunch: "Pescado con arroz y brócoli", dinner: "Verduras al vapor con pasta", snack: "Yogur" },
      { dayName: "Jueves", breakfast: "Yogur con granola", lunch: "Hamburguesitas de lenteja con arroz", dinner: "Puré de calabacín con papa", snack: "Compota" },
      { dayName: "Viernes", breakfast: "Tortitas de avena y plátano", lunch: "Estofado de ternera con verduras", dinner: "Puré de brócoli con papa", snack: "Fruta" },
      { dayName: "Sábado", breakfast: "Crepe integral con puré de manzana", lunch: "Croquetas de brócoli y queso", dinner: "Puré de zanahoria con queso", snack: "Yogur" },
      { dayName: "Domingo", breakfast: "Pan pita con hummus", lunch: "Pollo al horno con batata", dinner: "Puré de calabaza con garbanzos", snack: "Fruta" }
    ],
    shoppingList: [
      { category: "Verduras", items: [{ name: "Calabaza", quantity: "1 un." }, { name: "Zanahoria", quantity: "3 un." }, { name: "Batata/Camote", quantity: "3 un." }, { name: "Papa", quantity: "2 un." }, { name: "Calabacín", quantity: "2 un." }, { name: "Brócoli", quantity: "1 un." }, { name: "Mango", quantity: "1 un." }, { name: "Naranja", quantity: "1 un." }, { name: "Tomate", quantity: "2 un." }] },
      { category: "Proteínas", items: [{ name: "Pollo", quantity: "350 g" }, { name: "Ternera magra", quantity: "250 g" }, { name: "Pescado", quantity: "180 g" }, { name: "Lentejas", quantity: "1 taza" }, { name: "Garbanzos", quantity: "1 taza" }] },
      { category: "Frutas", items: [{ name: "Manzana", quantity: "2 un." }, { name: "Pera", quantity: "2 un." }, { name: "Plátano", quantity: "2 un." }, { name: "Fruta variada", quantity: "2-3 un." }] },
      { category: "Cereales y Granos", items: [{ name: "Pan integral/pita", quantity: "1 un." }, { name: "Avena", quantity: "300 g" }, { name: "Pasta", quantity: "1 taza" }, { name: "Arroz", quantity: "1 taza" }, { name: "Quinoa", quantity: "1 taza" }, { name: "Granola casera", quantity: "1 taza" }] },
      { category: "Lácteos y Otros", items: [{ name: "Yogur natural", quantity: "600 g" }, { name: "Queso fresco/rallado", quantity: "200 g" }, { name: "Hummus", quantity: "1 porción" }] }
    ]
  }
];
