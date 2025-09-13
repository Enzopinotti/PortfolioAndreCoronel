export default function ButtonFlecha({ size = 80, onClick }) {
    return (
      <button
        className="btn-flecha"
        style={{ width: size, height: size }}
        onClick={onClick}
      >
        <img src="/assets/icons/iconoFlecha.png" alt="" />
      </button>
    );
  }
  