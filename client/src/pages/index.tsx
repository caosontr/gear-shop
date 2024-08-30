import Layout from '@/layouts/Layout'
import { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/services/product'
import { Link } from 'react-router-dom'
import { Container, Spinner } from 'react-bootstrap'

type Props = {}

const Home: FC<Props> = () => {
  const result = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  })
  const loading = result.isLoading
  const products = result.data || []
  if (loading) {
    return (
      <Container fluid className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
        <Spinner animation='border' />
      </Container>
    )
  }

  return (
    <Layout>
      <div className='container mx-auto py-10'>
        <h1 className='text-3xl font-semibold mb-6'>Sản phẩm mới nhất</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {products.map((product) => (
            <div key={product.id} className=' w-69 bg-white rounded-lg shadow-md overflow-hidden'>
              <Link to={'/products/' + product.id}>
                <img className=' w-69 object-cover' src={product.thumbnail} alt={product.title} />
                <div className='p-4'>
                  <h2 className='text-xl font-semibold mb-2'>{product.title}</h2>
                  <p className='text-sm text-gray-600 mb-2'>Brand: {product.brand}</p>
                  <p className='text-red-600 font-semibold'>{product.price} VNĐ</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Home
