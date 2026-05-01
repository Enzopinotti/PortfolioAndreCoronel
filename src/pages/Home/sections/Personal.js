import { Element } from 'react-scroll';


export default function Personal() {
    return (
        <Element name="personal" className="personal section">
            <div className="personal__badge-container">
                <div className="personal__badge">BACKSTAGE</div>
            </div>

            <div className="personal__video-container">
                <video 
                    className="personal__video" 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                >
                    <source src="/assets/fondos/backstage.webm" type="video/webm" />
                    <source src="/assets/fondos/backstage.mp4" type="video/mp4" />
                </video>
            </div>
        </Element>
    );
}
