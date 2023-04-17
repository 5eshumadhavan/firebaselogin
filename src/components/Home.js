import { async } from '@firebase/util';
import React from 'react'
import { Button } from 'react-bootstrap';
import { useUserAuth } from '../context/UserAuthContext';

function Home() {
  const { user,logOut } = useUserAuth();
  console.log({user})
  const handleLogout = async() => {
    try{
        await logOut();
    }
    catch(err){
        console.log(err.message);
    }
  }
  return (
    <div>Home - 
        {user && user.email}
        <Button variant="primary" type="submit" onClick={handleLogout}>Logout</Button>

    </div>

  )
}

export default Home