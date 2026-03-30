import { useState } from 'react';
import { Element, Link } from 'react-scroll';

// URL del script PHP en DonWeb. El archivo contact.php
// se copia al root del hosting dentro de la carpeta build.
const PHP_ENDPOINT = '/contact.php';

export default function Contact() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setFeedback('');

    try {
      const res = await fetch(PHP_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.ok) {
        setStatus('success');
        setFeedback(data.message);
        setForm({ nombre: '', email: '', mensaje: '' });
      } else {
        setStatus('error');
        setFeedback(data.message || 'Ocurrió un error. Intentá de nuevo.');
      }
    } catch {
      setStatus('error');
      setFeedback('No se pudo conectar. Escribime directamente a info@andrecovar.com.');
    }
  };

  return (
    <Element name="contact" className="contact section" data-theme="dark">
      <div className="contact__container">

        {/* Left Vertical Text */}
        <div className="contact__vertical-text">
          ANDRE COVAR
        </div>

        <div className="contact__main-content">
          <div className="contact__header">
            <h2 className="contact__title">
              ENCONTRAR UN ESPACIO PARA POTENCIAR MI <br />
              <span className="contact__title--gray">CREATIVIDAD, ES MI OBJETIVO.</span>
            </h2>
          </div>

          {/* Contact Form */}
          <form
            className="contact__form"
            onSubmit={handleSubmit}
            noValidate
            id="contact-form"
            aria-label="Formulario de contacto"
          >
            <div className="contact__form-row">
              <div className="contact__field">
                <label htmlFor="contact-nombre" className="contact__label">Nombre</label>
                <input
                  id="contact-nombre"
                  name="nombre"
                  type="text"
                  placeholder="Tu nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  className="contact__input"
                  disabled={status === 'sending'}
                  autoComplete="name"
                />
              </div>
              <div className="contact__field">
                <label htmlFor="contact-email" className="contact__label">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="contact__input"
                  disabled={status === 'sending'}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="contact__field">
              <label htmlFor="contact-mensaje" className="contact__label">Mensaje</label>
              <textarea
                id="contact-mensaje"
                name="mensaje"
                placeholder="Contame de qué se trata..."
                value={form.mensaje}
                onChange={handleChange}
                required
                rows={4}
                className="contact__textarea"
                disabled={status === 'sending'}
              />
            </div>

            {/* Feedback */}
            {feedback && (
              <p className={`contact__feedback contact__feedback--${status}`} role="alert">
                {feedback}
              </p>
            )}

            <div className="contact__form-submit">
              <button
                type="submit"
                className={`contact__submit-btn ${status === 'sending' ? 'contact__submit-btn--loading' : ''}`}
                disabled={status === 'sending'}
                id="contact-submit"
              >
                {status === 'sending' ? (
                  <span className="contact__spinner" aria-label="Enviando…" />
                ) : (
                  <>ENVIAR MENSAJE <span className="contact__button-arrow">↗</span></>
                )}
              </button>
            </div>
          </form>

          <div className="contact__footer">
            <div className="contact__nav-col">
              <nav className="contact__nav">
                <Link to="hero" smooth duration={500}>HOME</Link>
                <Link to="projects" smooth duration={500}>PORTFOLIO</Link>
                <Link to="contact" smooth duration={500}>CONTACTO</Link>
              </nav>
            </div>

            <div className="contact__info-col">
              <p className="contact__objective">
                Aprender en un equipo consolidado es un objetivo claro a la hora de evaluar mi relación laboral, vale más las posibilidades de expansión, que la oferta monetaria.
              </p>

              <div className="contact__socials">
                <a
                  href="https://www.linkedin.com/in/andré-wilber-coronel-vargas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Perfil profesional de LinkedIn de André Covar"
                >
                  LINKEDIN
                </a>
                <a
                  href="https://www.instagram.com/andre_covar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram de André Covar - Proyectos y Backstage"
                >
                  INSTAGRAM
                </a>
                <a
                  href="https://www.behance.net/andrecoronel"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Portfolio de André Covar en Behance"
                >
                  BEHANCE
                </a>
              </div>

              <div className="contact__credits">
                PÁGINA DESARROLLADA POR <a href="https://enzopinotti.dev" target="_blank" rel="noopener noreferrer" className="contact__author">ENZO PINOTTI.</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Element>
  );
}