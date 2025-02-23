import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge, NavDropdown } from 'react-bootstrap';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import "../../styles/DropdownMenu.css";

const StyledNavbar = styled(motion.nav)`
  background-color: #007bff;
  color: #ffffff;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Poppins", sans-serif;

  .navbar-brand {
    font-size: 2.1rem;
    font-weight: bold;
    color: #ffffff;
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  .nav-links {
    display: flex;
    align-items: center;
    margin-left: auto;

    .nav-link {
      color: #ffffff;
      text-decoration: none;
      padding: 10px;
      margin-right: 15px;
      transition: all 0.3s ease;

      &:hover {
        color: black;
      }
    }

    .nav-item {
      position: relative;
    }
  }

  /* Mobile view */
  @media (max-width: 767px) {
    .nav-links {
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      display: none; /* Hide by default for mobile */

      &.active {
        display: flex; /* Show when active */
      }

      .nav-link {
        width: 100%;
        text-align: left;
        margin: 0;
        padding: 10px 2px;
      }
    }

    .navbar-toggler {
      display: block;
      background: none;
      border: none;
      font-size: 1.5rem;
      color: white;
      cursor: pointer;
    }
  }
  /* Default styling for nav-links and hamburger icon */
.nav-links {
  display: flex; /* Default to flex for desktop view */
}

.navbar-toggler {
  display: none; /* Hide the hamburger icon by default for desktop */
}

/* Mobile view */
@media (max-width: 767px) {
  .nav-links {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    display: none; /* Hide by default for mobile */
  }

  .nav-links.active {
    display: flex; /* Show when active */
  }

  .navbar-toggler {
    display: block; /* Show the hamburger icon for mobile */
  }
}

`;

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    });
    localStorage.removeItem('auth');
    toast.success('Logout Successfully');
  };

  const toggleNav = () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
  };

  return (
    <StyledNavbar
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          🛒 Ecommerce App
        </Link>

        <button className="navbar-toggler" onClick={toggleNav}>
          ☰
        </button>

        <div className="nav-links">
          <SearchInput />
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavDropdown title="Categories" id="nav-dropdown">
            <NavDropdown.Item as={NavLink} to="/categories">
              All Categories
            </NavDropdown.Item>
            {categories?.map((c) => (
              <NavDropdown.Item key={c._id} as={NavLink} to={`/category/${c.slug}`}>
                {c.name}
              </NavDropdown.Item>
            ))}
          </NavDropdown>

          {!auth?.user ? (
            <>
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </>
          ) : (
            <NavDropdown title={auth?.user?.name} id="nav-dropdown">
              <NavDropdown.Item
                as={NavLink}
                to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}
              >
                Dashboard
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout} as={NavLink} to="/login">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          )}
          <NavLink to="/cart" className="nav-link">
            <Badge bg="danger" pill>{cart?.length || 0}</Badge>
            Cart
          </NavLink>
        </div>
      </div>
    </StyledNavbar>
  );
};

export default Header;
