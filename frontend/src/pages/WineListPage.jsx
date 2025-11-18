import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Spinner, Alert } from 'flowbite-react';
import { HiPlus, HiInformationCircle } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import { fetchWines, deleteWine, consultSommelier } from '../services/apiClient';
import WineCard from '../components/WineCard';
import Footer from '../components/Footer';
import LoadingModal from '../components/LoadingModal';
import BurgerMenu from '../components/BurgerMenu';
import wineglassIcon from '../assets/wineglass.svg';

function WineListPage() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const [wines, setWines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [consultingWineId, setConsultingWineId] = useState(null);

  useEffect(() => {
    if (token) {
      loadWines();
    }
  }, [token]);

  const loadWines = async () => {
    if (!token) return;

    setLoading(true);
    setError('');

    try {
      const data = await fetchWines(token);
      setWines(data || []);
    } catch (err) {
      console.error('Error loading wines:', err);
      setError(err.message || 'Error al cargar los vinos');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleView = (id) => {
    navigate(`/wines/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/wines/${id}/edit`);
  };

  const handleDelete = async (id) => {
    const wine = wines.find((w) => w.id === id);
    const wineName = wine ? wine.name : 'este vino';

    const confirmed = window.confirm(
      `Estas seguro de que queres eliminar "${wineName}"? Esta accion no se puede deshacer.`
    );

    if (!confirmed) return;

    try {
      await deleteWine(token, id);
      setWines((prevWines) => prevWines.filter((w) => w.id !== id));
    } catch (err) {
      console.error('Error deleting wine:', err);
      alert(`Error al eliminar: ${err.message}`);
    }
  };

  const handleConsultSommelier = async (id) => {
    const wine = wines.find((w) => w.id === id);

    if (wine && wine.aiNotes) {
      navigate(`/wines/${id}`);
      return;
    }

    setConsultingWineId(id);
    try {
      const result = await consultSommelier(token, id);

      setWines((prevWines) =>
        prevWines.map((w) => (w.id === id ? { ...w, aiNotes: result.aiNotes } : w))
      );

      await new Promise(resolve => setTimeout(resolve, 300));

      navigate(`/wines/${id}`, { state: { aiNotes: result.aiNotes } });
    } catch (err) {
      console.error('Error consulting sommelier:', err);
      alert(`Error al consultar SommelIApp: ${err.message}`);
    } finally {
      setConsultingWineId(null);
    }
  };

  const handleAddWine = () => {
    navigate('/wines/new');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-wine-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 sm:gap-3">
              <img src={wineglassIcon} alt="Wine Glass" className="w-7 h-7 sm:w-8 sm:h-8" />
              <h1 className="text-xl sm:text-2xl font-bold text-cream-50">SommelIApp</h1>
              {user && (
                <span className="hidden lg:inline-block ml-4 text-cream-200 text-sm">
                  {user.email}
                </span>
              )}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/wines"
                className="text-cream-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Mis Vinos
              </Link>
              <Button
                size="sm"
                className="bg-wine-700 hover:bg-wine-600"
                onClick={handleAddWine}
              >
                <HiPlus className="mr-2 h-4 w-4" />
                Agregar Vino
              </Button>
              <button
                onClick={handleLogout}
                className="text-cream-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Salir
              </button>
            </div>

            <BurgerMenu user={user} onLogout={handleLogout} />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-wine-900 mb-2">Mis Vinos</h2>
          <p className="text-gray-600">Gestiona tu coleccion personal de vinos</p>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <Spinner size="xl" color="purple" />
            <span className="ml-3 text-gray-600">Cargando vinos...</span>
          </div>
        )}

        {error && !loading && (
          <Alert color="failure" icon={HiInformationCircle} className="mb-6">
            <span className="font-medium">Error:</span> {error}
            <Button size="xs" color="light" onClick={loadWines} className="ml-4">
              Reintentar
            </Button>
          </Alert>
        )}

        {!loading && !error && wines.length === 0 && (
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
              <Button
                className="bg-wine-700 hover:bg-wine-800"
                onClick={handleAddWine}
              >
                <HiPlus className="mr-2 h-5 w-5" />
                Agregar Primer Vino
              </Button>
            </div>
          </div>
        )}

        {!loading && !error && wines.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {wines.map((wine) => (
              <WineCard
                key={wine.id}
                wine={wine}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onConsultSommelier={handleConsultSommelier}
              />
            ))}
          </div>
        )}
      </div>

      <LoadingModal
        isOpen={consultingWineId !== null}
        message="SommelIApp está analizando tu vino..."
      />

      <Footer />
    </div>
  );
}

export default WineListPage;

