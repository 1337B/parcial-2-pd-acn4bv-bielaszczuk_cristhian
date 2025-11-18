import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Label, TextInput, Button, Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import wineglassIcon from '../assets/wineglass.svg';

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
    <div className="min-h-screen bg-gradient-to-br from-wine-900 via-wine-800 to-wine-950 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-cream-50 rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-wine-900 mb-4">SommelIApp</h1>
            <div className="flex justify-center mb-4">
              <img src={wineglassIcon} alt="Wine Glass" className="w-16 h-16" />
            </div>
            <p className="text-wine-700 text-lg">Inicia sesión en tu cuenta</p>
          </div>

          {error && (
            <Alert color="failure" icon={HiInformationCircle} className="mb-6">
              <span className="font-medium">Error:</span> {error}
            </Alert>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" className="text-wine-900 font-medium" />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                color="gray"
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Contraseña" className="text-wine-900 font-medium" />
              </div>
              <TextInput
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                color="gray"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              isProcessing={loading}
              processingSpinner={
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              }
              className="w-full bg-wine-700 hover:bg-wine-800 focus:ring-4 focus:ring-wine-300"
            >
              {loading ? 'Iniciando sesion...' : 'Iniciar Sesion'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-wine-700">
              No tenes cuenta?{' '}
              <Link
                to="/register"
                className="font-semibold text-wine-900 hover:text-wine-700 hover:underline"
              >
                Registrate aqui
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

