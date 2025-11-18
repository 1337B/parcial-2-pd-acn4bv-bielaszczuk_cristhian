import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Label, TextInput, Button, Alert } from 'flowbite-react';
import { HiInformationCircle, HiCheckCircle } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import wineglassIcon from '../assets/wineglass.svg';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    const result = await register(email, password);

    if (result.success) {
      navigate('/wines');
    } else {
      setError(result.error || 'Error al registrarse');
    }

    setLoading(false);
  };

  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const passwordsDontMatch = password && confirmPassword && password !== confirmPassword;

  return (
    <div className="min-h-screen bg-gradient-to-br from-wine-900 via-wine-800 to-wine-950 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-cream-50 rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-wine-900 mb-4">SommelIApp</h1>
            <div className="flex justify-center mb-4">
              <img src={wineglassIcon} alt="Wine Glass" className="w-16 h-16" />
            </div>
            <p className="text-wine-700 text-lg">Crea tu cuenta</p>
          </div>

          {error && (
            <Alert color="failure" icon={HiInformationCircle} className="mb-6">
              <span className="font-medium">Error:</span> {error}
            </Alert>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
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
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={loading}
                color="gray"
                helperText={
                  <span className="text-xs text-gray-600">
                    Debe tener al menos 6 caracteres
                  </span>
                }
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="confirmPassword"
                  value="Confirmar Contraseña"
                  className="text-wine-900 font-medium"
                />
              </div>
              <TextInput
                id="confirmPassword"
                type="password"
                placeholder="Repetí tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                disabled={loading}
                color={passwordsMatch ? 'success' : passwordsDontMatch ? 'failure' : 'gray'}
                helperText={
                  passwordsDontMatch ? (
                    <span className="text-xs text-red-600 flex items-center gap-1">
                      Las contraseñas no coinciden
                    </span>
                  ) : passwordsMatch ? (
                    <span className="text-xs text-green-600 flex items-center gap-1">
                      <HiCheckCircle className="h-3 w-3" /> Las contraseñas coinciden
                    </span>
                  ) : null
                }
              />
            </div>

            <Button
              type="submit"
              disabled={loading || passwordsDontMatch}
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
              className="w-full bg-wine-700 hover:bg-wine-800 focus:ring-4 focus:ring-wine-300 mt-6"
            >
              {loading ? 'Creando cuenta...' : 'Registrarse'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-wine-700">
              Ya tenes cuenta?{' '}
              <Link
                to="/login"
                className="font-semibold text-wine-900 hover:text-wine-700 hover:underline"
              >
                Inicia sesion aqui
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

