import { useState } from 'react';
import { Element } from 'react-scroll';
import ButtonFlecha from '../../../components/ButtonFlecha';
import { reelsData } from '../../../data/videoData';

export default function Hero() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const playRandomVideo = () => {
    const randomIndex = Math.floor(Math.random() * reelsData.length);
    setSelectedVideo(reelsData[randomIndex]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <Element name="hero" className="hero">
      <video 
        className="hero__video" 
        autoPlay 
        muted 
        loop 
        playsInline
        poster="/assets/img/fondoHome.png"
      >
        <source src="/assets/fondos/videohero.webm" type="video/webm" />
        <source src="/assets/fondos/videohero.mp4" type="video/mp4" />
      </video>
      <div className="hero__overlay">
        <div className="hero__content">
          <h1 className="hero__title">
            <span>ANDRE</span><br />
            <span>COVAR</span>
          </h1>

          <h2 className="hero__subtitle">
            Realizador Audiovisual & Editor Multimedia
          </h2>

          <p className="hero__text">
            Especializado en postproducción de video, trabajo desde una mirada audiovisual que prioriza el detalle, la claridad y la sensibilidad estética. Busco crear piezas con identidad propia, pensadas para comunicar de manera simple y efectiva, sin quedar atadas al esquema de siempre.
          </p>

          <div className="hero__ctas-wrapper">
            <span className="hero__ctas-label">VER TRABAJOS</span>
            <div className="hero__ctas">
              {Array(3).fill(0).map((_, i) => (
                <ButtonFlecha key={i} onClick={playRandomVideo} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedVideo && (
        <div className="hero__modal" onClick={closeModal}>
          <div className="hero__modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="hero__modal-close" onClick={closeModal}>&times;</button>
            <video
              autoPlay
              controls
              className="hero__modal-video"
              src={selectedVideo.videoSrc}
            >
              Tu navegador no soporta videos.
            </video>
            <div className="hero__modal-caption">
              {selectedVideo.title}
            </div>
          </div>
        </div>
      )}
    </Element>
  );
}
