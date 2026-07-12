/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { GrowthEntry } from "../types";
import { Scale, Milestone, Activity } from "lucide-react";

interface GrowthChartProps {
  entries: GrowthEntry[];
  onAddEntry: (weight: number, height: number, headCirc?: number, notes?: string) => void;
  onDeleteEntry: (id: string) => void;
}

export default function GrowthChart({ entries, onAddEntry, onDeleteEntry }: GrowthChartProps) {
  const [activeTab, setActiveTab] = useState<"weight" | "height" | "head">("weight");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [headCirc, setHeadCirc] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isAdding, setIsAdding] = useState(false);

  // Sort entries by date chronologically
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const wNum = parseFloat(weight);
    const hNum = parseFloat(height);
    const hcNum = headCirc ? parseFloat(headCirc) : undefined;

    if (isNaN(wNum) || isNaN(hNum)) {
      alert("Por favor introduce valores de peso y altura válidos.");
      return;
    }

    onAddEntry(wNum, hNum, hcNum, notes);
    setWeight("");
    setHeight("");
    setHeadCirc("");
    setNotes("");
    setIsAdding(false);
  };

  // Prepare data for Recharts
  const chartData = sortedEntries.map(entry => ({
    date: new Date(entry.date).toLocaleDateString("es-ES", {
      month: "short",
      day: "numeric"
    }),
    peso: entry.weight,
    altura: entry.height,
    perimetroCefalico: entry.headCircumference || 0,
    Notas: entry.notes || ""
  }));

  return (
    <div className="space-y-6 text-xs">
      {/* Chart Header */}
      <div className="bg-sky-50/40 dark:bg-slate-800/50 p-5 rounded-2xl shadow-xs border border-sky-100/50 dark:border-slate-700/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-white">Gráfica de Crecimiento</h3>
            <p className="text-[10px] text-slate-500">Registra y visualiza la evolución física de tu bebé</p>
          </div>
          
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-3.5 py-2 bg-pink-400 hover:bg-pink-500 text-white rounded-full text-xs font-bold transition-colors shadow-xs"
          >
            {isAdding ? "Cancelar Registro" : "Registrar Medidas 👣"}
          </button>
        </div>

        {isAdding && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 bg-pink-50/40 dark:bg-slate-800/60 rounded-xl border border-pink-100/50 dark:border-slate-700 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <h4 className="text-xs font-bold text-pink-600 dark:text-pink-400 flex items-center gap-2">
              <Milestone className="w-4 h-4" /> Agregar medidas del día
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Fecha</label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full text-sm p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Peso (kg)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="ej: 7.5"
                  value={weight}
                  onChange={e => setWeight(e.target.value)}
                  className="w-full text-sm p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Altura (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="ej: 68"
                  value={height}
                  onChange={e => setHeight(e.target.value)}
                  className="w-full text-sm p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Perím. Cefálico (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="ej: 42 (opcional)"
                  value={headCirc}
                  onChange={e => setHeadCirc(e.target.value)}
                  className="w-full text-sm p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Notas / Observaciones</label>
              <input
                type="text"
                placeholder="ej: Le salió su primer diente o revisión de los 6 meses"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full text-sm p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-pink-400 hover:bg-pink-500 text-white rounded-full text-xs font-bold transition-colors"
              >
                Guardar Medidas
              </button>
            </div>
          </form>
        )}

        {/* Tab Selectors */}
        <div className="flex border-b border-pink-100/30 mb-6">
          <button
            onClick={() => setActiveTab("weight")}
            className={`flex items-center gap-2 pb-3 px-4 text-xs font-bold border-b-2 transition-all -mb-[2px] ${
              activeTab === "weight"
                ? "border-pink-400 text-pink-500"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <Scale className="w-4 h-4" /> Peso (kg)
          </button>
          <button
            onClick={() => setActiveTab("height")}
            className={`flex items-center gap-2 pb-3 px-4 text-xs font-bold border-b-2 transition-all -mb-[2px] ${
              activeTab === "height"
                ? "border-sky-400 text-sky-500"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <Milestone className="w-4 h-4" /> Altura (cm)
          </button>
          <button
            onClick={() => setActiveTab("head")}
            className={`flex items-center gap-2 pb-3 px-4 text-xs font-bold border-b-2 transition-all -mb-[2px] ${
              activeTab === "head"
                ? "border-purple-400 text-purple-500"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <Activity className="w-4 h-4" /> P. Cefálico (cm)
          </button>
        </div>

        {/* Recharts Area */}
        {chartData.length > 0 ? (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  domain={
                    activeTab === "weight"
                      ? ["dataMin - 1", "dataMax + 1"]
                      : activeTab === "height"
                      ? ["dataMin - 5", "dataMax + 5"]
                      : ["dataMin - 2", "dataMax + 2"]
                  }
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0"
                  }}
                />
                <Legend iconType="circle" />
                {activeTab === "weight" && (
                  <Line
                    type="monotone"
                    dataKey="peso"
                    name="Peso Actual (kg)"
                    stroke="#ec4899"
                    strokeWidth={3}
                    activeDot={{ r: 8 }}
                  />
                )}
                {activeTab === "height" && (
                  <Line
                    type="monotone"
                    dataKey="altura"
                    name="Altura (cm)"
                    stroke="#0ea5e9"
                    strokeWidth={3}
                    activeDot={{ r: 8 }}
                  />
                )}
                {activeTab === "head" && (
                  <Line
                    type="monotone"
                    dataKey="perimetroCefalico"
                    name="P. Cefálico (cm)"
                    stroke="#a855f7"
                    strokeWidth={3}
                    activeDot={{ r: 8 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="py-12 text-center text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
            <Scale className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <p className="text-sm">No hay registros guardados.</p>
            <p className="text-xs text-slate-400 mt-1">Registra la primera medida de tu bebé para ver el gráfico.</p>
          </div>
        )}
      </div>

      {/* Historic Table */}
      <div className="bg-pink-50/30 dark:bg-slate-800/40 p-5 rounded-2xl shadow-xs border border-pink-100/50 dark:border-slate-700/50">
        <h3 className="text-xs font-bold text-slate-800 dark:text-white mb-4">Historial de Mediciones</h3>
        {sortedEntries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-500">
              <thead className="text-[10px] text-slate-600 uppercase bg-pink-50/50 dark:bg-slate-850">
                <tr>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Peso</th>
                  <th className="px-4 py-3">Altura</th>
                  <th className="px-4 py-3">P. Cefálico</th>
                  <th className="px-4 py-3">Notas</th>
                  <th className="px-4 py-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody>
                {sortedEntries.map(entry => (
                  <tr key={entry.id} className="border-b border-pink-100/20 hover:bg-pink-50/10 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                      {new Date(entry.date).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </td>
                    <td className="px-4 py-3 text-pink-500 font-bold">{entry.weight} kg</td>
                    <td className="px-4 py-3 text-sky-500 font-bold">{entry.height} cm</td>
                    <td className="px-4 py-3 text-purple-500">
                      {entry.headCircumference ? `${entry.headCircumference} cm` : "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs max-w-xs truncate" title={entry.notes}>
                      {entry.notes || "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => onDeleteEntry(entry.id)}
                        className="text-xs text-rose-500 hover:text-rose-700 font-medium transition-colors"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-slate-400 text-center py-4">No hay datos históricos para mostrar.</p>
        )}
      </div>
    </div>
  );
}
