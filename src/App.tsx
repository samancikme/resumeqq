import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import { HomePage } from './pages/HomePage'
import { CVGeneratorPage } from './pages/CVGeneratorPage'
import { ObyektivkaPage } from './pages/ObyektivkaPage'

const Layout = () => (
  <>
    <Toaster position="top-right" richColors />
    <Outlet />
  </>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/cv-generator', element: <CVGeneratorPage /> },
      { path: '/obyektivka', element: <ObyektivkaPage /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
