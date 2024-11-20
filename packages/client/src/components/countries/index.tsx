import { Country } from "@hooks/useAccommodations";

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
            <a
              href={`/countries/${country.countryisocode}`}
              className="dropdown-item"
            >
              <i className="fa fa-building mr-2"></i>
              {country.country}
            </a>
            <hr className="divider" />
          </li>
        ))
      ) : (
        <p>No countries matched</p>
      )}
    </>
  );
}
