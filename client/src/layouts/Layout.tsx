import { FC, ReactNode } from 'react'
import { Container } from 'react-bootstrap'
import Menu from '@/layouts/Menu.tsx'

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <Container>
      <Menu />
      {children}
    </Container>
  )
}

export default Layout
