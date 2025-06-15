"use client";

import {
  Search,
  Plus,
  MessageSquare,
  HelpCircle,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/app/providers";

export function Header() {
  const { searchTerm, setSearchTerm } = useSearch();

  const handleSearch = () => {
    console.log("Buscando por:", searchTerm);
    // O estado já está sendo compartilhado via contexto
  };

  const handleAdvancedFilter = () => {
    console.log("Abrindo filtragem avançada");
    // Aqui você pode implementar a lógica de filtros avançados
  };

  return (
    <div className="w-full bg-white">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-2 border-b border-gray-100">
        <div className="text-sm text-gray-600">Cadastros</div>
        <div className="flex items-center gap-3">
          <span className="text-primary font-semibold text-lg">Alamo</span>
          <div className="bg-primary text-white px-2 py-1 rounded text-xs font-medium">
            Tarefas
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-gray-400" />
            <HelpCircle className="h-4 w-4 text-gray-400" />
            <Settings className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-secondary">
            Gestão de rotinas de laboratório
          </h1>
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg px-4 py-2">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Rotina
          </Button>
        </div>

        {/* Search section */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Buscar rotinas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10 border-gray-300 rounded-lg"
            />
          </div>
          <Button
            variant="default"
            onClick={handleSearch}
            className="bg-primary hover:bg-primary/90 text-white rounded-lg px-4 py-2"
          >
            Buscar
          </Button>
          <Button
            variant="outline"
            onClick={handleAdvancedFilter}
            className="border-gray-300 text-gray-700 rounded-lg px-4 py-2"
          >
            Filtragem Avançada
          </Button>
        </div>
      </div>
    </div>
  );
}
