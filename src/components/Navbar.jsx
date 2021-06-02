import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
export const AppBar = ({ isLogin }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const handleClick = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };
    return (
        <div className="pb-5">
            <Navbar color="dark" dark expand="md" fixed="top">
                <NavbarBrand>Listiee</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink>
                                <Link to="/" className="navbar-linkz">
                                    Home
                                </Link>
                            </NavLink>
                        </NavItem>
                        {!isLogin && (
                            <NavItem>
                                <NavLink>
                                    <Link to="/login" className="navbar-linkz">
                                        {" "}
                                        Login/Register{" "}
                                    </Link>
                                </NavLink>
                            </NavItem>
                        )}
                        {isLogin && (
                            <>
                                <NavItem>
                                    <NavLink>
                                        <Link
                                            to="/post_form"
                                            className="navbar-linkz">
                                            {" "}
                                            Create Post{" "}
                                        </Link>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink>
                                        <button
                                            className="logout-button"
                                            type="button"
                                            onClick={handleClick}>
                                            Logout
                                        </button>
                                    </NavLink>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};
