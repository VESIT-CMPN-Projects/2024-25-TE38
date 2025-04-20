import nodemailer from "nodemailer";

const SendVerifyEmail = async (
  email: string,
  token: string,
  username: string,
  template: any
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail(template(email, username, token));
};
