import { Hotel } from "@hooks/useAccommodations";

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
            <a href={`/hotels/${hotel._id}`} className="dropdown-item">
              <i className="fa fa-building mr-2"></i>
              {hotel.hotel_name}
            </a>
            <hr className="divider" />
          </li>
        ))
      ) : (
        <p>No hotels matched</p>
      )}
    </>
  );
}
