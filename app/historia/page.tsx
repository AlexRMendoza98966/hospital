"use client"

import { NavigationBar } from "../../components/navigation-bar/navigation-bar";
import Link from "next/link";

export default function HistoriaPage() {
  return (
    <>
      <NavigationBar />
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">Historia del Hospital del Niño – Dr. Zamora</h1>
        <div className="bg-white rounded shadow p-6 mb-8 text-justify">
          <p className="text-lg text-gray-800 mb-6">
            Durante el gobierno de Hertzog el año de 1948, siendo Ministro de Higiene y Salubridad, el Dr. Juan Manuel Balcázar, Director General de Sanidad, el Dr. Néstor Salinas Aramayo, Catedrático de Pediatría y, Director de la División de Planeamiento y Proyectos del Servicio Corporativo Interamericano de la Salud Pública (SCISP), el Dr. Carlos Ferrufino Burgoa, pediatra, se dio curso a una disposición legal (Ley de 20 de mayo 1947) por la cual a partir de los beneficios otorgados por la Lotería Nacional y con el asesoramiento y cooperación del SCISP se efectúen trabajos de infraestructura sanitaria, de los cuales los más importantes correspondían al Hospital del Niño y al pabellón Bronco pulmonar de La Paz.  Esta disposición venía a abrir el camino de la brillante idea de la Sociedad Boliviana de Pediatría, que fundada el 7 de abril de 1943, había iniciado sus actividades propugnando la creación de un Hospital del Niño; a cinco años de su fundación y bajo la iniciativa de las autoridades de salud de la época, se aprobó la idea inicial de construir el Hospital del Niño con el apoyo del “Rotary Club de La Paz”.
          </p>
          <p className="text-lg text-gray-800 mb-6">
            En el periodo de gobierno de Mamerto Urriolagoitia, siendo Ministro de Salud el señor Félix Veintemillas, se creó la junta de Directores del Hospital del Niño de La Paz (R.M. N° 2185 de 15 de septiembre de 1949) con la finalidad de supervisar y ayudar a la construcción, equipamiento y funcionamiento de este hospital.
          </p>
          <p className="text-lg text-gray-800 mb-6">
            En 1950 se constituyó el Comité Medico Técnico del Hospital del Niño, conformado por el Dr. Néstor Salinas Arauco, en representación del gobierno, el señor Félix Lamela, representante de organismos internacionales y por tres pediatras: Dres. Carlos Ferrrufino, Cecilio Abela Dehesa y Luis V. Sotelo por la Sociedad de Pediatría.  Definido el Plan General Técnico y aprobado el Proyecto se inició la construcción del Hospital del Niño con fondos proporcionados por el Gobierno para la estructura física, el equipamiento y provisión de enseres incluyendo el sistema de calefacción por parte de la UNICEF. La OPS/OMS contribuyó con la adjudicación de becas para la preparación de médicos y enfermeras, y el SCISP para la capacitación del personal administrativo.
          </p>
          <p className="text-lg text-gray-800 mb-6">
            En el año 1953 se había terminado con la obra gruesa del Hospital, proyectada con una capacidad de 212 camas, pero a consecuencia de la revolución de 1952, las obras quedaron paralizadas hasta el año 1971, entonces en los periodos sucesivos de los Ministerios de Previsión Social y Salud Pública de los Dres. Guillermo Aponte Burela y Javier Torres Goitia, se iniciaron los trabajos de obra fina con los que parecía concluir el trabajo, el que fue nuevamente interrumpido debido al golpe de estado militar d ese año.
          </p>
          <p className="text-lg text-gray-800 mb-6">
            Fue en el año de 1972 que se termino la obra durante el Ministerio del Dr. Carlos Valverde Barbery, abriendo sus puertas para la admisión de pacientes el 10 de agosto, con una disponibilidad de 50 camas habiéndose internado durante su primer día de trabajo 12 pacientes. El Hospital del Niño empezó  sus actividades  con el equipamiento que fue trasladado del antiguo pabellón de Pediatría del Hospital de Miraflores, los servicios que iniciaron en aquella época según sus historiadores fueron: Pediatría General, Ortopedia, Traumatología, Cirugía General y Quemados, estando a cargo de los Drs. Eduardo Vela, Aníbal Rivero Delfín, Franz Prudencio, Víctor Hugo Chávez y Armando Barrios. El primer director del Hospital del Niño fue el Dr. Alfredo Negrón.
          </p>
          <p className="text-lg text-gray-800 mb-6">
            Desde su fundación el hospital ha desarrollado una meritoria labor académica en la enseñanza de la materia de Pediatría de pre-grado, que se había iniciado con el Dr. Néstor Salinas Arauco  en el pabellón de Pediatría del Hospital de Miraflores y posteriormente el Programa de Residencia Médica con grandes problemas que vencer hasta llegar a consolidar el curso formal de post grado en pediatría, bajo la modalidad de Residencia Médica, impulsada por los Dres. Aníbal Rivero, Gover León y Eduardo Aranda Torrelio, con la participación de especialistas y profesores de pediatría.
          </p>
          <p className="text-lg text-gray-800 mb-6">
            El Hospital del Niño ha tomado el nombre del Dr. Ovidio Aliaga Uría como justo reconocimiento al trabajo incansable y especial dedicación de este digno representante de la pediatría boliviana, quien logró que el Hospital del Niño bajo su Dirección sea nombrado el mejor Hospital de Bolivia en el año 1988.
          </p>
        </div>
        <div className="flex justify-center mt-6 gap-4">
          <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold">Regresar a Inicio</Link>
          <Link href="/autoridades-create-post" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold">1. Autoridades</Link>
          <Link href="/comite-tecnico-administrativo" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 font-semibold">2. Comité Técnico Administrativo</Link>
          <Link href="/academico" className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 font-semibold">3. Académico</Link>
          <Link href="/nuestro-hospital" className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 font-semibold">Nuestro hospital</Link>
          <Link href="/mision-vision" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-semibold">Misión y Visión</Link>
        </div>
      </div>
    </>
  );
}
