import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from "react-router-dom";
import { AuthContext } from '../context/authContext';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Verify() {

  const {verifyUser} = useContext(AuthContext);

  // eslint-disable-next-line no-unused-vars
  const [searchParams, nosetSearchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const [verifiedMessage, setVerifiedMessage] = useState('');

  const goHome = () => {
    window.location.replace(window.location.origin + '/');
  }
  
  useEffect(() => {
    async function verifyEmail() {
      const token = searchParams.get('token');
      const email = searchParams.get('email');

      const url = `http://localhost:3000/email/verify?token=${token}&email=${email}`;

      try {
        const res = await axios.get(url, {
          headers: {
              'Content-Type': 'application/json',
          },
        });
        verifyUser();
        setError(false);
        setVerifiedMessage(res.data);

        setTimeout(() => {
          goHome();
        }, 2000);
      } catch (err) {
        setError(true);
        setVerifiedMessage('An error occured trying to verify your email. Please try again');
      }
    } 

    verifyEmail();
  }, [searchParams]);

  return (
    <div className='no-room-container'>
      { error ? 
          <FontAwesomeIcon className='no-room-icon' icon={'fa-solid fa-triangle-exclamation'} /> : 
          <FontAwesomeIcon className='no-room-icon' icon={'fa-solid fa-square-check'} />
      }
      <h1 className='no-room-header'>{verifiedMessage}!</h1>
      <p className='white-text'>You will be returned the the application in a few seconds...</p>
    </div>
  );
}
