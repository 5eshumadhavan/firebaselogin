import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import {useState} from 'react';
import {Link,useNavigate} from 'react-router-dom'
import { Alert } from 'react-bootstrap';
import GoogleButton from 'react-google-button';
import { useUserAuth } from '../context/UserAuthContext';

function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const navigate = useNavigate();
    const { logIn,googleSignUp } = useUserAuth();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError("");
        try{
            console.log(email,password)
            await logIn(email,password);
            navigate("/home")
        }
        catch(err){
            setError(err.message);
        }
    }
    const handleGoogleSignin = async (e) =>{
        e.preventDefault();
        setError("");
        try{
            await googleSignUp(email,password);
            navigate("/home")
        }
        catch(err){
            setError(err.message);
        }
    }

  return (
    <Container>
        <Form style={{width:"200px"}} className="mx-auto my-5" onSubmit={handleSubmit}>
        <h1>Log in</h1>
        {error && <Alert variant='danger'>{error}</Alert>}

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
            <Link to="/signup">
                signup
           </Link>
    </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        <Link variant="primary" type="button"  to='/phonesignup'>
            Sign up with Phone number
        </Link>
        <GoogleButton variant="primary" onClick={handleGoogleSignin}>
        </GoogleButton>
        </Form>
    </Container>

    )
}

export default Login