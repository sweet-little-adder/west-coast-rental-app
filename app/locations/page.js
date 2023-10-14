import { Suspense } from "react";

import Locations from "../components-server/Locations";

export default async function LocationsPage() {
  return (
    <div className="-mt-20 -mb-20 w-screen text-black">
      <Suspense fallback={<div>Loading...</div>}>
        <Locations />
      </Suspense>
    </div>
  );
}
