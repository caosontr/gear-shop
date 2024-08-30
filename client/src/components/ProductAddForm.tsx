  import { useForm } from 'react-hook-form'
  import { Button, Form, Container, Row, Col } from 'react-bootstrap'
  import { ProductFormValue } from '@/types/Product'
  import { createProduct } from '@/services/product'
  import { useState } from 'react'
  import { useNavigate } from 'react-router-dom'

  const ProductAddForm = () => {
    const useFormResult = useForm<ProductFormValue>()
    const navigate = useNavigate()

    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useFormResult

    const [saving, setSaving] = useState<boolean>(false)

    const onSubmit = async (formValue: ProductFormValue) => {
      setSaving(true)

      try {
        await createProduct(formValue)
        setSaving(false)
        navigate('/admin/products')
      } catch (error) {
        console.error('Error saving product:', error)
        setSaving(false)
      }
    }

    return (
      <Container className='mt-5'>
        <Row className='justify-content-md-center'>
          <Col md={6}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
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
                {errors.title && <div className='text-danger mt-1 fs-6'>{errors.title.message}</div>}
              </Form.Group>
              <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                <Form.Label>Image - URL</Form.Label>
                <Form.Control
                  type='text'
                  {...register('thumbnail', {
                    required: 'Trường này không được bỏ trống!',             
                  })}
                  isInvalid={!!errors.thumbnail}
                />
                {errors.thumbnail && <div className='text-danger mt-1 fs-6'>{errors.thumbnail.message}</div>}
              </Form.Group>

              <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type='text'
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
                      value: 1,
                      message: 'Giá phải lớn hơn 0'
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
                {errors.description && <div className='text-danger mt-1 fs-6'>{errors.description.message}</div>}
              </Form.Group>

              <Button disabled={saving} variant='primary' type='submit'>
                {saving ? 'Saving...' : 'Save'}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }

  export default ProductAddForm
