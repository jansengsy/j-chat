import { useState, useContext } from 'react';
import axios from 'axios';

import { AuthContext } from '../context/authContext';

export default function VerificationBanner() {

  const {user, token} = useContext(AuthContext);
  const [emailSent, setEmailSent] = useState(false);

  const sendVerificationEmail = async () => {
    try {
      await axios.post('https://vast-badlands-58061-2679a94a959f.herokuapp.com/email/sendVerificationEmail',
        {
          verification_token: user.verification_token,
          username: user.username,
          email: user.email
        }, 
        {
          headers: {
              'Authorization': `Bearer ${token}`,
          }
        }
      );

      setEmailSent(true);
    } catch (err) {
      setEmailSent(false);
    }
  };

  return (
    <div className='banner-container'>
      <div className={ emailSent ? 'banner-success' : 'banner' }>
        { emailSent ? 
            <p>Email has been sent! Please check your inbox.</p> : 
            <p>Please verify your Email. Need another email link?
              <button className='banner-link' onClick={sendVerificationEmail}>Click here!</button>
            </p> 
        }
      </div>
    </div>
  );
};
