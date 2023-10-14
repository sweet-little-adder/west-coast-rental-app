import { Suspense } from "react";

import FaqServer from "../components-server/FaqServer";
import Loading from "../components/Loading.js";

export default async function FaqPage() {
  return (
    <div className="h-fit flex-col items-center justify-center space-y-9 text-center">
      <Suspense fallback={<Loading />}>
        <FaqServer />
      </Suspense>
    </div>
  );
}
