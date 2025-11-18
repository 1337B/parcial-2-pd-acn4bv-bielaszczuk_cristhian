import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Spinner, Alert, Badge } from 'flowbite-react';
import { HiArrowLeft, HiPencil, HiTrash, HiSparkles, HiInformationCircle } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { getWineById, deleteWine, consultSommelier } from '../services/apiClient';
import GrapeLoader from '../components/GrapeLoader';
import Footer from '../components/Footer';

function WineDetailPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [wine, setWine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [consultingAI, setConsultingAI] = useState(false);
  const [aiError, setAiError] = useState('');

  useEffect(() => {
    if (token && id) {
      loadWine();
    }
  }, [id, token]);

  const loadWine = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getWineById(token, id);

      if (location.state?.aiNotes && !data.aiNotes) {
        setWine({ ...data, aiNotes: location.state.aiNotes });
      } else {
        setWine(data);
      }
    } catch (err) {
      console.error('Error loading wine:', err);
      setError(err.message || 'Error al cargar el vino');
    } finally {
      setLoading(false);
    }
  };

  const handleConsultSommelier = async () => {
    setConsultingAI(true);
    setAiError('');

    try {
      const result = await consultSommelier(token, id);
      setWine((prev) => ({
        ...prev,
        aiNotes: result.aiNotes,
      }));
      toast.success('¡Análisis profesional generado exitosamente!', {
        icon: '✨',
      });
    } catch (err) {
      console.error('Error consulting sommelier:', err);
      setAiError(err.message || 'Error al consultar SommelIApp');
    } finally {
      setConsultingAI(false);
    }
  };

  const handleEdit = () => {
    navigate(`/wines/${id}/edit`);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Estas seguro de que queres eliminar "${wine.name}"? Esta accion no se puede deshacer.`
    );

    if (!confirmed) return;

    try {
      await deleteWine(token, id);
      toast.success('Vino eliminado de tu colección');
      navigate('/wines');
    } catch (err) {
      console.error('Error deleting wine:', err);
      alert(`Error al eliminar: ${err.message}`);
    }
  };

  const handleBack = () => {
    navigate('/wines');
  };

  const imageSrc = wine?.imageUrl || 'https://via.placeholder.com/400x600?text=Vino';

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Button color="light" onClick={handleBack} className="mb-4 sm:mb-6 text-xs sm:text-sm">
          <HiArrowLeft className="mr-1 sm:mr-2 h-4 w-4" />
          <span className="hidden xs:inline">Volver a Mis Vinos</span>
          <span className="xs:hidden">Volver</span>
        </Button>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <Spinner size="xl" color="purple" />
            <span className="ml-3 text-gray-600">Cargando vino...</span>
          </div>
        )}

        {error && !loading && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">Error:</span> {error}
          </Alert>
        )}

        {!loading && !error && wine && (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gray-100">
                  <img
                    src={imageSrc}
                    alt={wine.name}
                    className="w-full h-64 sm:h-96 md:h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x600?text=Vino';
                    }}
                  />
                </div>

                <div className="md:w-2/3 p-4 sm:p-6 lg:p-8">
                  <div className="flex justify-between items-start mb-4 sm:mb-6 gap-2">
                    <div className="flex-1 min-w-0">
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-wine-900 mb-2 break-words">
                        {wine.name}
                      </h1>
                      {wine.winery && (
                        <p className="text-base sm:text-lg lg:text-xl text-gray-600">{wine.winery}</p>
                      )}
                    </div>

                    <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                      <button
                        onClick={handleEdit}
                        className="p-1.5 sm:p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <HiPencil className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                      <button
                        onClick={handleDelete}
                        className="p-1.5 sm:p-2 text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <HiTrash className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                    {wine.grape && (
                      <Badge color="purple" size="sm" className="sm:text-base">
                        {wine.grape}
                      </Badge>
                    )}
                    {wine.year && (
                      <Badge color="gray" size="sm" className="sm:text-base">
                        {wine.year}
                      </Badge>
                    )}
                    {wine.rating && (
                      <Badge color="warning" size="sm" className="sm:text-base">
                        ★ {wine.rating}/5
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {(wine.region || wine.country) && (
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase mb-1">
                          Origen
                        </h3>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-900">
                          {wine.region}
                          {wine.region && wine.country && ', '}
                          {wine.country}
                        </p>
                      </div>
                    )}

                    {wine.place && (
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase mb-1">
                          Lugar
                        </h3>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-900">{wine.place}</p>
                      </div>
                    )}

                    {wine.aromas && (
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase mb-1">
                          Aromas
                        </h3>
                        <p className="text-sm sm:text-base text-gray-900">{wine.aromas}</p>
                      </div>
                    )}

                    {wine.flavors && (
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase mb-1">
                          Sabores
                        </h3>
                        <p className="text-sm sm:text-base text-gray-900">{wine.flavors}</p>
                      </div>
                    )}

                    {wine.notes && (
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase mb-1">
                          Notas Personales
                        </h3>
                        <p className="text-sm sm:text-base text-gray-900">{wine.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {(wine.aromas || wine.flavors || wine.notes) && (
              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-wine-900 mb-4 sm:mb-6">
                  Mis Notas de Cata
                </h2>

                <div className="space-y-4 sm:space-y-6">
                  {wine.aromas && (
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-wine-800 mb-2">
                        Aromas que detecte
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 bg-cream-50 p-3 sm:p-4 rounded-lg">
                        {wine.aromas}
                      </p>
                    </div>
                  )}

                  {wine.flavors && (
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-wine-800 mb-2">
                        Sabores que percibi
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 bg-cream-50 p-3 sm:p-4 rounded-lg">
                        {wine.flavors}
                      </p>
                    </div>
                  )}

                  {wine.notes && (
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-wine-800 mb-2">
                        Mis notas personales
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 bg-cream-50 p-3 sm:p-4 rounded-lg">
                        {wine.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-wine-900">
                  Análisis Profesional de SommelIApp
                </h2>

                {!wine.aiNotes && (
                  <Button
                    onClick={handleConsultSommelier}
                    disabled={consultingAI}
                    isProcessing={consultingAI}
                    className="bg-wine-700 hover:bg-wine-800 text-xs sm:text-sm w-full sm:w-auto"
                  >
                    <HiSparkles className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden xs:inline">{consultingAI ? 'Consultando...' : 'Consultar SommelIApp'}</span>
                    <span className="xs:hidden">Consultar</span>
                  </Button>
                )}

                {wine.aiNotes && !consultingAI && (
                  <Button
                    onClick={handleConsultSommelier}
                    color="light"
                    size="sm"
                    className="text-xs sm:text-sm w-full sm:w-auto"
                  >
                    <HiSparkles className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Regenerar
                  </Button>
                )}
              </div>

              {aiError && (
                <Alert color="failure" icon={HiInformationCircle} className="mb-4">
                  {aiError}
                </Alert>
              )}

              {consultingAI && (
                <GrapeLoader message="SommelIApp está analizando tu vino..." isLoading={consultingAI} />
              )}

              {wine.aiNotes && !consultingAI && (
                <div className="bg-gradient-to-br from-cream-50 to-wine-50 rounded-lg p-8 border border-wine-200">
                  <div className="space-y-6">
                    {wine.aiNotes.split('\n').map((line, index) => {
                      if (line.trim() === '---' || line.trim() === '--') {
                        return null;
                      }

                      if (line.trim().startsWith('##')) {
                        const title = line.replace(/^##\s*/, '').trim();
                        return (
                          <h3 key={index} className="text-xl font-bold text-wine-900 mt-6 first:mt-0 pb-2 border-b border-wine-300">
                            {title}
                          </h3>
                        );
                      }
                      if (line.trim().startsWith('#')) {
                        const title = line.replace(/^#\s*/, '').trim();
                        return (
                          <h2 key={index} className="text-2xl font-bold text-wine-900 mt-8 first:mt-0 pb-2 border-b border-wine-300">
                            {title}
                          </h2>
                        );
                      }
                      if (line.trim() === '') {
                        return <div key={index} className="h-2"></div>;
                      }
                      const parts = line.split(/(\*\*.*?\*\*)/g);
                      return (
                        <p key={index} className="text-gray-800 leading-relaxed">
                          {parts.map((part, i) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return (
                                <strong key={i} className="font-semibold text-wine-900">
                                  {part.slice(2, -2)}
                                </strong>
                              );
                            }
                            return <span key={i}>{part}</span>;
                          })}
                        </p>
                      );
                    }).filter(Boolean)}
                  </div>
                  <div className="mt-8 pt-6 border-t border-wine-300">
                    <p className="text-xs text-gray-600 italic text-center">
                      Análisis elaborado mediante inteligencia artificial utilizando criterios profesionales
                      de sommeliers, críticas especializadas y bases de datos enológicas reconocidas
                      internacionalmente.
                    </p>
                  </div>
                </div>
              )}

              {!wine.aiNotes && !consultingAI && !aiError && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-wine-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HiSparkles className="w-10 h-10 text-wine-600" />
                  </div>
                  <p className="text-gray-600 mb-2">
                    Aún no has consultado a SommelIApp para este vino
                  </p>
                  <p className="text-sm text-gray-500">
                    Obtené un análisis profesional y objetivo generado por IA
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default WineDetailPage;

