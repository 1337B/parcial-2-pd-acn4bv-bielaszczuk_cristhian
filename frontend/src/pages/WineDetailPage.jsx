import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Spinner, Alert, Badge } from 'flowbite-react';
import { HiArrowLeft, HiPencil, HiTrash, HiSparkles, HiInformationCircle } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import { getWineById, deleteWine, consultSommelier } from '../services/apiClient';

function WineDetailPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [wine, setWine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [consultingAI, setConsultingAI] = useState(false);
  const [aiError, setAiError] = useState('');

  // Cargar datos del vino al montar
  useEffect(() => {
    if (token && id) {
      loadWine();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

  const loadWine = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getWineById(token, id);
      setWine(data);
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
      // Actualizar el estado del vino con las notas generadas
      setWine((prev) => ({
        ...prev,
        aiNotes: result.aiNotes,
      }));
    } catch (err) {
      console.error('Error consulting sommelier:', err);
      setAiError(err.message || 'Error al consultar SommelIAr');
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
      navigate('/wines');
    } catch (err) {
      console.error('Error deleting wine:', err);
      alert(`Error al eliminar: ${err.message}`);
    }
  };

  const handleBack = () => {
    navigate('/wines');
  };

  // Placeholder para imagen si no hay
  const imageSrc = wine?.imageUrl || 'https://via.placeholder.com/400x600?text=Vino';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Boton volver */}
        <Button color="light" onClick={handleBack} className="mb-6">
          <HiArrowLeft className="mr-2 h-4 w-4" />
          Volver a Mis Vinos
        </Button>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Spinner size="xl" color="purple" />
            <span className="ml-3 text-gray-600">Cargando vino...</span>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">Error:</span> {error}
          </Alert>
        )}

        {/* Contenido del vino */}
        {!loading && !error && wine && (
          <div className="space-y-6">
            {/* Card principal con info del vino */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                {/* Imagen */}
                <div className="md:w-1/3 bg-gray-100">
                  <img
                    src={imageSrc}
                    alt={wine.name}
                    className="w-full h-96 md:h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x600?text=Vino';
                    }}
                  />
                </div>

                {/* Información */}
                <div className="md:w-2/3 p-8">
                  {/* Header con titulo y acciones */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h1 className="text-4xl font-bold text-wine-900 mb-2">
                        {wine.name}
                      </h1>
                      {wine.winery && (
                        <p className="text-xl text-gray-600">{wine.winery}</p>
                      )}
                    </div>

                    {/* Botones de accion */}
                    <div className="flex gap-2">
                      <button
                        onClick={handleEdit}
                        className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <HiPencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={handleDelete}
                        className="p-2 text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <HiTrash className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {wine.grape && (
                      <Badge color="purple" size="lg">
                        {wine.grape}
                      </Badge>
                    )}
                    {wine.year && (
                      <Badge color="gray" size="lg">
                        {wine.year}
                      </Badge>
                    )}
                    {wine.rating && (
                      <Badge color="warning" size="lg">
                        ★ {wine.rating}/5
                      </Badge>
                    )}
                  </div>

                  {/* Detalles */}
                  <div className="space-y-4">
                    {(wine.region || wine.country) && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                          Origen
                        </h3>
                        <p className="text-lg text-gray-900">
                          {wine.region}
                          {wine.region && wine.country && ', '}
                          {wine.country}
                        </p>
                      </div>
                    )}

                    {wine.place && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                          Lugar
                        </h3>
                        <p className="text-lg text-gray-900">{wine.place}</p>
                      </div>
                    )}

                    {wine.aromas && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                          Aromas
                        </h3>
                        <p className="text-gray-900">{wine.aromas}</p>
                      </div>
                    )}

                    {wine.flavors && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                          Sabores
                        </h3>
                        <p className="text-gray-900">{wine.flavors}</p>
                      </div>
                    )}

                    {wine.notes && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                          Notas Personales
                        </h3>
                        <p className="text-gray-900">{wine.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Seccion Notas Personales del Usuario */}
            {(wine.aromas || wine.flavors || wine.notes) && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-wine-900 mb-6">
                  Mis Notas de Cata
                </h2>

                <div className="space-y-6">
                  {wine.aromas && (
                    <div>
                      <h3 className="text-lg font-semibold text-wine-800 mb-2">
                        Aromas que detecte
                      </h3>
                      <p className="text-gray-700 bg-cream-50 p-4 rounded-lg">
                        {wine.aromas}
                      </p>
                    </div>
                  )}

                  {wine.flavors && (
                    <div>
                      <h3 className="text-lg font-semibold text-wine-800 mb-2">
                        Sabores que percibi
                      </h3>
                      <p className="text-gray-700 bg-cream-50 p-4 rounded-lg">
                        {wine.flavors}
                      </p>
                    </div>
                  )}

                  {wine.notes && (
                    <div>
                      <h3 className="text-lg font-semibold text-wine-800 mb-2">
                        Mis notas personales
                      </h3>
                      <p className="text-gray-700 bg-cream-50 p-4 rounded-lg">
                        {wine.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Seccion SommelIAr */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-wine-900">
                  Analisis Profesional del SommelIAr
                </h2>

                {/* Boton consultar */}
                {!wine.aiNotes && (
                  <Button
                    onClick={handleConsultSommelier}
                    disabled={consultingAI}
                    isProcessing={consultingAI}
                    className="bg-wine-700 hover:bg-wine-800"
                  >
                    <HiSparkles className="mr-2 h-5 w-5" />
                    {consultingAI ? 'Consultando...' : 'Consultar SommelIAr'}
                  </Button>
                )}

                {/* Boton regenerar si ya hay notas */}
                {wine.aiNotes && !consultingAI && (
                  <Button
                    onClick={handleConsultSommelier}
                    color="light"
                    size="sm"
                  >
                    <HiSparkles className="mr-2 h-4 w-4" />
                    Regenerar
                  </Button>
                )}
              </div>

              {/* Error de IA */}
              {aiError && (
                <Alert color="failure" icon={HiInformationCircle} className="mb-4">
                  {aiError}
                </Alert>
              )}

              {/* Spinner mientras consulta */}
              {consultingAI && (
                <div className="flex flex-col items-center justify-center py-12">
                  <Spinner size="xl" color="purple" />
                  <p className="mt-4 text-gray-600">
                    El SommelIAr esta analizando tu vino...
                  </p>
                  <p className="text-sm text-gray-500">Esto puede tomar unos segundos</p>
                </div>
              )}

              {/* Notas generadas */}
              {wine.aiNotes && !consultingAI && (
                <div className="bg-gradient-to-br from-cream-50 to-wine-50 rounded-lg p-6 border border-wine-200">
                  <div className="prose prose-wine max-w-none">
                    <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                      {wine.aiNotes}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-wine-200">
                    <p className="text-xs text-gray-500 italic">
                      * Este analisis fue generado por IA basandose en informacion objetiva sobre el vino.
                      Es independiente de tus notas personales de cata.
                    </p>
                  </div>
                </div>
              )}

              {/* Mensaje si no hay notas */}
              {!wine.aiNotes && !consultingAI && !aiError && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-wine-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HiSparkles className="w-10 h-10 text-wine-600" />
                  </div>
                  <p className="text-gray-600 mb-2">
                    Aun no has consultado al SommelIAr para este vino
                  </p>
                  <p className="text-sm text-gray-500">
                    Obtene un analisis profesional y objetivo generado por IA
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WineDetailPage;

