import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function WineListPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-wine-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-cream-50">SommelIAr</h1>
              {user && (
                <span className="ml-4 text-cream-200 text-sm">
                  {user.email}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/wines"
                className="text-cream-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Mis Vinos
              </Link>
              <button className="bg-wine-700 hover:bg-wine-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200">
                Agregar Vino
              </button>
              <button
                onClick={handleLogout}
                className="text-cream-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-wine-900 mb-2">Mis Vinos</h2>
          <p className="text-gray-600">Gestiona tu coleccion personal de vinos</p>
        </div>

        {/* Empty state / Placeholder */}
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-wine-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-wine-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-wine-900 mb-2">
              No tienes vinos registrados
            </h3>
            <p className="text-gray-600 mb-6">
              Comienza agregando tu primer vino a la coleccion
            </p>
            <button className="bg-wine-700 hover:bg-wine-800 text-white px-6 py-3 rounded-lg font-medium transition duration-200">
              Agregar Primer Vino
            </button>
          </div>
        </div>

        {/* Wine grid (example - hidden for now) */}
        <div className="hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Wine card example */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
            <div className="h-48 bg-gradient-to-br from-wine-700 to-wine-900"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-wine-900 mb-2">Nombre del Vino</h3>
              <p className="text-gray-600 mb-4">Bodega - Año</p>
              <div className="flex justify-between items-center">
                <span className="text-wine-700 font-semibold">Cepa</span>
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1 text-gray-700">4.5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WineListPage;

