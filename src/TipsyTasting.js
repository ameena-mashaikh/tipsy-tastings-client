import './TipsyTasting.css';
import { ApplicationViews } from './views/ApplicationViews';
import { NavBar } from "./components/nav/NavBar"
import { useState } from 'react';


export const TipsyTasting = () => {
    const [token, setTokenState] = useState(localStorage.getItem('tt_token'))
  
    const setToken = (newToken) => {
      localStorage.setItem('tt_token', newToken)
      setTokenState(newToken)
    }
  
    return <>
      <NavBar token={token} setToken={setToken} />
      <ApplicationViews token={token} setToken={setToken} />
    </>
  }
