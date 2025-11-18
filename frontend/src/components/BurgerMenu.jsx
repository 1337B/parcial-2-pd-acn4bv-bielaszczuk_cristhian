import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenu, HiX, HiPlus, HiLogout, HiViewGrid } from 'react-icons/hi';

function BurgerMenu({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleAddWine = () => {
    navigate('/wines/new');
    closeMenu();
  };

  const handleLogout = () => {
    onLogout();
    closeMenu();
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 text-cream-50 hover:bg-wine-800 rounded-lg transition-colors"
        aria-label="Menu"
      >
        {isOpen ? (
          <HiX className="h-6 w-6" />
        ) : (
          <HiMenu className="h-6 w-6" />
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-wine-900 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-wine-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-wine-700 rounded-full flex items-center justify-center">
                <span className="text-cream-50 text-sm font-bold">
                  {user?.email?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-cream-50 text-sm font-medium truncate">
                  {user?.email || 'Usuario'}
                </p>
              </div>
            </div>
            <button
              onClick={closeMenu}
              className="p-1 text-cream-200 hover:text-cream-50"
            >
              <HiX className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <Link
              to="/wines"
              className="flex items-center gap-3 px-4 py-3 text-cream-100 hover:bg-wine-800 hover:text-cream-50 transition-colors"
              onClick={closeMenu}
            >
              <HiViewGrid className="h-5 w-5" />
              <span className="font-medium">Mis Vinos</span>
            </Link>

            <button
              onClick={handleAddWine}
              className="w-full flex items-center gap-3 px-4 py-3 text-cream-100 hover:bg-wine-800 hover:text-cream-50 transition-colors"
            >
              <HiPlus className="h-5 w-5" />
              <span className="font-medium">Agregar Vino</span>
            </button>

            <div className="border-t border-wine-700 my-4"></div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-wine-800 hover:text-red-200 transition-colors"
            >
              <HiLogout className="h-5 w-5" />
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </nav>

          <div className="p-4 border-t border-wine-700">
            <p className="text-cream-400 text-xs text-center">
              SommelIApp © 2025
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BurgerMenu;

