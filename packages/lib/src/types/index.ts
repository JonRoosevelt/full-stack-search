export type Hotel = {
  _id: string;
  chain_name: string;
  hotel_name: string;
  city: string;
  country: string;
};

export type City = { _id: string; name: string };

export type Country = {
  country: string;
  countryisocode: string;
};

export type Accommodations = {
  hotels: Hotel[];
  countries: Country[];
  cities: City[];
};
