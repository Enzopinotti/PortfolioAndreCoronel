import iconoFlechaTexto from '../assets/icons/IconoFlechaTexto.png';

export default function ButtonFlechaText({ text = 'VER MÁS', onClick }) {
  return (
    <button className="btn-flecha-text" onClick={onClick}>
      <span className="btn-flecha-text__icon">
        <img src={iconoFlechaTexto} alt="" />
      </span>
      {text}
    </button>
  );
}
