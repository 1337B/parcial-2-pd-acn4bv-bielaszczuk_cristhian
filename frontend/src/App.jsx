import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WineListPage from './pages/WineListPage';
import WineDetailPage from './pages/WineDetailPage';
import WineFormPage from './pages/WineFormPage';
import AboutPage from './pages/AboutPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#374151',
            padding: '16px',
            borderRadius: '10px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
          success: {
            iconTheme: {
              primary: '#7c2d3e',
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/wines"
          element={
            <PrivateRoute>
              <WineListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/wines/new"
          element={
            <PrivateRoute>
              <WineFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/wines/:id"
          element={
            <PrivateRoute>
              <WineDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/wines/:id/edit"
          element={
            <PrivateRoute>
              <WineFormPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
