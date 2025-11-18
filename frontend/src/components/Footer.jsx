import { Link } from 'react-router-dom';
import wineglassIcon from '../assets/wineglass.svg';
import grapesIcon from '../assets/grapes.svg';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-wine-900 text-cream-50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <img src={wineglassIcon} alt="Wine Glass" className="w-7 h-7 sm:w-8 sm:h-8" />
              <h3 className="text-xl sm:text-2xl font-bold">SommelIApp</h3>
            </div>
            <p className="text-cream-200 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
              Tu sommelier personal impulsado por inteligencia artificial.
              Gestiona tu colección de vinos y obtén análisis profesionales
              al instante. Descubre nuevos sabores y perfecciona tu paladar.
            </p>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <img src={grapesIcon} alt="Grapes" className="w-5 h-5 sm:w-6 sm:h-6 opacity-70" />
              <p className="text-cream-300 text-xs">
                Tecnología al servicio de la enología
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-cream-50">Navegación</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/wines" className="text-cream-200 hover:text-cream-50 transition-colors hover:underline">
                  Mi Colección
                </Link>
              </li>
              <li>
                <Link to="/wines/new" className="text-cream-200 hover:text-cream-50 transition-colors hover:underline">
                  Agregar Vino
                </Link>
              </li>
              <li>
                <a href="#acerca" className="text-cream-200 hover:text-cream-50 transition-colors hover:underline">
                  Acerca de SommelIApp
                </a>
              </li>
              <li>
                <a href="#caracteristicas" className="text-cream-200 hover:text-cream-50 transition-colors hover:underline">
                  Características
                </a>
              </li>
              <li>
                <a href="#ayuda" className="text-cream-200 hover:text-cream-50 transition-colors hover:underline">
                  Centro de Ayuda
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-cream-50">Información</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-cream-200">
              <li>
                <a href="mailto:info@SommelIApp.com" className="hover:text-cream-50 transition-colors hover:underline break-all">
                  info@SommelIApp.com
                </a>
              </li>
              <li>
                <a href="mailto:soporte@SommelIApp.com" className="hover:text-cream-50 transition-colors hover:underline break-all">
                  soporte@SommelIApp.com
                </a>
              </li>
              <li className="pt-2 border-t border-wine-700 mt-2">
                <a href="#terminos" className="hover:text-cream-50 transition-colors hover:underline">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#privacidad" className="hover:text-cream-50 transition-colors hover:underline">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#cookies" className="hover:text-cream-50 transition-colors hover:underline">
                  Política de Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-wine-700 mt-6 sm:mt-8 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
            <p className="text-cream-300 text-xs text-center sm:text-left">
              Copyright {currentYear} SommelIApp. Todos los derechos reservados.
            </p>
            <p className="text-cream-400 text-xs text-center sm:text-right">
              Desarrollado con tecnología de vanguardia para amantes del vino
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

