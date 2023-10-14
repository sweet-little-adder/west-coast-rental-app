import en from "../../../lib/i18n/en";
import zh from "../../../lib/i18n/zh";

const handler = async (req, res) => {
  const { lng, ns } = req.query;

  const translation = { zh, en };

  return res.status(200).json(translation[lng][ns]);
};

export default handler;
