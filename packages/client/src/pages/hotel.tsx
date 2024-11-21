import { Link, useLocation, useParams } from "react-router-dom";
import { useHotels } from "@hooks/useHotels";
import { Building2, Globe, MapPin, StepBack } from "lucide-react";

export default function HotelDetails() {
  const { id = "" } = useParams<{ id: string }>();
  const { state } = useLocation();

  const hotelFromState = state?.hotel;
  const { data, isFetching, error } = useHotels(hotelFromState ? "" : id);

  const hotel = hotelFromState || data;

  if (isFetching && !hotel) return "Loading...";
  if (error && !hotel) return "An error occurred: " + error.message;

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-primary bg-gradient">
      <Link to="/">
        <StepBack color="black" />
      </Link>
      <div
        className="card shadow-lg p-4 p-md-5 mx-3 mx-md-0"
        style={{ maxWidth: "500px" }}
      >
        <h1 className="card-title h2 mb-4 fw-bold">{hotel?.hotel_name}</h1>
        <div className="card-body p-0">
          <div className="mb-4">
            <div className="d-flex align-items-center">
              <Building2 className="text-primary" size={24} />
              <div>
                <span className="ms-2">{hotel?.chain_name}</span>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="d-flex align-items-center">
              <Globe className="text-primary" size={24} />
              <div>
                <span className="ms-2">{hotel?.country}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="d-flex align-items-center">
              <MapPin className="text-primary" size={24} />
              <div>
                <span className="ms-2">{hotel?.city}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
