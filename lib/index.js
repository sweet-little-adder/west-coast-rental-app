import sgMail from "@sendgrid/mail";
import axios from "axios";

const isRecaptchaValid = async (recaptcha) => {
  try {
    const reCaptchaRes = await axios.get(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptcha,
        },
      }
    );

    return { success: reCaptchaRes.data.success };
  } catch (error) {
    return { success: false, msg: error.message };
  }
};

const sendEmail = async ({
  name = process.env.SEND_GRID_FROM_NAME,
  from = process.env.SEND_GRID_FROM_EMAIL,
  to = process.env.SEND_GRID_FROM_EMAIL,
  subject,
  content,
}) => {
  sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

  const msg = {
    to,
    replyTo: from,
    from: {
      email: from,
      name: `[sol-e.co] - ${name}`,
    },
    subject: `[sol-e.co]: ${subject}`,
    text: content,
    categories: [subject],
  };

  try {
    console.log("[sendEmail]", JSON.stringify(msg));
    await sgMail.send(msg);
    return { success: true, message: "Email sent" };
  } catch (error) {
    console.error("[sendEmail]", error);
    return {
      success: false,
      message: error.response?.body?.errors?.[0]?.message || error.message,
    };
  }
};

const isValidEmail = (str) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(str);
};

module.exports = { isRecaptchaValid, sendEmail, isValidEmail };
