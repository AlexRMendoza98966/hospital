import React from 'react';
import styles from './presentacion.module.css';

const PresentacionPage = () => {
  return (
    <div className={styles.presentacionContainer}>
      <div className={styles.presentacionContent}>
        <h1>PRESENTACIÓN</h1>
        <p>
          El Hospital del Niño "Ovidio Aliaga Uría", es un establecimiento de tercer nivel de atención para niños entre 0 y 14 años, con capacidad de resolución de alta complejidad, desarrolla actividades normativas de promoción, prevención, atención ambulatoria y de hospitalización, curación y rehabilitación así como de investigación. Es parte de la Red de Servicios de Salud del departamento de La Paz y de acuerdo con la normativa vigente depende de la Gobernación de La Paz a través del Servicio Departamental de Salud (SEDES).
        </p>
        <p>
          El Hospital está acreditado desde el año 2006 y su desarrollo institucional ha sido reconocido por propios y extraños. La implementación y continuo desarrollo de los Sistemas Informáticos: Administrativo Financiero (SIAF) y Clínico Estadístico (SICE), ha permitido ejecutar el plan estratégico y efectuar el seguimiento de los proyectos en forma sistemática y ordenada.
        </p>
        <p>
          Considerado el principal hospital pediátrico del país por su historia, desarrollo y prestigio, si bien es el centro de referencia pediátrico del departamento de La Paz, en la práctica recibe y atiende pacientes referidos de toda Bolivia, principalmente de los departamentos de Oruro, Potosí, Beni y Pando.
        </p>
        <p>
          A lo largo de su historia de 42 años ha cobijado a especialistas y sub-especialistas formados en diferentes centros de formación, hace 40 años forma especialistas pediatras siendo el primer hospital con residencia en Pediatría en Bolivia. Varios de sus ex residentes forman ahora parte de su equipo de especialistas.
        </p>
        <p>
          Es un establecimiento hospitalario incluido en el Convenio de Integración Docente Asistencial por lo que sus dependencias y personal apoyan la formación en pregrado de la Universidad Mayor de San Andrés, la Universidad pública más grande de Bolivia.
        </p>
      </div>
    </div>
  );
};

export default PresentacionPage;
