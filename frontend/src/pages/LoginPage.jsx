import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      navigate('/wines');
    } else {
      setError(result.error || 'Error al iniciar sesion');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wine-900 via-wine-800 to-wine-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-cream-50 rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-wine-900 mb-2">SommelIAr</h1>
          <p className="text-wine-700">Inicia sesion en tu cuenta</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-wine-900 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-wine-200 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent"
              placeholder="tu@email.com"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-wine-900 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-wine-200 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent"
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-wine-700 hover:bg-wine-800 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Iniciando sesion...' : 'Iniciar Sesion'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-wine-700">
            No tienes cuenta?{' '}
            <Link to="/register" className="font-semibold text-wine-900 hover:text-wine-700">
              Registrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

