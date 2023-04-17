import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import {useState} from 'react';
import {Link,useNavigate} from 'react-router-dom'
import { Alert } from 'react-bootstrap';
import GoogleButton from 'react-google-button';
import { useUserAuth } from '../context/UserAuthContext';
function PhoneSignUp() {
    const [phone,setPhone]=useState("");
    const [error,setError]=useState("");
    const [otp,setOtp]=useState("");

    const [confirmObj,setConfirmObj]=useState("");

    const navigate = useNavigate();
    const { setupRecaptcha } = useUserAuth();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(phone === "" || phone === undefined) 
          return setError("Empty")
        setError("");
        try{
            const response = await setupRecaptcha(phone);
            setConfirmObj(response);
            // navigate("/home")
        }
        catch(err){
            setError(err.message);
        }
    }
    const getOTP = async (e) =>{
        e.preventDefault();
        setError("");
        console.log(otp)
        try{
            await confirmObj.confirm(otp)
            navigate("/home")
        }
        catch(err){
            setError(err.message);
        }
    }
  return (
    <Container>
    <Form style={{width:"200px"}} className="mx-auto my-5" onSubmit={handleSubmit}>
    <h1>Log in PhoneNumber</h1>
    {error && <Alert variant='danger'>{error}</Alert>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control type="phone" placeholder="Enter phone number" 
            onChange={(e)=>{setPhone(e.target.value)}}
            />
        </Form.Group>
        <div id='recaptcha-container'></div>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
  
</Form.Group>
    <Button variant="primary" type="submit">
        Submit
    </Button>
    <Link to="/">
            Back
       </Link>
    </Form>
    <Form style={{width:"200px"}} className="mx-auto my-5" onSubmit={getOTP}>
    <h1>OTP</h1>
    {error && <Alert variant='danger'>{error}</Alert>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control type="phone" placeholder="Enter OTP" 
            onChange={(e)=>{setOtp(e.target.value)}}
            />
        </Form.Group>
        <div id='recaptcha-container'></div>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
  
</Form.Group>
    <Button variant="primary" type="submit">
        Submit
    </Button>
    </Form>
</Container>
  )
}

export default PhoneSignUp