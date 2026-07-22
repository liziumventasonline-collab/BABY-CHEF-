/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
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
  Info,
  Camera,
  Edit3,
  Trash2,
  Lock,
  Key,
  ShieldAlert,
  RefreshCw,
  Copy,
  HelpCircle,
  Facebook
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { RECIPES_DB } from "./data/recipes";
import { GUIDES_DB, FAQ_DB } from "./data/guides";
import { WEEKLY_PLANNER_PDF } from "./data/planner_pdf_db";
import { RECIPES_BY_AGE_PDF } from "./data/recipes_by_age_pdf";
import {
  BabyProfile,
  Recipe,
  PreparedLog,
  MealPlan,
  ShoppingItem,
  GrowthEntry,
  GuideArticle,
  WeeklyPdfPlan,
  PdfRecipe
} from "./types";
import {
  calculateAgeInMonths,
  generateBalancedWeeklyMenu,
  generateShoppingListFromMenu,
  generateMenuForWeek,
  parseDateLocal
} from "./utils/helpers";

import GrowthChart from "./components/GrowthChart";
import RecipeTimer from "./components/RecipeTimer";

// Define API backend base URL depending on deployment hostname.
// If it's running on Vercel or other client-only hosting, it points back to our active Cloud Run container.
const API_BASE_URL = window.location.hostname.includes("localhost") || window.location.hostname.includes("run.app")
  ? ""
  : "https://ais-pre-6itwh7jwqqh5rbpe7dtmvb-207077582813.us-east1.run.app";

// Helper helper function to abstract secure JSON fetch operations with our backend, supporting cross-domain requests
const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const url = API_BASE_URL + endpoint;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  
  if (!res.ok) {
    let errMsg = `Error de servidor (${res.status})`;
    try {
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errData = await res.json();
        if (errData && errData.error) errMsg = errData.error;
      }
    } catch (e) {
      // ignore
    }
    throw new Error(errMsg);
  }
  
  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Respuesta inválida del servidor (se recibió HTML en vez de JSON). Por favor, comprueba que el servidor esté activo.");
  }
  
  return await res.json();
};

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

const getFeedingCategory = (months: number) => {
  if (months < 6) {
    return {
      title: "🍼 Lactancia Exclusiva (0-5 meses)",
      desc: "Lactancia materna exclusiva o fórmula infantil a demanda. No requiere sólidos todavía.",
      color: "bg-pink-50 border-pink-100 text-pink-700 dark:bg-pink-950/20 dark:border-pink-900 dark:text-pink-300"
    };
  } else if (months >= 6 && months <= 8) {
    return {
      title: "🥣 Alimentación Complementaria Inicial (6-8 meses)",
      desc: "Papillas suaves, purés y texturas semisólidas. Alimentos introducidos de 1 en 1 para comprobar tolerancia.",
      color: "bg-teal-50 border-teal-100 text-teal-700 dark:bg-teal-950/20 dark:border-teal-900 dark:text-teal-300"
    };
  } else if (months >= 9 && months <= 11) {
    return {
      title: "🥑 Transición Alimentaria (9-11 meses)",
      desc: "Alimentos picados finitos, texturas trituradas y sólidos blandos para incentivar la masticación.",
      color: "bg-sky-50 border-sky-100 text-sky-700 dark:bg-sky-950/20 dark:border-sky-900 dark:text-sky-300"
    };
  } else {
    return {
      title: "🥪 Loncheras y Comida Familiar (12+ meses)",
      desc: "Menú familiar saludable y loncheras nutritivas para preescolares. ¡Se han priorizado recetas de lonchera para sus meriendas!",
      color: "bg-purple-50 border-purple-100 text-purple-700 dark:bg-purple-950/20 dark:border-purple-900 dark:text-purple-300"
    };
  }
};

export default function App() {
  // --- States ---
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // Device Activation Lock States
  const [deviceId] = useState<string>(() => {
    let saved = localStorage.getItem("babychef_device_id");
    if (!saved) {
      saved = `dev_${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`;
      localStorage.setItem("babychef_device_id", saved);
    }
    return saved;
  });
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(true); // Default to authorized to remove restrictions
  const [isActivated, setIsActivated] = useState<boolean>(true);
  const [generatedRecoveryKey, setGeneratedRecoveryKey] = useState<string>("");
  const [showRecoveryCodeModal, setShowRecoveryCodeModal] = useState<boolean>(false);
  const [recoveryInput, setRecoveryInput] = useState<string>("");
  const [recoveryError, setRecoveryError] = useState<string>("");
  const [recoverySuccess, setRecoverySuccess] = useState<boolean>(false);
  const [isVerifyingDevice, setIsVerifyingDevice] = useState<boolean>(false);

  // --- NEW EMAIL AUTHORIZATION SYSTEM STATES ---
  const [clientEmail, setClientEmail] = useState<string>(() => localStorage.getItem("babychef_client_email") || "");
  const [clientName, setClientName] = useState<string>(() => localStorage.getItem("babychef_client_name") || "");
  const [emailStatus, setEmailStatus] = useState<"pending" | "authorized" | "not_found" | "device_mismatch" | "checking" | "error">("checking");
  const [emailInput, setEmailInput] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [isSubmittingEmail, setIsSubmittingEmail] = useState<boolean>(false);

  // States for manual code insertion
  const [manualCode, setManualCode] = useState<string>("");
  const [manualError, setManualError] = useState<string>("");
  const [isVerifyingManual, setIsVerifyingManual] = useState<boolean>(false);
  const [adminClicks, setAdminClicks] = useState<number>(0);

  // Admin Panel States
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [adminEmailInput, setAdminEmailInput] = useState<string>("");
  const [adminPasswordInput, setAdminPasswordInput] = useState<string>("");
  const [adminError, setAdminError] = useState<string>("");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [adminRegistrations, setAdminRegistrations] = useState<any[]>([]);
  const [adminNewClientEmail, setAdminNewClientEmail] = useState<string>("");
  const [adminNewClientStatus, setAdminNewClientStatus] = useState<"authorized" | "pending">("authorized");
  const [adminSuccessMessage, setAdminSuccessMessage] = useState<string>("");
  const [adminQuery, setAdminQuery] = useState<string>("");
  const [activePdfWeek, setActivePdfWeek] = useState<number>(1);
  const [pdfPlannerSubTab, setPdfPlannerSubTab] = useState<"plan" | "recetarios">("plan");
  const [pdfBookAge, setPdfBookAge] = useState<"9-12" | "12-18" | "18-24">("9-12");
  const [selectedPdfRecipe, setSelectedPdfRecipe] = useState<PdfRecipe | null>(null);
  const [pdfShoppingChecked, setPdfShoppingChecked] = useState<{ [weekNum: number]: { [itemName: string]: boolean } }>(() => {
    const saved = localStorage.getItem("babychef_pdf_shopping_checked");
    return saved ? JSON.parse(saved) : {};
  });
  const [guidesSubTab, setGuidesSubTab] = useState<"articles" | "faq">("articles");
  const [activeDashboardSubTab, setActiveDashboardSubTab] = useState<string>("recetario");
  const [weekProgressSelected, setWeekProgressSelected] = useState<number>(1);
  const [weekShoppingChecked, setWeekShoppingChecked] = useState<{ [weekKey: string]: { [itemName: string]: boolean } }>(() => {
    const saved = localStorage.getItem("babychef_week_shopping_checked");
    return saved ? JSON.parse(saved) : {};
  });
  const [simulateSixMonths, setSimulateSixMonths] = useState<boolean>(false);
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
  const [growthEntriesByBaby, setGrowthEntriesByBaby] = useState<{ [babyId: string]: GrowthEntry[] }>(() => {
    const saved = localStorage.getItem("babychef_growth_by_baby");
    if (saved) return JSON.parse(saved);
    const oldEntries = localStorage.getItem("babychef_growth_entries");
    const parsedOld = oldEntries ? JSON.parse(oldEntries) : DEFAULT_GROWTH;
    return { "b1": parsedOld };
  });

  const activeGrowthEntries = growthEntriesByBaby[activeBabyId] || [];

  // Active view states
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [ageFilter, setAgeFilter] = useState<string>("todos");
  const [attributeFilter, setAttributeFilter] = useState<string>("todos");
  
  // Custom shopping item addition
  const [newShopItemName, setNewShopItemName] = useState("");
  const [newShopItemCat, setNewShopItemCat] = useState("Otros");

  // Onboarding / First-time setup states
  const [showOnboarding, setShowOnboarding] = useState<boolean>(() => {
    return localStorage.getItem("babychef_onboarded") !== "true";
  });
  const [onboardingPhotoUrl, setOnboardingPhotoUrl] = useState<string>("");
  const [onboardingClientName, setOnboardingClientName] = useState<string>("");
  const [onboardingClientEmail, setOnboardingClientEmail] = useState<string>("");
  const [newBabyWeight, setNewBabyWeight] = useState("");
  const [newBabyHeight, setNewBabyHeight] = useState("");
  const [newBabyHeadCirc, setNewBabyHeadCirc] = useState("");

  // PWA Install Prompt states
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState<boolean>(true);
  const [showInstallModal, setShowInstallModal] = useState<boolean>(false);
  const [showDirectInstallPopup, setShowDirectInstallPopup] = useState<boolean>(false);

  // Profile Form states
  const [isAddingBaby, setIsAddingBaby] = useState(false);
  const [newBabyName, setNewBabyName] = useState("");
  const [newBabyBirth, setNewBabyBirth] = useState("");
  const [newBabyAllergies, setNewBabyAllergies] = useState("");
  const [newBabyRestrictions, setNewBabyRestrictions] = useState("");
  const [newBabyPrefs, setNewBabyPrefs] = useState("");
  const [newBabyObs, setNewBabyObs] = useState("");

  // Edit Profile Form states
  const [isEditingBaby, setIsEditingBaby] = useState(false);
  const [editBabyName, setEditBabyName] = useState("");
  const [editBabyBirth, setEditBabyBirth] = useState("");
  const [editBabyAllergies, setEditBabyAllergies] = useState("");
  const [editBabyRestrictions, setEditBabyRestrictions] = useState("");
  const [editBabyPrefs, setEditBabyPrefs] = useState("");
  const [editBabyObs, setEditBabyObs] = useState("");
  const [editBabyPhotoUrl, setEditBabyPhotoUrl] = useState("");

  // Article reading state
  const [selectedArticle, setSelectedArticle] = useState<GuideArticle | null>(null);

  // Inquiry Search state
  const [inquiryQuery, setInquiryQuery] = useState("");

  // Random quote index
  const [quoteIndex] = useState(() => Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length));

  // --- LocalStorage Synchronization & Setup ---
  useEffect(() => {
    const checkUrlAuth = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        
        // We accept any parameter indicating a payment or active license/access
        const paramKeys = ["acceso", "token", "key", "code", "licencia", "access"];
        let foundKey = "";
        for (const pKey of paramKeys) {
          if (urlParams.has(pKey)) {
            foundKey = urlParams.get(pKey) || "";
            break;
          }
        }

        if (foundKey) {
          localStorage.setItem("babychef_is_authorized", "true");
          localStorage.setItem("babychef_access_key", foundKey.trim().toLowerCase());
          
          // Clean the query parameters from the address bar so they can't forward it easily!
          const cleanUrl = new URL(window.location.href);
          paramKeys.forEach(pKey => cleanUrl.searchParams.delete(pKey));
          window.history.replaceState({}, document.title, cleanUrl.pathname + cleanUrl.search);
        }
        
        setIsAuthorized(true);
      } catch (err) {
        console.error("Error in checkUrlAuth:", err);
        setIsAuthorized(true);
      } finally {
        setIsVerifyingDevice(false);
      }
    };
    checkUrlAuth();
  }, [deviceId]);

  // --- Manual Access Submission ---
  const handleManualAccessSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;

    setManualError("");
    setIsVerifyingManual(true);

    try {
      let parsedKey = manualCode.trim();
      
      // Extract code if they paste a URL or query string containing "?"
      if (parsedKey.includes("?")) {
        const queryStr = parsedKey.substring(parsedKey.indexOf("?"));
        const urlParams = new URLSearchParams(queryStr);
        const paramKeys = ["acceso", "token", "key", "code", "licencia", "access"];
        for (const pKey of paramKeys) {
          if (urlParams.has(pKey)) {
            parsedKey = urlParams.get(pKey) || parsedKey;
            break;
          }
        }
      } else if (parsedKey.includes("=")) {
        // Handle "acceso=maria123" format
        const parts = parsedKey.split("=");
        parsedKey = parts[parts.length - 1].trim();
      }

      // Convert to clean lowercased string
      parsedKey = parsedKey.trim().toLowerCase();

      if (!parsedKey) {
        setManualError("No se pudo detectar un código válido en el texto ingresado.");
        setIsVerifyingManual(false);
        return;
      }

      // Call the API endpoint to claim access
      const data = await apiFetch("/api/claim-access", {
        method: "POST",
        body: JSON.stringify({ key: parsedKey, deviceId })
      });

      if (data && data.authorized) {
        localStorage.setItem("babychef_is_authorized", "true");
        localStorage.setItem("babychef_access_key", parsedKey);
        setIsAuthorized(true);
      } else {
        setManualError(data.error || "El código ingresado es inválido o ya está en uso.");
      }
    } catch (err: any) {
      console.error("Error verifying manual key:", err);
      setManualError(err.message || "Error al validar tu acceso. Asegúrate de tener conexión a Internet.");
    } finally {
      setIsVerifyingManual(false);
    }
  };

  // --- Admin Logic ---
  const handleAdminLogin = async (e: FormEvent) => {
    e.preventDefault();
    setAdminError("");
    try {
      const data = await apiFetch("/api/admin/registrations", {
        method: "POST",
        body: JSON.stringify({ 
          adminEmail: adminEmailInput.trim(), 
          masterKey: adminPasswordInput.trim() 
        })
      });
      setIsAdminLoggedIn(true);
      setAdminRegistrations(data.registrations || []);
      setAdminSuccessMessage("Sesión de administrador iniciada con éxito.");
      setTimeout(() => setAdminSuccessMessage(""), 3000);
    } catch (err: any) {
      setAdminError(err.message || "Error de red al iniciar sesión.");
    }
  };

  const handleAdminUpdateStatus = async (targetEmail: string, action: string) => {
    try {
      const data = await apiFetch("/api/admin/update-registration", {
        method: "POST",
        body: JSON.stringify({
          adminEmail: "liziumventasonline@gmail.com",
          masterKey: adminPasswordInput.trim(),
          clientEmail: targetEmail,
          action
        })
      });
      setAdminRegistrations(data.registrations || []);
      setAdminSuccessMessage(`Cliente actualizado: acción '${action}' exitosa.`);
      setTimeout(() => setAdminSuccessMessage(""), 3000);
    } catch (err: any) {
      alert(err.message || "Error al conectar con el servidor.");
    }
  };

  const handleAdminAddClientSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!adminNewClientEmail.trim()) return;
    try {
      const data = await apiFetch("/api/admin/update-registration", {
        method: "POST",
        body: JSON.stringify({
          adminEmail: "liziumventasonline@gmail.com",
          masterKey: adminPasswordInput.trim(),
          clientEmail: adminNewClientEmail.trim(),
          action: "add"
        })
      });
      setAdminRegistrations(data.registrations || []);
      setAdminNewClientEmail("");
      setAdminSuccessMessage("Cliente registrado y autorizado exitosamente.");
      setTimeout(() => setAdminSuccessMessage(""), 3000);
    } catch (err: any) {
      alert(err.message || "Error al conectar con el servidor.");
    }
  };

  const handleRecoverAccess = async (e: FormEvent) => {
    e.preventDefault();
    if (!recoveryInput.trim()) return;
    
    setRecoveryError("");
    setRecoverySuccess(false);

    try {
      const data = await apiFetch("/api/recover", {
        method: "POST",
        body: JSON.stringify({ recoveryKey: recoveryInput.trim(), newDeviceId: deviceId })
      });
      setRecoverySuccess(true);
      setTimeout(() => {
        setIsAuthorized(true);
        setIsActivated(true);
        setRecoveryInput("");
        setRecoverySuccess(false);
      }, 1500);
    } catch (err: any) {
      setRecoveryError(err.message || "Error de red. Asegúrate de estar conectado.");
    }
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
      setShowDirectInstallPopup(true);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

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
    localStorage.setItem("babychef_growth_by_baby", JSON.stringify(growthEntriesByBaby));
  }, [growthEntriesByBaby]);

  useEffect(() => {
    localStorage.setItem("babychef_pdf_shopping_checked", JSON.stringify(pdfShoppingChecked));
  }, [pdfShoppingChecked]);

  useEffect(() => {
    localStorage.setItem("babychef_week_shopping_checked", JSON.stringify(weekShoppingChecked));
  }, [weekShoppingChecked]);

  // Active Baby context helper
  const activeBaby = babies.find(b => b.id === activeBabyId) || babies[0];
  const babyAge = calculateAgeInMonths(activeBaby?.birthDate);
  const effectiveAgeMonths = simulateSixMonths ? Math.max(6, babyAge.months) : babyAge.months;

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
    const plan = generateBalancedWeeklyMenu(RECIPES_DB, effectiveAgeMonths);
    setMealPlan(plan);
    const list = generateShoppingListFromMenu(plan, RECIPES_DB);
    setShoppingList(list);
  };

  // Auto-generate weekly menu only once on mount if the plan is currently empty
  useEffect(() => {
    if (Object.keys(mealPlan).length === 0 && activeBaby) {
      const plan = generateBalancedWeeklyMenu(RECIPES_DB, effectiveAgeMonths);
      setMealPlan(plan);
      const list = generateShoppingListFromMenu(plan, RECIPES_DB);
      setShoppingList(list);
    }
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
          console.log("User accepted PWA installation");
        }
        setDeferredPrompt(null);
        setShowInstallBtn(false);
      } catch (err) {
        console.error("Error launching native PWA prompt:", err);
        setShowInstallModal(true);
      }
    } else {
      setShowInstallModal(true);
    }
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

  const handleAddGrowthEntry = (weight: number, height: number, headCirc?: number, notes?: string, customDate?: string) => {
    const newEntry: GrowthEntry = {
      id: `growth-${Date.now()}`,
      date: customDate || new Date().toISOString().split("T")[0],
      weight,
      height,
      headCircumference: headCirc,
      notes
    };
    setGrowthEntriesByBaby(prev => {
      const babyEntries = prev[activeBabyId] || [];
      return {
        ...prev,
        [activeBabyId]: [...babyEntries, newEntry]
      };
    });
  };

  const handleDeleteGrowthEntry = (id: string) => {
    setGrowthEntriesByBaby(prev => {
      const babyEntries = prev[activeBabyId] || [];
      return {
        ...prev,
        [activeBabyId]: babyEntries.filter(e => e.id !== id)
      };
    });
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

  const handleStartEditBaby = () => {
    if (!activeBaby) return;
    setEditBabyName(activeBaby.name);
    setEditBabyBirth(activeBaby.birthDate);
    setEditBabyAllergies(activeBaby.allergies.join(", "));
    setEditBabyRestrictions(activeBaby.restrictedFoods.join(", "));
    setEditBabyPrefs(activeBaby.preferences.join(", "));
    setEditBabyObs(activeBaby.observations || "");
    setEditBabyPhotoUrl(activeBaby.photoUrl || "");
    setIsEditingBaby(true);
  };

  const handleSaveEditBaby = (e: FormEvent) => {
    e.preventDefault();
    if (!editBabyName.trim() || !editBabyBirth) {
      alert("Por favor rellena el nombre y la fecha de nacimiento.");
      return;
    }

    setBabies(prev => prev.map(b => {
      if (b.id === activeBabyId) {
        return {
          ...b,
          name: editBabyName.trim(),
          birthDate: editBabyBirth,
          allergies: editBabyAllergies.split(",").map(s => s.trim()).filter(Boolean),
          restrictedFoods: editBabyRestrictions.split(",").map(s => s.trim()).filter(Boolean),
          preferences: editBabyPrefs.split(",").map(s => s.trim()).filter(Boolean),
          observations: editBabyObs.trim(),
          photoUrl: editBabyPhotoUrl || undefined
        };
      }
      return b;
    }));

    setIsEditingBaby(false);
  };

  const handleDeleteBaby = () => {
    if (babies.length <= 1) {
      alert("Debe haber al menos un perfil de bebé activo. Si deseas eliminar este, crea otro primero.");
      return;
    }
    if (!confirm(`¿Estás segura de que deseas eliminar el perfil de ${activeBaby?.name}? Esta acción no se puede deshacer.`)) {
      return;
    }
    
    const remaining = babies.filter(b => b.id !== activeBabyId);
    setBabies(remaining);
    setActiveBabyId(remaining[0].id);
    setIsEditingBaby(false);
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setBabies(prev => prev.map(b => {
        if (b.id === activeBabyId) {
          return {
            ...b,
            photoUrl: base64String
          };
        }
        return b;
      }));
    };
    reader.readAsDataURL(file);
  };
  
  const handleOnboardingPhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setOnboardingPhotoUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleOnboardingSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newBabyName.trim() || !newBabyBirth || !newBabyWeight || !newBabyHeight || !onboardingClientName.trim() || !onboardingClientEmail.trim()) {
      alert("Por favor rellena todos los campos obligatorios marcados con (*).");
      return;
    }

    try {
      // Activar copia en el servidor para vincular este dispositivo
      const actData = await apiFetch("/api/activate", {
        method: "POST",
        body: JSON.stringify({ deviceId, clientEmail: onboardingClientEmail.trim().toLowerCase() })
      });
      
      if (actData && actData.recoveryKey) {
        localStorage.setItem("babychef_recovery_key", actData.recoveryKey);
      }
    } catch (err) {
      // Si el servidor no responde (ej. en hosting estático como Vercel), ignoramos silenciosamente
      console.warn("Servidor de activación no disponible o modo offline. Continuando con registro local.", err);
    }

    // Save client email and name locally
    localStorage.setItem("babychef_client_name", onboardingClientName.trim());
    localStorage.setItem("babychef_client_email", onboardingClientEmail.trim().toLowerCase());
    setClientName(onboardingClientName.trim());
    setClientEmail(onboardingClientEmail.trim().toLowerCase());

    const babyId = `baby-${Date.now()}`;
    const newBaby: BabyProfile = {
      id: babyId,
      name: newBabyName.trim(),
      birthDate: newBabyBirth,
      allergies: newBabyAllergies.split(",").map(s => s.trim()).filter(Boolean),
      restrictedFoods: (newBabyRestrictions || "Sal, Azúcar, Miel").split(",").map(s => s.trim()).filter(Boolean),
      preferences: newBabyPrefs.split(",").map(s => s.trim()).filter(Boolean),
      observations: newBabyObs.trim(),
      photoUrl: onboardingPhotoUrl || undefined,
      photoColor: "bg-teal-100 text-teal-700"
    };

    // Reemplazar bebés con el perfil creado para limpiar Mateo por defecto
    setBabies([newBaby]);
    setActiveBabyId(babyId);

    // Guardar registro de crecimiento inicial
    const entryDate = new Date().toISOString().split("T")[0];
    const initialGrowth: GrowthEntry = {
      id: `growth-${Date.now()}`,
      date: entryDate,
      weight: parseFloat(newBabyWeight),
      height: parseFloat(newBabyHeight),
      headCircumference: newBabyHeadCirc ? parseFloat(newBabyHeadCirc) : undefined,
      notes: "Registro de alta inicial de bienvenida 🧸"
    };
    setGrowthEntriesByBaby({ [babyId]: [initialGrowth] });

    // Guardar estado en localStorage
    localStorage.setItem("babychef_onboarded", "true");
    localStorage.setItem("babychef_is_authorized", "true");
    setIsAuthorized(true);
    setIsActivated(true);
    setShowOnboarding(false);
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

  // Helper to extract the minimum age in months from the recipe's ageRange string (e.g. "6 meses" -> 6, "12 meses" -> 12, "18 meses" -> 18, "2 años" -> 24)
  const getRecipeMinAge = (ageRange: string): number => {
    const numbers = ageRange.match(/\d+/);
    if (numbers) {
      const num = parseInt(numbers[0], 10);
      if (ageRange.toLowerCase().includes("año") || ageRange.toLowerCase().includes("ano")) {
        return num * 12;
      }
      return num;
    }
    return 6; // default minimum
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

  if (false) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-pink-100 via-sky-100 to-teal-100 text-slate-800">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce">👶</div>
          <div className="flex items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5 text-pink-500 animate-spin" />
            <span className="font-display font-bold text-sm text-slate-600">Iniciando BabyChef...</span>
          </div>
        </div>
      </div>
    );
  }

  if (false) {
    return (
      <div className="min-h-screen w-full transition-colors duration-300 flex items-center justify-center py-0 md:py-6 px-0 md:px-4 bg-gradient-to-tr from-pink-100 via-sky-100 to-teal-100 text-slate-800">
        <div className="relative w-full md:max-w-[480px] h-screen md:h-[840px] md:rounded-[40px] md:shadow-2xl overflow-hidden border-0 md:border-[10px] flex flex-col bg-white border-white text-slate-800 justify-center p-8 text-center space-y-5 animate-in fade-in zoom-in duration-300">
          
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center text-4xl mx-auto border border-rose-100 text-rose-500 shadow-sm animate-pulse">
              👶🔑
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-extrabold text-xl text-rose-600">
                ¡Ingresa tu Código de Acceso!
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed px-2">
                Esta es una versión exclusiva de <strong>BabyChef</strong>. Para ingresar por primera vez, escribe tu código de acceso o pega aquí el enlace original completo que te enviamos.
              </p>
            </div>

            {/* Manual Code / Link Input Form */}
            <form onSubmit={handleManualAccessSubmit} className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-3">
              <label className="block text-left text-[11px] font-bold text-slate-600">
                Enlace completo o código de acceso:
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Pega el enlace original o escribe tu código..."
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  className="w-full text-xs py-3 pl-3 pr-10 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-rose-400 text-slate-800"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Key className="w-4 h-4" />
                </div>
              </div>
              
              {manualError && (
                <p className="text-[10px] font-semibold text-rose-500 text-left bg-rose-50 p-2.5 rounded-xl border border-rose-100 leading-snug">
                  ⚠ {manualError}
                </p>
              )}

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="submit"
                  disabled={isVerifyingManual}
                  className="w-full py-3 px-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:from-slate-300 disabled:to-slate-400 text-white font-extrabold text-[11px] rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-[0.98]"
                >
                  {isVerifyingManual ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Validando...</span>
                    </>
                  ) : (
                    <span>Confirmar 🔑</span>
                  )}
                </button>

                <a
                  href="https://wa.link/gwr63q?text=Hola!%20Por%20favor%20bríndame%20mi%20código%20de%20acceso%20para%20BabyChef"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-full py-3 px-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-[11px] rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-[0.98] text-center"
                >
                  <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.488 1.449 5.412 1.451 5.428 0 9.842-4.414 9.845-9.84.001-2.63-1.019-5.101-2.871-6.956-1.851-1.854-4.312-2.875-6.942-2.876-5.432 0-9.848 4.413-9.852 9.84-.001 1.96.512 3.878 1.488 5.584l-.975 3.562 3.655-.959zm10.158-6.938c-.287-.143-1.696-.837-1.959-.933-.262-.096-.452-.143-.642.143-.19.287-.736.933-.903 1.124-.166.19-.333.215-.62.072-1.332-.667-2.28-1.157-3.09-2.545-.147-.25-.03-.386.08-.5.1-.102.215-.251.322-.376.107-.125.143-.215.215-.359.071-.143.036-.269-.018-.376-.053-.107-.452-1.088-.62-1.492-.162-.392-.326-.339-.452-.345-.117-.006-.25-.007-.382-.007-.132 0-.347.049-.529.247-.182.197-.694.678-.694 1.654s.71 1.916.81 2.047c.099.13 1.398 2.135 3.387 2.99.473.203.842.325 1.129.417.475.15.908.129 1.248.078.381-.058 1.696-.694 1.935-1.363.238-.668.238-1.24.167-1.363-.071-.122-.262-.215-.55-.358z"/>
                  </svg>
                  <span>Pedir Código 💬</span>
                </a>
              </div>
            </form>

            <div className="pt-2 border-t border-slate-100 space-y-2.5">
              <p className="text-[11px] text-slate-400 font-medium leading-normal px-2">
                Si aún no has adquirido tu versión original, puedes contactarnos y solicitar tu enlace oficial haciendo clic en el botón de abajo:
              </p>
              
              <a
                href="https://wa.link/gwr63q"
                target="_blank"
                referrerPolicy="no-referrer"
                className="inline-flex w-full items-center justify-center gap-2.5 py-3.5 px-6 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl text-xs font-extrabold transition-all duration-200 transform hover:scale-[1.01] shadow-md shadow-emerald-500/10 active:scale-[0.99] cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.488 1.449 5.412 1.451 5.428 0 9.842-4.414 9.845-9.84.001-2.63-1.019-5.101-2.871-6.956-1.851-1.854-4.312-2.875-6.942-2.876-5.432 0-9.848 4.413-9.852 9.84-.001 1.96.512 3.878 1.488 5.584l-.975 3.562 3.655-.959zm10.158-6.938c-.287-.143-1.696-.837-1.959-.933-.262-.096-.452-.143-.642.143-.19.287-.736.933-.903 1.124-.166.19-.333.215-.62.072-1.332-.667-2.28-1.157-3.09-2.545-.147-.25-.03-.386.08-.5.1-.102.215-.251.322-.376.107-.125.143-.215.215-.359.071-.143.036-.269-.018-.376-.053-.107-.452-1.088-.62-1.492-.162-.392-.326-.339-.452-.345-.117-.006-.25-.007-.382-.007-.132 0-.347.049-.529.247-.182.197-.694.678-.694 1.654s.71 1.916.81 2.047c.099.13 1.398 2.135 3.387 2.99.473.203.842.325 1.129.417.475.15.908.129 1.248.078.381-.058 1.696-.694 1.935-1.363.238-.668.238-1.24.167-1.363-.071-.122-.262-.215-.55-.358z"/>
                </svg>
                <span>Adquirir Licencia en WhatsApp</span>
              </a>
            </div>
          </div>

          {/* SHARED FOOTER FOR ACCREDITED LICENSING */}
          <div 
            onClick={() => {
              setAdminClicks(prev => {
                const next = prev + 1;
                if (next >= 5) {
                  setAdminEmailInput("liziumventasonline@gmail.com");
                  setShowAdminModal(true);
                  return 0;
                }
                return next;
              });
            }}
            className="pt-3 border-t border-slate-100 text-[10px] text-slate-400 leading-normal cursor-default select-none hover:text-slate-500 active:text-slate-600 transition-colors"
          >
            Licencia individual BabyChef. Todos los derechos reservados.
          </div>
        </div>

        {/* ================= ADMIN MANAGEMENT PANEL MODAL ================= */}
        {showAdminModal && (
          <div className="fixed inset-0 bg-black/65 flex items-center justify-center z-50 p-4 backdrop-blur-xs select-none">
            <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-3xl w-full max-w-[560px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200 text-left">
              
              {/* Modal Header */}
              <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  <div>
                    <h3 className="font-display font-bold text-sm">Administración BabyChef</h3>
                    <p className="text-[10px] opacity-85">Control de Autorizaciones de Clientes</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowAdminModal(false);
                    setAdminError("");
                    setAdminEmailInput("");
                    setAdminPasswordInput("");
                  }} 
                  className="p-1 hover:bg-white/15 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {/* 1. ADMIN LOGIN FORM IF NOT LOGGED IN */}
                {!isAdminLoggedIn ? (
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <p className="text-xs text-slate-500 leading-normal">
                      Por favor, introduce tu correo administrativo y la clave maestra de vendedor para acceder a la lista de clientes y autorizar sus ingresos.
                    </p>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                          Correo del Administrador
                        </label>
                        <input
                          type="email"
                          required
                          value={adminEmailInput}
                          onChange={e => setAdminEmailInput(e.target.value)}
                          className="w-full text-xs p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-800 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                          Clave Maestra de Activación (Master Key)
                        </label>
                        <input
                          type="password"
                          required
                          placeholder="••••••••••••••"
                          value={adminPasswordInput}
                          onChange={e => setAdminPasswordInput(e.target.value)}
                          className="w-full text-xs p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-800 dark:text-white font-mono"
                        />
                      </div>
                    </div>

                    {adminError && (
                      <p className="text-xs font-bold text-rose-500">⚠ {adminError}</p>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Ingresar al Panel Administrativo</span>
                    </button>
                  </form>
                ) : (
                  // 2. LOGGED IN MANAGEMENT PANEL VIEWS
                  <div className="space-y-5">
                    
                    {/* Success notification popup bar */}
                    {adminSuccessMessage && (
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-400 rounded-xl text-xs font-semibold flex items-center gap-1.5 animate-in fade-in duration-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>{adminSuccessMessage}</span>
                      </div>
                    )}

                    {/* Pre-Authorization addition section */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                        Pre-Autorizar Enlace o Código de Acceso Nuevo
                      </h4>
                      <form onSubmit={handleAdminAddClientSubmit} className="flex gap-2">
                        <input
                          type="text"
                          required
                          placeholder="ej: maria123, clave_secreta, pedro@correo.com..."
                          value={adminNewClientEmail}
                          onChange={e => setAdminNewClientEmail(e.target.value)}
                          className="flex-1 text-xs p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none text-slate-800 dark:text-white"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Pre-Autorizar</span>
                        </button>
                      </form>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5">
                        Registra aquí el código que usarás en el enlace (ej: si registras <code className="font-mono">maria123</code>, tu cliente accederá usando el enlace con <code className="font-mono">?acceso=maria123</code>). Al abrirlo por primera vez, se vinculará a su celular y nadie más podrá usar ese enlace.
                      </p>
                    </div>

                    {/* Searches/stats row */}
                    <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                      <div className="relative w-full sm:w-60">
                        <Search className="absolute left-3 w-3.5 h-3.5 text-slate-400 top-3" />
                        <input
                          type="text"
                          placeholder="Buscar cliente..."
                          value={adminQuery}
                          onChange={e => setAdminQuery(e.target.value)}
                          className="w-full text-xs pl-8.5 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none text-slate-800 dark:text-white"
                        />
                      </div>
                      
                      <div className="flex gap-4 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                        <span>Total: <strong>{adminRegistrations.length}</strong></span>
                        <span>Autorizados: <strong className="text-emerald-500">{adminRegistrations.filter(r => r.status === "authorized").length}</strong></span>
                        <span>Pendientes: <strong className="text-amber-500">{adminRegistrations.filter(r => r.status === "pending").length}</strong></span>
                      </div>
                    </div>

                    {/* Registered users list table */}
                    <div className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 max-h-[300px] overflow-y-auto">
                      {adminRegistrations.length === 0 ? (
                        <div className="p-8 text-center text-xs text-slate-400">
                          Ningún cliente registrado en el sistema todavía.
                        </div>
                      ) : (
                        adminRegistrations
                          .filter(r => r.email.includes(adminQuery.toLowerCase()))
                          .map((reg) => (
                            <div key={reg.email} className="p-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate max-w-xs block">
                                    {reg.email}
                                  </span>
                                  {reg.email === "liziumventasonline@gmail.com" && (
                                    <span className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 text-[8px] font-extrabold px-1.5 py-0.5 rounded-md uppercase">
                                      Creador
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500 flex-wrap">
                                  <span>Reg: {new Date(reg.registeredAt).toLocaleDateString()}</span>
                                  <span>•</span>
                                  <span className={reg.deviceId ? "text-slate-600 dark:text-slate-400" : "text-amber-500 font-semibold"}>
                                    {reg.deviceId ? `ID Celular: ${reg.deviceId.substring(0, 10)}...` : "Sin celular asociado"}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 justify-end">
                                {reg.email !== "liziumventasonline@gmail.com" && (
                                  <>
                                    {reg.status === "pending" ? (
                                      <button
                                        onClick={() => handleAdminUpdateStatus(reg.email, "authorize")}
                                        className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-[10px] font-extrabold transition-all cursor-pointer"
                                      >
                                        Autorizar
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => handleAdminUpdateStatus(reg.email, "revoke")}
                                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-[10px] font-extrabold transition-all cursor-pointer"
                                      >
                                        Revocar
                                      </button>
                                    )}

                                    {reg.deviceId && (
                                      <button
                                        onClick={() => handleAdminUpdateStatus(reg.email, "reset-device")}
                                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
                                        title="Liberar Celular (Permite vincular otro dispositivo)"
                                      >
                                        <RefreshCw className="w-3.5 h-3.5" />
                                      </button>
                                    )}

                                    <button
                                      onClick={() => {
                                        if (confirm(`¿Estás seguro de que deseas eliminar permanentemente a ${reg.email}?`)) {
                                          handleAdminUpdateStatus(reg.email, "delete");
                                        }
                                      }}
                                      className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-500 hover:text-rose-700 rounded-lg transition-colors cursor-pointer"
                                      title="Eliminar Cuenta"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          ))
                      )}
                    </div>

                    {/* Log out administrator option */}
                    <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={() => {
                          setIsAdminLoggedIn(false);
                          setAdminRegistrations([]);
                          setAdminPasswordInput("");
                        }}
                        className="text-xs text-rose-500 hover:text-rose-600 font-bold transition-all cursor-pointer"
                      >
                        Cerrar Sesión de Administrador
                      </button>
                      <button
                        onClick={() => setShowAdminModal(false)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
                      >
                        Cerrar Ventana
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

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
      <div className={`relative w-full md:max-w-[480px] h-[100dvh] md:h-[840px] md:rounded-[40px] md:shadow-2xl overflow-hidden border-0 md:border-[10px] flex flex-col transition-all ${
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

        {showOnboarding ? (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-between bg-gradient-to-b from-pink-50 via-white to-sky-50 dark:from-slate-950 dark:to-slate-900 animate-in fade-in duration-500 text-left">
            {/* Beautiful Custom Onboarding Form */}
            <form onSubmit={handleOnboardingSubmit} className="space-y-5 py-2">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-pink-100 dark:bg-pink-950/60 rounded-3xl flex items-center justify-center text-4xl mx-auto shadow-md">
                  👶
                </div>
                <h2 className="font-display font-extrabold text-xl text-slate-800 dark:text-white">¡Bienvenida, Mamita! 💕</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">Registra los datos de tu bebé para que adaptemos automáticamente su alimentación a la edad óptima.</p>
              </div>

              {/* Baby Photo Picker */}
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="relative group w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-pink-200 dark:border-slate-700 flex items-center justify-center text-slate-400 overflow-hidden shadow-xs">
                  {onboardingPhotoUrl ? (
                    <img src={onboardingPhotoUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-6 h-6 text-pink-400" />
                  )}
                  <label htmlFor="onboard-photo-input" className="absolute inset-0 bg-black/40 flex items-center justify-center text-[9px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    Subir foto
                  </label>
                </div>
                <input
                  type="file"
                  id="onboard-photo-input"
                  accept="image/*"
                  onChange={handleOnboardingPhotoChange}
                  className="hidden"
                />
                <span className="text-[10px] text-slate-400">Foto del bebé (opcional)</span>
              </div>

              {/* Form fields */}
              <div className="space-y-3.5">
                {/* --- SECCIÓN DE LICENCIA ORIGINAL (IDEA 3) --- */}
                <div className="bg-sky-500/10 dark:bg-sky-950/20 p-4 rounded-2xl border border-sky-200 dark:border-sky-800/80 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider">
                    <span className="text-sm">🔑</span>
                    <span>Activación de Licencia Original</span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Ingresa los datos del comprador original para registrar de forma permanente tu acceso en este celular.
                  </p>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">Nombre Completo del Comprador *</label>
                    <input
                      type="text"
                      required
                      value={onboardingClientName}
                      onChange={e => setOnboardingClientName(e.target.value)}
                      placeholder="Ej: María Rodríguez"
                      className="w-full text-xs p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 text-slate-800 dark:text-white shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">Correo Electrónico de Compra *</label>
                    <input
                      type="email"
                      required
                      value={onboardingClientEmail}
                      onChange={e => setOnboardingClientEmail(e.target.value)}
                      placeholder="Ej: maria@ejemplo.com"
                      className="w-full text-xs p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 text-slate-800 dark:text-white shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Nombre del bebé *</label>
                  <input
                    type="text"
                    required
                    value={newBabyName}
                    onChange={e => setNewBabyName(e.target.value)}
                    placeholder="Ej: Sofía, Mateo, Lucas..."
                    className="w-full text-xs p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-900 text-slate-800 dark:text-white shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Fecha de Nacimiento *</label>
                  <input
                    type="date"
                    required
                    value={newBabyBirth}
                    onChange={e => setNewBabyBirth(e.target.value)}
                    className="w-full text-xs p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-900 text-slate-800 dark:text-white shadow-xs"
                  />
                </div>

                {/* Growth entries row */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Peso (kg) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="Ej: 7.2"
                      value={newBabyWeight}
                      onChange={e => setNewBabyWeight(e.target.value)}
                      className="w-full text-xs p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-900 text-slate-800 dark:text-white shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Talla (cm) *</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      placeholder="Ej: 64"
                      value={newBabyHeight}
                      onChange={e => setNewBabyHeight(e.target.value)}
                      className="w-full text-xs p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-900 text-slate-800 dark:text-white shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">P. Cefálico (cm)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Ej: 41"
                      value={newBabyHeadCirc}
                      onChange={e => setNewBabyHeadCirc(e.target.value)}
                      className="w-full text-xs p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-900 text-slate-800 dark:text-white shadow-xs"
                    />
                  </div>
                </div>

                {/* Additional profile values */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Alergias (Opcional, separadas por coma)</label>
                  <input
                    type="text"
                    value={newBabyAllergies}
                    onChange={e => setNewBabyAllergies(e.target.value)}
                    placeholder="Ej: Huevo, Lácteos, Gluten..."
                    className="w-full text-xs p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-900 text-slate-800 dark:text-white shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Alimentos Restringidos (Estándar recomendado)</label>
                  <input
                    type="text"
                    value={newBabyRestrictions || "Sal, Azúcar, Miel, Leche entera"}
                    onChange={e => setNewBabyRestrictions(e.target.value)}
                    className="w-full text-xs p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-900 text-slate-800 dark:text-white shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Observaciones o notas pediátricas</label>
                  <textarea
                    value={newBabyObs}
                    onChange={e => setNewBabyObs(e.target.value)}
                    placeholder="Ej: Recomendado iniciar con purés suaves..."
                    className="w-full text-xs p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-900 text-slate-800 dark:text-white h-16 resize-none shadow-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-pink-500/20 transition-all transform hover:scale-102 flex items-center justify-center gap-1.5 cursor-pointer mt-4"
              >
                <span>Comenzar mi Aventura Culinaria 🧸✨</span>
              </button>
            </form>
          </div>
        ) : (
          <>
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
            {/* Pulsing Install Button */}
            {showInstallBtn && (
              <button
                onClick={handleInstallClick}
                className="px-2.5 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-[10px] sm:text-xs rounded-xl shadow-md shadow-emerald-500/20 flex items-center gap-1 transition-all border border-emerald-400/30 animate-pulse flex-shrink-0"
              >
                <span>📲 Instalar App</span>
              </button>
            )}

            {/* Darkmode toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-xl border transition-all flex-shrink-0 ${
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
                setActiveTab("dashboard");
                setActiveDashboardSubTab("crecimiento");
                setIsAddingBaby(true);
                setIsEditingBaby(false);
              }}
              className="px-2.5 py-1 rounded-full text-[10px] font-bold transition-all bg-white/60 dark:bg-slate-800 text-pink-500 border border-pink-100 dark:border-slate-700 hover:bg-pink-50 dark:hover:bg-slate-700 flex items-center gap-1 cursor-pointer"
              title="Añadir Bebé"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir</span>
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
                <div className="space-y-6">
                  {/* Beautiful Header Greeting Card */}
                  <div className={`p-5 rounded-3xl border transition-all flex flex-col sm:flex-row items-center justify-between gap-4 ${
                    isDarkMode 
                      ? "bg-slate-800 border-slate-700 shadow-xs" 
                      : "bg-gradient-to-br from-pink-50/80 via-sky-50/50 to-white border-pink-100/50 shadow-sm"
                  }`}>
                    <div className="space-y-2 text-left flex-1 w-full">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-pink-100 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300 rounded-full text-[10px] font-bold">
                        <Sparkles className="w-3 h-3 text-pink-500" />
                        <span>Consejo del día</span>
                      </div>
                      <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-800 dark:text-white">
                        ¡Hola, mamita de {activeBaby?.name || "tu bebé"}! 🍼
                      </h2>
                      <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm italic leading-relaxed">
                        &ldquo;{MOTIVATIONAL_QUOTES[quoteIndex]}&rdquo;
                      </p>
                      <div className="pt-1 text-xs text-slate-500 font-medium">
                        Tu bebé tiene actualmente <span className="text-emerald-600 dark:text-emerald-400 font-bold">{babyAge.text}</span>. Adaptamos las sugerencias de comida automáticamente.
                      </div>
                    </div>
                    {/* Big Baby Photo Avatar with dynamic selection */}
                    <div className="relative group w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-pink-300 via-sky-200 to-teal-200 flex items-center justify-center text-white shadow-lg ring-4 ring-pink-100 dark:ring-slate-700 flex-shrink-0 overflow-hidden">
                      {activeBaby?.photoUrl ? (
                        <img src={activeBaby.photoUrl} alt={activeBaby.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <span className="text-3xl">👶</span>
                      )}
                      
                      {/* Subir foto overlay button */}
                      <label htmlFor="dashboard-baby-photo" className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-[9px] text-white font-bold gap-1 text-center px-1">
                        <Camera className="w-4.5 h-4.5" />
                        <span>Subir Foto</span>
                      </label>
                      <input
                        type="file"
                        id="dashboard-baby-photo"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Exclusive Breastfeeding Guidelines Alert (Under 6 months support) */}
                  {babyAge.months < 6 && (
                    <div className="bg-emerald-500/10 dark:bg-emerald-950/20 border border-emerald-500/20 dark:border-emerald-500/30 p-4 rounded-2xl space-y-3 shadow-xs text-left">
                      <div className="flex gap-3">
                        <span className="text-3xl select-none">🍼</span>
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400">Etapa de Lactancia Exclusiva para {activeBaby?.name}</h4>
                          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                            {activeBaby?.name} tiene actualmente <strong>{babyAge.text}</strong>. De acuerdo con la OMS, los bebés menores de 6 meses no deben consumir sólidos.
                          </p>
                        </div>
                      </div>
                      <div className="pt-2.5 flex flex-col sm:flex-row items-center justify-between border-t border-emerald-500/10 gap-2">
                        <span className="text-[10px] text-slate-500 font-medium">¿Quieres planificar o explorar futuras recetas en advance?</span>
                        <button
                          onClick={() => setSimulateSixMonths(!simulateSixMonths)}
                          className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all border ${
                            simulateSixMonths
                              ? "bg-emerald-500 text-white border-emerald-400"
                              : "bg-white dark:bg-slate-800 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                          }`}
                        >
                          {simulateSixMonths ? "🔄 Desactivar Simulación" : "💡 Simular 6 Meses para ver recetas"}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Dynamic Dashboard Subtabs Navigation Selector */}
                  <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1.5 px-0.5 border-b border-slate-100 dark:border-slate-800 flex-shrink-0">
                    {[
                      { id: "recetario", label: "Recetario Seguro", icon: UtensilsCrossed, color: "text-emerald-500 bg-emerald-100/40 border-emerald-200 dark:bg-emerald-950/20" },
                      { id: "plan-24-semanas", label: "Plan 24 Semanas", icon: CalendarDays, color: "text-sky-500 bg-sky-100/40 border-sky-200 dark:bg-sky-950/20" },
                      { id: "desayunos", label: "Desayunos por Semanas", icon: Star, color: "text-pink-500 bg-pink-100/40 border-pink-200 dark:bg-pink-950/20" },
                      { id: "crecimiento", label: "Ficha & Crecimiento", icon: BarChart2, color: "text-purple-500 bg-purple-100/40 border-purple-200 dark:bg-purple-950/20" }
                    ].map(sub => {
                      const Icon = sub.icon;
                      const isSubActive = activeDashboardSubTab === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => setActiveDashboardSubTab(sub.id)}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all flex-shrink-0 cursor-pointer border ${
                            isSubActive
                              ? `${sub.color} shadow-xs font-extrabold border-slate-200 dark:border-slate-700`
                              : "bg-white/80 dark:bg-slate-800 border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{sub.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Subtab Contents Container */}
                  <div className="space-y-5">
                    
                    {/* SUBTAB 1: RECETARIO SEGURO */}
                    {activeDashboardSubTab === "recetario" && (
                      <div className="space-y-4 text-left">
                        {/* Search & Filter inside Dashboard */}
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-3">
                          <div className="flex flex-col sm:flex-row gap-2.5">
                            <div className="relative flex-1">
                              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                              <input
                                type="text"
                                placeholder="Buscar recetas aptas (ej. avena, puré)..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full text-xs pl-9 pr-8 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 text-slate-800 dark:text-white"
                              />
                              {searchQuery && (
                                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-3 text-slate-400">
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                            <select
                              value={attributeFilter}
                              onChange={e => setAttributeFilter(e.target.value)}
                              className="text-xs p-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            >
                              <option value="todos">Todos los atributos</option>
                              <option value="sin huevo">Sin Huevo</option>
                              <option value="sin leche">Sin Leche</option>
                              <option value="sin gluten">Sin Gluten</option>
                              <option value="sin azúcar">Sin Azúcar</option>
                              <option value="rica en hierro">Rica en Hierro</option>
                            </select>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {["Papilla", "Puré", "BLW", "Avena", "Crema"].map(tag => (
                              <button
                                key={tag}
                                onClick={() => setSearchQuery(tag)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all ${
                                  searchQuery.toLowerCase() === tag.toLowerCase()
                                    ? "bg-emerald-500 text-white"
                                    : "bg-slate-100 dark:bg-slate-700 text-slate-500 hover:bg-slate-200"
                                }`}
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Lock / Safe Age Explanatory Note Box */}
                        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 p-4 rounded-2xl flex gap-3 text-left">
                          <div className="text-xl">💡</div>
                          <div className="space-y-1">
                            <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400">Recetario Completo Habilitado</h4>
                            <p className="text-[10px] text-slate-500 leading-relaxed">
                              ¡Hemos desbloqueado todas las recetas para que las explores libremente! Podrás ver preparaciones de todas las edades. Las recetas y texturas ideales recomendadas para los <strong>{simulateSixMonths ? "6 meses de simulación" : babyAge.text}</strong> de tu pequeño se destacarán de forma automática para asegurar un crecimiento y desarrollo digestivo perfecto.
                            </p>
                          </div>
                        </div>

                        {/* Recipe Cards List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {filteredRecipes.map(recipe => {
                            const isFav = favorites.includes(recipe.id);
                            return (
                              <div
                                key={recipe.id}
                                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
                              >
                                <div className="p-4 space-y-3">
                                  <div className="flex justify-between items-start gap-2">
                                    <div className="space-y-0.5">
                                      <span className="text-[9px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                                        {recipe.ageRange}
                                      </span>
                                      <h4 className="text-sm font-bold text-slate-800 dark:text-white line-clamp-1">{recipe.name}</h4>
                                    </div>
                                    <button
                                      onClick={(e) => { e.stopPropagation(); handleToggleFavorite(recipe.id); }}
                                      className="p-1.5 bg-slate-50 dark:bg-slate-700 rounded-full hover:text-rose-500 text-slate-400"
                                    >
                                      <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-rose-500 text-rose-500" : ""}`} />
                                    </button>
                                  </div>
                                  <p className="text-xs text-slate-400 line-clamp-2">{recipe.steps[0]}</p>
                                  <div className="flex flex-wrap gap-1.5">
                                    <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-500 px-2 py-0.5 rounded-md">{recipe.texture}</span>
                                    <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-500 px-2 py-0.5 rounded-md">{recipe.prepTime + recipe.cookTime} min</span>
                                  </div>
                                </div>
                                <div className="p-3 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700/60">
                                  <button
                                    onClick={() => handleLogRecipeView(recipe.id)}
                                    className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1"
                                  >
                                    <span>Ver Modo de Preparación</span>
                                    <ChevronRight className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}

                          {filteredRecipes.length === 0 && (
                            <div className="col-span-full py-12 px-4 text-center bg-white dark:bg-slate-800 border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-slate-400">
                              <p className="text-xs font-semibold">No se encontraron recetas adecuadas para este filtro.</p>
                              <p className="text-[10px] mt-1">Prueba limpiando la búsqueda o seleccionando otro atributo.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* SUBTAB 2: PLAN PROGRESIVO DE 24 SEMANAS CON LISTA DE COMPRAS */}
                    {activeDashboardSubTab === "plan-24-semanas" && (
                      <div className="space-y-5 text-left">
                        {/* Progressive Week Carousel (Weeks 1 to 24) */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Elige la Semana de Progreso (1 - 24):</label>
                          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 px-0.5">
                            {Array.from({ length: 24 }, (_, i) => i + 1).map(weekNum => {
                              const isSelected = weekProgressSelected === weekNum;
                              return (
                                <button
                                  key={weekNum}
                                  onClick={() => setWeekProgressSelected(weekNum)}
                                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer border ${
                                    isSelected
                                      ? "bg-sky-500 border-sky-400 text-white shadow-xs font-extrabold"
                                      : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500 hover:bg-slate-100"
                                  }`}
                                >
                                  Semana {weekNum}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Dynamic Weekly Menu Logic */}
                        {(() => {
                          const weeklyMenu = generateMenuForWeek(RECIPES_DB, effectiveAgeMonths, weekProgressSelected);
                          const days = Object.keys(weeklyMenu);
                          const shoppingListItems = generateShoppingListFromMenu(weeklyMenu, RECIPES_DB);
                          const weekKey = `${activeBabyId}_w${weekProgressSelected}`;

                          const handleToggleWeekShoppingCheck = (itemName: string) => {
                            setWeekShoppingChecked(prev => {
                              const currentWeekChecks = prev[weekKey] || {};
                              const updatedWeekChecks = {
                                ...currentWeekChecks,
                                [itemName]: !currentWeekChecks[itemName]
                              };
                              return {
                                ...prev,
                                [weekKey]: updatedWeekChecks
                              };
                            });
                          };

                          return (
                            <div className="space-y-5">
                              {/* Descriptive Guidance Banner */}
                              <div className="bg-sky-50 dark:bg-sky-950/20 p-4 rounded-2xl border border-sky-100/50 dark:border-sky-900/30 space-y-1">
                                <h4 className="text-xs font-bold text-sky-800 dark:text-sky-400">Nutrición de la Semana {weekProgressSelected}</h4>
                                <p className="text-[10px] text-slate-500 leading-relaxed">
                                  Plan progresivo diseñado para la edad de {activeBaby?.name} (<strong>{simulateSixMonths ? "6 meses de simulación" : babyAge.text}</strong>). Cada semana introduce sabores complementarios saludables de forma segura.
                                </p>
                              </div>

                              {/* Days Weekly List Calendar Grid */}
                              <div className="space-y-4">
                                {days.map(dayName => {
                                  const dayMenu = weeklyMenu[dayName];
                                  return (
                                    <div key={dayName} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-3">
                                      <div className="flex items-center justify-between border-b pb-1.5 border-slate-100 dark:border-slate-700">
                                        <span className="text-xs font-extrabold text-slate-800 dark:text-white uppercase tracking-wider">{dayName}</span>
                                        <span className="text-[9px] text-slate-400 font-bold">Semana {weekProgressSelected}</span>
                                      </div>

                                      {/* Meals Slots */}
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                        {[
                                          { slotLabel: "🥣 Desayuno", keyName: "breakfast" },
                                          { slotLabel: "🍎 Colación", keyName: "morningSnack" },
                                          { slotLabel: "🍲 Almuerzo", keyName: "lunch" },
                                          { slotLabel: "🍌 Merienda", keyName: "afternoonSnack" },
                                          { slotLabel: "🥦 Cena", keyName: "dinner" }
                                        ].map(slot => {
                                          const mealSlot = dayMenu[slot.keyName as keyof typeof dayMenu];
                                          if (!mealSlot || !mealSlot.recipeId) return null;
                                          const recipe = RECIPES_DB.find(r => r.id === mealSlot.recipeId);
                                          if (!recipe) return null;

                                          return (
                                            <div
                                              key={slot.slotLabel}
                                              onClick={() => handleLogRecipeView(recipe.id)}
                                              className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-900/40 rounded-xl hover:bg-sky-50/40 dark:hover:bg-slate-900 border border-transparent hover:border-sky-100/30 transition-all cursor-pointer group"
                                            >
                                              <div className="space-y-0.5 text-left">
                                                <span className="text-[9px] text-slate-400 font-bold block">{slot.slotLabel}</span>
                                                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 line-clamp-1 group-hover:text-sky-600 transition-colors">
                                                  {recipe.name}
                                                </span>
                                              </div>
                                              <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Shopping List checklist calculated for the chosen week */}
                              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-4">
                                <div className="flex justify-between items-center border-b pb-2.5 border-slate-100 dark:border-slate-700">
                                  <div>
                                    <h3 className="font-display font-bold text-sm text-slate-800 dark:text-white flex items-center gap-1.5">
                                      <ShoppingCart className="w-4 h-4 text-sky-400" />
                                      Lista de Compras de la Semana {weekProgressSelected}
                                    </h3>
                                    <p className="text-[10px] text-slate-400">Ingredientes necesarios para cocinar el menú de esta semana</p>
                                  </div>
                                  <span className="text-[10px] bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 px-2 py-0.5 rounded-full font-bold">
                                    {shoppingListItems.length} ingredientes
                                  </span>
                                </div>

                                {shoppingListItems.length > 0 ? (
                                  <div className="space-y-2">
                                    {shoppingListItems.map(item => {
                                      const isChecked = !!weekShoppingChecked[weekKey]?.[item.name];
                                      return (
                                        <div
                                          key={item.name}
                                          onClick={() => handleToggleWeekShoppingCheck(item.name)}
                                          className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-900/30 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 border border-transparent transition-all cursor-pointer"
                                        >
                                          <div className="flex items-center gap-2.5 text-left">
                                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all flex-shrink-0 ${
                                              isChecked
                                                ? "bg-sky-500 border-sky-400 text-white"
                                                : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                                            }`}>
                                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                            </div>
                                            <span className={`text-xs font-semibold ${isChecked ? "text-slate-400 line-through font-normal" : "text-slate-700 dark:text-slate-200"}`}>
                                              {item.name}
                                            </span>
                                          </div>
                                          <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full flex-shrink-0">
                                            {item.category}
                                          </span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  <p className="text-xs text-slate-400 py-4 text-center">No se requieren compras para esta semana.</p>
                                )}
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}

                    {/* SUBTAB 3: RECETARIO DE DESAYUNOS POR SEMANAS */}
                    {activeDashboardSubTab === "desayunos" && (
                      <div className="space-y-5 text-left">
                        <div className="bg-pink-50/50 dark:bg-pink-950/10 p-4 rounded-2xl border border-pink-100/40 text-left space-y-1">
                          <h4 className="text-xs font-bold text-pink-700 dark:text-pink-400">Recetario de Desayunos Saludables (Semanas 1-24)</h4>
                          <p className="text-[10px] text-slate-500 leading-relaxed">
                            Sugerencias de desayunos nutritivos organizados semana por semana para el desarrollo madurativo de tu bebé.
                          </p>
                        </div>

                        {/* Breakfast Weekly Suggestions Feed */}
                        <div className="space-y-4">
                          {(() => {
                            // Find safe breakfasts
                            const safeBreakfasts = RECIPES_DB.filter(recipe => {
                              return recipe.category === "desayuno" || recipe.category === "lonchera";
                            });

                            if (safeBreakfasts.length === 0) {
                              return (
                                <div className="p-12 text-center text-slate-400 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                                  <span className="text-4xl block">🍼</span>
                                  <p className="text-xs font-semibold mt-2">Lactancia exclusiva</p>
                                  <p className="text-[10px] mt-1">Usa la simulación de 6 meses arriba para explorar desayunos complementarios futuros.</p>
                                </div>
                              );
                            }

                            return Array.from({ length: 24 }, (_, i) => i + 1).map(weekNum => {
                              // Select breakfast recipe deterministically
                              const breakfastRecipe = safeBreakfasts[(weekNum * 5) % safeBreakfasts.length];
                              const isFav = favorites.includes(breakfastRecipe.id);
                              
                              return (
                                <div
                                  key={weekNum}
                                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs overflow-hidden flex flex-col justify-between"
                                >
                                  <div className="p-4 space-y-3">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <span className="text-[9px] bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider block w-fit">
                                          Semana {weekNum}
                                        </span>
                                        <h4 className="text-sm font-bold text-slate-800 dark:text-white mt-1 flex items-center gap-1.5">
                                          🥣 {breakfastRecipe.name}
                                        </h4>
                                      </div>
                                      
                                      <button
                                        onClick={() => handleToggleFavorite(breakfastRecipe.id)}
                                        className="p-1.5 bg-slate-50 dark:bg-slate-700 rounded-full hover:text-rose-500 text-slate-400"
                                      >
                                        <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-rose-500 text-rose-500" : ""}`} />
                                      </button>
                                    </div>

                                    {/* Info Summary */}
                                    <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 font-medium">
                                      <div className="p-2 bg-slate-50 dark:bg-slate-900/30 rounded-lg">
                                        ⏱️ Preparación: <strong className="text-slate-700 dark:text-slate-200">{breakfastRecipe.prepTime + breakfastRecipe.cookTime} min</strong>
                                      </div>
                                      <div className="p-2 bg-slate-50 dark:bg-slate-900/30 rounded-lg">
                                        🥣 Textura: <strong className="text-slate-700 dark:text-slate-200">{breakfastRecipe.texture}</strong>
                                      </div>
                                    </div>

                                    {/* Brief Ingredients Preview List */}
                                    <div className="space-y-1">
                                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Ingredientes básicos:</span>
                                      <div className="flex flex-wrap gap-1">
                                        {breakfastRecipe.ingredients.map((ing, idx) => (
                                          <span key={idx} className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md">
                                            {ing}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Action Bar */}
                                  <div className="p-3 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700/60">
                                    <button
                                      onClick={() => handleLogRecipeView(breakfastRecipe.id)}
                                      className="w-full py-2.5 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                                    >
                                      <span>Ver Receta y Modo de Preparación</span>
                                      <ChevronRight className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              );
                            });
                          })()}
                        </div>
                      </div>
                    )}

                    {/* SUBTAB 4: FICHA DE SALUD & SEGUIMIENTO DE CRECIMIENTO */}
                    {activeDashboardSubTab === "crecimiento" && (
                      <div className="space-y-5 text-left">
                        {isAddingBaby ? (
                          /* --- FORM: NUEVO BEBE --- */
                          <form onSubmit={handleAddBabyProfile} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-emerald-200 dark:border-slate-700 shadow-xs space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                            <div className="flex justify-between items-center mb-1 border-b pb-2.5 border-slate-100 dark:border-slate-700">
                              <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                                <Plus className="w-4 h-4 text-emerald-500" /> Nuevo Perfil de Bebé
                              </h4>
                              <button onClick={() => setIsAddingBaby(false)} type="button" className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nombre *</label>
                                <input
                                  type="text"
                                  value={newBabyName}
                                  onChange={e => setNewBabyName(e.target.value)}
                                  placeholder="Ej: Sofía"
                                  className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-400 text-slate-800 dark:text-white"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Fecha de Nacimiento *</label>
                                <input
                                  type="date"
                                  value={newBabyBirth}
                                  onChange={e => setNewBabyBirth(e.target.value)}
                                  className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-400 text-slate-800 dark:text-white"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Alergias (separadas por comas)</label>
                                <input
                                  type="text"
                                  value={newBabyAllergies}
                                  onChange={e => setNewBabyAllergies(e.target.value)}
                                  placeholder="Ej: Huevo, Lácteos, Gluten"
                                  className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-400 text-slate-800 dark:text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Preferencias (separadas por comas)</label>
                                <input
                                  type="text"
                                  value={newBabyPrefs}
                                  onChange={e => setNewBabyPrefs(e.target.value)}
                                  placeholder="Ej: Plátano, Aguacate, Calabaza"
                                  className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-400 text-slate-800 dark:text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Alimentos Restringidos (separadas por comas)</label>
                                <input
                                  type="text"
                                  value={newBabyRestrictions}
                                  onChange={e => setNewBabyRestrictions(e.target.value)}
                                  placeholder="Ej: Sal, Azúcar, Miel"
                                  className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-400 text-slate-800 dark:text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Observaciones</label>
                                <textarea
                                  value={newBabyObs}
                                  onChange={e => setNewBabyObs(e.target.value)}
                                  placeholder="Ej: Iniciar con texturas blandas, le encantan las frutas."
                                  className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-400 h-16 text-slate-800 dark:text-white"
                                />
                              </div>
                            </div>
                            <div className="flex gap-2 pt-2">
                              <button
                                type="button"
                                onClick={() => setIsAddingBaby(false)}
                                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                              >
                                Cancelar
                              </button>
                              <button
                                type="submit"
                                className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                              >
                                Crear Perfil
                              </button>
                            </div>
                          </form>
                        ) : isEditingBaby ? (
                          /* --- FORM: EDITAR PERFIL --- */
                          <form onSubmit={handleSaveEditBaby} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-sky-200 dark:border-slate-700 shadow-xs space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                            <div className="flex justify-between items-center mb-1 border-b pb-2.5 border-slate-100 dark:border-slate-700">
                              <h4 className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider flex items-center gap-1">
                                <Edit3 className="w-4 h-4 text-sky-500" /> Editar Perfil de {activeBaby?.name}
                              </h4>
                              <button onClick={() => setIsEditingBaby(false)} type="button" className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="space-y-3">
                              {/* --- PHOTO EDIT FIELD --- */}
                              <div className="flex flex-col items-center justify-center p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl gap-2 border border-slate-100 dark:border-slate-700/60">
                                <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Foto del Bebé</span>
                                <div className="relative group w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 border-2 border-dashed border-sky-300 dark:border-slate-600 flex items-center justify-center text-slate-400 overflow-hidden shadow-xs">
                                  {editBabyPhotoUrl ? (
                                    <img src={editBabyPhotoUrl} alt="Preview" className="w-full h-full object-cover" />
                                  ) : (
                                    <Camera className="w-5 h-5 text-sky-400" />
                                  )}
                                  <label htmlFor="edit-photo-input" className="absolute inset-0 bg-black/40 flex items-center justify-center text-[9px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    Cambiar
                                  </label>
                                </div>
                                <input
                                  type="file"
                                  id="edit-photo-input"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setEditBabyPhotoUrl(reader.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                  }}
                                  className="hidden"
                                />
                                <div className="flex gap-2">
                                  <label htmlFor="edit-photo-input" className="text-[10px] font-bold text-sky-500 hover:underline cursor-pointer">
                                    Subir nueva foto
                                  </label>
                                  {editBabyPhotoUrl && (
                                    <>
                                      <span className="text-slate-300 dark:text-slate-600">|</span>
                                      <button 
                                        type="button" 
                                        onClick={() => setEditBabyPhotoUrl("")}
                                        className="text-[10px] font-bold text-rose-500 hover:underline cursor-pointer"
                                      >
                                        Quitar foto
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>

                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nombre *</label>
                                <input
                                  type="text"
                                  value={editBabyName}
                                  onChange={e => setEditBabyName(e.target.value)}
                                  className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-400 text-slate-800 dark:text-white"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Fecha de Nacimiento *</label>
                                <input
                                  type="date"
                                  value={editBabyBirth}
                                  onChange={e => setEditBabyBirth(e.target.value)}
                                  className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-400 text-slate-800 dark:text-white"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Alergias (separadas por comas)</label>
                                <input
                                  type="text"
                                  value={editBabyAllergies}
                                  onChange={e => setEditBabyAllergies(e.target.value)}
                                  className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-400 text-slate-800 dark:text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Preferencias (separadas por comas)</label>
                                <input
                                  type="text"
                                  value={editBabyPrefs}
                                  onChange={e => setEditBabyPrefs(e.target.value)}
                                  className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-400 text-slate-800 dark:text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Alimentos Restringidos (separadas por comas)</label>
                                <input
                                  type="text"
                                  value={editBabyRestrictions}
                                  onChange={e => setEditBabyRestrictions(e.target.value)}
                                  className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-400 text-slate-800 dark:text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Observaciones</label>
                                <textarea
                                  value={editBabyObs}
                                  onChange={e => setEditBabyObs(e.target.value)}
                                  className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-400 h-16 text-slate-800 dark:text-white"
                                />
                              </div>
                            </div>
                            <div className="flex gap-2 pt-2">
                              <button
                                type="button"
                                onClick={() => setIsEditingBaby(false)}
                                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                              >
                                Cancelar
                              </button>
                              <button
                                type="submit"
                                className="flex-1 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                              >
                                Guardar Cambios
                              </button>
                            </div>
                          </form>
                        ) : (
                          <>
                            {/* Presentation Card */}
                            <div className={`p-5 rounded-3xl border transition-all ${
                              isDarkMode 
                                ? "bg-slate-800 border-slate-700 shadow-xs" 
                                : "bg-white border-pink-100 shadow-sm"
                            } space-y-4`}>
                              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-3 border-slate-100 dark:border-slate-700 gap-3">
                                <div className="flex items-center gap-2.5">
                                  <div className="p-2 bg-pink-100/50 dark:bg-pink-950/60 rounded-2xl flex-shrink-0">
                                    <User className="w-5 h-5 text-pink-500" />
                                  </div>
                                  <div>
                                    <h3 className="font-display font-bold text-sm text-slate-800 dark:text-white">
                                      Perfil de {activeBaby?.name}
                                    </h3>
                                    <p className="text-[10px] text-slate-400">Ficha médica y requerimientos especiales</p>
                                  </div>
                                </div>
                                
                                {/* Actions Header */}
                                <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                                  <label 
                                    htmlFor="dashboard-baby-photo-btn"
                                    className="px-2.5 py-1.5 bg-sky-50 hover:bg-sky-100 dark:bg-slate-700 dark:hover:bg-slate-600 text-sky-700 dark:text-sky-300 text-[10px] font-bold rounded-lg flex items-center gap-1 cursor-pointer border border-sky-100 dark:border-transparent transition-all"
                                  >
                                    <Camera className="w-3.5 h-3.5" />
                                    <span>Subir Foto</span>
                                  </label>
                                  <input
                                    type="file"
                                    id="dashboard-baby-photo-btn"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    className="hidden"
                                  />

                                  <button
                                    onClick={() => {
                                      handleStartEditBaby();
                                    }}
                                    className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 dark:bg-slate-700 dark:hover:bg-slate-600 text-amber-700 dark:text-amber-300 text-[10px] font-bold rounded-lg flex items-center gap-1 cursor-pointer border border-amber-100 dark:border-transparent transition-all"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                    <span>Editar</span>
                                  </button>

                                  <button
                                    onClick={() => {
                                      setIsAddingBaby(true);
                                      setIsEditingBaby(false);
                                    }}
                                    className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-slate-700 dark:hover:bg-slate-600 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold rounded-lg flex items-center gap-1 cursor-pointer border border-emerald-100 dark:border-transparent transition-all"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>Nuevo</span>
                                  </button>

                                  <button
                                    onClick={handleDeleteBaby}
                                    className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 dark:bg-slate-700 dark:hover:bg-slate-600 text-rose-700 dark:text-rose-300 text-[10px] font-bold rounded-lg flex items-center gap-1 cursor-pointer border border-rose-100 dark:border-transparent transition-all"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Eliminar</span>
                                  </button>
                                </div>
                              </div>

                              {/* Profile Stats Grid (Baby Card Details) */}
                              <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-pink-50/40 dark:bg-slate-900/40 rounded-xl border border-pink-100/10 text-left space-y-0.5">
                                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">
                                    📅 Nacimiento
                                  </span>
                                  <p className="text-xs font-bold text-slate-800 dark:text-white">
                                    {activeBaby?.birthDate ? parseDateLocal(activeBaby.birthDate).toLocaleDateString("es-ES", {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric"
                                    }) : "—"}
                                  </p>
                                </div>

                                <div className="p-3 bg-sky-50/40 dark:bg-slate-900/40 rounded-xl border border-sky-100/10 text-left space-y-0.5">
                                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">
                                    ⚖️ Último Peso
                                  </span>
                                  <p className="text-xs font-bold text-slate-800 dark:text-white">
                                    {activeGrowthEntries.length > 0 
                                      ? `${[...activeGrowthEntries].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0].weight} kg`
                                      : "—"}
                                  </p>
                                </div>

                                <div className="p-3 bg-teal-50/40 dark:bg-slate-900/40 rounded-xl border border-teal-100/10 text-left space-y-0.5">
                                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">
                                    📏 Última Altura
                                  </span>
                                  <p className="text-xs font-bold text-slate-800 dark:text-white">
                                    {activeGrowthEntries.length > 0 
                                      ? `${[...activeGrowthEntries].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0].height} cm`
                                      : "—"}
                                  </p>
                                </div>

                                <div className="p-3 bg-purple-50/40 dark:bg-slate-900/40 rounded-xl border border-purple-100/10 text-left space-y-0.5">
                                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">
                                    🧠 Perím. Cefálico
                                  </span>
                                  <p className="text-xs font-bold text-slate-800 dark:text-white">
                                    {activeGrowthEntries.length > 0 && [...activeGrowthEntries].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0].headCircumference
                                      ? `${[...activeGrowthEntries].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0].headCircumference} cm`
                                      : "—"}
                                  </p>
                                </div>
                              </div>

                              {/* Allergies and restricted items lists inside profile presentation */}
                              <div className="space-y-2.5 pt-1">
                                {/* Allergies row */}
                                <div className="p-3 bg-red-50/30 dark:bg-red-950/10 rounded-xl border border-red-100/20 text-left space-y-1">
                                  <h4 className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wide flex items-center gap-1">
                                    ⚠️ Alergias Registradas
                                  </h4>
                                  <div className="flex flex-wrap gap-1">
                                    {activeBaby?.allergies && activeBaby.allergies.length > 0 ? (
                                      activeBaby.allergies.map(alg => (
                                        <span key={alg} className="text-[9px] bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 px-2 py-0.5 rounded-md font-bold">
                                          {alg}
                                        </span>
                                      ))
                                    ) : (
                                      <span className="text-[10px] text-slate-400">Sin alergias registradas</span>
                                    )}
                                  </div>
                                </div>

                                {/* Restrictions row */}
                                <div className="p-3 bg-amber-50/30 dark:bg-amber-950/10 rounded-xl border border-amber-100/20 text-left space-y-1">
                                  <h4 className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide flex items-center gap-1">
                                    🚫 Alimentos Restringidos
                                  </h4>
                                  <div className="flex flex-wrap gap-1">
                                    {activeBaby?.restrictedFoods && activeBaby.restrictedFoods.length > 0 ? (
                                      activeBaby.restrictedFoods.map(food => (
                                        <span key={food} className="text-[9px] bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-md font-bold">
                                          {food}
                                        </span>
                                      ))
                                    ) : (
                                      <span className="text-[10px] text-slate-400">Ninguno restringido</span>
                                    )}
                                  </div>
                                </div>

                                {/* Preferences row */}
                                <div className="p-3 bg-emerald-50/30 dark:bg-emerald-950/10 rounded-xl border border-emerald-100/20 text-left space-y-1">
                                  <h4 className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide flex items-center gap-1">
                                    ⭐ Preferencias o Favoritos
                                  </h4>
                                  <div className="flex flex-wrap gap-1">
                                    {activeBaby?.preferences && activeBaby.preferences.length > 0 ? (
                                      activeBaby.preferences.map(pref => (
                                        <span key={pref} className="text-[9px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-md font-bold">
                                          {pref}
                                        </span>
                                      ))
                                    ) : (
                                      <span className="text-[10px] text-slate-400">Sin preferencias guardadas</span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Pediatric observations block */}
                              {activeBaby?.observations && (
                                <div className="p-3 bg-slate-50/50 dark:bg-slate-900/30 rounded-xl border border-slate-100 dark:border-slate-800 text-left">
                                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">
                                    📝 Notas / Observaciones Especiales
                                  </span>
                                  <p className="text-[11px] text-slate-600 dark:text-slate-300 italic">
                                    &ldquo;{activeBaby.observations}&rdquo;
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Purchaser License Details Card (Idea 3 and 4) */}
                            <div className={`p-5 rounded-3xl border transition-all ${
                              isDarkMode 
                                ? "bg-slate-800 border-slate-700 shadow-xs" 
                                : "bg-emerald-500/5 border-emerald-100 shadow-xs"
                            } space-y-4`}>
                              <div className="flex justify-between items-center border-b pb-3 border-emerald-500/10 gap-3 text-left">
                                <div className="flex items-center gap-2">
                                  <div className="p-2 bg-emerald-100 dark:bg-emerald-950 rounded-2xl flex-shrink-0">
                                    <span className="text-emerald-600 text-sm">🛡️</span>
                                  </div>
                                  <div>
                                    <h3 className="font-display font-bold text-sm text-slate-800 dark:text-white">
                                      Licencia y Activación Original
                                    </h3>
                                    <p className="text-[10px] text-slate-400">Datos registrados del titular de la compra</p>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-3 text-xs text-left">
                                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
                                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">
                                    Comprador de la Licencia
                                  </span>
                                  <p className="text-xs font-bold text-slate-800 dark:text-white uppercase">
                                    {clientName || "Sin registrar"}
                                  </p>
                                </div>

                                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
                                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">
                                    Correo de Compra Autorizado
                                  </span>
                                  <p className="text-xs font-bold text-slate-800 dark:text-white">
                                    {clientEmail || "Sin registrar"}
                                  </p>
                                </div>

                                <div className="bg-emerald-500/10 dark:bg-emerald-950/30 p-3 rounded-2xl border border-emerald-500/20 text-[10px] text-slate-600 dark:text-slate-300 leading-relaxed space-y-2">
                                  <p>
                                    💡 <strong>Nota de Seguridad:</strong> Tu nombre y correo electrónico se muestran permanentemente en el banner de seguridad de la parte inferior para proteger tu licencia personal. No reenvíes ni compartas tu enlace de acceso único con personas ajenas a tu hogar.
                                  </p>
                                  <div className="flex justify-end pt-1">
                                    <button 
                                      onClick={() => {
                                        const newName = prompt("Ingresa el Nombre Completo del Comprador original:", clientName);
                                        if (newName === null) return;
                                        const newEmail = prompt("Ingresa el Correo Electrónico de Compra:", clientEmail);
                                        if (newEmail === null) return;
                                        
                                        if (newName.trim() && newEmail.trim()) {
                                          localStorage.setItem("babychef_client_name", newName.trim());
                                          localStorage.setItem("babychef_client_email", newEmail.trim().toLowerCase());
                                          setClientName(newName.trim());
                                          setClientEmail(newEmail.trim().toLowerCase());
                                          alert("Datos de la licencia actualizados con éxito.");
                                        } else {
                                          alert("El nombre y correo electrónico son obligatorios.");
                                        }
                                      }}
                                      className="text-[10px] text-sky-600 hover:text-sky-700 font-extrabold cursor-pointer hover:underline flex items-center gap-1"
                                    >
                                      📝 Modificar Datos de Licencia
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Growth chart curves */}
                            <div className="space-y-2">
                              <div className="flex justify-between items-center px-1">
                                <h3 className="font-display font-bold text-md text-slate-800 dark:text-white">Curvas de Crecimiento Oficiales</h3>
                                <span className="text-[10px] bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 px-2 py-0.5 rounded-full font-bold">
                                  Carnet de Vacunación 📊
                                </span>
                              </div>

                              <GrowthChart
                                entries={activeGrowthEntries}
                                onAddEntry={handleAddGrowthEntry}
                                onDeleteEntry={handleDeleteGrowthEntry}
                                birthDate={activeBaby?.birthDate}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    )}

                  </div>
                </div>
              )}

              {/* --- VIEW: RECIPES (CATALOGUE & SEARCH) --- */}
              {activeTab === "recipes" && (
                <div className="space-y-5 text-left">
                  {/* Explanatory note box explaining the safe growth lock/unlock system */}
                  <div className="bg-emerald-500/10 dark:bg-emerald-950/20 border border-emerald-500/20 dark:border-emerald-500/30 p-4 rounded-2xl flex gap-3.5 shadow-xs">
                    <span className="text-2xl select-none mt-0.5">💡</span>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400">Nutrición & Recetario Completo</h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                        ¡Hemos habilitado todo el catálogo de recetas! Puedes ver y buscar libremente cualquier plato. Ten en cuenta que la edad sugerida (ej. 6m, 9m, 12m) se indica en cada tarjeta para guiarte en el desarrollo de texturas seguras conforme crece tu pequeño (hoy: <strong>{babyAge.text}</strong>).
                      </p>
                    </div>
                  </div>

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
                        className="text-sm p-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
                      >
                        <option value="todos">Cualquier Edad</option>
                        <option value="6 meses">6 meses</option>
                        <option value="9 meses">9 meses</option>
                        <option value="12 meses">12 meses</option>
                        <option value="18 meses">18 meses</option>
                        <option value="24 meses">24 meses (2 años)</option>
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
                      <div className="col-span-full py-16 px-4 text-center text-slate-400 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                        {babyAge.months < 6 ? (
                          <div className="space-y-3 max-w-sm mx-auto">
                            <span className="text-4xl block">🍼</span>
                            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">Lactancia Exclusiva o Fórmula</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                              {activeBaby?.name} tiene <strong>{babyAge.text}</strong>. De acuerdo con la OMS, los bebés menores de 6 meses no deben consumir alimentos sólidos ni papillas todavía. 
                            </p>
                            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-100/10">
                              Las recetas se desbloquearán automáticamente cuando cumpla los 6 meses de edad.
                            </p>
                          </div>
                        ) : (
                          <>
                            <Search className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                            <p className="text-sm font-semibold">No se encontraron recetas.</p>
                            <p className="text-xs text-slate-400 mt-1">Prueba con ingredientes más genéricos o limpia los filtros.</p>
                          </>
                        )}
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
                  {/* Feeding Category Indicator Card */}
                  {(() => {
                    const category = getFeedingCategory(babyAge.months);
                    return (
                      <div className={`p-5 rounded-2xl border transition-all ${category.color} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm`}>
                        <div className="space-y-1.5 text-left flex-1">
                          <h3 className="font-display font-bold text-sm sm:text-md flex items-center gap-2">
                            <UtensilsCrossed className="w-4 h-4" />
                            {category.title}
                          </h3>
                          <p className="text-xs opacity-90 leading-relaxed">
                            {category.desc}
                          </p>
                          <div className="text-[10px] opacity-80 font-semibold">
                            Alimentación recomendada adaptada automáticamente para <span className="underline">{activeBaby?.name}</span> ({babyAge.text}).
                          </div>
                        </div>
                        <button
                          onClick={handleGenerateWeeklyMenu}
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-500/10 flex items-center gap-1.5 self-stretch sm:self-auto justify-center cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5 animate-spin-reverse" />
                          <span>Regenerar Menú</span>
                        </button>
                      </div>
                    );
                  })()}

                  {/* Header Title with explanatory context */}
                  <div className="px-1 text-left space-y-1">
                    <h2 className="font-display font-bold text-lg text-slate-800 dark:text-white">Plan de Alimentación de esta Semana</h2>
                    <p className="text-xs text-slate-400">Nutrición balanceada autogenerada para el desarrollo de tu bebé. Haz clic en cualquier plato para ver la receta detallada.</p>
                  </div>

                  {Object.keys(mealPlan).length > 0 ? (
                    <div className="space-y-4">
                      {Object.entries(mealPlan).map(([day, menu]) => (
                        <div key={day} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                          <div className="col-span-1 border-r border-slate-100 dark:border-slate-700 pr-2 text-left">
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
                                className={`col-span-1 p-3 rounded-xl border transition-all cursor-pointer text-left ${
                                  recipe
                                    ? "bg-emerald-50/20 hover:bg-emerald-50/50 border-emerald-100/50"
                                    : "bg-slate-50/50 border-slate-100"
                                }`}
                              >
                                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block mb-1">{label}</span>
                                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 line-clamp-2">
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
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 sm:p-8 rounded-3xl text-white shadow-xs">
                        <h2 className="font-display font-bold text-xl sm:text-2xl mb-1">Guías Educativas para Mamás Primerizas</h2>
                        <p className="text-xs sm:text-sm text-emerald-100">Información avalada por pediatras para guiarte en el BLW, papillas y prevención de alergias.</p>
                      </div>

                      {/* Selector de subpestañas */}
                      <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl w-fit border border-slate-200/50 dark:border-slate-700">
                        <button
                          onClick={() => setGuidesSubTab("articles")}
                          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                            guidesSubTab === "articles"
                              ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs"
                              : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                          }`}
                        >
                          <BookOpen className="w-3.5 h-3.5" /> Artículos Educativos
                        </button>
                        <button
                          onClick={() => setGuidesSubTab("faq")}
                          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                            guidesSubTab === "faq"
                              ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs"
                              : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                          }`}
                        >
                          <MessageSquare className="w-3.5 h-3.5" /> Preguntas Frecuentes (FAQ)
                        </button>
                      </div>

                      {guidesSubTab === "articles" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
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
                      ) : (
                        <div className="space-y-4 animate-in fade-in duration-300">
                          {FAQ_DB.map(faq => (
                            <details
                              key={faq.id}
                              className="group bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs cursor-pointer transition-all [&_summary::-webkit-details-marker]:hidden"
                            >
                              <summary className="flex justify-between items-center font-display font-bold text-sm text-slate-800 dark:text-white list-none">
                                <span className="pr-4">{faq.question}</span>
                                <span className="p-1.5 bg-slate-50 dark:bg-slate-700 rounded-lg group-open:rotate-90 transition-transform flex-shrink-0">
                                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-300" />
                                </span>
                              </summary>
                              <div className="mt-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap pt-3 border-t border-slate-50 dark:border-slate-700/50">
                                {faq.answer}
                              </div>
                            </details>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* --- VIEW: PLANNER PDF (24 SEMANAS ORIGINAL DEL PDF + RECETARIOS POR EDADES) --- */}
              {activeTab === "pdf-planner" && (
                <div className="space-y-6">
                  {/* Title Banner */}
                  <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 sm:p-8 rounded-3xl text-white shadow-xs text-left relative overflow-hidden">
                    <div className="relative z-10 space-y-2">
                      <span className="bg-white/20 text-white text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-full">
                        Manuales y Planes Oficiales
                      </span>
                      <h2 className="font-display font-extrabold text-xl sm:text-2xl">
                        Colección de Nutrición Infantil
                      </h2>
                      <p className="text-xs sm:text-sm text-indigo-50 leading-relaxed max-w-2xl">
                        Explora la estructura nutricional por edades o sigue el plan semanal detallado con su lista de compras tal cual están diseñados en los manuales oficiales.
                      </p>
                    </div>
                    {/* Decorative abstract circle background */}
                    <div className="absolute right-[-10%] top-[-20%] w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                  </div>

                  {/* Inner Tab Selector: Weekly Plan vs Recipe Books */}
                  <div className="flex gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                    <button
                      onClick={() => {
                        setPdfPlannerSubTab("plan");
                        setSelectedPdfRecipe(null);
                      }}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        pdfPlannerSubTab === "plan"
                          ? "bg-indigo-500 text-white shadow-xs"
                          : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100/50 dark:bg-slate-800/50"
                      }`}
                    >
                      <CalendarDays className="w-3.5 h-3.5" /> Plan de 24 Semanas
                    </button>
                    <button
                      onClick={() => {
                        setPdfPlannerSubTab("recetarios");
                        setSelectedPdfRecipe(null);
                      }}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        pdfPlannerSubTab === "recetarios"
                          ? "bg-indigo-500 text-white shadow-xs"
                          : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100/50 dark:bg-slate-800/50"
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" /> Recetarios por Edades (9-24m)
                    </button>
                  </div>

                  {pdfPlannerSubTab === "plan" ? (
                    <div className="space-y-6">
                      {/* Horizontal Weekly Carousel (Weeks 1 to 24) */}
                      <div className="space-y-2 text-left">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-extrabold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                            Selecciona una Semana del Plan (1 - 24):
                          </label>
                          <div className="flex gap-1.5">
                            <button
                              disabled={activePdfWeek === 1}
                              onClick={() => setActivePdfWeek(prev => Math.max(1, prev - 1))}
                              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                              <ArrowLeft className="w-4 h-4" />
                            </button>
                            <button
                              disabled={activePdfWeek === 24}
                              onClick={() => setActivePdfWeek(prev => Math.min(24, prev + 1))}
                              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1.5 px-0.5">
                          {WEEKLY_PLANNER_PDF.map(wk => {
                            const isSelected = activePdfWeek === wk.weekNumber;
                            // Identify stage color for label tag
                            let stageColor = "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400";
                            if (wk.stageTitle.includes("Etapa 2")) stageColor = "bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400";
                            else if (wk.stageTitle.includes("Etapa 3")) stageColor = "bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400";
                            else if (wk.stageTitle.includes("Etapa 4")) stageColor = "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400";

                            return (
                              <button
                                key={wk.weekNumber}
                                onClick={() => setActivePdfWeek(wk.weekNumber)}
                                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer border flex flex-col items-center gap-1 min-w-[90px] ${
                                  isSelected
                                    ? "bg-indigo-500 border-indigo-400 text-white shadow-md font-extrabold scale-105"
                                    : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                                }`}
                              >
                                <span>Semana {wk.weekNumber}</span>
                                <span className={`text-[8px] px-1.5 py-0.5 rounded-md font-bold ${isSelected ? "bg-white/20 text-white" : stageColor}`}>
                                  {wk.stageTitle.split(":")[0]}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {(() => {
                        const currentWeekData = WEEKLY_PLANNER_PDF.find(w => w.weekNumber === activePdfWeek) || WEEKLY_PLANNER_PDF[0];
                        
                        // Toggle function for our local checked checklist state
                        const handleTogglePdfShoppingItem = (itemName: string) => {
                          setPdfShoppingChecked(prev => {
                            const weekChecks = prev[activePdfWeek] || {};
                            const updatedWeekChecks = {
                              ...weekChecks,
                              [itemName]: !weekChecks[itemName]
                            };
                            return {
                              ...prev,
                              [activePdfWeek]: updatedWeekChecks
                            };
                          });
                        };

                        // Check all / Reset helper
                        const handleResetPdfShopping = () => {
                          setPdfShoppingChecked(prev => {
                            const updated = { ...prev };
                            delete updated[activePdfWeek];
                            return updated;
                          });
                        };

                        const handleCheckAllPdfShopping = () => {
                          const allItems: string[] = [];
                          currentWeekData.shoppingList.forEach(cat => {
                            cat.items.forEach(it => allItems.push(it.name));
                          });

                          setPdfShoppingChecked(prev => {
                            const weekChecks: { [itemName: string]: boolean } = {};
                            allItems.forEach(name => {
                              weekChecks[name] = true;
                            });
                            return {
                              ...prev,
                              [activePdfWeek]: weekChecks
                            };
                          });
                        };

                        // Compute shopping stats
                        let totalItemsCount = 0;
                        let checkedItemsCount = 0;
                        const weekChecks = pdfShoppingChecked[activePdfWeek] || {};
                        
                        currentWeekData.shoppingList.forEach(cat => {
                          cat.items.forEach(it => {
                            totalItemsCount++;
                            if (weekChecks[it.name]) {
                              checkedItemsCount++;
                            }
                          });
                        });

                        const progressPercent = totalItemsCount > 0 
                          ? Math.round((checkedItemsCount / totalItemsCount) * 100) 
                          : 0;

                        // Copy shopping list helper
                        const handleCopyShoppingList = () => {
                          let text = `🛒 LISTA DE COMPRAS - SEMANA ${activePdfWeek}\n`;
                          text += `📋 ${currentWeekData.weekTitle}\n\n`;
                          currentWeekData.shoppingList.forEach(cat => {
                            text += `📂 ${cat.category.toUpperCase()}:\n`;
                            cat.items.forEach(it => {
                              const status = weekChecks[it.name] ? "[x]" : "[ ]";
                              text += ` ${status} ${it.name} (${it.quantity || "al gusto"})\n`;
                            });
                            text += `\n`;
                          });
                          text += `Generado desde BabyChef 👶 Feliz en la mesa.`;
                          navigator.clipboard.writeText(text);
                          alert("¡Lista de compras copiada al portapapeles! 📋");
                        };

                        return (
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
                            
                            {/* LEFT & CENTER COLUMN: Days Weekly Menu Calendar */}
                            <div className="lg:col-span-2 space-y-4">
                              
                              {/* Banner Info about the selected week's stage and guidelines */}
                              <div className="bg-indigo-50 dark:bg-indigo-950/20 p-5 rounded-2xl border border-indigo-100/50 dark:border-indigo-900/30 space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-[10px] bg-indigo-500 text-white font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
                                    {currentWeekData.stageTitle}
                                  </span>
                                  <span className="text-[10px] bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-extrabold px-2.5 py-1 rounded-md">
                                    Semana {activePdfWeek} de 24
                                  </span>
                                </div>
                                <h3 className="font-display font-extrabold text-sm text-slate-800 dark:text-white">
                                  {currentWeekData.weekTitle}
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                  Sigue el plan de alimentación de esta semana exactamente como lo indica la guía para asegurar el progreso y la introducción oportuna de cada alimento.
                                </p>
                              </div>

                              {/* Days Grid Cards */}
                              <div className="space-y-4">
                                {currentWeekData.days.map((day, dIdx) => (
                                  <div
                                    key={dIdx}
                                    className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs hover:border-indigo-100 dark:hover:border-indigo-900/40 transition-all space-y-3"
                                  >
                                    <div className="flex items-center justify-between border-b pb-2 border-slate-100 dark:border-slate-700">
                                      <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                                        <span className="text-xs font-extrabold text-slate-800 dark:text-white uppercase tracking-wider">
                                          {day.dayName}
                                        </span>
                                      </div>
                                      <span className="text-[10px] text-slate-400 font-bold bg-slate-50 dark:bg-slate-700 px-2.5 py-0.5 rounded-md">
                                        Plan Oficial PDF
                                      </span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                      {/* Breakfast */}
                                      <div className="p-3 bg-slate-50/70 dark:bg-slate-900/30 rounded-xl space-y-1 border border-transparent hover:border-indigo-100/30 transition-all">
                                        <div className="flex items-center gap-1.5">
                                          <span className="text-xs text-amber-500">🌅</span>
                                          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Desayuno</span>
                                        </div>
                                        <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                                          {day.breakfast || "Solo leche (materna/fórmula)"}
                                        </p>
                                      </div>

                                      {/* Lunch */}
                                      <div className="p-3 bg-slate-50/70 dark:bg-slate-900/30 rounded-xl space-y-1 border border-transparent hover:border-indigo-100/30 transition-all">
                                        <div className="flex items-center gap-1.5">
                                          <span className="text-xs text-emerald-500">🍲</span>
                                          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Almuerzo / Comida</span>
                                        </div>
                                        <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                                          {day.lunch || "No requerido en esta etapa"}
                                        </p>
                                      </div>

                                      {/* Dinner */}
                                      <div className="p-3 bg-slate-50/70 dark:bg-slate-900/30 rounded-xl space-y-1 border border-transparent hover:border-indigo-100/30 transition-all">
                                        <div className="flex items-center gap-1.5">
                                          <span className="text-xs text-indigo-500">🥦</span>
                                          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Cena</span>
                                        </div>
                                        <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                                          {day.dinner || "No requerido en esta etapa"}
                                        </p>
                                      </div>

                                      {/* Snack */}
                                      <div className="p-3 bg-slate-50/70 dark:bg-slate-900/30 rounded-xl space-y-1 border border-transparent hover:border-indigo-100/30 transition-all">
                                        <div className="flex items-center gap-1.5">
                                          <span className="text-xs text-pink-500">🍎</span>
                                          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Colación / Merienda</span>
                                        </div>
                                        <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                                          {day.snack || "No requerido en esta etapa"}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* RIGHT COLUMN: Interactive Shopping List */}
                            <div className="lg:col-span-1 space-y-5">
                              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-5 sticky top-4">
                                
                                {/* Checklist Header */}
                                <div className="space-y-2 border-b pb-3 border-slate-100 dark:border-slate-700">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h3 className="font-display font-extrabold text-md text-slate-800 dark:text-white flex items-center gap-1.5">
                                        <ShoppingCart className="w-5 h-5 text-indigo-500" />
                                        Lista de Compras
                                      </h3>
                                      <p className="text-[10px] text-slate-400">
                                        Ingredientes oficiales para la Semana {activePdfWeek}
                                      </p>
                                    </div>
                                    <span className="text-[10px] bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full font-bold">
                                      Semana {activePdfWeek}
                                    </span>
                                  </div>

                                  {/* Progress bar and counter */}
                                  <div className="space-y-1.5 pt-2">
                                    <div className="flex justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400">
                                      <span>Progreso de Compras</span>
                                      <span>{checkedItemsCount} de {totalItemsCount} ({progressPercent}%)</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                                      <div
                                        className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                                        style={{ width: `${progressPercent}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>

                                {/* Checklist Items Grouped by Category */}
                                <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1 scrollbar-thin">
                                  {currentWeekData.shoppingList.map((cat, cIdx) => (
                                    <div key={cIdx} className="space-y-2">
                                      <h4 className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                                        {cat.category}
                                      </h4>
                                      <div className="space-y-1.5">
                                        {cat.items.map((it, iIdx) => {
                                          const isChecked = !!weekChecks[it.name];
                                          return (
                                            <div
                                              key={iIdx}
                                              onClick={() => handleTogglePdfShoppingItem(it.name)}
                                              className="flex items-center justify-between p-2.5 bg-slate-50/70 dark:bg-slate-900/30 hover:bg-indigo-50/30 dark:hover:bg-slate-900/50 rounded-xl border border-transparent hover:border-indigo-100/20 transition-all cursor-pointer select-none"
                                            >
                                              <div className="flex items-center gap-2.5 text-left min-w-0">
                                                <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all flex-shrink-0 ${
                                                  isChecked
                                                    ? "bg-indigo-500 border-indigo-400 text-white"
                                                    : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                                                }`}>
                                                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                                </div>
                                                <span className={`text-xs font-bold truncate ${
                                                  isChecked 
                                                    ? "text-slate-400 line-through font-normal" 
                                                    : "text-slate-700 dark:text-slate-200"
                                                }`}>
                                                  {it.name}
                                                </span>
                                              </div>
                                              {it.quantity && (
                                                <span className="text-[9px] text-slate-400 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-2 py-0.5 rounded-md flex-shrink-0 font-bold ml-2">
                                                  {it.quantity}
                                                </span>
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  ))}

                                  {totalItemsCount === 0 && (
                                    <p className="text-xs text-slate-400 py-4 text-center">No se requieren compras para esta semana.</p>
                                  )}
                                </div>

                                {/* Actions Footer inside Sidebar Card */}
                                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                                  <button
                                    onClick={handleCheckAllPdfShopping}
                                    className="py-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-xl text-[10px] font-bold transition-all cursor-pointer border border-slate-200/50 dark:border-transparent"
                                  >
                                    Marcar Todo
                                  </button>
                                  <button
                                    onClick={handleResetPdfShopping}
                                    className="py-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-xl text-[10px] font-bold transition-all cursor-pointer border border-slate-200/50 dark:border-transparent"
                                  >
                                    Limpiar Lista
                                  </button>
                                </div>

                                <button
                                  onClick={handleCopyShoppingList}
                                  className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md"
                                >
                                  <span>Compartir Lista</span>
                                  <Share2 className="w-3.5 h-3.5" />
                                </button>

                              </div>
                            </div>

                          </div>
                        );
                      })()}
                    </div>
                  ) : (
                    /* SUB-TAB: RECETARIOS POR EDADES (MANUALES PDF EXTRAÍDOS) */
                    <div className="space-y-6 animate-in fade-in duration-300">
                      {/* Age Selector Tabs */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <span className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">
                          Selecciona un Manual por Edad:
                        </span>
                        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                          {(["9-12", "12-18", "18-24"] as const).map((age) => {
                            const isSelected = pdfBookAge === age;
                            const labels = {
                              "9-12": "9 - 12 Meses",
                              "12-18": "12 - 18 Meses",
                              "18-24": "18 - 24 Meses"
                            };
                            return (
                              <button
                                key={age}
                                onClick={() => {
                                  setPdfBookAge(age);
                                  setSelectedPdfRecipe(null);
                                }}
                                className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
                                  isSelected
                                    ? "bg-indigo-500 border-indigo-400 text-white shadow-xs"
                                    : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                                }`}
                              >
                                {labels[age]}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {(() => {
                        const book = RECIPES_BY_AGE_PDF[pdfBookAge];
                        if (!book) return null;

                        return (
                          <div className="space-y-6">
                            {/* General recommendations card for this age */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              <div className="p-5 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-2xl border border-indigo-100/30 dark:border-indigo-950/50 space-y-3">
                                <h3 className="font-display font-extrabold text-sm text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
                                  <Info className="w-4 h-4" /> Recomendaciones Generales ({book.ageRange})
                                </h3>
                                <ul className="space-y-1.5">
                                  {book.recommendations.map((rec, rIdx) => (
                                    <li key={rIdx} className="text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-1.5 leading-relaxed">
                                      <span className="text-indigo-500 dark:text-indigo-400 select-none mt-0.5">•</span>
                                      <span>{rec}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="p-5 bg-gradient-to-br from-pink-500/10 to-rose-500/10 dark:from-pink-950/20 dark:to-rose-950/20 rounded-2xl border border-pink-100/30 dark:border-pink-950/50 space-y-3">
                                <h3 className="font-display font-extrabold text-sm text-pink-700 dark:text-pink-400 flex items-center gap-1.5">
                                  <Sparkles className="w-4 h-4" /> Consejos y Hacks de Cocina
                                </h3>
                                <ul className="space-y-1.5">
                                  {book.tips.map((tip, tIdx) => (
                                    <li key={tIdx} className="text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-1.5 leading-relaxed">
                                      <span className="text-pink-500 dark:text-pink-400 select-none mt-0.5">★</span>
                                      <span>{tip}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Detailed view of a single PDF recipe, or the full catalog browse */}
                            {selectedPdfRecipe ? (
                              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-5 animate-in slide-in-from-bottom-4 duration-300">
                                {/* Recipe header with back button */}
                                <div className="flex items-center justify-between border-b pb-4 border-slate-100 dark:border-slate-700">
                                  <button
                                    onClick={() => setSelectedPdfRecipe(null)}
                                    className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                                  >
                                    <ArrowLeft className="w-4 h-4" /> Volver al recetario por edad
                                  </button>
                                  <span className="text-[10px] bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full font-bold">
                                    {selectedPdfRecipe.category.toUpperCase()} • {selectedPdfRecipe.ageRange}
                                  </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                  {/* Left col: Summary */}
                                  <div className="md:col-span-1 space-y-4 col-span-1">
                                    <div className="h-40 bg-gradient-to-tr from-indigo-100 to-purple-50 dark:from-indigo-950 dark:to-slate-900 rounded-xl flex items-center justify-center text-5xl">
                                      {selectedPdfRecipe.category === "desayuno" ? "🥣" : selectedPdfRecipe.category === "merienda" ? "🍎" : "🍲"}
                                    </div>
                                    <h2 className="font-display font-extrabold text-lg text-slate-800 dark:text-white leading-tight">
                                      {selectedPdfRecipe.name}
                                    </h2>

                                    <div className="space-y-2 text-xs">
                                      <div className="p-3 bg-slate-50 dark:bg-slate-900/30 rounded-xl flex justify-between items-center">
                                        <span className="text-slate-400">⏱️ Prep + Cocción:</span>
                                        <strong className="text-slate-700 dark:text-slate-200">{(selectedPdfRecipe.prepTime || 0) + (selectedPdfRecipe.cookTime || 0)} min</strong>
                                      </div>
                                      <div className="p-3 bg-slate-50 dark:bg-slate-900/30 rounded-xl flex justify-between items-center">
                                        <span className="text-slate-400">🥣 Textura recomendada:</span>
                                        <strong className="text-slate-700 dark:text-slate-200">{selectedPdfRecipe.texture}</strong>
                                      </div>
                                      {selectedPdfRecipe.attributes && selectedPdfRecipe.attributes.length > 0 && (
                                        <div className="p-3 bg-slate-50 dark:bg-slate-900/30 rounded-xl space-y-1.5">
                                          <span className="text-slate-400 block mb-0.5">Etiquetas Dietéticas:</span>
                                          <div className="flex flex-wrap gap-1">
                                            {selectedPdfRecipe.attributes.map(attr => (
                                              <span key={attr} className="text-[9px] bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-md font-bold">
                                                {attr}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Center col: Ingredients */}
                                  <div className="md:col-span-1 space-y-3">
                                    <h3 className="font-display font-extrabold text-sm text-slate-800 dark:text-white border-b pb-1 border-slate-100 dark:border-slate-700 flex items-center gap-1.5">
                                      <UtensilsCrossed className="w-4 h-4 text-indigo-500" /> Ingredientes
                                    </h3>
                                    <ul className="space-y-2">
                                      {selectedPdfRecipe.ingredients.map((ing, idx) => (
                                        <li key={idx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0"></div>
                                          <span>{ing}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Right col: Preparation steps */}
                                  <div className="md:col-span-1 space-y-4">
                                    <div className="space-y-3">
                                      <h3 className="font-display font-extrabold text-sm text-slate-800 dark:text-white border-b pb-1 border-slate-100 dark:border-slate-700 flex items-center gap-1.5">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Modo de Preparación
                                      </h3>
                                      <ol className="space-y-3">
                                        {selectedPdfRecipe.steps.map((step, idx) => (
                                          <li key={idx} className="text-xs text-slate-600 dark:text-slate-300 flex gap-2">
                                            <span className="font-bold text-indigo-500 text-[11px] bg-indigo-50 dark:bg-indigo-950/40 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                              {idx + 1}
                                            </span>
                                            <span className="leading-relaxed">{step}</span>
                                          </li>
                                        ))}
                                      </ol>
                                    </div>

                                    {selectedPdfRecipe.tips && selectedPdfRecipe.tips.length > 0 && (
                                      <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/10 rounded-xl border border-indigo-100/20 space-y-1 text-left">
                                        <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-extrabold uppercase tracking-wider block">💡 Consejo de éxito</span>
                                        <p className="text-[11px] text-slate-600 dark:text-slate-300 italic leading-relaxed">
                                          &ldquo;{selectedPdfRecipe.tips[0]}&rdquo;
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              /* Browse list grouped by course category */
                              <div className="space-y-6">
                                {(["breakfast", "lunchDinner", "snacks"] as const).map((categoryKey) => {
                                  const list = book.categories[categoryKey];
                                  const categoryLabel = {
                                    breakfast: "🥣 Desayunos del Manual",
                                    lunchDinner: "🍲 Almuerzos y Cenas",
                                    snacks: "🍎 Meriendas y Snacks Blandos"
                                  };
                                  if (!list || list.length === 0) return null;

                                  return (
                                    <div key={categoryKey} className="space-y-3">
                                      <h3 className="font-display font-bold text-sm text-slate-800 dark:text-white pl-1 border-l-2 border-indigo-500">
                                        {categoryLabel[categoryKey]} ({list.length} recetas)
                                      </h3>

                                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        {list.map((recipe) => (
                                          <div
                                            key={recipe.id}
                                            onClick={() => setSelectedPdfRecipe(recipe)}
                                            className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700/80 shadow-xs hover:shadow-md cursor-pointer hover:border-indigo-100 dark:hover:border-indigo-900/40 transition-all flex flex-col justify-between gap-3 text-left group"
                                          >
                                            <div className="space-y-2">
                                              <div className="flex justify-between items-start">
                                                <h4 className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                                                  {recipe.name}
                                                </h4>
                                                <span className="text-[9px] bg-slate-50 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded-md font-bold shrink-0">
                                                  ⏱️ {recipe.prepTime + recipe.cookTime}m
                                                </span>
                                              </div>
                                              <p className="text-[11px] text-slate-400 line-clamp-2">
                                                {recipe.steps[0]}
                                              </p>
                                            </div>
                                            
                                            <div className="flex items-center justify-between border-t pt-2 border-slate-50 dark:border-slate-700/40 text-[10px] font-bold text-indigo-500 dark:text-indigo-400">
                                              <span>Textura: {recipe.texture.split(" ")[0]}</span>
                                              <span className="flex items-center gap-0.5 hover:underline group-hover:translate-x-1 duration-200 transition-transform">
                                                Ver preparación <ChevronRight className="w-3 h-3" />
                                              </span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}

              {/* --- VIEW: INQUIETUDES / CONSULTAS --- */}
              {activeTab === "inquietudes" && (
                <div className="space-y-6 text-left">
                  {/* Explanatory Header Card */}
                  <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-sky-500/10 dark:from-pink-950/20 dark:via-purple-950/20 dark:to-sky-950/20 p-6 rounded-3xl border border-pink-100/30 dark:border-pink-950/40 space-y-3">
                    <h2 className="font-display font-extrabold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                      <HelpCircle className="w-5.5 h-5.5 text-pink-500" />
                      Inquietudes de Mamá
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Escribe cualquier duda o pregunta sobre la alimentación de tu bebé (nutrición, recetas, vacunas, cólicos, etc.). Te ayudaremos a buscar al instante la mejor información respaldada por expertos en Google.
                    </p>
                  </div>

                  {/* Form Container */}
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
                    <h3 className="font-display font-bold text-sm text-slate-800 dark:text-white">¿Cuál es tu duda hoy?</h3>
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (inquiryQuery.trim()) {
                          window.open(`https://www.google.com/search?q=${encodeURIComponent(inquiryQuery.trim())}`, "_blank");
                        }
                      }} 
                      className="space-y-4"
                    >
                      <div>
                        <textarea
                          value={inquiryQuery}
                          onChange={(e) => setInquiryQuery(e.target.value)}
                          placeholder="Ej: ¿A qué edad puede comer fresas un bebé? / Recetas saludables de papillas de brócoli..."
                          className="w-full text-xs p-4 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-2xl focus:outline-none focus:ring-1 focus:ring-pink-400 h-28 text-slate-800 dark:text-white leading-relaxed"
                          required
                        />
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl text-xs font-bold transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>🔍 Buscar Respuestas en Google</span>
                      </button>
                    </form>
                  </div>

                  {/* Frequently Searched Topics Quick-Tags */}
                  <div className="space-y-3 pl-1">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Preguntas Frecuentes de Otras Mamás</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "¿Cuándo empezar alimentación complementaria?",
                        "¿Cómo introducir el huevo de forma segura?",
                        "Alimentos prohibidos antes del primer año",
                        "Recetas de cenas ligeras para bebé de 8 meses",
                        "¿Qué hacer si mi bebé rechaza los sólidos?",
                        "Texturas seguras método BLW"
                      ].map((topic) => (
                        <button
                          key={topic}
                          onClick={() => {
                            setInquiryQuery(topic);
                            window.open(`https://www.google.com/search?q=${encodeURIComponent(topic)}`, "_blank");
                          }}
                          className="px-3.5 py-2 bg-slate-50 hover:bg-pink-50 dark:bg-slate-800 dark:hover:bg-pink-950/20 text-slate-600 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400 border border-slate-200/50 dark:border-slate-700/80 rounded-xl text-[11px] font-medium transition-all text-left cursor-pointer"
                        >
                          {topic} →
                        </button>
                      ))}
                    </div>
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

              {/* --- VIEW: COMUNIDAD FACEBOOK --- */}
              {activeTab === "comunidad" && (
                <div className="space-y-6 text-left">
                  {/* Explanatory Header Card */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-3xl space-y-3.5 shadow-md shadow-blue-500/10">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-white/15 rounded-2xl">
                        <Facebook className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="font-display font-extrabold text-md sm:text-lg">
                          Comunidad y Orientación de Facebook
                        </h2>
                        <p className="text-[10px] sm:text-xs opacity-90">
                          Tu red de apoyo de mamás para una alimentación exitosa
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Call to Action Main Card */}
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-5 text-center sm:text-left">
                    <div className="space-y-2">
                      <h3 className="font-display font-bold text-sm sm:text-md text-slate-800 dark:text-white">
                        👶 ¡Únete a nuestro grupo oficial!
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed">
                        Hemos creado este rincón en Facebook para que todas las mamás que usan <strong>BabyChef</strong> tengan una herramienta extra de orientación. Podrás compartir tus dudas, ver ideas de platos de otras mamás y recibir consejos valiosos sobre crianza y nutrición complementaria.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-700/40 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-100 dark:border-slate-700">
                      <div className="text-center sm:text-left">
                        <span className="text-[10px] text-blue-500 dark:text-blue-400 font-bold block uppercase tracking-wider">GRUPO OFICIAL</span>
                        <span className="text-xs font-bold text-slate-800 dark:text-white">Comunidad de Apoyo BabyChef</span>
                      </div>
                      <a 
                        href="https://www.facebook.com/share/1MeZZs1BAm/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-extrabold text-xs rounded-xl transition-all shadow-md shadow-blue-600/10 flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
                      >
                        <Facebook className="w-4 h-4 shrink-0" />
                        <span>Ir al Grupo de Facebook 🚀</span>
                      </a>
                    </div>
                  </div>

                  {/* What you will find Section */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">💡 ¿Qué encontrarás en nuestra comunidad?</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-2">
                        <span className="text-xl">🩺</span>
                        <h5 className="font-bold text-xs text-slate-800 dark:text-white">Orientación de Expertos</h5>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                          Accede a consejos e información confiable compartida por especialistas en pediatría y nutrición infantil.
                        </p>
                      </div>

                      <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-2">
                        <span className="text-xl">🍲</span>
                        <h5 className="font-bold text-xs text-slate-800 dark:text-white">Platos del Día Real</h5>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                          Mira fotos reales de comidas que otras mamás preparan con las recetas de la app para inspirarte diariamente.
                        </p>
                      </div>

                      <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-2">
                        <span className="text-xl">🤝</span>
                        <h5 className="font-bold text-xs text-slate-800 dark:text-white">Espacio Seguro</h5>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                          Un espacio libre de críticas donde puedes desahogarte, hacer preguntas de cualquier nivel y sentirte acompañada.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </main>

          </>
        )}

        {/* --- LICENSED ORIGINAL USER BADGE (IDEA 4) --- */}
        {clientEmail && (
          <div className={`px-4 py-1.5 text-[9px] font-bold flex items-center justify-between gap-2 border-t select-none transition-all ${
            isDarkMode 
              ? "bg-slate-900/85 border-slate-800 text-slate-400" 
              : "bg-emerald-500/10 border-emerald-100 text-emerald-800"
          }`}>
            <span className="flex items-center gap-1 truncate">
              <span className="text-emerald-500 text-[10px]">🛡️</span>
              <span className="truncate">Licencia Oficial: <strong className="font-extrabold uppercase text-emerald-600 dark:text-emerald-400">{clientName || "Usuario Autorizado"}</strong></span>
            </span>
            <span className="opacity-80 italic truncate">{clientEmail}</span>
          </div>
        )}

        {/* Responsive Bottom Navigation Tab Bar (Sliding Pastel Pill Menu) */}
        <div className={`border-t px-3 py-3 select-none flex-shrink-0 transition-colors ${
          isDarkMode ? "bg-slate-950 border-slate-800" : "bg-gradient-to-r from-pink-50 via-sky-50 to-teal-50 border-pink-100"
        }`}>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 px-1">
            {[
              { id: "dashboard", label: "Inicio", icon: Baby, color: "bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border-teal-200" },
              { id: "recipes", label: "Recetas", icon: Search, color: "bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border-sky-200" },
              { id: "pdf-planner", label: "Plan PDF", icon: CalendarDays, color: "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-indigo-200" },
              { id: "meal-planner", label: "Menú", icon: Calendar, color: "bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 border-pink-200" },
              { id: "shopping-list", label: "Compras", icon: ShoppingCart, color: "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200" },
              { id: "guides", label: "Guías", icon: BookOpen, color: "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-indigo-200" },
              { id: "inquietudes", label: "Consultas", icon: HelpCircle, color: "bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 border-pink-200" },
              { id: "comunidad", label: "Comunidad FB", icon: Facebook, color: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200" },
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

      {/* ================= CUSTOM PWA INSTALLATION MODAL ================= */}
      {showInstallModal && (
        <div className="fixed inset-0 bg-black/65 flex items-center justify-center z-[100] p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-3xl w-full max-w-[420px] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-200 text-left">
            
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-xl">📲</span>
                <div>
                  <h3 className="font-display font-extrabold text-xs sm:text-sm">Instalar BabyChef App</h3>
                  <p className="text-[10px] opacity-90">Acceso rápido desde tu pantalla de inicio</p>
                </div>
              </div>
              <button 
                onClick={() => setShowInstallModal(false)}
                className="p-1 hover:bg-white/15 rounded-lg transition-colors cursor-pointer text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
              
              {/* CASE 1: Inside an iframe (AI Studio preview, etc) */}
              {(typeof window !== "undefined" && window.self !== window.top) ? (
                <div className="space-y-3.5">
                  <div className="p-3.5 bg-amber-500/10 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl flex gap-2.5">
                    <span className="text-xl shrink-0">⚠️</span>
                    <p className="text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed font-semibold">
                      Estás viendo la aplicación en modo de vista previa (iframe). Los navegadores bloquean la instalación directa de PWAs desde marcos virtuales.
                    </p>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Para poder instalar <strong>BabyChef</strong> directamente en tu celular o computadora con un solo clic, debes abrir la aplicación en una pestaña nueva o en tu navegador móvil.
                  </p>
                  <button
                    onClick={() => {
                      window.open(window.location.href, "_blank");
                      setShowInstallModal(false);
                    }}
                    className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-pink-500/10 active:scale-[0.98] cursor-pointer"
                  >
                    <span>Abrir en Pestaña Nueva 🚀</span>
                  </button>
                </div>
              ) : (
                /* CASE 2: Outside iframe (standalone browser) */
                <div className="space-y-4">
                  {/* iOS / Safari Detection */}
                  {typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent) ? (
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-500/10 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-2xl">
                        <span className="text-xs font-bold text-blue-700 dark:text-blue-400 block mb-1">📢 Instrucciones para iPhone / iPad (Safari)</span>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                          iOS no permite la instalación automática con un botón. Sigue estos simples pasos para instalarla:
                        </p>
                      </div>
                      <ol className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 pl-1">
                        <li className="flex gap-2 items-start">
                          <span className="font-extrabold text-pink-500 bg-pink-50 dark:bg-pink-950/30 w-5 h-5 rounded-full flex items-center justify-center shrink-0">1</span>
                          <span className="leading-relaxed">Presiona el botón de <strong>Compartir</strong> en la barra de tu navegador Safari (icono de un cuadrado con una flecha hacia arriba 📤).</span>
                        </li>
                        <li className="flex gap-2 items-start">
                          <span className="font-extrabold text-pink-500 bg-pink-50 dark:bg-pink-950/30 w-5 h-5 rounded-full flex items-center justify-center shrink-0">2</span>
                          <span className="leading-relaxed">Desliza hacia abajo en las opciones de menú y selecciona <strong>"Agregar a pantalla de inicio"</strong> o <strong>"Add to Home Screen"</strong> ➕.</span>
                        </li>
                        <li className="flex gap-2 items-start">
                          <span className="font-extrabold text-pink-500 bg-pink-50 dark:bg-pink-950/30 w-5 h-5 rounded-full flex items-center justify-center shrink-0">3</span>
                          <span className="leading-relaxed">Escribe un nombre si lo deseas y presiona <strong>"Agregar"</strong> arriba a la derecha. ¡Listo!</span>
                        </li>
                      </ol>
                    </div>
                  ) : (
                    /* Android or Desktop fallback */
                    <div className="space-y-3">
                      <div className="p-3.5 bg-emerald-500/10 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-2xl">
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                          Si tu navegador soporta instalación directa pero no se mostró el diálogo automático, puedes instalar la aplicación de forma manual en segundos:
                        </p>
                      </div>
                      <ol className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 pl-1">
                        <li className="flex gap-2 items-start">
                          <span className="font-extrabold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 w-5 h-5 rounded-full flex items-center justify-center shrink-0">1</span>
                          <span className="leading-relaxed">Busca el menú de <strong>tres puntos (⋮)</strong> o el icono de <strong>instalación (📥)</strong> en la barra de direcciones de tu navegador (Chrome/Edge/Samsung Internet).</span>
                        </li>
                        <li className="flex gap-2 items-start">
                          <span className="font-extrabold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 w-5 h-5 rounded-full flex items-center justify-center shrink-0">2</span>
                          <span className="leading-relaxed">Selecciona la opción <strong>"Instalar aplicación"</strong> o <strong>"Agregar a la pantalla principal"</strong>.</span>
                        </li>
                        <li className="flex gap-2 items-start">
                          <span className="font-extrabold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 w-5 h-5 rounded-full flex items-center justify-center shrink-0">3</span>
                          <span className="leading-relaxed">Confirma la instalación y BabyChef aparecerá en tu menú de aplicaciones de tu celular o escritorio de tu PC.</span>
                        </li>
                      </ol>
                    </div>
                  )}
                  
                  <button
                    onClick={() => setShowInstallModal(false)}
                    className="w-full py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer text-center"
                  >
                    Entendido
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ================= DIRECT PWA AUTO-PROMPTER POPUP ================= */}
      {showDirectInstallPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[110] p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-3xl w-full max-w-[360px] shadow-2xl p-6 border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-200 text-center space-y-5">
            
            {/* Logo display */}
            <div className="flex justify-center">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-md border-2 border-pink-100 dark:border-pink-900/40">
                <img src="/logo.png" alt="BabyChef" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-800 dark:text-white">
                ¡Instalar BabyChef App! 📲
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Disfruta de BabyChef con acceso directo en tu pantalla de inicio, inicio rápido en pantalla completa y la mejor experiencia de usuario.
              </p>
            </div>

            <div className="space-y-2.5 pt-1">
              <button
                onClick={() => {
                  setShowDirectInstallPopup(false);
                  handleInstallClick();
                }}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-xs rounded-xl transition-all shadow-md shadow-pink-500/10 active:scale-[0.98] cursor-pointer"
              >
                Instalar Ahora 🚀
              </button>
              <button
                onClick={() => setShowDirectInstallPopup(false)}
                className="w-full py-2.5 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Quizás más tarde
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Outer floating disclaimer or footer at desktop level */}
      <footer className="hidden lg:block absolute bottom-2 left-0 right-0 text-center text-[10px] text-pink-700/60 dark:text-indigo-300/40 select-none pointer-events-none">
        BabyChef App — Hecho con amor 💖 • Consulta siempre con tu pediatra.
      </footer>

    </div>
  );
}
