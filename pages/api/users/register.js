import { isRecaptchaValid } from "../../../lib";
import api from "../../../lib/api";

const handler = async (req, res) => {
  const { body: payload, method } = req;

  if (method.toLowerCase() !== "post") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const recaptchaValid = await isRecaptchaValid(payload.recaptcha);
  if (!recaptchaValid.success) {
    return res
      .status(400)
      .json({ message: recaptchaValid.msg || "recaptcha failed" });
  }

  const skipEmail = process.env.APP_ENV === "development";

  try {
    const _res = await api()
      .post(`/users?skipEmail=${skipEmail}`, payload)
      .then((res) => res.data);

    if (_res.status_code !== 1000) {
      return res.status(400).json(_res.status_message);
    }

    return res.status(200).json(_res?.data);
  } catch (e) {
    return res.status(e.status).json(e.statusText);
  }
};

export default handler;
