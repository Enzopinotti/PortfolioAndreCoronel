import { Element } from 'react-scroll';

export default function Hero() {
  return (
    <Element name="hero" className="hero"
    style={{
      backgroundImage: "url('/assets/img/fondoHome.png')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}>
      <div className="hero__overlay">
        <div className="hero__content">
          <h1 className="hero__title">
            <span>ANDRE</span><br />
            <span>COVAR</span>
          </h1>

          <h2 className="hero__subtitle">
            Editor audiovisual y modelador 3D
          </h2>

          <p className="hero__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            porttitor sed mi a accumsan. Vestibulum dictum congue tellus at
            mollis.
          </p>

          <div className="hero__ctas">
            {Array(3).fill(0).map((_, i) => (
              <button key={i} className="hero__cta">
                <img src="/assets/icons/iconoFlecha.png" alt="CTA" className='iconoFlecha'/>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Element>
  );
}
