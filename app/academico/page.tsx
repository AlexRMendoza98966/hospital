"use client"


import { NavigationBar } from "../../components/navigation-bar/navigation-bar";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export default function AcademicoPage() {
  const { isAuthenticated, user } = useAuth();
  return (
    <>
      <NavigationBar />
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="mb-4 flex justify-end">
          {isAuthenticated ? (
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">Logueado {user?.rol ? `(${user.rol})` : ''}</span>
          ) : (
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">No logueado</span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">Académico</h1>
        <div className="bg-white rounded shadow p-6 mb-8 text-justify">
          <p className="text-lg text-gray-800 mb-6">
            El Hospital del Niño “Dr. Ovidio Aliaga Uría” ejerce una intensa actividad académica propia, dirigida al plantel médico, de enfermería y de otros profesionales del Hospital, así como la dirigida a estudiantes de pregrado y postgrado.
          </p>
          <p className="text-lg text-gray-800 mb-6">
            El hospital tiene una actividad académica reconocida, realiza con regularidad sesiones bibliográficas, clínico radiológicas, clínico patológicas, de morbi-mortalidad, además de las sesiones de discusión de casos y la visita general. Todas estas actividades están calendarizadas.
          </p>
          <p className="text-lg text-gray-800 mb-6">
            El Convenio de Integración Docente Asistencial firmado por el Gobierno Nacional representado por el Ministerio de Salud, los Gobiernos Municipales representados por la FAM (Federación de Asociaciones Municipales), el CEUB (Comité Ejecutivo de la Universidad Boliviana) en representación de las Universidades Públicas de Bolivia mas el Colegio Médico de Bolivia, establece que todos los establecimientos de salud del país deben complementar sus servicios asistenciales con la docencia, interacción e investigación tanto en pregrado como el post grado, todos los profesionales de salud son reconocidos como docentes asistenciales.
          </p>
          <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-4">Pre Grado</h2>
          <p className="text-lg text-gray-800 mb-6">
            Como parte del Convenio de Integración Docente Asistencial el Hospital acoge a estudiantes de las universidades públicas, especialmente de la Universidad Mayor de San Andrés de La Paz,  de las carreras de Medicina, Enfermería, Nutrición, Tecnología Médica (Laboratorio Clínico, Fisioterapia y Radiología), Bioquímica, Farmacia, Trabajo Social y Psicología, de acuerdo a su malla curricular estudiantes de diferentes niveles realizan rotes en servicios y ambientes del Hospital.
          </p>
          <p className="text-lg text-gray-800 mb-6">
            De la misma manera sus servicios están abiertos a la práctica de estudiantes de la Escuela Nacional de Salud Pública dependiente del Ministerio de Salud y Deportes, que forma Auxiliares de Enfermería.
          </p>
          <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-4">Post Grado</h2>
          <p className="text-lg text-gray-800 mb-6">
            Además de la formación de médicos residentes en la especialidad de Pediatría del mismo hospital, la Jefatura de Enseñanza e Investigación a través de convenios específicos permite la rotación en servicios específicos: Unidad de Cuidado Intensivo Pediátrico, Gastroenterología e Infectología de Médicos Residentes de la especialidad de Pediatría de hospitales de Oruro, Potosí, Cobija y Cochabamba.
          </p>
          <p className="text-lg text-gray-800 mb-6">
            Rotan también por los servicios correspondientes médicos residentes provenientes de otros hospitales de la ciudad de La Paz y de otras ciudades de Bolivia, de las especialidades de Cirugía Pediátrica, Traumatología, Anestesiología, Neurocirugía, Neurología y Medicina Familiar.
          </p>
          <p className="text-lg text-gray-800 mb-6">
            Por otro lado y a través de convenios específicos médicos de la Red de Servicios de Salud de la ciudad de La Paz, que trabajan en establecimientos de primer nivel de atención realizan pasantías cortas por el Servicio de Emergencias.
          </p>
        </div>
        <div className="flex justify-center mt-6 gap-4">
          <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold">Regresar a Inicio</Link>
          <Link href="/autoridades-create-post" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold">1. Autoridades</Link>
          <Link href="/comite-tecnico-administrativo" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 font-semibold">2. Comité Técnico Administrativo</Link>
        </div>
      </div>
    </>
  );
}
