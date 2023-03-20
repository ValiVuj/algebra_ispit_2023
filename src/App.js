import React from 'react'
import { SignIn } from './pages/SignIn/SignIn'
import { Home } from './pages/Home/Home';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

// app = arrow function; useAuthState = hook (custom funkcija koji vraca tokeniziranu vrijednost)
export const App = () => {
    const [user] = useAuthState(auth);
    console.log(user)

    return (
      <div>{user ? <Home /> : <SignIn />}</div>
    ); 
}
