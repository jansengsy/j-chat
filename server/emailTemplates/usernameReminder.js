const generateReminderTemplate = (username) => {
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
            <p>Hey,</p>
            <p>Hope you're doing great! We just wanted to drop you a quick note to remind you of your username for J-Chat. It happens to the best of us — forgetting those tiny details in the whirlwind of the online world.</p> 
            <p>Your username for <strong>J-Chat</strong> is: <strong>${username}</strong></p>
            <p>Keep enjoying your time with us!</p>
            <a class="button" href="http://localhost:3001/login">Login!</a>
        </div>
    </body>
    </html>
  `);
}

module.exports = generateReminderTemplate;
