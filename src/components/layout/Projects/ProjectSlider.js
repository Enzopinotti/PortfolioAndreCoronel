import { useEffect, useState } from 'react';

export default function ProjectSlider({ imagenes = [] }) {
  const [index, setIndex] = useState(0);

  //   cambia cada 4 s
  useEffect(() => {
    const t = setInterval(
      () => setIndex((prev) => (prev + 1) % imagenes.length),
      4000
    );
    return () => clearInterval(t);
  }, [imagenes]);

  const prev = () =>
    setIndex(index === 0 ? imagenes.length - 1 : index - 1);
  const next = () => setIndex((index + 1) % imagenes.length);

  return (
    <div className="slider">
      {imagenes.map((src, i) => (
        <img
          key={i}
          src={src}
          className={`slider__img ${i === index ? 'active' : ''}`}
          alt={`Slide ${i + 1}`}
        />
      ))}

      <button className="slider__arrow left"  onClick={prev}>
        <img src="/assets/icons/flechaSliderIzquierda.png" alt="Prev" />
      </button>

      <button className="slider__arrow right" onClick={next}>
        <img src="/assets/icons/flechaSliderDerecha.png" alt="Next" />
      </button>
    </div>
  );
}
