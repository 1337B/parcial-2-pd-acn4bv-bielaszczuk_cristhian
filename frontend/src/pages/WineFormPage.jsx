import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Alert, Spinner } from 'flowbite-react';
import { HiArrowLeft, HiInformationCircle } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import { createWine, getWineById, updateWine } from '../services/apiClient';
import WineForm from '../components/WineForm';

function WineFormPage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams(); // Si hay ID, estamos editando

  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isEditMode = Boolean(id);

  // Si estamos en modo edicion, cargar los datos del vino
  useEffect(() => {
    if (isEditMode && token) {
      loadWine();
    } else {
      // Modo creacion: valores vacios
      setInitialValues({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

  const loadWine = async () => {
    setLoading(true);
    setError('');

    try {
      const wine = await getWineById(token, id);
      setInitialValues(wine);
    } catch (err) {
      console.error('Error loading wine:', err);
      setError(err.message || 'Error al cargar el vino');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setError('');

    try {
      if (isEditMode) {
        // Actualizar vino existente
        await updateWine(token, id, values);
      } else {
        // Crear nuevo vino
        await createWine(token, values);
      }

      // Redirigir a la lista de vinos
      navigate('/wines');
    } catch (err) {
      console.error('Error submitting wine:', err);
      setError(err.message || 'Error al guardar el vino');
      // Re-lanzar el error para que WineForm lo maneje
      throw err;
    }
  };

  const handleCancel = () => {
    navigate('/wines');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Boton volver */}
        <Button
          color="light"
          onClick={handleCancel}
          className="mb-6"
        >
          <HiArrowLeft className="mr-2 h-4 w-4" />
          Volver a Mis Vinos
        </Button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Titulo */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-wine-900 mb-2">
              {isEditMode ? 'Editar Vino' : 'Agregar Nuevo Vino'}
            </h1>
            <p className="text-gray-600">
              {isEditMode
                ? 'Modifica los datos de tu vino'
                : 'Completa los datos de tu nuevo vino'}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Los campos marcados con <span className="text-red-600">*</span> son obligatorios
            </p>
          </div>

          {/* Loading state mientras carga datos para editar */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <Spinner size="xl" color="purple" />
              <span className="ml-3 text-gray-600">Cargando datos del vino...</span>
            </div>
          )}

          {/* Error alert */}
          {error && !loading && (
            <Alert color="failure" icon={HiInformationCircle} className="mb-6">
              <span className="font-medium">Error:</span> {error}
            </Alert>
          )}

          {/* Formulario */}
          {!loading && initialValues && (
            <div>
              <WineForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                submitLabel={isEditMode ? 'Guardar Cambios' : 'Crear Vino'}
              />

              {/* Boton cancelar */}
              <div className="mt-4 flex justify-end">
                <Button
                  color="light"
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WineFormPage;

