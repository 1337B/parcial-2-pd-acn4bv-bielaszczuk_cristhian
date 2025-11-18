import { Card, Badge } from 'flowbite-react';
import { HiEye, HiPencil, HiTrash, HiSparkles } from 'react-icons/hi';

function WineCard({ wine, onView, onEdit, onDelete, onConsultSommelier }) {
  const imageSrc = wine.imageUrl || 'https://via.placeholder.com/300x400?text=Vino';

  return (
    <Card className="max-w-sm hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6">
      <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-4 sm:mb-5">
        <img
          src={imageSrc}
          alt={wine.name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x400?text=Vino';
          }}
        />
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div className="mb-3 sm:mb-4">
          <h5 className="text-base sm:text-lg font-bold text-wine-900 line-clamp-2 leading-tight mb-1.5">
            {wine.name}
          </h5>
          {wine.winery && (
            <p className="text-xs sm:text-sm text-gray-500 italic">
              {wine.winery}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {wine.grape && (
            <Badge color="purple" size="sm" className="font-medium">
              {wine.grape}
            </Badge>
          )}
          {wine.year && (
            <Badge color="gray" size="sm" className="font-medium">
              Cosecha {wine.year}
            </Badge>
          )}
        </div>

        {(wine.region || wine.country) && (
          <div className="flex items-start gap-1.5 text-sm text-gray-600">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1">
              {wine.region}{wine.region && wine.country ? ', ' : ''}{wine.country}
            </span>
          </div>
        )}

        {wine.rating && (
          <div className="inline-flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200">
            <span className="text-yellow-500 text-lg">★</span>
            <span className="text-sm font-bold text-gray-800">
              {wine.rating}
            </span>
            <span className="text-xs text-gray-500">/5</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:gap-2.5 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
        <div className="flex gap-2 sm:gap-2.5">
          <button
            onClick={() => onView(wine.id)}
            className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-wine-500 transition-colors"
          >
            <HiEye className="h-4 w-4" />
            <span className="hidden xs:inline">Ver</span>
          </button>

          <button
            onClick={() => onEdit(wine.id)}
            className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-wine-500 transition-colors"
          >
            <HiPencil className="h-4 w-4" />
            <span className="hidden xs:inline">Editar</span>
          </button>
        </div>

        <button
          onClick={() => onConsultSommelier(wine.id)}
          className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-wine-700 rounded-lg hover:bg-wine-800 focus:ring-2 focus:ring-wine-500 transition-colors shadow-sm"
        >
          <HiSparkles className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>Consultar SommelIApp</span>
        </button>

        <button
          onClick={() => onDelete(wine.id)}
          className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-red-700 bg-red-50 border border-red-300 rounded-lg hover:bg-red-100 focus:ring-2 focus:ring-red-500 transition-colors"
        >
          <HiTrash className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span>Eliminar</span>
        </button>
      </div>
    </Card>
  );
}

export default WineCard;

