"use client"

import { Home, Users, Megaphone, FileText, Calendar, Stethoscope, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { getComunicadoCounts, getDepartamentos, createDepartamento, deleteDepartamento } from "@/app/actions"
import { useAuth } from "@/context/AuthContext"
import AddDepartamentoModal from "./AddDepartamentoModal"

export function Sidebar() {
  const [counts, setCounts] = useState({ anuncio: 0, comunicado: 0, convocatoria: 0 });
  const [departamentos, setDepartamentos] = useState<any[]>([]);
  const { isAuthenticated, user } = useAuth();
  const isAdmin = isAuthenticated && (user?.rol === 'admin' || user?.rol === 'administrador');

  const fetchDeps = () => {
    getDepartamentos().then(setDepartamentos);
  };

  useEffect(() => {
    getComunicadoCounts().then((data) => {
      // @ts-ignore
      setCounts(data);
    });
    fetchDeps();
  }, []);

  const handleDeleteDep = async (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este departamento?")) {
      const res = await deleteDepartamento(id);
      if (res.success) fetchDeps();
      else alert(res.message);
    }
  };

  return (
    <aside className="hidden p-4 bg-white rounded-lg lg:block w-72">
      <div className="space-y-2">
        <Button variant="ghost" className="justify-start w-full h-12">
          <Avatar className="w-8 h-8 mr-3">
          </Avatar>
          DETALLES
        </Button>

        <Button variant="ghost" className="justify-start w-full h-12 text-blue-700 bg-blue-50">
          <Home className="w-5 h-5 mr-3" />
          Inicio
        </Button>

        <Button variant="ghost" className="justify-start w-full h-12">
          <Megaphone className="w-5 h-5 mr-3 text-orange-600" />
          Anuncios
          <Badge className="ml-auto text-orange-600 bg-orange-100">{counts.anuncio}</Badge>
        </Button>

        <Button variant="ghost" className="justify-start w-full h-12">
          <FileText className="w-5 h-5 mr-3 text-blue-600" />
          Comunicados
          <Badge className="ml-auto text-blue-600 bg-blue-100">{counts.comunicado}</Badge>
        </Button>

        <Button variant="ghost" className="justify-start w-full h-12">
          <Users className="w-5 h-5 mr-3 text-green-600" />
          Convocatorias
          <Badge className="ml-auto text-green-600 bg-green-100">{counts.convocatoria}</Badge>
        </Button>

        <Button variant="ghost" className="justify-start w-full h-12">
          <Calendar className="w-5 h-5 mr-3 text-purple-600" />
          Eventos
        </Button>

      </div>

      <hr className="my-4" />

      <div>
        <div className="flex items-center justify-between px-3 mb-3">
          <h3 className="font-semibold text-gray-600">Departamentos</h3>
          {isAdmin && (
            <AddDepartamentoModal onSuccess={fetchDeps} />
          )}
        </div>
        <div className="space-y-1">
          {departamentos.map((dep) => (
            <div key={dep.id} className="group relative pr-8">
              <Button variant="ghost" className="justify-start w-full h-10 truncate pr-2">
                <div className="flex items-center justify-center w-6 h-6 mr-3 bg-blue-50 rounded">
                  <span className="text-xs">{dep.icon || "🏥"}</span>
                </div>
                {dep.nombre_departamento}
              </Button>
              {isAdmin && (
                <button
                  onClick={() => handleDeleteDep(dep.id)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity p-1"
                  title="Eliminar departamento"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
          {departamentos.length === 0 && (
            <p className="px-3 text-xs text-gray-400 italic">No hay departamentos registrados.</p>
          )}
        </div>
      </div>

      <hr className="my-4" />
    </aside>
  )
}
