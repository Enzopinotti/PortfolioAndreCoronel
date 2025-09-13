import Hero from './Home/sections/HeroPrincipal.js';
import Services from './Home/sections/Services.js';
import Projects from './Home/sections/Projects.js';
import Contact from './Home/sections/Contact.js';
import Virals from './Home/sections/Virals.js';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <Contact />
      <Virals />
    </>
  );
}
