"use client"

import { NavigationBar } from "../../components/navigation-bar/navigation-bar";
import Link from "next/link";

const autoridades = [
  {
    nombre: "Dr. Wilfredo Pasten Gironda",
    cargo: "DIRECTOR",
    color: "blue",
    iniciales: "WP"
  },
  {
    nombre: "Lic. Lizeth Elvira Mamani Titerico",
    cargo: "SUB-DIRECCIÓN ADMINISTRATIVA FINANCIERA",
    color: "green",
    iniciales: "LM"
  },
  {
    nombre: "Dr. Hector T. Mejia Salas",
    cargo: "JEFE DE CIRUGÍA PEDIÁTRICA",
    color: "purple",
    iniciales: "HM"
  },
  {
    nombre: "Dra. Viviana Raquel Barrón Moncada",
    cargo: "JEFE DE ENSEÑANZA E INVESTIGACION",
    color: "yellow",
    iniciales: "VB"
  },
  {
    nombre: "Dra.",
    cargo: "JEFE DE SERVICIOS COMPLEMENTARIOS DE DIAGNÓSTICO Y TRATAMIENTO",
    color: "pink",
    iniciales: "SC"
  },
  {
    nombre: "Dra. Astrid Riveros Morón",
    cargo: "JEFA DE PEDIATRÍA AMBULATORIA",
    color: "red",
    iniciales: "AR"
  },
  {
    nombre: "Lic. Celia Z. Limachi Palacios",
    cargo: "RESPONSABLE DE TRASPLANTE DE MÉDULA ÓSEA",
    color: "teal",
    iniciales: "CL"
  },
  {
    nombre: "JEFA DE ENFERMERIA",
    cargo: "JEFA DE ENFERMERIA",
    color: "gray",
    iniciales: "JE"
  }
];

export default function ComiteTecnicoAdministrativoPage() {
  return (
    <>
      <NavigationBar />
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">Comité Técnico Administrativo</h1>
        <div className="bg-white rounded shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {autoridades.map((a, idx) => (
              <div key={idx} className="flex items-center py-6">
                <div className="flex-shrink-0 mr-6">
                  <div className={`w-16 h-16 rounded-full bg-${a.color}-100 flex items-center justify-center text-${a.color}-800 text-2xl font-bold border-2 border-${a.color}-300`}>
                    <span aria-label="initials" suppressHydrationWarning>{String(a.iniciales)}</span>
                  </div>
                </div>
                <div>
                  <span className={`text-lg font-bold text-${a.color}-900`}>{a.nombre}</span>
                  <div className="text-sm text-gray-700 mt-1">{a.cargo}</div>
                  <span className={`inline-block mt-2 px-3 py-1 bg-${a.color}-50 text-${a.color}-700 rounded-full text-xs font-semibold`}>{a.cargo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold">Regresar a Inicio</Link>
        </div>
      </div>
    </>
  );
}
