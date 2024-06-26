import { ThemeProvider } from "@/components/theme-provider"
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { PostPage } from './pages/PostPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import AuthProvider from '@/components/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import { MatkulPage } from "./pages/MatkulPage";
import { JadwalPage } from "./pages/JadwalPage";
import { ProfilePage } from "./pages/ProfilePage";
import { OfferPage } from "./pages/OfferPage";


const router = createBrowserRouter([{
  path: '/',
  element: (
    <ProtectedRoute>
      <HomePage />
    </ProtectedRoute>
  ),
  errorElement: <Navigate to="/404" replace />,
},
{
  path: '/post',
  element: (
    <ProtectedRoute>
      <PostPage />
    </ProtectedRoute>
  ),
},
{
  path: '/matkul',
  element: (
    <ProtectedRoute>
      <MatkulPage />
    </ProtectedRoute>
  ),
},
{
  path: '/matkul/:id',
  element: (
    <ProtectedRoute>
      <JadwalPage />
    </ProtectedRoute>
  ),
},
{
  path: '/offer/:id',
  element: (
    <ProtectedRoute>
      <OfferPage />
    </ProtectedRoute>
  ),
},
{
  path: '/profile',
  element: (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  ),
},
{
  path: '/login',
  element: <LoginPage />,
},
{
  path: '/register',
  element: <RegisterPage />,
},
{
  path: '/404',
  element: <NotFoundPage />,
}]);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
