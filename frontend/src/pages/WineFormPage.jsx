import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Alert, Spinner } from 'flowbite-react';
import { HiArrowLeft, HiInformationCircle } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { createWine, getWineById, updateWine } from '../services/apiClient';
import WineForm from '../components/WineForm';
import Footer from '../components/Footer';

function WineFormPage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode && token) {
      loadWine();
    } else {
      setInitialValues({});
    }
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
        await updateWine(token, id, values);
        toast.success('¡Vino actualizado exitosamente en tu colección!');
      } else {
        await createWine(token, values);
        toast.success('¡Vino agregado a tu colección con elegancia!');
      }

      navigate('/wines');
    } catch (err) {
      console.error('Error submitting wine:', err);
      setError(err.message || 'Error al guardar el vino');
      throw err;
    }
  };

  const handleCancel = () => {
    navigate('/wines');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Button
          color="light"
          onClick={handleCancel}
          className="mb-6"
        >
          <HiArrowLeft className="mr-2 h-4 w-4" />
          Volver a Mis Vinos
        </Button>

        <div className="bg-white rounded-lg shadow-lg p-8">
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

          {loading && (
            <div className="flex justify-center items-center py-12">
              <Spinner size="xl" color="purple" />
              <span className="ml-3 text-gray-600">Cargando datos del vino...</span>
            </div>
          )}

          {error && !loading && (
            <Alert color="failure" icon={HiInformationCircle} className="mb-6">
              <span className="font-medium">Error:</span> {error}
            </Alert>
          )}

          {!loading && initialValues && (
            <div>
              <WineForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                submitLabel={isEditMode ? 'Guardar Cambios' : 'Crear Vino'}
              />

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

      <Footer />
    </div>
  );
}

export default WineFormPage;

