import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute, RoleGuard } from './components/guards/Guards';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProvincesPage from './pages/provinces/ProvincesPage';
import StationsPage from './pages/stations/StationsPage';
import BergeriesPage from './pages/bergeries/BergeriesPage';
import MembersPage from './pages/members/MembersPage';
import DepensesPage from './pages/depenses/DepensesPage';
import AnnouncementsPage from './pages/announcements/AnnouncementsPage';
import ReportsPage from './pages/reports/ReportsPage';
import DashboardLayout from './layouts/DashboardLayout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/provinces" element={<ProvincesPage />} />
              <Route path="/stations" element={<StationsPage />} />
              <Route path="/bergeries" element={<BergeriesPage />} />
              <Route path="/membres" element={<MembersPage />} />
              <Route path="/depenses" element={<DepensesPage />} />
              <Route path="/annonces" element={<AnnouncementsPage />} />
              <Route path="/rapports" element={<ReportsPage />} />
              
              {/* Autres routes à ajouter dans les phases suivantes */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Route>
          
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
