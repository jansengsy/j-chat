const generateUsernameReminderEmail = (token, username, email) => {
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
            .header {
                font-size: 24px;
                font-weight: bold;
                color: #698556;
            }
            .sub-header {
                font-size: 18px;
                margin-top: 10px;
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
        <div class="container">
            <div class="header">Your J-Chat username is: ${username}</div>
            <a class="button" href="http://localhost:3001/login">Login!</a>
        </div>
    </body>
    </html>
  `);
}

module.exports = generateUsernameReminderEmail;
