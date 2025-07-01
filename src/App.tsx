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
        <span className="mx-auto text-gold font-fantasy text-xl md:text-6xl tracking-widest" style={{ fontFamily: 'Lobster, Pacifico, cursive, fantasy' }}>
          DISHA
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
      <div className="iyraa-section w-full min-h-screen flex items-center justify-between bg-black relative z-10 pt-24 pb-24 px-8">
        {/* Left: Image */}
        <div className="flex flex-row gap-6 ml-12">
          <img src="/D1.jpg" alt="D1" className="w-[22vw] max-w-md object-cover rounded-2xl" />
          <img src="/D3.jpg" alt="D3" className="w-[22vw] max-w-md object-cover rounded-2xl" />
        </div>
        {/* Right: Floating Text */}
        <div className="text-box flex flex-col items-end pr-8 z-10 bg-transparent w-[50vw] min-w-[300px]">
          <span
            className="text-[8vw] font-bold tracking-widest mb-2"
            style={{ color: '#e53935', fontFamily: 'Montas', lineHeight: 1 }}
          >
            IYRAA
          </span>
          <span
            className="text-2xl font-semibold tracking-widest w-full absolute left-[68%] top-[56%]"
            style={{ color: '#e53935', fontFamily: 'Montserrat, Montas, Arial, sans-serif', letterSpacing: '0.15em' }}
          >
            EXCLUSIVE SILVER JEWELLERY
          </span>
        </div>
      </div>

      {/* Page 4: TIA BEAUTY Section */}
      <div className="tia-section w-full min-h-screen flex items-center justify-between bg-black relative z-10 pt-24 pb-24 px-8">
        {/* Left: Empty for spacing */}
        <div></div>
        {/* Right: Text and Images */}
        <div className="text-box flex flex-col items-end pr-8 w-[50vw] min-w-[300px]">
          <span
            className="text-[7vw] font-bold tracking-widest mb-2 absolute left-[4%] top-[40%]"
            style={{ color: '#AA6C39', fontFamily: 'Montserrat, Arial, sans-serif', lineHeight: 1 }}
          >
            TIA BEAUTY
          </span>
          <span
            className="text-3xl font-fantasy mb-6 absolute left-[35%] top-[53%]"
            style={{ color: '#AA6C39', fontFamily: 'Lobster, Pacifico, cursive, fantasy', letterSpacing: '0.12em' }}
          >
            DIGITAL AD COMPANION
          </span>
          <div className="flex flex-row gap-6 ml-12">
            <img src="/D9.jpg" alt="D9" className="w-[22vw] max-w-xs object-cover rounded-2xl" />
            <img src="/D11.jpg" alt="D11" className="w-[22vw] max-w-xs object-cover rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;