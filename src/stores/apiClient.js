import axios from "axios";

export const fetchAirports = async () => {
  const response = await axios.get(
    "https://gist.githubusercontent.com/tdreyno/4278655/raw/755b1cfc5ded72d7b45f97b9c7295d525be18780/airports.json"
  );
  return response.data;
};

export const apiKey = process.env.REACT_APP_API_KEY;
export const calculateFlightFootprint = async (
  apiKey,
  segments,
  cabinClass = "economy"
) => {
  const url = "https://api.goclimate.com/v1/flight_footprint";

  const params = {};
  segments.forEach((segment, i) => {
    params[`segments[${i}][origin]`] = segment.origin;
    params[`segments[${i}][destination]`] = segment.destination;
  });
  params.cabin_class = cabinClass;

  const config = {
    params,
    auth: {
      username: apiKey,
      password: "",
    },
  };

  const response = await axios.get(url, config);
  return response.data;
};
