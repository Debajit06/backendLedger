import nodemailer from "nodemailer";

const authConfig = process.env.EMAIL_PASS
  ? {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  : {
      type: "OAuth2",
      user: process.env.EMAIL_USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    };

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: authConfig,
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error.message);
  } else {
    console.log("Email server is ready to send messages");
  }
});

const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend Ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

async function sendRegistrationEmail(userEmail, name) {
  const subject = "Welcome to Backend Ledger!";
  const text = `Hello ${name},\n\nThank you for registering at Backend Ledger. We're excited to have you on board!\n\nBest regards,\nThe Backend Ledger Team`;
  const html = `<p>Hello ${name},</p><p>Thank you for registering at Backend Ledger. We're excited to have you on board!</p><p>Best regards,<br>The Backend Ledger Team</p>`;

  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmail(userEmail, name, amount, toAccount) {
  const displayName = name || "Valued Customer";
  const subject = "Transaction Confirmation - Backend Ledger";
  const text = `Hello ${displayName},\n\nYour transaction of $${amount} to account ${toAccount} was successful.\n\nBest regards,\nThe Backend Ledger Team`;
  const html = `<p>Hello ${displayName},</p><p>Your transaction of <strong>$${amount}</strong> to account <code>${toAccount}</code> was successful.</p><p>Best regards,<br>The Backend Ledger Team</p>`;

  await sendEmail(userEmail, subject, text, html);
}

export default {
  sendRegistrationEmail,
  sendTransactionEmail,
};
