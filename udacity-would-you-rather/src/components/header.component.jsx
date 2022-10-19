import React from 'react'
import {Nav, Navbar, Container, Button} from 'react-bootstrap';
import { connect } from "react-redux";
import { setCurrentUser } from "../actions/auth";
import {useHistory} from "react-router-dom";


function Header({auth, setCurrentUser}) {
    const history = useHistory()
    const handleClick = () => {
        if(auth)
            setCurrentUser(null)
        else {
            history.push('/login')
        }
    }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand onClick={()=> history.push('/home')}>Would You Rather?</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={()=> history.push('/home')}>Home</Nav.Link>
            <Nav.Link onClick={()=> history.push('/new-question')}>New Question</Nav.Link>
            <Nav.Link onClick={()=> history.push('/leader-board')}>Leader Board</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="current-user mx-3">{auth && auth.name}</div>
        <Button variant='danger' onClick={handleClick}>{auth ? 'Sign Out' : 'Sign in'}</Button>
      </Container>
    </Navbar>


  )
}

const mapStateToProps = ({auth}) => {
    return {
        auth,
    };
};

export default connect(mapStateToProps, { setCurrentUser })(Header)