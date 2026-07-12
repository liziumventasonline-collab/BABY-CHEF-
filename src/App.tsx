/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import {
  Baby,
  Flame,
  Calendar,
  Search,
  Heart,
  ShoppingCart,
  BookOpen,
  User,
  Clock,
  ArrowLeft,
  Check,
  MessageSquare,
  Plus,
  Trash,
  ChevronRight,
  Star,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  HelpCircle,
  Lightbulb,
  Sparkles,
  Share2,
  Sun,
  Moon,
  BarChart2,
  TrendingUp,
  X,
  PlusCircle,
  CalendarDays,
  UtensilsCrossed,
  CheckCircle2,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { RECIPES_DB } from "./data/recipes";
import { FAQ_DB, GUIDES_DB } from "./data/guides";
import {
  BabyProfile,
  Recipe,
  PreparedLog,
  MealPlan,
  ShoppingItem,
  GrowthEntry,
  GuideArticle
} from "./types";
import {
  calculateAgeInMonths,
  generateBalancedWeeklyMenu,
  generateShoppingListFromMenu
} from "./utils/helpers";

import GrowthChart from "./components/GrowthChart";
import RecipeTimer from "./components/RecipeTimer";

// Initial Mock/Standard Data to feel alive instantly
const DEFAULT_BABY: BabyProfile = {
  id: "b1",
  name: "Mateo",
  birthDate: "2026-01-11", // Exactly 6 months old as of July 11, 2026
  allergies: ["Huevo"],
  restrictedFoods: ["Sal", "Azúcar", "Miel"],
  preferences: ["Plátano", "Calabaza"],
  observations: "Iniciando con purés y cortes muy blandos en BLW. Le encanta succionar el plátano.",
  photoColor: "bg-teal-100 text-teal-700"
};

const DEFAULT_GROWTH: GrowthEntry[] = [
  { id: "g1", date: "2026-01-11", weight: 3.3, height: 50, headCircumference: 34, notes: "Nacimiento" },
  { id: "g2", date: "2026-03-11", weight: 5.2, height: 58, headCircumference: 38, notes: "Revisión 2 meses" },
  { id: "g3", date: "2026-05-11", weight: 6.8, height: 63, headCircumference: 41, notes: "Revisión 4 meses" },
  { id: "g4", date: "2026-07-11", weight: 7.9, height: 67, headCircumference: 43, notes: "Revisión 6 meses - Inicio de AC" }
];

const MOTIVATIONAL_QUOTES = [
  "¡Cada cucharadita es una nueva aventura de sabores y texturas!",
  "Poco a poco, tu bebé aprenderá a amar los alimentos saludables. ¡Ten paciencia!",
  "El desorden al comer es sinónimo de aprendizaje y diversión para tu bebé.",
  "Estás haciendo un trabajo increíble alimentando y nutriendo a tu pequeño.",
  "Recuerda: la leche sigue siendo su alimento principal. ¡Disfruta la alimentación complementaria!",
  "La curiosidad es el mejor ingrediente. Deja que experimente con sus manitas."
];

export default function App() {
  // --- States ---
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [babies, setBabies] = useState<BabyProfile[]>(() => {
    const saved = localStorage.getItem("babychef_babies");
    return saved ? JSON.parse(saved) : [DEFAULT_BABY];
  });
  const [activeBabyId, setActiveBabyId] = useState<string>(() => {
    const saved = localStorage.getItem("babychef_active_baby_id");
    return saved || "b1";
  });
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("babychef_favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [preparedLogs, setPreparedLogs] = useState<PreparedLog[]>(() => {
    const saved = localStorage.getItem("babychef_prepared_logs");
    return saved ? JSON.parse(saved) : [
      { recipeId: "r1", date: "2026-07-09", reaction: "liked" },
      { recipeId: "r3", date: "2026-07-10", reaction: "liked" }
    ];
  });
  const [recipeLogs, setRecipeLogs] = useState<string[]>(() => {
    const saved = localStorage.getItem("babychef_recipe_logs");
    return saved ? JSON.parse(saved) : ["r1", "r3"];
  });
  const [mealPlan, setMealPlan] = useState<MealPlan>(() => {
    const saved = localStorage.getItem("babychef_meal_plan");
    return saved ? JSON.parse(saved) : {};
  });
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(() => {
    const saved = localStorage.getItem("babychef_shopping_list");
    return saved ? JSON.parse(saved) : [];
  });
  const [growthEntries, setGrowthEntries] = useState<GrowthEntry[]>(() => {
    const saved = localStorage.getItem("babychef_growth_entries");
    return saved ? JSON.parse(saved) : DEFAULT_GROWTH;
  });

  // Active view states
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [ageFilter, setAgeFilter] = useState<string>("todos");
  const [attributeFilter, setAttributeFilter] = useState<string>("todos");
  
  // Custom shopping item addition
  const [newShopItemName, setNewShopItemName] = useState("");
  const [newShopItemCat, setNewShopItemCat] = useState("Otros");

  // AI Assistant chat states
  const [chatMessages, setChatMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([
    { sender: "bot", text: "¡Hola, mamita o papito! 👶✨ Soy BabyChef AI, tu asesora de nutrición infantil. Puedo ayudarte con dudas sobre BLW, papillas, alérgenos, o buscar qué preparar con los ingredientes que tienes en casa (ej: plátano, avena). ¿Qué duda tienes hoy?" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Profile Form states
  const [isAddingBaby, setIsAddingBaby] = useState(false);
  const [newBabyName, setNewBabyName] = useState("");
  const [newBabyBirth, setNewBabyBirth] = useState("");
  const [newBabyAllergies, setNewBabyAllergies] = useState("");
  const [newBabyRestrictions, setNewBabyRestrictions] = useState("");
  const [newBabyPrefs, setNewBabyPrefs] = useState("");
  const [newBabyObs, setNewBabyObs] = useState("");

  // Article reading state
  const [selectedArticle, setSelectedArticle] = useState<GuideArticle | null>(null);

  // Random quote index
  const [quoteIndex] = useState(() => Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length));

  // --- LocalStorage Synchronization ---
  useEffect(() => {
    localStorage.setItem("babychef_babies", JSON.stringify(babies));
  }, [babies]);

  useEffect(() => {
    localStorage.setItem("babychef_active_baby_id", activeBabyId);
  }, [activeBabyId]);

  useEffect(() => {
    localStorage.setItem("babychef_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("babychef_prepared_logs", JSON.stringify(preparedLogs));
  }, [preparedLogs]);

  useEffect(() => {
    localStorage.setItem("babychef_recipe_logs", JSON.stringify(recipeLogs));
  }, [recipeLogs]);

  useEffect(() => {
    localStorage.setItem("babychef_meal_plan", JSON.stringify(mealPlan));
  }, [mealPlan]);

  useEffect(() => {
    localStorage.setItem("babychef_shopping_list", JSON.stringify(shoppingList));
  }, [shoppingList]);

  useEffect(() => {
    localStorage.setItem("babychef_growth_entries", JSON.stringify(growthEntries));
  }, [growthEntries]);

  // Active Baby context helper
  const activeBaby = babies.find(b => b.id === activeBabyId) || babies[0];
  const babyAge = calculateAgeInMonths(activeBaby?.birthDate);

  // --- Functions ---
  const handleToggleFavorite = (recipeId: string) => {
    setFavorites(prev =>
      prev.includes(recipeId) ? prev.filter(id => id !== recipeId) : [...prev, recipeId]
    );
  };

  const handleLogRecipeView = (recipeId: string) => {
    setRecipeLogs(prev => {
      const filtered = prev.filter(id => id !== recipeId);
      return [recipeId, ...filtered].slice(0, 15); // keep last 15
    });
    setSelectedRecipeId(recipeId);
    setActiveTab("recipe-detail");
  };

  const handleMarkPrepared = (recipeId: string, reaction: "liked" | "disliked" | "try_again" | null) => {
    const today = new Date().toISOString().split("T")[0];
    const newLog: PreparedLog = {
      recipeId,
      date: today,
      reaction
    };
    // Update or add log
    setPreparedLogs(prev => {
      const existingIdx = prev.findIndex(l => l.recipeId === recipeId && l.date === today);
      if (existingIdx !== -1) {
        const copy = [...prev];
        copy[existingIdx] = newLog;
        return copy;
      }
      return [newLog, ...prev];
    });
  };

  const handleGenerateWeeklyMenu = () => {
    const plan = generateBalancedWeeklyMenu(RECIPES_DB, babyAge.months);
    setMealPlan(plan);
    const list = generateShoppingListFromMenu(plan, RECIPES_DB);
    setShoppingList(list);
  };

  const handleAddShoppingItem = (e: FormEvent) => {
    e.preventDefault();
    if (!newShopItemName.trim()) return;
    const newItem: ShoppingItem = {
      id: `custom-sh-${Date.now()}`,
      name: newShopItemName.trim(),
      category: newShopItemCat,
      checked: false
    };
    setShoppingList(prev => [newItem, ...prev]);
    setNewShopItemName("");
  };

  const handleToggleShoppingItem = (id: string) => {
    setShoppingList(prev =>
      prev.map(item => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleAddGrowthEntry = (weight: number, height: number, headCirc?: number, notes?: string) => {
    const newEntry: GrowthEntry = {
      id: `growth-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      weight,
      height,
      headCircumference: headCirc,
      notes
    };
    setGrowthEntries(prev => [...prev, newEntry]);
  };

  const handleDeleteGrowthEntry = (id: string) => {
    setGrowthEntries(prev => prev.filter(e => e.id !== id));
  };

  const handleAddBabyProfile = (e: FormEvent) => {
    e.preventDefault();
    if (!newBabyName.trim() || !newBabyBirth) {
      alert("Por favor rellena el nombre y la fecha de nacimiento.");
      return;
    }
    const colors = [
      "bg-teal-100 text-teal-700",
      "bg-pink-100 text-pink-700",
      "bg-sky-100 text-sky-700",
      "bg-amber-100 text-amber-700",
      "bg-rose-100 text-rose-700"
    ];
    const newBaby: BabyProfile = {
      id: `baby-${Date.now()}`,
      name: newBabyName.trim(),
      birthDate: newBabyBirth,
      allergies: newBabyAllergies.split(",").map(s => s.trim()).filter(Boolean),
      restrictedFoods: newBabyRestrictions.split(",").map(s => s.trim()).filter(Boolean),
      preferences: newBabyPrefs.split(",").map(s => s.trim()).filter(Boolean),
      observations: newBabyObs.trim(),
      photoColor: colors[babies.length % colors.length]
    };

    setBabies(prev => [...prev, newBaby]);
    setActiveBabyId(newBaby.id);
    
    // reset form
    setNewBabyName("");
    setNewBabyBirth("");
    setNewBabyAllergies("");
    setNewBabyRestrictions("");
    setNewBabyPrefs("");
    setNewBabyObs("");
    setIsAddingBaby(false);
  };

  // --- AI Chat Assistant Handler ---
  const handleSendChatMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMsg = chatInput.trim();
    setChatInput("");
    setChatMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setIsChatLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: chatMessages,
          babyContext: {
            nombre: activeBaby?.name,
            edadMeses: babyAge.months,
            edadTexto: babyAge.text,
            alergias: activeBaby?.allergies,
            alimentosRestringidos: activeBaby?.restrictedFoods,
            preferencias: activeBaby?.preferences,
            observaciones: activeBaby?.observations
          },
          recipesContext: RECIPES_DB.map(r => ({
            id: r.id,
            nombre: r.name,
            edadRecomendada: r.ageRange,
            ingredientes: r.ingredients,
            textura: r.texture,
            categoria: r.category,
            atributos: r.attributes
          }))
        })
      });

      const data = await response.json();
      if (response.ok) {
        setChatMessages(prev => [...prev, { sender: "bot", text: data.text }]);
      } else {
        throw new Error(data.error || "Ocurrió un error en el servidor.");
      }
    } catch (error: any) {
      console.error("Chat error:", error);
      setChatMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: `🧸 Oh, hubo un pequeño problemita técnico al contactar al asistente. ${error.message || "Asegúrate de configurar GEMINI_API_KEY."}`
        }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleQuickPromptClick = (promptText: string) => {
    setChatInput(promptText);
  };

  // --- Sharing helper ---
  const handleShareAppContent = (title: string, text: string) => {
    if (navigator.share) {
      navigator.share({ title, text, url: window.location.href })
        .catch(err => console.log("Share canceled", err));
    } else {
      alert(`Compartir contenido:\n\n${title}\n\n${text}\n\nURL copiada al portapapeles.`);
      navigator.clipboard.writeText(`${title}\n${text}\n${window.location.href}`);
    }
  };

  // --- Filters on recipes ---
  const filteredRecipes = RECIPES_DB.filter(recipe => {
    const matchesSearch =
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase())) ||
      recipe.texture.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAge = ageFilter === "todos" || recipe.ageRange.includes(ageFilter);
    const matchesAttr = attributeFilter === "todos" || recipe.attributes.includes(attributeFilter);

    return matchesSearch && matchesAge && matchesAttr;
  });

  // Active recipe detail object
  const selectedRecipe = RECIPES_DB.find(r => r.id === selectedRecipeId) || RECIPES_DB[0];

  // --- Statistics helper variables ---
  const uniquePreparedCount = new Set(preparedLogs.map(l => l.recipeId)).size;
  const completedPercentage = Math.round((uniquePreparedCount / RECIPES_DB.length) * 100);
  const likedRecipes = preparedLogs.filter(l => l.reaction === "liked").map(l => l.recipeId);
  const mostLikedRecipeNames = Array.from(new Set(likedRecipes))
    .map(id => RECIPES_DB.find(r => r.id === id)?.name)
    .filter(Boolean);

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 flex items-center justify-center py-0 md:py-6 px-0 md:px-4 relative overflow-hidden ${
      isDarkMode 
        ? "bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-slate-100" 
        : "bg-gradient-to-tr from-pink-100 via-sky-100 to-teal-100 text-slate-800"
    }`}>
      
      {/* Decorative Baby Floating Elements for Desktop */}
      <div className="hidden lg:block absolute top-12 left-12 text-6xl animate-pulse opacity-40 select-none">🍼</div>
      <div className="hidden lg:block absolute bottom-12 left-16 text-6xl rotate-12 opacity-40 select-none">🧸</div>
      <div className="hidden lg:block absolute top-20 right-20 text-6xl -rotate-12 opacity-40 select-none">🪇</div>
      <div className="hidden lg:block absolute bottom-16 right-12 text-6xl animate-bounce opacity-40 select-none">👶</div>
      <div className="hidden lg:block absolute top-1/2 left-8 text-5xl opacity-30 select-none">👣</div>
      <div className="hidden lg:block absolute top-1/3 right-8 text-5xl opacity-30 select-none">🥣</div>

      {/* Interactive Mobile Device Container Mockup */}
      <div className={`relative w-full md:max-w-[480px] h-screen md:h-[840px] md:rounded-[40px] md:shadow-2xl overflow-hidden border-0 md:border-[10px] flex flex-col transition-all ${
        isDarkMode 
          ? "bg-slate-900 border-slate-800 text-slate-100 shadow-slate-950/40" 
          : "bg-radial from-white via-pink-50/20 to-sky-50/20 border-white text-slate-800 shadow-pink-200/40"
      }`}>
        
        {/* Simulated Speaker Notch & Status Bar for App feel */}
        <div className={`hidden md:flex items-center justify-between px-6 pt-3 pb-1.5 text-[11px] font-bold ${
          isDarkMode ? "bg-slate-950 text-slate-400" : "bg-white/80 text-slate-500"
        } border-b border-transparent select-none`}>
          <span>9:41 🍼</span>
          <div className="w-24 h-4.5 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto relative -top-1 flex items-center justify-center">
            <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold">BabyChef App</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>📶</span>
            <span>🛜</span>
            <span>🔋 100%</span>
          </div>
        </div>

        {/* Top Branding Header */}
        <header className={`px-4 py-3 flex items-center justify-between border-b transition-colors flex-shrink-0 ${
          isDarkMode 
            ? "bg-slate-900/95 border-slate-800" 
            : "bg-gradient-to-r from-pink-50/90 via-sky-50/90 to-teal-50/90 border-pink-100"
        } backdrop-blur-md`}>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-pink-100 dark:bg-pink-950 rounded-xl text-pink-500 shadow-xs">
              <Baby className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <span className="font-display font-bold text-md bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 bg-clip-text text-transparent">
                BabyChef
              </span>
              <span className={`text-[9px] ml-1 font-bold uppercase tracking-wider ${isDarkMode ? "text-slate-400" : "text-pink-400"}`}>
                App Móvil
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Darkmode toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-xl border transition-all ${
                isDarkMode ? "bg-slate-800 border-slate-700 text-amber-400" : "bg-white border-pink-100 text-pink-500 hover:bg-pink-50"
              }`}
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </header>

        {/* Quick Baby Profile Selector inside app header area */}
        <div className={`px-4 py-2 border-b flex items-center justify-between gap-2 flex-shrink-0 text-xs ${
          isDarkMode ? "bg-slate-900/60 border-slate-800" : "bg-sky-50/50 border-sky-100/40"
        }`}>
          <span className="font-semibold text-slate-500">Perfiles:</span>
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {babies.map(baby => (
              <button
                key={baby.id}
                onClick={() => setActiveBabyId(baby.id)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                  activeBabyId === baby.id
                    ? "bg-pink-400 text-white shadow-xs"
                    : "bg-white/60 dark:bg-slate-800 text-slate-500 border border-slate-100 dark:border-slate-700 hover:bg-white"
                }`}
              >
                {baby.name}
              </button>
            ))}
            <button
              onClick={() => {
                setActiveTab("profile");
                setIsAddingBaby(true);
              }}
              className="p-1 text-pink-400 hover:text-pink-500"
              title="Añadir Bebé"
            >
              <PlusCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content View Area (Fully scrollable within the smartphone) */}
        <main className={`flex-1 overflow-y-auto p-4 scrollbar-none transition-colors ${
          isDarkMode ? "bg-slate-900" : "bg-gradient-to-b from-white via-pink-50/10 to-sky-50/10"
        }`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              
              {/* --- VIEW: DASHBOARD --- */}
              {activeTab === "dashboard" && (
                <div className="space-y-5">
                  {/* Beautiful Header Card */}
                  <div className={`p-5 rounded-3xl border transition-all flex items-center justify-between gap-4 ${
                    isDarkMode 
                      ? "bg-slate-800 border-slate-700 shadow-xs" 
                      : "bg-gradient-to-br from-pink-50/80 via-sky-50/50 to-white border-pink-100/50 shadow-sm"
                  }`}>
                    <div className="space-y-2 text-left flex-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-pink-100 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300 rounded-full text-[10px] font-bold">
                        <Sparkles className="w-3 h-3" />
                        <span>Consejo del día</span>
                      </div>
                      <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-800 dark:text-white">
                        ¡Hola, mamita de {activeBaby?.name}! 🍼
                      </h2>
                      <p className="text-slate-600 dark:text-slate-300 max-w-lg text-sm sm:text-base italic leading-relaxed">
                        &ldquo;{MOTIVATIONAL_QUOTES[quoteIndex]}&rdquo;
                      </p>
                      <div className="pt-2 text-xs text-slate-500 font-medium">
                        Tu bebé tiene actualmente <span className="text-emerald-600 dark:text-emerald-400 font-bold">{babyAge.text}</span>. Adaptamos las sugerencias de comida automáticamente.
                      </div>
                    </div>
                    {/* Baby avatar illustration */}
                    <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-300 flex items-center justify-center text-white text-4xl shadow-lg ring-4 ring-emerald-50 dark:ring-slate-700 flex-shrink-0">
                      👶
                    </div>
                  </div>

                  {/* Quick access bento grid */}
                  <h3 className="font-display font-semibold text-lg text-slate-800 dark:text-white mb-2">Accesos Rápidos</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button
                      onClick={() => {
                        setAgeFilter(babyAge.months >= 6 ? `${Math.min(12, babyAge.months)} meses` : "6 meses");
                        setActiveTab("recipes");
                      }}
                      className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xs border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center gap-2 hover:scale-102 transition-all group"
                    >
                      <div className="p-3 bg-teal-50 dark:bg-teal-950 text-teal-600 rounded-xl group-hover:bg-teal-500 group-hover:text-white transition-all">
                        <Baby className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Recetas por Edad</span>
                      <span className="text-[10px] text-slate-400">Filtrado automático</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("ai-assistant")}
                      className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xs border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center gap-2 hover:scale-102 transition-all group"
                    >
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Preguntar Asistente IA</span>
                      <span className="text-[10px] text-slate-400">Gemini 3.5 Flash</span>
                    </button>

                    <button
                      onClick={() => {
                        setAttributeFilter("sin gluten");
                        setActiveTab("recipes");
                      }}
                      className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xs border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center gap-2 hover:scale-102 transition-all group"
                    >
                      <div className="p-3 bg-amber-50 dark:bg-amber-950 text-amber-600 rounded-xl group-hover:bg-amber-500 group-hover:text-white transition-all">
                        <Flame className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Menús Sin Alérgenos</span>
                      <span className="text-[10px] text-slate-400">Sin Huevo o Gluten</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("meal-planner")}
                      className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xs border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center gap-2 hover:scale-102 transition-all group"
                    >
                      <div className="p-3 bg-pink-50 dark:bg-pink-950 text-pink-600 rounded-xl group-hover:bg-pink-500 group-hover:text-white transition-all">
                        <CalendarDays className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Plan de la Semana</span>
                      <span className="text-[10px] text-slate-400">Equilibrado y variado</span>
                    </button>
                  </div>

                  {/* Recommendation block for active baby age */}
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-display font-semibold text-md text-slate-800 dark:text-white flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-amber-400" />
                        Recomendado para su edad ({babyAge.text})
                      </h3>
                      <button
                        onClick={() => {
                          setAgeFilter(babyAge.months >= 6 ? `${Math.min(12, babyAge.months)} meses` : "6 meses");
                          setActiveTab("recipes");
                        }}
                        className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                      >
                        Ver todas
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {RECIPES_DB.filter(r => r.ageRange.includes(babyAge.months <= 7 ? "6 meses" : babyAge.months <= 9 ? "8 meses" : "12 meses"))
                        .slice(0, 2)
                        .map(recipe => (
                          <div
                            key={recipe.id}
                            onClick={() => handleLogRecipeView(recipe.id)}
                            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all cursor-pointer flex gap-4"
                          >
                            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 text-2xl rounded-lg flex items-center justify-center flex-shrink-0">
                              🥗
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-xs font-bold text-slate-800 dark:text-white line-clamp-1">
                                {recipe.name}
                              </h4>
                              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                <span>{recipe.texture}</span>
                                <span>•</span>
                                <span>{recipe.prepTime + recipe.cookTime} min</span>
                              </div>
                              <span className="inline-block text-[9px] bg-emerald-100/60 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full font-medium">
                                {recipe.ageRange}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Active Baby mini-profile and allergens card */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-4">
                      <h3 className="font-display font-semibold text-md text-slate-800 dark:text-white">Alergias y Alimentos Restringidos</h3>
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs font-medium text-slate-500 w-full">Alérgenos de cuidado:</span>
                          {activeBaby?.allergies.length > 0 ? (
                            activeBaby.allergies.map(alg => (
                              <span key={alg} className="text-xs bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 px-3 py-1 rounded-full font-bold">
                                {alg}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-slate-400">Ninguno registrado.</span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2">
                          <span className="text-xs font-medium text-slate-500 w-full">Restringidos antes del año (Pediatría):</span>
                          {activeBaby?.restrictedFoods.map(food => (
                            <span key={food} className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 px-3 py-1 rounded-full font-bold">
                              {food}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-4">
                      <h3 className="font-display font-semibold text-md text-slate-800 dark:text-white">Últimas Guías Educativas</h3>
                      <div className="space-y-3">
                        {GUIDES_DB.slice(0, 2).map(article => (
                          <div
                            key={article.id}
                            onClick={() => {
                              setSelectedArticle(article);
                              setActiveTab("guides");
                            }}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-amber-50 dark:bg-amber-950 text-amber-500 rounded-lg">
                                <BookOpen className="w-4 h-4" />
                              </div>
                              <div className="text-left">
                                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{article.title}</p>
                                <p className="text-[10px] text-slate-400 truncate w-48 sm:w-64">{article.summary}</p>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- VIEW: RECIPES (CATALOGUE & SEARCH) --- */}
              {activeTab === "recipes" && (
                <div className="space-y-6">
                  {/* Search and filter block */}
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-4">
                    <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white">Buscador Inteligente de Recetas</h3>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Buscar por ingrediente (avena, zanahoria), textura, o tipo..."
                          value={searchQuery}
                          onChange={e => setSearchQuery(e.target.value)}
                          className="w-full text-sm pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 text-slate-800 dark:text-white"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <select
                        value={ageFilter}
                        onChange={e => setAgeFilter(e.target.value)}
                        className="text-sm p-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      >
                        <option value="todos">Cualquier Edad</option>
                        <option value="6 meses">6 meses</option>
                        <option value="7 meses">7 meses</option>
                        <option value="8 meses">8 meses</option>
                        <option value="9 meses">9 meses</option>
                        <option value="10 meses">10 meses</option>
                        <option value="12 meses">12 meses</option>
                      </select>

                      <select
                        value={attributeFilter}
                        onChange={e => setAttributeFilter(e.target.value)}
                        className="text-sm p-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      >
                        <option value="todos">Cualquier Atributo</option>
                        <option value="sin huevo">Sin Huevo</option>
                        <option value="sin leche">Sin Leche</option>
                        <option value="sin gluten">Sin Gluten</option>
                        <option value="sin azúcar">Sin Azúcar</option>
                        <option value="rica en hierro">Rica en Hierro</option>
                        <option value="rica en calcio">Rica en Calcio</option>
                        <option value="rica en fibra">Rica en Fibra</option>
                      </select>
                    </div>

                    {/* Pre-defined chips */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="text-xs text-slate-400 font-medium py-1">Filtros rápidos:</span>
                      {["Aguacate", "Plátano", "Papilla", "BLW", "Desayuno", "Almuerzo", "Cena"].map(chip => (
                        <button
                          key={chip}
                          onClick={() => setSearchQuery(chip)}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-600 dark:text-slate-300 hover:text-emerald-600 rounded-full text-xs font-semibold transition-all"
                        >
                          {chip}
                        </button>
                      ))}
                      {(searchQuery || ageFilter !== "todos" || attributeFilter !== "todos") && (
                        <button
                          onClick={() => {
                            setSearchQuery("");
                            setAgeFilter("todos");
                            setAttributeFilter("todos");
                          }}
                          className="text-xs text-rose-500 font-bold hover:underline py-1"
                        >
                          Limpiar Filtros
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Recipes list output */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredRecipes.map(recipe => {
                      const isFav = favorites.includes(recipe.id);
                      return (
                        <div
                          key={recipe.id}
                          className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group overflow-hidden"
                        >
                          <div>
                            {/* Graphic Placeholder image */}
                            <div className="relative h-40 bg-gradient-to-tr from-emerald-100 to-teal-50 dark:from-emerald-950 dark:to-slate-800 flex items-center justify-center overflow-hidden">
                              <span className="text-4xl filter group-hover:scale-110 transition-transform duration-300">
                                {recipe.category === "desayuno" ? "🥣" : recipe.category === "merienda" ? "🍌" : "🍲"}
                              </span>
                              <span className="absolute top-3 left-3 bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white px-2.5 py-1 rounded-lg text-[10px] font-bold">
                                {recipe.ageRange}
                              </span>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleFavorite(recipe.id);
                                }}
                                className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-slate-800/90 rounded-full hover:bg-rose-50 hover:text-rose-500 text-slate-400 transition-colors"
                              >
                                <Heart className={`w-4 h-4 ${isFav ? "fill-rose-500 text-rose-500" : ""}`} />
                              </button>
                            </div>

                            <div className="p-4 space-y-2">
                              <h4 className="text-sm font-bold text-slate-800 dark:text-white line-clamp-1">
                                {recipe.name}
                              </h4>
                              <p className="text-xs text-slate-400 line-clamp-2">
                                {recipe.steps[0]}
                              </p>
                              
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full font-medium">
                                  {recipe.texture}
                                </span>
                                <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full font-medium">
                                  {recipe.prepTime + recipe.cookTime} min
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 border-t border-slate-50 dark:border-slate-700">
                            <button
                              onClick={() => handleLogRecipeView(recipe.id)}
                              className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                            >
                              <span>Ver Preparación Paso a Paso</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {filteredRecipes.length === 0 && (
                      <div className="col-span-full py-16 text-center text-slate-400 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                        <Search className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                        <p className="text-sm font-semibold">No se encontraron recetas.</p>
                        <p className="text-xs text-slate-400 mt-1">Prueba con ingredientes más genéricos o limpia los filtros.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* --- VIEW: RECIPE DETAIL (PASO A PASO) --- */}
              {activeTab === "recipe-detail" && selectedRecipe && (
                <div className="space-y-6">
                  <button
                    onClick={() => setActiveTab("recipes")}
                    className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    <ArrowLeft className="w-4 h-4" /> Volver al catálogo de recetas
                  </button>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Media & Core features */}
                    <div className="lg:col-span-1 space-y-6">
                      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-4">
                        <div className="h-48 bg-gradient-to-tr from-emerald-100 to-teal-50 dark:from-emerald-950 dark:to-slate-900 rounded-xl flex items-center justify-center text-5xl">
                          {selectedRecipe.category === "desayuno" ? "🥣" : "🍲"}
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 px-3 py-1 rounded-full">
                            {selectedRecipe.ageRange}
                          </span>
                          <button
                            onClick={() => handleToggleFavorite(selectedRecipe.id)}
                            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-500"
                          >
                            <Heart className={`w-4 h-4 ${favorites.includes(selectedRecipe.id) ? "fill-rose-500 text-rose-500" : ""}`} />
                            <span>Guardar favorita</span>
                          </button>
                        </div>

                        <h2 className="font-display font-bold text-xl text-slate-800 dark:text-white">
                          {selectedRecipe.name}
                        </h2>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="bg-slate-50 dark:bg-slate-700 p-2.5 rounded-lg">
                            <span className="text-slate-400 block mb-0.5">Dificultad</span>
                            <span className="font-bold">{selectedRecipe.difficulty}</span>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-700 p-2.5 rounded-lg">
                            <span className="text-slate-400 block mb-0.5">Textura</span>
                            <span className="font-bold text-[10px] truncate block">{selectedRecipe.texture}</span>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-700 p-2.5 rounded-lg">
                            <span className="text-slate-400 block mb-0.5">Tiempo total</span>
                            <span className="font-bold">{selectedRecipe.prepTime + selectedRecipe.cookTime} min</span>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-700 p-2.5 rounded-lg">
                            <span className="text-slate-400 block mb-0.5">Porciones</span>
                            <span className="font-bold">{selectedRecipe.servings} tomas</span>
                          </div>
                        </div>

                        {/* Integrated kitchen timer */}
                        <RecipeTimer defaultMinutes={selectedRecipe.cookTime || 10} />
                      </div>

                      {/* Warnings and Choking alert box */}
                      <div className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50 p-5 rounded-2xl space-y-2">
                        <h4 className="text-xs font-bold text-amber-800 dark:text-amber-400 flex items-center gap-2">
                          <Info className="w-4 h-4" /> Alertas de Seguridad Pediátrica
                        </h4>
                        <ul className="text-[11px] text-amber-700 dark:text-amber-400 list-disc pl-4 space-y-1">
                          {selectedRecipe.warnings.map((w, idx) => (
                            <li key={idx}>{w}</li>
                          ))}
                          <li>Introduce los alimentos de uno en uno para verificar tolerancia digestiva.</li>
                        </ul>
                      </div>
                    </div>

                    {/* Middle & Right Column: Ingredients & Steps */}
                    <div className="lg:col-span-2 space-y-6">
                      
                      {/* Ingredients checklist */}
                      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-4">
                        <h3 className="font-display font-semibold text-md text-slate-800 dark:text-white">
                          Ingredientes ({selectedRecipe.servings} Porciones)
                        </h3>
                        <p className="text-xs text-slate-400">Marca los ingredientes a medida que los preparas en tu mesada:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {selectedRecipe.ingredients.map((ing, idx) => (
                            <label
                              key={idx}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
                            >
                              <input
                                type="checkbox"
                                className="w-4 h-4 text-emerald-500 bg-slate-100 border-slate-300 rounded focus:ring-emerald-400"
                              />
                              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">{ing}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Steps list */}
                      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-4">
                        <h3 className="font-display font-semibold text-md text-slate-800 dark:text-white">
                          Preparación Paso a Paso
                        </h3>
                        <div className="space-y-4">
                          {selectedRecipe.steps.map((step, idx) => (
                            <div key={idx} className="flex gap-4">
                              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                                {idx + 1}
                              </div>
                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-0.5">
                                {step}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tips & preservation */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700 text-xs space-y-2">
                          <h4 className="font-bold text-slate-700 dark:text-slate-200">Tips de Conservación</h4>
                          <p className="text-slate-500 dark:text-slate-400">{selectedRecipe.conservation}</p>
                          <h4 className="font-bold text-slate-700 dark:text-slate-200 pt-1">¿Cómo congelar?</h4>
                          <p className="text-slate-500 dark:text-slate-400">{selectedRecipe.freezing}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700 text-xs space-y-2">
                          <h4 className="font-bold text-slate-700 dark:text-slate-200">Valor Nutricional</h4>
                          <div className="grid grid-cols-3 gap-2 text-center text-[10px] pt-1">
                            <div className="bg-slate-50 dark:bg-slate-700 p-1 rounded">
                              <span className="block text-slate-400">Calorías</span>
                              <span className="font-bold">{selectedRecipe.nutritionalInfo.calories}</span>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-700 p-1 rounded">
                              <span className="block text-slate-400">Proteínas</span>
                              <span className="font-bold">{selectedRecipe.nutritionalInfo.proteins}g</span>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-700 p-1 rounded">
                              <span className="block text-slate-400">Hierro</span>
                              <span className="font-bold truncate max-w-[50px] inline-block">{selectedRecipe.nutritionalInfo.iron || "0.8mg"}</span>
                            </div>
                          </div>
                          <h4 className="font-bold text-slate-700 dark:text-slate-200 pt-1">¿Le gustó a tu bebé?</h4>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                handleMarkPrepared(selectedRecipe.id, "liked");
                                alert("¡Registro guardado! Le encantó a tu bebé 💖");
                              }}
                              className="flex-1 py-1 px-2 border border-slate-200 hover:bg-emerald-50 rounded text-[10px] font-semibold flex items-center justify-center gap-1"
                            >
                              <ThumbsUp className="w-3.5 h-3.5 text-emerald-500" /> Le encantó
                            </button>
                            <button
                              onClick={() => {
                                handleMarkPrepared(selectedRecipe.id, "disliked");
                                alert("¡Registro guardado! Anotado como desagrado temporal.");
                              }}
                              className="flex-1 py-1 px-2 border border-slate-200 hover:bg-rose-50 rounded text-[10px] font-semibold flex items-center justify-center gap-1"
                            >
                              <ThumbsDown className="w-3.5 h-3.5 text-rose-500" /> No le gustó
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- VIEW: MEAL PLANNER --- */}
              {activeTab === "meal-planner" && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="font-display font-bold text-lg text-slate-800 dark:text-white">Planificador Semanal Inteligente</h2>
                      <p className="text-xs text-slate-500">Genera de forma balanceada el menú del bebé utilizando únicamente las recetas seguras de la app</p>
                    </div>
                    <button
                      onClick={handleGenerateWeeklyMenu}
                      className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-500/10 flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Generar Plan de Menú Semanal</span>
                    </button>
                  </div>

                  {Object.keys(mealPlan).length > 0 ? (
                    <div className="space-y-4">
                      {Object.entries(mealPlan).map(([day, menu]) => (
                        <div key={day} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                          <div className="col-span-1 border-r border-slate-100 dark:border-slate-700 pr-2">
                            <span className="font-display font-bold text-sm text-slate-800 dark:text-white block">{day}</span>
                            <span className="text-[10px] text-slate-400 block">Menú diario</span>
                          </div>

                          {/* 5 slots */}
                          {Object.entries(menu).map(([slotName, slot]) => {
                            const recipe = RECIPES_DB.find(r => r.id === slot.recipeId);
                            const label = slotName === "breakfast" ? "Desayuno" : slotName === "morningSnack" ? "M. Mañana" : slotName === "lunch" ? "Almuerzo" : slotName === "afternoonSnack" ? "Merienda" : "Cena";
                            return (
                              <div
                                key={slotName}
                                onClick={() => recipe && handleLogRecipeView(recipe.id)}
                                className={`col-span-1 p-3 rounded-xl border transition-all cursor-pointer ${
                                  recipe
                                    ? "bg-emerald-50/20 hover:bg-emerald-50/50 border-emerald-100/50"
                                    : "bg-slate-50/50 border-slate-100"
                                }`}
                              >
                                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block mb-1">{label}</span>
                                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 line-clamp-1">
                                  {recipe ? recipe.name : "Leche materna / Libre demanda"}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-16 text-center text-slate-400 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                      <Calendar className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                      <p className="text-sm font-semibold">No se ha generado ningún plan para esta semana.</p>
                      <p className="text-xs text-slate-400 mt-1">Presiona el botón de arriba para generar un plan de alimentación balanceado en segundos.</p>
                    </div>
                  )}
                </div>
              )}

              {/* --- VIEW: SHOPPING LIST --- */}
              {activeTab === "shopping-list" && (
                <div className="space-y-6">
                  {/* Shopping creator & control */}
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h2 className="font-display font-bold text-lg text-slate-800 dark:text-white">Lista de Compras Inteligente</h2>
                      <p className="text-xs text-slate-500">Calculada automáticamente según el plan de menú para que no compres de más.</p>
                      
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => {
                            if (shoppingList.length === 0) return;
                            handleShareAppContent("Lista de Compras - BabyChef", shoppingList.map(i => `${i.checked ? '[x]' : '[ ]'} ${i.name} (${i.category})`).join('\n'));
                          }}
                          className="px-3 py-1.5 border border-slate-200 dark:border-slate-600 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
                        >
                          <Share2 className="w-3.5 h-3.5" /> Compartir Lista
                        </button>
                        <button
                          onClick={() => setShoppingList([])}
                          className="px-3 py-1.5 border border-rose-200 hover:bg-rose-50 rounded-lg text-xs font-semibold text-rose-600 transition-colors"
                        >
                          Limpiar Lista
                        </button>
                      </div>
                    </div>

                    <form onSubmit={handleAddShoppingItem} className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200">Agregar ingrediente manual</h4>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Ej: Sésamo molido, espinacas..."
                          value={newShopItemName}
                          onChange={e => setNewShopItemName(e.target.value)}
                          className="flex-1 text-xs p-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white"
                        />
                        <select
                          value={newShopItemCat}
                          onChange={e => setNewShopItemCat(e.target.value)}
                          className="text-xs p-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-700 dark:text-slate-200"
                        >
                          <option value="Frutas">Frutas</option>
                          <option value="Verduras">Verduras</option>
                          <option value="Carnes/Proteínas">Carnes</option>
                          <option value="Lácteos/Sustitutos">Lácteos</option>
                          <option value="Cereales/Granos">Cereales</option>
                          <option value="Otros">Otros</option>
                        </select>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold"
                        >
                          Añadir
                        </button>
                      </div>
                    </form>
                  </div>

                  {shoppingList.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left: unchecked list grouped */}
                      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-4">
                        <h3 className="font-display font-semibold text-md text-emerald-600 flex items-center gap-2">
                          <ShoppingCart className="w-5 h-5" /> Por Comprar
                        </h3>
                        
                        <div className="space-y-4">
                          {["Frutas", "Verduras", "Carnes/Proteínas", "Lácteos/Sustitutos", "Cereales/Granos", "Otros"].map(cat => {
                            const catItems = shoppingList.filter(i => i.category === cat && !i.checked);
                            if (catItems.length === 0) return null;
                            return (
                              <div key={cat} className="space-y-1.5">
                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">{cat}</span>
                                {catItems.map(item => (
                                  <label
                                    key={item.id}
                                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
                                  >
                                    <div className="flex items-center gap-3">
                                      <input
                                        type="checkbox"
                                        checked={item.checked}
                                        onChange={() => handleToggleShoppingItem(item.id)}
                                        className="w-4 h-4 text-emerald-500 rounded"
                                      />
                                      <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{item.name}</span>
                                    </div>
                                    {item.quantity && <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">{item.quantity}</span>}
                                  </label>
                                ))}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right: checked items */}
                      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-4">
                        <h3 className="font-display font-semibold text-md text-slate-400 flex items-center gap-2">
                          <Check className="w-5 h-5" /> Ya Comprado
                        </h3>
                        <div className="space-y-1">
                          {shoppingList.filter(i => i.checked).map(item => (
                            <div key={item.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50/50 dark:bg-slate-700/30">
                              <div className="flex items-center gap-3 line-through text-slate-400 text-xs">
                                <input
                                  type="checkbox"
                                  checked={item.checked}
                                  onChange={() => handleToggleShoppingItem(item.id)}
                                  className="w-4 h-4 text-slate-300 rounded"
                                />
                                <span>{item.name}</span>
                              </div>
                              <span className="text-[9px] text-slate-400">{item.category}</span>
                            </div>
                          ))}
                          {shoppingList.filter(i => i.checked).length === 0 && (
                            <p className="text-xs text-slate-400 py-6 text-center">No has marcado ningún artículo comprado aún.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-16 text-center text-slate-400 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                      <ShoppingCart className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                      <p className="text-sm font-semibold">La lista de compras está vacía.</p>
                      <p className="text-xs text-slate-400 mt-1">Sincroniza el planificador para cargarlos automáticamente de tus recetas.</p>
                    </div>
                  )}
                </div>
              )}

              {/* --- VIEW: GUIDES & ARTICLES --- */}
              {activeTab === "guides" && (
                <div className="space-y-6">
                  {selectedArticle ? (
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-4">
                      <button
                        onClick={() => setSelectedArticle(null)}
                        className="flex items-center gap-2 text-xs font-bold text-emerald-600 hover:underline mb-2"
                      >
                        <ArrowLeft className="w-4 h-4" /> Volver a las guías educativas
                      </button>

                      <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 block">
                        Categoría: {selectedArticle.category}
                      </span>
                      <h2 className="font-display font-bold text-2xl text-slate-800 dark:text-white">
                        {selectedArticle.title}
                      </h2>
                      <p className="text-sm text-slate-400 italic">
                        {selectedArticle.summary}
                      </p>

                      <div className="prose prose-sm dark:prose-invert max-w-none pt-4 text-slate-600 dark:text-slate-300 leading-relaxed space-y-4 whitespace-pre-wrap">
                        {selectedArticle.content}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 sm:p-8 rounded-3xl text-white">
                        <h2 className="font-display font-bold text-xl sm:text-2xl mb-1">Guías Educativas para Mamás Primerizas</h2>
                        <p className="text-xs sm:text-sm text-emerald-100">Información avalada por pediatras para guiarte en el BLW, papillas y prevención de alergias.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {GUIDES_DB.map(article => (
                          <div
                            key={article.id}
                            onClick={() => setSelectedArticle(article)}
                            className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs hover:shadow-md cursor-pointer transition-all space-y-3"
                          >
                            <div className="p-3 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 rounded-xl inline-block">
                              <BookOpen className="w-5 h-5" />
                            </div>
                            <h3 className="font-display font-bold text-md text-slate-800 dark:text-white">
                              {article.title}
                            </h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              {article.summary}
                            </p>
                            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 hover:underline pt-2">
                              Leer artículo completo <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* --- VIEW: BABY PROFILE & WEIGHT LOGS --- */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Baby Profile Info */}
                    <div className="lg:col-span-1 space-y-6">
                      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-4 text-center">
                        <div className={`w-20 h-20 mx-auto rounded-full ${activeBaby?.photoColor} flex items-center justify-center text-3xl shadow-sm`}>
                          👶
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white">{activeBaby?.name}</h3>
                          <p className="text-xs text-slate-400">Fecha de Nacimiento: {activeBaby?.birthDate}</p>
                          <span className="inline-block mt-2 text-xs bg-emerald-500 text-white px-3 py-1 rounded-full font-bold">
                            {babyAge.text}
                          </span>
                        </div>

                        <div className="text-xs text-left space-y-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                          <div>
                            <span className="font-bold text-slate-500 block mb-0.5">Alergias</span>
                            <div className="flex flex-wrap gap-1.5">
                              {activeBaby?.allergies.map(alg => (
                                <span key={alg} className="bg-rose-100 text-rose-700 dark:bg-rose-950 text-[10px] px-2 py-0.5 rounded-md font-bold">
                                  {alg}
                                </span>
                              ))}
                              {activeBaby?.allergies.length === 0 && <span className="text-slate-400">Ninguna</span>}
                            </div>
                          </div>
                          <div>
                            <span className="font-bold text-slate-500 block mb-0.5">Preferencias</span>
                            <div className="flex flex-wrap gap-1.5">
                              {activeBaby?.preferences.map(pref => (
                                <span key={pref} className="bg-teal-100 text-teal-700 dark:bg-teal-950 text-[10px] px-2 py-0.5 rounded-md font-bold">
                                  {pref}
                                </span>
                              ))}
                              {activeBaby?.preferences.length === 0 && <span className="text-slate-400">Ninguna</span>}
                            </div>
                          </div>
                          <div>
                            <span className="font-bold text-slate-500 block mb-0.5">Restringidos</span>
                            <p className="text-[11px] text-slate-500">{activeBaby?.restrictedFoods.join(", ")}</p>
                          </div>
                          <div>
                            <span className="font-bold text-slate-500 block mb-0.5">Observaciones</span>
                            <p className="text-[11px] text-slate-500 italic">{activeBaby?.observations || "—"}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => setIsAddingBaby(true)}
                          className="w-full mt-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-colors"
                        >
                          Crear Nuevo Perfil de Bebé
                        </button>
                      </div>

                      {isAddingBaby && (
                        <form onSubmit={handleAddBabyProfile} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-3">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200">Nuevo Perfil</h4>
                            <button onClick={() => setIsAddingBaby(false)} type="button">
                              <X className="w-4 h-4 text-slate-400" />
                            </button>
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium text-slate-500 mb-0.5">Nombre</label>
                            <input
                              type="text"
                              value={newBabyName}
                              onChange={e => setNewBabyName(e.target.value)}
                              placeholder="Ej: Sofía"
                              className="w-full text-xs p-2 bg-slate-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-400"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium text-slate-500 mb-0.5">Nacimiento</label>
                            <input
                              type="date"
                              value={newBabyBirth}
                              onChange={e => setNewBabyBirth(e.target.value)}
                              className="w-full text-xs p-2 bg-slate-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-400"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium text-slate-500 mb-0.5">Alergias (separadas por comas)</label>
                            <input
                              type="text"
                              value={newBabyAllergies}
                              onChange={e => setNewBabyAllergies(e.target.value)}
                              placeholder="Ej: Huevo, Lácteos"
                              className="w-full text-xs p-2 bg-slate-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-400"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium text-slate-500 mb-0.5">Preferencias (separadas por comas)</label>
                            <input
                              type="text"
                              value={newBabyPrefs}
                              onChange={e => setNewBabyPrefs(e.target.value)}
                              placeholder="Ej: Plátano, Aguacate"
                              className="w-full text-xs p-2 bg-slate-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-400"
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold"
                          >
                            Crear Perfil
                          </button>
                        </form>
                      )}
                    </div>

                    {/* Weight & growth tracking right column */}
                    <div className="lg:col-span-2">
                      <GrowthChart
                        entries={growthEntries}
                        onAddEntry={handleAddGrowthEntry}
                        onDeleteEntry={handleDeleteGrowthEntry}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* --- VIEW: AI ASSISTANT --- */}
              {activeTab === "ai-assistant" && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                      <h2 className="font-display font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-emerald-500" /> Asistente de Alimentación de IA
                      </h2>
                      <p className="text-xs text-slate-500">Impulsado por Gemini. Responde con empatía y absoluto apego al recetario oficial de BabyChef.</p>
                    </div>
                    {activeBaby && (
                      <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-lg font-bold">
                        Perfil Activo: {activeBaby.name} ({babyAge.text})
                      </span>
                    )}
                  </div>

                  {/* Chat interface */}
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xs flex flex-col h-[500px]">
                    
                    {/* Chat messages box */}
                    <div className="flex-1 overflow-y-auto space-y-4 p-2">
                      {chatMessages.map((msg, idx) => {
                        const isUser = msg.sender === "user";
                        return (
                          <div
                            key={idx}
                            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                          >
                            <div className={`p-4 rounded-2xl text-xs max-w-lg leading-relaxed ${
                              isUser
                                ? "bg-emerald-500 text-white rounded-tr-none shadow-xs"
                                : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-tl-none whitespace-pre-wrap border border-slate-100 dark:border-slate-600"
                            }`}>
                              {!isUser && <span className="block text-[9px] uppercase font-bold text-emerald-600 mb-1">BabyChef AI</span>}
                              {msg.text}
                            </div>
                          </div>
                        );
                      })}
                      {isChatLoading && (
                        <div className="flex justify-start">
                          <div className="p-4 bg-slate-100 dark:bg-slate-700 text-slate-500 rounded-2xl rounded-tl-none text-xs flex items-center gap-2">
                            <span className="animate-bounce">🍼</span>
                            <span>Escribiendo una deliciosa respuesta...</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Quick prompting suggestions */}
                    <div className="p-2 border-t border-slate-100 dark:border-slate-700 space-y-2">
                      <span className="text-[10px] text-slate-400 font-medium">Sugerencias rápidas de consulta:</span>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "¿Tengo plátano y avena, qué puedo hacer?",
                          "¿Qué hago si mi bebé tiene arcadas?",
                          "¿Cómo introduzco el huevo de forma segura?",
                          "Alimentos estrictamente prohibidos antes de los 12m"
                        ].map(suggestion => (
                          <button
                            key={suggestion}
                            onClick={() => handleQuickPromptClick(suggestion)}
                            className="px-2.5 py-1 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 text-slate-500 dark:text-slate-300 text-[10px] rounded-lg border transition-all text-left truncate max-w-[280px]"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Chat Input form */}
                    <form onSubmit={handleSendChatMessage} className="p-2 flex gap-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={e => setChatInput(e.target.value)}
                        placeholder="Pregúntame sobre BLW, recetas sanas o alimentos para tu bebé..."
                        className="flex-1 text-xs p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 text-slate-800 dark:text-white"
                        disabled={isChatLoading}
                      />
                      <button
                        type="submit"
                        className="px-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center"
                        disabled={isChatLoading || !chatInput.trim()}
                      >
                        Enviar
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* --- VIEW: FAQ --- */}
              {activeTab === "faq" && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs">
                    <h2 className="font-display font-bold text-lg text-slate-800 dark:text-white">Preguntas Frecuentes de Alimentación Infantil</h2>
                    <p className="text-xs text-slate-500">Respuestas rápidas basadas en el recetario de expertos y pautas de la OMS para familias primerizas.</p>
                  </div>

                  <div className="space-y-4">
                    {FAQ_DB.map(faq => (
                      <div
                        key={faq.id}
                        className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-400 px-2.5 py-0.5 rounded-full font-bold">
                            {faq.category}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-2">
                          {faq.question}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- VIEW: STATISTICS --- */}
              {activeTab === "statistics" && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs">
                    <h2 className="font-display font-bold text-lg text-slate-800 dark:text-white">Estadísticas de Nutrición</h2>
                    <p className="text-xs text-slate-500">Resumen y métricas de recetas preparadas e ingredientes favoritos del bebé.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Stat card 1 */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs flex items-center gap-4">
                      <div className="p-4 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 rounded-2xl text-2xl font-bold">
                        {uniquePreparedCount}
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 font-medium block">Recetas Preparadas</span>
                        <span className="text-md font-bold text-slate-700 dark:text-slate-200">{uniquePreparedCount} de {RECIPES_DB.length}</span>
                      </div>
                    </div>

                    {/* Stat card 2 */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs flex items-center gap-4">
                      <div className="p-4 bg-teal-50 dark:bg-teal-950 text-teal-600 rounded-2xl text-2xl font-bold">
                        {completedPercentage}%
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 font-medium block">Recetario Completado</span>
                        <span className="text-md font-bold text-slate-700 dark:text-slate-200">¡Gran logro familiar!</span>
                      </div>
                    </div>

                    {/* Stat card 3 */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs flex items-center gap-4">
                      <div className="p-4 bg-pink-50 dark:bg-pink-950 text-pink-600 rounded-2xl text-2xl font-bold">
                        {preparedLogs.length}
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 font-medium block">Tomas Registradas</span>
                        <span className="text-md font-bold text-slate-700 dark:text-slate-200">Histórico de comidas</span>
                      </div>
                    </div>
                  </div>

                  {/* Reaction graph and preferences lists */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-4">
                      <h3 className="font-display font-semibold text-md text-slate-800 dark:text-white">Alimentos Preferidos del Bebé</h3>
                      <p className="text-xs text-slate-400">Calculado a partir de tus marcas de &ldquo;Le encantó&rdquo; en cada receta:</p>
                      
                      {mostLikedRecipeNames.length > 0 ? (
                        <ul className="space-y-2">
                          {mostLikedRecipeNames.map((name, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              <span className="font-semibold">{name}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-slate-400 py-4">No has guardado ninguna reacción positiva aún. ¡Anímate a marcar Thumbs-Up en el catálogo de recetas!</p>
                      )}
                    </div>

                    {/* Age recommendation balance */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-4">
                      <h3 className="font-display font-semibold text-md text-slate-800 dark:text-white">Progreso de Alimentación por Edades</h3>
                      <div className="space-y-3 text-xs">
                        {["6 meses", "8 meses", "9 meses", "12 meses"].map(age => {
                          const ageRecipes = RECIPES_DB.filter(r => r.ageRange.includes(age));
                          const agePrepared = ageRecipes.filter(r => preparedLogs.some(l => l.recipeId === r.id));
                          const percent = Math.round((agePrepared.length / (ageRecipes.length || 1)) * 100);
                          return (
                            <div key={age} className="space-y-1">
                              <div className="flex justify-between font-medium">
                                <span>Rango {age}</span>
                                <span>{percent}% ({agePrepared.length}/{ageRecipes.length})</span>
                              </div>
                              <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${percent}%` }}></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </main>

        {/* Responsive Bottom Navigation Tab Bar (Sliding Pastel Pill Menu) */}
        <div className={`border-t px-3 py-3 select-none flex-shrink-0 transition-colors ${
          isDarkMode ? "bg-slate-950 border-slate-800" : "bg-gradient-to-r from-pink-50 via-sky-50 to-teal-50 border-pink-100"
        }`}>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 px-1">
            {[
              { id: "dashboard", label: "Inicio", icon: Baby, color: "bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border-teal-200" },
              { id: "recipes", label: "Recetas", icon: Search, color: "bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border-sky-200" },
              { id: "meal-planner", label: "Menú", icon: Calendar, color: "bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 border-pink-200" },
              { id: "shopping-list", label: "Compras", icon: ShoppingCart, color: "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200" },
              { id: "guides", label: "Guías", icon: BookOpen, color: "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-indigo-200" },
              { id: "profile", label: "Bebé", icon: User, color: "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-200" },
              { id: "ai-assistant", label: "Asistente IA", icon: MessageSquare, color: "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200" },
              { id: "faq", label: "Preguntas", icon: HelpCircle, color: "bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border-violet-200" },
              { id: "statistics", label: "Métricas", icon: BarChart2, color: "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border-orange-200" }
            ].map(item => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSelectedArticle(null);
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                    isActive
                      ? `${item.color} shadow-xs scale-105 border`
                      : isDarkMode
                      ? "bg-slate-900 border-transparent text-slate-400 hover:text-slate-200"
                      : "bg-white/80 border-slate-100 text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div> {/* Close Mobile Device Container */}

      {/* Outer floating disclaimer or footer at desktop level */}
      <footer className="hidden lg:block absolute bottom-2 left-0 right-0 text-center text-[10px] text-pink-700/60 dark:text-indigo-300/40 select-none pointer-events-none">
        BabyChef App — Hecho con amor 💖 • Consulta siempre con tu pediatra.
      </footer>

    </div>
  );
}
