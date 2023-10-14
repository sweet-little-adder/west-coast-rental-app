import api from "../../lib/api";
import Map from "../components/locations/Map";

const getPlansByControllerId = async (controllerId) =>
  await api().get(`/controllers/${controllerId}/plans`);

const getLocations = async () => {
  try {
    let locations = [];
    let nextUrl = `${process.env.API_BASE_URL}/locations`;
    while (nextUrl) {
      let _locations = await api().get(nextUrl, {
        settings: { baseUrl: false },
      });
      nextUrl = false;

      const data = [];
      for (let location of _locations.data.data) {
        const plans = await getPlansByControllerId(location.id);
        data.push({ ...location, plans: plans.data.data });
      }
      locations.push(...data);
      const regex = new RegExp('<(.*)>; rel="next"', "i");

      if (_locations.headers?.link) {
        nextUrl = _locations.headers.link.match(regex)?.[1];
      }
    }

    return locations;
  } catch (e) {
    return e.statusText;
  }
};

export default async function Locations() {
  const locations = await getLocations();
  if (!locations) return null;
  return (
    <div className="h-full w-screen">
      {/* {!locations && <div>Error displaying Charger locations</div>} */}
      {typeof locations === "object" ? (
        <Map locations={locations} />
      ) : (
        locations
      )}
    </div>
  );
}
