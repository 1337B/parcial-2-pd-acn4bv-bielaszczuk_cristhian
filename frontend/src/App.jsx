import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WineListPage from './pages/WineListPage';
import WineDetailPage from './pages/WineDetailPage';
import WineFormPage from './pages/WineFormPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
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
  );
}

export default App;
