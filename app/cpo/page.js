import BasicPage from "app/components/layout/BasicPage";

import ContactButton from "../components/contact-us/ContactButton";

export default function CPO() {
  return (
    <div className="mt-20 px-20 text-center text-5xl font-bold text-green">
      <BasicPage slug="cpo" />
      <ContactButton i={"CPO"} />
    </div>
  );
}
