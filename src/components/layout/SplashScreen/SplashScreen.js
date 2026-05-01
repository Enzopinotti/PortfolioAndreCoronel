import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './splashScreen.scss';

let splashHasPlayed = false;

export default function SplashScreen() {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(!splashHasPlayed);

  useGSAP(() => {
    if (splashHasPlayed) return;
    
    // We don't use onComplete on the timeline to avoid unmounting too early
    const tl = gsap.timeline();

    tl.fromTo(logoRef.current, 
      { scale: 0.8, opacity: 0, filter: 'blur(10px)' }, 
      { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: 'expo.out' }
    )
    .to({}, { duration: 0.5 })
    .add(() => {
      const targetLogo = document.querySelector('.navbar__logo');
      if (targetLogo && logoRef.current) {
        const targetRect = targetLogo.getBoundingClientRect();
        const startRect = logoRef.current.getBoundingClientRect();
        
        const xOffset = targetRect.left + (targetRect.width / 2) - (startRect.left + (startRect.width / 2));
        const yOffset = targetRect.top + (targetRect.height / 2) - (startRect.top + (startRect.height / 2));
        const scaleDiff = targetRect.width / startRect.width;

        // Fly the logo to the navbar
        gsap.to(logoRef.current, {
          x: xOffset,
          y: yOffset,
          scale: scaleDiff,
          duration: 1,
          ease: 'power3.inOut',
          onComplete: () => {
            splashHasPlayed = true;
            setIsVisible(false);
          }
        });
      } else {
        // Fallback if navbar logo isn't found
        splashHasPlayed = true;
        setIsVisible(false);
      }
    })
    // Fade out the dark background ONLY, keeping the logo visible during flight
    .to(containerRef.current, {
      backgroundColor: 'rgba(13, 13, 13, 0)',
      pointerEvents: 'none', // Allow clicks to pass through immediately
      duration: 1,
      ease: 'power3.inOut'
    }, "-=0.2");

  }, { scope: containerRef, dependencies: [] });

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="splash-screen">
      <img 
        ref={logoRef} 
        src={process.env.PUBLIC_URL + '/assets/img/logo.png'} 
        alt="Logo" 
        className="splash-screen__logo" 
      />
    </div>
  );
}
