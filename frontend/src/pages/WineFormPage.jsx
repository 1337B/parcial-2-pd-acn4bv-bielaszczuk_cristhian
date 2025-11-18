import { useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { HiArrowLeft } from 'react-icons/hi';

function WineFormPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Button
          color="light"
          onClick={() => navigate('/wines')}
          className="mb-6"
        >
          <HiArrowLeft className="mr-2 h-4 w-4" />
          Volver a Mis Vinos
        </Button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-wine-900 mb-4">
            Agregar Nuevo Vino
          </h1>
          <p className="text-gray-500">
            Formulario en construcción...
          </p>
        </div>
      </div>
    </div>
  );
}

export default WineFormPage;

