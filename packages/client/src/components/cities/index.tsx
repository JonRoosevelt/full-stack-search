import { City } from "lib";
import { Link } from "react-router-dom";

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
            <Link
              to={`/cities/${city._id}`}
              className="dropdown-item"
              state={{ city }}
            >
              <i className="fa fa-building mr-2"></i>
              {city.name}
            </Link>
            <hr className="divider" />
          </li>
        ))
      ) : (
        <p>No cities matched</p>
      )}
    </>
  );
}
