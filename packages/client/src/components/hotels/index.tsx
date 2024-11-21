import { Hotel } from "lib";
import { Link } from "react-router-dom";

interface Props {
  hotels: Hotel[];
}
export function Hotels({ hotels }: Props) {
  return (
    <>
      <h2>Hotels</h2>
      {hotels.length ? (
        hotels.map((hotel, index) => (
          <li key={index}>
            <Link
              to={`/hotels/${hotel._id}`}
              state={{ hotel }}
              className="dropdown-item"
            >
              <i className="fa fa-building mr-2"></i>
              {hotel.hotel_name}
            </Link>
            <hr className="divider" />
          </li>
        ))
      ) : (
        <p>No hotels matched</p>
      )}
    </>
  );
}
