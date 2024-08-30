import { useState } from 'react'
import { Button, Form, Container, Row, Col, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { LoginForm } from '../types/Auth'
import { login } from '../services/auth'

const LoginPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<LoginForm>()

  const onSubmit = (formValue: LoginForm) => {
    setLoading(true)

    login(formValue)
      .then((res) => {
        const accessToken = res.accessToken
        window.sessionStorage.setItem('access-token', accessToken)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Đăng Nhập Thành Công!',
          showConfirmButton: false,
          timer: 1500
        })
        navigate('/')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (loading) {
    return (
      <Container fluid className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
        <Spinner animation='border' />
      </Container>
    )
  }

  return (
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col xs={12} md={6}>
          <h1 className='text-center mb-4'>Login</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                {...register('email', {
                  required: 'Please type your email!',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Email not valid'
                  }
                })}
                isInvalid={!!errors?.email}
              />
              <Form.Control.Feedback type='invalid'>{errors?.email?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                {...register('password', {
                  required: 'Please type your password!',
                  minLength: {
                    value: 8,
                    message: 'Min length by 8 chars'
                  }
                })}
                isInvalid={!!errors?.password}
              />
              <Form.Control.Feedback type='invalid'>{errors?.password?.message}</Form.Control.Feedback>
            </Form.Group>

            <div className='d-flex justify-content-between mt-6'>
              <Link to='/sign-up' className='fs-6'>
                Sign in now
              </Link>
              <Button type='submit' className='btn-primary' disabled={loading}>
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
