import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { HiArrowLeft } from 'react-icons/hi';

function WineDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const sommelierNotes = location.state?.sommelierNotes;

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
            Detalle del Vino
          </h1>
          <p className="text-gray-600 mb-4">ID: {id}</p>

          {sommelierNotes && (
            <div className="mt-6 bg-cream-50 rounded-lg p-6 border border-wine-200">
              <h2 className="text-xl font-bold text-wine-900 mb-4">
                Notas del SommelIAr
              </h2>
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                {sommelierNotes}
              </pre>
            </div>
          )}

          <p className="text-gray-500 mt-8">
            Página de detalle en construcción...
          </p>
        </div>
      </div>
    </div>
  );
}

export default WineDetailPage;

