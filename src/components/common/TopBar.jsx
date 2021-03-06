import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import TopBarLink from './TopBarLink'

class TopBar extends React.Component {
  render() {
    const name = localStorage.getItem('name') || ''

    return (
      <Navbar expand="md" bg="dark" variant="dark">
        <Navbar.Brand as={Link} to='/'>
          ネガポジ クリッカー
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <TopBarLink
              to='/'
              title="Home"
            />
            <TopBarLink
              to='/info'
              title="Infomation"
            />
            <TopBarLink
              to='/history'
              title="History"
            />
            <TopBarLink
              to='/download'
              title="Download"
            />
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            User: {name}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
export default withRouter(TopBar)