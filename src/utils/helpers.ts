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
  const safeRecipes = getSafeRecipesForAge(recipes, babyAgeMonths);
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

  // Group recipes by category
  const breakfasts = safeRecipes.filter(r => r.category === "desayuno" || r.attributes.includes("sin huevo"));
  const snacks = safeRecipes.filter(r => r.category === "merienda" || r.attributes.includes("sin sal"));
  const lunches = safeRecipes.filter(r => r.category === "almuerzo");
  const dinners = safeRecipes.filter(r => r.category === "cena" || r.category === "almuerzo");

  const getFallbackOrRandom = (list: Recipe[], index: number, lastUsedId?: string | null): string | null => {
    if (list.length === 0) return null;
    const available = list.filter(r => r.id !== lastUsedId);
    const source = available.length > 0 ? available : list;
    return source[(index + Math.floor(Math.random() * source.length)) % source.length].id;
  };

  let lastLunchId: string | null = null;
  let lastDinnerId: string | null = null;

  daysOfWeek.forEach((day, index) => {
    const breakfastId = getFallbackOrRandom(breakfasts, index);
    const morningSnackId = getFallbackOrRandom(snacks, index);
    const lunchId = getFallbackOrRandom(lunches, index, lastLunchId);
    const afternoonSnackId = getFallbackOrRandom(snacks, index + 3);
    const dinnerId = getFallbackOrRandom(dinners, index, lastDinnerId || lunchId);

    lastLunchId = lunchId;
    lastDinnerId = dinnerId;

    plan[day] = {
      breakfast: { recipeId: breakfastId },
      morningSnack: { recipeId: morningSnackId },
      lunch: { recipeId: lunchId },
      afternoonSnack: { recipeId: afternoonSnackId },
      dinner: { recipeId: dinnerId }
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
