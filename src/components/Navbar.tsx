import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const navItems = [
  { id: 'hero', label: 'الرئيسية' },
  { id: 'timeline', label: 'المسيرة' },
  { id: 'gallery', label: 'الصور' },
  { id: 'audios', label: 'تسجيلات' },
  { id: 'videos', label: 'مرئيات' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple intersection observer logic for active section
      const sections = navItems.map(item => document.getElementById(item.id));
      const currentScroll = window.scrollY + 100;

      sections.forEach(section => {
        if (!section) return;
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (currentScroll >= top && currentScroll < top + height) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        scrolled ? 'py-4 backdrop-blur-xl bg-memorial-black/40' : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-center gap-8 md:gap-12">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative text-[10px] md:text-xs uppercase tracking-[0.2em] font-cairo transition-all duration-500 hover:text-memorial-yellow ${
                activeSection === item.id ? 'text-memorial-yellow' : 'text-white/60'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute -bottom-2 left-0 right-0 h-px bg-memorial-yellow/50"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
