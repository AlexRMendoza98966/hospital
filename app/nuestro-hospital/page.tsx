"use client"

import { NavigationBar } from "../../components/navigation-bar/navigation-bar";
import Link from "next/link";

export default function NuestroHospitalPage() {
  return (
    <>
      <NavigationBar />
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">Nuestro hospital</h1>
        <div className="bg-white rounded shadow p-6 mb-8 text-justify">
          <p className="text-lg text-gray-800 mb-6">
            El Hospital del Niño "Ovidio Aliaga Uría", es un establecimiento de tercer nivel de atención para niños entre 0 y 14 años, con capacidad de resolución de alta complejidad, desarrolla actividades normativas de promoción, prevención, atención ambulatoria y de hospitalización, curación y rehabilitación así como de investigación. Es parte de la Red de Servicios de Salud del departamento de La Paz y de acuerdo con la normativa vigente depende de la Gobernación de La Paz a través del Servicio Departamental de Salud (SEDES).
          </p>
          <p className="text-lg text-gray-800 mb-6">
            El Hospital está acreditado desde el año 2006 y su desarrollo institucional ha sido reconocido por propios y extraños. La implementación y continuo desarrollo de los Sistemas Informáticos: Administrativo Financiero (SIAF) y Clínico Estadístico (SICE), ha permitido ejecutar el plan estratégico y efectuar el seguimiento de los proyectos en forma sistemática y ordenada.
          </p>
          <p className="text-lg text-gray-800 mb-6">
            Considerado el principal hospital pediátrico del país por su historia, desarrollo y prestigio, si bien es el centro de referencia pediátrico del departamento de La Paz, en la práctica recibe y atiende pacientes referidos de toda Bolivia, principalmente de los departamentos de Oruro, Potosí, Beni y Pando.
          </p>
          <p className="text-lg text-gray-800 mb-6">
            A lo largo de su historia de 42 años ha cobijado a especialistas y sub-especialistas formados en diferentes centros de formación, hace 40 años forma especialistas pediatras siendo el primer hospital con residencia en Pediatría en Bolivia. Varios de sus ex residentes forman ahora parte de su equipo de especialistas.
          </p>
          <p className="text-lg text-gray-800 mb-6">
            Es un establecimiento hospitalario incluido en el Convenio de Integración Docente Asistencial por lo que sus dependencias y personal apoyan la formación en pregrado de la Universidad Mayor de San Andrés, la Universidad pública más grande de Bolivia.
          </p>
        </div>
        <div className="flex justify-center mt-6 gap-4">
          <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold">Regresar a Inicio</Link>
          <Link href="/autoridades-create-post" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold">1. Autoridades</Link>
          <Link href="/comite-tecnico-administrativo" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 font-semibold">2. Comité Técnico Administrativo</Link>
          <Link href="/academico" className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 font-semibold">3. Académico</Link>
        </div>
      </div>
    </>
  );
}
