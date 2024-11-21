import { useLocation, useParams } from "react-router-dom";
import { Globe } from "lucide-react";
import { useCountries } from "@hooks/useCountries";
import { Country } from "lib";

export default function CountryDetails() {
  const { id = "" } = useParams<{ id: string }>();
  const { state } = useLocation();

  const countryFromState = state?.country as Country | null;
  const { data, isFetching, error } = useCountries(countryFromState ? "" : id);

  const country = countryFromState || data;

  if (isFetching && !country) return "Loading...";
  if (error && !country) return "An error occurred: " + error.message;

  return (
    <div className="min-vh-100 d-flex flex-row align-items-center justify-content-center bg-primary bg-gradient">
      <div
        className="card shadow-lg p-4 p-md-5 mx-3 mx-md-0"
        style={{ maxWidth: "500px" }}
      >
        <div className="d-flex flex-column align-items-center">
          <Globe className="text-primary mb-4" size={30} />
          <h1 className="card-title h2 mb-4 fw-bold">{country?.country}</h1>
          <span className="ms-2">{country?.countryisocode}</span>
        </div>
      </div>
    </div>
  );
}
