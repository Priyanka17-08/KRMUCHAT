import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import AdminAssistantPage from './pages/AdminAssistantPage';
import LoginPage from './pages/LoginPage';
import FacultyAssistantPage from './pages/FacultyAssistantPage';
import PlacementAssistantPage from './pages/PlacementAssistantPage';
import TimetableAssistantPage from './pages/TimetableAssistantPage';
import StudentAssistantPage from './pages/StudentAssistantPage';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="h-screen w-screen flex items-center justify-center bg-[#05070A] text-slate-400">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect based on role if unauthorized
    return <Navigate to={user.role === 'admin' ? '/admin' : '/'} replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={
              <ProtectedRoute allowedRoles={['student']}>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="student-assistant" element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentAssistantPage />
              </ProtectedRoute>
            } />
            <Route path="faculty-assistant" element={
              <ProtectedRoute allowedRoles={['student']}>
                <FacultyAssistantPage />
              </ProtectedRoute>
            } />
            <Route path="placement-assistant" element={
              <ProtectedRoute allowedRoles={['student']}>
                <PlacementAssistantPage />
              </ProtectedRoute>
            } />
            <Route path="timetable-assistant" element={
              <ProtectedRoute allowedRoles={['student']}>
                <TimetableAssistantPage />
              </ProtectedRoute>
            } />
            <Route path="dashboard" element={
              <ProtectedRoute allowedRoles={['student']}>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPage />
              </ProtectedRoute>
            } />
            <Route path="admin-assistant" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminAssistantPage />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
