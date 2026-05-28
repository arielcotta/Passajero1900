import { motion } from 'framer-motion';
import {
  FaBed,
  FaDoorOpen,
  FaMapMarkerAlt,
  FaShower,
  FaSnowflake,
  FaUsers,
  FaUtensils,
  FaWhatsapp,
  FaWifi,
} from 'react-icons/fa';


export default function HomePage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  // Actualizado según feedback del cliente (4 nov 2025)
  // 2 privadas + 1 compartida mixta (femenina no disponible)
  // Precios oficiales: $35,000/noche (1-2 noches), $30,000/noche (3+ noches)
  const rooms = [
    {
      name: 'Habitación Compartida Mixta',
      beds: '4 camas individuales',
      price: '$35,000/noche',
      priceDiscount: '$30,000/noche (3+ noches)',
      icon: <FaUsers className="text-4xl" />,
      features: [
        'Cortinado privado',
        'Mesa rebatible',
        'Enchufes y luz individual',
        'Baulera con candado',
      ],
      gradient: 'from-blue-500 to-purple-600',
      image: '/cama-1-y-2.webp',
    },
    {
      name: 'Habitación Privada para Pareja 1',
      beds: 'Cama doble (máx. 2 personas)',
      price: '$35,000/noche',
      priceDiscount: '$30,000/noche (3+ noches)',
      icon: <FaDoorOpen className="text-4xl" />,
      features: [
        'Luces individuales',
        'Chifonier',
        'Escritorio rebatible con llave',
        'Máxima privacidad',
      ],
      gradient: 'from-emerald-500 to-teal-600',
      image: '/habitacion-privada-1.webp',
    },
    {
      name: 'Habitación Privada para Pareja 2',
      beds: 'Cama doble (máx. 2 personas)',
      price: '$35,000/noche',
      priceDiscount: '$30,000/noche (3+ noches)',
      icon: <FaDoorOpen className="text-4xl" />,
      features: [
        'Luces individuales',
        'Chifonier',
        'Escritorio rebatible con llave',
        'Máxima privacidad',
      ],
      gradient: 'from-pink-500 to-rose-600',
      image: '/habitacion-privada-1.webp',
    },
  ];

  const amenities = [
    { icon: <FaSnowflake />, text: 'Aire acondicionado' },
    { icon: <FaWifi />, text: 'WiFi gratis' },
    { icon: <FaUtensils />, text: 'Cocina compartida' },
    { icon: <FaShower />, text: '3 baños modernos' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section con video de dron de fondo */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video de fondo */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/dron-catedral-de-la-plata.mp4" type="video/mp4" />
        </video>

        {/* Overlay oscuro para legibilidad del texto */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Gradiente sutil encima del video */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto py-12 md:py-20">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
          >
            <FaBed className="text-5xl md:text-7xl mx-auto mb-6 md:mb-8 text-white drop-shadow-2xl" />
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-8xl font-bold mb-4 md:mb-6 text-white drop-shadow-lg tracking-tight"
          >
            PASSAJERO1900
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl mb-3 md:mb-4 text-white/95 font-light"
          >
            Tu hogar en el corazón de La Plata
          </motion.p>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-base sm:text-lg md:text-xl mb-8 md:mb-12 text-white/80 max-w-2xl mx-auto px-4"
          >
            Hostel moderno y acogedor en el centro de La Plata. Habitaciones compartidas y privadas
            con todas las comodidades.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4"
          >
            <a
              href="https://wa.me/5492212215555?text=Hola,%20quisiera%20hacer%20una%20reserva%20en%20PASSAJERO1900"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-white text-[#2D82B5] px-8 py-4 md:px-10 md:py-5 rounded-full font-semibold text-base md:text-lg transition-all hover:shadow-2xl hover:scale-105 transform"
            >
              <span className="relative z-10">Reservar Ahora</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            <a
              href="https://wa.me/5492212215555"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-green-500 text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-semibold text-base md:text-lg transition-all hover:shadow-2xl hover:scale-105 transform flex items-center justify-center gap-3"
            >
              <FaWhatsapp className="text-xl md:text-2xl relative z-10" />
              <span className="relative z-10">WhatsApp</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator animado */}
        <motion.div
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </section>

      {/* Sección de Habitaciones con animaciones */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="text-center mb-12 md:mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-[#2D82B5] to-purple-600 bg-clip-text text-transparent"
            >
              Nuestras Habitaciones
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-600 px-4">
              Espacios diseñados para tu comodidad
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-6 md:gap-8"
          >
            {rooms.map(room => (
              <motion.div
                key={room.name}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Imagen de la habitación */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent`}
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-bold text-lg">{room.price}</p>
                    <p className="text-white/80 text-sm">{room.priceDiscount}</p>
                  </div>
                </div>

                {/* Gradiente de fondo */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${room.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <div className="relative p-6 md:p-8">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${room.gradient} text-white mb-3 md:mb-4 shadow-lg`}
                  >
                    <div className="text-2xl md:text-3xl">{room.icon}</div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-800">{room.name}</h3>
                  <p className="text-base md:text-lg text-gray-600 mb-4">{room.beds}</p>

                  <ul className="space-y-2">
                    {room.features.map(feature => (
                      <li
                        key={feature}
                        className="flex items-center text-sm md:text-base text-gray-700"
                      >
                        <span className="w-2 h-2 bg-[#2D82B5] rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Decoración inferior */}
                <div className={`h-1 bg-gradient-to-r ${room.gradient}`} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sección de Servicios */}
      <section className="py-20 bg-gradient-to-br from-[#2D82B5] to-purple-700 text-white relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-12 md:mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4"
            >
              Servicios Incluidos
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-white/90 px-4">
              Todo lo que necesitás para una estadía perfecta
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {amenities.map(amenity => (
              <motion.div
                key={amenity.text}
                variants={itemVariants}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center hover:bg-white/20 transition-all"
              >
                <div className="text-4xl md:text-5xl mb-3 md:mb-4 flex justify-center">
                  {amenity.icon}
                </div>
                <p className="text-sm md:text-lg font-medium">{amenity.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sección de Ubicación */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-8 md:mb-12">
              <FaMapMarkerAlt className="text-4xl md:text-5xl text-[#2D82B5] mx-auto mb-4 md:mb-6" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-[#2D82B5] to-purple-600 bg-clip-text text-transparent px-4">
                Ubicación Perfecta
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-2 px-4">
                Calle 55 N°613 entre 7 y 8
              </p>
              <p className="text-base md:text-lg text-gray-500 px-4">
                Centro de La Plata, Buenos Aires
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-4 md:p-8 shadow-xl"
            >
			<div className="aspect-video rounded-xl overflow-hidden">
				  <iframe
					title="Mapa PASSAJERO1900"
					src="https://www.google.com/maps?q=Calle%2055%20613,%20La%20Plata,%20Buenos%20Aires,%20Argentina&output=embed"
					width="100%"
					height="100%"
					style={{ border: 0 }}
					allowFullScreen
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
				  />
			</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-[#2D82B5] via-blue-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 px-4"
          >
            ¿Listo para tu próxima aventura?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl mb-8 md:mb-10 text-white/90 px-4"
          >
            Reservá ahora y asegurá tu lugar en PASSAJERO1900
          </motion.p>
          <motion.div variants={itemVariants} className="px-4">
            <a
              href="https://wa.me/5492212215555?text=Hola,%20quisiera%20hacer%20una%20reserva%20en%20PASSAJERO1900"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#2D82B5] px-10 py-4 md:px-12 md:py-5 rounded-full font-bold text-lg md:text-xl hover:shadow-2xl hover:scale-105 transform transition-all"
            >
              Hacer Reserva
            </a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
