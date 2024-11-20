import { City } from "@hooks/useAccommodations";

interface Props {
  cities: City[];
}

export default function Cities({ cities }: Props) {
  return (
    <>
      <h2>Cities</h2>
      {cities.length ? (
        cities.map((city, index) => (
          <li key={index}>
            <a href={`/cities/${city._id}`} className="dropdown-item">
              <i className="fa fa-building mr-2"></i>
              {city.name}
            </a>
            <hr className="divider" />
          </li>
        ))
      ) : (
        <p>No cities matched</p>
      )}
    </>
  );
}
