import { Link } from 'react-scroll';

const links = [
  { label: 'Inicio', to: 'hero' },
  { label: 'Servicios', to: 'services' },
  { label: 'Proyecto', to: 'projects' },
  { label: 'Contacto', to: 'contact' },
  { label: 'Virales', to: 'virals' },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar__inner">
        <div className="navbar__logo_container">
          <img
            className="navbar__logo"
            src="/assets/img/logo.png"
            alt="Logo André Covar"
          />
        </div>
       
        <ul className="navbar__menu">
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
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
