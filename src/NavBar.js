import "./NavBar.css";

import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
} from "mdbreact";

const ITEMS = {
  home: "Home",
};

export default function NavBar() {
  const [isOpen, setOpen] = useState(false);
  const toggleCollapse = () => {
    setOpen((open) => !open);
  };

  return (
    <MDBNavbar className="App-NavBar" color="indigo" dark expand="md">
      <MDBNavbarBrand>
        <strong className="white-text">Lang Editor</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav right>
          {Object.keys(ITEMS).map((key) => (
            <MDBNavItem key={key} className="NavBar-link">
              <a href={`#${key}`} className="white-text">
                {ITEMS[key]}
              </a>
            </MDBNavItem>
          ))}
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
}
