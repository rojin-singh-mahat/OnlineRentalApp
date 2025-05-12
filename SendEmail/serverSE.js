require('dotenv').config("./.env");

let express = require('express');
let cors = require('cors');
let nodemailer = require('nodemailer');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

app.post("/confirm", (req, res)=>{
    try{
    const {fullname, email, password} = req.body;
    const confirmationLink = `http://localhost:3001/confirm?email=${encodeURIComponent(email)}`;

    const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "New Sign Up on CozyKeys",
    html: `
        <h2>Hi ${fullname},</h2>
        <p>We received a signup request using your email on CozyKeys.</p>
        <p>If this was you, please confirm your signup by clicking the button below:</p>
        <a href="${confirmationLink}" style="padding: 10px 20px; background-color: #4361ee; color: white; border-radius: 5px; text-decoration: none;">Confirm My Account</a>
        <p>If you didn’t request this, you can ignore this email — no account has been created yet.</p>
    `
    };

    transporter.sendMail(mailOptions, function(err, data){
        if(err){
            console.log('Email not Sent! '+err);
            res.status(500).json({message: "Failed to send Email"});
        } else{
            console.log("Email sent Successfully!");
            res.status(200).json({message: "Email sent successfully!"});
        }
    });
} catch(e){
    console.log(e);
}
})

app.listen(port, ()=>{
    console.log("Server listening at https://localhost:"+port);
})