const generateRegisterEmailTemplate = (token, username, email) => {
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
            <div class="header">Welcome to J-Chat!</div>
            <p>
                Dear ${username},<br/><br/>
                We are excited to have you on board and look forward to seeing you on J-Chat. Feel free to connect with your friends and share your experiences. If you have any questions or need assistance, please don't hesitate to reach out to us. <br/><br/>
                Regards,<br/>
                The J-Chat Team
            </p>
            <a class="button" href="http://localhost:3001/verify?token=${token}&email=${email}">Verify my email!</a>
        </div>
    </body>
    </html>
  `);
}

module.exports = generateRegisterEmailTemplate;
