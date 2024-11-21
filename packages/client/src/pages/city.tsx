import { Link, useLocation, useParams } from "react-router-dom";
import { MapPin, StepBack } from "lucide-react";
import { useCities } from "@hooks/useCities";
import { City } from "lib";

export default function CityDetails() {
  const { id = "" } = useParams<{ id: string }>();
  const { state } = useLocation();

  const cityFromState = state?.city as City | null;
  const { data, isFetching, error } = useCities(cityFromState ? "" : id);

  const city = cityFromState || data;

  if (isFetching && !city) return "Loading...";
  if (error && !city) return "An error occurred: " + error.message;

  return (
    <div className="min-vh-100 d-flex flex-row align-items-center justify-content-center bg-primary bg-gradient">
      <Link to="/">
        <StepBack color="black" />
      </Link>
      <div
        className="card shadow-lg p-4 p-md-5 mx-3 mx-md-0"
        style={{ maxWidth: "500px" }}
      >
        <div className="d-flex flex-column align-items-center">
          <MapPin className="text-primary mb-4" size={30} />
          <h1 className="card-title h2 mb-4 fw-bold">{city?.name}</h1>
        </div>
      </div>
    </div>
  );
}
