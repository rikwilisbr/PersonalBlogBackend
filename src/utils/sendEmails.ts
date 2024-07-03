const nodemailer = require("nodemailer");
const showdown  = require('showdown');

// Set options

type PostDataTypes = {
  title: string;
  markdown: string;
  description: string;
};

type EmailDataTypes = {
  id: string;
  email: string;
};

export default async function SendEmails(emailArray: EmailDataTypes[], postData: PostDataTypes) {
  const converter = new showdown.Converter()
  const markdown = `
  <div style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif; color: #333;">
    <h3 style="color: #007bff; text-align: center;">Your Interlude Newsletter Update</h3>

    <p style="text-align: center;">
      Read this article on the Official
      <a href="https://blog.henriquewilliam.me/articles/${postData.title.replace(/ /g, '-')}" style="color: #007bff; text-decoration: none;">website</a>
    </p>

    <h1 style="color: #333; margin-top: 20px;">${postData.title}</h1>

    <div style="margin-top: 10px; line-height: 1.6;">
      ${converter.makeHtml(postData.markdown)}
    </div>

    <p style="margin-top: 20px; text-align: center;">
      <a href="https://blog.henriquewilliam.me/newsletter/unsubscribe" style="color: #d9534f; text-decoration: none;">Unsubscribe</a>
    </p>
  </div>
`;

  const email = process.env.EMAIL_ADDRESS;
  const pass = process.env.EMAIL_PASS;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
      user: email,
      pass: pass,
    },
  });

  emailArray.forEach((element) => {
    const mailOptions = {
      from: email,
      to: element.email,
      subject: `Interlude Newsletter Update: "${postData.title}"`,
      html: markdown,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  });
}