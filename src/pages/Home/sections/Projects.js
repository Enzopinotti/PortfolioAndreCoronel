import { useState } from 'react';
import { Element } from 'react-scroll';
import ProjectSlider from '../../../components/layout/Projects/ProjectSlider';

const proyectos = [
  {
    id: 'resiliencia-sera',
    nombre: 'Resiliencia Será',
    anio: 2019,
    descripcion:
      'Adaptación audiovisual de la obra de danza contemporánea “Resiliencia” de Rocío Surace. Proyecto bajo mi dirección, para la materia de Realización 4 en la Facultad de Artes, UNLP.',
    imagenes: [
      '/assets/img/proyectos/ResilienciaSera/ResilienciaSera1.webp',
      '/assets/img/proyectos/ResilienciaSera/ResilienciaSera2.webp',
      '/assets/img/proyectos/ResilienciaSera/ResilienciaSera3.webp',
      '/assets/img/proyectos/ResilienciaSera/ResilienciaSera4.webp',
    ],
  },
  {
    id: 'caso-baez-sosa',
    nombre: 'Caso: Baez Sosa',
    anio: 2020,
    descripcion: 'Realizado bajo mi direccion audiovisual y postproduccion. Guione investigación por Antonella Lerda, ambos trabajando en el medio de comunicación digital Blick News. El videos fue fraccionado en 10 partes que se subieron en una ista de reproducción de TikTok y se viralizaron todos los videos, siendo el capitulo de la vida de Fernando y el de la condena, los mas vistos.',
    imagenes: [
      '/assets/img/proyectos/CasoBaezSosa/CasoBaezSosa1.webp',
      '/assets/img/proyectos/CasoBaezSosa/CasoBaezSosa2.webp',
      '/assets/img/proyectos/CasoBaezSosa/CasoBaezSosa3.webp',
    ],
  },
  {
    id: 'el-amor-no-se-parece-a-esto',
    nombre: 'El Amor no se parece a esto',
    anio: 2022,
    descripcion:
      'Cortometraje realizado por Melany Kollman y Amparo barbosa, en el que me desempeñe como director fotografía. Fue parte de la seleccionselección del Fesalp 2023, en la convocatoria nacional.',
    imagenes: [
      '/assets/img/proyectos/ElAmorNoSePareceAEsto/ElAmorNoSePareceAEsto1.webp',
      '/assets/img/proyectos/ElAmorNoSePareceAEsto/ElAmorNoSePareceAEsto2.webp',
    ],
  },
  {
    id: 'interno-cortometraje',
    nombre: 'Interno Cortometraje',
    anio: 2021,
    descripcion:
      'Cortometraje realizado por el colectivo audiovisual Toma7, bajo mi producción. SeleccionSelección oficial del festival de cine Render, en Lima, Perú. El corto tuvo un evento de estreno online, en el que la mitad de todo lo recaudado fue donado al centro de prevencion de abuso infantil de Arequipa. Se vendieron mas de 500 entradas.',
    imagenes: [
      '/assets/img/proyectos/InternoCortometraje/InternoCortometraje1.webp',
      '/assets/img/proyectos/InternoCortometraje/InternoCortometraje2.webp',
    ],
  },
  {
    id: 'premios-mercurio',
    nombre: 'Premios Mercurio',
    anio: 2024,
    descripcion:
      '2024 - Shit Happens, convirtiendo limones en limonada Video expositivo para presentar el caso de éxito de la distribuidora veterinaria KronenVet, y el plan estratégico en marketing de Fedes consultora. Video ganador en la categoría Productos veterinarios, en los premios Mercurio, otorgado por la Asociación Argentina de Marketing.',
    imagenes: [
      '/assets/img/proyectos/PremiosMercurio/PremiosMercurio1.webp',
      '/assets/img/proyectos/PremiosMercurio/PremiosMercurio2.webp',
      '/assets/img/proyectos/PremiosMercurio/PremiosMercurio3.webp',
    ],
  },
  // ...Interno Cortometraje, El Amor no se parece a esto, Premios Mercurio
];

export default function Projects() {
  const [activo, setActivo] = useState(proyectos[0]);

  return (
    <Element name="projects" className="projects section">
      <h2 className="section__title">Mis Proyectos</h2>
      <article className="article__container">
          <ul className="projects__tabs">
            {proyectos.map((p) => (
              <li
                key={p.id}
                className={`projects__tab ${
                  activo.id === p.id ? 'active' : ''
                }`}
                onClick={() => setActivo(p)}
              >
                {p.nombre.toUpperCase()}
              </li>
            ))}
          </ul>

          <div className="projects__content">
            <ProjectSlider imagenes={activo.imagenes} />

            <div className="project__info fade-in">
              <h3 className="project__title">
                {activo.anio} – {activo.nombre}
              </h3>
              
              <p className="project__desc">{activo.descripcion}</p>

              <button className="project__btn">
                <img src="/assets/icons/IconoFlechaTexto.png" alt="" />
                VER MÁS
              </button>
            </div>
          </div>
      </article>
      
      

      
    </Element>
  );
}
