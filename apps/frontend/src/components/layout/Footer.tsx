import React from 'react';
import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-lg md:text-xl font-bold mb-3 md:mb-4">PASSAJERO1900</h3>
            <p className="text-xs md:text-sm leading-relaxed mb-3 md:mb-4">
              Hostel acogedor en el corazón de La Plata. Ideal para viajeros que buscan comodidad,
              buena ubicación y un ambiente amigable.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/pasajero1900"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-primary transition-colors"
>
  <FaInstagram className="text-lg md:text-xl" />
              </a>
              <a href="https://facebook.com/pasajero1900"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-primary transition-colors"
>
  <FaFacebook className="text-lg md:text-xl" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <FaWhatsapp className="text-lg md:text-xl" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-base md:text-lg font-bold mb-3 md:mb-4">Contacto</h3>
            <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
              <div className="flex items-start space-x-2 md:space-x-3">
                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0 text-sm" />
                <p>
                  La Plata, Buenos Aires
                  <br />
                  Argentina
                </p>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3">
                <FaEnvelope className="text-primary flex-shrink-0 text-sm" />
                <a
                  href="mailto:passajero1900@gmail.com"
                  className="hover:text-primary transition-colors break-all"
                >
                  passajero1900@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3">
                <FaWhatsapp className="text-primary flex-shrink-0 text-sm" />
                <a href="https://wa.me/5492212215555" className="hover:text-primary transition-colors">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white text-base md:text-lg font-bold mb-3 md:mb-4">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
              <li>
                <a href="/" className="hover:text-primary transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="https://wa.me/5492212215555?text=Hola,%20quisiera%20hacer%20una%20reserva%20en%20PASSAJERO1900" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Reservar
                </a>
              </li>
              <li>
                <a href="/#contacto" className="hover:text-primary transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-6 md:mt-8 pt-4 md:pt-6 text-center text-xs md:text-sm">
          <p>&copy; {new Date().getFullYear()} PASSAJERO1900. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
