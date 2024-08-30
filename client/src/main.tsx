import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductDetailPage from '@/pages/admin/ProductDetailPage'
import ProductListPage from '@/pages/admin/ProductListPage.tsx'
import Home from '@/pages'
import ProductCreatePage from './pages/admin/ProductCreatePage'
import SignInPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ProductDetail from './pages/ProductDetailPage'
import { ToastContainer } from 'react-toastify'
import ProtectRouter from './ProtectRouter'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/products',
    element: <div>Products</div>
  },
  {
    path: '/products/:id',
    element: <ProductDetail />
  },
  {
    path: '/admin/products',
    element: (
      <ProtectRouter>
        <ProductListPage />
      </ProtectRouter>
    )
  },
  {
    path: '/admin/products/create',
    element: <ProductCreatePage />
  },
  {
    path: '/admin/products/:id',
    element: <ProductDetailPage />
  },
  {
    path: '/sign-up',
    element: <SignInPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  }
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ToastContainer />
  </QueryClientProvider>
)
