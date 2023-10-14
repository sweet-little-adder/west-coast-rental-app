import api from "../../lib/api";
import Faq from "../components/Faq";

const getFaq = async () =>
  api()
    .get(`/faq`)
    .catch((e) => e.statusText);

export default async function FaqServer() {
  const faqs = await getFaq();

  if (!faqs) return null;

  return typeof faqs === "object" ? <Faq faqs={faqs.data.data} /> : faqs;
}
