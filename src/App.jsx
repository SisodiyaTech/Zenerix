
import BgEffects from './components/BgEffects';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <BgEffects />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Portfolio />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
