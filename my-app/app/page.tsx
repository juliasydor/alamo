"use client";

import { useState, useEffect } from "react";
import { useSearch } from "./providers";

interface RoutineDetail {
  label: string;
  value: string;
  observation?: string;
}

interface RoutineItem {
  label: string;
  value: string;
  details: RoutineDetail[];
}

interface RoutineMeasurement {
  label: string;
  value: string;
  color?: string;
}

interface Routine {
  time: string;
  title: string;
  items: RoutineItem[];
  measurements: RoutineMeasurement[];
}

export default function HomePage() {
  const { searchTerm } = useSearch();

  const routines: Routine[] = [
    {
      time: "10:00",
      title: "Procedimento Matinal",
      items: [
        { label: "Solução A", value: "5 mL", details: [] },
        { label: "Composto B ou C", value: "250 mg", details: [] },
        { label: "Reagente Mediolab", value: "2 gotas", details: [] },
        {
          label: "Observação: Misturar em recipiente estéril",
          value: "",
          details: [
            {
              label: "Catalisador (CATPURE)",
              value: "5 mg",
              observation: "Observação: Executar em fluxo laminar",
            },
          ],
        },
      ],
      measurements: [
        { label: "CHO:", value: "26g" },
        { label: "PTN:", value: "25g" },
        { label: "LIP:", value: "1.3g" },
        { label: "", value: "215 mAU", color: "text-blue-500" },
      ],
    },
    {
      time: "13:00",
      title: "Procedimento de Meio-dia",
      items: [
        { label: "Solução B", value: "10 mL", details: [] },
        { label: "Composto D ou E", value: "150 mg", details: [] },
        { label: "Reagente ClearMix", value: "3 gotas", details: [] },
        {
          label: "",
          value: "",
          details: [
            {
              label: "Estabilizante (STABILAB)",
              value: "2 mg",
              observation: "Observação: Agitar por 3 minutos antes de aplicar",
            },
          ],
        },
      ],
      measurements: [
        { label: "CHO:", value: "26g" },
        { label: "PTN:", value: "25g" },
        { label: "LIP:", value: "1.3g" },
        { label: "", value: "189 mAU", color: "text-blue-500" },
      ],
    },
    {
      time: "16:30",
      title: "Teste Térmico",
      items: [
        { label: "Solução Térmica", value: "7 mL", details: [] },
        { label: "Agente B ou C", value: "300 mg", details: [] },
        { label: "Gotas de Neutralizante", value: "2 gotas", details: [] },
        { label: "Controle de Temperatura", value: "1 unidade", details: [] },
        {
          label: "",
          value: "",
          details: [
            {
              label: "Condutor (HEATPULSE)",
              value: "6 mg",
              observation: "Observação: Usar luvas nitrílicas reforçadas",
            },
          ],
        },
      ],
      measurements: [
        { label: "CHO:", value: "26g" },
        { label: "PTN:", value: "25g" },
        { label: "LIP:", value: "1.3g" },
        { label: "", value: "202 mAU", color: "text-blue-500" },
      ],
    },
    {
      time: "18:00",
      title: "Finalização do Ciclo",
      items: [
        { label: "Solução de Lavagem", value: "8 mL", details: [] },
        { label: "Composto X ou Z", value: "200 mg", details: [] },
      ],
      measurements: [{ label: "PTN:", value: "25g" }],
    },
  ];

  const [filteredRoutines, setFilteredRoutines] = useState<Routine[]>(routines);

  // Filtrar rotinas baseado no termo de busca
  useEffect(() => {
    if (!searchTerm) {
      setFilteredRoutines(routines);
    } else {
      const filtered = routines.filter(
        (routine) =>
          routine.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          routine.time.includes(searchTerm) ||
          routine.items.some(
            (item) =>
              item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.details.some((detail) =>
                detail.label.toLowerCase().includes(searchTerm.toLowerCase())
              )
          )
      );
      setFilteredRoutines(filtered);
    }
  }, [searchTerm, routines]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {filteredRoutines.length === 0 && searchTerm ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Nenhuma rotina encontrada para &quot;{searchTerm}&quot;
            </p>
          </div>
        ) : (
          filteredRoutines.map((routine, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-secondary mb-2">
                    {routine.time} – {routine.title}
                  </h3>
                  <div className="space-y-2">
                    {routine.items.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        {item.label && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">{item.label}</span>
                            {item.value && (
                              <span className="text-gray-700">
                                {item.value}
                              </span>
                            )}
                          </div>
                        )}
                        {item.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="ml-6 space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">
                                {detail.label}
                              </span>
                              <span className="text-gray-700">
                                {detail.value}
                              </span>
                            </div>
                            {detail.observation && (
                              <p className="text-sm text-gray-500 italic">
                                {detail.observation}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-right space-y-1">
                  {routine.measurements.map((measurement, measureIndex) => (
                    <div
                      key={measureIndex}
                      className="flex justify-between items-center min-w-[100px]"
                    >
                      <span className="text-sm text-gray-600">
                        {measurement.label}
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          measurement.color || "text-gray-900"
                        }`}
                      >
                        {measurement.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
