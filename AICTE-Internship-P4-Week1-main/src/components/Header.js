// NavbarComponent.js
import React, { useCallback, useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import "./style.css";
import { useNavigate } from 'react-router-dom';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Header = () => {
  
  const navigate = useNavigate();

  // Function to navigate to the login page
  const handleShowLogin = () => {
    navigate("/login");
  };

  // State to manage user authentication status
  const [user, setUser] = useState(null);

  // Check for user data in localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Function to log out the user and redirect to login page
  const handleShowLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // Initialize particles background animation
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  // Callback for when particles are loaded (not currently used)
  const particlesLoaded = useCallback(async (container) => {}, []);

  return (
    <>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Background animation using particles.js */}
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: { value: '#000' },
            },
            fpsLimit: 60,
            particles: {
              number: {
                value: 200,
                density: { enable: true, value_area: 800 },
              },
              color: { value: '#fff' },
              shape: { type: 'circle' },
              opacity: { value: 0.5, random: true },
              size: { value: 3, random: { enable: true, minimumValue: 1 } },
              move: { enable: true, speed: 2 },
              life: {
                duration: { sync: false, value: 3 },
                count: 0,
                delay: {
                  random: { enable: true, minimumValue: 0.5 },
                  value: 1,
                },
              },
            },
            detectRetina: true,
          }}
          style={{
            position: 'absolute',
            zIndex: -1,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />

        {/* Navbar Section */}
        <Navbar className="navbarCSS" collapseOnSelect expand="lg" style={{ position: 'relative', zIndex: 2 }}>
          <Navbar.Brand href="/" className="text-white navTitle">
            Personal Finance Manager
          </Navbar.Brand>
          
          {/* Custom toggle button for mobile view */}
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ backgroundColor: "transparent", borderColor: "transparent" }}
          >
            <span
              className="navbar-toggler-icon"
              style={{
                background: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`,
              }}
            ></span>
          </Navbar.Toggle>

          <div>
            <Navbar.Collapse id="responsive-navbar-nav" style={{ color: "white" }}>
              {user ? (
                // Show Logout Button if user is logged in
                <Nav>
                  <Button variant="primary" onClick={handleShowLogout} className="ml-2">
                    Logout
                  </Button>
                </Nav>
              ) : (
                // Show Login Button if user is not logged in
                <Nav>
                  <Button variant="primary" onClick={handleShowLogin} className="ml-2">
                    Login
                  </Button>
                </Nav>
              )}
            </Navbar.Collapse>
          </div>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
