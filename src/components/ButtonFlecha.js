import iconoFlecha from '../assets/icons/iconoFlecha.png';

export default function ButtonFlecha({ size = 80, onClick }) {
  return (
    <button
      className="btn-flecha"
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <img src={iconoFlecha} alt="" />
    </button>
  );
}
