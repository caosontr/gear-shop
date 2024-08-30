import { FC } from 'react'
import { Container, Navbar, Nav, FormControl, Button } from 'react-bootstrap'
import { RiSearchLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

type Props = {}

const Menu: FC<Props> = () => {
  return (
    <div className='header-wrapper'>
      <Container>
        <div className='row align-items-center'>
          {/* Logo */}
          <div className='col-lg-3 col-md-3 col-sm-3 col-8'>
            <div className='logo'>
              <Navbar.Brand href='#home'>Logo</Navbar.Brand>
            </div>
          </div>

          {/* Search */}
          <div className='col-lg-6 col-md-6 col-sm-6 col-12'>
            <div className='search-bg d-flex'>
              <FormControl type='text' placeholder='Search Here' className='form-control me-2' />
              <Button variant='outline-secondary'>
                <RiSearchLine />
              </Button>
            </div>
          </div>

          {/* Account */}
          <div className='col-lg-3 col-md-3 col-sm-3 col-12'>
            <div className='d-flex justify-content-center align-items-center'>
              <ul className='list-unstyled d-flex align-items-center mb-0 gap-2'>
                <li>
                  <Link to='/admin/products' className='text-decoration-none me-2'>
                    Admin
                  </Link>
                </li>
                <li>|</li>
                <li>
                  <Link to='/login' className='text-decoration-none me-2'>
                    Đăng Nhập
                  </Link>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
      </Container>

      <div className='navigation mt-6'>
        <Container >
          <div className='row'>
            <div className='col-12'>
              <Nav className='me-auto'>
                <Nav.Link href='/'>Trang chủ</Nav.Link>
                <Nav.Link href='/products'>Product</Nav.Link>
                <Nav.Link href='#link'>Thông tin</Nav.Link>
                <Nav.Link href='#link'>Bài viết</Nav.Link>
                <Nav.Link href='#link'>Liên hệ, hỗ trợ</Nav.Link>
              </Nav>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Menu
