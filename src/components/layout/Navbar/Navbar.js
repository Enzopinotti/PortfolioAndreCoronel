import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';

import logo from '../../../assets/img/logo.png';

const links = [
  { label: 'Inicio', to: 'hero' },
  { label: 'Proyectos', to: 'projects' },
  { label: 'Reels', to: 'reels' },
  { label: 'Contacto', to: 'contact' },
];

export default function Navbar() {
  const [isLight, setIsLight] = useState(false);
  const [show, setShow] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Mostrar/Ocultar lógica
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShow(false); // Bajando
      } else {
        setShow(true); // Subiendo
      }
      lastScrollY.current = currentScrollY;

      // Detección de tema claro
      const lightElements = document.querySelectorAll('[data-theme="light"]');
      let foundLight = false;
      const navCenter = window.innerWidth / 2;

      lightElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        // Si el área del navbar (top 0 a 80px aprox) colisiona con el elemento light
        if (rect.top <= 80 && rect.bottom >= 0 &&
          rect.left <= navCenter && rect.right >= navCenter) {
          foundLight = true;
        }
      });

      setIsLight(foundLight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Detección inicial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className={`navbar ${isLight ? 'navbar--light' : ''} ${show ? 'navbar--show' : 'navbar--hide'}`}>
      <nav className="navbar__inner">
        <div className="navbar__logo_container">
          <img
            className="navbar__logo"
            src={logo}
            alt="Logo André Covar"
          />
        </div>

        <div className="navbar__hamburger" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`navbar__menu ${isOpen ? 'navbar__menu--open' : ''}`}>
          {links.map(({ label, to }) => (
            <li className="navbar__item" key={to}>
              <Link
                to={to}
                spy
                smooth
                offset={-80}
                duration={600}
                className="navbar__link"
                activeClass="navbar__link--active"
                onClick={closeMenu}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Backdrop for mobile */}
        {isOpen && <div className="navbar__backdrop" onClick={closeMenu}></div>}
      </nav>
    </header>
  );
}
