import { isRecaptchaValid, isValidEmail, sendEmail } from "../../../lib";

const handler = async (req, res) => {
  const { body: payload, method } = req;

  if (method.toLowerCase() !== "post") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!payload.subject || !payload.content || !payload.email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (!isValidEmail(payload.email)) {
    return res.status(400).json({ message: "Invalid Email" });
  }

  const recaptchaValid = await isRecaptchaValid(payload.recaptcha);
  if (!recaptchaValid.success) {
    return res
      .status(400)
      .json({ message: recaptchaValid.msg || "recaptcha failed" });
  }

  const sent = await sendEmail({
    name: payload.name,
    from: payload.email,
    subject: payload.subject,
    content: payload.content,
  });
  return res.status(sent.success ? 200 : 400).json({ message: sent.message });
};

export default handler;
