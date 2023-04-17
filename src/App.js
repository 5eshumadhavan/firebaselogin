// import {useState} from 'react';
import './App.css';
import React from 'react'
import Login from "./components/Login";
import {Container,Row,Col} from "react-bootstrap";
import {Routes,Route} from "react-router-dom";
import Signup from './components/Signup';
import { UserAuthContextProvider } from './context/UserAuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import PhoneSignUp from './components/PhoneSignUp';

function App() {
  return (
    <Container>
      <Row>
        <Col>
        <UserAuthContextProvider>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/phonesignup" element={ <PhoneSignUp/>} />
           
            <Route path="/signup" element={<Signup/>} />
            {/* <Route path="/home" element={<Home/>} /> */}

            <Route path="/home" element={
            <ProtectedRoute> 
              <Home/> 
            </ProtectedRoute>
          }/>
          </Routes>
          
          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
