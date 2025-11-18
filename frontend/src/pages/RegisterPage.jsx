import { Link } from 'react-router-dom';

function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wine-900 via-wine-800 to-wine-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-cream-50 rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-wine-900 mb-2">SommelIAr</h1>
          <p className="text-wine-700">Crea tu cuenta</p>
        </div>

        <form className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-wine-900 mb-2">
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border border-wine-200 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent"
              placeholder="tu_usuario"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-wine-900 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-wine-200 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-wine-900 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-wine-200 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-wine-900 mb-2">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 border border-wine-200 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-wine-700 hover:bg-wine-800 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
          >
            Registrarse
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-wine-700">
            Ya tienes cuenta?{' '}
            <Link to="/login" className="font-semibold text-wine-900 hover:text-wine-700">
              Inicia sesion
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

