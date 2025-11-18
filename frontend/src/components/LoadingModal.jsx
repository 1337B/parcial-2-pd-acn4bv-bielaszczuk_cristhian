import GrapeLoader from './GrapeLoader';

function LoadingModal({ isOpen, message = "Cargando..." }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4">
        <GrapeLoader message={message} isLoading={isOpen} />
      </div>
    </div>
  );
}

export default LoadingModal;

