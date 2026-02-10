"use client"

import { NavigationBar } from "../../components/navigation-bar/navigation-bar";
import Link from "next/link";

export default function MisionVisionPage() {
  return (
    <>
      <NavigationBar />
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">Misión y Visión</h1>
        <div className="bg-white rounded shadow p-6 mb-8 text-justify">
          <h2 className="text-2xl font-semibold text-blue-800 mt-4 mb-2">Misión</h2>
          <p className="text-lg text-gray-800 mb-6">
            Somos un hospital pediátrico de tercer nivel de referencia nacional en atención de patologías clínico quirúrgicas complejas para la población menor a 15 años, con personal capacitado y programas de docencia e investigación permanente.
          </p>
          <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-2">Visión</h2>
          <p className="text-lg text-gray-800 mb-6">
            Ser el 2020 un hospital pediátrico de referencia nacional acreditado, con capacidad resolutiva clínico quirúrgica de alta complejidad, con alta calidad, calidez, liderazgo, seguridad, infraestructura, equipamiento y personal altamente calificado, respetando los derechos humanos y culturales.
          </p>
          <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-2">Valores Institucionales</h2>
          <ul className="list-disc pl-6 text-lg text-gray-800 mb-6">
            <li>Respeto hacia las diferentes culturas, hábitos y procedencias de los ciudadanos.</li>
            <li>Confidencialidad y eficiencia en la relación paciente-médico-hospital.</li>
            <li>Integración de todos los profesionales y colaboradores de la organización.</li>
            <li>Compromiso de educar y ayudar a los ciudadanos en todos los temas relacionados con la salud.</li>
            <li>Compromiso de impartir formación de máxima calidad a especialistas pediátricos.</li>
          </ul>
        </div>
        <div className="flex justify-center mt-6 gap-4">
          <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold">Regresar a Inicio</Link>
          <Link href="/autoridades-create-post" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold">1. Autoridades</Link>
          <Link href="/comite-tecnico-administrativo" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 font-semibold">2. Comité Técnico Administrativo</Link>
          <Link href="/academico" className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 font-semibold">3. Académico</Link>
          <Link href="/nuestro-hospital" className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 font-semibold">Nuestro hospital</Link>
        </div>
      </div>
    </>
  );
}
