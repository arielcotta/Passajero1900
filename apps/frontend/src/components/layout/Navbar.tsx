import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaEnvelope, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-white sticky top-0 z-50">
      {/* Degradado sutil en la parte inferior del header */}
      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-b from-white to-transparent translate-y-full pointer-events-none" />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 md:space-x-3 group">
            <img
              src={logo}
              alt="Passajero 1900"
              className="h-12 md:h-16 w-auto transition-transform group-hover:scale-105"
            />
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-gray-800">PASSAJERO1900</h1>
              <p className="text-[10px] md:text-xs text-gray-500">Hostel en La Plata</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Inicio
            </Link>
            <a
              href="https://wa.me/5492212215555?text=Hola,%20quisiera%20hacer%20una%20reserva%20en%20PASSAJERO1900"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-medium transition-colors text-gray-600 hover:text-primary`}
            >
              Reservar
            </a>
            <Link
              to="/contacto"
              className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                isActive('/contacto')
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              <FaEnvelope className="text-xs" />
              <span>Contacto</span>
            </Link>
          </div>

          {/* CTA Button */}
          <a
            href="https://wa.me/5492212215555?text=Hola,%20quisiera%20hacer%20una%20reserva%20en%20PASSAJERO1900"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
          >
            Reservar Ahora
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-600 hover:text-primary transition-colors"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-white shadow-2xl z-50 md:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-800">Menú</h2>
                <button
                  onClick={closeMenu}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col p-4 space-y-1">
                <Link
                  to="/"
                  onClick={closeMenu}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive('/') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Inicio
                </Link>
                <a
                  href="https://wa.me/5492212215555?text=Hola,%20quisiera%20hacer%20una%20reserva%20en%20PASSAJERO1900"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors text-gray-700 hover:bg-gray-100`}
                >
                  Reservar
                </a>
                <Link
                  to="/contacto"
                  onClick={closeMenu}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive('/contacto')
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaEnvelope />
                  <span>Contacto</span>
                </Link>
              </div>

              {/* CTA Button */}
              <div className="p-4 border-t border-gray-200">
                <a
                  href="https://wa.me/5492212215555?text=Hola,%20quisiera%20hacer%20una%20reserva%20en%20PASSAJERO1900"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="block w-full bg-primary text-white px-6 py-3 rounded-lg font-medium text-center hover:bg-primary/90 transition-all shadow-lg"
                >
                  Reservar Ahora
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
