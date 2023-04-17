import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import GoogleButton from "react-google-button";
import Container from 'react-bootstrap/Container';
import { Alert } from 'react-bootstrap';
import {Link,useNavigate} from 'react-router-dom'
import {useState} from 'react';


import { useUserAuth } from '../context/UserAuthContext';
function Signup() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const navigate = useNavigate();
    const { signUp } = useUserAuth();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError("");
        try{
            await signUp(email,password);
            navigate("/")
        }
        catch(err){
            setError(err.message);
        }
    }
  return (
    <Container>
        <h1>Signup</h1>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Form style={{width:"200px"}} className="mx-auto my-5" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" 
                onChange={(e)=>{setEmail(e.target.value)}}
                />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" 
                onChange={(e)=>{setPassword(e.target.value)}}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Link to="/">
                login
           </Link>
    </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
    </Container>
  )
}

export default Signup