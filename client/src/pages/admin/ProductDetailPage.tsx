import ProductForm from '@/components/ProductEditForm'
import { getProduct } from '@/services/product'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { useParams } from 'react-router-dom'

const ProductDetailPage: FC = () => {
  const { id } = useParams()

  const result = useQuery({
    queryKey: ['product'],
    queryFn: () => (id ? getProduct(id) : undefined)
  })

  const product = result.data

  return (
    
    <div className='mt-5'>
      <h1 className='text-center mb-4'>Product detail page</h1>

      
      {product && <ProductForm product={product} />}
    </div>
  )
}

export default ProductDetailPage
