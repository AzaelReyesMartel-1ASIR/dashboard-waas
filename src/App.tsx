import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import ProtectedRoute from './routes/ProtectedRoute'
import MainLayout from './components/layout/MainLayout'
import BioPage from './pages/public/BioPage'
import AnalyticsPage from './pages/dashboard/AnalyticsPage'

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/bio" element={<BioPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
        </Route>
      </Route>

      {/* Fallback & Root Redirects */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
