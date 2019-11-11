import React, { Component } from 'react';
import { Link } from 'react-router-dom' 
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    NavItem,
} from 'reactstrap'

class Menu extends Component {

    constructor(){
        super()
        this.state = {
            isOpen: false
        }
    }

    handleStateMenu = (state) => (
        this.setState({
            isOpen: state
        })
    )
    render() {
        return (
            < div >
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">CASA</NavbarBrand>
                    <NavbarToggler onClick={() => this.handleStateMenu(!this.state.isOpen)} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/usuarios">Usuarios</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/tareas">Tareas</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div >

        )
    }
}


export default Menu