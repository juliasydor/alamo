"use client";

import { Calendar, Home, BarChart3, Users } from "lucide-react";

const menuItems = [
  {
    title: "Página Inicial",
    url: "/",
    icon: Home,
  },
  {
    title: "Clientes",
    url: "/clients",
    icon: Users,
  },
  {
    title: "Agenda",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Financeiro",
    url: "/financial",
    icon: BarChart3,
  },
];

export function AppSidebar() {
  return (
    <aside className="bg-sidebar w-60 min-h-screen border-r border-gray-200 p-6 flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">MC</span>
          </div>
          <span className="text-secondary font-medium">Marcelo Cavalcante</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.title}>
              <a
                href={item.url}
                className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-secondary rounded-lg transition-colors"
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
