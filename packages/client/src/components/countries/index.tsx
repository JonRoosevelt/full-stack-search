import { Country } from "lib";
import { Link } from "react-router-dom";

interface Props {
  countries: Country[];
}

export default function Countries({ countries }: Props) {
  return (
    <>
      <h2>Countries</h2>
      {countries.length ? (
        countries.map((country, index) => (
          <li key={index}>
            <Link
              to={`/countries/${country.countryisocode}`}
              className="dropdown-item"
              state={{ country }}
            >
              <i className="fa fa-building mr-2"></i>
              {country.country}
            </Link>
            <hr className="divider" />
          </li>
        ))
      ) : (
        <p>No countries matched</p>
      )}
    </>
  );
}
