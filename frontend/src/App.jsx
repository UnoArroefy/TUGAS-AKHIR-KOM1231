import { Button } from '@/components/ui/button'
import { ThemeProvider } from "@/components/theme-provider"
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { PostPage } from './pages/PostPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LoginPage } from './pages/LoginPage';

const router = createBrowserRouter([{
  path: '/',
  element: <HomePage />,
  errorElement: <Navigate to="/404" replace />,
},
{
  path: '/post',
  element: <PostPage />,
},
{
  path: '/login',
  element: <LoginPage />,
},
{
  path: '/404',
  element: <NotFoundPage />,
}]);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
