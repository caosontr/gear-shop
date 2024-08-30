  import { updateProduct } from '@/services/product'
  import { Product, ProductFormValue } from '@/types/Product'
  import { FC, useState } from 'react'
  import { useForm } from 'react-hook-form'
  import { Button, Form } from 'react-bootstrap'
  import { useNavigate } from 'react-router-dom'

  type Props = {
    product: Product
  }

  const ProductForm: FC<Props> = ({ product }) => {
    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm<ProductFormValue>({
      defaultValues: {
        title: product.title,
        description: product.description,
        brand: product.brand,
        price: Number(product.price)
      }
    })

    const navigate = useNavigate()

    const [saving, setSaving] = useState<boolean>(false)

    const handleSave = async (formValue: ProductFormValue) => {
      if (!formValue.title || !formValue.thumbnail || !formValue.brand || !formValue.price || !formValue.description) {
        alert('Vui lòng điền đầy đủ thông tin')
        return
      }

      setSaving(true)
      try {
        await updateProduct(product.id, formValue)
        setSaving(false)
        navigate('/admin/products')
      } catch (error) {
        console.error('Error updating product:', error)
        setSaving(false)
      }
    }

    return (
      <div>
        <Form onSubmit={handleSubmit(handleSave)}>
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              {...register('title', {
                required: 'Trường này không được bỏ trống!',
                minLength: {
                  value: 5,
                  message: 'Số lượng ký tự tối thiểu là 5'
                },
                maxLength: {
                  value: 255,
                  message: 'Số lượng ký tự tối đa là 255'
                }
              })}
              isInvalid={!!errors.title}
            />
            {errors.title && <div className='text-danger mt-1 fs-6' >{errors.title.message}</div>}
          </Form.Group>

          <Form.Group className='mb-3' controlId='exampleForm.ControlInputThumbnail'>
            <Form.Label>Image - URL</Form.Label>
            <Form.Control
              as='input'
              defaultValue={product.thumbnail}
              {...register('thumbnail', {
                required: 'Trường này không được bỏ trống!'
              })}
              isInvalid={!!errors.thumbnail}
            />
            {errors.thumbnail && <div className='text-danger mt-1 fs-6'>{errors.thumbnail.message}</div>}
          </Form.Group>

          <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              as='input'
              {...register('brand', {
                required: 'Trường này không được bỏ trống!'
              })}
              isInvalid={!!errors.brand}
            />
            {errors.brand && <div className='text-danger mt-1 fs-6'>{errors.brand.message}</div>}
          </Form.Group>

          <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              as='input'
              {...register('price', {
                required: 'Trường này không được bỏ trống!',
                min: {
                  value: 0,
                  message: 'Giá không được là số âm!'
                }
              })}
              isInvalid={!!errors.price}
            />
            {errors.price && <div className='text-danger mt-1 fs-6'>{errors.price.message}</div>}
          </Form.Group>

          <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              {...register('description', {
                required: 'Trường này không được bỏ trống!',
                minLength: {
                  value: 20,
                  message: 'Số lượng ký tự tối thiểu là 20'
                }
              })}
              isInvalid={!!errors.description}
            />
            {errors.description && <div className='text-danger mt-1 fs-6 '>{errors.description.message}</div>}
          </Form.Group>

          <Button disabled={saving} variant='primary' type='submit'>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </Form>
      </div>
    )
  }

  export default ProductForm
