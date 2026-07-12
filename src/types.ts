/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GrowthEntry {
  id: string;
  date: string; // YYYY-MM-DD
  weight: number; // kg
  height: number; // cm
  headCircumference?: number; // cm
  notes?: string;
}

export interface BabyProfile {
  id: string;
  name: string;
  birthDate: string; // YYYY-MM-DD
  allergies: string[];
  restrictedFoods: string[];
  preferences: string[];
  observations: string;
  photoColor: string; // Tailwind bg color class for avatar (e.g. 'bg-pink-100 text-pink-600')
}

export interface NutritionalInfo {
  calories: number;
  proteins: number; // g
  carbs: number; // g
  fats: number; // g
  iron?: string; // mg or description
  calcium?: string; // mg or description
  fiber?: string; // g
}

export interface Recipe {
  id: string;
  name: string;
  ageRange: string; // e.g. "6 meses", "9 meses", "12 meses", "2 años+"
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  ingredients: string[];
  steps: string[];
  tips: string[];
  variations: string[];
  nutritionalInfo: NutritionalInfo;
  vitamins: string[];
  minerals: string[];
  texture: string; // e.g., "Papilla", "Sólido suave (BLW)", "Sólidos chafados"
  difficulty: "Fácil" | "Medio" | "Difícil";
  conservation: string;
  freezing: string;
  reheating: string;
  warnings: string[];
  category: "desayuno" | "almuerzo" | "cena" | "merienda" | "acompañamiento";
  attributes: string[]; // e.g., ["rica en hierro", "rica en calcio", "rica en fibra", "sin huevo", "sin leche", "sin gluten", "sin azúcar"]
}

export interface PreparedLog {
  recipeId: string;
  date: string; // YYYY-MM-DD
  reaction: "liked" | "disliked" | "try_again" | null;
  notes?: string;
}

export interface MealSlot {
  recipeId: string | null;
  customText?: string;
}

export interface DailyMenu {
  breakfast: MealSlot;
  morningSnack: MealSlot;
  lunch: MealSlot;
  afternoonSnack: MealSlot;
  dinner: MealSlot;
}

export interface MealPlan {
  [date: string]: DailyMenu; // YYYY-MM-DD
}

export interface ShoppingItem {
  id: string;
  name: string;
  category: string; // "Frutas", "Verduras", "Carnes/Proteínas", "Lácteos/Sustitutos", "Cereales/Granos", "Otros"
  checked: boolean;
  quantity?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface GuideArticle {
  id: string;
  title: string;
  icon: string;
  category: string;
  summary: string;
  content: string; // Markdown or rich HTML-compatible content
}
