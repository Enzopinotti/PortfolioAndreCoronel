export default function ButtonFlechaText({ text = 'VER MÁS', onClick }) {
    return (
      <button className="btn-flecha-text" onClick={onClick}>
        <span className="btn-flecha-text__icon">
          <img src="/assets/icons/IconoFlechaTexto.png" alt="" />
        </span>
        {text}
      </button>
    );
  }
  