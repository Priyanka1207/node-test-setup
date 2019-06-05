var nodemailer = require('nodemailer');
var fs = require('fs');

// Mail setting
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: '465',
    auth: {
        user: 'test@gmail.com', // Your email id
        pass: '123456' // Your password
    },
    secure: false,
    secureConnection: 'false',
    tls: {
        ciphers: 'SSLv3'
    }
});

/* send mail */
module.exports.sendMail = function(mailOptions){
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log("----------------------------------------------"); 
            console.log('error---------',error); 
            console.log("----------------------------------------------"); 
        }else{
            console.log("----------------------------------------------"); 
            console.log('Message sent: ' + info.response); 
            console.log("----------------------------------------------");
        };
    }); 
};


   