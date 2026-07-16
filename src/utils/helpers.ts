/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Recipe, MealPlan, ShoppingItem, DailyMenu } from "../types";

export function calculateAgeInMonths(birthDateStr: string): { months: number; days: number; text: string } {
  if (!birthDateStr) return { months: 0, days: 0, text: "0 meses" };
  const birthDate = new Date(birthDateStr);
  const now = new Date();

  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    // Get days of previous month
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalMonths = years * 12 + months;
  
  let text = "";
  if (totalMonths === 0) {
    text = `${days} ${days === 1 ? "día" : "días"}`;
  } else {
    text = `${totalMonths} ${totalMonths === 1 ? "mes" : "meses"}${days > 0 ? ` y ${days} ${days === 1 ? "día" : "días"}` : ""}`;
  }

  return { months: totalMonths, days, text };
}

export function getSafeRecipesForAge(recipes: Recipe[], months: number): Recipe[] {
  return recipes.filter(recipe => {
    const ageStr = recipe.ageRange.toLowerCase();
    let minAge = 6; // default

    if (ageStr.includes("6")) minAge = 6;
    else if (ageStr.includes("7")) minAge = 7;
    else if (ageStr.includes("8")) minAge = 8;
    else if (ageStr.includes("9")) minAge = 9;
    else if (ageStr.includes("10")) minAge = 10;
    else if (ageStr.includes("11")) minAge = 11;
    else if (ageStr.includes("12") || ageStr.includes("18")) minAge = 12;
    else if (ageStr.includes("2")) minAge = 24;

    return months >= minAge;
  });
}

/**
 * Automatically generates a balanced weekly menu using only available recipes.
 * Balances vegetables, fruits, and proteins across meals.
 */
export function generateBalancedWeeklyMenu(recipes: Recipe[], babyAgeMonths: number): MealPlan {
  const plan: MealPlan = {};
  const daysOfWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo"
  ];

  // Brackets:
  // 1. Lactancia exclusiva (0 a 5 meses)
  if (babyAgeMonths < 6) {
    daysOfWeek.forEach(day => {
      plan[day] = {
        breakfast: { recipeId: null },
        morningSnack: { recipeId: null },
        lunch: { recipeId: null },
        afternoonSnack: { recipeId: null },
        dinner: { recipeId: null }
      };
    });
    return plan;
  }

  // 2. Complementaria Inicial (6 a 8 meses)
  if (babyAgeMonths >= 6 && babyAgeMonths < 9) {
    const stageMenu: { [day: string]: { [slot: string]: string | null } } = {
      "Lunes": {
        breakfast: "r_papilla_platano_cremoso",
        morningSnack: null,
        lunch: "r_pure_calabaza_vapor",
        afternoonSnack: "r_papilla_camote_calabacin",
        dinner: "r_papilla_pera_avena"
      },
      "Martes": {
        breakfast: "r_papilla_pera_avena",
        morningSnack: null,
        lunch: "r_pure_zanahoria_lentejas",
        afternoonSnack: null,
        dinner: "r_pure_calabaza_vapor"
      },
      "Miércoles": {
        breakfast: "r_papilla_platano_cremoso",
        morningSnack: null,
        lunch: "r_papilla_camote_calabacin",
        afternoonSnack: null,
        dinner: "r_pure_zanahoria_lentejas"
      },
      "Jueves": {
        breakfast: "r_papilla_pera_avena",
        morningSnack: null,
        lunch: "r_pure_calabaza_vapor",
        afternoonSnack: null,
        dinner: "r_papilla_camote_calabacin"
      },
      "Viernes": {
        breakfast: "r_papilla_platano_cremoso",
        morningSnack: null,
        lunch: "r_pure_zanahoria_lentejas",
        afternoonSnack: null,
        dinner: "r_pure_calabaza_vapor"
      },
      "Sábado": {
        breakfast: "r_papilla_pera_avena",
        morningSnack: null,
        lunch: "r_papilla_camote_calabacin",
        afternoonSnack: null,
        dinner: "r_pure_zanahoria_lentejas"
      },
      "Domingo": {
        breakfast: "r_papilla_platano_cremoso",
        morningSnack: null,
        lunch: "r_pure_calabaza_vapor",
        afternoonSnack: null,
        dinner: "r_papilla_pera_avena"
      }
    };

    daysOfWeek.forEach(day => {
      const menu = stageMenu[day];
      plan[day] = {
        breakfast: { recipeId: menu.breakfast },
        morningSnack: { recipeId: menu.morningSnack },
        lunch: { recipeId: menu.lunch },
        afternoonSnack: { recipeId: menu.afternoonSnack },
        dinner: { recipeId: menu.dinner }
      };
    });
    return plan;
  }

  // 3. Alimentación de Transición (9 a 11 meses)
  if (babyAgeMonths >= 9 && babyAgeMonths < 12) {
    const stageMenu: { [day: string]: { [slot: string]: string | null } } = {
      "Lunes": {
        breakfast: "r_avena_manzana",
        morningSnack: "r_bastones_camote",
        lunch: "r_arroz_pollo_zanahoria",
        afternoonSnack: "r_bolitas_platano_avena",
        dinner: "r_crema_calabacin"
      },
      "Martes": {
        breakfast: "r_tortilla_espinaca",
        morningSnack: "r_bolitas_platano_avena",
        lunch: "r_pescado_camote",
        afternoonSnack: "r_bastones_camote",
        dinner: "r_lentejas_calabacin"
      },
      "Miércoles": {
        breakfast: "r_pan_aguacate_machacado",
        morningSnack: "r_bastones_camote",
        lunch: "r_arroz_pollo_zanahoria",
        afternoonSnack: "r_bolitas_platano_avena",
        dinner: "r_crema_calabacin"
      },
      "Jueves": {
        breakfast: "r_mini_pancakes_platano_avena",
        morningSnack: "r_bolitas_platano_avena",
        lunch: "r_pescado_camote",
        afternoonSnack: "r_bastones_camote",
        dinner: "r_lentejas_calabacin"
      },
      "Viernes": {
        breakfast: "r_avena_manzana",
        morningSnack: "r_bastones_camote",
        lunch: "r_arroz_pollo_zanahoria",
        afternoonSnack: "r_bolitas_platano_avena",
        dinner: "r_crema_calabacin"
      },
      "Sábado": {
        breakfast: "r_tortilla_espinaca",
        morningSnack: "r_bolitas_platano_avena",
        lunch: "r_pescado_camote",
        afternoonSnack: "r_bastones_camote",
        dinner: "r_lentejas_calabacin"
      },
      "Domingo": {
        breakfast: "r_pan_aguacate_machacado",
        morningSnack: "r_bastones_camote",
        lunch: "r_arroz_pollo_zanahoria",
        afternoonSnack: "r_bolitas_platano_avena",
        dinner: "r_crema_calabacin"
      }
    };

    daysOfWeek.forEach(day => {
      const menu = stageMenu[day];
      plan[day] = {
        breakfast: { recipeId: menu.breakfast },
        morningSnack: { recipeId: menu.morningSnack },
        lunch: { recipeId: menu.lunch },
        afternoonSnack: { recipeId: menu.afternoonSnack },
        dinner: { recipeId: menu.dinner }
      };
    });
    return plan;
  }

  // 4. Mayor a 1 año (12 a 24 meses+ / Lonchera y Sólidos)
  // Maps exactly to Page 3 ("Tabla Alimentación Semanal")
  const stageMenu: { [day: string]: { [slot: string]: string | null } } = {
    "Lunes": {
      breakfast: "r_tortitas_avena_arandanos",
      morningSnack: "r_palitos_pepino_zanahoria",
      lunch: "r_arroz_integral_pollo_brocoli",
      afternoonSnack: "r_palitos_pepino_zanahoria",
      dinner: "r_espaguetis_tomate_queso"
    },
    "Martes": {
      breakfast: "r_mini_pancakes_manzana",
      morningSnack: "r_mini_muffins_frutos_rojos",
      lunch: "r_estofado_ternera",
      afternoonSnack: "r_mini_muffins_frutos_rojos",
      dinner: "r_pure_calabaza_garbanzos"
    },
    "Miércoles": {
      breakfast: "r_mini_muffins_frutos_rojos",
      morningSnack: "r_palitos_pepino_zanahoria",
      lunch: "r_filetitos_pescado_patata",
      afternoonSnack: "r_palitos_pepino_zanahoria",
      dinner: "r_croquetas_brocoli_queso"
    },
    "Jueves": {
      breakfast: "r_tortitas_avena_arandanos",
      morningSnack: "r_palitos_pepino_zanahoria",
      lunch: "r_mini_albondigas_pollo",
      afternoonSnack: "r_palitos_pepino_zanahoria",
      dinner: "r_tortilla_patata_espinacas"
    },
    "Viernes": {
      breakfast: "r_pan_aguacate_queso",
      morningSnack: "r_chips_camote",
      lunch: "r_estofado_ternera",
      afternoonSnack: "r_chips_camote",
      dinner: "r_arroz_integral_pollo_brocoli"
    },
    "Sábado": {
      breakfast: "r_mini_pancakes_manzana",
      morningSnack: "r_mini_muffins_frutos_rojos",
      lunch: "r_empanaditas_pollo_espinaca",
      afternoonSnack: "r_mini_muffins_frutos_rojos",
      dinner: "r_pure_calabaza_garbanzos"
    },
    "Domingo": {
      breakfast: "r_pan_hummus_pepino",
      morningSnack: "r_bastones_zanahoria_dip",
      lunch: "r_arroz_integral_pollo_brocoli",
      afternoonSnack: "r_bastones_zanahoria_dip",
      dinner: "r_mini_lasana_verduras"
    }
  };

  daysOfWeek.forEach(day => {
    const menu = stageMenu[day];
    plan[day] = {
      breakfast: { recipeId: menu.breakfast },
      morningSnack: { recipeId: menu.morningSnack },
      lunch: { recipeId: menu.lunch },
      afternoonSnack: { recipeId: menu.afternoonSnack },
      dinner: { recipeId: menu.dinner }
    };
  });

  return plan;
}

/**
 * Compiles a shopping list from the selected weekly meal plan.
 */
export function generateShoppingListFromMenu(menu: MealPlan, recipes: Recipe[]): ShoppingItem[] {
  const ingredientMap: { [name: string]: { category: string; count: number } } = {};
  const recipeMap = new Map(recipes.map(r => [r.id, r]));

  Object.values(menu).forEach((dayMenu: DailyMenu) => {
    const slots = [
      dayMenu.breakfast,
      dayMenu.morningSnack,
      dayMenu.lunch,
      dayMenu.afternoonSnack,
      dayMenu.dinner
    ];

    slots.forEach(slot => {
      if (slot.recipeId) {
        const recipe = recipeMap.get(slot.recipeId);
        if (recipe) {
          recipe.ingredients.forEach(ing => {
            // Standardize ingredient names slightly to avoid massive duplicates
            const cleaned = ing.replace(/^\d+g?\s*(de)?\s*/i, "")
                               .replace(/^\d+[\/\d]*\s*/, "")
                               .replace(/^(un|una|unas|unos)\s+/i, "")
                               .replace(/\(.*\)/g, "")
                               .trim();
            const name = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
            
            // Assign category based on recipe or keywords
            let category = "Otros";
            const lowerName = name.toLowerCase();
            if (lowerName.includes("plátano") || lowerName.includes("manzana") || lowerName.includes("pera") || lowerName.includes("mango") || lowerName.includes("aguacate") || lowerName.includes("fruta") || lowerName.includes("arándano")) {
              category = "Frutas";
            } else if (lowerName.includes("zanahoria") || lowerName.includes("calabaza") || lowerName.includes("patata") || lowerName.includes("boniato") || lowerName.includes("brócoli") || lowerName.includes("puerro") || lowerName.includes("espinaca") || lowerName.includes("calabacín") || lowerName.includes("cebolla")) {
              category = "Verduras";
            } else if (lowerName.includes("pollo") || lowerName.includes("pavo") || lowerName.includes("ternera") || lowerName.includes("merluza") || lowerName.includes("lenguado") || lowerName.includes("huevo") || lowerName.includes("carne") || lowerName.includes("pescado") || lowerName.includes("lenteja")) {
              category = "Carnes/Proteínas";
            } else if (lowerName.includes("leche") || lowerName.includes("queso") || lowerName.includes("yogur") || lowerName.includes("lácteo") || lowerName.includes("requesón")) {
              category = "Lácteos/Sustitutos";
            } else if (lowerName.includes("avena") || lowerName.includes("arroz") || lowerName.includes("trigo") || lowerName.includes("espelta") || lowerName.includes("pan") || lowerName.includes("harina")) {
              category = "Cereales/Granos";
            }

            if (ingredientMap[name]) {
              ingredientMap[name].count += 1;
            } else {
              ingredientMap[name] = { category, count: 1 };
            }
          });
        }
      }
    });
  });

  return Object.entries(ingredientMap).map(([name, info], index) => ({
    id: `sh-${index}`,
    name,
    category: info.category,
    checked: false,
    quantity: info.count > 1 ? `Para ${info.count} comidas` : undefined
  }));
}
