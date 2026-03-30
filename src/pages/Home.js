import Hero from './Home/sections/HeroPrincipal.js';
import Services from './Home/sections/Services.js';
import Projects from './Home/sections/Projects.js';
import Reels from './Home/sections/Reels';
import Personal from './Home/sections/Personal';
import Contact from './Home/sections/Contact';

export default function Home() {
  return (
    <main className="home">
      <Hero />
      <Projects />
      <Reels />
      <Personal />
      <Contact />
    </main>
  );
}
