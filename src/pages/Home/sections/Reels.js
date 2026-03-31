import { useState, useRef, useEffect, useCallback } from 'react';
import { Element } from 'react-scroll';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp, FaExpand, FaTimes } from 'react-icons/fa';
import { reelsData } from '../../../data/videoData';

// Custom hook whose value is true when the user is idle
function useIdle(timeout = 3000) {
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const handleActivity = () => {
      setIsIdle(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setIsIdle(true), timeout);
    };

    // Events to track activity
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    events.forEach(event => window.addEventListener(event, handleActivity));

    // Initialize timer
    timerRef.current = setTimeout(() => setIsIdle(true), timeout);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach(event => window.removeEventListener(event, handleActivity));
    };
  }, [timeout]);

  return isIdle;
}

// Custom hook for mobile detection
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}

function ReelItem({ reel, isMobile, shakingId, onVisibilityChange, onExpand }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        onVisibilityChange(reel.id, entry.isIntersecting);
        if (entry.isIntersecting) {
          if (videoRef.current) {
            videoRef.current.play().catch(e => console.log("Autoplay prevented", e));
            setIsPlaying(true);
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [reel.id, onVisibilityChange]);

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const handleExpand = (e) => {
    e.stopPropagation();
    onExpand(reel);
  };

  return (
    <div
      ref={containerRef}
      className={`reels__item ${shakingId === reel.id ? 'reels__item--shaking' : ''}`}
    >
      <div className="reels__video-wrapper" onClick={toggleMute}>
        <video
          ref={videoRef}
          src={reel.videoSrc}
          poster={reel.poster}
          muted={isMuted}
          loop
          playsInline
          className="reels__video"
        />
        <div className="reels__controls">
          <button className="reels__control-btn" onClick={toggleMute}>
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <button className="reels__control-btn" onClick={handleExpand}>
            <FaExpand />
          </button>
        </div>
      </div>
      <h3 className="reels__item-title">{reel.title}</h3>
    </div>
  );
}

export default function Reels() {
  const [visibleRows, setVisibleRows] = useState(4);
  const [shakingId, setShakingId] = useState(null);
  const [visibleReelIds, setVisibleReelIds] = useState(new Set());
  const [expandedReel, setExpandedReel] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const isMobile = useIsMobile();
  const isIdle = useIdle(1000); // 1 second of inactivity

  // Group items for Desktop (4 columns)
  // On mobile we just use a flat list for carousel
  const itemsToShow = reelsData.slice(0, visibleRows * 4); // Always slice for consistent loading

  // Track visibility
  const handleVisibilityChange = useCallback((id, isVisible) => {
    setVisibleReelIds(prev => {
      const newSet = new Set(prev);
      if (isVisible) newSet.add(id);
      else newSet.delete(id);
      return newSet;
    });
  }, []);

  // Logic to shake random video
  useEffect(() => {
    if (!isIdle || expandedReel) {
      setShakingId(null);
      return;
    }

    const interval = setInterval(() => {
      if (isIdle && visibleReelIds.size > 0) {
        // Pick a random ID from visible items
        const visibleIdsArray = Array.from(visibleReelIds);
        const randomId = visibleIdsArray[Math.floor(Math.random() * visibleIdsArray.length)];
        setShakingId(randomId);

        // Stop shaking after a short time
        setTimeout(() => setShakingId(null), 1000);
      }
    }, 4000); // Trigger every 4 seconds while idle

    return () => clearInterval(interval);
  }, [isIdle, visibleReelIds, expandedReel]);

  // Expand logic
  const handleExpand = (reel) => {
    setExpandedReel(reel);
  };

  const handleCloseExpanded = () => {
    setIsClosing(true);
    setTimeout(() => {
      setExpandedReel(null);
      setIsClosing(false);
    }, 500); // Match animation duration
  };

  // Grouping
  const columns = [[], [], [], []];
  if (!isMobile) {
    itemsToShow.forEach((reel, index) => {
      // Distribute sequentially into columns: 0, 1, 2, 3, 0, 1...
      columns[index % 4].push(reel);
    });
  }

  const handleShowMore = () => {
    setVisibleRows(prev => prev + 4);
  };

  const showLoadMore = !isMobile && itemsToShow.length < reelsData.length;

  return (
    <Element name="reels" className="reels" data-theme="dark">
      <div className="reels__header">
        <div className="reels__badge">VIVIENDO EN VERTICAL</div>
        <h2 className="reels__title">
          HOY LAS PIEZAS VERTICALES TE ACERCAN<br />
          <span className="reels__title--gray">Y MEJORAN LAS POSIBILIDADES</span> DE SER VISTOS
        </h2>
      </div>

      <div className="reels__container">
        <div className="reels__grid">
          {isMobile ? (
            // Mobile: Flat List (Carousel)
            reelsData.map(reel => ( // Mobile shows all or limited? User wanted carousel. Let's show all available to avoid "ver más"
              <ReelItem
                key={reel.id}
                reel={reel}
                isMobile={isMobile}
                shakingId={shakingId}
                onVisibilityChange={handleVisibilityChange}
                onExpand={handleExpand}
              />
            ))
          ) : (
            // Desktop: Column Layout
            columns.map((colReels, i) => (
              <div key={i} className="reels__column">
                {colReels.map(reel => (
                  <ReelItem
                    key={reel.id}
                    reel={reel}
                    isMobile={isMobile}
                    shakingId={shakingId}
                    onVisibilityChange={handleVisibilityChange}
                    onExpand={handleExpand}
                  />
                ))}
              </div>
            ))
          )}
        </div>
      </div>

      {showLoadMore && (
        <div className="reels__pagination">
          <button onClick={handleShowMore}>VER MÁS</button>
        </div>
      )}

      <div className="reels__footer">
        <h2 className="reels__footer-name">ANDRE COVAR</h2>
      </div>

      {/* Custom Fullscreen Overlay */}
      {expandedReel && (
        <div className={`reels__overlay ${isClosing ? 'reels__overlay--closing' : ''}`} onClick={handleCloseExpanded}>
          <div className="reels__overlay-content" onClick={e => e.stopPropagation()}>
            <button className="reels__close-btn" onClick={handleCloseExpanded}>
              <FaTimes />
            </button>
            <video
              src={expandedReel.videoSrc}
              poster={expandedReel.poster}
              autoPlay
              controls
              className="reels__overlay-video"
            />
          </div>
        </div>
      )}
    </Element>
  );
}
