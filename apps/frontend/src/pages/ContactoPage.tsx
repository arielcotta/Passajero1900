import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { z } from 'zod';


const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(8, 'Teléfono inválido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Formatear mensaje para WhatsApp
      const text = `Hola! Mi nombre es ${data.name}.\nEmail: ${data.email}\nTel: ${data.phone}\n\nMensaje:\n${data.message}`;
      const encodedText = encodeURIComponent(text);
      const whatsappUrl = `https://wa.me/5492212215555?text=${encodedText}`;
      
      // Abrir WhatsApp en nueva pestaña
      window.open(whatsappUrl, '_blank');
      
      setSubmitSuccess(true);
      reset();

      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error: any) {
      setSubmitError('Error al procesar el mensaje. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 md:mb-4">
              Contacto
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              ¿Tenés alguna consulta? Escribinos y te responderemos a la brevedad
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {/* Información de Contacto */}
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white rounded-lg p-6 md:p-8 shadow-md">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
                  Información
                </h2>

                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="bg-[#2D82B5] w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaMapMarkerAlt className="text-white text-base md:text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm md:text-base">
                        Dirección
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base">
                        Calle 55 N°613 entre 7 y 8
                        <br />
                        La Plata, Buenos Aires, CP 1900
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="bg-[#2D82B5] w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaPhone className="text-white text-base md:text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm md:text-base">
                        Teléfono
                      </h3>
                      <a
                        href="tel:+542212215555"
                        className="text-gray-600 hover:text-[#2D82B5] text-sm md:text-base"
                      >
                        221-2215555
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="bg-green-500 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaWhatsapp className="text-white text-base md:text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm md:text-base">
                        WhatsApp
                      </h3>
                      <a
                        href="https://wa.me/5492212215555"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-green-500 text-sm md:text-base"
                      >
                        +54 9 221 221-5555
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="bg-[#2D82B5] w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaEnvelope className="text-white text-base md:text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm md:text-base">
                        Email
                      </h3>
                      <a
                        href="mailto:passajero1900@gmail.com"
                        className="text-gray-600 hover:text-[#2D82B5] text-sm md:text-base break-all"
                      >
                        passajero1900@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Horarios */}
              <div className="bg-white rounded-lg p-6 md:p-8 shadow-md">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
                  Horarios
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b text-sm md:text-base">
                    <span className="text-gray-700 font-medium">Check-in</span>
                    <span className="text-gray-600">24 horas</span>
                  </div>
                  <div className="flex justify-between py-2 border-b text-sm md:text-base">
                    <span className="text-gray-700 font-medium">Check-out</span>
                    <span className="text-gray-600">12:00 PM</span>
                  </div>
                  <div className="flex justify-between py-2 text-sm md:text-base">
                    <span className="text-gray-700 font-medium">Recepción</span>
                    <span className="text-gray-600">24 horas</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-md">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
                Envianos un Mensaje
              </h2>

              {submitSuccess && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  <p className="font-medium">¡Mensaje enviado con éxito!</p>
                  <p className="text-sm">Te responderemos a la brevedad.</p>
                </div>
              )}

              {submitError && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  <p className="font-medium">Error al enviar el mensaje</p>
                  <p className="text-sm">{submitError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Nombre *
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D82B5] focus:border-transparent"
                    placeholder="Tu nombre"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D82B5] focus:border-transparent"
                    placeholder="tu@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                    Teléfono *
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D82B5] focus:border-transparent"
                    placeholder="+54 9 221 123-4567"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D82B5] focus:border-transparent resize-none"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#2D82B5] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#1e5a7f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-sm md:text-base" />
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
