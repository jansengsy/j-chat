const generatePasswordResetTemplate = (email) => {
  return (`
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            .container {
                width: 400px;
                padding: 20px;
                border: 1px solid #d9d9d9;
                border-radius: 10px;
                color: black;
                text-align: center;
            }
            .button {
                display: inline-block;
                margin-top: 20px;
                background-color: #698556;
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <p>Hey there!</p>
            <p>Looks like you need to reset your password. No worries, we've got you covered! Click the link below to set up a shiny new password and get back to doing your thing.</p>
            <p>Let us know if you need any help along the way.</p>
            <p>Stay awesome!</p>
            <a class='button' href='http://localhost:3001/reset-password?email=${email}'>Reset my password!</a>
        </div>
    </body>
    </html>
  `);
}

module.exports = generatePasswordResetTemplate;
