import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';

export const Menu = (args) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);

    return(
        <div>
            <Navbar color='info' dark expand='md'>
                <Container className='d-flex'>
                    <NavbarBrand href="/">Services TI Academy</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="me-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>                                                
                        </Nav>                    
                    </Collapse>
                </Container>                
            </Navbar>
        </div>
    );
};