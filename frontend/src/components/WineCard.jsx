import { Card, Button, Badge } from 'flowbite-react';
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
      <div className="grid grid-cols-2 gap-2 mt-4">
        <Button
          size="sm"
          color="light"
          onClick={() => onView(wine.id)}
          className="flex items-center justify-center gap-1"
        >
          <HiEye className="h-4 w-4" />
          Ver
        </Button>

        <Button
          size="sm"
          color="light"
          onClick={() => onEdit(wine.id)}
          className="flex items-center justify-center gap-1"
        >
          <HiPencil className="h-4 w-4" />
          Editar
        </Button>

        <Button
          size="sm"
          className="bg-wine-700 hover:bg-wine-800 flex items-center justify-center gap-1"
          onClick={() => onConsultSommelier(wine.id)}
        >
          <HiSparkles className="h-4 w-4" />
          SommelIAr
        </Button>

        <Button
          size="sm"
          color="failure"
          onClick={() => onDelete(wine.id)}
          className="flex items-center justify-center gap-1"
        >
          <HiTrash className="h-4 w-4" />
          Eliminar
        </Button>
      </div>
    </Card>
  );
}

export default WineCard;

