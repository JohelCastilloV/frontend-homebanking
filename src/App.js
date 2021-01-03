import React, { useRef } from 'react';
import ATMPlaces from './components/ATMPlaces'
import CurrencyConvertor from './components/CurrencyConvertor'
import Navbar from 'react-bootstrap/Navbar'
export default function App() {

  const handleClick = () => {
    ref.current.getCurrentPosition();
  };

  const ref = useRef(null);
    return (
      <div>
      <Navbar className="justify-content-center" bg="light">
    <Navbar.Brand>Home Banking</Navbar.Brand>
    <button onClick={handleClick} ><img src="https://img.icons8.com/fluent/48/000000/map-marker.png" alt="gps"/></button>
  </Navbar>
     <CurrencyConvertor/> 
      <ATMPlaces ref={ref}/>
    </div>
    );
  };