import { Link } from 'react-router-dom';
import { HiArrowRight, HiSparkles, HiChartBar, HiLightBulb } from 'react-icons/hi';
import Footer from '../components/Footer';
import wineglassIcon from '../assets/wineglass.svg';
import bottlesImg from '../assets/bottles.jpg';
import corchosImg from '../assets/corchos.jpg';
import cupsImg from '../assets/cupsofwine.jpg';

function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      <nav className="bg-wine-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 sm:gap-3">
              <img src={wineglassIcon} alt="Wine Glass" className="w-7 h-7 sm:w-8 sm:h-8" />
              <Link to="/" className="text-xl sm:text-2xl font-bold text-cream-50 hover:text-white transition-colors">
                SommelIApp
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-cream-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="hidden sm:inline-block text-cream-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold text-wine-900 mb-6">
              Acerca de SommelIApp
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Tu compañero personal para descubrir, registrar y aprender sobre el fascinante mundo del vino
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-3xl font-bold text-wine-900 mb-6">
                Nuestra Historia
              </h3>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                SommelIApp nace de la pasión por el vino y la tecnología. Creemos que cada botella cuenta una historia única,
                y que cada degustación es una oportunidad para aprender y descubrir.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Desarrollada por entusiastas del vino, nuestra plataforma combina la elegancia de la cultura vinícola
                con el poder de la inteligencia artificial para ofrecerte una experiencia única de aprendizaje y registro.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Ya seas un sommelier experimentado o estés dando tus primeros pasos en el mundo del vino,
                SommelIApp está aquí para acompañarte en cada cata.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img
                src={bottlesImg}
                alt="Colección de botellas de vino"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-wine-900 text-center mb-12">
            ¿Qué hace especial a SommelIApp?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-14 h-14 bg-wine-100 text-wine-900 rounded-full mb-6">
                <HiSparkles className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-wine-900 mb-4">
                Inteligencia Artificial
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Consulta con nuestro sommelier virtual impulsado por IA para obtener análisis profesionales,
                maridajes sugeridos y notas de cata expertas.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-14 h-14 bg-wine-100 text-wine-900 rounded-full mb-6">
                <HiChartBar className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-wine-900 mb-4">
                Registro Detallado
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Guarda cada vino que pruebes con información completa: aromas, sabores, calificaciones
                y tus notas personales. Tu cava digital siempre a mano.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-14 h-14 bg-wine-100 text-wine-900 rounded-full mb-6">
                <HiLightBulb className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-wine-900 mb-4">
                Aprende y Descubre
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Amplía tu conocimiento del vino con cada consulta. Descubre características,
                regiones vinícolas y consejos que elevarán tu experiencia.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={cupsImg}
                alt="Copas de vino en degustación"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-wine-900 mb-6">
                Una Experiencia Elegante
              </h3>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Cada detalle de SommelIApp ha sido diseñado pensando en la experiencia del usuario.
                Desde la paleta de colores inspirada en los tonos del vino, hasta los loaders animados
                con racimos de uvas, todo respira elegancia y sofisticación.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Nuestra interfaz intuitiva te permite concentrarte en lo importante:
                disfrutar y aprender sobre el vino. Sin complicaciones, sin distracciones.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-wine-900 mr-2">✓</span>
                  <span className="text-gray-700">Interfaz responsive que se adapta a cualquier dispositivo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-wine-900 mr-2">✓</span>
                  <span className="text-gray-700">Gestión completa de tu colección personal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-wine-900 mr-2">✓</span>
                  <span className="text-gray-700">Análisis de IA ilimitados para cada vino</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tradition Section with Image */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-3xl font-bold text-wine-900 mb-6">
                Tradición y Tecnología
              </h3>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                El vino es tradición milenaria, pero eso no significa que no pueda beneficiarse de la tecnología moderna.
                SommelIApp une lo mejor de ambos mundos.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Respetamos la cultura y el arte de la enología mientras aprovechamos la inteligencia artificial
                para democratizar el conocimiento experto. Ahora, cualquier persona puede tener acceso a análisis
                profesionales con solo un clic.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Cada corcho que descorchas es una nueva aventura. Déjanos ser parte de ese viaje.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img
                src={corchosImg}
                alt="Corchos de vino"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-wine-900 to-wine-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold mb-6 text-cream-50">
            Comienza tu Viaje Enológico Hoy
          </h3>
          <p className="text-xl mb-8 text-cream-100">
            Únete a SommelIApp y descubre una nueva forma de explorar el mundo del vino.
            Es gratis, es fácil, y está diseñado para ti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register">
              <button className="bg-cream-50 hover:bg-white text-wine-900 font-semibold px-10 py-4 rounded-lg transition-all duration-200 flex items-center gap-2 min-w-[220px] justify-center shadow-lg hover:shadow-xl">
                Registrarse Gratis
                <HiArrowRight className="h-5 w-5" />
              </button>
            </Link>
            <Link to="/login">
              <button className="border-2 border-cream-50 text-cream-50 hover:bg-cream-50 hover:text-wine-900 font-semibold px-10 py-4 rounded-lg transition-all duration-200 min-w-[220px] shadow-lg hover:shadow-xl">
                Iniciar Sesión
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AboutPage;

