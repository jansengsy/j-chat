import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from "react-router-dom";
import { AuthContext } from '../context/authContext';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Verify() {

  const {token, user, verifyUser} = useContext(AuthContext);

  // eslint-disable-next-line no-unused-vars
  const [searchParams, nosetSearchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const [verifiedMessage, setVerifiedMessage] = useState('');

  const goHome = () => {
    window.location.replace(window.location.origin + '/');
  }
  
  useEffect(() => {

    if (user.verified) goHome();

    async function verifyEmail() {
      const verification_token = searchParams.get('token');
      const email = searchParams.get('email');

      const url = `http://localhost:3000/email/verify?token=${verification_token}&email=${email}`;

      try {
        const res = await axios.get(url, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
