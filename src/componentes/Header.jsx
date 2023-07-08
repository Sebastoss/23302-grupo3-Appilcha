import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function Header() {
  
  
  // Función para cerrar el menú hamburguesa al scrollear
  const handleTogglerNav = e =>{
      
      const basicNavBar = document.getElementById("basic-navbar-nav");
      
      window.addEventListener("scroll", ()=>{
        if(basicNavBar.classList.contains("show")){
          e.target.click();
        }
      });

  }
  

return (

    //Navbar de react-boostrap
    <Navbar expand="md" className="light">
      <Container>
        <Navbar.Brand href="/"><img
              src="../appilcha.png"
              width="150"
              className="d-inline-block align-top"
              alt="Appilcha Logo"
            /></Navbar.Brand>
        <Navbar.Toggle onClick={e => handleTogglerNav(e)} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-uppercase fw-bolder">
            <Nav.Link as={Link} to="/" className='ms-auto'>Inicio</Nav.Link>
            <Nav.Link as={Link} to="/Tienda" className='ms-auto'>Tienda</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
)
}

export default Header