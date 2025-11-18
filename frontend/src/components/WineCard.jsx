import { Card, Badge } from 'flowbite-react';
import { HiEye, HiPencil, HiTrash, HiSparkles } from 'react-icons/hi';

function WineCard({ wine, onView, onEdit, onDelete, onConsultSommelier }) {
  // Placeholder image si no hay imageUrl
  const imageSrc = wine.imageUrl || 'https://via.placeholder.com/300x400?text=Vino';

  return (
    <Card className="max-w-sm hover:shadow-xl transition-shadow duration-300">
      {/* Imagen del vino */}
      <div className="h-48 overflow-hidden rounded-t-lg bg-gray-100">
        <img
          src={imageSrc}
          alt={wine.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x400?text=Vino';
          }}
        />
      </div>

      {/* Informacion del vino */}
      <div className="space-y-3">
        {/* Nombre */}
        <h5 className="text-xl font-bold text-wine-900 truncate">
          {wine.name}
        </h5>

        {/* Bodega */}
        {wine.winery && (
          <p className="text-sm text-gray-600 truncate">
            {wine.winery}
          </p>
        )}

        {/* Cepa y Año */}
        <div className="flex items-center gap-2">
          {wine.grape && (
            <Badge color="purple" size="sm">
              {wine.grape}
            </Badge>
          )}
          {wine.year && (
            <Badge color="gray" size="sm">
              {wine.year}
            </Badge>
          )}
        </div>

        {/* Region */}
        {wine.region && (
          <p className="text-sm text-gray-600 truncate">
            {wine.region}{wine.country ? `, ${wine.country}` : ''}
          </p>
        )}

        {/* Rating */}
        {wine.rating && (
          <div className="flex items-center gap-1">
            <span className="text-yellow-400 text-lg">★</span>
            <span className="text-sm font-semibold text-gray-700">
              {wine.rating}/5
            </span>
          </div>
        )}
      </div>

      {/* Botones de accion */}
      <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-200">
        {/* Primera fila: Ver y Editar */}
        <div className="flex gap-2">
          <button
            onClick={() => onView(wine.id)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-wine-500 transition-colors"
          >
            <HiEye className="h-4 w-4" />
            Ver
          </button>

          <button
            onClick={() => onEdit(wine.id)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-wine-500 transition-colors"
          >
            <HiPencil className="h-4 w-4" />
            Editar
          </button>
        </div>

        {/* Segunda fila: SommelIAr completo */}
        <button
          onClick={() => onConsultSommelier(wine.id)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-wine-700 rounded-lg hover:bg-wine-800 focus:ring-2 focus:ring-wine-500 transition-colors"
        >
          <HiSparkles className="h-5 w-5" />
          Consultar SommelIAr
        </button>

        {/* Tercera fila: Eliminar completo */}
        <button
          onClick={() => onDelete(wine.id)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-300 rounded-lg hover:bg-red-100 focus:ring-2 focus:ring-red-500 transition-colors"
        >
          <HiTrash className="h-4 w-4" />
          Eliminar
        </button>
      </div>
    </Card>
  );
}

export default WineCard;

