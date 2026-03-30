import { useRef, useState } from 'react';
import { Element } from 'react-scroll';

const personalPhotos = [
    { id: 1, src: '/assets/img/personal/photo1.webp', alt: 'Backstage 1' },
    { id: 2, src: '/assets/img/personal/photo2.webp', alt: 'Backstage 2' },
    { id: 3, src: '/assets/img/personal/photo3.webp', alt: 'Backstage 3' },
    { id: 4, src: '/assets/img/personal/photo4.webp', alt: 'Backstage 4' },
    { id: 5, src: '/assets/img/personal/photo5.webp', alt: 'Backstage 5' },
];

export default function Personal() {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <Element name="personal" className="personal section">
            <div className="personal__badge-container">
                <div className="personal__badge">BACKSTAGE</div>
            </div>

            <div
                className={`personal__carousel ${isDragging ? 'is-dragging' : ''}`}
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                <div className="personal__track">
                    {personalPhotos.map((photo) => (
                        <div key={photo.id} className="personal__item">
                            <img src={photo.src} alt={photo.alt} className="personal__img" />
                        </div>
                    ))}
                </div>
            </div>
        </Element>
    );
}
