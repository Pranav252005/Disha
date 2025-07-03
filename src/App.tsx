import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Instagram, Mail, Phone } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const aboutRef = useRef<HTMLDivElement>(null);
  const menuOptionsRef = useRef<HTMLDivElement>(null);

  // Using actual DISHA model photos from public folder
  const portfolioImages = [
    '/D1.jpg',
    '/D2.jpg',
    '/D3.jpg',
    '/D4.jpg',
    '/D5.jpg',
    '/D6.jpg',
    '/D7.jpg',
    '/D8.jpg',
    '/D9.jpg',
    '/D10.jpg',
    '/D11.jpg',
    '/D12.jpg',
    '/D13.jpg'
  ];

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % portfolioImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [portfolioImages.length]);

  // Get image at specific offset from current
  const getImageAtOffset = (offset: number) => {
    const index = (currentImageIndex + offset + portfolioImages.length) % portfolioImages.length;
    return portfolioImages[index];
  };

  // Close menu when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        menuOptionsRef.current &&
        !menuOptionsRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div className="relative w-full min-h-screen bg-black overflow-x-hidden">
      {/* Background Shimmer Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-transparent to-yellow-600/5 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-yellow-500/5 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-yellow-400/8 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-40 p-10 flex justify-center items-center">
        {/* Small DISHA Title at Top Center */}
        <span className="mx-auto text-gold font-fantasy text-xl md:text-6xl tracking-widest text-center" style={{ fontFamily: 'Lobster, Pacifico, cursive, fantasy', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', lineHeight: 1.1 }}>
          DISHA<br />MAURYA
        </span>
        {/* Hamburger Menu at Top Right */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gold hover:text-yellow-300 transition-colors duration-300 z-50 relative"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Menu Overlay */}
      <div className={`fixed inset-0 bg-black/95 backdrop-blur-sm z-40 transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
        <div className="flex items-center justify-center h-full">
          <div ref={menuOptionsRef} className="text-center space-y-8">
            <div className="space-y-6">
              <a
                href="#about"
                onClick={e => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block text-gold text-2xl font-serif hover:text-yellow-300 transition-colors duration-300"
              >
                About
              </a>
              <a
                href="#portfolio"
                onClick={e => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="block text-gold text-2xl font-serif hover:text-yellow-300 transition-colors duration-300"
              >
                Portfolio
              </a>
              <a href="#" className="block text-gold text-2xl font-serif hover:text-yellow-300 transition-colors duration-300">Contact</a>
              <a href="#" className="block text-gold text-2xl font-serif hover:text-yellow-300 transition-colors duration-300">Press</a>
            </div>
            <div className="flex justify-center space-x-6 pt-8">
              <Instagram className="text-gold hover:text-yellow-300 cursor-pointer transition-colors duration-300" size={24} />
              <Mail className="text-gold hover:text-yellow-300 cursor-pointer transition-colors duration-300" size={24} />
              <Phone className="text-gold hover:text-yellow-300 cursor-pointer transition-colors duration-300" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen relative z-10">
        {/* Centered Carousel Container */}
        <div className="carousel-container">
          {/* Edge Masks */}
          <div className="edge-mask-left"></div>
          <div className="edge-mask-right"></div>

          {/* Far Left Image */}
          <div className="carousel-image far-left">
            <img
              src={getImageAtOffset(-1)}
              alt="Portfolio"
              className="image"
            />
          </div>

          {/* Center Main Image */}
          <div className="carousel-image center">
            <img
              src={getImageAtOffset(0)}
              alt="Featured Portfolio"
              className="image"
            />
            <div className="center-glow"></div>
          </div>

          {/* Far Right Image */}
          <div className="carousel-image far-right">
            <img
              src={getImageAtOffset(1)}
              alt="Portfolio"
              className="image"
            />
          </div>
        </div>
        {/* Model Description Text */}
        <div className="font-bold text-l text-white mt-4 text-center tracking-wide" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>
          I am a model who specializes in lifestyle, fashion and commercial shoots.
        </div>
      </div>

      {/* Page 2: About Section */}
      <div ref={aboutRef} id="about" className="w-full min-h-screen flex items-center justify-center gap-8 bg-black relative z-10 pt-24 pb-24 flex-row">
        {/* Image Box (left, 16:9) */}
        <div className="about-glass-box aspect-[16/9] w-[32vw] max-w-2xl min-h-[18vw] flex items-center justify-center p-4 rounded-3xl shadow-2xl border border-gold"
          style={{ boxShadow: '0 0 40px 10px rgba(212,175,55,0.18), 0 0 80px 20px rgba(212,175,55,0.10)' }}>
          <img src="/D15.jpg" alt="About Visual" className="w-full h-full object-cover rounded-2xl shadow-lg" />
        </div>
        {/* About Me Box (right) */}
        <div className="about-glass-box w-[60vw] max-w-4xl min-h-[60vh] p-14 rounded-3xl shadow-2xl border border-gold flex flex-col items-center"
          style={{ boxShadow: '0 0 60px 20px rgba(212,175,55,0.25), 0 0 120px 40px rgba(212,175,55,0.12)' }}>
          <h2 className="text-3xl font-fantasy text-gold mb-6 text-center w-full" style={{ fontFamily: 'Lobster, Pacifico, cursive, fantasy' }}>About Me</h2>
          <p className="text-xl text-yellow-100/90 font-light text-center w-full max-w-2xl">
            <br />
            As a passionate model, actress, and dancer, I thrive on the exhilarating energy of performance. Each day, I embrace the opportunity to bring stories to life, whether I'm strutting down the runway, captivating audiences on screen, or losing myself in the rhythm of dance.<br /><br /><br />
            My journey has taught me to be a chameleon, effortlessly adapting to different styles and characters, all while pouring my heart into every project. With a commitment to pushing boundaries and exploring new creative avenues, I'm dedicated to redefining artistry and leaving a lasting impression in every endeavor.
          </p>
        </div>
      </div>

      {/* Page 3: New Section Below About */}
      <div className="iyraa-section w-full min-h-screen flex flex-col items-center bg-black relative z-10 pt-24 pb-24 px-8">
        <div className="w-full flex justify-center">
          <h2 className="text-2xl font-bold text-white mb-8 mt-2 text-center">Brands I have worked with</h2>
        </div>
        {/* Brand Logos */}
        <div className="flex flex-col items-center w-full px-10 md:px-15">
          <div className="flex flex-row justify-between w-full max-w-7xl gap-2 md:gap-8 mb-8">
            <img src="/ACER.jpg" alt="ACER" className="max-h-50 w-auto flex-1 object-contain" style={{ maxWidth: '33%' }} />
            <img src="/SANGEETHA.jpg" alt="SANGEETHA" className="max-h-50 w-auto flex-1 object-contain" style={{ maxWidth: '33%' }} />
            <img src="/ROYALOAK.jpg" alt="ROYALOAK" className="max-h-50 w-auto flex-1 object-contain" style={{ maxWidth: '33%' }} />
          </div>
          <div className="flex flex-row justify-between w-full max-w-5xl gap-2 md:gap-8">
            <img src="/TIA.jpg" alt="TIA" className="max-h-40 w-auto flex-1 object-contain" style={{ maxWidth: '49%' }} />
            <img src="/IYRAA.png" alt="IYRAA" className="max-h-40 w-auto flex-1 object-contain" style={{ maxWidth: '49%' }} />
          </div>
        </div>
      </div>

      {/* Page 4: TIA BEAUTY Section */}
      <div className="tia-section w-full min-h-screen flex flex-col items-center justify-center bg-black relative z-10 pt-24 pb-24 px-8 gap-12">
        <div className="flex flex-row flex-wrap justify-center gap-8 w-full mb-8">
          <div className="about-glass-box flex items-center justify-center p-4 rounded-3xl shadow-2xl border border-gold" style={{ width: '40vw', maxWidth: '600px', aspectRatio: '16/9', minWidth: '280px' }}>
            <video src="/RoyalOakV.mp4" autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1.5rem' }} />
          </div>
          <div className="about-glass-box flex items-center justify-center p-4 rounded-3xl shadow-2xl border border-gold" style={{ width: '40vw', maxWidth: '600px', aspectRatio: '16/9', minWidth: '280px' }}>
            <video src="/AcerV.mp4" autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1.5rem' }} />
          </div>
        </div>
        <div className="flex flex-row flex-wrap justify-center gap-8 w-full">
          <div className="about-glass-box flex items-center justify-center p-4 rounded-3xl shadow-2xl border border-gold" style={{ width: '40vw', maxWidth: '600px', aspectRatio: '16/9', minWidth: '280px' }}>
            <video src="/SangeethaV.mp4" autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1.5rem' }} />
          </div>
          <div className="about-glass-box flex items-center justify-center p-4 rounded-3xl shadow-2xl border border-gold" style={{ width: '40vw', maxWidth: '600px', aspectRatio: '16/9', minWidth: '280px' }}>
            <video src="/TiaBeautV.mp4" autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1.5rem' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;